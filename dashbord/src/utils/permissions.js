// utils/permissions.js
const rolePermissions = {
  SuperAdmin: {
    users: ['create', 'read', 'update', 'delete', 'manage_roles'],
    content: ['create', 'read', 'update', 'delete'],
    financial: ['create', 'read', 'update', 'delete'],
    settings: ['read', 'update']
  },
  Admin: {
    users: ['create', 'read', 'update', 'delete'],
    content: ['create', 'read', 'update', 'delete'],
    financial: ['create', 'read', 'update'],
    settings: ['read']
  },
  HR: {
    users: ['create', 'read', 'update'],
    content: ['create', 'read', 'update'],
    financial: ['read'],
    settings: ['read']
  },
  Manager: {
    users: ['read', 'update'],
    content: ['create', 'read', 'update'],
    financial: ['read'],
    settings: []
  },
  Member: {
    users: ['read'],
    content: ['read'],
    financial: [],
    settings: []
  },
  Employee: {
    users: ['read'],
    content: ['read'],
    financial: [],
    settings: []
  }
};

const checkPermission = (userRole, resource, action) => {
  const permissions = rolePermissions[userRole];
  return permissions && permissions[resource]?.includes(action);
};

module.exports = { rolePermissions, checkPermission };