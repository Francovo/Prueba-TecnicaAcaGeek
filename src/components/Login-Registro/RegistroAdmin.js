import {
  Avatar,
  Box,
  Button,
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

import { useForm } from "../../hooks/useForm";
import { RegistroAsincrono } from "../../store/actions/actionRegistro";

const RegistroAdmin = () => {
  const dispatch = useDispatch();

  const [formValue, handleInputChange, reset] = useForm({
    Usuario: "",
    Contraseña: "",
    Email: "",
  });

  const { Usuario, Contraseña, Email } = formValue;

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(RegistroAsincrono(Email, Contraseña, Usuario));
    reset();
  };

  const [showPassword, setShowPassword] = useState(false);
  const handleShowClick = () => setShowPassword(!showPassword);

  return (
    <div>
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
          <Heading color="#000000" fontSize={30} textAlign="center">
            Registro
          </Heading>
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
                      // children={<CFaUserAlt color="gray.400" />}
                    />
                    <Input
                      placeholder="Usuario"
                      name="Usuario"
                      value={Usuario}
                      onChange={handleInputChange}
                    />
                  </InputGroup>
                </FormControl>
                <FormControl>
                  <InputGroup>
                    <InputLeftElement
                      pointerEvents="none"
                      color="gray.300"
                      // children={<CFaLock color="gray.400" />}
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
                      // children={<CFaLock color="gray.400" />}
                    />
                    <Input
                      placeholder="Contraseña"
                      name="Contraseña"
                      type={showPassword ? "text" : "password"}
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
                  type="submit"
                  colorScheme="teal"
                  variant="solid"
                  bg="#322659"
                  _hover={{ bg: "#000000" }}
                  _active={{ bg: "#000000" }}
                >
                  Registrarme
                </Button>
                <Button colorScheme="teal" variant="solid" bg='#805AD5'>
                  <Link to="/LoginAdmin">Ir a Login</Link>
                </Button>
              </Stack>
            </form>
          </Box>
        </Stack>
      </Flex>
    </div>
  );
};

export default RegistroAdmin;
