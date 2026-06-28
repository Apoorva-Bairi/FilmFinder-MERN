import express from 'express';
import Review from '../models/Review.js';
import { protect, adminOnly } from '../middleware/auth.js';

const router = express.Router();

router.get('/getAllReviews', protect, adminOnly, async (_, res) => {
  res.json(await Review.find().sort({ createdAt: -1 }));
});

router.get('/getReviewDetailsById/:id', protect, async (req, res) => {
  const review = await Review.findById(req.params.id);

  if (!review) {
    return res.status(404).json({ message: 'Review not found' });
  }

  res.json(review);
});

router.get('/getReviewsByMovieId/:movieId', async (req, res) => {
  res.json(await Review.find({ movieId: req.params.movieId }).sort({ createdAt: -1 }));
});

router.get('/getReviewsByUserId/:userId', protect, async (req, res) => {
  res.json(await Review.find({ userId: req.user._id }));
});

router.post('/addReview', protect, async (req, res) => {
  try {
    const { movieId, movieName, comment, rating } = req.body;

    if (!movieId || !movieName || !comment || !rating) {
      return res.status(400).json({ message: 'All review fields are required' });
    }

    const review = await Review.create({
      movieId,
      movieName,
      comment,
      rating,
      userId: req.user._id,
      useremail: req.user.email,
      userName: `${req.user.firstName} ${req.user.lastName}`
    });

    res.status(201).json(review);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.put('/updateReviewById/:id', protect, async (req, res) => {
  const review = await Review.findOneAndUpdate(
    {
      _id: req.params.id,
      userId: req.user._id
    },
    req.body,
    { new: true }
  );

  if (!review) {
    return res.status(404).json({ message: 'Review not found or not allowed' });
  }

  res.json(review);
});

router.delete('/deleteReviewById/:id', protect, async (req, res) => {
  const review = await Review.findOneAndDelete({
    _id: req.params.id,
    userId: req.user._id
  });

  if (!review) {
    return res.status(404).json({ message: 'Review not found or not allowed' });
  }

  res.json({ message: 'Review deleted' });
});

router.delete('/admin/deleteReviewById/:id', protect, adminOnly, async (req, res) => {
  const review = await Review.findByIdAndDelete(req.params.id);

  if (!review) {
    return res.status(404).json({ message: 'Review not found' });
  }

  res.json({ message: 'Review deleted by admin' });
});

export default router;