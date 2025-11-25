const express = require('express');
const router = express.Router();
const {
  globalSearch,
  getSearchSuggestions,
  getSearchHistory,
  clearSearchHistory
} = require('../../controller/searchController');
const authMiddleware = require('../../middleware/authMiddleware');

// All routes are protected
router.post('/global', authMiddleware, globalSearch);
router.get('/suggestions', authMiddleware, getSearchSuggestions);
router.get('/history', authMiddleware, getSearchHistory);
router.delete('/history', authMiddleware, clearSearchHistory);

module.exports = router;