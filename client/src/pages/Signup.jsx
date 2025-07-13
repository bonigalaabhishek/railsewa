import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, User, Phone, Eye, EyeOff, Train } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Signup = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');
  const { signup, isLoading } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    try {
      await signup({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        password: formData.password
      });
      navigate('/');
    } catch (err) {
      setError('Registration failed. Please try again.');
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-header">
        <div className="auth-logo">
          <Train className="auth-logo-icon" />
        </div>
        <h2 className="auth-title">
          Create your account
        </h2>
        <p className="auth-subtitle">
          Or{' '}
          <Link to="/login" className="auth-link">
            sign in to your existing account
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
              <label htmlFor="name" className="auth-label">
                Full Name
              </label>
              <div className="auth-input-container">
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="auth-input"
                  placeholder="Enter your full name"
                />
                <User className="auth-input-icon" />
              </div>
            </div>

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
              <label htmlFor="phone" className="auth-label">
                Phone Number
              </label>
              <div className="auth-input-container">
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  className="auth-input"
                  placeholder="Enter your phone number"
                />
                <Phone className="auth-input-icon" />
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
                  required
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                  className="auth-input"
                  placeholder="Create a password"
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

            <div className="auth-field">
              <label htmlFor="confirmPassword" className="auth-label">
                Confirm Password
              </label>
              <div className="auth-input-container">
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  required
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                  className="auth-input"
                  placeholder="Confirm your password"
                />
                <Lock className="auth-input-icon" />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="auth-input-toggle"
                >
                  {showConfirmPassword ? <EyeOff className="auth-input-toggle-icon" /> : <Eye className="auth-input-toggle-icon" />}
                </button>
              </div>
            </div>

            <div className="auth-terms">
              <input
                id="terms"
                name="terms"
                type="checkbox"
                required
                className="auth-terms-checkbox"
              />
              <label htmlFor="terms" className="auth-terms-label">
                I agree to the{' '}
                <a href="#" className="auth-terms-link">
                  Terms and Conditions
                </a>{' '}
                and{' '}
                <a href="#" className="auth-terms-link">
                  Privacy Policy
                </a>
              </label>
            </div>

            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="auth-submit"
              >
                {isLoading ? 'Creating account...' : 'Create account'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;