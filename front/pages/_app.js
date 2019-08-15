import React from 'react';
import PropTypes from 'prop-types'

import AppLayout from '../components/AppLayout';

const Main = ({Component}) => {
  return(
    <>
      <AppLayout>
        <Component/>
      </AppLayout>
    </>
  )
}

Main.propTypes = {
  Component:PropTypes.elementType.isRequired
}

export default Main
