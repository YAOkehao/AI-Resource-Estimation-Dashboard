import axios from 'axios';

// Set the base URL for the API
const API_BASE_URL = 'http://127.0.0.1:5000';

// Create an axios instance with base config
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Function to fetch all model information
export const fetchAllModelInfo = async () => {
  try {
    const response = await apiClient.get('/ai/getAllInfo');
    return response.data.result; // Return the result array to the frontend
  } catch (error) {
    console.error('Error fetching model information:', error);
    throw error; // Propagate the error
  }
};