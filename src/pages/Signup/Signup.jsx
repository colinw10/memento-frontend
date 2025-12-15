/**
 * Signup Page
 * 🟠 CRISTAL's Task (Auth Forms - Size: M)
 * 
 * Registration form with username, email, and password fields.
 * Redirects to home on successful signup.
 */

import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './Signup.css';

<<<<<<< HEAD:src/pages/Signup.jsx


//Set up form state
=======
>>>>>>> 92cf580 (refactor: move components and pages to folders, remove old single-file components/pages):src/pages/Signup/Signup.jsx
function Signup() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const { signup } = useAuth();
  const navigate = useNavigate();

<<<<<<< HEAD:src/pages/Signup.jsx

  //Handle form submission
const handleSubmit = async (e) => {
  e.preventDefault();
  console.log("Signup submitted");

  if (password !== confirmPassword) {
    setError("Passwords do not match");
    return;
  }

  setLoading(true);
  setError(null);

  try {
    await signup({ username, email, password });
    navigate("/");
  } catch (err) {
    setError(err.response?.data?.message || "Signup failed");
  } finally {
    setLoading(false);
  }
};

=======
  const handleSubmit = async (e) => {
    e.preventDefault();
    // TODO: Check if passwords match
    // TODO: setLoading(true)
    // TODO: setError(null)
    // TODO: Try signup({ username, email, password })
    // TODO: navigate('/') on success
    // TODO: Catch and setError
    // TODO: Finally setLoading(false)
  };

>>>>>>> 92cf580 (refactor: move components and pages to folders, remove old single-file components/pages):src/pages/Signup/Signup.jsx
  return (
    <div className="auth-page">
      <div className="auth-card">
        <h1 className="auth-title">Sign Up</h1>

        {error && <div className="auth-error">{error}</div>}

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              className="auth-input"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Choose a username"
              required
            />
          </div>

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
              placeholder="Create a password"
              required
              minLength={6}
            />
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              className="auth-input"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm your password"
              required
            />
          </div>

          <button type="submit" className="btn btn-primary auth-submit" disabled={loading}>
            {loading ? 'Creating account...' : 'Sign Up'}
          </button>
        </form>

        <p className="auth-switch">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
}

export default Signup;
