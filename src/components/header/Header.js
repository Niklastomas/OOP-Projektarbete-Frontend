import React from 'react';
import './Header.css';

import TheatersIcon from '@material-ui/icons/Theaters';
import { Avatar } from '@material-ui/core';

function Header() {
  return (
    <div className='header'>
      <div className='header__left'>
        <TheatersIcon style={{ color: '#E50914', fontSize: 36 }} />
        <h1>Movies</h1>
      </div>
      <div className='header__right'>
        <Avatar style={{ backgroundColor: '#E50914' }}>N</Avatar>
      </div>
    </div>
  );
}

export default Header;
