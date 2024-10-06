import React, { useState, useEffect } from 'react';
import axios from '../axiosConfig';
import { useParams, useNavigate } from 'react-router-dom';

const EditEmployee = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [designation, setDesignation] = useState('');
  const [gender, setGender] = useState('');
  const [course, setCourse] = useState('');
  const [image, setImage] = useState(null);
  const [currentImage, setCurrentImage] = useState('');
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const response = await axios.get(`/employees/${id}`);
        const employee = response.data;
        setName(employee.name);
        setEmail(employee.email);
        setMobile(employee.mobile);
        setDesignation(employee.designation);
        setGender(employee.gender);
        setCourse(employee.course);
        setCurrentImage(employee.image);
      } catch (error) {
        console.error('Error fetching employee:', error);
      }
    };

    fetchEmployee();
  }, [id]);

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if the email is already in use by another employee
    try {
      const emailCheckResponse = await axios.get(`/employees/check-email/${email}`);
      if (emailCheckResponse.data.exists && emailCheckResponse.data.id !== id) {
        alert('This email already exists. Please use a different email.'); // Alert if email exists
        return;
      }

      const formData = new FormData();
      formData.append('name', name);
      formData.append('email', email);
      formData.append('mobile', mobile);
      formData.append('designation', designation);
      formData.append('gender', gender);
      formData.append('course', course);

      if (image) {
        formData.append('image', image);
      }

      const response = await axios.put(`/employees/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('Update Response:', response.data);
      navigate('/employees'); // Navigate back to the employees list after editing
    } catch (error) {
      console.error('Error updating employee:', error);
    }
  };

  return (
    <div className="create-employee-container">
      <h2>Edit Employee</h2>
      <form className="create-employee-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="form-input"
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="form-input"
        />
        <input
          type="text"
          placeholder="Mobile"
          value={mobile}
          onChange={(e) => setMobile(e.target.value)}
          required
          className="form-input"
        />
        <select 
          onChange={(e) => setDesignation(e.target.value)} 
          value={designation} 
          required 
          className="form-select"
        >
          <option value="" disabled>Select Designation</option>
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
          value={course} 
          required 
          className="form-select"
        >
          <option value="" disabled>Select Course</option>
          <option value="MCA">MCA</option>
          <option value="BCA">BCA</option>
          <option value="BSC">BSC</option>
        </select>

        <div className="image-preview">
          {currentImage && (
            <img src={`http://localhost:5000/${currentImage}`} alt="Profile" width="100" />
          )}
        </div>

        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="form-input"
        />

        <button type="submit" className="submit-button">Update</button>
      </form>
    </div>
  );
};

export default EditEmployee;
