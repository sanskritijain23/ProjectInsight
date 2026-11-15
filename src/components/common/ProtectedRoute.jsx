import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

/**
 * Route wrapper that ensures the user is authenticated.
 * If not, redirects to /login preserving the intended destination in location.state.
 * If a requiredRole is specified, verifies the authenticated user has that role.
 */
export default function ProtectedRoute({ children, requiredRole }) {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen bg-ivory flex items-center justify-center text-ink-secondary text-sm">
        Authenticating institutional credentials...
      </div>
    );
  }

  if (!user) {
    // Preserve the intended location so user can be redirected after explicit sign-in
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (requiredRole && user.role !== requiredRole) {
    // Redirect to their own portal dashboard if role does not match
    return <Navigate to={user.role === 'faculty' ? '/faculty/dashboard' : '/student/dashboard'} replace />;
  }

  return children;
}
