import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../api/api';
import Landing from './Landing';

export default function Home() {
  const { user } = useAuth();

  const [movies, setMovies] = useState([]);
  const [search, setSearch] = useState('');
  const [genreFilter, setGenreFilter] = useState('');
  const [languageFilter, setLanguageFilter] = useState('');
  const [yearFilter, setYearFilter] = useState('');

  useEffect(() => {
    if (user) {
      api.get('/Movies/getAllmovies')
        .then(res => setMovies(res.data))
        .catch(err => console.error(err));
    }
  }, [user]);

  const genres = [...new Set(movies.flatMap(movie => movie.genre || []))];
  const languages = [...new Set(movies.map(movie => movie.language).filter(Boolean))];
  const years = [
    ...new Set(
      movies
        .map(movie => movie.releaseDate ? new Date(movie.releaseDate).getFullYear() : null)
        .filter(Boolean)
    )
  ];

  const filteredMovies = movies.filter(movie => {
    const movieGenres = movie.genre?.join(', ').toLowerCase() || '';
    const movieYear = movie.releaseDate
      ? new Date(movie.releaseDate).getFullYear().toString()
      : '';

    const matchesSearch =
      movie.movieName?.toLowerCase().includes(search.toLowerCase()) ||
      movieGenres.includes(search.toLowerCase());

    const matchesGenre =
      !genreFilter || movie.genre?.includes(genreFilter);

    const matchesLanguage =
      !languageFilter || movie.language === languageFilter;

    const matchesYear =
      !yearFilter || movieYear === yearFilter;

    return matchesSearch && matchesGenre && matchesLanguage && matchesYear;
  });

  if (!user) {
    return <Landing />;
  }

  return (
    <main className="container">
      <h1>Movies</h1>

      <input
        type="text"
        placeholder="Search by movie name or genre"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="search-input"
      />

      <div className="filter-row">
        <select value={genreFilter} onChange={(e) => setGenreFilter(e.target.value)}>
          <option value="">All Genres</option>
          {genres.map(genre => (
            <option key={genre} value={genre}>{genre}</option>
          ))}
        </select>

        <select value={languageFilter} onChange={(e) => setLanguageFilter(e.target.value)}>
          <option value="">All Languages</option>
          {languages.map(language => (
            <option key={language} value={language}>{language}</option>
          ))}
        </select>

        <select value={yearFilter} onChange={(e) => setYearFilter(e.target.value)}>
          <option value="">All Years</option>
          {years.map(year => (
            <option key={year} value={year}>{year}</option>
          ))}
        </select>

        <button
          onClick={() => {
            setSearch('');
            setGenreFilter('');
            setLanguageFilter('');
            setYearFilter('');
          }}
        >
          Clear Filters
        </button>
      </div>

      <div className="grid">
        {filteredMovies.length === 0 ? (
          <p>No movies found.</p>
        ) : (
          filteredMovies.map(movie => (
            <article className="card" key={movie.movieId || movie._id}>
              {movie.moviePicture && (
                <img src={movie.moviePicture} alt={movie.movieName} />
              )}

              <h3>{movie.movieName}</h3>
              <p>{movie.genre?.join(', ')}</p>
              <p>{movie.language} • {movie.duration}</p>

              <Link
                className="btn"
                to={`/movie/${movie.movieId || movie._id}`}
              >
                View Details
              </Link>
            </article>
          ))
        )}
      </div>
    </main>
  );
}