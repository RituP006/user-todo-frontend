import { useState, useEffect } from "react";

import { FaEdit } from "react-icons/fa";
import { ListItem, ListIcon } from "@chakra-ui/react";
import { MdCheckCircle } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { updateTodo, deleteTodo } from "../../utils/handleApi";
import { Box } from "@chakra-ui/react";
import { useToast } from "@chakra-ui/react";
import { Spinner } from "@chakra-ui/react";
import { useUserContext } from "../../context/UserContext";

const TodoCard = ({ todo, setTodo }) => {
  const [editing, setEditing] = useState(false);
  const [text, setText] = useState(todo?.title);
  const [isDone, setIsDone] = useState(todo?.isComplete);
  const [loading, setIsLoading] = useState(false);
  const { user } = useUserContext();
  const toast = useToast();

  async function handleUpdate(data) {
    try {
      setIsLoading(true);
      const result = await updateTodo(todo.id, data, setTodo);
      setIsLoading(false);
      toast.closeAll();
      toast({
        title: "Todo updated successfully",
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "top-right",
      });
      return result;
    } catch (error) {
      console.log("Error in updating todo : ", error);
      setIsLoading(false);
      toast.closeAll();
      toast({
        title: "Error Occured!",
        description: error.message,
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top-right",
      });
    }
  }
  const onFormSubmit = async (e) => {
    e.preventDefault();
    await handleUpdate({ ...todo, title: text });
    setEditing(false);
  };

  const updateOnToggle = async () => {
    await handleUpdate({ ...todo, isComplete: !isDone });
    setIsDone(!isDone);
  };

  return (
    <ListItem
      background={todo.isComplete ? "green.100" : "#d7dedfab"}
      padding=".5rem"
    >
      <Box display="flex" justifyContent="space-between" alignItems="center">
        {loading ? (
          <Spinner />
        ) : (
          <div style={{ width: "100%" }}>
            <ListIcon
              as={MdCheckCircle}
              color={todo.isComplete ? "green.500" : ""}
              onClick={() => updateOnToggle()}
            />
            <span
              style={{
                textDecoration: todo.isComplete ? "strike-through" : "",
              }}
            >
              {!editing && todo.title}
            </span>
            {editing && (
              <form
                style={{
                  display: editing ? "inline" : "none",
                }}
                onSubmit={onFormSubmit}
              >
                <input
                  type="text"
                  value={text}
                  className="edit-todo"
                  style={{ width: "89%" }}
                  onChange={(e) => setText(e.target.value)}
                />
              </form>
            )}
          </div>
        )}
        <Box display="flex" gap="10px">
          <FaEdit
            color="black"
            onClick={() => {
              setEditing((prev) => !prev);
            }}
          />
          <MdDelete
            color="red"
            onClick={() => {
              deleteTodo(todo.id, setTodo, user.id).then((result) => {
                console.log("Delete result", result);
              });
            }}
          />
        </Box>
      </Box>
    </ListItem>
  );
};

export default TodoCard;
