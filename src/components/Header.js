import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Text, Container, Flex } from "@chakra-ui/react";
import { Avatar } from "@chakra-ui/avatar";
import ProfileModal from "./user/ProfileModal";
import { useUserContext } from "../context/UserContext";
import { MdLogout } from "react-icons/md";

const Header = () => {
  const navigate = useNavigate();
  const { user } = useUserContext();
  console.log(user);

  const logoutHandler = () => {
    localStorage.removeItem("userInfo");
    navigate("/");
  };

  return (
    <>
      <Flex
        as="nav"
        align="center"
        justify="space-between"
        wrap="wrap"
        w="100%"
        mb={8}
        boxShadow="base"
        rounded="md"
        p={6}
        bg={["primary.500", "primary.500", "transparent", "transparent"]}
      >
        <div>
          <Text fontSize="2xl" fontWeight="600" color="black">
            Todo App
          </Text>
        </div>

        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          p="5px 10px 5px 10px"
        >
          {user && (
            <ProfileModal user={user}>
              <Container
                display="flex"
                justifyContent="center"
                alignItems="center"
                gap="2"
              >
                <Avatar
                  size="sm"
                  cursor="pointer"
                  name={user.firstName + " " + user.lastName}
                  src={user.profileImage ?? ""}
                />{" "}
                <h5 mt={3}>{user.firstName + " " + user.lastName}</h5>
              </Container>
            </ProfileModal>
          )}
          <MdLogout onClick={logoutHandler} />
        </Box>
      </Flex>
    </>
  );
};

export default Header;
