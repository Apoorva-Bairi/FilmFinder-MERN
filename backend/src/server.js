import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';

import userRoutes from './routes/userRoutes.js';
import movieRoutes from './routes/movieRoutes.js';
import reviewRoutes from './routes/reviewRoutes.js';
import watchlistRoutes from './routes/watchlistRoutes.js';
import watchHistoryRoutes from './routes/watchHistoryRoutes.js';

dotenv.config();

await connectDB();

const app = express();

app.use(cors({
  origin: [
    'http://localhost:5173',
    'https://filmfinder-mern.netlify.app'
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));
app.use(express.json({ limit: '5mb' }));

app.get('/', (_, res) => {
  res.send('FilmFinder MERN API running');
});

app.use('/api/users', userRoutes);
app.use('/api/Movies', movieRoutes);
app.use('/api/userReview', reviewRoutes);
app.use('/api/Watchlist', watchlistRoutes);
app.use('/api/WatchHistory', watchHistoryRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () =>
  console.log(`Server running on port ${PORT}`)
);