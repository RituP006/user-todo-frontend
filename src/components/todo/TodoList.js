import React, { useState, useEffect } from "react";
import { getAllTodos } from "../../actions";
import { useUserContext } from "../../context/UserContext";
import { List } from "@chakra-ui/react";
import TodoCard from "./TodoCard";

const TodoList = () => {
  const { user } = useUserContext();
  const [todos, setTodos] = useState([]);
  const [loading, setIsLoading] = useState(false);

  useEffect(() => {
    if (user) getTodos();
  }, [todos, user]);

  async function getTodos() {
    try {
      setIsLoading(true);
      const data = await getAllTodos(user.id);
      setIsLoading(false);
      setTodos([...data]);
    } catch (err) {}
  }
  return (
    <div>
      {todos.length == 0 && <p>Todo List is empty, add now</p>}
      {todos.length != 0 && (
        <List marginY="1rem" spacing={3}>
          {todos.map((todo) => (
            <TodoCard
              key={todo.id}
              todo={todo}
              setTodo={setTodos}
              todos={todos}
            />
          ))}
        </List>
      )}
    </div>
  );
};

export default TodoList;
