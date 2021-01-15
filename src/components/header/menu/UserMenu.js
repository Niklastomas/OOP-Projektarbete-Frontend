import { Avatar, Menu, MenuItem, Paper } from '@material-ui/core';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { signOut } from '../../../redux/userSlice';
import './UserMenu.css';

function UserMenu({ name }) {
  const [anchor, setAnchor] = useState(null);
  const history = useHistory();
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
      <div className='userMenu__icons' onClick={handleClick}>
        <Avatar style={{ backgroundColor: '#E50914' }}>{name}</Avatar>
        <ArrowDropDownIcon fontSize='large' style={{ color: '#E50914' }} />
      </div>
      <Paper>
        <Menu
          anchorEl={anchor}
          keepMounted
          open={Boolean(anchor)}
          onClose={handleClose}
        >
        <MenuItem onClick={() => history.push('/friends')}>
            Friends
          </MenuItem>
          <MenuItem onClick={() => history.push('/favorites')}>
            Favorites
          </MenuItem>
          <MenuItem onClick={handleLogout}>Logout</MenuItem>
        </Menu>
      </Paper>
    </div>
  );
}

export default UserMenu;
