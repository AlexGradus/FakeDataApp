import { s } from '.';
import * as React from 'react';
import Box from '@mui/material/Box';
import { useState,useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setLang } from '../../state/appReducer';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function CountryButtonGroup() {
  const [country, setCountry] = useState('en_CA');
  const dispatch = useDispatch();
 
  useEffect(() => {
    dispatch(setLang(country));
  },[country]);
  const handleChange = (event) => {
    setCountry(event.target.value);
  };

  return (
    <Box className={s.container} sx={{ maxWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel>Country</InputLabel>
        <Select
          value={country}
          label="Country"
          onChange={handleChange}
        >
          <MenuItem value={'en_CA'}>Canada</MenuItem>
          <MenuItem value={'en_GB'}>Great Britain</MenuItem>
          <MenuItem value={'pl'}>Pl</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}