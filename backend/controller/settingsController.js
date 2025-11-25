// controllers/admin/settingsController.js
const SystemSettings = require('../models/SystemSettings');
const AuditLog = require('../models/AuditLogSchema');

class SettingsController {
  
  // Get all settings
  async getSettings(req, res) {
    try {
      const { category } = req.query;
      
      const filter = {};
      if (category) filter.category = category;

      const settings = await SystemSettings.find(filter).lean();
      
      // Convert to key-value object
      const settingsObject = {};
      settings.forEach(setting => {
        settingsObject[setting.key] = setting.value;
      });

      res.json({
        success: true,
        data: settingsObject
      });

    } catch (error) {
      console.error('Get settings error:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to fetch settings'
      });
    }
  }

  // Update settings
  async updateSettings(req, res) {
    try {
      const { settings } = req.body;

      const updates = [];
      const auditLogs = [];

      for (const [key, value] of Object.entries(settings)) {
        const existingSetting = await SystemSettings.findOne({ key });
        
        if (existingSetting) {
          // Update existing setting
          const oldValue = existingSetting.value;
          existingSetting.value = value;
          existingSetting.updatedBy = req.user.userId;
          await existingSetting.save();

          updates.push({ key, value });
          
          // Prepare audit log
          auditLogs.push({
            action: 'UPDATE_SETTING',
            module: 'SystemSettings',
            userId: req.user.userId,
            userRole: req.user.role,
            ipAddress: req.ip,
            userAgent: req.get('User-Agent'),
            resourceId: key,
            oldData: { value: oldValue },
            newData: { value }
          });
        } else {
          // Create new setting (if allowed)
          const newSetting = new SystemSettings({
            key,
            value,
            type: typeof value,
            updatedBy: req.user.userId
          });
          await newSetting.save();

          updates.push({ key, value });
          
          auditLogs.push({
            action: 'CREATE_SETTING',
            module: 'SystemSettings',
            userId: req.user.userId,
            userRole: req.user.role,
            ipAddress: req.ip,
            userAgent: req.get('User-Agent'),
            resourceId: key,
            newData: { value }
          });
        }
      }

      // Bulk create audit logs
      if (auditLogs.length > 0) {
        await AuditLog.insertMany(auditLogs);
      }

      res.json({
        success: true,
        message: 'Settings updated successfully',
        data: { updates }
      });

    } catch (error) {
      console.error('Update settings error:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to update settings'
      });
    }
  }

  // Initialize default settings
  async initializeDefaultSettings(req, res) {
    try {
      const defaultSettings = [
        {
          key: 'site_name',
          value: 'Alamgir Hossain City Kallan Samity',
          type: 'string',
          category: 'general',
          description: 'Website/Organization Name',
          isPublic: true
        },
        {
          key: 'site_description',
          value: 'Community Welfare Association',
          type: 'string',
          category: 'general',
          description: 'Organization Description',
          isPublic: true
        },
        {
          key: 'admin_email',
          value: 'admin@alamgirhossain.com',
          type: 'string',
          category: 'general',
          description: 'Primary Admin Email'
        },
        {
          key: 'membership_fee',
          value: 500,
          type: 'number',
          category: 'membership',
          description: 'Annual Membership Fee'
        },
        {
          key: 'currency',
          value: 'BDT',
          type: 'string',
          category: 'payment',
          description: 'Default Currency',
          isPublic: true
        },
        {
          key: 'email_notifications',
          value: true,
          type: 'boolean',
          category: 'email',
          description: 'Enable Email Notifications'
        },
        {
          key: 'sms_notifications',
          value: true,
          type: 'boolean',
          category: 'sms',
          description: 'Enable SMS Notifications'
        },
        {
          key: 'max_login_attempts',
          value: 5,
          type: 'number',
          category: 'security',
          description: 'Maximum Login Attempts Before Lockout'
        },
        {
          key: 'session_timeout',
          value: 24,
          type: 'number',
          category: 'security',
          description: 'Session Timeout in Hours'
        }
      ];

      const results = [];
      
      for (const setting of defaultSettings) {
        const existing = await SystemSettings.findOne({ key: setting.key });
        if (!existing) {
          setting.updatedBy = req.user.userId;
          const newSetting = new SystemSettings(setting);
          await newSetting.save();
          results.push({ key: setting.key, status: 'created' });
        } else {
          results.push({ key: setting.key, status: 'exists' });
        }
      }

      // Log initialization
      await AuditLog.create({
        action: 'INITIALIZE_DEFAULT_SETTINGS',
        module: 'SystemSettings',
        userId: req.user.userId,
        userRole: req.user.role,
        ipAddress: req.ip,
        userAgent: req.get('User-Agent')
      });

      res.json({
        success: true,
        message: 'Default settings initialized',
        data: { results }
      });

    } catch (error) {
      console.error('Initialize settings error:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to initialize settings'
      });
    }
  }
}

module.exports = new SettingsController();