import {
  Box,
  Container,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from "@chakra-ui/react";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import Login from "../components/auth/Login";
import Signup from "../components/auth/Signup";

function AuthPage() {
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("userInfo"));

    if (user) navigate("/home");
  }, [navigate]);

  return (
    <Container maxW="xl" centerContent>
      <Box
        bg="white"
        w="100%"
        p={4}
        borderRadius="lg"
        borderWidth="1px"
        display="flex"
        flexDirection="column"
        justifyContent="center"
        m="40px 0 15px 0"
      >
        <Text
          textAlign="center"
          fontSize="2xl"
          fontWeight="bold"
          my="1rem"
          color="#243143"
        >
          A simple todo app for your rescue!
        </Text>
        <Tabs isFitted variant="soft-rounded" colorScheme="purple">
          <TabList mb="1em">
            <Tab>Login</Tab>
            <Tab>Sign Up</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <Login />
            </TabPanel>
            <TabPanel>
              <Signup />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Container>
  );
}

export default AuthPage;
