import axios from 'axios';

const API_URL = 'http://localhost:1337/admin/'; // Change this to your Strapi URL

const axiosInstance = axios.create({
  baseURL: API_URL,
});

export default axiosInstance;
