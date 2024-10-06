# Employee-List-CRUD-MERN
# Employee Management System (MERN Stack)

A full-stack employee management system built using the MERN stack (MongoDB, Express, React, Node.js). This project allows users to create, view, update, and delete employee records.

## Features

- Create new employees with details such as name, email, mobile number, designation, gender, and course.
- View the list of all employees stored in the database.
- Edit existing employee details.
- Delete employee records.
- Responsive and user-friendly interface.
- Server-side validation for unique email addresses.

## Project Structure

```bash
MERN-test/
├── backend/                 # Backend code (Node.js, Express)
│   ├── controllers/         # Controller functions to handle API requests
│   ├── models/              # Mongoose models
│   ├── routes/              # API routes
│   ├── .env                 # Environment variables (Database URI, etc.)
│   └── server.js            # Main backend server file
│
├── frontend/                # Frontend code (React)
│   ├── src/                 # Source code for the React application
│   ├── public/              # Public assets
│   └── package.json         # Frontend dependencies
│
├── .gitignore               # Ignore files for Git
├── README.md                # Project documentation
└── package.json             # Backend dependencies

```

## Technology Stack

### Frontend:
- **React**: Frontend library for building user interfaces.
- **Axios**: HTTP client for making API requests.
- **React Router**: Used for navigation between components.

### Backend:
- **Node.js**: JavaScript runtime environment.
- **Express.js**: Web application framework for Node.js.
- **MongoDB**: NoSQL database to store employee records.
- **Mongoose**: ODM library for MongoDB.

## Installation and Setup

### Prerequisites

Before starting, ensure you have the following installed:

- **Node.js** (v14.x or later)
- **MongoDB** (v4.x or later)
- **Git**

### Backend Setup

1. **Clone the Repository**

   ```bash
   git clone https://github.com/Prakashkakarlla/Employee-List-CRUD-MERN
   cd employee-management-system


2. **Navigate to the backend folder:**
   ```bash
    cd backend
   ```
3. **Install backend dependencies:**
  ```bash
  npm install
  ```
4. **Create a .env file in the backend directory and add the following environment variables:**
  ```bash
MONGODB_URI=mongodb+srv://prakash:12345@cluster0.x8vbopr.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
JWT_SECRET=your_secret_key
PORT=5000
  ```
5. **Start the backend server:**
```bash
npm start
```
The backend server will run at http://localhost:5000.


### Frontend Setup

1. **Navigate to the frontend folder:**
   ```bash
   cd my-app
   ```
 2. **Install frontend dependencies:**
   ```bash
   npm install
   ```
 3. **Start the frontend React app:**
   ```bash
   npm start
   ```
The frontend React app will run at http://localhost:3000.
