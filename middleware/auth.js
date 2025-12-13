
import jwt from 'jsonwebtoken';
import { JWT_SECRET as CFG_SECRET } from '../config/config.js';
const JWT_SECRET = CFG_SECRET || process.env.JWT_SECRET;

if (!JWT_SECRET) {
  console.warn('Warning: JWT_SECRET not set. Set in config or process.env.JWT_SECRET');
}

const unauthorized = (res, msg = 'User not authenticated') =>
  res.status(401).json({ success: false, message: msg });

export const verifyToken = (req, res, next) => {
  try {
   
    const authHeader = req.headers?.authorization || req.headers?.Authorization;
    let token = null;

    if (authHeader && typeof authHeader === 'string') {
        // handle "Bearer <token>" or just "<token>"
      const parts = authHeader.split(' ');
      if (parts.length === 2 && /^Bearer$/i.test(parts[0])) {
        token = parts[1];
      } else if (parts.length === 1) {
        token = parts[0];
      }
    }

   
    if (!token && req.headers['x-access-token']) token = req.headers['x-access-token'];

    if (!token && req.cookies && req.cookies.token) token = req.cookies.token;

   
    if (!token && req.query && req.query.token) token = req.query.token;

    if (!token) {
      return unauthorized(res, 'User not authenticated');
    }

    
    
    let decoded;
    try {
      decoded = jwt.verify(token, JWT_SECRET);
    } catch (err) {
      console.error('JWT verify error:', err.message);
      return unauthorized(res, 'Invalid or expired token');
    }

    const userId = decoded.userId || decoded.id || decoded._id;
    const role = decoded.role || decoded.userRole || decoded.roleName;

    if (!userId) {
      console.error('JWT token missing user identifier (id/userId/_id)');
      return unauthorized(res, 'Invalid token payload');
    }
    
    // req.user = {
    //   userId: String(userId),
    //   id: String(userId),     
    //   role: role || 'customer', 
    //   raw: decoded           
    // };
        req.user = {
      _id: String(userId),
      userId: String(userId),
      id: String(userId),
      role: role || 'customer',
      ...decoded,       // optional: baaki payload bhi chahiye ho to
    };

    return next();
  } catch (err) {
    console.error('verifyToken fatal error:', err);
    return unauthorized(res);
  }
};
export const authorize = (...allowedRoles) => (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({ success: false, message: 'User not authenticated' });
  }
  if (allowedRoles.length === 0) return next(); 
  if (!allowedRoles.includes(req.user.role)) {
    return res.status(403).json({ success: false, message: 'Access denied' });
  }
  return next();
};
export const protect = verifyToken;
export default verifyToken;
