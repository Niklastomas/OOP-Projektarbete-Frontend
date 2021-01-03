import { Avatar, makeStyles, Menu, MenuItem, Paper } from '@material-ui/core';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { signOut } from '../../../redux/userSlice';
import './UserMenu.css';

function UserMenu({ name }) {
  const [anchor, setAnchor] = useState(null);
  const dispatch = useDispatch();

  const handleClick = (event) => {
    setAnchor(event.currentTarget);
  };

  const handleClose = () => {
    setAnchor(null);
  };

  const handleLogout = () => {
    dispatch(signOut());
    setAnchor(null);
  };
  return (
    <div className='userMenu'>
      <Avatar onClick={handleClick} style={{ backgroundColor: '#E50914' }}>
        {name}
      </Avatar>
      <Paper>
        <Menu
          anchorEl={anchor}
          keepMounted
          open={Boolean(anchor)}
          onClose={handleClose}
        >
          <MenuItem onClick={handleLogout}>Logout</MenuItem>
        </Menu>
      </Paper>
    </div>
  );
}

export default UserMenu;
