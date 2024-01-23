// src/components/CartItem.js
import React, { useState, useEffect } from "react";

const CartItem = ({ item, updateQuantity, removeFromCart }) => {
  const [isRemoving, setIsRemoving] = useState(false);

  const handleRemove = () => {
    setIsRemoving(true);
  };

  useEffect(() => {
    if (isRemoving) {
      const animationTimeout = setTimeout(() => {
        removeFromCart(item.id);
      }, 800);
      return () => clearTimeout(animationTimeout);
    }
  }, [isRemoving]);

  return (
    <div
      key={item.id}
      className={`cart-item ${isRemoving ? "remove" : "show"}`}
    >
      <div className="image-container" style={{ backgroundColor: item.color }}>
        <img className="image" src={item.image} alt={item.name} />
      </div>
      <div className="info-cart">
        <h4>{item.name}</h4>
        <h3>${item.price}</h3>
        <div className="button-cart">
          <div className="button-amount">
            <button
              className="circle"
              onClick={() => updateQuantity(item.id, item.quantity - 1)}
            >
              <img
                style={{ width: "15px" }}
                src="/assets/minus.png"
                alt="minus"
              />
            </button>
            <span>{item.quantity}</span>
            <button
              className="circle"
              onClick={() => updateQuantity(item.id, item.quantity + 1)}
            >
              <img
                style={{ width: "15px" }}
                src="/assets/plus.png"
                alt="plus"
              />
            </button>
          </div>
          <button className="circle" onClick={handleRemove}>
            <img
              style={{ width: "15px" }}
              src="/assets/trash.png"
              alt="trash"
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
