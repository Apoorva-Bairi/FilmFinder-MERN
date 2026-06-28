import { useEffect, useState } from 'react';
import api from '../api/api';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';

export default function Watchlist() {
  const { user } = useAuth();
  const [items, setItems] = useState([]);

  const load = async () => {
    try {
      const res = await api.get(`/Watchlist/getWatchlistByUserId/${user.uid || user._id}`);
      setItems(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const remove = async id => {
    try {
      await api.delete(`/Watchlist/deleteWatchlistById/${id}`);
      load();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <main className="container">
      <h1>My Watchlist</h1>

      {items.length === 0 ? (
        <p>No movies in watchlist.</p>
      ) : (
        <div className="grid">
          {items.map(item => (
            <article className="card" key={item._id || item.watchlistId}>
              {item.moviePicture && (
                <img src={item.moviePicture} alt={item.movieName} />
              )}
              <h3>{item.movieName}</h3>

              <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                <Link className="btn" to={`/movie/${item.movieId}`}>
                  View Details
                </Link>

                <button onClick={() => remove(item._id || item.watchlistId)}>
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