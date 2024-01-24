import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import TodoForm from "../components/todo/TodoForm";
import TodoList from "../components/todo/TodoList";
import { Box } from "@chakra-ui/react";
import { getAllTodos } from "../utils/handleApi";

const HomePage = () => {
  const [todos, setTodos] = useState([]);
  const user = JSON.parse(localStorage.getItem("userInfo"));
  const [loading, setIsLoading] = useState(false);

  useEffect(() => {
    getTodos();
  }, []);

  async function getTodos() {
    try {
      setIsLoading(true);
      const data = await getAllTodos(user.id, setTodos);
      setIsLoading(false);
      setTodos([...data]);
    } catch (err) {
      setIsLoading(false);
      console.error("Error in fetching Todos : ", err);
    }
  }

  return (
    <Box style={{ width: "100%" }}>
      <Header />
      <Box width="70%" marginX="auto">
        <TodoForm setTodos={setTodos} />
        <TodoList todos={todos} setTodos={setTodos} loading={loading} />
      </Box>
    </Box>
  );
};

export default HomePage;
