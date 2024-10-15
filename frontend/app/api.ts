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
// Function to compare selected LLMs
export const compareLLM = async (names: string[]) => {
    try {
      const response = await apiClient.post('/ai/compareLLM', { names });
      return response.data; // Return the comparison result
    } catch (error) {
      console.error('Error comparing LLMs:', error);
      throw error; // Propagate the error
    }
  };