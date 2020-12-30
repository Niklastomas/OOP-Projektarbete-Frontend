import { IconButton } from '@material-ui/core';
import React from 'react';
import MenuIcon from '@material-ui/icons/Menu';

function MenuButton({ onClick }) {
  const handleClick = () => {
    onClick();
  };
  return (
    <IconButton
      onClick={handleClick}
      edge='start'
      color='inherit'
      aria-label='menu'
    >
      <MenuIcon fontSize='large' style={{ color: 'white' }} />
    </IconButton>
  );
}

export default MenuButton;
