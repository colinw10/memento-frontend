/**
 * Login Page
 * 🟠 CRISTAL's Task (Auth Forms - Size: M)
 * 
 * Login form with email and password fields.
 * Redirects to home on successful login.
 */

import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './Login.css';

<<<<<<< HEAD:src/pages/Login.jsx

  // Set up form state
=======
>>>>>>> 92cf580 (refactor: move components and pages to folders, remove old single-file components/pages):src/pages/Login/Login.jsx
function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

<<<<<<< HEAD:src/pages/Login.jsx

  // Handle form submission
const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);
  setError(null);

  try {
    await login({ email, password });
    navigate("/");
  } catch (err) {
    setError(err.response?.data?.message || "Login failed");
  } finally {
    setLoading(false);
  }
};
=======
  const handleSubmit = async (e) => {
    e.preventDefault();
    // TODO: setLoading(true)
    // TODO: setError(null)
    // TODO: Try login({ email, password })
    // TODO: navigate('/') on success
    // TODO: Catch and setError
    // TODO: Finally setLoading(false)
  };
>>>>>>> 92cf580 (refactor: move components and pages to folders, remove old single-file components/pages):src/pages/Login/Login.jsx

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h1 className="auth-title">Login</h1>

        {error && <div className="auth-error">{error}</div>}

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              className="auth-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              className="auth-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
            />
          </div>

          <button type="submit" className="btn btn-primary auth-submit" disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <p className="auth-switch">
          Don't have an account? <Link to="/signup">Sign up</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
