import { s } from '.';
import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useState,useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setSeed } from '../../state/appReducer';

export default function SeedForm() {
  const [name, setName] =useState(0);
  const dispatch = useDispatch();
  const handleChange = (event) => {
    setName(event.target.value);
  };
  const handleClick = () => {
    dispatch(setSeed(name));
  };
 

  return (
    <>
    <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >
      <TextField
        id="outlined-name"
        label="Seed"
        value={name}
        onChange={handleChange} />
    </Box>
    <Button  onClick={handleClick} variant="outlined">Random</Button></>
  );
}
