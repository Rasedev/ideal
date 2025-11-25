const Event = require("../models/EventSchema");
const User = require("../models/userSchema");
const { createObjectCsvStringifier } = require("csv-writer");
const mongoose = require("mongoose");

// Create Event
async function createEventController(req, res) {
  try {
    const {
      title,
      description,
      date,
      time,
      venue,
      organizer,
      category,
      maxParticipants,
      registrationDeadline,
      isRegistrationRequired
    } = req.body;

    // Validate required fields
    if (!title || !description || !date || !time || !venue || !organizer || !category) {
      return res.status(400).json({
        success: false,
        message: "All required fields must be provided"
      });
    }

    // Validate date is not in past
    if (new Date(date) < new Date()) {
      return res.status(400).json({
        success: false,
        message: "Event date cannot be in the past"
      });
    }

    // Validate category
    const validCategories = ['charity', 'community', 'educational', 'health', 'cultural', 'sports', 'other'];
    if (!validCategories.includes(category)) {
      return res.status(400).json({
        success: false,
        message: "Invalid event category"
      });
    }

    // Handle images
    const images = req.files ? req.files.map(file => ({
      url: `${req.protocol}://${req.get("host")}/uploads/events/${file.filename}`,
      caption: ""
    })) : [];

    // Create event
    const event = new Event({
      title,
      description,
      date: new Date(date),
      time,
      venue,
      organizer,
      category,
      maxParticipants: maxParticipants || null,
      registrationDeadline: registrationDeadline ? new Date(registrationDeadline) : null,
      isRegistrationRequired: isRegistrationRequired || false,
      images,
      createdBy: req.user.id,
      status: 'upcoming'
    });

    await event.save();

    // Populate createdBy for response
    const createdEvent = await Event.findById(event._id)
      .populate("createdBy", "firstName lastName email");

    res.status(201).json({
      success: true,
      message: "Event created successfully!",
      data: createdEvent
    });
  } catch (error) {
    console.error("Event creation failed:", error);
    
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors
      });
    }
    
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: "Duplicate field value entered",
        field: Object.keys(error.keyPattern)[0]
      });
    }

    res.status(500).json({
      success: false,
      message: "Server error while creating event",
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
}

// Get Single Event
async function getEventController(req, res) {
  try {
    const { id } = req.params;
    
    const event = await Event.findById(id)
      .populate("createdBy", "firstName lastName email")
      .populate("updatedBy", "firstName lastName email");

    if (!event) {
      return res.status(404).json({
        success: false,
        message: "Event not found"
      });
    }

    res.status(200).json({
      success: true,
      data: event
    });
  } catch (error) {
    console.error("Get event error:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching event",
      error: error.message
    });
  }
}

// Update Event
async function updateEventController(req, res) {
  try {
    const { id } = req.params;
    const updates = req.body;

    // Check if event exists
    const existingEvent = await Event.findById(id);
    if (!existingEvent) {
      return res.status(404).json({ 
        success: false,
        error: "Event not found" 
      });
    }

    // Check if user is creator or admin
    if (existingEvent.createdBy.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ 
        success: false,
        error: "Not authorized to update this event" 
      });
    }

    // Handle date updates
    if (updates.date) {
      updates.date = new Date(updates.date);
      if (updates.date < new Date()) {
        return res.status(400).json({
          success: false,
          message: "Event date cannot be in the past"
        });
      }
    }

    // Handle image uploads
    if (req.files && req.files.length > 0) {
      const newImages = req.files.map(file => ({
        url: `${req.protocol}://${req.get("host")}/uploads/events/${file.filename}`,
        caption: ""
      }));
      updates.$push = { images: { $each: newImages } };
    }

    // Add updatedBy field
    updates.updatedBy = req.user.id;

    const updatedEvent = await Event.findByIdAndUpdate(
      id, 
      updates, 
      { new: true, runValidators: true }
    )
    .populate("createdBy", "firstName lastName email")
    .populate("updatedBy", "firstName lastName email");

    res.json({ 
      success: true, 
      message: "Event updated successfully",
      data: updatedEvent 
    });
  } catch (error) {
    console.error("Update event error:", error);
    res.status(500).json({ 
      success: false,
      error: "Failed to update event" 
    });
  }
}

