import React, { useState } from 'react';
import './Birds.css';

const Birds = () => {
  const [birds, setBirds] = useState([
    { id: 1, type: 'Broiler', number: 100, eggsPerDay: 0, inBasket: false, mortality: 0, purchasePrice: 0 },
    { id: 2, type: 'Layer', number: 50, eggsPerDay: 1, inBasket: false, mortality: 0, purchasePrice: 0 },
  ]);

  const [showBirdDetails, setShowBirdDetails] = useState(null); 

  const handleAddToBasket = (id) => {
    setBirds(
      birds.map((bird) =>
        bird.id === id ? { ...bird, inBasket: true } : bird
      )
    );
  };

  
  const handleRemoveFromBasket = (id) => {
    setBirds(
      birds.map((bird) =>
        bird.id === id ? { ...bird, inBasket: false } : bird
      )
    );
  };

  const handleBirdClick = (id) => {
    setShowBirdDetails(showBirdDetails === id ? null : id); 
  };

  const handleMortalityChange = (id, event) => {
    const mortality = parseInt(event.target.value) || 0; 
    setBirds(birds.map(bird => bird.id === id ? {...bird, mortality} : bird));
  };

    const handlePurchasePriceChange = (id, event) => {
    const purchasePrice = parseInt(event.target.value) || 0; 
    setBirds(birds.map(bird => bird.id === id ? {...bird, purchasePrice} : bird));
  };


  return (
    <div className="birds-container">
      <h2>Birds</h2>
      <table>
        <thead>
          <tr>
            <th>Type</th>
            <th>Number</th>
            <th>Eggs per Day</th>
            <th>Total Eggs per Day</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {birds.map((bird) => (
            <React.Fragment key={bird.id}> 
              <tr onClick={() => handleBirdClick(bird.id)}> 
                <td>{bird.number}</td>
                <td>{bird.eggsPerDay}</td>
                <td>{bird.number * bird.eggsPerDay}</td>
                <td>
                  {bird.inBasket ? (
                    <button onClick={(e) => { e.stopPropagation(); handleRemoveFromBasket(bird.id); }}> 
                      Remove from Basket
                    </button>
                  ) : (
                    <button onClick={(e) => { e.stopPropagation(); handleAddToBasket(bird.id); }}> 
                      Add to Basket
                    </button>
                  )}
                </td>
              </tr>
              {showBirdDetails === bird.id && ( 
                <tr>
                  <td colSpan="5">
                    <div className="bird-details">
                       <label htmlFor={`mortality-${bird.id}`}>Mortality:</label>
                      <input
                        type="number"
                        id={`mortality-${bird.id}`}
                        value={bird.mortality}
                        onChange={(event) => handleMortalityChange(bird.id, event)}
                      />
                      <label htmlFor={`purchasePrice-${bird.id}`}>Purchase Price:</label>
                      <input
                        type="number"
                        id={`purchasePrice-${bird.id}`}
                        value={bird.purchasePrice}
                        onChange={(event) => handlePurchasePriceChange(bird.id, event)}
                      />
                    </div>
                  </td>
                </tr>
              )}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Birds;