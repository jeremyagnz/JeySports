import { useState, useEffect } from 'react';
import { onAuthStateChanged, signInWithPopup, signInWithRedirect, getRedirectResult, signOut } from 'firebase/auth';
import { auth, googleProvider, isFirebaseConfigured } from '../config/firebase';
import { AuthContext } from './context';

const ADMIN_EMAIL = import.meta.env.VITE_ADMIN_EMAIL || '';

// Demo user used when Firebase is not configured
const DEMO_USER_KEY = 'jeysports_demo_user';

function loadDemoUser() {
  try {
    const stored = localStorage.getItem(DEMO_USER_KEY);
    return stored ? JSON.parse(stored) : null;
  } catch {
    return null;
  }
}

function saveDemoUser(user) {
  if (user) {
    localStorage.setItem(DEMO_USER_KEY, JSON.stringify(user));
  } else {
    localStorage.removeItem(DEMO_USER_KEY);
  }
}

function isAdminUser(currentUser) {
  return !!currentUser && ADMIN_EMAIL !== '' && currentUser.email === ADMIN_EMAIL;
}

export function AuthProvider({ children }) {
  // Lazy-initialize from localStorage when running in demo mode
  const [user, setUser] = useState(() => (!isFirebaseConfigured ? loadDemoUser() : null));
  const [isAdmin, setIsAdmin] = useState(() => (!isFirebaseConfigured ? isAdminUser(loadDemoUser()) : false));
  const [loading, setLoading] = useState(isFirebaseConfigured);
  const [authError, setAuthError] = useState(null);

  function applyUser(currentUser) {
    setUser(currentUser);
    setIsAdmin(isAdminUser(currentUser));
  }

  useEffect(() => {
    if (!isFirebaseConfigured) {
      // Demo mode: state already initialized from lazy useState — nothing to do
      return;
    }

    // Real Firebase mode: also check for redirect result on page load
    getRedirectResult(auth).then((result) => {
      if (result?.user) applyUser(result.user);
    }).catch((err) => {
      if (err.code && err.code !== 'auth/no-current-user') {
        console.error('Redirect sign-in error:', err);
        setAuthError(getAuthErrorMessage(err.code));
      }
    });

    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      applyUser(currentUser);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const signInWithGoogle = async () => {
    setAuthError(null);

    if (!isFirebaseConfigured) {
      // Demo mode — create a mock Google user
      const demoUser = {
        uid: 'demo-uid-001',
        displayName: 'Demo User',
        email: ADMIN_EMAIL || 'demo@jeysports.app',
        photoURL: null,
        isDemo: true,
      };
      saveDemoUser(demoUser);
      applyUser(demoUser);
      return;
    }

    try {
      // Try popup first; fall back to redirect if blocked
      await signInWithPopup(auth, googleProvider);
    } catch (popupError) {
      const blocked =
        popupError.code === 'auth/popup-blocked' ||
        popupError.code === 'auth/popup-closed-by-user' ||
        popupError.code === 'auth/cancelled-popup-request';

      if (blocked) {
        try {
          await signInWithRedirect(auth, googleProvider);
        } catch (redirectError) {
          console.error('Sign-in redirect error:', redirectError);
          setAuthError('No se pudo iniciar sesión. Por favor intenta de nuevo.');
        }
      } else {
        console.error('Sign-in error:', popupError);
        const msg = getAuthErrorMessage(popupError.code);
        setAuthError(msg);
      }
    }
  };

  const logout = async () => {
    setAuthError(null);
    if (!isFirebaseConfigured) {
      saveDemoUser(null);
      applyUser(null);
      return;
    }
    try {
      await signOut(auth);
    } catch (error) {
      console.error('Sign-out error:', error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, isAdmin, loading, authError, signInWithGoogle, logout }}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

function getAuthErrorMessage(code) {
  switch (code) {
    case 'auth/network-request-failed':
      return 'Error de red. Verifica tu conexión a Internet.';
    case 'auth/too-many-requests':
      return 'Demasiados intentos. Espera un momento e intenta de nuevo.';
    case 'auth/user-disabled':
      return 'Esta cuenta ha sido deshabilitada.';
    case 'auth/operation-not-allowed':
      return 'El inicio de sesión con Google no está habilitado en este proyecto Firebase.';
    default:
      return 'Error al iniciar sesión. Por favor intenta de nuevo.';
  }
}
