import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/api';

export default function WatchHistory() {
  const [history, setHistory] = useState([]);

  const loadHistory = async () => {
    try {
      const res = await api.get('/WatchHistory/getWatchHistory');
      setHistory(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    loadHistory();
  }, []);

  const removeHistory = async (id) => {
    try {
      await api.delete(`/WatchHistory/deleteWatchHistory/${id}`);
      alert('Removed from watch history');
      loadHistory();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <main className="container">
      <h1>Watch History</h1>

      {history.length === 0 ? (
        <p>No watched movies yet.</p>
      ) : (
        <div className="grid">
          {history.map(item => (
            <article className="card" key={item.historyId || item._id}>
              {item.moviePicture && (
                <img src={item.moviePicture} alt={item.movieName} />
              )}

              <h3>{item.movieName}</h3>
              <p>
                Watched on:{' '}
                {new Date(item.watchedAt).toLocaleDateString()}
              </p>

              <div style={{ display: 'flex', gap: '10px' }}>
                <Link className="btn" to={`/movie/${item.movieId}`}>
                  View Details
                </Link>

                <button onClick={() => removeHistory(item.historyId || item._id)}>
                  Remove
                </button>
              </div>
            </article>
          ))}
        </div>
      )}
    </main>
  );
}