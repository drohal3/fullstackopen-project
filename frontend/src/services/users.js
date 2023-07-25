import axios from "axios";
const baseUrl = "/api/users";

const create = async (userData) => {
  const response = await axios.post(baseUrl, userData);

  return response.data;
};

const changePassword = async (data) => {
  await axios.post(`${baseUrl}/change-password`, data);
}

export default { create, changePassword }