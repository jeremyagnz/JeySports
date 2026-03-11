import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';
import { isFirebaseConfigured } from '../config/firebase';
import './Navbar.css';

// Simple Google icon as inline SVG
function GoogleIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg">
      <path d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.874 2.684-6.615z" fill="#4285F4"/>
      <path d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18z" fill="#34A853"/>
      <path d="M3.964 10.71A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.042l3.007-2.332z" fill="#FBBC05"/>
      <path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.958L3.964 6.29C4.672 4.163 6.656 3.58 9 3.58z" fill="#EA4335"/>
    </svg>
  );
}

export default function Navbar() {
  const { user, isAdmin, authError, signInWithGoogle, logout } = useAuth();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [signingIn, setSigningIn] = useState(false);

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/teams', label: 'Teams' },
    { to: '/players', label: 'Players' },
    { to: '/schedule', label: 'Schedule' },
    { to: '/standings', label: 'Standings' },
  ];

  if (isAdmin) navLinks.push({ to: '/admin', label: '⚙ Admin' });

  async function handleSignIn() {
    setSigningIn(true);
    await signInWithGoogle();
    setSigningIn(false);
  }

  return (
    <>
      <nav className="navbar">
        <div className="navbar-inner container">
          <Link to="/" className="navbar-logo" onClick={() => setMobileOpen(false)}>
            ⚾ <span>JeySports</span>
          </Link>

          {/* Desktop nav links */}
          <div className="navbar-links">
            {navLinks.map(link => (
              <Link
                key={link.to}
                to={link.to}
                className={`navbar-link ${location.pathname === link.to ? 'active' : ''}`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="navbar-auth">
            {user ? (
              <div className="navbar-user">
                {user.photoURL && (
                  <img src={user.photoURL} alt={user.displayName} className="navbar-avatar" />
                )}
                {!user.photoURL && (
                  <div className="navbar-avatar-placeholder">
                    {user.displayName?.[0] || user.email?.[0] || '?'}
                  </div>
                )}
                <span className="navbar-username">{user.displayName?.split(' ')[0] || user.email}</span>
                {user.isDemo && <span className="navbar-demo-badge">Demo</span>}
                <button onClick={logout} className="btn btn-secondary navbar-btn">Sign Out</button>
              </div>
            ) : (
              <button
                onClick={handleSignIn}
                disabled={signingIn}
                className="btn btn-google navbar-btn"
              >
                <GoogleIcon />
                {signingIn ? 'Signing in…' : isFirebaseConfigured ? 'Sign in with Google' : 'Sign in (Demo)'}
              </button>
            )}
          </div>

          {/* Mobile hamburger */}
          <button
            className="navbar-hamburger"
            onClick={() => setMobileOpen(o => !o)}
            aria-label="Toggle menu"
          >
            <span className={`hamburger-line ${mobileOpen ? 'open' : ''}`} />
            <span className={`hamburger-line ${mobileOpen ? 'open' : ''}`} />
            <span className={`hamburger-line ${mobileOpen ? 'open' : ''}`} />
          </button>
        </div>

        {/* Auth error banner */}
        {authError && (
          <div className="navbar-error">
            ⚠ {authError}
          </div>
        )}

        {/* Demo mode notice */}
        {!isFirebaseConfigured && (
          <div className="navbar-demo-notice">
            🎮 Modo Demo — <a href="https://console.firebase.google.com/" target="_blank" rel="noreferrer">Configura Firebase</a> para usar Google Sign-In real
          </div>
        )}
      </nav>

      {/* Mobile menu drawer */}
      {mobileOpen && (
        <div className="navbar-mobile-menu">
          {navLinks.map(link => (
            <Link
              key={link.to}
              to={link.to}
              className={`mobile-link ${location.pathname === link.to ? 'active' : ''}`}
              onClick={() => setMobileOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          {!user && (
            <button
              onClick={() => { setMobileOpen(false); handleSignIn(); }}
              disabled={signingIn}
              className="btn btn-google mobile-signin-btn"
            >
              <GoogleIcon />
              {signingIn ? 'Signing in…' : isFirebaseConfigured ? 'Sign in with Google' : 'Sign in (Demo)'}
            </button>
          )}
          {user && (
            <button onClick={() => { setMobileOpen(false); logout(); }} className="btn btn-secondary mobile-signin-btn">
              Sign Out
            </button>
          )}
        </div>
      )}
    </>
  );
}
