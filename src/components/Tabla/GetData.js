import {
  Avatar,
  Badge,
  Box,
  Button,
  Flex,
  HStack,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Table,
  TableCaption,
  Tag,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useDisclosure,
} from "@chakra-ui/react";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import useSWR from "swr";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

export const GetUser = () => {
  const { user } = useParams();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [modalRepo, setModalRepo] = useState(null);
  const [page, setPage] = useState(1);

  const { data, error } = useSWR(
    `https://api.github.com/users/${user}/repos?per_page=5&page=${page}`,
    fetcher
  );

  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;

  // renderizar datos

  //lenguaje, branch por defecto, url git, nombre y descripción.
  return (
    <Box>
      <Table variant="striped" colorScheme="purple">
        <Thead>
          <Tr maxWidth="100vw">
            <Th>Nombre</Th>
            <Th>Descripcion</Th>
            <Th>Lenguaje Principal</Th>
            <Th>
              <Link to='/Listado'>
              <Button bg='purple.700' width='90px' color='white'>Volver</Button>
              </Link>
            </Th>
          </Tr>
        </Thead>
        <Tbody>
          {data.map((repo) => (
            <Tr key={repo.id} maxWidth="100vw">
              <Td>{repo.name}</Td>
              <Td color={repo.description ? "black" : "GrayText"}>
                {repo.description ? repo.description : "Sin Descripcion"}
              </Td>
              <Td>{repo.language}</Td>
              <Td>
                <Button
                  onClick={() => {
                    setModalRepo(repo.name);
                    onOpen();
                  }}
                >
                  Detalles
                </Button>
              </Td>
            </Tr>
          ))}
        </Tbody>

        <TableCaption>
          <Button
            onClick={() => {
              setPage(page - 1);
            }}
          >
            ◀ Anterior
          </Button>
          <Button
            onClick={() => {
              setPage(page + 1);
            }}
          >
            Siguiente ▶
          </Button>
        </TableCaption>
      </Table>
      <RepoModal
        isOpen={isOpen}
        onClose={onClose}
        modalRepo={modalRepo}
        user={user}
      />
    </Box>
  );
};

function RepoModal({ isOpen, onClose, modalRepo, user }) {
  // const [data, setData] = useState(null);

  const { data: repo, error: errorRepo } = useSWR(
    modalRepo && user
      ? `https://api.github.com/repos/${user}/${modalRepo}`
      : null,
    fetcher
  );

  const { data: languages, error: errorlanguages } = useSWR(
    repo && !errorRepo ? repo.languages_url : null,
    fetcher
  );

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        {errorRepo || errorlanguages ? (
          <>
            <ModalHeader>Error</ModalHeader>
            <ModalBody>
              {errorRepo && errorRepo.message}
              {errorlanguages && errorlanguages.message}
            </ModalBody>
          </>
        ) : isOpen && repo && languages ? (
          <>
            <ModalHeader display="flex" flexDirection="column">
              <Flex justify="space-between" align="center">
                {repo.name}
                <Badge ml="1" fontSize="0.8em" colorScheme="yellow">
                  {repo.default_branch}
                </Badge>
              </Flex>
              <Link to={repo.html_url}>
                <Text
                  fontWeight="normal"
                  fontSize="sm"
                  textDecoration="underline"
                  color="GrayText"
                >
                  Ver en Github
                </Text>
              </Link>
            </ModalHeader>

            <ModalBody display="flex" gap="5" flexDirection="column">
              <HStack>
                {Object.keys(languages).map((language) => (
                  <Tag key={language} variant="subtle" colorScheme="purple">
                    {language}
                  </Tag>
                ))}
              </HStack>

              <Text color={repo.description ? "black" : "GrayText"}>
                {repo.description ? repo.description : "Sin Descripcion"}
              </Text>

              <Flex>
                <Avatar src={repo.owner.avatar_url}></Avatar>
                <Box ml="3">
                  <Text fontWeight="bold">{repo.owner.login}</Text>
                  <Text fontSize="sm">#{repo.owner.id}</Text>
                </Box>
              </Flex>
            </ModalBody>
          </>
        ) : (
          <>
            <ModalHeader>Cargando</ModalHeader>
          </>
        )}
        <ModalFooter>
          <Button onClick={onClose}>Close</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
