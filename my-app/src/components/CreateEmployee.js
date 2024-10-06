import React, { useState } from 'react';
import axios from '../axiosConfig';
import { useNavigate } from 'react-router-dom';
import '../CreateEmployee.css'; // Import the CSS file for styling

const CreateEmployee = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [designation, setDesignation] = useState('');
  const [gender, setGender] = useState('');
  const [course, setCourse] = useState('');
  const [image, setImage] = useState(null); // State for the image file
  const navigate = useNavigate();

  const handleImageChange = (e) => {
    setImage(e.target.files[0]); // Set the selected image file
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    
      // Check if the email already exists
      const emailCheckResponse = await axios.get(`/employees/check-email/${email}`);
      if (emailCheckResponse.data.exists) {
        alert('This email already exists. Please use a different email.'); // Alert if email exists
        return;
      }

    // Create a FormData object to include the image
    const formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    formData.append('mobile', mobile);
    formData.append('designation', designation);
    formData.append('gender', gender);
    formData.append('course', course);
    if (image) {
      formData.append('image', image); // Append the image if available
    }

    try {
      await axios.post('/employees', formData, {
        headers: {
          'Content-Type': 'multipart/form-data', // Required for file upload
        },
      });
      navigate('/employees');
    } catch (error) {
      console.error('Error creating employee:', error);
    }
  };

  return (
    <div className="create-employee-container">
      <h2>Create Employee</h2>
      <form className="create-employee-form" onSubmit={handleSubmit}>
        <input 
          type="text" 
          placeholder="Name" 
          onChange={(e) => setName(e.target.value)} 
          required 
          className="form-input" 
        />
        <input 
          type="email" 
          placeholder="Email" 
          onChange={(e) => setEmail(e.target.value)} 
          required 
          className="form-input" 
        />
        <input 
          type="text" 
          placeholder="Mobile" 
          onChange={(e) => setMobile(e.target.value)} 
          required 
          className="form-input" 
        />
        <select 
          onChange={(e) => setDesignation(e.target.value)} 
          required 
          className="form-select"
        >
          <option value="" disabled selected>Select Designation</option>
          <option value="HR">HR</option>
          <option value="Manager">Manager</option>
          <option value="Sales">Sales</option>
        </select>

        <div className="radio-group">
          <label>
            <input 
              type="radio" 
              value="Male" 
              checked={gender === 'Male'} 
              onChange={(e) => setGender(e.target.value)} 
              required 
            />
            Male
          </label>
          <label>
            <input 
              type="radio" 
              value="Female" 
              checked={gender === 'Female'} 
              onChange={(e) => setGender(e.target.value)} 
              required 
            />
            Female
          </label>
        </div>

        <select 
          onChange={(e) => setCourse(e.target.value)} 
          required 
          className="form-select"
        >
          <option value="" disabled selected>Select Course</option>
          <option value="MCA">MCA</option>
          <option value="BCA">BCA</option>
          <option value="BSC">BSC</option>
        </select>

        <input 
          type="file" 
          accept="image/*" // Accept only image files
          onChange={handleImageChange} 
          className="form-input"
        />

        <button type="submit" className="submit-button">Create</button>
      </form>
    </div>
  );
};

export default CreateEmployee;
