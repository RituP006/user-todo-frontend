import React, { useState, useEffect } from "react";
import { getAllTodos } from "../../utils/handleApi";
import { useUserContext } from "../../context/UserContext";
import { List } from "@chakra-ui/react";
import TodoCard from "./TodoCard";
import { Spinner } from "@chakra-ui/react";

const TodoList = ({ todos, setTodos, loading }) => {
  if (loading)
    return (
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignContent: "center",
        }}
      >
        <Spinner />
      </div>
    );
  return (
    <div style={{ width: "100%" }}>
      {todos.length == 0 && (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
          }}
        >
          {" "}
          <img
            src="/images/no_data.png"
            alt="logo"
            width="30%"
            height="30%"
            marginx="auto"
            className="hidden xl:block h-screen w-1/2 object-cover bg-no-repeat"
          />
          <h4>Todo List is empty, add now</h4>
        </div>
      )}
      {todos.length != 0 && (
        <List marginY="1rem" spacing={3}>
          {todos.map((todo, i) => (
            <TodoCard key={i} todo={todo} setTodo={setTodos} />
          ))}
        </List>
      )}
    </div>
  );
};

export default TodoList;
