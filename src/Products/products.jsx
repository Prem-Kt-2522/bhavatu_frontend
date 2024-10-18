import React from 'react';
import Product from '../product/product'; // Adjust the path if needed
import './products.css'; // Add any styles you need

const Products = ({ products, headingText }) => {
  return (
    <div className="products-container">
      <h2 className="sec-heading">{headingText}</h2>
      <div className="products"> {/* Use the products class here */}
        {products && products.length > 0 ? (
          products.map((product) => (
            <Product key={product.id} product={product} />
          ))
        ) : (
          <p>No products available</p>
        )}
      </div>
    </div>
  );
};

export default Products;