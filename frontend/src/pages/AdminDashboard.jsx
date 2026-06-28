import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../api/api';

const empty = {
  movieName: '',
  cast: '',
  genre: '',
  directorName: '',
  releaseDate: '',
  synopsis: '',
  moviePicture: '',
  duration: '',
  language: ''
};

export default function AdminDashboard() {
  const [movies, setMovies] = useState([]);
  const [form, setForm] = useState(empty);
  const [editing, setEditing] = useState(null);

  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    if (!user || user.userType !== 'Admin') {
      navigate('/');
    }
  }, [user, navigate]);

  const load = async () => {
    try {
      const res = await api.get('/Movies/getAllmovies');
      setMovies(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const change = e => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const validateForm = () => {
    if (!form.movieName.trim()) return alert('Movie name is required');
    if (!form.cast.trim()) return alert('Cast is required');
    if (!form.genre.trim()) return alert('Genre is required');
    if (!form.directorName.trim()) return alert('Director name is required');
    if (!form.releaseDate) return alert('Release date is required');
    if (!form.synopsis.trim()) return alert('Synopsis is required');
    if (!form.moviePicture.trim()) return alert('Movie picture URL is required');
    if (!form.moviePicture.startsWith('http')) return alert('Enter valid image URL');
    if (!form.duration.trim()) return alert('Duration is required');
    if (!form.language.trim()) return alert('Language is required');

    return true;
  };

  const submit = async e => {
    e.preventDefault();

    if (!validateForm()) return;

    const payload = {
      ...form,
      cast: form.cast.split(',').map(x => x.trim()),
      genre: form.genre.split(',').map(x => x.trim())
    };

    try {
      if (editing) {
        await api.put(`/Movies/updateMovieByMovieId/${editing}`, payload);
        alert('Movie updated successfully');
      } else {
        await api.post('/Movies/addNewMovie', payload);
        alert('Movie added successfully');
      }

      setForm(empty);
      setEditing(null);
      load();
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || 'Something went wrong');
    }
  };

  const edit = m => {
    setEditing(m.movieId || m._id);

    setForm({
      ...m,
      cast: m.cast?.join(', ') || '',
      genre: m.genre?.join(', ') || '',
      releaseDate: m.releaseDate?.slice(0, 10) || ''
    });
  };

  const del = async id => {
    try {
      await api.delete(`/Movies/deleteMovieByMovieId/${id}`);
      alert('Movie deleted successfully');
      load();
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || 'Failed to delete movie');
    }
  };

  return (
    <main className="container">
      <h1>Admin Movie Dashboard</h1>

      <form className="form wide" onSubmit={submit}>
        {Object.keys(empty).map(k => (
          <input
            key={k}
            name={k}
            type={k === 'releaseDate' ? 'date' : 'text'}
            value={form[k] || ''}
            placeholder={k}
            onChange={change}
          />
        ))}

        <button>{editing ? 'Update Movie' : 'Add Movie'}</button>
      </form>

      <h2>Movie List</h2>

      {movies.map(m => (
        <div className="row" key={m.movieId || m._id}>
          <span>{m.movieName}</span>

          <div style={{ display: 'flex', gap: '10px' }}>
            <button onClick={() => edit(m)}>Edit</button>
            <button onClick={() => del(m.movieId || m._id)}>Delete</button>
          </div>
        </div>
      ))}
    </main>
  );
}