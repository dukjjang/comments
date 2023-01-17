import axios from "axios";

export const getComments = async () => {
  const response = await axios.get(`${process.env.REACT_APP_API_URL}/comments`);
  return response.data;
};
