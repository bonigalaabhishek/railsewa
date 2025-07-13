import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, Train } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const { login, isLoading } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    try {
      await login(formData.email, formData.password);
      navigate('/');
    } catch (err) {
      setError('Invalid email or password');
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-header">
        <div className="auth-logo">
          <Train className="auth-logo-icon" />
        </div>
        <h2 className="auth-title">
          Sign in to your account
        </h2>
        <p className="auth-subtitle">
          Or{' '}
          <Link to="/signup" className="auth-link">
            create a new account
          </Link>
        </p>
      </div>

      <div className="auth-form-container">
        <div className="auth-form-card">
          <form className="auth-form" onSubmit={handleSubmit}>
            {error && (
              <div className="auth-error">
                {error}
              </div>
            )}

            <div className="auth-field">
              <label htmlFor="email" className="auth-label">
                Email address
              </label>
              <div className="auth-input-container">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="auth-input"
                  placeholder="Enter your email"
                />
                <Mail className="auth-input-icon" />
              </div>
            </div>

            <div className="auth-field">
              <label htmlFor="password" className="auth-label">
                Password
              </label>
              <div className="auth-input-container">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  required
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                  className="auth-input"
                  placeholder="Enter your password"
                />
                <Lock className="auth-input-icon" />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="auth-input-toggle"
                >
                  {showPassword ? <EyeOff className="auth-input-toggle-icon" /> : <Eye className="auth-input-toggle-icon" />}
                </button>
              </div>
            </div>

            <div className="auth-options">
              <div className="auth-remember">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="auth-checkbox"
                />
                <label htmlFor="remember-me" className="auth-checkbox-label">
                  Remember me ghhg
                </label>
              </div>

              <div>
                <a href="#" className="auth-forgot-link">
                  Forgot your password?
                </a>
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="auth-submit"
              >
                {isLoading ? 'Signing in...' : 'Sign in'}
              </button>
            </div>
          </form>

          <div className="auth-demo">
            <div className="auth-demo-divider">
              <div className="auth-demo-line">
                <div className="auth-demo-border" />
              </div>
              <div className="auth-demo-text">
                <span className="auth-demo-label">Demo credentials</span>
              </div>
            </div>
            <div className="auth-demo-credentials">
              <p>Email: demo@irctc.com</p>
              <p>Password: demo123</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;