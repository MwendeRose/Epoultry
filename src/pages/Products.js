import React, { useState } from 'react';
import './Products.css';
import { FaShoppingCart } from 'react-icons/fa';

import eggs from '../Assets/eggs.avif';
import femaleChick from '../Assets/femalechick.jfif';
import maleChick from '../Assets/malechick.jfif';
import manureIcon from '../Assets/manure_icon.png';
import feedIcon from '../Assets/feed_icon.jpg';
import organicEggs from '../Assets/organic eggs.webp';

const products = [
  { id: 1, image: eggs, title: 'Fresh Eggs', price: 450 },
  { id: 2, image: femaleChick, title: 'Female Chick', price: 80 },
  { id: 3, image: maleChick, title: 'Male Chick', price: 70 },
  { id: 4, image: manureIcon, title: 'Organic Manure', price: 500 },
  { id: 5, image: feedIcon, title: 'Poultry Feed', price: 2000 },
  { id: 6, image: organicEggs, title: 'Organic Eggs', price: 600 },
];

const Products = ({ cart = [], setCart }) => {
  const [showCheckout, setShowCheckout] = useState(false);

  const handleAddToCart = (product) => {
    const existingItem = cart.find((item) => item.id === product.id);
    if (existingItem) {
      const updatedCart = cart.map((item) =>
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      );
      setCart(updatedCart);
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const handleCheckout = () => {
    alert('Proceeding to payment...');
    setShowCheckout(false);
    setCart([]);
  };

  const totalAmount = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="products-page">
      <h1>Products</h1>

      <div className="cart-icon" onClick={() => setShowCheckout(!showCheckout)}>
        <FaShoppingCart size={28} />
        <span className="cart-count">{cart.length}</span>
      </div>

      <div className="products-grid">
        {products.map((product) => (
          <div key={product.id} className="product-card">
            <img src={product.image} alt={product.title} />
            <h3>{product.title}</h3>
            <p>KES {product.price}</p>
            <button onClick={() => handleAddToCart(product)}>Order Now</button>
          </div>
        ))}
      </div>

      {showCheckout && (
        <div className="checkout-panel">
          <h2>Checkout</h2>
          {cart.length === 0 ? (
            <p>Your cart is empty</p>
          ) : (
            <>
              <ul>
                {cart.map((item) => (
                  <li key={item.id}>
                    {item.title} x {item.quantity} — KES {item.price * item.quantity}
                  </li>
                ))}
              </ul>
              <h3>Total: KES {totalAmount}</h3>
              <button onClick={handleCheckout}>Pay Now</button>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default Products;
