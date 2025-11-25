const mongoose = require('mongoose');

const searchHistorySchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  query: {
    type: String,
    required: true,
    trim: true
  },
  results: [{
    type: {
      type: String,
      enum: ['user', 'message', 'chat', 'document', 'payment', 'event'],
      required: true
    },
    itemId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true
    },
    title: String,
    description: String,
    relevance: {
      type: Number,
      min: 0,
      max: 1,
      default: 0
    }
  }],
  filters: {
    type: Map,
    of: String
  },
  resultCount: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

// Index for better search performance
// searchHistorySchema.index({ user: 1, createdAt: -1 });
searchHistorySchema.index({ query: 'text' });

module.exports = mongoose.model('SearchHistory', searchHistorySchema);