// controllers/committeeController.js
const CommitteeMember = require('../models/committeeSchema');
const User = require('../models/userSchema');
const Employee = require('../models/employeeSchema');

// Get all committee members
exports.getAllCommitteeMembers = async (req, res) => {
  try {
    const { 
      search, 
      role, 
      status, 
      page = 1, 
      limit = 10,
      currentOnly = true 
    } = req.query;

    // Build query
    let query = {};
    
    if (currentOnly === 'true') {
      query['term.isCurrent'] = true;
    }
    
    if (role && role !== 'all') {
      query.committeeRole = role;
    }
    
    if (status && status !== 'all') {
      query.committeeStatus = status;
    }

    // Search across member names and emails
    if (search) {
      const userMembers = await User.find({
        $or: [
          { firstName: { $regex: search, $options: 'i' } },
          { lastName: { $regex: search, $options: 'i' } },
          { email: { $regex: search, $options: 'i' } },
          { membershipId: { $regex: search, $options: 'i' } }
        ]
      }).select('_id');

      const employeeMembers = await Employee.find({
        $or: [
          { firstName: { $regex: search, $options: 'i' } },
          { lastName: { $regex: search, $options: 'i' } },
          { email: { $regex: search, $options: 'i' } },
          { employeeId: { $regex: search, $options: 'i' } }
        ]
      }).select('_id');

      const memberIds = [
        ...userMembers.map(u => u._id),
        ...employeeMembers.map(e => e._id)
      ];

      query.memberId = { $in: memberIds };
    }

    // Execute query with pagination
    const committeeMembers = await CommitteeMember.find(query)
      .populate('memberInfo')
      .populate('appointedBy', 'firstName lastName email')
      .sort({ priority: 1, committeeRole: 1, createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    // Get total count for pagination
    const total = await CommitteeMember.countDocuments(query);

    res.status(200).json({
      success: true,
      count: committeeMembers.length,
      total,
      page: parseInt(page),
      pages: Math.ceil(total / limit),
      committeeMembers
    });

  } catch (error) {
    console.error('Get committee members error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch committee members',
      error: error.message
    });
  }
};

// Get committee member by ID
exports.getCommitteeMemberById = async (req, res) => {
  try {
    const { id } = req.params;

    const committeeMember = await CommitteeMember.findById(id)
      .populate('memberInfo')
      .populate('appointedBy', 'firstName lastName email');

    if (!committeeMember) {
      return res.status(404).json({
        success: false,
        message: 'Committee member not found'
      });
    }

    res.status(200).json({
      success: true,
      committeeMember
    });

  } catch (error) {
    console.error('Get committee member error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch committee member',
      error: error.message
    });
  }
};

// Add committee member
exports.addCommitteeMember = async (req, res) => {
  try {
    const {
      memberId,
      memberModel,
      committeeRole,
      termStart,
      termEnd,
      responsibilities,
      votingRights,
      canChairMeetings,
      priority,
      notes
    } = req.body;

    // Validate member exists
    let MemberModel;
    if (memberModel === 'User') {
      MemberModel = User;
    } else if (memberModel === 'Employee') {
      MemberModel = Employee;
    } else {
      return res.status(400).json({
        success: false,
        message: 'Invalid member model'
      });
    }

    const member = await MemberModel.findById(memberId);
    if (!member) {
      return res.status(404).json({
        success: false,
        message: 'Member not found'
      });
    }

    // Check if already in committee for current term
    const existingMember = await CommitteeMember.findOne({
      memberId,
      memberModel,
      'term.isCurrent': true,
      committeeStatus: 'active'
    });

    if (existingMember) {
      return res.status(400).json({
        success: false,
        message: 'Member is already in the current committee'
      });
    }

    // Create committee member
    const committeeMember = new CommitteeMember({
      memberId,
      memberModel,
      committeeRole,
      term: {
        startDate: termStart,
        endDate: termEnd,
        isCurrent: true
      },
      responsibilities,
      votingRights: votingRights !== undefined ? votingRights : true,
      canChairMeetings: canChairMeetings !== undefined ? canChairMeetings : false,
      priority: priority || 0,
      notes,
      appointedBy: req.user.userId
    });

    await committeeMember.save();

    // Populate for response
    await committeeMember.populate('memberInfo');
    await committeeMember.populate('appointedBy', 'firstName lastName email');

    res.status(201).json({
      success: true,
      message: 'Committee member added successfully',
      committeeMember
    });

  } catch (error) {
    console.error('Add committee member error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to add committee member',
      error: error.message
    });
  }
};

