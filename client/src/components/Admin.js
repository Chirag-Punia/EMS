import "../styles/Admin.css";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const Admin = () => {
  const base_url = "http://localhost:5002";
  const [employees, setEmployees] = useState([]);
  const [loading,setLoading] = useState(false);
  const [formData, setFormData] = useState({

    uniqueId: "",
    name: "",
    email: "",
    mobileNo: "",
    designation: "",
    gender: "",
    course: "",
    createDate: "",
  });
  const [imageFile, setImageFile] = useState(null); 
  const [editId, setEditId] = useState(null);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const employeesPerPage = 5;

  useEffect(() => {
    fetchEmployees()
  }, [loading]);

  const fetchEmployees = async () => {
    try {
      const response = await axios.get(`${base_url}/api/employees`);
      setEmployees(response.data);
      setLoading(true);
    } catch (error) {
      console.error("Error fetching employees:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = new FormData();
      data.append("uniqueId", formData.uniqueId);
      data.append("name", formData.name);
      data.append("email", formData.email);
      data.append("mobileNo", formData.mobileNo);
      data.append("designation", formData.designation);
      data.append("gender", formData.gender);
      data.append("course", formData.course);
      data.append("createDate", formData.createDate);
      if (imageFile) data.append("image", imageFile);

      if (editId) {
        await axios.put(`${base_url}/api/employees/${editId}`, data);
      } else {
        await axios.post(`${base_url}/api/employees`, data);
      }
      resetForm();
      fetchEmployees();
      toast.success("Employee saved successfully!");
    } catch (error) {
      if (error.response && error.response.status === 409) {
        toast.error("Duplicate entry: Employee with the same Unique ID or Email already exists.");
      } else {
        console.error("Error saving employee:", error);
        toast.error("An error occurred while saving the employee.");
      }
    }
  };

  const resetForm = () => {
    setFormData({
      uniqueId: "",
      name: "",
      email: "",
      mobileNo: "",
      designation: "",
      gender: "",
      course: "",
      createDate: "",
    });
    setImageFile(null); 
    setEditId(null);
  };

  const handleEdit = (employee) => {
    setFormData({
      uniqueId: employee.uniqueId,
      name: employee.name,
      email: employee.email,
      mobileNo: employee.mobileNo,
      designation: employee.designation,
      gender: employee.gender,
      course: employee.course,
      createDate: employee.createDate,
    });
    setImageFile(null); 
    setEditId(employee._id);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const validFileTypes = ["image/jpeg", "image/png"];
      if (validFileTypes.includes(file.type)) {
        setImageFile(file);
      } else {
        toast.error("Only JPG or PNG files are allowed.");
        setImageFile(null); 
      }
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${base_url}/api/employees/${id}`);
      fetchEmployees();
    } catch (error) {
      console.error("Error deleting employee:", error);
    }
  };

  const filteredEmployees = employees.filter((employee) =>
      employee.course.toLowerCase().includes(searchKeyword.toLowerCase())
  );
  
  const sortedEmployees = [...filteredEmployees].sort((a, b) => {
    return a.name.localeCompare(b.name); 
});

const indexOfLastEmployee = currentPage * employeesPerPage;
const indexOfFirstEmployee = indexOfLastEmployee - employeesPerPage;
const currentEmployees = sortedEmployees.slice(
    indexOfFirstEmployee,
    indexOfLastEmployee
);
  const totalPages = Math.ceil(filteredEmployees.length / employeesPerPage);
  const reactNavigator = useNavigate();

  const goToNextPage = () =>
      setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  const goToPreviousPage = () =>
      setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));

  const handleLogout = () => {
    localStorage.removeItem("token");
    reactNavigator("/login");
  };

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "short", day: "numeric" };
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", options).replace(",", "");
  };

  return (
      <div className="admin-container">
        <h1>Employee Management</h1>
        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
        <div className="employee-count">
          <p>Total Employees: {filteredEmployees.length}</p>
        </div>

        <form className="employee-form" onSubmit={handleSubmit}>
          {/* Form Fields */}
          <div className="form-group">
            <label htmlFor="uniqueId">Unique Id</label>
            <input
                id="uniqueId"
                type="text"
                value={formData.uniqueId}
                onChange={(e) =>
                    setFormData({...formData, uniqueId: e.target.value})
                }
            />
          </div>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
                id="name"
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) =>
                    setFormData({...formData, email: e.target.value})
                }
            />
          </div>
          <div className="form-group">
            <label htmlFor="mobileNo">Mobile No</label>
            <input
                id="mobileNo"
                type="text"
                value={formData.mobileNo}
                onChange={(e) =>
                    setFormData({...formData, mobileNo: e.target.value})
                }
            />
          </div>
          <div className="form-group">
            <label htmlFor="designation">Designation</label>
            <select
                id="designation"
                value={formData.designation}
                onChange={(e) =>
                    setFormData({...formData, designation: e.target.value})
                }
            >
              <option value="">Select Designation</option>
              <option value="HR">HR</option>
              <option value="Manager">Manager</option>
              <option value="Sales">Sales</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="gender">Gender</label>
            <select
                id="gender"
                value={formData.gender}
                onChange={(e) =>
                    setFormData({...formData, gender: e.target.value})
                }
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="course">Course</label>
            <select
                id="course"
                value={formData.course}
                onChange={(e) =>
                    setFormData({...formData, course: e.target.value})
                }
            >
              <option value="">Select Course</option>
              <option value="MCA">MCA</option>
              <option value="BCA">BCA</option>
              <option value="BSc">BSc</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="createDate">Create Date</label>
            <input
                id="createDate"
                type="date"
                value={formData.createDate}
                onChange={(e) =>
                    setFormData({...formData, createDate: e.target.value})
                }
            />
          </div>
          <div className="form-group">
            <label htmlFor="image">Upload Image (JPG/PNG)</label>
            <input id="image" type="file" onChange={handleFileChange} accept=".jpg,.png"/>
          </div>
          <button className="submit-btn" type="submit">
            {editId ? "Update Employee" : "Create Employee"}
          </button>
        </form>

        <div className="search-bar">
          <input
              type="text"
              placeholder="Search by course..."
              value={searchKeyword}
              onChange={(e) => setSearchKeyword(e.target.value)}
          />

        </div>
        <table className="employee-table">
          <thead>
          <tr>
            <th>Unique Id</th>
            <th>Image</th>
            <th>Name</th>
            <th>Email</th>
            <th>Mobile No</th>
            <th>Designation</th>
            <th>Gender</th>
            <th>Course</th>
            <th>Create Date</th>
            <th>Action</th>
          </tr>
          </thead>
          <tbody>
          {currentEmployees.map((employee) => (
              <tr key={employee._id}>
                <td>{employee.uniqueId}</td>
                <td>
                  {employee.image && (
                      <img
                          className="employee-image"
                          src={employee.image}
                          alt={employee.name}
                      />
                  )}
                </td>
                <td>{employee.name}</td>
                <td>{employee.email}</td>
                <td>{employee.mobileNo}</td>
                <td>{employee.designation}</td>
                <td>{employee.gender}</td>
                <td>{employee.course}</td>
                <td>{formatDate(employee.createDate)}</td>
                <td className="action-buttons">
                  <button
                      className="edit-btn"
                      onClick={() => handleEdit(employee)}
                  >
                    Edit
                  </button>
                  <button
                      className="delete-btn"
                      onClick={() => handleDelete(employee._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
          ))}
          </tbody>
        </table>

        <div className="pagination-controls">
          <button
              className="pagination-btn"
              onClick={goToPreviousPage}
              disabled={currentPage === 1}
          >
            Previous
          </button>
          <span>
          Page {currentPage} of {totalPages}
        </span>
          <button
              className="pagination-btn"
              onClick={goToNextPage}
              disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
</div>
)
  ;
};

export default Admin;
