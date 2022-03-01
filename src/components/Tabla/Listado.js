import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useDisclosure,
  FormControl,
  Input,
  InputGroup,
  InputLeftElement,
  Tag,
  TagLabel,
  Box,
  Stack,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useDispatch, useSelector } from "react-redux";
import {
  editarDataAsincrono,
  eliminarDataAsincrono,
  ListarDataAsincronico,
} from "../../store/actions/actionData";
import "./Listado.scss";
import { useFormik } from "formik";
import { Link } from "react-router-dom";
import Fuse from "fuse.js";

const Listado = () => {
  const dispatch = useDispatch();

  //////////////////MODAL/////////////////////////////////////////////////////////
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [datosModal, setDatosModal] = useState([]);
  const { array } = useSelector((store) => store.listar);
  const [search, setSearch] = useState("");
  const [searchOutput, setSearchOutput] = useState([]);

  const dataModal = (id) => {
    const traer = array.find((traer) => traer.id === id);
    setDatosModal(traer);
  };

  /////////////BUSQUEDA CON FUSE/////////////////////////////////////////////////////

  useEffect(() => {
    if (search.length >= 3) {
      const fuse = new Fuse(array, {
        keys: ["nombre", "apelldos", "Github"],
        includeScore: true,
        threshold: 0.2,
      });

      const result = fuse.search(search);
      console.log(result);
      setSearchOutput(result.map((item) => item.item));
    } else {
      setSearchOutput(array);
    }
  }, [array, search]);

  //////////////////////////////////////////////////////////////////

  const formik = useFormik({
    initialValues: {
      nombre: datosModal.nombre || "",
      apelldos: datosModal.apellidos || "",
      Cedula: datosModal.Cedula || "",
      Fecha: datosModal.Fecha || "",
      Correo: datosModal.Correo || "",
      Github: datosModal.Github || "",
    },
    onSubmit: (a) => {
      console.log(datosModal);
      dispatch(editarDataAsincrono(datosModal.id, { id: datosModal.id, ...a }));
    },
  });

  useEffect(() => {}, [datosModal]);

  //////////////////MODAL/////////////////////////////////////////////////////////

  useEffect(() => {
    dispatch(ListarDataAsincronico());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // eslint-disable-next-line no-unused-vars
  const [cookies, setcookies] = useCookies([
    "Nombre",
    "Apellidos",
    "Cedula",
    "Fecha",
    "Correo",
    "Github",
  ]);
  return (
    <div className="Container">
      <Box
        display="flex"
        gap="5"
        flexDirection={{ base: "column", md: "row" }}
        bg="#7b49e6"
        padding="2"
        justifyContent="space-around"
      >
        <Tag>
          <Td>
            <TagLabel>{cookies["Nombre"]}</TagLabel>
          </Td>
        </Tag>
        <Tag>
          <Td>
            <TagLabel>{cookies["Apelldos"]}</TagLabel>
          </Td>
        </Tag>
        <Tag>
          <Td>
            <TagLabel>{cookies["Cedula"]}</TagLabel>
          </Td>
        </Tag>

        <Tag>
          <Td>
            <TagLabel>{cookies["Correo"]}</TagLabel>
          </Td>
        </Tag>

        <Tag>
          <Td>
            <TagLabel>{cookies["Github"]}</TagLabel>
          </Td>
        </Tag>
      </Box>

      <div className="container-Data">
        <Stack
          spacing={3}
          justifyContent="center"
          alignItems="center"
          padding="0.5rem"
        >
          <Input
          bg='purple.300'
            border='solid'
            borderColor='#6a32e2'
            placeholder="Buscar Usuario"
            // style={{
            //   '&::-'
            // }}
            size="md"
            width="500px"
            value={search}
            onChange={(e) => {
              setSearch(e.currentTarget.value);
            }}
          />
        </Stack>
        <Table variant="striped" colorScheme="purple">
          <Thead>
            <Tr maxWidth="100vw">
              <Th>Nombre</Th>
              <Th>Apellidos</Th>
              <Th>Correo</Th>
              <Th>fecha de nacimiento</Th>
              <Th>Cedula</Th>
              <Th>Usuario Github</Th>
            </Tr>
          </Thead>
          <Tbody>
            {searchOutput.map((data, index) => (
              <Tr key={index} maxWidth="100vw">
                <Td>{data.nombre}</Td>
                <Td>{data.apelldos}</Td>
                <Td>{data.Correo}</Td>
                <Td>{data.Fecha}</Td>
                <Td>{data.Cedula}</Td>
                <Td>{data.Github}</Td>

                <td>
                  <Button
                    onClick={() => {
                      dataModal(data.id);
                      onOpen();
                    }}
                  >
                    Editar
                  </Button>

                  <Modal isOpen={isOpen} onClose={onClose}>
                    <ModalOverlay />
                    <ModalContent>
                      <form onSubmit={formik.handleSubmit}>
                        <ModalHeader>Editar Usuario</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>
                          <Stack>
                            <FormControl>
                              <InputGroup>
                                <InputLeftElement
                                  pointerEvents="none"
                                />
                                <Input
                                  id="inputNombre"
                                  placeholder="nombre"
                                  name="nombre"
                                  value={formik.values.nombre}
                                  onChange={formik.handleChange}
                                />
                              </InputGroup>
                            </FormControl>
                            <FormControl>
                              <InputGroup>
                                <InputLeftElement
                                  pointerEvents="none"
                                />
                                <Input
                                  id="inputApellido"
                                  placeholder="apellidos"
                                  name="apelldos"
                                  value={formik.values.apelldos}
                                  onChange={formik.handleChange}
                                />
                              </InputGroup>
                            </FormControl>
                            <FormControl>
                              <InputGroup>
                                <InputLeftElement
                                  pointerEvents="none"
                                  color="gray.300"
                                />
                                <Input
                                  id="inputCedula"
                                  placeholder="Cedula"
                                  type="number"
                                  name="Cedula"
                                  value={formik.values.Cedula}
                                  onChange={formik.handleChange}
                                />
                              </InputGroup>
                            </FormControl>
                            <FormControl>
                              <InputGroup>
                                <InputLeftElement
                                  pointerEvents="none"
                                />
                                <Input
                                  id="inputFecha"
                                  placeholder="Fecha de nacimiento dd/mm/aa"
                                  name="Fecha"
                                  value={formik.values.Fecha}
                                  onChange={formik.handleChange}
                                />
                              </InputGroup>
                            </FormControl>
                            <FormControl>
                              <InputGroup>
                                <InputLeftElement
                                  pointerEvents="none"
                                  color="gray.300"
                                />
                                <Input
                                  id="inputCorreo"
                                  placeholder="Correo Electronico"
                                  type="email"
                                  required
                                  name="Correo"
                                  value={formik.values.Correo}
                                  onChange={formik.handleChange}
                                />
                              </InputGroup>
                            </FormControl>
                            <FormControl>
                              <InputGroup>
                                <InputLeftElement
                                  pointerEvents="none"

                                />
                                <Input
                                  id="inputGithub"
                                  placeholder="Usuario de Github"
                                  name="Github"
                                  required
                                  value={formik.values.Github}
                                  onChange={formik.handleChange}
                                />
                              </InputGroup>
                            </FormControl>
                          </Stack>
                        </ModalBody>

                        <ModalFooter>
                          <Button
                            bg="red.500"
                            color="white"
                            mr={3}
                            onClick={onClose}
                          >
                            Cerrar
                          </Button>
                          <Button
                            bg="purple.600"
                            color="white"
                            _hover={{ bg: "#000000" }}
                            _active={{ bg: "#000000" }}
                            type="submit"
                          >
                            Guardar Cambios
                          </Button>
                        </ModalFooter>
                      </form>
                    </ModalContent>
                  </Modal>
                </td>

                <td>
                  <Button
                    className="btn btn-danger btn-sm "
                    type="button"
                    onClick={() => dispatch(eliminarDataAsincrono(data.id))}
                  >
                    Eliminar
                  </Button>
                </td>
                <td>
                  <Link to={`/Detalles/${data.Github}`}>
                    <Button
                      className="btn btn-danger btn-sm "
                      type="button"
                    >
                      Repositorios
                    </Button>
                  </Link>
                </td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </div>
    </div>
  );
};

export default Listado;
