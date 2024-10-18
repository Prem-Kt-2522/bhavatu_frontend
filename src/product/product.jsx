import React from 'react';
import './product.css'; // Add styles specific to the product
import { useNavigate } from "react-router-dom";

const Product = ({ product }) => {
  const { id, title, price, img } = product; // Ensure 'id' is included
  const navigate = useNavigate();

  return (
    <div className="product-card" onClick={() => navigate(`/product/${id}`)}>
      {img && img.length > 0 && img[0].url ? (
        <img src={`${import.meta.env.VITE_DEV_URL}${img[0].url}`} alt={title} />
      ) : (
        <p>No image available</p>
      )}
      <div className="prod-details">
        <h3 className="name">{title}</h3>
        <span className="price">&#8377;{price}</span>
      </div>
    </div>
  );
};

export default Product;
