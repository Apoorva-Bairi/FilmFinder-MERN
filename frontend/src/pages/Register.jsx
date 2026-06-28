import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Register() {
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    dob: '',
    userType: 'User',
    location: ''
  });

  const { register } = useAuth();
  const navigate = useNavigate();

  const change = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    if (!form.firstName.trim()) return alert('First name is required');
    if (!form.lastName.trim()) return alert('Last name is required');
    if (!form.email.trim()) return alert('Email is required');

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(form.email)) return alert('Enter a valid email');

    if (!form.password.trim()) return alert('Password is required');
    if (form.password.length < 6) return alert('Password must be at least 6 characters');

    if (!form.dob) return alert('Date of birth is required');
    if (!form.location.trim()) return alert('Location is required');

    return true;
  };

  const submit = async e => {
    e.preventDefault();

    if (!validateForm()) return;

    const payload = {
      ...form,
      userType: 'User'
    };

    await register(payload);
    alert('Account created successfully');
    navigate('/signin');
  };

  return (
    <form className="form" onSubmit={submit}>
      <h2>Register</h2>

      <input name="firstName" placeholder="First Name" value={form.firstName} onChange={change} />
      <input name="lastName" placeholder="Last Name" value={form.lastName} onChange={change} />
      <input
        name="email"
        type="email"
        placeholder="Email"
        value={form.email}
        autoComplete="email"
        onChange={change}
      />
      <input
        name="password"
        type="password"
        placeholder="Password"
        value={form.password}
        autoComplete="new-password"
        onChange={change}
      />

      <input name="dob" type="date" value={form.dob} onChange={change} />
      <input name="location" placeholder="Location" value={form.location} onChange={change} />

      <button>Create account</button>
    </form>
  );
}