// Delete Event
async function deleteEventController(req, res) {
  try {
    const { id } = req.params;

    const event = await Event.findById(id);
    if (!event) {
      return res.status(404).json({ 
        success: false,
        error: "Event not found" 
      });
    }

    // Only admin can delete events
    if (req.user.role !== 'admin') {
      return res.status(403).json({ 
        success: false,
        error: "Not authorized to delete events" 
      });
    }

    await Event.findByIdAndDelete(id);

    res.json({ 
      success: true,
      message: "Event deleted successfully" 
    });
  } catch (error) {
    console.error("Delete event error:", error);
    res.status(500).json({ 
      success: false,
      error: "Failed to delete event" 
    });
  }
}

// Get All Events with Filtering
async function getAllEventsController(req, res) {
  try {
    const { 
      page = 1, 
      limit = 10, 
      type, 
      category, 
      status 
    } = req.query;
    
    const skip = (page - 1) * limit;

    let filter = {};
    
    // Filter by event type (upcoming/past)
    if (type === 'upcoming') {
      filter.date = { $gte: new Date() };
      filter.status = { $in: ['upcoming', 'ongoing'] };
    } else if (type === 'past') {
      filter.date = { $lt: new Date() };
      filter.status = 'completed';
    }
    
    // Filter by category
    if (category && category !== 'all') {
      filter.category = category;
    }
    
    // Filter by status
    if (status) {
      filter.status = status;
    }

    const events = await Event.find(filter)
      .populate("createdBy", "firstName lastName email")
      .populate("updatedBy", "firstName lastName email")
      .sort({ date: type === 'past' ? -1 : 1 })
      .skip(skip)
      .limit(parseInt(limit));

    const total = await Event.countDocuments(filter);
    
    // Get counts for summary
    const upcomingCount = await Event.countDocuments({ 
      date: { $gte: new Date() },
      status: { $in: ['upcoming', 'ongoing'] }
    });
    const pastCount = await Event.countDocuments({ 
      date: { $lt: new Date() },
      status: 'completed'
    });
    const totalEvents = await Event.countDocuments();

    res.status(200).json({
      success: true,
      data: events,
      summary: { 
        total: totalEvents,
        upcoming: upcomingCount,
        past: pastCount
      },
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error("Error fetching events:", error);
    res.status(500).json({ 
      success: false,
      error: "Failed to fetch events." 
    });
  }
}

async function getUpcomingEventsController(req, res) {
  console.log(req.body)
  try {
    const { page = 1, limit = 10 } = req.query;
    const skip = (page - 1) * limit;

    const events = await Event.find({
      date: { $gte: new Date() },
      status: { $in: ['upcoming', 'ongoing'] }
    })
      .populate("createdBy", "firstName lastName email")
      .sort({ date: 1 })
      .skip(skip)
      .limit(parseInt(limit));

    const total = await Event.countDocuments({
      date: { $gte: new Date() },
      status: { $in: ['upcoming', 'ongoing'] }
    });

    res.status(200).json({
      success: true,
      data: events, // ✅ Make sure this is an array
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error("Error fetching upcoming events:", error);
    res.status(500).json({ 
      success: false,
      error: "Failed to fetch upcoming events." 
    });
  }
}

// Get Past Events - Fix response structure
async function getPastEventsController(req, res) {
  try {
    const { page = 1, limit = 10 } = req.query;
    const skip = (page - 1) * limit;

    const events = await Event.find({
      date: { $lt: new Date() },
      status: 'completed'
    })
      .populate("createdBy", "firstName lastName email")
      .sort({ date: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    const total = await Event.countDocuments({
      date: { $lt: new Date() },
      status: 'completed'
    });

    res.status(200).json({
      success: true,
      data: events, // ✅ This should be the array
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error("Error fetching past events:", error);
    res.status(500).json({ 
      success: false,
      error: "Failed to fetch past events." 
    });
  }
}

// Get Past Events
async function getPastEventsController(req, res) {
  try {
    const { page = 1, limit = 10 } = req.query;
    const skip = (page - 1) * limit;

    const events = await Event.find({
      date: { $lt: new Date() },
      status: 'completed'
    })
      .populate("createdBy", "firstName lastName email")
      .sort({ date: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    const total = await Event.countDocuments({
      date: { $lt: new Date() },
      status: 'completed'
    });

    res.status(200).json({
      success: true,
      data: events,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error("Error fetching past events:", error);
    res.status(500).json({ 
      success: false,
      error: "Failed to fetch past events." 
    });
  }
}

// Get Event Gallery - Fix response structure
async function getEventGalleryController(req, res) {
  try {
    const { page = 1, limit = 12 } = req.query;
    const skip = (page - 1) * limit;

    const events = await Event.find({
      'images.0': { $exists: true },
      status: 'completed'
    })
      .select('title date images venue category description')
      .sort({ date: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    const total = await Event.countDocuments({
      'images.0': { $exists: true },
      status: 'completed'
    });

    res.status(200).json({
      success: true,
      data: events, // ✅ This should be the array
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error("Error fetching event gallery:", error);
    res.status(500).json({ 
      success: false,
      error: "Failed to fetch event gallery." 
    });
  }
}
// Register for Event
async function registerForEventController(req, res) {
  try {
    const { id } = req.params;

    const event = await Event.findById(id);
    if (!event) {
      return res.status(404).json({ 
        success: false,
        error: "Event not found" 
      });
    }

    if (!event.isRegistrationRequired) {
      return res.status(400).json({ 
        success: false,
        error: "Registration is not required for this event" 
      });
    }

    if (event.registrationDeadline && new Date() > event.registrationDeadline) {
      return res.status(400).json({ 
        success: false,
        error: "Registration deadline has passed" 
      });
    }

    if (event.maxParticipants && event.currentParticipants >= event.maxParticipants) {
      return res.status(400).json({ 
        success: false,
        error: "Event is fully booked" 
      });
    }

    event.currentParticipants += 1;
    await event.save();

    res.json({
      success: true,
      message: "Successfully registered for the event",
      currentParticipants: event.currentParticipants
    });
  } catch (error) {
    console.error("Event registration error:", error);
    res.status(500).json({ 
      success: false,
      error: "Failed to register for event" 
    });
  }
}

// Generate Event Report
async function generateEventReportController(req, res) {
  try {
    const { category, status, format = "json" } = req.query;

    // Build dynamic query
    const query = {};
    if (category) query.category = category;
    if (status) query.status = status;

    // Fetch events
    const events = await Event.find(query)
      .populate("createdBy", "firstName lastName email")
      .sort({ date: -1 });

    if (format === "csv") {
      const csvStringifier = createObjectCsvStringifier({
        header: [
          { id: "_id", title: "ID" },
          { id: "title", title: "Title" },
          { id: "date", title: "Date" },
          { id: "time", title: "Time" },
          { id: "venue", title: "Venue" },
          { id: "organizer", title: "Organizer" },
          { id: "category", title: "Category" },
          { id: "status", title: "Status" },
          { id: "currentParticipants", title: "Participants" },
          { id: "maxParticipants", title: "Max Participants" },
        ],
      });

      const records = events.map((event) => ({
        _id: event._id,
        title: event.title,
        date: event.date.toISOString().split('T')[0],
        time: event.time,
        venue: event.venue,
        organizer: event.organizer,
        category: event.category,
        status: event.status,
        currentParticipants: event.currentParticipants,
        maxParticipants: event.maxParticipants || 'N/A'
      }));

      const csv = csvStringifier.getHeaderString() + csvStringifier.stringifyRecords(records);

      res.header("Content-Type", "text/csv");
      res.attachment("event_report.csv");
      return res.send(csv);
    }

    res.status(200).json({
      success: true,
      count: events.length,
      data: events,
    });
  } catch (err) {
    console.error("Error generating event report:", err);
    res.status(500).json({ 
      success: false,
      error: "Internal server error" 
    });
  }
}

module.exports = {
  createEventController,
  getEventController,
  updateEventController,
  deleteEventController,
  getAllEventsController,
  getUpcomingEventsController,
  getPastEventsController,
  getEventGalleryController,
  registerForEventController,
  generateEventReportController
};