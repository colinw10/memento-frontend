/**
 * Navbar Component
 * 🔴 PABLO's Task
 * 
 * Navigation bar with links and auth status.
 */

import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Navbar() {
  const { user, logout, isAuthenticated } = useAuth();

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/">Memento</Link>
      </div>
      
      <div className="navbar-links">
        {isAuthenticated ? (
          <>
            <Link to="/create">New Story</Link>
            <span>Welcome, {user?.username}</span>
            <button onClick={logout}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/signup">Signup</Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
