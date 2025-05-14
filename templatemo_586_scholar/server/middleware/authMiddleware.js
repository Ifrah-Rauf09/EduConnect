import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const authMiddleware = async (req, res, next) => {
  try {
    const token = req.header('Authorization').replace('Bearer ', ''); // Extract token from the 'Authorization' header
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify the token
    const user = await User.findOne({
      _id: decoded.id,
      'tokens.token': token,
    });

    if (!user) {
      throw new Error(); // User not found or token invalid
    }

    req.token = token;
    req.user = user; // Attach the user object to the request
    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    res.status(401).json({ error: 'Please authenticate' }); // Unauthorized response
  }
};

export default authMiddleware;
