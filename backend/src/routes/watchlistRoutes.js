import express from 'express';
import Watchlist from '../models/Watchlist.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.get('/getAllWatchlist', protect, async (req, res) => {
  const watchlist = await Watchlist.find({ uid: req.user._id });
  res.json(watchlist);
});

router.get('/getWatchlistByUserId/:uid', protect, async (req, res) => {
  const watchlist = await Watchlist.find({
    uid: req.user._id
  });

  res.json(watchlist);
});

router.post('/addWatchlist', protect, async (req, res) => {
  try {
    const { movieId, movieName, moviePicture } = req.body;

    if (!movieId || !movieName) {
      return res.status(400).json({ message: 'Movie ID and movie name are required' });
    }

    const exists = await Watchlist.findOne({
      movieId,
      uid: req.user._id
    });

    if (exists) {
      return res.status(400).json({ message: 'Movie already in watchlist' });
    }

    const watchlist = await Watchlist.create({
      movieId,
      movieName,
      moviePicture,
      uid: req.user._id,
      userEmail: req.user.email,
      userName: `${req.user.firstName} ${req.user.lastName}`
    });

    res.status(201).json(watchlist);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.delete('/deleteWatchlistById/:id', protect, async (req, res) => {
  await Watchlist.findOneAndDelete({
    _id: req.params.id,
    uid: req.user._id
  });

  res.json({ message: 'Removed from watchlist' });
});

router.delete('/deleteWatchlistByMovieId/:movieId', protect, async (req, res) => {
  await Watchlist.deleteOne({
    movieId: req.params.movieId,
    uid: req.user._id
  });

  res.json({ message: 'Removed from watchlist' });
});

export default router;