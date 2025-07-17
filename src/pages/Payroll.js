import React, { useState } from 'react';
import jsPDF from 'jspdf'; // Install: npm install jspdf
import './Payroll.css'; // Import your styles

const Payroll = () => {
  const [employees, setEmployees] = useState([]);
  const [totalNetPay, setTotalNetPay] = useState(0);
  const [totalCost, setTotalCost] = useState(0);

  const generatePayroll = () => {
    const sampleEmployees = [
      {
        id: 1,
        name: 'John Doe',
        position: 'Farm Supervisor',
        grossSalary: 60000,
        tax: 9000,
        otherDeductions: 3000,
        companyContribution: 5000,
      },
      {
        id: 2,
        name: 'Jane Smith',
        position: 'Farm Worker',
        grossSalary: 35000,
        tax: 4000,
        otherDeductions: 2000,
        companyContribution: 3500,
      },
      {
        id: 3,
        name: 'Peter Jones',
        position: 'Admin Assistant',
        grossSalary: 45000,
        tax: 6000,
        otherDeductions: 2500,
        companyContribution: 4000,
      },
    ];

    setEmployees(sampleEmployees);

    let net = 0;
    let total = 0;
    sampleEmployees.forEach((emp) => {
      net += emp.grossSalary - emp.tax - emp.otherDeductions;
      total += emp.grossSalary + emp.companyContribution;
    });

    setTotalNetPay(net);
    setTotalCost(total);
  };

  const formatCurrency = (amount) =>
    `KES ${amount.toLocaleString(undefined, { minimumFractionDigits: 2 })}`;

  const downloadReceipt = (emp) => {
    const doc = new jsPDF();

    const netPay = emp.grossSalary - emp.tax - emp.otherDeductions;

    doc.setFontSize(14);
    doc.text('PAYROLL RECEIPT', 20, 20);
    doc.setFontSize(12);
    doc.text(`Employee ID: ${emp.id}`, 20, 35);
    doc.text(`Name: ${emp.name}`, 20, 45);
    doc.text(`Position: ${emp.position}`, 20, 55);
    doc.text(`Gross Salary: ${formatCurrency(emp.grossSalary)}`, 20, 65);
    doc.text(`Tax: ${formatCurrency(emp.tax)}`, 20, 75);
    doc.text(`Other Deductions: ${formatCurrency(emp.otherDeductions)}`, 20, 85);
    doc.text(`Net Pay: ${formatCurrency(netPay)}`, 20, 95);
    doc.text(`Company Contribution: ${formatCurrency(emp.companyContribution)}`, 20, 105);
    doc.text(`Date: ${new Date().toLocaleDateString()}`, 20, 115);

    doc.save(`${emp.name.replace(' ', '_')}_Payroll_Receipt.pdf`);
  };

  return (
    <div className="payroll-container">
      <h1>Payroll</h1>
      <button className="generate-btn" onClick={generatePayroll}>
        Generate Payroll
      </button>

      {employees.length > 0 && (
        <>
          <table className="payroll-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Position</th>
                <th>Gross Salary</th>
                <th>Tax</th>
                <th>Other Deductions</th>
                <th>Net Pay</th>
                <th>Company Contribution</th>
                <th>Receipt</th>
              </tr>
            </thead>
            <tbody>
              {employees.map((emp) => {
                const net = emp.grossSalary - emp.tax - emp.otherDeductions;
                return (
                  <tr key={emp.id}>
                    <td>{emp.id}</td>
                    <td>{emp.name}</td>
                    <td>{emp.position}</td>
                    <td>{formatCurrency(emp.grossSalary)}</td>
                    <td>{formatCurrency(emp.tax)}</td>
                    <td>{formatCurrency(emp.otherDeductions)}</td>
                    <td>{formatCurrency(net)}</td>
                    <td>{formatCurrency(emp.companyContribution)}</td>
                    <td>
                      <button className="download-btn" onClick={() => downloadReceipt(emp)}>
                        Download
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          <div className="payroll-summary">
            <h2>Payroll Summary</h2>
            <p>Total Net Pay: {formatCurrency(totalNetPay)}</p>
            <p>Total Cost to Company: {formatCurrency(totalCost)}</p>
            <p>Employees: {employees.length}</p>
          </div>
        </>
      )}
    </div>
  );
};

export default Payroll;
