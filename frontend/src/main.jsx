import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';

import Navbar from './components/Navbar';

import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import AdminDashboard from './pages/AdminDashboard';
import AdminUsers from './pages/AdminUsers';
import AdminReviews from './pages/AdminReviews';
import MovieDetails from './pages/MovieDetails';
import WatchHistory from './pages/WatchHistory';
import Watchlist from './pages/Watchlist';


import './styles.css';

function Protected({ children, admin = false }) {
  const { user } = useAuth();

  if (!user) return <Navigate to="/signin" />;

  if (admin && user.userType !== 'Admin') {
    return <Navigate to="/" />;
  }

  return children;
}

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Navbar />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signin" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route
            path="/movie/:id"
            element={
              <Protected>
                <MovieDetails />
              </Protected>
            }
          />

          <Route
            path="/watchlist"
            element={
              <Protected>
                <Watchlist />
              </Protected>
            }
          />

          <Route
            path="/admin-dashboard"
            element={
              <Protected admin>
                <AdminDashboard />
              </Protected>
            }
          />

          <Route
            path="/admin-users"
            element={
              <Protected admin>
                <AdminUsers />
              </Protected>
            }
          />

          <Route
            path="/admin-reviews"
            element={
              <Protected admin>
                <AdminReviews />
              </Protected>
            }
          />

          <Route
            path="/watch-history"
            element={
              <Protected>
                <WatchHistory />
              </Protected>
            }
          />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

createRoot(document.getElementById('root')).render(<App />);