const CommitteeMeeting = require('../models/committeeMeetingSchema');
const CommitteeDecision = require('../models/committeeDecisionSchema');
const User = require('../models/userSchema');
const { sendEmail } = require('../services/emailService');
const { createNotification } = require('../services/notificationService');
const { createCalendarEvent } = require('../services/calendarService');
const mongoose = require('mongoose');

class CommitteeMeetingController {
  // Create a new committee meeting
  async createMeeting(req, res) {
    try {
      const {
        title,
        description,
        committee,
        meetingDate,
        startTime,
        endTime,
        location,
        virtualLink,
        meetingType,
        priority,
        attendees,
        agenda,
        recurrence
      } = req.body;

      // Validate meeting time
      const startDateTime = new Date(`${meetingDate}T${startTime}`);
      const endDateTime = new Date(`${meetingDate}T${endTime}`);
      
      if (startDateTime >= endDateTime) {
        return res.status(400).json({
          success: false,
          message: 'End time must be after start time'
        });
      }

      // Check for conflicting meetings
      const conflictingMeeting = await CommitteeMeeting.findOne({
        committee,
        meetingDate,
        $or: [
          {
            $and: [
              { startTime: { $lt: endTime } },
              { endTime: { $gt: startTime } }
            ]
          }
        ],
        status: { $in: ['scheduled', 'ongoing'] }
      });

      if (conflictingMeeting) {
        return res.status(400).json({
          success: false,
          message: 'Meeting time conflicts with existing meeting',
          conflictingMeeting: conflictingMeeting.title
        });
      }

      const meeting = new CommitteeMeeting({
        title,
        description,
        committee,
        meetingDate,
        startTime,
        endTime,
        location,
        virtualLink,
        meetingType,
        priority,
        organizer: req.user._id,
        attendees: attendees || [],
        agenda: agenda || [],
        recurrence
      });

      await meeting.save();

      // Populate meeting with organizer details
      const populatedMeeting = await CommitteeMeeting.findById(meeting._id)
        .populate('organizer', 'firstName lastName email committeePosition')
        .populate('committee', 'name')
        .populate('attendees.user', 'firstName lastName email committeePosition');

      // Send invitations to attendees
      await this.sendMeetingInvitations(populatedMeeting);

      // Create calendar event
      await createCalendarEvent(populatedMeeting);

      // Send notifications
      await createNotification({
        type: 'meeting_scheduled',
        title: 'New Meeting Scheduled',
        message: `Meeting "${title}" has been scheduled`,
        recipients: populatedMeeting.attendees.map(a => a.user._id),
        referenceId: meeting._id,
        referenceType: 'meeting'
      });

      res.status(201).json({
        success: true,
        message: 'Meeting created successfully',
        meeting: populatedMeeting
      });

    } catch (error) {
      console.error('Create meeting error:', error);
      res.status(500).json({
        success: false,
        message: 'Error creating meeting',
        error: error.message
      });
    }
  }

  // Get all meetings with filters
  async getMeetings(req, res) {
    try {
      const {
        committee,
        status,
        startDate,
        endDate,
        search,
        page = 1,
        limit = 10,
        sortBy = 'meetingDate',
        sortOrder = 'asc'
      } = req.query;

      const query = {};

      // Filter by committee if user has access
      if (committee) {
        // Check if user is part of this committee
        const userCommittees = req.user.committees || [];
        if (!userCommittees.includes(committee) && req.user.role !== 'admin') {
          return res.status(403).json({
            success: false,
            message: 'Access denied to this committee'
          });
        }
        query.committee = committee;
      } else {
        // Show only meetings from user's committees
        query.committee = { $in: req.user.committees || [] };
      }

      // Apply filters
      if (status) query.status = status;
      if (startDate && endDate) {
        query.meetingDate = {
          $gte: new Date(startDate),
          $lte: new Date(endDate)
        };
      }

      // Search functionality
      if (search) {
        query.$or = [
          { title: { $regex: search, $options: 'i' } },
          { description: { $regex: search, $options: 'i' } },
          { location: { $regex: search, $options: 'i' } }
        ];
      }

      // Pagination and sorting
      const skip = (page - 1) * limit;
      const sort = { [sortBy]: sortOrder === 'desc' ? -1 : 1 };

      const [meetings, total] = await Promise.all([
        CommitteeMeeting.find(query)
          .populate('organizer', 'firstName lastName committeePosition')
          .populate('committee', 'name')
          .populate('attendees.user', 'firstName lastName')
          .sort(sort)
          .skip(skip)
          .limit(parseInt(limit))
          .lean(),
        CommitteeMeeting.countDocuments(query)
      ]);

      // Calculate meeting statistics
      const stats = await this.getMeetingStatistics(query);

      res.json({
        success: true,
        meetings,
        pagination: {
          page: parseInt(page),
          limit: parseInt(limit),
          total,
          pages: Math.ceil(total / limit)
        },
        stats
      });

    } catch (error) {
      console.error('Get meetings error:', error);
      res.status(500).json({
        success: false,
        message: 'Error fetching meetings',
        error: error.message
      });
    }
  }

