import axios from 'axios';

// Common headers for Axios requests
const params = {
  headers: {
    Authorization: `Bearer ${import.meta.env.VITE_STRIPE_APP_KEY}`,
  },
};

// Fetch products by category ID
export const fetchProductsByCategoryId = async (id) => {
  console.log("Fetching products for category ID:", id); // Log the category ID being fetched

  try {
    const response = await fetch(
      `http://localhost:1337/api/products?filters[category][id][$eq]=${id}&populate=*`
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    console.log('Fetched products for category ID:', id, result.data); // Log fetched products
    return result.data;
  } catch (error) {
    console.error('Error fetching products by category ID:', error);
    throw error;
  }
};

// Generic function to fetch data from API using Axios
export const fetchDataFromApi = async (url) => {
  const fullUrl = `${import.meta.env.VITE_DEV_URL}${url}`;
  console.log("Fetching data from:", fullUrl);

  try {
    const response = await axios.get(fullUrl, params);
    console.log("API response:", response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching data from API:', error.response?.data || error.message);
    throw error;
  }
};

// Create an Axios instance for payment requests
export const makePaymentRequest = axios.create({
  baseURL: import.meta.env.VITE_DEV_URL,
  headers: {
    Authorization: `Bearer ${import.meta.env.VITE_STRIPE_APP_KEY}`,
  },
});

// Function to create an order
export const createOrder = async (orderData) => {
  try {
    const response = await makePaymentRequest.post('/api/orders', orderData);
    console.log('Order created successfully:', response.data); // Log successful order creation
    return response.data; // Return the order data
  } catch (error) {
    console.error('Error creating order:', error.response?.data || error.message);
    throw error;
  }
};

// Additional function to fetch product details (if needed)
export const fetchProductById = async (id) => {
  console.log("Fetching product with ID:", id); // Log the product ID being fetched

  try {
    const response = await fetch(`http://localhost:1337/api/products/${id}?populate=*`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    console.log('Fetched product:', result.data); // Log fetched product
    return result.data;
  } catch (error) {
    console.error('Error fetching product by ID:', error);
    throw error;
  }
};
