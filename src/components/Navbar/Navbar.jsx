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
                <svg className="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="12 2 2 7 12 12 22 7 12 2" />
                  <polyline points="2 17 12 22 22 17" />
                  <polyline points="2 12 12 17 22 12" />
                </svg>
                <span>Feed</span>
              </Link>
              <Link to="/create" className={`navbar-link ${location.pathname === '/create' ? 'active' : ''}`}>
                <svg className="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="4 17 10 11 4 5" />
                  <line x1="12" y1="19" x2="20" y2="19" />
                </svg>
                <span>Write</span>
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
