import axios from "axios";

import { BASE_URL } from "../config/config";

export const addNewTodo = async (data) => {
  try {
    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };
    const res = await axios.post(`${BASE_URL}/todo`, data, config);

    return res;
  } catch (error) {
    console.error("Error while calling addNewTodo API ", error.message);
  }
};

export const getAllTodos = async (userId, setTodos) => {
  try {
    const res = await axios.get(`${BASE_URL}/todo/${userId}`);
    setTodos([...res.data.data]);
    return res.data.data;
  } catch (error) {
    console.error("Error while calling getAllTodos API ", error.message);
  }
};

export const updateTodo = async (id, data, setTodo) => {
  try {
    const res = await axios.put(`${BASE_URL}/todo/${id}`, data);
    await getAllTodos(data.userId, setTodo);
    return res.data.data;
  } catch (error) {
    console.error("Error while calling updateTodo API ", error.message);
  }
};

export const deleteTodo = async (id, setTodo, userId) => {
  try {
    const res = await axios.delete(`${BASE_URL}/todo/${id}`);
    await getAllTodos(userId, setTodo);
    return res;
  } catch (error) {
    console.error("Error while calling deleteTodo API ", error.message);
  }
};
