import React from "react";
import { useForm } from "../../hooks/useForm";
import { Link, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { v4 as uuidv4 } from "uuid";
import {
  Box,
  Button,
  Flex,
  FormControl,
  Heading,
  Input,
  InputGroup,
  InputLeftElement,
  Stack,
} from "@chakra-ui/react";
import { AiFillGithub } from "react-icons/ai";
import { BiHappyAlt } from "react-icons/bi";
import { useDispatch } from "react-redux";
import { RegistroAsincronoData } from "../../store/actions/actionData";

const RegistroGit = (logged) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formValue, handleInputChange, reset] = useForm({
    nombre: "",
    apelldos: "",
    Cedula: "",
    Fecha: "",
    Correo: "",
    Github: "",
  });

  const { nombre, apelldos, Cedula, Fecha, Correo, Github } = formValue;

  // eslint-disable-next-line no-unused-vars
  const [cookies, setcookies] = useCookies([
    "Nombre",
    "Apellidos",
    "Cedula",
    "Fecha",
    "Correo",
    "Github",
  ]);
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("asda");

    setcookies("Nombre", nombre, { path: "/" });
    setcookies("Apelldos", apelldos, { path: "/" });
    setcookies("Cedula", Cedula, { path: "/" });
    setcookies("Fecha", Fecha, { path: "/" });
    setcookies("Correo", Correo, { path: "/" });
    setcookies("Github", Github, { path: "/" });

    const data = {
      id: uuidv4(),
      nombre,
      apelldos,
      Cedula,
      Fecha,
      Correo,
      Github,
    };
    dispatch(RegistroAsincronoData(data));

    reset();
  };

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
          <BiHappyAlt color="#322659" fontSize={40} />
          <Heading color="#6a32e2" fontSize={30}>
            Registra De Datos
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
                      id="inputNombre"
                      placeholder="nombre"
                      name="nombre"
                      value={nombre}
                      onChange={handleInputChange}
                    />
                  </InputGroup>
                </FormControl>
                <FormControl>
                  <InputGroup>
                    <InputLeftElement
                      pointerEvents="none"
                      // children={<CFaUserAlt color="gray.400" />}
                    />
                    <Input
                      id="inputApellido"
                      placeholder="apelldos"
                      name="apelldos"
                      value={apelldos}
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
                      id="inputCedula"
                      placeholder="Cedula"
                      type="number"
                      name="Cedula"
                      value={Cedula}
                      onChange={handleInputChange}
                    />
                  </InputGroup>
                </FormControl>
                <FormControl>
                  <InputGroup>
                    <InputLeftElement
                      pointerEvents="none"
                      // children={<CFaUserAlt color="gray.400" />}
                    />
                    <Input
                      id="inputFecha"
                      placeholder="Fecha de nacimiento dd/mm/aa"
                      name="Fecha"
                      value={Fecha}
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
                      id="inputCorreo"
                      placeholder="Correo Electronico"
                      type="email"
                      required
                      name="Correo"
                      value={Correo}
                      onChange={handleInputChange}
                    />
                  </InputGroup>
                </FormControl>
                <FormControl>
                  <InputGroup>
                    <InputLeftElement
                      pointerEvents="none"
                      children={<AiFillGithub color="gray" fontSize={22} />}
                    />
                    <Input
                      id="inputGithub"
                      placeholder="Usuario de Github"
                      name="Github"
                      required
                      value={Github}
                      onChange={handleInputChange}
                    />
                  </InputGroup>
                </FormControl>
                <Button
                  borderRadius={0}
                  type="submit"
                  bg="#6a32e2"
                  variant="solid"
                  width="full"
                  color="white"
                  _hover={{ bg: "#000000" }}
                  _active={{ bg: "#000000" }}
                >
                  Registrar Datos
                </Button>

                {logged ? null : (
                  <>
                    <Button colorScheme="teal" variant="solid" bg="#322659">
                      <Link to="/LoginAdmin">Login Admin</Link>
                    </Button>
                  </>
                )}
              </Stack>
            </form>
          </Box>
        </Stack>
      </Flex>
    </div>
  );
};

export default RegistroGit;
