import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Train, Menu, X, User, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    setIsUserMenuOpen(false);
    setIsMenuOpen(false);
    navigate('/');
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setIsMenuOpen(false); // Close mobile menu on desktop view
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <header className="header">
      <div className="header-container">
        <div className="header-content">
          <Link to="/" className="header-logo">
            <Train className="header-logo-icon" />
            <span className="header-logo-text">IRCTC</span>
          </Link>

          <nav className="header-nav">
            <Link to="/" className="header-nav-link">Home </Link>
            <Link to="/pnr-status" className="header-nav-link">PNR Status</Link>
            <Link to="/booking-history" className="header-nav-link">Booking History</Link>
          </nav>

          <div className="header-user-menu">
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="header-user-button"
                >
                  <User className="h-5 w-5" />
                  <span>{user.name}</span>
                </button>
                {isUserMenuOpen && (
                  <div className="header-dropdown">
                    <Link
                      to="/booking-history"
                      className="header-dropdown-item"
                      onClick={() => setIsUserMenuOpen(false)}
                    >
                      Booking History
                    </Link>
                    <button onClick={handleLogout} className="header-dropdown-item">
                      <LogOut className="h-4 w-4 inline mr-2" />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="header-auth-buttons">
                <Link to="/login" className="header-login-btn">Login</Link>
                <Link to="/signup" className="header-signup-btn">Sign Up</Link>
              </div>
            )}
          </div>

          {/* Mobile Toggle Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="header-mobile-toggle"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="header-mobile-menu">
            <nav className="header-mobile-nav">
              <Link to="/" className="header-mobile-nav-link" onClick={() => setIsMenuOpen(false)}>Home</Link>
              <Link to="/pnr-status" className="header-mobile-nav-link" onClick={() => setIsMenuOpen(false)}>PNR Status</Link>
              <Link to="/booking-history" className="header-mobile-nav-link" onClick={() => setIsMenuOpen(false)}>Booking History</Link>

              {user ? (
                <div className="header-mobile-user">
                  <p className="header-mobile-user-welcome">Welcome, {user.name}</p>
                  <button onClick={handleLogout} className="header-mobile-logout">
                    <LogOut className="h-4 w-4" />
                    Logout
                  </button>
                </div>
              ) : (
                <div className="header-mobile-auth">
                  <Link to="/login" className="header-mobile-nav-link" onClick={() => setIsMenuOpen(false)}>Login</Link>
                  <Link to="/signup" className="header-mobile-signup-btn" onClick={() => setIsMenuOpen(false)}>Sign Up</Link>
                </div>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
