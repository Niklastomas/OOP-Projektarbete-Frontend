import React, { useState } from 'react';
import { FormControl, Input, InputLabel, makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
  root: {
    '& label.Mui-focused': {
      color: '#e50914',
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: '#e50914',
    },
    '& .MuiInput-input': {
      color: 'white',
    },
    '& .MuiInput-formControl': {
      color: 'white',
    },
    '& label': {
      color: 'white',
    },
    '& .MuiInput-underline:before': {
      borderBottomColor: 'white',
    },
  },
});

function UserSearchField({onSubmit}) {
  const classes = useStyles();
  const [searchText, setSearchText] = useState('');



  return (
    <form onSubmit={() => onSubmit(searchText)} className='search'>
      <FormControl classes={classes}>
        <InputLabel htmlFor='search'>Search</InputLabel>
        <Input
          required
          id='search'
          type='text'
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
      </FormControl>
    </form>
  );
}

export default UserSearchField;
