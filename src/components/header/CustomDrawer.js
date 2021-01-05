import {
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@material-ui/core';
import React from 'react';
import { Link } from 'react-router-dom';
import HomeIcon from '@material-ui/icons/Home';
import StarIcon from '@material-ui/icons/Star';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import TrendingUpIcon from '@material-ui/icons/TrendingUp';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { useDispatch, useSelector } from 'react-redux';
import { signOut } from '../../redux/userSlice';
import VpnKeyIcon from '@material-ui/icons/VpnKey';

function CustomDrawer({ open, onClose }) {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  return (
    <Drawer anchor='top' open={open} onClose={onClose}>
      <List>
        <Link to='/' style={{ color: 'black' }}>
          <ListItem button>
            <ListItemIcon>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText primary='Home' />
          </ListItem>
        </Link>
        <Link to='/toprated' style={{ color: 'black' }}>
          <ListItem button>
            <ListItemIcon>
              <StarIcon />
            </ListItemIcon>
            <ListItemText primary='Top Rated' />
          </ListItem>
        </Link>
        <Link to='/popular' style={{ color: 'black' }}>
          <ListItem button>
            <ListItemIcon>
              <ThumbUpIcon />
            </ListItemIcon>
            <ListItemText primary='Popular' />
          </ListItem>
        </Link>
        <Link to='/trending' style={{ color: 'black' }}>
          <ListItem button>
            <ListItemIcon>
              <TrendingUpIcon />
            </ListItemIcon>
            <ListItemText primary='Trending' />
          </ListItem>
        </Link>
        <Link to='/upcoming' style={{ color: 'black' }}>
          <ListItem button>
            <ListItemIcon>
              <ArrowUpwardIcon />
            </ListItemIcon>
            <ListItemText primary='Upcoming' />
          </ListItem>
        </Link>
      </List>
      <Divider />
      <List>
        {user ? (
          <ListItem button>
            <ListItemIcon>
              <ExitToAppIcon />
            </ListItemIcon>
            <ListItemText
              primary='Logout'
              onClick={() => dispatch(signOut())}
            />
          </ListItem>
        ) : (
          <Link to='/login' style={{ color: 'black' }}>
            <ListItem button>
              <ListItemIcon>
                <VpnKeyIcon />
              </ListItemIcon>
              <ListItemText primary='Login' />
            </ListItem>
          </Link>
        )}
      </List>
    </Drawer>
  );
}

export default CustomDrawer;
