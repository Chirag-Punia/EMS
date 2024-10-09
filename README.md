# Employee Management System

This is a full-stack Employee Management System built using React for the frontend and Node.js with Express for the backend. It allows administrators to manage employee records, including creating, reading, updating, and deleting employee details.

## Table of Contents
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Contributing](#contributing)
- [License](#license)

## Features
- Create new employee records
- Read employee details
- Update existing employee records
- Delete employee records
- Search employees by course
- Pagination of employee records
- Image upload for employee profiles (JPG/PNG only)
- Responsive design

## Technologies Used
- **Frontend**: React, Axios, React Router, React Toastify
- **Backend**: Node.js, Express, MongoDB
- **Styling**: CSS

## Installation

### Prerequisites
- Node.js and npm (Node Package Manager)
- MongoDB (for local development)

### Clone the Repository
```bash
git clone https://github.com/Chirag-Punia/EMS.git
cd EMP
```

### Backend Setup
1. Navigate to the backend directory:
   ```bash
   cd server
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the backend server:
   ```bash
   node server.js
   ```
   The backend server will run on [http://localhost:5002](http://localhost:5002).

### Frontend Setup
1. Navigate to the frontend directory:
   ```bash
   cd client
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the frontend server:
   ```bash
   npm start
   ```
   The frontend application will run on [http://localhost:3000](http://localhost:3000).

## Usage
- Open your web browser and navigate to [http://localhost:3000](http://localhost:3000).
- Use the application to manage employee records. You can add, edit, and delete employee information, as well as upload images for each employee.

## API Endpoints
### Employee API
- **GET** `/api/employees`: Retrieve all employees
- **POST** `/api/employees`: Create a new employee
- **PUT** `/api/employees/:id`: Update an existing employee by ID
- **DELETE** `/api/employees/:id`: Delete an employee by ID

## Contributing
Contributions are welcome! Please fork this repository and submit a pull request for any improvements or bug fixes.

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
```