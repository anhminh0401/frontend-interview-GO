// src/App.js
import React, { useState, useEffect } from "react";
import "./App.css";
import productData from "./data";

function App() {
  const [products, setProducts] = useState(productData);
  const [cart, setCart] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  const addToCart = (product) => {
    const updatedCart = [...cart, { ...product, quantity: 1 }];
    setCart(updatedCart);
  };

  const removeFromCart = (productId) => {
    const updatedCart = cart.filter((item) => item.id !== productId);
    setCart(updatedCart);
  };

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity === 0) {
      const updatedCart = cart.filter((item) => item.id !== productId);
      setCart(updatedCart);
    } else {
      const updatedCart = cart.map((item) =>
        item.id === productId ? { ...item, quantity: newQuantity } : item
      );
      setCart(updatedCart);
    }
  };

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
    const newTotalPrice = cart.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    setTotalPrice(newTotalPrice);
  }, [cart]);

  return (
    <div className="App">
      <div className="screen">
        <div className="header">
          <img className="image-nike" src="/assets/nike.png" alt="nike" />
          <h2>Our Products</h2>
        </div>
        <div className="product-list">
          {products.map((product) => (
            <div key={product.id} className="product-card">
              <div
                className="image-container"
                style={{ backgroundColor: product.color }}
              >
                <img className="image" src={product.image} alt={product.name} />
              </div>
              <h3>{product.name}</h3>
              <p>{product.description}</p>
              <div className="price-and-button">
                <p style={{ fontWeight: "bold" }}>${product.price}</p>
                {cart.some((item) => item.id === product.id) ? (
                  <button className="button-check">
                    <img
                      className="image-check"
                      src="/assets/check.png"
                      alt="check"
                    />
                  </button>
                ) : (
                  <button onClick={() => addToCart(product)}>
                    Add to Cart
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="screen">
        <div className="header">
          <img className="image-nike" src="/assets/nike.png" alt="nike" />
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <h2>Your cart</h2>
            <h2>${Number(totalPrice).toFixed(2)}</h2>
          </div>
        </div>
        <div className="cart">
          {cart.length === 0 ? (
            <p>Your cart is empty</p>
          ) : (
            <div className="cart-items">
              {cart.map((item) => (
                <div key={item.id} className="cart-item">
                  <div
                    className="image-container"
                    style={{ backgroundColor: item.color }}
                  >
                    <img className="image" src={item.image} alt={item.name} />
                  </div>
                  <div className="info-cart">
                    <h4>{item.name}</h4>
                    <h3>${item.price}</h3>
                    <div className="button-cart">
                      <div className="button-amount">
                        <button
                          className="circle"
                          onClick={() =>
                            updateQuantity(item.id, item.quantity - 1)
                          }
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
                          onClick={() =>
                            updateQuantity(item.id, item.quantity + 1)
                          }
                        >
                          <img
                            style={{ width: "15px" }}
                            src="/assets/plus.png"
                            alt="plus"
                          />
                        </button>
                      </div>
                      <button
                        className="circle"
                        onClick={() => removeFromCart(item.id)}
                      >
                        <img
                          style={{ width: "15px" }}
                          src="/assets/trash.png"
                          alt="trash"
                        />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;

// <div className="App">
//       <div className="mobile-layout">
//         <div className="products">
//           <h2 className="products-header">Our Products</h2>
// <div className="product-list">
//   {products.map((product) => (
//     <div key={product.id} className="product-card">
//       <img src={product.image} alt={product.name} />
//       <h3>{product.name}</h3>
//       <p>{product.description}</p>
//       <p>${product.price}</p>
//       {product.quantity > 0 ? (
//         <span>Added to Cart</span>
//       ) : (
//         <button onClick={() => addToCart(product)}>
//           Add to Cart
//         </button>
//       )}
//     </div>
//             ))}
//           </div>
//         </div>
//       </div>
//       <div className="mobile-layout">
// <div className="cart">
//   <h2 className="cart-header">Your Cart</h2>
//   {cart.length === 0 ? (
//     <p>Your cart is empty</p>
//   ) : (
//     <div className="cart-items">
//       {cart.map((item) => (
//         <div key={item.id} className="cart-item">
//           <img src={item.image} alt={item.name} />
//           <div>
//             <h3>{item.name}</h3>
//             <p>${item.price}</p>
//             <div>
//               <button
//                 onClick={() =>
//                   updateQuantity(item.id, item.quantity - 1)
//                 }
//               >
//                 -
//               </button>
//               <span>{item.quantity}</span>
//               <button
//                 onClick={() =>
//                   updateQuantity(item.id, item.quantity + 1)
//                 }
//               >
//                 +
//               </button>
//             </div>
//             <button onClick={() => removeFromCart(item.id)}>
//               Remove
//             </button>
//           </div>
//         </div>
//       ))}
//     </div>
//   )}
//   <p>Total: ${totalPrice}</p>
// </div>
//       </div>
//     </div>
