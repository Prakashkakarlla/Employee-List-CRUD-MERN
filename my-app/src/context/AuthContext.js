import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Initially null
  const [loading, setLoading] = useState(true); // Loading state for checking auth status

  // Check if the user is authenticated when the component mounts
  useEffect(() => {
    const storedUser = localStorage.getItem('user'); // Get user data from local storage
    if (storedUser) {
      setUser(JSON.parse(storedUser)); // Set user state from local storage
    }
    setLoading(false); // Stop loading
  }, []); // Run only once when the component mounts

  const login = (userData) => {
    setUser(userData); // Update the state with user data
    localStorage.setItem('user', JSON.stringify(userData)); // Store user data in local storage
  };

  const logout = () => {
    setUser(null); // Clear the user state
    localStorage.removeItem('user'); // Remove user data from local storage
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the AuthContext
export const useAuth = () => {
  return useContext(AuthContext);
};
