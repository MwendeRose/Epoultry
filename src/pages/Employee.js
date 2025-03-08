import React, { useState } from 'react';
import './Employee.css';

const Employees = () => {
    const [employees, setEmployees] = useState([
        { id: 1, name: 'John Doe', position: 'Manager', department: 'Sales' },
        { id: 2, name: 'Jane Smith', position: 'Analyst', department: 'Marketing' },
        // ... more employees
    ]);

    const [newEmployee, setNewEmployee] = useState({
        name: '',
        position: '',
        department: '',
    });

    const handleInputChange = (e) => {
        setNewEmployee({ ...newEmployee, [e.target.name]: e.target.value });
    };

    const handleAddEmployee = () => {
        setEmployees([
            ...employees,
            { ...newEmployee, id: employees.length + 1 },
        ]);
        setNewEmployee({ name: '', position: '', department: '' }); // Clear form
    };

    const handleDeleteEmployee = (id) => {
        setEmployees(employees.filter((employee) => employee.id !== id));
    };


    return (
        <div className="employee-container">
            <h1>Employee Records</h1>

            <div className="add-employee-form">
                <h2>Add New Employee</h2>
                <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={newEmployee.name}
                    onChange={handleInputChange}
                />
                <input
                    type="text"
                    name="position"
                    placeholder="Position"
                    value={newEmployee.position}
                    onChange={handleInputChange}
                />
                <input
                    type="text"
                    name="department"
                    placeholder="Department"
                    value={newEmployee.department}
                    onChange={handleInputChange}
                />
                <button onClick={handleAddEmployee} className="add-employee-button">
                    Add Employee
                </button>
            </div>

            <table className="employee-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Position</th>
                        <th>Department</th>
                        <th>Actions</th> {/* Added Actions column */}
                    </tr>
                </thead>
                <tbody>
                    {employees.map((employee) => (
                        <tr key={employee.id}>
                            <td>{employee.id}</td>
                            <td>{employee.name}</td>
                            <td>{employee.position}</td>
                            <td>{employee.department}</td>
                            <td className="actions">
                                <button className="edit">Edit</button> {/* Edit button */}
                                <button className="delete" onClick={() => handleDeleteEmployee(employee.id)}>
                                    Delete
                                </button> {/* Delete button */}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Employees;