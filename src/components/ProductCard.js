// src/components/ProductCard.js
import React from "react";

const ProductCard = ({ product, addToCart, isItemInCart }) => (
  <div key={product.id} className="product-card">
    <div className="image-container" style={{ backgroundColor: product.color }}>
      <img className="image" src={product.image} alt={product.name} />
    </div>
    <h3>{product.name}</h3>
    <p>{product.description}</p>
    <div className="price-and-button">
      <p style={{ fontWeight: "bold" }}>${product.price}</p>
      {isItemInCart ? (
        <button className="button-check">
          <img className="image-check" src="/assets/check.png" alt="check" />
        </button>
      ) : (
        <button className="add-cart" onClick={() => addToCart(product)}>
          Add to Cart
        </button>
      )}
    </div>
  </div>
);

export default ProductCard;
