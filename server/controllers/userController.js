const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const multer = require('multer');
const path = require('path');
const fs = require('fs');


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadPath = 'uploads/profiles/';

    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }
    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {

    const uniqueName = `${req.user.userId}_${Date.now()}${path.extname(file.originalname)}`;
    cb(null, uniqueName);
  }
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024, 
  },
  fileFilter: (req, file, cb) => {
 
    const filetypes = /jpeg|jpg|png|gif/;
    const mimetype = filetypes.test(file.mimetype);
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());

    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(new Error('Only image files are allowed!'));
    }
  }
});


exports.userRegister = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Validate input
    if (!username || !email || !password) {
      return res.status(400).json({ message: "All fields are required." });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Invalid email format." });
    }

    // Validate password strength
    if (password.length < 6) {
      return res.status(400).json({ message: "Password must be at least 6 characters long." });
    }

    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "User already exists." });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create user
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      role: 'user'
    });

    await newUser.save();

    res.status(201).json({
      message: "User registered successfully.",
      userId: newUser._id
    });
  } catch (error) {
    console.error('Register Error:', error);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
};

// Login User
exports.userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(req.body)

    // Validate input
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required." });
    }

    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials." });
    }

    // Generate JWT
    const token = jwt.sign(
      {
        userId: user._id,
        email: user.email,
        role: user.role || 'user'
      },
      process.env.SECRET_KEY,
      { expiresIn: '7d' }
    );

    res.status(200).json({
      message: "Login successful.",
      token,
      userId: user._id.toString(),
      username: user.username,
      email: user.email,
      role: user.role || 'user',
      profileImage: user.profileImage || null
    });
  } catch (error) {
    console.error('Login Error:', error);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
};

// Update Profile
exports.updateProfile = async (req, res) => {
  try {
    const { username, email } = req.body;
    const userId = req.user.userId;

    // Validate input
    if (!username || !email) {
      return res.status(400).json({ message: "Username and email are required." });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Invalid email format." });
    }

    // Check if email is already taken by another user
    const existingUser = await User.findOne({ 
      email: email, 
      _id: { $ne: userId } 
    });
    
    if (existingUser) {
      return res.status(409).json({ message: "Email is already taken by another user." });
    }

    // Update user
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { 
        username: username.trim(),
        email: email.toLowerCase().trim()
      },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found." });
    }

    res.status(200).json({
      message: "Profile updated successfully.",
      user: {
        userId: updatedUser._id,
        username: updatedUser.username,
        email: updatedUser.email,
        role: updatedUser.role,
        profileImage: updatedUser.profileImage
      }
    });
  } catch (error) {
    console.error('Update Profile Error:', error);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
};




// Upload Profile Image
exports.uploadProfileImage = [
  upload.single('profileImage'),
  async (req, res) => {
    try {
      const userId = req.user.userId;

      if (!req.file) {
        return res.status(400).json({ message: "No image file provided." });
      }

      // Get current user to delete old profile image
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ message: "User not found." });
      }

      // Delete old profile image if exists
      if (user.profileImage) {
        const oldImagePath = path.join(__dirname, '..', user.profileImage);
        if (fs.existsSync(oldImagePath)) {
          fs.unlinkSync(oldImagePath);
        }
      }

      // Update user with new profile image path
      const profileImagePath = `uploads/profiles/${req.file.filename}`;
      const updatedUser = await User.findByIdAndUpdate(
        userId,
        { profileImage: profileImagePath },
        { new: true }
      );

      res.status(200).json({
        message: "Profile image uploaded successfully.",
        profileImage: profileImagePath,
        user: {
          userId: updatedUser._id,
          username: updatedUser.username,
          email: updatedUser.email,
          role: updatedUser.role,
          profileImage: updatedUser.profileImage
        }
      });
    } catch (error) {
      console.error('Upload Profile Image Error:', error);
      res.status(500).json({ message: "Server error. Please try again later." });
    }
  }
];

// Get Profile
exports.getProfile = async (req, res) => {
  try {
    const userId = req.user.userId;
    
    const user = await User.findById(userId).select('-password');
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    res.status(200).json({
      user: {
        userId: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
        profileImage: user.profileImage,
        createdAt: user.createdAt
      }
    });
  } catch (error) {
    console.error('Get Profile Error:', error);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
};