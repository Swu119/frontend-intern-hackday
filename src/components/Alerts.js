import React from 'react'
import PropTypes from 'prop-types'
import { Alert, AlertIcon } from '@chakra-ui/react';

function Alerts({berror}){
  return (
    <Alert position={'absolute'} status='error'>
        <AlertIcon />
        {berror}
    </Alert>
  )
}

Alerts.propTypes = {
    berror: PropTypes.string.isRequired,
};

export default Alerts;
