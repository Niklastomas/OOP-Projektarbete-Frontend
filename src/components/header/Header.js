import React, { useState } from 'react';
import './Header.css';

import TheatersIcon from '@material-ui/icons/Theaters';
import { Avatar } from '@material-ui/core';

import { Link } from 'react-router-dom';
import MenuButton from './MenuButton';
import CustomDrawer from './CustomDrawer';

function Header() {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };
  return (
    <div className='header'>
      <Link to='/'>
        <div className='header__left'>
          <TheatersIcon style={{ color: '#E50914', fontSize: 36 }} />
          <h1>Movies</h1>
        </div>
      </Link>
      <div className='header__center'>
        <Link to='/toprated'>Top Rated</Link>
        <Link to='/popular'>Popular</Link>
        <Link to='/trending'>Trending</Link>
        <Link to='/upcoming'>Upcoming</Link>
      </div>

      <div className='header__right'>
        <div className='header__menu'>
          <MenuButton onClick={toggleDrawer} />
          <CustomDrawer open={drawerOpen} onClose={toggleDrawer} />
        </div>
        <Avatar style={{ backgroundColor: '#E50914' }}>N</Avatar>
      </div>
    </div>
  );
}

export default Header;
