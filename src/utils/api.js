import { getToken } from './auth';

const API_URL = 'http://localhost:5000/api';

async function apiCall(endpoint, method = 'GET', body = null) {
  const headers = {
    'Content-Type': 'application/json',
    'x-auth-token': getToken()
  };

  const config = {
    method,
    headers
  };

  if (body) {
    config.body = JSON.stringify(body);
  }

  const response = await fetch(`${API_URL}${endpoint}`, config);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Something went wrong');
  }

  return data;
}

export const login = (email, password) => apiCall('/users/login', 'POST', { email, password });
export const register = (username, email, password, phone) => apiCall('/users/register', 'POST', { username, email, password, phone });
export const createCharacter = (characterData) => apiCall('/characters', 'POST', characterData);
export const generateImage = (prompt) => apiCall('/images/generate', 'POST', { prompt });
export const faceSwap = (sourceImage, targetImage) => apiCall('/images/face-swap', 'POST', { sourceImage, targetImage });

export default {
  login,
  register,
  createCharacter,
  generateImage,
  faceSwap
};