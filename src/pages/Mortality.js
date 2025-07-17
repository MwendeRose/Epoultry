import React, { useEffect, useState } from 'react';
import './Mortality.css';

const Mortality = () => {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalStock, setTotalStock] = useState(1000); // starting stock

  const [newRecord, setNewRecord] = useState({
    date: '',
    type: 'Mortality',
    quantity: '',
    client: '',
    note: '',
  });

  useEffect(() => {
    const mockData = [
      {
        id: 1,
        date: '2025-07-15',
        type: 'Mortality',
        quantity: 5,
        client: '-',
        note: 'Disease loss',
      },
      {
        id: 2,
        date: '2025-07-16',
        type: 'Slaughter',
        quantity: 20,
        client: 'Green Hotel',
        note: 'Supplied for buffet',
      },
    ];

    setTimeout(() => {
      setRecords(mockData);
      setLoading(false);
    }, 500);
  }, []);

  const totalMortality = records
    .filter((r) => r.type === 'Mortality')
    .reduce((sum, r) => sum + Number(r.quantity), 0);

  const totalSlaughtered = records
    .filter((r) => r.type === 'Slaughter')
    .reduce((sum, r) => sum + Number(r.quantity), 0);

  const remaining = totalStock - (totalMortality + totalSlaughtered);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewRecord({ ...newRecord, [name]: value });
  };

  const handleAddRecord = () => {
    if (!newRecord.date || !newRecord.quantity) {
      alert('Please fill in the date and quantity.');
      return;
    }

    const newId = records.length + 1;

    setRecords([
      ...records,
      {
        id: newId,
        ...newRecord,
        client: newRecord.type === 'Mortality' ? '-' : newRecord.client || '-',
        quantity: Number(newRecord.quantity),
      },
    ]);

    // Reset form
    setNewRecord({
      date: '',
      type: 'Mortality',
      quantity: '',
      client: '',
      note: '',
    });
  };

  if (loading) {
    return <div>Loading records...</div>;
  }

  return (
    <div className="mortality-container">
      <h2>Mortality & Slaughter Records</h2>

      <div className="mortality-summary">
        <p><strong>Starting Stock:</strong> {totalStock} birds</p>
        <p><strong>Total Dead:</strong> {totalMortality} birds</p>
        <p><strong>Total Slaughtered:</strong> {totalSlaughtered} birds</p>
        <p><strong>Remaining Stock:</strong> {remaining} birds</p>
      </div>

      <table className="mortality-table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Type</th>
            <th>Quantity</th>
            <th>Client</th>
            <th>Note</th>
          </tr>
        </thead>
        <tbody>
          {records.map((record) => (
            <tr key={record.id}>
              <td>{record.date}</td>
              <td>{record.type}</td>
              <td>{record.quantity}</td>
              <td>{record.client}</td>
              <td>{record.note}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="add-record-form">
        <h3>Add New Record</h3>
        <label>
          Date:
          <input
            type="date"
            name="date"
            value={newRecord.date}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Type:
          <select
            name="type"
            value={newRecord.type}
            onChange={handleInputChange}
          >
            <option value="Mortality">Mortality</option>
            <option value="Slaughter">Slaughter</option>
          </select>
        </label>
        <label>
          Quantity:
          <input
            type="number"
            name="quantity"
            value={newRecord.quantity}
            onChange={handleInputChange}
          />
        </label>
        {newRecord.type === 'Slaughter' && (
          <label>
            Client:
            <input
              type="text"
              name="client"
              value={newRecord.client}
              onChange={handleInputChange}
              placeholder="Client name"
            />
          </label>
        )}
        <label>
          Note:
          <textarea
            name="note"
            value={newRecord.note}
            onChange={handleInputChange}
            placeholder="Optional note"
          />
        </label>
        <button onClick={handleAddRecord}>Add Record</button>
      </div>
    </div>
  );
};

export default Mortality;
