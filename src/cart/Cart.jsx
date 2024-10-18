import React, { useContext, useState } from "react";
import "./Cart.css";
import { MdClose } from "react-icons/md";
import { BsCart } from "react-icons/bs";
import CartItem from './cartitem/cartitem';
import { Context } from '../../utils/context';
import axios from 'axios';

const Cart = ({ setShowCart }) => {
    const { cartItems } = useContext(Context);
    const [error, setError] = useState(null);
    
    // Function to handle Razorpay payment
    const handlePayment = async () => {
        if (!cartItems || cartItems.length === 0) {
            alert("Your cart is empty.");
            return;
        }

        const subtotal = calculateSubtotal();

        const options = {
            key: 'rzp_live_TqdzegDnrCIaRh', // Razorpay Key ID
            amount: subtotal * 100, // Subtotal in paise (1 INR = 100 paise)
            currency: 'INR',
            name: 'Bhavatu Store',
            description: 'Purchase Description',
            image: 'https://your-logo-url',
            handler: async function (response) {
                // Payment success callback
                await saveOrder(response.razorpay_payment_id);
            },
            prefill: {
                name: "Customer Name",
                email: "customer@example.com",
                contact: "9999999999",
            },
            theme: {
                color: "#3399cc",
            },
        };

        const rzp = new window.Razorpay(options);
        rzp.open();

        rzp.on('payment.failed', function (response) {
            alert(`Payment failed! Error: ${response.error.description}`);
        });
    };

    // Calculate cart subtotal
    const calculateSubtotal = () => {
        return cartItems.reduce((total, item) => {
            const price = parseFloat(item.price) || 0;
            const quantity = parseInt(item.attributes?.quantity) || 1;
            return total + price * quantity;
        }, 0);
    };

    const subtotal = calculateSubtotal();

    // Function to save order details to Strapi
    const saveOrder = async (paymentId) => {
        const orderData = {
            PaymentId: paymentId,
            CustomerName: "Customer Name", // Replace with dynamic data if needed
            CustomerEmail: "customer@example.com", // Replace with dynamic data if needed
            CustomerContact: "9999999999", // Replace with dynamic data if needed
            Subtotal: subtotal,
            Items: cartItems.map(item => ({
                productId: item.id,
                quantity: item.attributes?.quantity || 1,
                price: item.price,
            })),
            Date: new Date(),
        };

        try {
            const response = await axios.post('http://localhost:1337/orders', orderData, {
                headers: {
                    'Authorization': `Bearer YOUR_API_TOKEN`, // Ensure this is correct
                },
            });

            console.log('Order saved response:', response.data); // Log response for debugging
            alert("Order saved successfully!"); // Notify user of success
            setShowCart(false); // Close the cart after successful order
        } catch (err) {
            console.error("Error saving order:", err.response ? err.response.data : err);
            setError("Failed to save order. Please try again."); // Set error message
        }
    };

    return (
        <div className='cart-panel'>
            <div className="opac-layer"></div>
            <div className="cart-content">
                <div className="cart-header">
                    <span className='heading'>Shopping Cart</span>
                    <span className="close-button" onClick={() => setShowCart(false)}>
                        <MdClose />
                        <span className="text">Close</span>
                    </span>
                </div>

                {cartItems.length === 0 ? (
                    <div className="emptycart">
                        <BsCart size={50} style={{ color: '#8e2de2' }} />
                        <span>No products in the cart.</span>
                        <p>Please add some products to your cart.</p>
                        <button className='return-cta' onClick={() => setShowCart(false)}>Return to shop</button>
                    </div>
                ) : (
                    <>
                        {cartItems.map(item => (
                            <CartItem key={item.id} item={item} />
                        ))}
                        <div className="cart-footer">
                            <div className="subtotal">
                                <span className="text">Subtotal:</span>
                                <span className="text-total"> &#8377;{subtotal.toFixed(2)}</span>
                            </div>
                            <div className="button">
                                <button className='checkout-cta' onClick={handlePayment}>Checkout</button>
                            </div>
                            {error && <div className="error-message">{error}</div>}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default Cart;
