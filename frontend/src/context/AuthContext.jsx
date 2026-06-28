import { createContext, useContext, useState } from 'react';
import api from '../api/api';

const AuthContext = createContext(null);

export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    return JSON.parse(localStorage.getItem('currentUser') || 'null');
  });

  const login = async (email, password) => {
    const { data } = await api.post('/users/login', {
      email,
      password
    });

    localStorage.setItem('token', data.token);
    localStorage.setItem('currentUser', JSON.stringify(data.user));

    setUser(data.user);

    return data.user;
  };

  const register = async (payload) => {
    const { data } = await api.post('/users/register', payload);
    return data;
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('currentUser');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}