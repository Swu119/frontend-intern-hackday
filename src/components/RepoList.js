import React, { useState } from "react";
import axios from "axios";
import './RepoList.css'
import {
  Card,
  CardBody,
  Image,
  Stack,
  Heading,
  Text,
  Divider,
  CardFooter,
  Badge,
  Center,
  Box,
  Input,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  // Alert,
  // AlertIcon,
} from "@chakra-ui/react";

const RepoList = () => {
  const [repos, setRepos] = useState([]);
  const [search, setSearch] = useState("");
  //const [berror, setBerror] = useState('');
  const { isOpen, onOpen, onClose } = useDisclosure();

  const fetchRepos = async () => {
    try {
      const response = await axios.get(
        "https://api.github.com/orgs/" + search + "/repos"
      );
      setRepos(
        response.data.sort((a, b) =>
          b.stargazers_count > a.stargazers_count ? 1 : -1
        )
      );
    } catch (error) {
      console.log(error);
      //setBerror('Error fetching repositories.');
      // console.log(berror)
      //setTimeout(() => {
      //    setBerror('');
      //}, 2000);
    }
  };

  const openModal = () => {
    onOpen();
  };

  //const alert = () => {
  //    <Alert position={'absolute'} status='error'>
  //        <AlertIcon />
  //        {berror}
  //    </Alert>
  //}
  return (
    <div>
      <Center h="100px" color="white">
        <p style={{ fontSize: "35px", fontWeight: "bold" }}>
          Search For a GitHub Organization!
        </p>
      </Center>
      <Box display={"flex"} alignItems={"center"} justifyContent={"center"}>
        <Input
          variant={"filled"}
          color="white"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          type="text"
          className="form-control"
          id="githubOrgSearch"
          aria-describedby="githubOrgSearch"
          placeholder="Search Here!"
          width="30%"
        />
        <Button colorScheme="blue" onClick={fetchRepos}>
          Search Now!
        </Button>
      </Box>

      <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Modal Title</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text fontWeight="bold" mb="1rem">
              dang it
            </Text>
          </ModalBody>

          <ModalFooter justifyContent={"center"}>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <Text
        paddingLeft={"20px"}
        color={"white"}
        fontSize={"25px"}
        fontWeight={"bold"}
      >
        Found Repositories:
      </Text>
      <ul style={{ maxHeight: "80vh", overflowY: "scroll" }}>
        {repos.map((repo, idx) => (
          <Card maxW="20%" h={"m"} key={idx} display={"inline-block"}>
            <CardBody>
              <Image
                onClick={openModal}
                src={repo.owner.avatar_url}
                borderRadius="lg"
              />
              <Stack h={"120px"} mt="3" spacing="3">
                <Heading h={"50%"} fontSize={"2vw"} size="md">
                  {repo.name} - {repo.language}
                </Heading>
                <Text h={"50%"} overflowY={"scroll"}>
                  {repo.description}
                </Text>
              </Stack>
            </CardBody>
            <Divider />
            <CardFooter justifyContent={"center"} flexWrap={"wrap"}>
              <Stack h={"80%"} alignItems={"center"} direction={"row"}>
                <Badge fontSize={"80%"} colorScheme="green">
                  Stars: {repo.stargazers_count}
                </Badge>
                <Badge fontSize={"80%"} colorScheme="blue">
                  Forks: {repo.forks_count}
                </Badge>
              </Stack>
              <Badge fontSize={"80%"} colorScheme="gray">
                Created: {repo.created_at}
              </Badge>
            </CardFooter>
          </Card>
        ))}
      </ul>
    </div>
  );
};

export default RepoList;