// Update committee member
exports.updateCommitteeMember = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const committeeMember = await CommitteeMember.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    )
    .populate('memberInfo')
    .populate('appointedBy', 'firstName lastName email');

    if (!committeeMember) {
      return res.status(404).json({
        success: false,
        message: 'Committee member not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Committee member updated successfully',
      committeeMember
    });

  } catch (error) {
    console.error('Update committee member error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update committee member',
      error: error.message
    });
  }
};

// Remove committee member
exports.removeCommitteeMember = async (req, res) => {
  try {
    const { id } = req.params;

    const committeeMember = await CommitteeMember.findByIdAndUpdate(
      id,
      { committeeStatus: 'inactive' },
      { new: true }
    );

    if (!committeeMember) {
      return res.status(404).json({
        success: false,
        message: 'Committee member not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Committee member removed successfully'
    });

  } catch (error) {
    console.error('Remove committee member error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to remove committee member',
      error: error.message
    });
  }
};

// Get committee statistics
exports.getCommitteeStats = async (req, res) => {
  try {
    // Total committee members
    const totalMembers = await CommitteeMember.countDocuments({
      'term.isCurrent': true,
      committeeStatus: 'active'
    });

    // Members by role
    const roleDistribution = await CommitteeMember.aggregate([
      {
        $match: {
          'term.isCurrent': true,
          committeeStatus: 'active'
        }
      },
      {
        $group: {
          _id: '$committeeRole',
          count: { $sum: 1 }
        }
      },
      {
        $sort: { count: -1 }
      }
    ]);

    // Members by source (User/Employee)
    const sourceDistribution = await CommitteeMember.aggregate([
      {
        $match: {
          'term.isCurrent': true,
          committeeStatus: 'active'
        }
      },
      {
        $group: {
          _id: '$memberModel',
          count: { $sum: 1 }
        }
      }
    ]);

    // Upcoming term endings (next 30 days)
    const upcomingEndings = await CommitteeMember.countDocuments({
      'term.isCurrent': true,
      committeeStatus: 'active',
      'term.endDate': {
        $gte: new Date(),
        $lte: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) // 30 days
      }
    });

    res.status(200).json({
      success: true,
      stats: {
        totalMembers,
        roleDistribution,
        sourceDistribution,
        upcomingEndings,
        activeMembers: totalMembers
      }
    });

  } catch (error) {
    console.error('Get committee stats error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch committee statistics',
      error: error.message
    });
  }
};

// Search members for committee
exports.searchMembers = async (req, res) => {
  try {
    const { q: searchTerm } = req.query;

    if (!searchTerm) {
      return res.status(400).json({
        success: false,
        message: 'Search term is required'
      });
    }

    // Search in Users
    const users = await User.find({
      $or: [
        { firstName: { $regex: searchTerm, $options: 'i' } },
        { lastName: { $regex: searchTerm, $options: 'i' } },
        { email: { $regex: searchTerm, $options: 'i' } },
        { membershipId: { $regex: searchTerm, $options: 'i' } }
      ],
      isActive: true
    })
    .select('firstName lastName email membershipId profilePhoto role')
    .limit(10);

    // Search in Employees
    const employees = await Employee.find({
      $or: [
        { firstName: { $regex: searchTerm, $options: 'i' } },
        { lastName: { $regex: searchTerm, $options: 'i' } },
        { email: { $regex: searchTerm, $options: 'i' } },
        { employeeId: { $regex: searchTerm, $options: 'i' } }
      ],
      status: 'active'
    })
    .select('firstName lastName email employeeId image position department')
    .limit(10);

    const results = [
      ...users.map(user => ({
        _id: user._id,
        source: 'User',
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        identifier: user.membershipId || user._id,
        profilePhoto: user.profilePhoto,
        role: user.role,
        displayText: `${user.firstName} ${user.lastName} - ${user.membershipId || 'User'} (${user.role})`
      })),
      ...employees.map(emp => ({
        _id: emp._id,
        source: 'Employee',
        firstName: emp.firstName,
        lastName: emp.lastName,
        email: emp.email,
        identifier: emp.employeeId || emp._id,
        profilePhoto: emp.image,
        position: emp.position,
        department: emp.department,
        displayText: `${emp.firstName} ${emp.lastName} - ${emp.employeeId} (${emp.position})`
      }))
    ];

    res.status(200).json({
      success: true,
      count: results.length,
      results
    });

  } catch (error) {
    console.error('Search members error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to search members',
      error: error.message
    });
  }
};