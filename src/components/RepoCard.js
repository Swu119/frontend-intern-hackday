import PropTypes from 'prop-types'
import React from 'react'
import { Card,
CardBody,
Image,
Stack,
Heading,
Text,
Divider,
Badge, 
CardFooter,} from '@chakra-ui/react'

function RepoCard({repo, openModal}){

    return (
        <Card maxW="20%" h={"m"} display={"inline-block"}>
        <CardBody>
          <Image
            onClick={() => openModal(repo)}
            src={repo.owner.avatar_url}
            borderRadius="lg"
          />
          <Stack h={"120px"} mt="3" spacing="3">
            <Heading h={"50%"} fontSize={"1.5vw"} size="md">
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
    )
  
}

RepoCard.propTypes = {
    repo: PropTypes.any.isRequired,
    openModal: PropTypes.any.isRequired,
}

export default RepoCard