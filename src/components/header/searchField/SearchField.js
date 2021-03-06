import React, { useState } from 'react';
import './SearchField.css';
import { FormControl, Input, InputLabel, makeStyles } from '@material-ui/core';
import { useHistory } from 'react-router-dom';

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

function SearchField() {
  const classes = useStyles();
  const [searchText, setSearchText] = useState('');
  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    history.push(`/search/${searchText}`);
  };

  return (
    <form onSubmit={handleSubmit} className='search'>
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

export default SearchField;
