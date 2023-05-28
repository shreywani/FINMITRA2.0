const express = require("express");
const app = express();
const bcrypt = require("bcrypt");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const { options } = require("../routes/user");
require("dotenv").config();
const cookieParser = require("cookie-parser");

// ... Other code ...

// Set up cookie parser middleware
app.use(cookieParser());

// ... Other code ...

// signup route handler
exports.signup = async (req, res) => {
  try {
    // Get data
    const { name, email, password, role } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'User already exists',
      });
    }

    // Secure password
    let hashedPassword;
    try {
      hashedPassword = await bcrypt.hash(password, 10);
    } catch (err) {
      return res.status(500).json({
        success: false,
        message: 'Error in hashing password',
      });
    }

    // Create entry for User
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role,
    });

    // Generate JWT token
    const payload = {
      email: user.email,
      id: user._id,
      role: user.role,
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: '2h',
    });

    user.token = token;
    user.password = undefined;

    const options = {
      expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
      httpOnly: true,
    };

    // Set the token as a cookie in the response
    res.cookie('token', token, options);

    res.status(200).json({
      success: true,
      token,
      user,
      message: 'User created successfully',
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: 'User cannot be registered, please try again later',
    });
  }
};

// login route handler
exports.login = async (req, res) => {
  try {
    // Data fetch
    const { email, password } = req.body;

    // Validation on email and password
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please fill all the details carefully',
      });
    }

    // Check for registered user
    let user = await User.findOne({ email });

    // If not a registered user
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'User is not registered',
      });
    }

    // Verify password & generate a JWT token
    if (await bcrypt.compare(password, user.password)) {
      // Password match
      const payload = {
        email: user.email,
        id: user._id,
        role: user.role,
      };

      const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: '2h',
      });

      user = user.toObject();
      user.token = token;
      user.password = undefined;

      const options = {
        expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
        httpOnly: true,
      };

      // Set the token as a cookie in the response
      res.cookie('Adarsh', token, options);

      res.status(200).json({
        success: true,
        token,
        user,
        message: 'User logged in successfully',
      });
    } else {
      // Password does not match
      return res.status(403).json({
        success: false,
        message: 'Password incorrect',
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: 'Login failure',
    });
  }
};
