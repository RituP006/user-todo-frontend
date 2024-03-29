import { useState } from "react";
import { Input } from "@chakra-ui/react";
import { useToast } from "@chakra-ui/toast";
import { useUserContext } from "../../context/UserContext";
import { addNewTodo } from "../../utils/handleApi";

const TodoForm = ({ setTodos }) => {
  const [text, setText] = useState("");
  const user = JSON.parse(localStorage.getItem("userInfo"));
  const toast = useToast();

  const onFormSubmit = async (e) => {
    e.preventDefault();
    const todo = {
      title: text,
      isComplete: false,
      userId: user?.id,
    };

    try {
      await addNewTodo(todo);
      setTodos((prev) => [...prev, todo]);
      toast({
        title: "Todo created successfully",
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "top-right",
      });
    } catch (error) {
      toast({
        title: "Error Occured!",
        description: error.message,
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top-right",
      });
    }

    setText("");
  };

  const onInputChange = (e) => {
    setText(e.target.value);
  };

  return (
    <form className="form" onSubmit={onFormSubmit}>
      <Input
        placeholder="Enter new todo..."
        onChange={onInputChange}
        value={text}
        boxShadow="md"
        p="6"
        rounded="md"
        bg="white"
      />
    </form>
  );
};

export default TodoForm;
