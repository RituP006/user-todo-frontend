import React from "react";
import Header from "../components/Header";
import TodoForm from "../components/todo/TodoForm";
import TodoList from "../components/todo/TodoList";
import { Box } from "@chakra-ui/react";

const HomePage = () => {
  return (
    <Box style={{ width: "100%" }}>
      <Header />
      <Box width="70%" marginX="auto">
        <TodoForm />
        <TodoList />
      </Box>
    </Box>
  );
};

export default HomePage;
