import express from 'express';
import WatchHistory from '../models/WatchHistory.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// Get all watched movies of logged-in user
router.get('/getWatchHistory', protect, async (req, res) => {
  const history = await WatchHistory.find({
    uid: req.user._id
  }).sort({ watchedAt: -1 });

  res.json(history);
});

// Add movie to watch history
router.post('/addWatchHistory', protect, async (req, res) => {
  try {
    const { movieId, movieName, moviePicture } = req.body;

    if (!movieId || !movieName) {
      return res.status(400).json({
        message: 'Movie ID and movie name are required'
      });
    }

    const exists = await WatchHistory.findOne({
      movieId,
      uid: req.user._id
    });

    if (exists) {
      return res.status(400).json({
        message: 'Movie already marked as watched'
      });
    }

    const history = await WatchHistory.create({
      movieId,
      movieName,
      moviePicture,
      uid: req.user._id,
      userEmail: req.user.email
    });

    res.status(201).json(history);
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
});

// Remove from watch history
router.delete('/deleteWatchHistory/:id', protect, async (req, res) => {
  await WatchHistory.findOneAndDelete({
    _id: req.params.id,
    uid: req.user._id
  });

  res.json({
    message: 'Removed from watch history'
  });
});

export default router;