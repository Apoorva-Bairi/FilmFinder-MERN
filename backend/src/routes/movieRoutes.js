import express from 'express';
import Movie from '../models/Movie.js';
import { protect, adminOnly } from '../middleware/auth.js';

const router = express.Router();

router.get('/getAllmovies', async (_, res) => {
  res.json(await Movie.find().sort({ createdAt: -1 }));
});

router.get('/getMovieDetailsByMovieId/:id', async (req, res) => {
  const movie = await Movie.findById(req.params.id);

  if (!movie) {
    return res.status(404).json({ message: 'Movie not found' });
  }

  res.json(movie);
});

router.post('/addNewMovie', protect, adminOnly, async (req, res) => {
  res.status(201).json(await Movie.create(req.body));
});

router.put('/updateMovieByMovieId/:id', protect, adminOnly, async (req, res) => {
  res.json(await Movie.findByIdAndUpdate(req.params.id, req.body, { new: true }));
});

router.delete('/deleteMovieByMovieId/:id', protect, adminOnly, async (req, res) => {
  await Movie.findByIdAndDelete(req.params.id);
  res.json({ message: 'Movie deleted' });
});

export default router;
