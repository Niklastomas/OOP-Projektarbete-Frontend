import React, { useState } from 'react';
import './Header.css';

import TheatersIcon from '@material-ui/icons/Theaters';

import { Link, NavLink } from 'react-router-dom';
import MenuButton from './MenuButton';
import CustomDrawer from './CustomDrawer';
import { useSelector } from 'react-redux';
import UserMenu from './menu/UserMenu';
import SearchField from './searchField/SearchField';

function Header() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { user } = useSelector((state) => state.user);

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  const handleSearch = (searchText) => {
    console.log(searchText);
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
        <NavLink activeClassName='is-active' to='/toprated'>
          Top Rated
        </NavLink>
        <NavLink activeClassName='is-active' to='/popular'>
          Popular
        </NavLink>
        <NavLink activeClassName='is-active' to='/trending'>
          Trending
        </NavLink>
        <NavLink activeClassName='is-active' to='/upcoming'>
          Upcoming
        </NavLink>
      </div>

      <div className='header__right'>
        <div className='header__menu'>
          <MenuButton onClick={toggleDrawer} />
          <CustomDrawer open={drawerOpen} onClose={toggleDrawer} />
        </div>

        {user ? (
          <>
            <SearchField handleSearch={handleSearch} />
            <div className='header__avatar'>
              <UserMenu name={user.username.substring(0, 1)} />
            </div>
          </>
        ) : (
          <NavLink activeClassName='is-active' to='/login'>
            Login
          </NavLink>
        )}
      </div>
    </div>
  );
}

export default Header;
