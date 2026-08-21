import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem('isAuthenticated') === 'true';
  });

  useEffect(() => {
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('isAuthenticated', isAuthenticated);
  }, [user, isAuthenticated]);

  const login = (email, password) => {
    // Mock authentication - in real app, this would call an API
    const mockUser = {
      id: 1,
      name: 'John Doe',
      email: email,
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop',
      role: 'customer',
      joinDate: '2024-01-15'
    };
    
    setUser(mockUser);
    setIsAuthenticated(true);
    return { success: true, user: mockUser };
  };

  const register = (name, email, password) => {
    // Mock registration - in real app, this would call an API
    const mockUser = {
      id: Date.now(),
      name: name,
      email: email,
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop',
      role: 'customer',
      joinDate: new Date().toISOString().split('T')[0]
    };
    
    setUser(mockUser);
    setIsAuthenticated(true);
    return { success: true, user: mockUser };
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('user');
    localStorage.removeItem('isAuthenticated');
  };

  const updateProfile = (updates) => {
    setUser(prevUser => ({ ...prevUser, ...updates }));
  };

  const value = {
    user,
    isAuthenticated,
    login,
    register,
    logout,
    updateProfile
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
