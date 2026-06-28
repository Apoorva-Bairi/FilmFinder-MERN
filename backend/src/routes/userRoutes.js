import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import { protect, adminOnly } from '../middleware/auth.js';

const router = express.Router();

const signToken = id =>
  jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '7d' });

router.post('/register', async (req, res) => {
  try {
    const { firstName, lastName, email, password, dob, location } = req.body;

    if (!firstName || !lastName || !email || !password || !dob || !location) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email)) {
      return res.status(400).json({ message: 'Enter a valid email' });
    }

    if (password.length < 6) {
      return res.status(400).json({
        message: 'Password must be at least 6 characters'
      });
    }

    const exists = await User.findOne({ email: email.toLowerCase() });

    if (exists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const hashed = await bcrypt.hash(password, 10);

    const user = await User.create({
      firstName,
      lastName,
      email: email.toLowerCase(),
      password: hashed,
      dob,
      location,
      userType: 'User',
      isBlocked: false
    });

    res.status(201).json({
      message: 'User registered successfully',
      user
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: 'Email and password are required'
      });
    }

    const user = await User.findOne({ email: email.toLowerCase() });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    if (user.isBlocked) {
      return res.status(403).json({
        message: 'Your account has been blocked by admin'
      });
    }

    const safeUser = user.toJSON();

    res.json({
      message: 'Login successful',
      token: signToken(user._id),
      user: safeUser
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Admin: get all users
router.get('/', protect, adminOnly, async (_, res) => {
  const users = await User.find().select('-password').sort({ createdAt: -1 });
  res.json(users);
});

// Admin: get user by id
router.get('/:id', protect, adminOnly, async (req, res) => {
  const user = await User.findById(req.params.id).select('-password');

  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  res.json(user);
});

// Admin: update user
router.put('/:id', protect, adminOnly, async (req, res) => {
  const updatedUser = await User.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  ).select('-password');

  if (!updatedUser) {
    return res.status(404).json({ message: 'User not found' });
  }

  res.json(updatedUser);
});

// Admin: block/unblock user
router.put('/block/:id', protect, adminOnly, async (req, res) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  user.isBlocked = !user.isBlocked;
  await user.save();

  res.json({
    message: user.isBlocked ? 'User blocked successfully' : 'User unblocked successfully',
    user: user.toJSON()
  });
});

// Admin: delete user
router.delete('/:id', protect, adminOnly, async (req, res) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  if (user.userType === 'Admin') {
    return res.status(400).json({ message: 'Admin user cannot be deleted' });
  }

  await User.findByIdAndDelete(req.params.id);

  res.json({ message: 'User deleted' });
});

export default router;