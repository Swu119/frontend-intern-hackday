import React from 'react'
import PropTypes from 'prop-types'
import { Divider, 
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton, 
  Card,
  Text,
  Button, } from '@chakra-ui/react'

function CommitModal({isOpen, onClose, repoCommits}) {

  return (
    <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Commits - Most Recent First</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <ul style={{ maxHeight: "75vh", overflowY: "scroll" }}>
              {repoCommits?.map((commits, idx) => (
                <Card maxW="100%" h={"m"} key={idx} display={"inline-block"}>
                    <Text>
                        Author: {commits.commit.author.name}<br/>
                        Message: {commits.commit.message}<br/>
                        Verification: {commits.sha}<br/>
                        Date: {commits.commit.author.date}<br/>
                    </Text>
                    <Divider />
                </Card>
              ))}
            </ul>
          </ModalBody>

          <ModalFooter justifyContent={"center"}>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
  )
}

CommitModal.propTypes = {
    isOpen: PropTypes.any.isRequired,
    onClose: PropTypes.any.isRequired,
    repoCommits: PropTypes.array.isRequired,
}

export default CommitModal
