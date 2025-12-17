/**
 * Navbar Component
 * 🔴 PABLO's Task
 * 
 * Navigation bar with links and auth status.
 */

import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './Navbar.css';

function Navbar() {
  const { user, logout, isAuthenticated } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/home" className="navbar-logo">Memento</Link>
        
        <div className="navbar-links">
          {isAuthenticated ? (
            <>
              <Link to="/home" className={`navbar-link ${location.pathname === '/home' ? 'active' : ''}`}>
                <svg className="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/>
                  <polyline points="9,22 9,12 15,12 15,22"/>
                </svg>
                <span>Home</span>
              </Link>
              <Link to="/create" className={`navbar-link ${location.pathname === '/create' ? 'active' : ''}`}>
                <svg className="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M12 19l7-7 3 3-7 7H12v-3z"/>
                  <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"/>
                  <path d="M2 2l7.586 7.586"/>
                </svg>
                <span>New Story</span>
              </Link>
            </>
          ) : (
            <>
              <Link to="/login" className="navbar-link">Login</Link>
              <Link to="/signup" className="navbar-link">Signup</Link>
            </>
          )}
        </div>

        {isAuthenticated && (
          <div className="navbar-footer">
            <div className="user-card">
              <div className="user-avatar">
                <div className="user-avatar-inner">
                  {user?.username?.charAt(0).toUpperCase() || 'U'}
                </div>
              </div>
              <span className="user-name">{user?.username}</span>
            </div>
            <button onClick={handleLogout} className="btn navbar-logout-btn">
              <span>Logout</span>
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
