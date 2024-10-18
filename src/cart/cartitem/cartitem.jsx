import React, { useContext } from "react";
import { MdClose } from "react-icons/md";
import { Context } from "../../../utils/context"; 
import "./cartitem.css";

const CartItem = ({ item }) => {
    const { handleRemoveFromCart, handleCartProductQuantity } = useContext(Context);
    
    // Access price and quantity directly from the item, ensuring safety
    const price = parseFloat(item.price) || 0; // Ensure price is a float
    const quantity = parseInt(item.attributes?.quantity) || 1; // Default to 1 if quantity is undefined

    return (
        <div className="cart-product">
            <div className="img-container">
                <img
                    src={`${import.meta.env.VITE_DEV_URL}${item.img[0].url}`}
                    alt={item.title}
                />
            </div>
            <div className="product-details">
                <span className="name">{item.title}</span>
                <MdClose
                    className="close-btn"
                    onClick={(e) => {
                        e.stopPropagation();
                        handleRemoveFromCart(item);
                    }}
                />
                <div className="quantity-buttons">
                    <span 
                        onClick={() => handleCartProductQuantity("dec", item)} 
                        className="quantity-btn"
                    >
                        -
                    </span>
                    <span>{quantity}</span>
                    <span 
                        onClick={() => handleCartProductQuantity("inc", item)} 
                        className="quantity-btn"
                    >
                        +
                    </span>
                </div>
                <div className="text">
                    <span>{quantity}</span>
                    <span>x</span>
                    <span className="highlight">
                        <span>&#8377;</span>
                        {(price * quantity).toFixed(2)} {/* Calculate item total */}
                    </span>
                </div>
            </div>
        </div>
    );
};

export default CartItem;
