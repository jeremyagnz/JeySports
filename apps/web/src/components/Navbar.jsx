import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';
import './Navbar.css';

export default function Navbar() {
  const { user, isAdmin, signInWithGoogle, logout } = useAuth();
  const location = useLocation();

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/teams', label: 'Teams' },
    { to: '/players', label: 'Players' },
    { to: '/schedule', label: 'Schedule' },
    { to: '/standings', label: 'Standings' },
  ];

  if (isAdmin) navLinks.push({ to: '/admin', label: '⚙ Admin' });

  return (
    <nav className="navbar">
      <div className="navbar-inner container">
        <Link to="/" className="navbar-logo">
          ⚾ <span>JeySports</span>
        </Link>

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
              {user.photoURL && <img src={user.photoURL} alt={user.displayName} className="navbar-avatar" />}
              <span className="navbar-username">{user.displayName?.split(' ')[0]}</span>
              <button onClick={logout} className="btn btn-secondary navbar-btn">Sign Out</button>
            </div>
          ) : (
            <button onClick={signInWithGoogle} className="btn btn-primary navbar-btn">
              Sign In
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}
