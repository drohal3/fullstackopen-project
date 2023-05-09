import axios from "axios";
const baseUrl = "/api/articles";

let token = null;
let config;

const setToken = (newToken) => {
  token = `bearer ${newToken}`;
  config = {
    headers: { Authorization: token },
  };
};

const get = async (articleId) => {
  const response = await axios.get(`${baseUrl}/${articleId}`, config);

  return response.data;
}

const getAll = async () => {
  const response = await axios.get(baseUrl, config);

  return response.data;
};

const create = async (articleData) => {
  const response = await axios.post(baseUrl, articleData, config);

  return response.data;
};

const update = async (articleData) => {
  const response = await axios.put(
    `${baseUrl}/${articleData.id}`,
    articleData,
    config
  );

  return response.data;
};

const remove = async (articleId) => {
  console.log("config", config)

  const response = await axios.delete(`${baseUrl}/${articleId}`, config);

  return response.data;
};

export default { get, getAll, setToken, create, update, remove };
