import React, { useState } from "react";
import axios from "axios";
import './RepoList.css'
import {
  Text,
  Box,
  useDisclosure,
} from "@chakra-ui/react";

import CommitModal from "./CommitModal";
import RepoCard from "./RepoCard";
import Alerts from "./Alerts";
import Searchbar from "./Searchbar";

const RepoList = () => {
  const [repos, setRepos] = useState([]);
  const [search, setSearch] = useState("");
  const [repoCommits, setRepoCommits] = useState([])
  const [berror, setBerror] = useState('');

  const { isOpen, onOpen, onClose } = useDisclosure();

  const fetchRepos = async () => {
    try {
      const response = await axios.get(
        `https://api.github.com/orgs/${search}/repos`
      );
      setRepos(
        response.data.sort((a, b) =>
          b.stargazers_count > a.stargazers_count ? 1 : -1
        )
      );
    } catch (error) {
      setBerror('Error fetching repositories.');
      console.log(berror);
      setTimeout(() => {
          setBerror('');
      }, 3000);
    }
  };

  const fetchCommits = async (repo) => {
    try {
      const response = await axios.get(
          `https://api.github.com/repos/${search}/${repo.name}/commits`
      );
      console.log(response.data);
      setRepoCommits(
        response.data.sort((a, b) => 
          b.commit.author.date - a.commit.author.date ? 1 : -1
        )
      );
    } catch (error) {
      console.log(error);
    }
  };

  const openModal = async (repo) => {
    fetchCommits(repo);
    onOpen();
  };
  
  return (
    <Box backgroundColor={'black'}>
      {berror && <Alerts berror={berror} />}

      <Searchbar setSearch={setSearch} search={search} fetchRepos={fetchRepos} />
      <CommitModal isOpen={isOpen} onClose={onClose} repoCommits={repoCommits} />

      <Text
        paddingLeft={"20px"}
        color={"white"}
        fontSize={"25px"}
        fontWeight={"bold"}
      >
        Found Repositories:
      </Text>

      <ul style={{ maxHeight: "75vh", overflowY: "scroll" }}>
        {repos.map((repo, idx) => (
          <RepoCard key={idx} repo={repo} openModal={openModal} />
        ))}
      </ul>

    </Box>
  );
};

export default RepoList;
