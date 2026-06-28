import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const [form, setForm] = useState({
    email: '',
    password: ''
  });

  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();

    if (!form.email.trim() || !form.password.trim()) {
      return setError('Email and password are required');
    }

    try {
      const user = await login(form.email, form.password);

      navigate(
        user.userType === 'Admin'
          ? '/admin-dashboard'
          : '/'
      );
    } catch {
      setError('Invalid email or password');
    }
  };

  return (
    <form className="form" onSubmit={submit}>
      <h2>Login</h2>

      {error && <p className="error">{error}</p>}

      <input
        type="email"
        placeholder="Email"
        value={form.email}
        autoComplete="email"
        onChange={e =>
          setForm({ ...form, email: e.target.value })
        }
      />

      <input
        type="password"
        placeholder="Password"
        value={form.password}
        autoComplete="current-password"
        onChange={e =>
          setForm({ ...form, password: e.target.value })
        }
      />

      <button>Login</button>
    </form>
  );
}