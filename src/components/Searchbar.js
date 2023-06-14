import React from 'react'
import PropTypes from 'prop-types'
import { Center,
    Box,
    Input,
    Button, } from '@chakra-ui/react';

function Searchbar({setSearch, search, fetchRepos}){
  return (
    <Box>
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
    </Box>
  )
}

Searchbar.propTypes = {
    setSearch: PropTypes.any.isRequired,
    search: PropTypes.string.isRequired,
    fetchRepos: PropTypes.any.isRequired,
};

export default Searchbar;
