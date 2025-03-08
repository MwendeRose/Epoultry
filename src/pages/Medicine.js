// Medicine.js (React Component)
import React, { useState } from 'react';
import './Medicine.css'; // Import the CSS file

const Medicine = () => {
    const [records, setRecords] = useState([
        { id: 1, chicken: 'Hen 1', date: '2024-07-26', diagnosis: 'Respiratory Infection', treatment: 'Antibiotics' },
        { id: 2, chicken: 'Rooster 2', date: '2024-07-25', diagnosis: 'Worm Infestation', treatment: 'Deworming' },
        // ... more records
    ]);

    const [newRecord, setNewRecord] = useState({
        chicken: '',
        date: '',
        diagnosis: '',
        treatment: '',
    });

    const handleInputChange = (e) => {
        setNewRecord({ ...newRecord, [e.target.name]: e.target.value });
    };

    const handleAddRecord = () => {
        setRecords([...records, { ...newRecord, id: records.length + 1 }]);
        setNewRecord({ chicken: '', date: '', diagnosis: '', treatment: '' }); // Clear form
    };


    return (
        <div className="medicine-container">
            <h1>Chicken Medical Records</h1>

            <div className="add-record-form">
                <h2>Add New Record</h2>
                <input type="text" name="chicken" placeholder="Chicken Name" value={newRecord.chicken} onChange={handleInputChange} />
                <input type="date" name="date" placeholder="Date" value={newRecord.date} onChange={handleInputChange} />
                <input type="text" name="diagnosis" placeholder="Diagnosis" value={newRecord.diagnosis} onChange={handleInputChange} />
                <input type="text" name="treatment" placeholder="Treatment" value={newRecord.treatment} onChange={handleInputChange} />
                <button onClick={handleAddRecord}>Add Record</button>
            </div>


            <table className="medical-records-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Chicken</th>
                        <th>Date</th>
                        <th>Diagnosis</th>
                        <th>Treatment</th>
                    </tr>
                </thead>
                <tbody>
                    {records.map((record) => (
                        <tr key={record.id}>
                            <td>{record.id}</td>
                            <td>{record.chicken}</td>
                            <td>{record.date}</td>
                            <td>{record.diagnosis}</td>
                            <td>{record.treatment}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Medicine;