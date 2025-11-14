export const checkPermission = (permissionName) => {
  return (req, res, next) => {
    const user = req.user;

    if (!user) {
      return res.status(401).json({ 
        success: false, 
        message: 'Unauthorized' 
      });
    }

    if (!user.permissions[permissionName]) {
      return res.status(403).json({ 
        success: false, 
        message: `Access denied - ${permissionName} not allowed` 
      });
    }

    console.log(` Permission granted: ${permissionName} for ${user.role}`);
    next();
  };
};


export const checkRole = (allowedRoles) => {
  return (req, res, next) => {
    const userRole = req.user?.role;

    if (!userRole || !allowedRoles.includes(userRole)) {
      return res.status(403).json({ 
        success: false, 
        message: `Access denied - only ${allowedRoles.join(', ')} can access` 
      });
    }

    console.log(` Role check passed: ${userRole}`);
    next();
  };
};
