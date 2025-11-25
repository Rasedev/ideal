
const User = require('../models/userSchema');
const Contact = require('../models/contactSchema');

const contactController = {
  // Get all contacts (main function used by contact.jsx)
  getContacts: async (req, res) => {
    try {
      const {
        page = 1,
        limit = 50,
        search,
        role,
        status,
        country,
        sortBy = 'firstName',
        sortOrder = 'asc'
      } = req.query;

      // Build filter object
      const filter = { isActive: true };
      
      if (role) filter.role = role;
      if (status) filter.membershipStatus = status;
      if (country) filter['address.country'] = country;
      
      // Search across multiple fields
      if (search) {
        filter.$or = [
          { firstName: { $regex: search, $options: 'i' } },
          { lastName: { $regex: search, $options: 'i' } },
          { email: { $regex: search, $options: 'i' } },
          { 'phones.number': { $regex: search, $options: 'i' } },
          { membershipId: { $regex: search, $options: 'i' } }
        ];
      }

      // Sorting
      const sortOptions = {};
      sortOptions[sortBy] = sortOrder === 'desc' ? -1 : 1;

      const users = await User.find(filter)
        .select('firstName lastName email role phones membershipId membershipStatus contactPreferences address profilePhoto createdAt lastLogin')
        .limit(limit * 1)
        .skip((page - 1) * limit)
        .sort(sortOptions);

      const total = await User.countDocuments(filter);

      res.status(200).json({
        success: true,
        data: users,
        pagination: {
          page: parseInt(page),
          limit: parseInt(limit),
          total,
          pages: Math.ceil(total / limit)
        }
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Failed to fetch contacts",
        error: error.message
      });
    }
  },

  // Create new contact
  createContact: async (req, res) => {
    try {
      const contactData = req.body;

      // Check if user already exists
      const existingUser = await User.findOne({
        $or: [
          { email: contactData.email },
          { 'phones.number': contactData.phone }
        ]
      });

      if (existingUser) {
        return res.status(400).json({
          success: false,
          message: "Contact with this email or phone already exists"
        });
      }

      const newContact = new User({
        firstName: contactData.firstName,
        lastName: contactData.lastName,
        email: contactData.email,
        phones: [{
          number: contactData.phone,
          type: 'mobile',
          isPrimary: true,
          countryCode: contactData.countryCode || '+1'
        }],
        role: contactData.role || 'Member',
        membershipStatus: contactData.status || 'active',
        address: contactData.address,
        contactPreferences: {
          smsEnabled: true,
          emailEnabled: true,
          callEnabled: true
        }
      });

      await newContact.save();

      // Remove password from response
      const contactResponse = newContact.toObject();
      delete contactResponse.password;

      res.status(201).json({
        success: true,
        message: "Contact created successfully",
        data: contactResponse
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Failed to create contact",
        error: error.message
      });
    }
  },

  // Get contact by ID
  getContactById: async (req, res) => {
    try {
      const { id } = req.params;

      const user = await User.findById(id)
        .select('-password');

      if (!user) {
        return res.status(404).json({
          success: false,
          message: "Contact not found"
        });
      }

      res.status(200).json({
        success: true,
        data: user
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Failed to fetch contact",
        error: error.message
      });
    }
  },

  // Update contact
  updateContact: async (req, res) => {
    try {
      const { id } = req.params;
      const updates = req.body;

      const updatedContact = await User.findByIdAndUpdate(
        id,
        updates,
        { new: true, runValidators: true }
      ).select('-password');

      if (!updatedContact) {
        return res.status(404).json({
          success: false,
          message: "Contact not found"
        });
      }

      res.status(200).json({
        success: true,
        message: "Contact updated successfully",
        data: updatedContact
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Failed to update contact",
        error: error.message
      });
    }
  },

  // Delete contact (soft delete)
  deleteContact: async (req, res) => {
    try {
      const { id } = req.params;

      const deletedContact = await User.findByIdAndUpdate(
        id,
        { isActive: false },
        { new: true }
      );

      if (!deletedContact) {
        return res.status(404).json({
          success: false,
          message: "Contact not found"
        });
      }

      res.status(200).json({
        success: true,
        message: "Contact deleted successfully"
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Failed to delete contact",
        error: error.message
      });
    }
  },

  // Get users with contacts (original function)
  getUsersWithContacts: async (req, res) => {
    try {
      const { page = 1, limit = 50, search, role, status } = req.query;
      
      const filter = { 
        isActive: true,
        "phones.0": { $exists: true }
      };

      if (role) filter.role = role;
      if (status) filter.membershipStatus = status;
      if (search) {
        filter.$or = [
          { firstName: { $regex: search, $options: 'i' } },
          { lastName: { $regex: search, $options: 'i' } },
          { email: { $regex: search, $options: 'i' } },
          { "phones.number": { $regex: search, $options: 'i' } }
        ];
      }

      const users = await User.find(filter)
        .select('firstName lastName email role phones membershipId membershipStatus contactPreferences profilePhoto')
        .limit(limit * 1)
        .skip((page - 1) * limit)
        .sort({ firstName: 1 });

      const total = await User.countDocuments(filter);

      res.status(200).json({
        success: true,
        data: users,
        pagination: {
          page: parseInt(page),
          limit: parseInt(limit),
          total,
          pages: Math.ceil(total / limit)
        }
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Failed to fetch users",
        error: error.message
      });
    }
  },

  // Get users by role
  getUsersByRole: async (req, res) => {
    try {
      const { role } = req.params;
      const { withPhonesOnly = true } = req.query;

      let filter = { 
        role, 
        isActive: true,
        membershipStatus: "active"
      };

      if (withPhonesOnly) {
        filter["phones.verified"] = true;
      }

      const users = await User.find(filter)
        .select('firstName lastName email phones membershipId contactPreferences profilePhoto')
        .sort({ firstName: 1 });

      res.status(200).json({
        success: true,
        data: users,
        count: users.length
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Failed to fetch users by role",
        error: error.message
      });
    }
  },

  // Get user contacts
  getUserContacts: async (req, res) => {
    try {
      const { userId } = req.params;

      const user = await User.findById(userId)
        .select('firstName lastName email phones contactPreferences membershipId role profilePhoto address');

      if (!user) {
        return res.status(404).json({
          success: false,
          message: "User not found"
        });
      }

      res.status(200).json({
        success: true,
        data: user
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Failed to fetch user contacts",
        error: error.message
      });
    }
  },

  // Update contact preferences
  updateContactPreferences: async (req, res) => {
    try {
      const { userId } = req.params;
      const updates = req.body;

      const user = await User.findByIdAndUpdate(
        userId,
        { contactPreferences: updates },
        { new: true, runValidators: true }
      ).select('firstName lastName contactPreferences email profilePhoto');

      if (!user) {
        return res.status(404).json({
          success: false,
          message: "User not found"
        });
      }

      res.status(200).json({
        success: true,
        message: "Contact preferences updated successfully",
        data: user
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Failed to update contact preferences",
        error: error.message
      });
    }
  },

  // Import contacts
  importContacts: async (req, res) => {
    try {
      const { contacts } = req.body;
      
      const importedContacts = [];
      const errors = [];

      for (const contact of contacts) {
        try {
          const existingContact = await User.findOne({ 
            $or: [
              { email: contact.email },
              { 'phones.number': contact.phone }
            ]
          });

          if (!existingContact) {
            const newContact = new User({
              firstName: contact.firstName,
              lastName: contact.lastName,
              email: contact.email,
              phones: [{
                number: contact.phone,
                type: 'mobile',
                isPrimary: true,
                countryCode: contact.countryCode || '+1'
              }],
              role: contact.role || 'Member',
              membershipStatus: 'active'
            });

            await newContact.save();
            importedContacts.push(newContact);
          }
        } catch (error) {
          errors.push({
            contact,
            error: error.message
          });
        }
      }

      res.status(200).json({
        success: true,
        message: `Successfully imported ${importedContacts.length} contacts`,
        imported: importedContacts,
        errors,
        totalAttempted: contacts.length
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Failed to import contacts",
        error: error.message
      });
    }
  },

  // Get contact analytics
  getContactAnalytics: async (req, res) => {
    try {
      const totalContacts = await User.countDocuments({ isActive: true });
      const activeContacts = await User.countDocuments({ 
        isActive: true, 
        membershipStatus: 'active' 
      });
      
      const contactsByRole = await User.aggregate([
        { $match: { isActive: true } },
        { $group: { _id: '$role', count: { $sum: 1 } } }
      ]);

      const verifiedPhones = await User.countDocuments({
        'phones.verified': true
      });

      res.status(200).json({
        success: true,
        data: {
          totalContacts,
          activeContacts,
          verifiedPhones,
          byRole: contactsByRole
        }
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Failed to fetch contact analytics",
        error: error.message
      });
    }
  },

  // Search global contacts
  searchGlobalContacts: async (req, res) => {
    try {
      const { query, countries, roles, limit = 50 } = req.body;

      const filter = { 
        isActive: true,
        membershipStatus: 'active'
      };

      if (countries && countries.length > 0) {
        filter['address.country'] = { $in: countries };
      }

      if (roles && roles.length > 0) {
        filter.role = { $in: roles };
      }

      if (query) {
        filter.$or = [
          { firstName: { $regex: query, $options: 'i' } },
          { lastName: { $regex: query, $options: 'i' } },
          { email: { $regex: query, $options: 'i' } }
        ];
      }

      const contacts = await User.find(filter)
        .select('firstName lastName email role phones address countryCode profilePhoto')
        .limit(limit)
        .sort({ createdAt: -1 });

      res.status(200).json({
        success: true,
        data: contacts,
        count: contacts.length
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Failed to search global contacts",
        error: error.message
      });
    }
  }
};

module.exports = contactController;