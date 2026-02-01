const mongoose = require('mongoose');

const attendeeSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  status: {
    type: String,
    enum: ['invited', 'confirmed', 'declined', 'attended', 'absent'],
    default: 'invited'
  },
  responseDate: Date,
  remarks: String
});

const agendaItemSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: String,
  presenter: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  duration: Number, // in minutes
  status: {
    type: String,
    enum: ['pending', 'in_progress', 'completed', 'postponed'],
    default: 'pending'
  },
  attachments: [{
    name: String,
    url: String,
    uploadedAt: Date
  }]
});

const committeeMeetingSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  committee: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Committee',
    required: true
  },
  meetingDate: {
    type: Date,
    required: true
  },
  startTime: {
    type: String,
    required: true
  },
  endTime: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  virtualLink: String,
  meetingType: {
    type: String,
    enum: ['regular', 'emergency', 'annual', 'special', 'budget', 'planning'],
    default: 'regular'
  },
  priority: {
    type: String,
    enum: ['low', 'medium', 'high', 'urgent'],
    default: 'medium'
  },
  status: {
    type: String,
    enum: ['draft', 'scheduled', 'ongoing', 'completed', 'cancelled', 'postponed'],
    default: 'scheduled'
  },
  organizer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  attendees: [attendeeSchema],
  agenda: [agendaItemSchema],
  minutes: {
    content: String,
    recordedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    attachments: [{
      name: String,
      url: String
    }],
    approvedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    approvalDate: Date
  },
  decisions: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'CommitteeDecision'
  }],
  attachments: [{
    name: String,
    url: String,
    uploadedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    uploadedAt: {
      type: Date,
      default: Date.now
    }
  }],
  reminders: [{
    type: {
      type: String,
      enum: ['email', 'push', 'sms']
    },
    sentAt: Date,
    status: {
      type: String,
      enum: ['pending', 'sent', 'failed']
    }
  }],
  recurrence: {
    pattern: {
      type: String,
      enum: ['none', 'daily', 'weekly', 'monthly', 'yearly']
    },
    interval: Number,
    endDate: Date,
    occurrences: Number
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Virtual for meeting duration
committeeMeetingSchema.virtual('duration').get(function() {
  const start = new Date(`${this.meetingDate.toDateString()} ${this.startTime}`);
  const end = new Date(`${this.meetingDate.toDateString()} ${this.endTime}`);
  return (end - start) / (1000 * 60 * 60); // in hours
});

// Indexes for better query performance
committeeMeetingSchema.index({ meetingDate: 1, committee: 1 });
committeeMeetingSchema.index({ status: 1, meetingDate: 1 });
committeeMeetingSchema.index({ organizer: 1 });
committeeMeetingSchema.index({ 'attendees.user': 1 });

module.exports = mongoose.model('CommitteeMeeting', committeeMeetingSchema);