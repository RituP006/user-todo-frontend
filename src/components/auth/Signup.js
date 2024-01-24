import { Button } from "@chakra-ui/button";
import { Box } from "@chakra-ui/react";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Input, InputGroup, InputRightElement } from "@chakra-ui/input";
import { VStack } from "@chakra-ui/layout";
import { useToast } from "@chakra-ui/toast";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router";
import { BASE_URL } from "../../config/config";

const SignUp = () => {
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);
  const toast = useToast();
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [email, setEmail] = useState();
  const [confirmpassword, setConfirmpassword] = useState();
  const [password, setPassword] = useState();
  const [profileImage, setProfileImage] = useState();
  const [profileImageLoading, setProfileImageLoading] = useState(false);

  const submitHandler = async () => {
    setProfileImageLoading(true);
    if (!firstName || !lastName || !email || !password || !confirmpassword) {
      toast({
        title: "Please Fill all the Feilds",
        status: "warning",
        duration: 3000,
        isClosable: true,
        position: "top-right",
      });
      setProfileImageLoading(false);
      return;
    }
    if (password !== confirmpassword) {
      toast({
        title: "Passwords Do Not Match",
        status: "warning",
        duration: 3000,
        isClosable: true,
        position: "top-right",
      });
      setProfileImageLoading(false);
      return;
    }
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const data = await axios.post(
        `${BASE_URL}/user/register`,
        {
          firstName,
          lastName,
          email,
          password,
          profileImage,
        },
        config
      );
      toast({
        title: "Registration Successful",
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "top-right",
      });
      localStorage.setItem("userInfo", JSON.stringify(data.data.data));
      setProfileImageLoading(false);
      navigate("/home");
    } catch (error) {
      console.log("Error in Signup : ", error);
      const errorMessage =
        error.response && error.response.data
          ? error.response.data.message || "An error occurred"
          : "An error occurred";
      toast({
        title: "Error Occured!",
        description: errorMessage,
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top-right",
      });
      setProfileImageLoading(false);
    }
  };

  const postDetails = (profileImages) => {
    setProfileImageLoading(true);
    if (profileImages === undefined) {
      toast({
        title: "Please Select an Image!",
        status: "warning",
        duration: 3000,
        isClosable: true,
        position: "top-right",
      });
      return;
    }
    if (
      profileImages.type === "image/jpeg" ||
      profileImages.type === "image/png"
    ) {
      const data = new FormData();
      data.append("file", profileImages);
      data.append("upload_preset", "user-todo");
      data.append("cloud_firstName", "dlsmxxtbi");
      fetch("https://api.cloudinary.com/v1_1/dlsmxxtbi/image/upload", {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          console.log("Image upload to cloudinary response : ", data);
          setProfileImage(data?.url?.toString());
          console.log("Image Url : ", data?.url?.toString());
          setProfileImageLoading(false);
        })
        .catch((err) => {
          console.log("Error in uploading image", err);
          setProfileImageLoading(false);
        });
    } else {
      toast({
        title: "Please Select an Image!",
        status: "warning",
        duration: 3000,
        isClosable: true,
        position: "top-right",
      });
      setProfileImageLoading(false);
      return;
    }
  };

  return (
    <VStack spacing="5px">
      <Box
        display="flex"
        width="100%"
        alignItems="center"
        justifyItems="space-between"
      >
        <FormControl id="first-name" isRequired>
          <FormLabel>Firstname</FormLabel>
          <Input
            placeholder="Enter Your First Name"
            onChange={(e) => setFirstName(e.target.value)}
          />
        </FormControl>
        <FormControl id="last-name" isRequired>
          <FormLabel>Lastname</FormLabel>
          <Input
            placeholder="Enter Your Last Name"
            onChange={(e) => setLastName(e.target.value)}
          />
        </FormControl>
      </Box>

      <FormControl id="email" isRequired>
        <FormLabel>Email Address</FormLabel>
        <Input
          type="email"
          placeholder="Enter Your Email Address"
          onChange={(e) => setEmail(e.target.value)}
        />
      </FormControl>
      <FormControl id="password" isRequired>
        <FormLabel>Password</FormLabel>
        <InputGroup size="md">
          <Input
            type={show ? "text" : "password"}
            placeholder="Enter Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={handleClick}>
              {show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>
      <FormControl id="confirm-password" isRequired>
        <FormLabel>Confirm Password</FormLabel>
        <InputGroup size="md">
          <Input
            type={show ? "text" : "password"}
            placeholder="Confirm password"
            onChange={(e) => setConfirmpassword(e.target.value)}
          />
          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={handleClick}>
              {show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>
      <FormControl id="profileImage">
        <FormLabel>Upload your Picture</FormLabel>
        <Input
          type="file"
          p={1.5}
          accept="image/*"
          onChange={(e) => postDetails(e.target.files[0])}
        />
      </FormControl>
      <Button
        colorScheme="purple"
        width="100%"
        style={{ marginTop: 15 }}
        onClick={submitHandler}
        isLoading={profileImageLoading}
      >
        Sign Up
      </Button>
    </VStack>
  );
};

export default SignUp;
