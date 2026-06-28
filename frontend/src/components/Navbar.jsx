// import { Link } from 'react-router-dom';
// import { useAuth } from '../context/AuthContext';

// export default function Navbar() {
//   const { user, logout } = useAuth();

//   return (
//     <nav className="nav">
//       <Link to="/" className="brand">FilmFinder</Link>

//       <div>
//         {!user && (
//           <>
//             <Link to="/signin">Login</Link>
//             <Link to="/register">Register</Link>
//           </>
//         )}

//         {user?.userType === 'User' && (
//           <>
//             <Link to="/">Movies</Link>
//             <Link to="/watchlist">Watchlist</Link>
//             <button onClick={logout}>Logout</button>
//           </>
//         )}

//         {user?.userType === 'Admin' && (
//           <>
//             <Link to="/admin-dashboard">Admin Dashboard</Link>
//             <Link to="/">Movies</Link>
//             <button onClick={logout}>Logout</button>
//           </>
//         )}
//       </div>
//     </nav>
//   );
// }

import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav className="nav">
      <Link to="/" className="brand">FilmFinder</Link>

      <div>
        {/* User Navbar */}
        {user?.userType === 'User' && (
          <>
            <Link to="/">Movies</Link>
            <Link to="/watchlist">Watchlist</Link>
            <Link to="/watch-history">Watch History</Link>
            <button onClick={logout}>Logout</button>
          </>
        )}

        {/* Admin Navbar */}
        {user?.userType === 'Admin' && (
          <>
            <Link to="/admin-dashboard">Movie Management</Link>
            <Link to="/admin-users">User Management</Link>
            <Link to="/admin-reviews">Review Management</Link>
            <Link to="/">Movies</Link>
            <button onClick={logout}>Logout</button>
          </>
        )}
      </div>
    </nav>
  );
}