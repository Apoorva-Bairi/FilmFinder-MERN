import { Link } from 'react-router-dom';

export default function Landing() {
  return (
    <main className="landing">
      <div className="overlay">
        <h1>Unlimited Movies, Reviews & Watchlists</h1>

        <p>
          Discover trending movies, save your favorites, and share reviews with FilmFinder.
        </p>

        <div className="landing-buttons">
          <Link to="/signin" className="btn">
            Get Started
          </Link>

          <Link to="/register" className="btn">
            Join Now
          </Link>
        </div>
      </div>
    </main>
  );
}