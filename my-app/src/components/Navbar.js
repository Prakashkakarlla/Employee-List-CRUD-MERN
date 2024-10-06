import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Navbar.css'; // Import the CSS file

const Navbar = () => {
  const { user, logout } = useAuth(); // Get user and logout from AuthContext

  const handleLogout = () => {
    alert(`${user.userName} has logged out`); // Alert with the username
    logout(); // Call the logout function
  };

  return (
    <nav>
      <ul>
        <li>
          <Link to="/home">Home</Link>
        </li>
        <li>
          <Link to="/employees">Employee List</Link>
        </li>
        {user && (
          <>
            <li>
              <span>Welcome, {user.userName}</span>
            </li>
            <li>
              <button onClick={handleLogout}>Logout</button>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
