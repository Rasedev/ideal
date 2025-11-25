const SearchHistory = require('../models/searchSchema');
const User = require('../models/userSchema');
const Message = require('../models/smsSchema');
const Chat = require('../models/chatSchema');
const Payment = require('../models/paymentSchema');
const Event = require('../models/EventSchema');

// Global search across multiple collections
const globalSearch = async (req, res) => {
  try {
    const { query, filters = {} } = req.body;
    const userId = req.user.id;

    if (!query || query.trim().length < 2) {
      return res.status(400).json({
        success: false,
        message: "Search query must be at least 2 characters long"
      });
    }

    const searchQuery = query.trim();
    const results = {
      users: [],
      messages: [],
      chats: [],
      payments: [],
      events: []
    };

    // Search Users
    if (!filters.type || filters.type === 'users') {
      results.users = await User.find({
        $and: [
          { _id: { $ne: userId } },
          {
            $or: [
              { firstName: { $regex: searchQuery, $options: 'i' } },
              { lastName: { $regex: searchQuery, $options: 'i' } },
              { email: { $regex: searchQuery, $options: 'i' } },
              { membershipId: { $regex: searchQuery, $options: 'i' } },
              { role: { $regex: searchQuery, $options: 'i' } }
            ]
          }
        ]
      }).select('firstName lastName email profilePhoto role membershipId isActive').limit(10);
    }

    // Search Messages
    if (!filters.type || filters.type === 'messages') {
      results.messages = await Message.find({
        $or: [
          { message: { $regex: searchQuery, $options: 'i' } }
        ],
        $or: [
          { sender: userId },
          { receiver: userId }
        ]
      })
      .populate('sender', 'firstName lastName profilePhoto')
      .populate('receiver', 'firstName lastName profilePhoto')
      .sort({ createdAt: -1 })
      .limit(15);
    }

    // Search Chats
    if (!filters.type || filters.type === 'chats') {
      const userChats = await Chat.find({
        participants: userId
      }).populate('participants', 'firstName lastName profilePhoto');

      results.chats = userChats.filter(chat => {
        const otherParticipants = chat.participants.filter(p => p._id.toString() !== userId);
        return otherParticipants.some(user => 
          user.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
          user.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
          user.email.toLowerCase().includes(searchQuery.toLowerCase())
        );
      }).slice(0, 10);
    }

    // Search Payments (if you have payment model)
    if (!filters.type || filters.type === 'payments') {
      // Add payment search logic based on your payment model
    }

    // Search Events
    if (!filters.type || filters.type === 'events') {
      results.events = await Event.find({
        $or: [
          { title: { $regex: searchQuery, $options: 'i' } },
          { description: { $regex: searchQuery, $options: 'i' } },
          { location: { $regex: searchQuery, $options: 'i' } }
        ]
      }).limit(10);
    }

    // Save search history
    const searchHistory = new SearchHistory({
      user: userId,
      query: searchQuery,
      filters,
      resultCount: Object.values(results).reduce((total, arr) => total + arr.length, 0)
    });

    await searchHistory.save();

    res.status(200).json({
      success: true,
      data: results,
      totalResults: Object.values(results).reduce((total, arr) => total + arr.length, 0)
    });

  } catch (error) {
    console.error('Global search error:', error);
    res.status(500).json({
      success: false,
      message: 'Search failed',
      error: error.message
    });
  }
};

// Get search suggestions
const getSearchSuggestions = async (req, res) => {
  try {
    const { query } = req.query;
    const userId = req.user.id;

    if (!query || query.length < 2) {
      return res.status(200).json({
        success: true,
        data: []
      });
    }

    // Get recent searches
    const recentSearches = await SearchHistory.find({
      user: userId,
      query: { $regex: query, $options: 'i' }
    })
    .sort({ createdAt: -1 })
    .limit(5)
    .select('query resultCount');

    // Get user suggestions
    const userSuggestions = await User.find({
      _id: { $ne: userId },
      $or: [
        { firstName: { $regex: query, $options: 'i' } },
        { lastName: { $regex: query, $options: 'i' } },
        { email: { $regex: query, $options: 'i' } }
      ]
    })
    .select('firstName lastName profilePhoto role')
    .limit(3);

    res.status(200).json({
      success: true,
      data: {
        recentSearches: recentSearches.map(s => s.query),
        userSuggestions,
        popularSearches: ['messages', 'users', 'chats', 'payments'] // You can make this dynamic
      }
    });

  } catch (error) {
    console.error('Get suggestions error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get suggestions',
      error: error.message
    });
  }
};

// Get search history
const getSearchHistory = async (req, res) => {
  try {
    const userId = req.user.id;
    const { limit = 20 } = req.query;

    const history = await SearchHistory.find({ user: userId })
      .sort({ createdAt: -1 })
      .limit(parseInt(limit))
      .select('query resultCount createdAt');

    res.status(200).json({
      success: true,
      data: history
    });

  } catch (error) {
    console.error('Get search history error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get search history',
      error: error.message
    });
  }
};

// Clear search history
const clearSearchHistory = async (req, res) => {
  try {
    const userId = req.user.id;

    await SearchHistory.deleteMany({ user: userId });

    res.status(200).json({
      success: true,
      message: 'Search history cleared successfully'
    });

  } catch (error) {
    console.error('Clear search history error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to clear search history',
      error: error.message
    });
  }
};

module.exports = {
  globalSearch,
  getSearchSuggestions,
  getSearchHistory,
  clearSearchHistory
};