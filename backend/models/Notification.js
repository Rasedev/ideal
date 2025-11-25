// const mongoose = require('mongoose');

// const NotificationSchema = new mongoose.Schema({
//   to: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }], // recipients
//   from: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
//   type: { type: String, enum: ['broadcast','personal','system'], default: 'personal' },
//   channel: [{ type: String, enum: ['inapp','email','sms'] }],
//   title: String,
//   body: String,
//   meta: mongoose.Schema.Types.Mixed,
//   delivered: { type: Boolean, default: false },
//   deliveredAt: Date
// }, { timestamps: true });

// module.exports = mongoose.model('Notification', NotificationSchema);




const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  type: {
    type: String,
    enum: ['message', 'payment', 'event', 'system', 'alert'],
    required: true
  },
  title: {
    type: String,
    required: true
  },
  message: {
    type: String,
    required: true
  },
  relatedId: {
    type: mongoose.Schema.Types.ObjectId,
    refPath: 'relatedModel'
  },
  relatedModel: {
    type: String,
    enum: ['User', 'Message', 'Payment', 'Event', 'Chat']
  },
  read: {
    type: Boolean,
    default: false
  },
  readAt: Date,
  priority: {
    type: String,
    enum: ['low', 'medium', 'high'],
    default: 'medium'
  }
}, {
  timestamps: true
});
module.exports = mongoose.model('Notification', notificationSchema);

// Index for better performance
// notificationSchema.index({ user: 1, createdAt: -1 });
// notificationSchema.index({ user: 1, read: 1 });
















