import React, { useState } from 'react';

function PayrollGenerator() {
  const [employees, setEmployees] = useState([]);
  const [totalNetPay, setTotalNetPay] = useState(0);

  const generatePayroll = () => {
    // Replace this with your actual data fetching logic (API call, etc.)
    const sampleEmployees = [
      { name: 'John Doe', salary: 60000, deductions: 5000 },
      { name: 'Jane Smith', salary: 75000, deductions: 7000 },
      { name: 'Peter Jones', salary: 55000, deductions: 3000 },
    ];

    setEmployees(sampleEmployees); // Set the employee data

    // Calculate total net pay
    let total = 0;
    sampleEmployees.forEach(employee => {
      total += employee.salary - employee.deductions;
    });
    setTotalNetPay(total);
  };

  return (
    <div className="payroll-container">
      <h1>Payroll</h1>
      <button onClick={generatePayroll}>Generate Payroll</button>

      <table className="payroll-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Salary</th>
            <th>Deductions</th>
            <th>Net Pay</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee, index) => (
            <tr key={index}>
              <td>{employee.name}</td>
              <td>{employee.salary}</td>
              <td>{employee.deductions}</td>
              <td>{employee.salary - employee.deductions}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="payroll-summary">
        <h2>Payroll Summary</h2>
        <p>Total Net Pay: {totalNetPay}</p>
        {/* Add more summary details here */}
      </div>
    </div>
  );
}

export default PayrollGenerator;