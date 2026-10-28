
import API from "./axios.js";

// Register client or developer
export const registerUser = async (userData) => {
  const response = await API.post("/auth/register", userData);
  return response.data;
};

// Login existing user
export const loginUser = async (loginData) => {
  const response = await API.post("/auth/login", loginData);
  return response.data;
};
