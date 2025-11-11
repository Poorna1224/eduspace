const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const nodemailer = require('nodemailer');
const multer = require('multer');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Email transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Multer config for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage });

// MongoDB connection
const uri = "mongodb+srv://Poorna24:Poorna%401234@cluster0.dn300i7.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
mongoose.connect(uri).then(async () => {
  console.log('Connected to MongoDB Atlas');

  // Insert demo users if they don't exist
  const demoUsers = [
    { name: 'Demo User', email: 'user@demo.com', password: await bcrypt.hash('password', 10), role: 'user' },
    { name: 'Demo Admin', email: 'admin@demo.com', password: await bcrypt.hash('password', 10), role: 'admin' }
  ];

  for (const demoUser of demoUsers) {
    const existing = await User.findOne({ email: demoUser.email });
    if (!existing) {
      await new User(demoUser).save();
      console.log(`Inserted demo user: ${demoUser.email}`);
    }
  }
}).catch((err) => {
  console.error('Database connection failed:', err);
});

// User Schema
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['user', 'admin'], default: 'user' },
  created_at: { type: Date, default: Date.now },
});

const User = mongoose.model('User', userSchema);

// Routes
app.post('/api/auth/register', async (req, res) => {
  const { name, email, password, role } = req.body;

  try {
    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = new User({ name, email, password: hashedPassword, role });
    await user.save();

    // Generate token
    const token = jwt.sign({ id: user._id, role }, process.env.JWT_SECRET || 'secret');

    // Send welcome email (don't block registration if email fails)
    if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Welcome to EduLearn!',
        text: `Hello ${name}, welcome to EduLearn! Your account has been created successfully.`,
      };
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log('Error sending email:', error);
        } else {
          console.log('Email sent:', info.response);
        }
      });
    }

    res.status(201).json({
      user: { id: user._id, name, email, role },
      token
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

app.post('/api/auth/login', async (req, res) => {
  const { email, password, role } = req.body;

  try {
    // Find user
    const user = await User.findOne({ email, role });
    if (!user) {
      console.log("Login request received:", { email, role });
      console.log("User found in database: No");
      console.log("No user found with email and role");
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.log("Login request received:", { email, role });
      console.log("User found in database: Yes");
      console.log("Password match: false");
      console.log("Password does not match");
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Generate token
    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET || 'secret');
    console.log("Login request received:", { email, role });
    console.log("User found in database: Yes");
    console.log("Password match: true");
    console.log("Token generated successfully");

    const responseData = {
      user: { id: user._id, name: user.name, email: user.email, role: user.role },
      token
    };
    console.log("Sending login response:", responseData);
    res.json(responseData);
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Image upload route
app.post('/api/upload/image', upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'No file uploaded' });
  }
  res.json({ imageUrl: `/uploads/${req.file.filename}` });
});

// File upload route
app.post('/api/upload/file', upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'No file uploaded' });
  }
  res.json({ fileUrl: `/uploads/${req.file.filename}`, filename: req.file.originalname });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});