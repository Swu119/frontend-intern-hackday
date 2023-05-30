import React, { useState } from "react";
import axios from "axios";
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
 // Alert,
 // AlertIcon,
} from "@chakra-ui/react";

const RepoList = () => {
  const [repos, setRepos] = useState([]);
  const [search, setSearch] = useState("");
  //const [berror, setBerror] = useState('');

    const fetchRepos = async () => {
        try {
        const response = await axios.get(
            "https://api.github.com/orgs/"+ search + "/repos"
        );
        setRepos(response.data);
        } catch (error) {
            console.log(error)
            //setBerror('Error fetching repositories.');
           // console.log(berror)
            //setTimeout(() => {
            //    setBerror('');
            //}, 2000);
        }
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
        <Button 
            colorScheme="blue"
            onClick={fetchRepos}
        >
            Search Now!</Button>
      </Box>

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
              <Image src={repo.owner.avatar_url} borderRadius="lg" />
              <Stack mt="6" spacing="3">
                <Heading size="md">
                  {repo.name} - {repo.language}
                </Heading>
                <Text h={"70px"} overflowY={"scroll"}>
                  {repo.description}
                </Text>
              </Stack>
            </CardBody>
            <Divider />
            <CardFooter justifyContent={"center"}>
              <Stack alignItems={"center"} direction={"row"}>
                <Badge fontSize={"80%"} colorScheme="green">
                  Stars: {repo.stargazers_count}
                </Badge>
                <Badge fontSize={"80%"}>Forks: {repo.forks_count}</Badge>
              </Stack>
            </CardFooter>
          </Card>
        ))}
      </ul>
    </div>
  );
};

export default RepoList;
