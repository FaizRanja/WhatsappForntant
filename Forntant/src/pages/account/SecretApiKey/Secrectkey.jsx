// utils/auth.js
import axios from 'axios';
import Cookies from 'js-cookie';


// Function for get the Secret Key from api 
export const getUserSecretKey = async () => {
  const token = Cookies.get('token');
  if (!token) {
    throw new Error('No token found. Please log in again.');
  }
  const userResponse = await axios.get('http://localhost:4000/api/v1/user/Getallregisteruser', {
    headers: { 'Authorization': `Bearer ${token}` },
    withCredentials: true,
  });
  const { secretKey } = userResponse.data.user;
  if (!secretKey) {
    throw new Error('No secret key found for the user.');
  }

  return secretKey; // Return the secret key
};



