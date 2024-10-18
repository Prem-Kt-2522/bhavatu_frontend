import React, { useContext, useState } from 'react';
import './singleproduct.css';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedin, FaPinterest, FaCartPlus } from 'react-icons/fa';
import { BsCart } from 'react-icons/bs'; // Importing the cart icon
import RelatedProducts from "../RelatedProducts/RelatedProducts";
import useFetch from "../hooks/useFetch";
import { useParams } from 'react-router-dom';
import { Context } from '../../utils/context';
import Cart from '../cart/Cart'; // Import the Cart component
import EcomHeader from '../ecomHeader/ecomHeader';

const SingleProduct = () => {
  const [quantity, setQuantity] = useState(1);
  const [showCart, setShowCart] = useState(false); // State to control cart visibility
  const { id } = useParams();
  const { data, loading, error } = useFetch(`/api/products?populate=*&[filters][id]=${id}`);
  const { handleAddToCart } = useContext(Context);
  
  // Increment and decrement quantity
  const increment = () => {
    setQuantity(prevState => prevState + 1);
  };

  const decrement = () => {
    setQuantity(prevState => (prevState > 1 ? prevState - 1 : 1)); // Prevent quantity from going below 1
  };

  // Handle loading and error states
  if (loading) {
    return <p className="loading">Loading...</p>;
  }

  if (error) {
    return <p className="error">Error fetching product data.</p>;
  }

  if (!data || !data.data || data.data.length === 0) {
    return <p className="error">No product found.</p>;
  }

  const productData = data.data[0];
  const { title, price, desc, img, categories } = productData;

  // Construct image URL
  const imageUrl = img?.[0]?.url ? `${import.meta.env.VITE_DEV_URL}${img[0].url}` : '/path/to/default/image.jpg'; // Default image path

  // Safely access categories and join their names if they exist
  const categoryNames = categories && categories.length > 0 
    ? categories.map(category => category.title).join(', ') 
    : 'N/A';

  // Get the category ID for related products
  const categoryId = categories?.[0]?.id; // Assuming you want the first category

  return (
    <>
   <EcomHeader/>
    <div className="singleproduct-maincontent">
      <div className="layout">
        <div className="singleproduct-page">
          {/* Left section: Product Image */}
          <div className="left">
            <img src={imageUrl} alt={title} />
          </div>

          {/* Right section: Product Details */}
          <div className="right">
            <h1 className="name">{title}</h1>
            <h2 className="price">&#8377;{price}</h2>
            <p className="desc">{desc}</p>

            <div className="cart-buttons">
              <div className="quantity-buttons">
                <button className="quantity-btn" onClick={decrement} disabled={quantity === 1}>-</button>
                <span className="quantity-display">{quantity}</span>
                <button className="quantity-btn" onClick={increment}>+</button>
              </div>
              <button className="add-to-cart-button" onClick={() => handleAddToCart(productData, quantity)}>
                <FaCartPlus size={20} /> ADD TO CART
              </button>
            </div>

            <span className="divider" />

            {/* Product Category and Social Share */}
            <div className="info-item">
              <span className="text-bold">
                Category: <span>{categoryNames}</span>
              </span>
              <span className="text-bold">
                SHARE:
                <span className="social-icons">
                  <FaFacebookF size={16} />
                  <FaTwitter size={16} />
                  <FaInstagram size={16} />
                  <FaLinkedin size={16} />
                  <FaPinterest size={16} />
                </span>
              </span>
            </div>  
          </div>
        </div>
      </div>

      {/* Cart Icon Button */}
      <button className="cart-icon" onClick={() => setShowCart(prev => !prev)} aria-label="Toggle Cart">
        <BsCart size={30} className={showCart ? 'active' : ''} /> {/* Highlighted if cart is shown */}
      </button>

      {/* Cart Component */}
      {showCart && <Cart setShowCart={setShowCart} />} {/* Ensure you have this component */}

      {/* Related Products Section */}
      {categoryId && <RelatedProducts productId={id} categoryId={categoryId} />}
    </div>
  </>
  );
};

export default SingleProduct;
