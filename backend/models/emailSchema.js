const mongoose = require('mongoose');

const emailSchema = new mongoose.Schema(
  {
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    status: {
      type: String,
      enum: [ 'delivered', 'failed', 'opened','draft','sent','pending','partial' ],
      default: 'draft'
    },
    recipients: [{
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
      },
      email: {
        type: String,
        required: true,
        lowercase: true,
        trim: true
      },
      status: {
        type: String,
        enum: ['draft', 'pending', 'sent', 'failed'],
        default: 'draft'
      },
      sentAt: Date,
      error: String,
      messageId: String
    }],
    subject: {
      type: String,
      required: [true, 'Subject is required'],
      trim: true,
      maxlength: 200
    },
    message: {
      type: String,
      required: [true, 'Message content is required'],
      trim: true
    },
    messageType: {
      type: String,
      enum: ['text', 'html'],
      default: 'text'
    },
    priority: {
      type: String,
      enum: ['low', 'medium', 'high'],
      default: 'medium'
    },
    category: {
      type: String,
      enum: ['announcement', 'newsletter', 'notification', 'personal', 'broadcast'],
      default: 'notification'
    },
    isDraft: {
      type: Boolean,
      default: false
    },
    isImportant: {
      type: Boolean,
      default: false
    },
    isRead: {
      type: Boolean,
      default: false
    },
    hasAttachment: {
      type: Boolean,
      default: false
    },
    attachments: [{
      filename: String,
      path: String,
      mimetype: String,
      size: Number
    }],
    sentAt: {
      type: Date,
      default: Date.now
    },
    scheduledFor: Date,
    trackingId: String
  },
  { 
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

// Virtual for recipient count
emailSchema.virtual('recipientCount').get(function() {
  return this.recipients.length;
});

// Index for better performance
emailSchema.index({ sender: 1, sentAt: -1 });
emailSchema.index({ 'recipients.user': 1 });
emailSchema.index({ category: 1 });
emailSchema.index({ isDraft: 1 });

module.exports = mongoose.model('Email', emailSchema);