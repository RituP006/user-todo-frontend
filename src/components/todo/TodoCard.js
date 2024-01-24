import { useState } from "react";

import { FaEdit } from "react-icons/fa";
import { ListItem, ListIcon } from "@chakra-ui/react";
import { MdCheckCircle } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { updateTodo, deleteTodo } from "../../actions";
import { Box } from "@chakra-ui/react";
import { useToast } from "@chakra-ui/react";
import { Spinner } from "@chakra-ui/react";
import { useUserContext } from "../../context/UserContext";

const TodoCard = ({ todo, setTodo, todos }) => {
  const [editing, setEditing] = useState(false);
  const [text, setText] = useState(todo?.title);
  const [isDone, setIsDone] = useState(todo?.isComplete);
  const [loading, setIsLoading] = useState(false);
  const { user } = useUserContext();
  const toast = useToast();

  const onFormSubmit = async (e) => {
    e.preventDefault();
    setEditing((prevState) => !prevState);
    try {
      console.log(e.target.value);
      console.log(user.id);
      setIsLoading(true);
      const result = await updateTodo(todo.id, {
        ...todo,
        title: e.target.value,
        isComplete: isDone,
        userId: user.id,
      });
      console.log(result);
      const updatedList = todos.map((elem) => {
        if (elem.id === todo.id) {
          elem.isComplete = isDone;
          elem.title = e.target.value;
        }

        return e;
      });

      setTodo([...updatedList]);
      setIsLoading(false);
      toast({
        title: "Todo updated successfully",
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "top-right",
      });
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      toast({
        title: "Error Occured!",
        description: error.message,
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top-right",
      });
    }
  };

  return (
    <ListItem background={isDone ? "green.100" : "#d7dedfab"} padding=".5rem">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        {loading ? (
          <Spinner />
        ) : (
          <div style={{ width: "100%" }}>
            <ListIcon
              as={MdCheckCircle}
              color={isDone ? "green.500" : ""}
              onClick={() => {
                setIsDone((prev) => !prev);
              }}
            />
            {!editing && todo.title}
            {editing && (
              <form
                style={{
                  display: editing ? "inline" : "none",
                }}
                onSubmit={(e) => onFormSubmit(e)}
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
          <MdDelete color="red" onClick={() => deleteTodo(todo.id)} />
        </Box>
      </Box>
    </ListItem>
  );
};

export default TodoCard;
