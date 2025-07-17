import React from 'react';
import './FarmToFarm.css';

import hatcheryImage from '../Assets/cage_housing.png';
import deliveryImage from '../Assets/feed_icon.jpg';
import poultryFarmImage from '../Assets/hero_image.jpg';

const FarmToFarm = () => {
  return (
    <div className="farm-to-farm">
      <header className="farm-header">
        <h1>Farm to Farm Traceability</h1>
        <p>Trace our chicks from hatch to your poultry farm with full transparency.</p>
      </header>

      <section className="farm-section">
        <img src={hatcheryImage} alt="Hatchery Process" />
        <div>
          <h2>1. Our Hatchery</h2>
          <p>
            Every chick’s journey begins at our world-class hatchery where we ensure high biosecurity,
            optimal incubation conditions, and healthy starts. The hatchery process is fully monitored
            and data is recorded for full traceability.
          </p>
        </div>
      </section>

      <section className="farm-section reverse">
        <div>
          <h2>2. Delivery Tracking</h2>
          <p>
            Our GPS-enabled delivery system ensures that the chicks reach your farm on time and in
            excellent condition. Every batch is tracked from departure to arrival.
          </p>
        </div>
        <img src={deliveryImage} alt="Chick Delivery" />
      </section>

      <section className="farm-section">
        <img src={poultryFarmImage} alt="Poultry Farm Arrival" />
        <div>
          <h2>3. Arrival at Your Farm</h2>
          <p>
            Once chicks arrive at your poultry farm, we provide digital records and health documentation
            for each batch to give you full confidence in the quality and origin of your chicks.
          </p>
        </div>
      </section>

      <footer className="farm-footer">
        <p>For more information, contact us at <strong>rsimba@gmail.com</strong></p>
      </footer>
    </div>
  );
};

export default FarmToFarm;
