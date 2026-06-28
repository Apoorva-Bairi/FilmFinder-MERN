import { useEffect, useState } from 'react';
import api from '../api/api';

export default function AdminReviews() {
  const [reviews, setReviews] = useState([]);

  const loadReviews = async () => {
    try {
      const res = await api.get('/userReview/getAllReviews');
      setReviews(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    loadReviews();
  }, []);

  const deleteReview = async (id) => {
    try {
      await api.delete(`/userReview/admin/deleteReviewById/${id}`);
      alert('Review deleted successfully');
      loadReviews();
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || 'Failed to delete review');
    }
  };

  return (
    <main className="container">
      <h1>Review Management</h1>

      {reviews.length === 0 ? (
        <p>No reviews found.</p>
      ) : (
        reviews.map(review => (
          <div className="row" key={review._id || review.reviewId}>
            <div>
              <h3>{review.movieName}</h3>
              <p><strong>Rating:</strong> {review.rating}/5</p>
              <p>{review.comment}</p>
              <p><strong>User:</strong> {review.useremail}</p>
            </div>

            <button onClick={() => deleteReview(review._id || review.reviewId)}>
              Delete
            </button>
          </div>
        ))
      )}
    </main>
  );
}