// scripts/initialSetup.js
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('../models/userSchema');
const RolePermission = require('../models/RolePermission');
const SystemSettings = require('../models/SystemSettings');

const initialSetup = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('🔗 Connected to database');

    // 1. Create SuperAdmin
    const existingAdmin = await User.findOne({ email: 'admin@alamgirhossain.com' });
    
    if (!existingAdmin) {
      const hashedPassword = await bcrypt.hash('Admin123!', 12);
      
      const superAdmin = new User({
        firstName: 'System',
        lastName: 'Administrator',
        email: 'admin@alamgirhossain.com',
        password: hashedPassword,
        role: 'SuperAdmin',
        emailVerified: true,
        isActive: true,
        phone: '+8801XXXXXXXXX',
        address: {
          street: 'Association Headquarters',
          city: 'Dhaka',
          state: 'Dhaka',
          country: 'Bangladesh'
        }
      });

      await superAdmin.save();
      console.log('✅ SuperAdmin created successfully');
    } else {
      console.log('ℹ️  SuperAdmin already exists');
    }

    // 2. Create default role permissions
    const defaultPermissions = {
      SuperAdmin: {
        userManagement: { view: true, create: true, edit: true, delete: true, export: true },
        memberManagement: { view: true, create: true, edit: true, delete: true, approve: true },
        financial: { view: true, create: true, edit: true, delete: true, approve: true },
        reports: { view: true, generate: true, export: true },
        settings: { view: true, modify: true },
        announcements: { view: true, create: true, edit: true, delete: true }
      },
      Admin: {
        userManagement: { view: true, create: true, edit: true, delete: true, export: true },
        memberManagement: { view: true, create: true, edit: true, delete: true, approve: true },
        financial: { view: true, create: true, edit: true, delete: false, approve: true },
        reports: { view: true, generate: true, export: true },
        settings: { view: true, modify: false },
        announcements: { view: true, create: true, edit: true, delete: true }
      },
      HR: {
        userManagement: { view: true, create: true, edit: true, delete: false, export: true },
        memberManagement: { view: true, create: true, edit: true, delete: false, approve: true },
        financial: { view: true, create: false, edit: false, delete: false, approve: false },
        reports: { view: true, generate: true, export: true },
        settings: { view: true, modify: false },
        announcements: { view: true, create: true, edit: true, delete: false }
      },
      Manager: {
        userManagement: { view: true, create: false, edit: true, delete: false, export: false },
        memberManagement: { view: true, create: false, edit: true, delete: false, approve: false },
        financial: { view: true, create: false, edit: false, delete: false, approve: false },
        reports: { view: true, generate: false, export: false },
        settings: { view: false, modify: false },
        announcements: { view: true, create: false, edit: false, delete: false }
      },
      Member: {
        userManagement: { view: false, create: false, edit: false, delete: false, export: false },
        memberManagement: { view: false, create: false, edit: false, delete: false, approve: false },
        financial: { view: false, create: false, edit: false, delete: false, approve: false },
        reports: { view: false, generate: false, export: false },
        settings: { view: false, modify: false },
        announcements: { view: true, create: false, edit: false, delete: false }
      }
    };

    for (const [role, permissions] of Object.entries(defaultPermissions)) {
      await RolePermission.findOneAndUpdate(
        { role },
        { permissions, createdBy: (await User.findOne({ role: 'SuperAdmin' }))._id },
        { upsert: true, new: true }
      );
    }
    console.log('✅ Role permissions initialized');

    // 3. Create default system settings
    const defaultSettings = [
      { key: 'site_name', value: 'Alamgir Hossain City Kallan Samity', type: 'string', category: 'general', isPublic: true },
      { key: 'membership_fee', value: 500, type: 'number', category: 'membership' },
      { key: 'currency', value: 'BDT', type: 'string', category: 'payment', isPublic: true },
      { key: 'email_notifications', value: true, type: 'boolean', category: 'email' },
      { key: 'max_login_attempts', value: 5, type: 'number', category: 'security' }
    ];

    for (const setting of defaultSettings) {
      await SystemSettings.findOneAndUpdate(
        { key: setting.key },
        setting,
        { upsert: true }
      );
    }
    console.log('✅ System settings initialized');

    console.log('🎉 Initial setup completed successfully!');
    process.exit(0);

  } catch (error) {
    console.error('❌ Initial setup failed:', error);
    process.exit(1);
  }
};

initialSetup();