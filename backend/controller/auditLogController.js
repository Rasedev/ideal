// controllers/admin/auditLogController.js
const AuditLog = require('../models/AuditLogSchema');

class AuditLogController {
  
  // Get audit logs with filters
  async getAuditLogs(req, res) {
    try {
      const {
        page = 1,
        limit = 50,
        action = '',
        module = '',
        userId = '',
        startDate = '',
        endDate = '',
        sortBy = 'timestamp',
        sortOrder = 'desc'
      } = req.query;

      // Build filter object
      const filter = {};
      
      if (action) filter.action = { $regex: action, $options: 'i' };
      if (module) filter.module = { $regex: module, $options: 'i' };
      if (userId) filter.userId = userId;
      
      // Date range filter
      if (startDate || endDate) {
        filter.timestamp = {};
        if (startDate) filter.timestamp.$gte = new Date(startDate);
        if (endDate) filter.timestamp.$lte = new Date(endDate);
      }

      const logs = await AuditLog.find(filter)
        .populate('userId', 'firstName lastName email role')
        .sort({ [sortBy]: sortOrder === 'desc' ? -1 : 1 })
        .limit(limit * 1)
        .skip((page - 1) * limit)
        .lean();

      const total = await AuditLog.countDocuments(filter);

      res.json({
        success: true,
        data: {
          logs,
          pagination: {
            currentPage: parseInt(page),
            totalPages: Math.ceil(total / limit),
            totalLogs: total,
            hasNext: page * limit < total,
            hasPrev: page > 1
          }
        }
      });

    } catch (error) {
      console.error('Get audit logs error:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to fetch audit logs'
      });
    }
  }

  // Get audit statistics
  async getAuditStatistics(req, res) {
    try {
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

      const stats = await AuditLog.aggregate([
        {
          $match: {
            timestamp: { $gte: thirtyDaysAgo }
          }
        },
        {
          $group: {
            _id: {
              action: '$action',
              module: '$module'
            },
            count: { $sum: 1 }
          }
        },
        {
          $sort: { count: -1 }
        },
        {
          $limit: 10
        }
      ]);

      const dailyActivity = await AuditLog.aggregate([
        {
          $match: {
            timestamp: { $gte: thirtyDaysAgo }
          }
        },
        {
          $group: {
            _id: {
              year: { $year: '$timestamp' },
              month: { $month: '$timestamp' },
              day: { $dayOfMonth: '$timestamp' }
            },
            count: { $sum: 1 }
          }
        },
        {
          $sort: { '_id.year': -1, '_id.month': -1, '_id.day': -1 }
        },
        {
          $limit: 15
        }
      ]);

      res.json({
        success: true,
        data: {
          topActivities: stats,
          dailyActivity
        }
      });

    } catch (error) {
      console.error('Get audit statistics error:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to fetch audit statistics'
      });
    }
  }
}

module.exports = new AuditLogController();