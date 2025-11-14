
// import jwt from 'jsonwebtoken';
// import { JWT_SECRET } from '../config/config.js';

// export const verifyToken = (req, res, next) => {
//   try {
//     const authHeader = req.headers.authorization;
//     if (!authHeader || !authHeader.startsWith('Bearer ')) {
//       return res.status(401).json({ success: false, message: 'No token provided' });
//     }
//     const token = authHeader.split(' ')[1];
//     const decoded = jwt.verify(token, JWT_SECRET);
//     req.user = decoded;
//     next();
//   } catch (error) {
//     return res.status(401).json({ success: false, message: 'Invalid token' });
//   }
// };

// // Add this authorize function
// export const authorize = (...roles) => {
//   return (req, res, next) => {
//     if (!roles.includes(req.user.role)) {
//       return res.status(403).json({ success: false, message: 'Access denied' });
//     }
//     next();
//   };
// };

import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config/config.js';

export const verifyToken = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ success: false, message: 'No token provided' });
    }
    
    const token = authHeader.split(' ')[1];
    
    // Basic validation of JWT format (3 parts separated by dots)
    if (!token || token.split('.').length !== 3) {
      return res.status(401).json({ success: false, message: 'Malformed token' });
    }
    
    const decoded = jwt.verify(token, JWT_SECRET);
    
    req.user = decoded;
    
    console.log('Token verified:', decoded.email, decoded.role);
    
    next();
  } catch (error) {
    console.log('Token error:', error.message);
    return res.status(401).json({ success: false, message: 'Invalid token' });
  }
};

export const authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ success: false, message: 'Access denied' });
    }
    next();
  };
};

