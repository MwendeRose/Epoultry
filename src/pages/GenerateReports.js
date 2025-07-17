import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import './GenerateReports.css';

const months = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

const generateDummyData = (month) => {
  const random = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);
  return {
    flock: random(2000, 4000),
    eggs: random(1000, 3000),
    feed: random(500, 1500),
    orders: random(20, 100),
    customers: random(10, 50),
    suppliers: random(3, 10),
    revenue: random(50000, 200000),
    expenses: random(20000, 100000),
    topProducts: [
      { name: 'Kienyeji Eggs', quantity: random(500, 1500) },
      { name: 'Broiler Chicken', quantity: random(200, 800) },
      { name: 'Chicks', quantity: random(100, 500) },
    ],
    expensesBreakdown: [
      { category: 'Feed', amount: random(10000, 50000) },
      { category: 'Utilities', amount: random(5000, 20000) },
      { category: 'Maintenance', amount: random(3000, 15000) },
    ],
  };
};

export default function GenerateReports() {
  const [selectedMonth, setSelectedMonth] = useState('January');
  const [reportData, setReportData] = useState(generateDummyData('January'));
  const reportRef = useRef();
  const navigate = useNavigate();

  const handleMonthChange = (e) => {
    const month = e.target.value;
    setSelectedMonth(month);
    setReportData(generateDummyData(month));
  };

  const downloadPDF = () => {
    html2canvas(reportRef.current).then(canvas => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF();
      const width = pdf.internal.pageSize.getWidth();
      const height = (canvas.height * width) / canvas.width;
      pdf.addImage(imgData, 'PNG', 0, 0, width, height);
      pdf.save(`Farm_Report_${selectedMonth}.pdf`);
    });
  };

  return (
    <div className="report-page">
      <header className="report-header">
        <h1>Reports</h1>
        <button className="back-btn" onClick={() => navigate('/dashboard')}>← Back to Dashboard</button>
      </header>

      <div className="report-body">
        <aside className="report-sidenav">
          <h3>📅 Month</h3>
          <select value={selectedMonth} onChange={handleMonthChange}>
            {months.map(m => (
              <option key={m} value={m}>{m}</option>
            ))}
          </select>
          <button className="download-btn" onClick={downloadPDF}>📥 Download PDF</button>
        </aside>

        <main className="report-main" ref={reportRef}>
          <section className="summary-section">
            <div className="summary-card"><h4>Flock</h4><p>{reportData.flock} birds</p></div>
            <div className="summary-card"><h4>Eggs</h4><p>{reportData.eggs}</p></div>
            <div className="summary-card"><h4>Feed</h4><p>{reportData.feed} kg</p></div>
            <div className="summary-card"><h4>Orders</h4><p>{reportData.orders}</p></div>
            <div className="summary-card"><h4>Customers</h4><p>{reportData.customers}</p></div>
            <div className="summary-card"><h4>Suppliers</h4><p>{reportData.suppliers}</p></div>
            <div className="summary-card revenue"><h4>Revenue</h4><p>KES {reportData.revenue.toLocaleString()}</p></div>
            <div className="summary-card expenses"><h4>Expenses</h4><p>KES {reportData.expenses.toLocaleString()}</p></div>
          </section>

          <section className="details-section">
            <div className="top-products">
              <h3>🐓 Top Products</h3>
              <ul>
                {reportData.topProducts.map((item, i) => (
                  <li key={i}>
                    <span>{item.name}</span>
                    <span className="badge">{item.quantity}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="expenses-breakdown">
              <h3>💸 Expenses</h3>
              <table>
                <thead>
                  <tr>
                    <th>Category</th>
                    <th>Amount (KES)</th>
                  </tr>
                </thead>
                <tbody>
                  {reportData.expensesBreakdown.map((exp, i) => (
                    <tr key={i}>
                      <td>{exp.category}</td>
                      <td>{exp.amount.toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
