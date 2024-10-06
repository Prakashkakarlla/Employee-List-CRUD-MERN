const express = require('express');
const router = express.Router();
const multer = require('multer');
const Employee = require('../models/Employee'); // Adjust the path as necessary

const {
  createEmployee,
  getEmployees,
  getEmployeeById, // Import the new function
  updateEmployee,
  deleteEmployee,
} = require('../controllers/employeeController');

const upload = multer({ dest: 'uploads/' }); // Specify the directory for uploads
// Create Employee
router.post('/', createEmployee);

// Get Employees
router.get('/', getEmployees);

// Check if email exists
router.get('/check-email/:email', async (req, res) => {
  const { email } = req.params;
  try {
    const employee = await Employee.findOne({ email });
    if (employee) {
      return res.json({ exists: true });
    }
    return res.json({ exists: false });
  } catch (error) {
    console.error('Error checking email:', error);
    return res.status(500).json({ message: 'Server error' });
  }
});



// Get Employee by ID
router.get('/:id', getEmployeeById); // New route added

// Update Employee
router.put('/:id', upload.single('image'), updateEmployee);

// Delete Employee
router.delete('/:id', deleteEmployee);

module.exports = router;
