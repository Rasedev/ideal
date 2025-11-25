// simple role->permission mapping (can be moved to DB)
const rolePerms = {
  super_admin: ['*'],
  finance_admin: ['view_finances','manage_subscriptions','reconcile_payments','send_broadcast'],
  publicity_admin: ['send_broadcast','manage_news'],
  office_secretary: ['manage_applications','manage_members']
  // add more...
};

function permit(requiredPerms) {
  return (req, res, next) => {
    const roles = req.user.roles || [];
    const userPerms = new Set();
    for (const r of roles) {
      const perms = rolePerms[r] || [];
      perms.forEach(p => userPerms.add(p));
    }
    if (userPerms.has('*')) return next();
    const ok = requiredPerms.every(p => userPerms.has(p));
    if (!ok) return res.status(403).json({ error: 'Forbidden' });
    next();
  };
}
module.exports = permit;
