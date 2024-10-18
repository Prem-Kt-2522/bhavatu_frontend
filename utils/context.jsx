import React, { createContext, useState, useContext, useEffect, useMemo } from "react";
import { useLocation } from "react-router-dom";

export const Context = createContext();

const AppProvider = ({ children }) => {
    const [categories, setCategories] = useState([]);
    const [products, setProducts] = useState([]);
    const [showCart, setShowCart] = useState(false);
    const [cartItems, setCartItems] = useState([]);

    const location = useLocation();

    // Scroll to the top when location changes
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [location]);

    // Calculate total cart item count
    const cartCount = useMemo(() => {
        return cartItems.reduce((count, item) => count + (item.attributes?.quantity || 0), 0);
    }, [cartItems]);

    // Calculate cart subtotal
    const cartSubTotal = useMemo(() => {
        return cartItems.reduce((total, item) => total + (parseFloat(item.attributes?.price) || 0) * (item.attributes?.quantity || 0), 0);
    }, [cartItems]);

    // Handle adding items to the cart
    const handleAddToCart = (product, quantity) => {
        setCartItems(prevItems => {
            const index = prevItems.findIndex(item => item.id === product.id);
            if (index !== -1) {
                // Update quantity if item exists
                const updatedItems = [...prevItems];
                updatedItems[index].attributes.quantity += quantity; // Increment the existing quantity
                return updatedItems;
            } else {
                // Add new product to cart
                return [
                    ...prevItems,
                    {
                        ...product,
                        attributes: {
                            ...product.attributes,
                            quantity, // Set initial quantity for the new product
                        },
                    },
                ];
            }
        });
    };

    // Handle removing an item from the cart
    const handleRemoveFromCart = (product) => {
        setCartItems(prevItems => prevItems.filter(item => item.id !== product.id));
    };

    // Handle incrementing/decrementing product quantity in the cart
    const handleCartProductQuantity = (type, product) => {
        setCartItems(prevItems => {
            const index = prevItems.findIndex(item => item.id === product.id);
            if (index === -1) return prevItems; // Return current state if item not found

            const updatedItems = [...prevItems];
            if (type === "inc") {
                updatedItems[index].attributes.quantity += 1; // Increment quantity
            } else if (type === "dec") {
                if (updatedItems[index].attributes.quantity > 1) {
                    updatedItems[index].attributes.quantity -= 1; // Decrement quantity, prevent going below 1
                } else {
                    // Remove item if quantity is 1 and decremented
                    return updatedItems.filter(item => item.id !== product.id);
                }
            }
            return updatedItems;
        });
    };

    return (
        <Context.Provider
            value={{
                products,
                setProducts,
                categories,
                setCategories,
                cartItems,
                handleAddToCart,
                cartCount, // Exposing cartCount
                handleRemoveFromCart,
                showCart,
                setShowCart,
                handleCartProductQuantity,
                cartSubTotal,
            }}
        >
            {children}
        </Context.Provider>
    );
};

// Custom hook for easier access to context
export const useAppContext = () => {
    return useContext(Context);
};

export default AppProvider;
