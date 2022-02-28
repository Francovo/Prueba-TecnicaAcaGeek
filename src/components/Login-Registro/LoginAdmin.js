import {
  Avatar,
  Box,
  Button,
  chakra,
  Flex,
  FormControl,
  Heading,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Stack,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import {
  loginEmailPassAsincrono,
  loginFacebookAsincrono,
  loginGoogleAsincrono,
} from "../../store/actions/actionLogin";
import { useForm } from "../../hooks/useForm";
import { AiFillGoogleCircle } from "react-icons/ai";
import { BsFacebook } from "react-icons/bs";

import { FaUserAlt, FaLock } from "react-icons/fa";

const CFaUserAlt = chakra(FaUserAlt);
const CFaLock = chakra(FaLock);

const LoginAdmin = () => {
  const dispatch = useDispatch();

  const [formValue, handleInputChange] = useForm({
    Contraseña: "",
    Email: "",
  });

  const { Contraseña, Email } = formValue;

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginEmailPassAsincrono(Email, Contraseña));
  };

  const handleGoogleAsincrono = () => {
    dispatch(loginGoogleAsincrono());
  };

  const handleFacebookAsincronico = () => {
    dispatch(loginFacebookAsincrono());
  };

  const [showPassword, setShowPassword] = useState(false);

  const handleShowClick = () => setShowPassword(!showPassword);

  return (
    <div>
      <Button
        borderRadius={0}
        type="submit"
        bg="#805AD5"
        variant="solid"
        width="full"
        color="white"
        _hover={{ bg: "#000000" }}
        _active={{ bg: "#000000" }}
      >
        <Link to='/'>
        Registrar Datos
        </Link>
      </Button>
      <Flex
        flexDirection="column"
        width="100wh"
        height="100vh"
        backgroundColor="gray.300"
        justifyContent="center"
        alignItems="center"
      >
        <Stack
          flexDir="column"
          mb="2"
          justifyContent="center"
          alignItems="center"
        >
          <Avatar bg="#805AD5" />
          <Heading color="#000000">Welcome</Heading>
          <Box minW={{ base: "90%", md: "468px" }}>
            <form onSubmit={handleSubmit}>
              <Stack
                spacing={4}
                p="1rem"
                backgroundColor="whiteAlpha.900"
                boxShadow="md"
              >
                <FormControl>
                  <InputGroup>
                    <InputLeftElement
                      pointerEvents="none"
                      children={<CFaUserAlt color="gray.400" />}
                    />
                    <Input
                      placeholder="Email"
                      name="Email"
                      type="email"
                      value={Email}
                      onChange={handleInputChange}
                    />
                  </InputGroup>
                </FormControl>
                <FormControl>
                  <InputGroup>
                    <InputLeftElement
                      pointerEvents="none"
                      color="gray.300"
                      children={<CFaLock color="gray.400" />}
                    />
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder="Contraseña"
                      name="Contraseña"
                      value={Contraseña}
                      onChange={handleInputChange}
                    />
                    <InputRightElement width="4.5rem">
                      <Button h="1.75rem" size="sm" onClick={handleShowClick}>
                        {showPassword ? "Hide" : "Show"}
                      </Button>
                    </InputRightElement>
                  </InputGroup>
                </FormControl>
                <Button
                  borderRadius={0}
                  type="submit"
                  bg="#805AD5"
                  variant="solid"
                  width="full"
                  color="white"
                  _hover={{ bg: "#000000" }}
                  _active={{ bg: "#000000" }}
                >
                  Login
                </Button>

                <Button
                  onClick={() => handleGoogleAsincrono()}
                  leftIcon={<AiFillGoogleCircle fontSize={21} />}
                  bg="#805AD5"
                  variant="solid"
                  color="white"
                  _hover={{ bg: "#000000" }}
                  _active={{ bg: "#000000" }}
                >
                  Login With Google
                </Button>

                <Button
                  onClick={() => handleFacebookAsincronico()}
                  leftIcon={<BsFacebook />}
                  bg="#805AD5"
                  variant="solid"
                  color="white"
                  _hover={{ bg: "#000000" }}
                  _active={{ bg: "#000000" }}
                >
                  Login With Facebook
                </Button>

                <Button colorScheme="teal" variant="solid" bg="#322659">
                  <Link to="/RegistroAdmin">Registrarme como Admin</Link>
                </Button>
              </Stack>
            </form>
          </Box>
        </Stack>
      </Flex>
    </div>
  );
};

export default LoginAdmin;
