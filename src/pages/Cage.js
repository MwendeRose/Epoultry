import React, { useState } from 'react';
import poultryVideo from '../Assets/poultry video.mp4';
import './Cage.css';

const Cage = () => {
    const [records, setRecords] = useState([
        { id: 1, item: 'Feed (Starter)', quantity: '50 kg', date: '2024-07-27', storage: 'Warehouse A', notes: 'Received new batch. Check expiry.' },
        { id: 2, item: 'Feed (Grower)', quantity: '30 kg', date: '2024-07-26', storage: 'Warehouse B', notes: 'Low stock. Order soon.' },
        { id: 3, item: 'Chickens (Broiler)', quantity: '100', date: '2024-07-25', storage: 'Cage 1', notes: 'Healthy batch.' }
    ]);

    const [newRecord, setNewRecord] = useState({
        item: '',
        quantity: '',
        date: '',
        storage: '',
        notes: '',
    });

    const handleInputChange = (e) => {
        setNewRecord({ ...newRecord, [e.target.name]: e.target.value });
    };

    const handleAddRecord = () => {
        setRecords([...records, { ...newRecord, id: records.length + 1 }]);
        setNewRecord({ item: '', quantity: '', date: '', storage: '', notes: '' }); // Clear form
    };

    return (
        <div className="cage-container">
            <h1>Poultry Storage Records</h1>

            <div className="video-container">
                <video width="640" height="360" controls>
                    <source src={poultryVideo} type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
            </div>

            <div className="storage-summary"> {/* New summary section */}
                <h2>Storage Overview</h2>
                <p>Total Items: {records.length}</p>
                <p>Total Feed (kg): {records.filter(r => r.item.includes('Feed')).reduce((sum, r) => sum + parseInt(r.quantity), 0)} kg</p>
                <p>Total Chickens: {records.filter(r => r.item.includes('Chicken')).reduce((sum, r) => sum + parseInt(r.quantity), 0)}</p>
                {/* Add more summaries as needed */}
            </div>


            <div className="add-record-form">
                <h2>Add New Record</h2>
                <input type="text" name="item" placeholder="Item" value={newRecord.item} onChange={handleInputChange} />
                <input type="text" name="quantity" placeholder="Quantity" value={newRecord.quantity} onChange={handleInputChange} />
                <input type="date" name="date" placeholder="Date" value={newRecord.date} onChange={handleInputChange} />
                <input type="text" name="storage" placeholder="Storage Location" value={newRecord.storage} onChange={handleInputChange} />
                <textarea name="notes" placeholder="Notes" value={newRecord.notes} onChange={handleInputChange}></textarea> {/* Notes field */}
                <button onClick={handleAddRecord}>Add Record</button>
            </div>

            <table className="storage-records-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Item</th>
                        <th>Quantity</th>
                        <th>Date</th>
                        <th>Storage Location</th>
                        <th>Notes</th> {/* Notes column */}
                    </tr>
                </thead>
                <tbody>
                    {records.map((record) => (
                        <tr key={record.id}>
                            <td>{record.id}</td>
                            <td>{record.item}</td>
                            <td>{record.quantity}</td>
                            <td>{record.date}</td>
                            <td>{record.storage}</td>
                            <td>{record.notes}</td> {/* Display notes */}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Cage;