/**
 * Login Page
 * 🟠 CRYSTAL's Task (Auth Forms - Size: M)
 * 
 * Login form with email and password fields.
 * Redirects to home on successful login.
 */

import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Login() {
  // TODO: Set up form state
  // PSEUDOCODE:
  // - email: '' (input value)
  // - password: '' (input value)
  // - error: null (display login errors)
  // - loading: false (disable button while submitting)

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();


  // TODO: Handle form submission
  // PSEUDOCODE:
  // 1. Prevent default form behavior
  // 2. setLoading(true), setError(null)
  // 3. Try:
  //    - Call login({ email, password })
  //    - On success, navigate to '/'
  // 4. Catch:
  //    - setError with error message (error.response?.data?.message or generic)
  // 5. Finally: setLoading(false)

  const handleSubmit = async (e) => {
    e.preventDefault();
    // TODO: setLoading(true)
    // TODO: setError(null)
    // TODO: Try login({ email, password })
    // TODO: navigate('/') on success
    // TODO: Catch and setError
    // TODO: Finally setLoading(false)
  };


  return (
    <div className="auth-page">
      <div className="auth-form-container">
        <h1>Login</h1>

        {/* Error display */}
        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleSubmit} className="auth-form">
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
              placeholder="Enter your password"
              required
            />
          </div>

          <button type="submit" disabled={loading}>
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
