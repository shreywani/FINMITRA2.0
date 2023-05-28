const jwt = require('jsonwebtoken');
const Company = require('../models/Company');

// Middleware to authenticate requests using cookies and JWT
const authenticateCompany = async (req, res, next) => {
  try {
    // Extract the token from the cookie
    const token = req.cookies.Adarsh || req.body.token || req.headers.authorization.replace('Bearer ', '') || req.headers.authorization.split(' ')[1];

    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Unauthorized: No token provided',
      });
    }

    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Retrieve the user from the database
    const user = await Company.findById(decoded.id);

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Unauthorized: Invalid token',
      });
    }

    // Attach the user object to the request for further use
    req.user = user;

    // Proceed to the next middleware or route
    next();
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: 'Internal Server Error',
    });
  }
};

module.exports = authenticateCompany;
