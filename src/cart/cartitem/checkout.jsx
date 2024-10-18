// src/Checkout.jsx
import React, { useState } from 'react';
import { db } from './firebase'; // Import your firebase configuration
import { collection, addDoc } from 'firebase/firestore';
import Razorpay from 'razorpay';

const Checkout = () => {
    const [userDetails, setUserDetails] = useState({ name: '', email: '' });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserDetails({ ...userDetails, [name]: value });
    };

    const handleCheckout = async (e) => {
        e.preventDefault();

        try {
            // Store user details in Firestore
            const docRef = await addDoc(collection(db, 'orders'), userDetails);
            console.log('User details saved with ID: ', docRef.id);

            // Proceed to payment
            initiateRazorpay(userDetails);
        } catch (e) {
            console.error('Error adding document: ', e);
        }
    };

    const initiateRazorpay = (userDetails) => {
        const options = {
            key: 'YOUR_RAZORPAY_KEY', // Replace with your Razorpay Key ID
            amount: 50000, // Amount in currency subunits. This is 500 INR
            currency: 'INR',
            name: 'Your Website Name',
            description: 'Test Transaction',
            handler: async (response) => {
                alert(`Payment Successful! Payment ID: ${response.razorpay_payment_id}`);

                // Optionally, you can store the payment details along with user details
                await addDoc(collection(db, 'payments'), {
                    orderId: docRef.id,
                    userId: response.razorpay_payment_id,
                    userDetails: userDetails,
                    amount: 50000,
                    status: 'Success',
                });
            },
            prefill: {
                name: userDetails.name,
                email: userDetails.email,
            },
            theme: {
                color: '#F37254',
            },
        };

        const razorpay = new Razorpay(options);
        razorpay.open();
        razorpay.on('payment.failed', function (response) {
            console.error(response);
            alert(`Payment Failed! Payment ID: ${response.razorpay_payment_id}`);
        });
    };

    return (
        <form onSubmit={handleCheckout}>
            <input
                type="text"
                name="name"
                placeholder="Name"
                value={userDetails.name}
                onChange={handleInputChange}
                required
            />
            <input
                type="email"
                name="email"
                placeholder="Email"
                value={userDetails.email}
                onChange={handleInputChange}
                required
            />
            <button type="submit">Checkout</button>
        </form>
    );
};

export default Checkout;
