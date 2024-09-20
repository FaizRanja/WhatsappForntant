// src/utils/authUtils.js
import axios from 'axios';

export const verifyToken = async (token) => {
  try {
    const response = await axios.post('http://localhost:4000/api/v1/user/verify-token', { token });
    return response.data.isValid; // Assuming your API returns { isValid: true/false }
  } catch (error) {
    console.error('Token verification failed:', error);
    return false;
  }
};