  // Get meeting statistics
  async getMeetingStatistics(query = {}) {
    const stats = await CommitteeMeeting.aggregate([
      { $match: query },
      {
        $group: {
          _id: null,
          totalMeetings: { $sum: 1 },
          scheduled: {
            $sum: { $cond: [{ $eq: ['$status', 'scheduled'] }, 1, 0] }
          },
          ongoing: {
            $sum: { $cond: [{ $eq: ['$status', 'ongoing'] }, 1, 0] }
          },
          completed: {
            $sum: { $cond: [{ $eq: ['$status', 'completed'] }, 1, 0] }
          },
          cancelled: {
            $sum: { $cond: [{ $eq: ['$status', 'cancelled'] }, 1, 0] }
          }
        }
      },
      {
        $project: {
          _id: 0,
          totalMeetings: 1,
          scheduled: 1,
          ongoing: 1,
          completed: 1,
          cancelled: 1,
          attendanceRate: {
            $cond: [
              { $gt: ['$completed', 0] },
              {
                $multiply: [
                  {
                    $divide: [
                      { $sum: { $size: '$attendees' } },
                      { $multiply: ['$completed', 10] } // Assuming max 10 attendees per meeting
                    }
                  },
                  100
                ]
              },
              0
            ]
          }
        }
      }
    ]);

    return stats[0] || {
      totalMeetings: 0,
      scheduled: 0,
      ongoing: 0,
      completed: 0,
      cancelled: 0,
      attendanceRate: 0
    };
  }

  // Update meeting status
  async updateMeetingStatus(req, res) {
    try {
      const { id } = req.params;
      const { status, minutes, decisions } = req.body;

      const meeting = await CommitteeMeeting.findById(id)
        .populate('attendees.user', 'email firstName lastName');

      if (!meeting) {
        return res.status(404).json({
          success: false,
          message: 'Meeting not found'
        });
      }

      // Check permission
      if (!this.canModifyMeeting(req.user, meeting)) {
        return res.status(403).json({
          success: false,
          message: 'Not authorized to update this meeting'
        });
      }

      // Validate status transition
      const validTransitions = {
        scheduled: ['ongoing', 'cancelled', 'postponed'],
        ongoing: ['completed'],
        completed: [],
        cancelled: [],
        postponed: ['scheduled']
      };

      if (!validTransitions[meeting.status]?.includes(status)) {
        return res.status(400).json({
          success: false,
          message: `Invalid status transition from ${meeting.status} to ${status}`
        });
      }

      // Update meeting
      meeting.status = status;
      
      if (minutes) {
        meeting.minutes = {
          ...minutes,
          recordedBy: req.user._id,
          recordedAt: new Date()
        };
      }

      if (decisions && decisions.length > 0) {
        meeting.decisions = decisions;
      }

      await meeting.save();

      // Send notifications based on status change
      await this.sendStatusChangeNotifications(meeting, req.user);

      res.json({
        success: true,
        message: `Meeting ${status} successfully`,
        meeting
      });

    } catch (error) {
      console.error('Update meeting status error:', error);
      res.status(500).json({
        success: false,
        message: 'Error updating meeting status',
        error: error.message
      });
    }
  }

  // Send meeting invitations
  async sendMeetingInvitations(meeting) {
    try {
      const emails = meeting.attendees.map(attendee => ({
        to: attendee.user.email,
        subject: `Meeting Invitation: ${meeting.title}`,
        template: 'meeting-invitation',
        data: {
          meeting,
          attendeeName: `${attendee.user.firstName} ${attendee.user.lastName}`,
          organizerName: `${meeting.organizer.firstName} ${meeting.organizer.lastName}`,
          acceptUrl: `${process.env.FRONTEND_URL}/meetings/${meeting._id}/accept`,
          declineUrl: `${process.env.FRONTEND_URL}/meetings/${meeting._id}/decline`
        }
      }));

      await sendEmail(emails);
    } catch (error) {
      console.error('Send invitations error:', error);
      // Don't fail the whole request if email fails
    }
  }

  // Helper method to check permissions
  canModifyMeeting(user, meeting) {
    return (
      user.role === 'admin' ||
      user._id.toString() === meeting.organizer.toString() ||
      user.committees?.includes(meeting.committee.toString())
    );
  }
}

module.exports = new CommitteeMeetingController();