import React, { createContext, useContext, useState, useEffect } from 'react';
import { authService } from '../services/authService';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => authService.getCurrentUser());
  const [loading, setLoading] = useState(false);

  const login = async (email, password, role) => {
    setLoading(true);
    try {
      const loggedUser = await authService.login(email, password, role);
      setUser(loggedUser);
      return loggedUser;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    await authService.logout();
    setUser(null);
  };

  const switchRole = (role) => {
    const updated = authService.switchRole(role);
    setUser(updated);
    return updated;
  };

  return (
    <AuthContext.Provider value={{
      user,
      loading,
      login,
      logout,
      switchRole,
      isFaculty: user?.role === 'faculty',
      isStudent: user?.role === 'student'
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return ctx;
}
