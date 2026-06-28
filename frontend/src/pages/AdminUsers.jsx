import { useEffect, useState } from 'react';
import api from '../api/api';

export default function AdminUsers() {
  const [users, setUsers] = useState([]);

  const loadUsers = async () => {
    try {
      const res = await api.get('/users');
      setUsers(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const toggleBlock = async (id) => {
    try {
      const res = await api.put(`/users/block/${id}`);
      alert(res.data.message);
      loadUsers();
    } catch (error) {
      console.error(error);
    }
  };

  const deleteUser = async (id) => {
    try {
      await api.delete(`/users/${id}`);
      alert('User deleted successfully');
      loadUsers();
    } catch (error) {
      alert(error.response?.data?.message);
    }
  };

  return (
    <main className="container">
      <h1>User Management</h1>

      {users.map(user => (
        <div className="row" key={user.uid}>
          <div>
            <h3>{user.firstName} {user.lastName}</h3>
            <p>{user.email}</p>
            <p>{user.userType}</p>
            <p>Status: {user.isBlocked ? 'Blocked' : 'Active'}</p>
          </div>

          {user.userType !== 'Admin' && (
            <div style={{ display: 'flex', gap: '10px' }}>
              <button onClick={() => toggleBlock(user.uid)}>
                {user.isBlocked ? 'Unblock' : 'Block'}
              </button>

              <button onClick={() => deleteUser(user.uid)}>
                Delete
              </button>
            </div>
          )}
        </div>
      ))}
    </main>
  );
}