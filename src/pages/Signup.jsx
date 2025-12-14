/**
 * Signup Page
 * 🟠 CRYSTAL's Task (Auth Forms - Size: M)
 * 
 * Registration form with username, email, and password fields.
 * Redirects to home on successful signup.
 */

import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Signup() {
  // TODO: Set up form state
  // PSEUDOCODE:
  // - username: '' (input value)
  // - email: '' (input value)
  // - password: '' (input value)
  // - confirmPassword: '' (input value for validation)
  // - error: null (display signup errors)
  // - loading: false (disable button while submitting)

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const { signup } = useAuth();
  const navigate = useNavigate();


  // TODO: Handle form submission
  // PSEUDOCODE:
  // 1. Prevent default form behavior
  // 2. Validate passwords match - if not, setError and return
  // 3. setLoading(true), setError(null)
  // 4. Try:
  //    - Call signup({ username, email, password })
  //    - On success, navigate to '/'
  // 5. Catch:
  //    - setError with error message
  // 6. Finally: setLoading(false)

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // TODO: Check if passwords match
    // if (password !== confirmPassword) { setError(...); return; }
    
    // TODO: setLoading(true)
    // TODO: setError(null)
    // TODO: Try signup({ username, email, password })
    // TODO: navigate('/') on success
    // TODO: Catch and setError
    // TODO: Finally setLoading(false)
  };


  return (
    <div className="auth-page">
      <div className="auth-form-container">
        <h1>Sign Up</h1>

        {/* Error display */}
        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
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
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm your password"
              required
            />
          </div>

          <button type="submit" disabled={loading}>
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
