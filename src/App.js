// src/App.js
import React, { useState, useEffect } from "react";
import "./App.css";
import ProductCard from "./components/ProductCard";
import CartItem from "./components/CartItem";
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
    console.log("🚀 ~ removeFromCart ~ productId:", productId);
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
    const storedCart = JSON.parse(localStorage.getItem("cart"));
    if (storedCart) {
      setCart(storedCart);
    }
  }, []);

  useEffect(() => {
    if (cart && cart.length > 0)
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
            <ProductCard
              key={product.id}
              product={product}
              addToCart={addToCart}
              isItemInCart={cart.some((item) => item.id === product.id)}
            />
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
                <CartItem
                  key={item.id}
                  item={item}
                  updateQuantity={updateQuantity}
                  removeFromCart={removeFromCart}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
