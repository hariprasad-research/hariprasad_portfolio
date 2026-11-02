import { useEffect } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';

/**
 * Admin access control — Step 1 (local, pre-authentication).
 *
 * The admin console is reachable ONLY through the secret keyboard
 * shortcut Ctrl + Alt + Shift + H, which writes a per-tab session
 * flag before navigating. Direct URL entries to /admin (typing it,
 * sharing the link, or a refresh in a fresh tab) hit the AdminGuard
 * and are redirected to the homepage.
 *
 * Step 2 will layer real authentication (Lovable Cloud) on top of
 * this flag so the session flag alone never grants data access.
 */

export const UNLOCK_KEY = 'hp-admin-unlocked';

export const unlockAdmin = () => {
  try {
    sessionStorage.setItem(UNLOCK_KEY, '1');
  } catch {
    // Storage unavailable (private mode etc.) — navigation will still work.
  }
};

export const lockAdmin = () => {
  try {
    sessionStorage.removeItem(UNLOCK_KEY);
  } catch {
    // No-op
  }
};

export const isAdminUnlocked = () => {
  try {
    return sessionStorage.getItem(UNLOCK_KEY) === '1';
  } catch {
    return false;
  }
};

/** Global listener mounted once in App — opens /admin on the shortcut. */
export const AdminShortcutAccess = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.altKey && e.shiftKey && (e.key === 'h' || e.key === 'H')) {
        e.preventDefault();
        unlockAdmin();
        navigate('/admin');
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [navigate]);

  return null;
};

/** Blocks direct /admin URL access — redirects home when not unlocked. */
export const AdminGuard = ({ children }: { children: React.ReactNode }) => {
  if (!isAdminUnlocked()) {
    return <Navigate to="/" replace />;
  }
  return <>{children}</>;
};
