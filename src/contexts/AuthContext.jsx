import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Check if user is logged in on app start
    const token = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');
    if (token && storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error('Invalid stored user:', error);
        localStorage.removeItem('token');
        localStorage.removeItem('user');
      }
    }
  }, []);

  const login = async (email, password, role) => {
    console.log("AuthContext: Starting login with:", { email, role });
    setIsLoading(true);
    try {
      const response = await fetch('https://eduspace-app-1.onrender.com/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password, role }),
      });

      console.log("AuthContext: Response status:", response.status);
      if (!response.ok) {
        console.log("AuthContext: Response not ok, throwing error");
        const errorData = await response.json().catch(() => ({}));
        console.log("AuthContext: Error response data:", errorData);
        throw new Error('Login failed');
      }

      const data = await response.json();
      console.log("AuthContext: Received data:", data);
      console.log("AuthContext: Setting user:", data.user);
      setUser(data.user);
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      console.log("AuthContext: User set and stored in localStorage");
      console.log("AuthContext: Login successful, returning data");
      return data;
    } catch (error) {
      console.log("AuthContext: Login failed with error:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (name, email, password, role) => {
    console.log("AuthContext: Starting registration with:", { name, email, role });
    setIsLoading(true);
    try {
      const response = await fetch('https://eduspace-app-1.onrender.com/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password, role }),
      });

      console.log("AuthContext: Registration response status:", response.status);
      if (!response.ok) {
        console.log("AuthContext: Registration response not ok, throwing error");
        const errorData = await response.json().catch(() => ({}));
        console.log("AuthContext: Registration error response data:", errorData);
        throw new Error('Registration failed');
      }

      const data = await response.json();
      console.log("AuthContext: Registration successful, received data:", data);
      console.log("AuthContext: Setting user:", data.user);
      setUser(data.user);
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      console.log("AuthContext: User set and stored in localStorage");
      return data;
    } catch (error) {
      console.log("AuthContext: Registration failed with error:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  };

  const value = {
    user,
    login,
    register,
    logout,
    isLoading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
