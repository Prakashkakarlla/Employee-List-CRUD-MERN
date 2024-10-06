import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Navbar from './components/Navbar';
import EmployeeList from './components/EmployeeList';
import CreateEmployee from './components/CreateEmployee';
import EditEmployee from './components/EditEmployee';
import Home from './components/Home';
import { AuthProvider, useAuth } from './context/AuthContext';

// ProtectedRoute component to restrict access to authenticated users
const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();

  // Show a loading message or spinner while checking auth status
  if (loading) return <div>Loading...</div>;

  return user ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        {/* The Navbar should be displayed only when the user is logged in */}
        <Navbar />

        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Protected routes */}
          <Route path="/home" element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          } />
          <Route path="/employees" element={
            <ProtectedRoute>
              <EmployeeList />
            </ProtectedRoute>
          } />
          <Route path="/create-employee" element={
            <ProtectedRoute>
              <CreateEmployee />
            </ProtectedRoute>
          } />
          <Route path="/edit-employee/:id" element={
            <ProtectedRoute>
              <EditEmployee />
            </ProtectedRoute>
          } />
          
          {/* Redirect all other routes to login */}
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
