import axios from "axios";

const API_URL = "http://localhost:5000/api/goals/";

const getGoals = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(API_URL, config);
  return response.data;
};

const addGoal = async (goalData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.post(API_URL, goalData, config);
  return response.data;
};

const editGoal = async (goalData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.put(API_URL + ":id", goalData, config);
  return response.data;
};

const removeGoal = async (goalData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.delete(API_URL + ":id", goalData, config);
  return response.data;
};

const goalServices = {
  getGoals,
  addGoal,
  editGoal,
  removeGoal,
};

export default goalServices;
