import { useState } from 'react';
import React from 'react';
import { MdClose } from 'react-icons/md';
import './search.css';
import { useNavigate } from 'react-router-dom';
import useFetch from "../hooks/useFetch";

const Search = ({ setShowSearch }) => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  // Use custom hook to fetch products based on the query
  const { data, loading, error } = useFetch(`/api/products?populate=*&filters[title][$contains]=${query}`);

  const onChange = (e) => {
    setQuery(e.target.value);
  };

  return (
    <div className='search-model'>
      <div className="form-field">
        <input
          type="text"
          autoFocus
          placeholder='Search for product'
          value={query}
          onChange={onChange} // Updated to handle input change
        />
        <MdClose className='close-btn' onClick={() => setShowSearch(false)} />
      </div>
      <div className="search-result-content">
        <div className="search-result">
          {loading && <p>Loading...</p>} {/* Show loading state */}
          {error && <p>Error fetching products.</p>} {/* Show error state */}
          {data && data.data && data.data.length > 0 ? (
            data.data.map(item => (
              <div key={item.id} className="search-result-item" onClick={() => navigate(`/product/${item.id}`)}>
                <div className="img-container">
                  {item.img && item.img[0]?.url ? ( // Ensure image exists and access the first image
                    <img src={`${import.meta.env.VITE_DEV_URL}${item.img[0].url}`} alt={item.title || "Product Image"} />
                  ) : (
                    <p>No image available</p> // Fallback if no image
                  )}
                </div>
                <div className="product-details">
                  <span className="name">{item.title}</span>
                  <span className="desc">{item.description || "Product description goes here"}</span> {/* Added description */}
                  <span className="price">&#8377;{item.price}</span> {/* Display price if available */}
                </div>
              </div>
            ))
          ) : (
            query.length > 0 && <p>No products found</p> // Display message when no results match the query
          )}
        </div>
      </div>
    </div>
  );
};

export default Search;
