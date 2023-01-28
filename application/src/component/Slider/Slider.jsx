import { s } from '.';
import * as React from 'react';

import { useState,useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setMistake } from '../../state/appReducer';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Slider from '@mui/material/Slider';
import MuiInput from '@mui/material/Input';
import VolumeUp from '@mui/icons-material/VolumeUp';

const Input = styled(MuiInput)`
  width: 42px;
`;

export default function InputSlider() {
  const dispatch = useDispatch();
  const [value, setValue] = useState(0);
  
  useEffect(() => {
    if(value>1000){
      dispatch(setMistake(1000));
    } else dispatch(setMistake(value));
    
  },[value]);
 


  const handleSliderChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleInputChange = (event) => {
    setValue(event.target.value === '' ? '' : Number(event.target.value));
  };

  const handleBlur = () => {
    if (value < 0) {
      setValue(0);
    } else if (value > 10) {
      setValue(10);
    }
  };

  return (
    <Box sx={{ width: 250 }}>
      <Typography id="input-slider" gutterBottom>
        Mistakes
      </Typography>
      <Grid container spacing={2} alignItems="center">
        <Grid>
          <VolumeUp />
        </Grid>
        <Grid item xs>
          <Slider
            step ={0.5}
            max={10}
            value={typeof value === 'number' ? value : 0}
            onChange={handleSliderChange}
            aria-labelledby="input-slider"
          />
        </Grid>
        <Grid item>
          <Input
            value={value}
            size="small"
            onChange={handleInputChange}
            onBlur={handleBlur}
            inputProps={{
              step: 0.5,
              min: 0,
              max: 1000,
              type: 'number',
              'aria-labelledby': 'input-slider',
            }}
          />
        </Grid>
      </Grid>
    </Box>
  );
}