const Employee = require('../models/Employee');
const multer = require('multer');
const path = require('path');

// Configure multer for image storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Save the images in the 'uploads' folder
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // Rename the file to prevent collisions
  }
});

const upload = multer({
  storage: storage,
  fileFilter: function (req, file, cb) {
    const filetypes = /jpeg|jpg|png/;
    const mimetype = filetypes.test(file.mimetype);
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());

    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(new Error('Only images are allowed!'));
    }
  }
}).single('image');

// Create a new employee
exports.createEmployee = async (req, res) => {
  upload(req, res, async function (err) {
    if (err instanceof multer.MulterError || err) {
      return res.status(400).json({ message: err.message });
    }

    try {
      const { name, email, mobile, designation, gender, course } = req.body;

      // Validation
      if (!name || !email || !mobile || !designation || !gender || !course) {
        return res.status(400).json({ message: 'All fields are required.' });
      }

      // Check if email already exists
      const existingEmployee = await Employee.findOne({ email });
      if (existingEmployee) {
        return res.status(400).json({ message: 'Email already exists.' });
      }

      const imagePath = req.file ? req.file.path : '';

      const newEmployee = new Employee({
        image: imagePath, // Save the image path
        name,
        email,
        mobile,
        designation,
        gender,
        course,
      });

      await newEmployee.save();
      res.status(201).json({ message: 'Employee created successfully', employee: newEmployee });
    } catch (error) {
      res.status(500).json({ message: 'Error creating employee', error: error.message });
    }
  });
};

// Get all employees
exports.getEmployees = async (req, res) => {
  try {
    const employees = await Employee.find();
    res.status(200).json(employees);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving employees', error: error.message });
  }
};

// Get employee by ID
exports.getEmployeeById = async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id);
    if (!employee) {
      return res.status(404).json({ message: 'Employee not found' });
    }
    res.status(200).json(employee);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving employee', error: error.message });
  }
};

// Update Employee
exports.updateEmployee = async (req, res) => {
  try {
    const employeeId = req.params.id;

    // Prepare the updated data
    const updatedData = {
      name: req.body.name,
      email: req.body.email,
      mobile: req.body.mobile,
      designation: req.body.designation,
      gender: req.body.gender,
      course: req.body.course,
    };

    // Handle image update if a new image file is provided
    if (req.file) {
      updatedData.image = `uploads/${req.file.filename}`; // Assuming you are saving the image in the "uploads" directory
    }

    const updatedEmployee = await Employee.findByIdAndUpdate(employeeId, updatedData, { new: true });

    if (!updatedEmployee) {
      return res.status(404).json({ message: 'Employee not found' });
    }

    res.status(200).json({ message: 'Employee updated', employee: updatedEmployee });
  } catch (error) {
    console.error('Error updating employee:', error);
    res.status(500).json({ message: 'Error updating employee', error: error.message });
  }
};

exports.deleteEmployee = async (req, res) => {
  await Employee.findByIdAndDelete(req.params.id);
  res.json({ message: 'Employee deleted' });
};
