// middleware/authMiddleware.js
const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  try {
    console.log('🔐 Auth Middleware - Start');
    console.log('Headers:', req.headers);
    
    // Get token from Authorization header
    const authHeader = req.header('Authorization');
    console.log('Authorization header:', authHeader);
    
    if (!authHeader) {
     
      return res.status(401).json({ message: 'Access denied. No Authorization header.' });
    }
    
    if (!authHeader.startsWith('Bearer ')) {
      
      return res.status(401).json({ message: 'Access denied. Invalid token format.' });
    }

    // Extract token (remove 'Bearer ' prefix)
    const token = authHeader.substring(7);
    console.log('Extracted token:', token.substring(0, 20) + '...');
    
    if (!token) {
     
      return res.status(401).json({ message: 'Access denied. No token provided.' });
    }

    // Check if SECRET_KEY exists
    if (!process.env.SECRET_KEY) {
      
      return res.status(500).json({ message: 'Server configuration error.' });
    }

    // Verify token
    console.log('🔍 Verifying token...');
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    console.log('✅ Token verified successfully:', decoded);
    
    // Add user info to request object
    req.user = {
      userId: decoded.userId,
      email: decoded.email,
      role: decoded.role
    };

    console.log('✅ Auth Middleware - Success, user:', req.user);
    next();
  } catch (error) {
    
    console.log('Error name:', error.name);
    
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({ message: 'Invalid token.' });
    } else if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ message: 'Token has expired.' });
    }
    return res.status(500).json({ message: 'Server error during authentication.' });
  }
};

module.exports = authMiddleware;