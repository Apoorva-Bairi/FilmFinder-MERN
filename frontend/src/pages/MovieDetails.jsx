import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../api/api';

export default function MovieDetails() {
  const { id } = useParams();

  const [movie, setMovie] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState(5);

  const [isInWatchlist, setIsInWatchlist] = useState(false);
  const [isWatched, setIsWatched] = useState(false);

  const load = async () => {
    const movieRes = await api.get(`/Movies/getMovieDetailsByMovieId/${id}`);
    setMovie(movieRes.data);

    const reviewRes = await api.get(`/userReview/getReviewsByMovieId/${id}`);
    setReviews(reviewRes.data);

    const watchlistRes = await api.get('/Watchlist/getAllWatchlist');
    const existsInWatchlist = watchlistRes.data.some(
      item => item.movieId === id || item.movieId === movieRes.data._id
    );
    setIsInWatchlist(existsInWatchlist);

    const historyRes = await api.get('/WatchHistory/getWatchHistory');
    const existsInHistory = historyRes.data.some(
      item => item.movieId === id || item.movieId === movieRes.data._id
    );
    setIsWatched(existsInHistory);
  };

  useEffect(() => {
    load();
  }, [id]);

  const addWatchlist = async () => {
    try {
      await api.post('/Watchlist/addWatchlist', {
        movieId: movie._id || id,
        movieName: movie.movieName,
        moviePicture: movie.moviePicture
      });

      setIsInWatchlist(true);
    } catch (error) {
      alert(error.response?.data?.message || 'Failed to add watchlist');
    }
  };

  const markAsWatched = async () => {
    try {
      await api.post('/WatchHistory/addWatchHistory', {
        movieId: movie._id || id,
        movieName: movie.movieName,
        moviePicture: movie.moviePicture
      });

      setIsWatched(true);
    } catch (error) {
      alert(error.response?.data?.message || 'Failed to mark as watched');
    }
  };

  const addReview = async e => {
    e.preventDefault();

    if (!comment.trim()) {
      return alert('Review comment is required');
    }

    await api.post('/userReview/addReview', {
      movieId: movie._id || id,
      movieName: movie.movieName,
      comment,
      rating: Number(rating)
    });

    setComment('');
    setRating(5);
    load();
  };

  if (!movie) {
    return <p className="container">Loading...</p>;
  }

  return (
    <main className="container details">
      <h1>{movie.movieName}</h1>

      {movie.moviePicture && (
        <img
          src={movie.moviePicture}
          alt={movie.movieName}
          className="details-img"
        />
      )}

      <p>{movie.synopsis}</p>
      <p><b>Cast:</b> {movie.cast?.join(', ')}</p>
      <p><b>Director:</b> {movie.directorName}</p>
      <p><b>Genre:</b> {movie.genre?.join(', ')}</p>
      <p><b>Language:</b> {movie.language}</p>
      <p><b>Duration:</b> {movie.duration}</p>

      <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
        <button onClick={addWatchlist} disabled={isInWatchlist}>
          {isInWatchlist ? 'Added to Watchlist' : 'Add to Watchlist'}
        </button>

        <button onClick={markAsWatched} disabled={isWatched}>
          {isWatched ? 'Watched' : 'Mark as Watched'}
        </button>
      </div>

      <h2>Reviews</h2>

      {reviews.length === 0 && <p>No reviews yet.</p>}

      {reviews.map(r => (
        <div className="review" key={r.reviewId || r._id}>
          <b>{r.rating}/5</b>
          <p>{r.comment}</p>
        </div>
      ))}

      <form onSubmit={addReview} className="inline-form">
        <input
          value={comment}
          onChange={e => setComment(e.target.value)}
          placeholder="Write review"
        />

        <input
          type="number"
          min="1"
          max="5"
          value={rating}
          onChange={e => setRating(e.target.value)}
        />

        <button>Add Review</button>
      </form>
    </main>
  );
}