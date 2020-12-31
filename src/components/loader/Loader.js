import { Backdrop, CircularProgress } from '@material-ui/core';
import React from 'react';

function Loader() {
  return (
    <Backdrop open={true} style={{ zIndex: '99' }}>
      <CircularProgress color='secondary' />
    </Backdrop>
  );
}

export default Loader;
