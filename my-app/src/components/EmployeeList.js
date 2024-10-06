import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from '../axiosConfig';
import '../Employeelist.css';

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axios.get('/employees');
        console.log(response.data); // Check if employee.image contains correct path
        setEmployees(response.data);
      } catch (error) {
        console.error('Error fetching employees:', error);
      }
    };

    fetchEmployees();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/employees/${id}`);
      setEmployees(employees.filter(employee => employee._id !== id)); // Remove the deleted employee from the state
    } catch (error) {
      console.error('Error deleting employee:', error);
    }
  };

  return (
    <div>
      <h2>Employee List</h2>
      <Link to="/create-employee" className="create-employee-link">Create Employee</Link>
      <table className="employee-table">
        <thead>
          <tr>
            <th>Profile</th> {/* New Profile heading */}
            <th>Name</th>
            <th>Email</th>
            <th>Mobile</th>
            <th>Designation</th>
            <th>Gender</th>
            <th>Course</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => (
            <tr key={employee._id}>
<td>
  {employee.image ? (
    <img 
      src={`http://localhost:5000/${employee.image.replace(/\\/g, '/')}`} // Replace backslashes with forward slashes
      alt={`${employee.name}'s profile`} 
      className="profile-image" 
    />
  ) : (
    <span>No Image</span>
  )}
</td>


              <td>{employee.name}</td>
              <td>{employee.email}</td>
              <td>{employee.mobile}</td>
              <td>{employee.designation}</td>
              <td>{employee.gender}</td>
              <td>{employee.course}</td>
              <td>
              <Link to={`/edit-employee/${employee._id}`} className="edit-button">Edit</Link>
              <button onClick={() => handleDelete(employee._id)} className="delete-button">Delete</button>
            </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeList;
