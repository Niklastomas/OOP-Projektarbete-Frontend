import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@material-ui/core';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import HomeIcon from '@material-ui/icons/Home';
import StarIcon from '@material-ui/icons/Star';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import TrendingUpIcon from '@material-ui/icons/TrendingUp';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';

function CustomDrawer({ open, onClose }) {
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
    </Drawer>
  );
}

export default CustomDrawer;
