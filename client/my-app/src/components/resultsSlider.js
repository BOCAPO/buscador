import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Slider from '@mui/material/Slider';
import MuiInput from '@mui/material/Input';

const Input = styled(MuiInput)`
  width: 42px;
`;

export default function InputSlider(props) {
  //const [value, setValue] = React.useState();

  const handleSliderChange = (event, newValue) => {
    props.setResultCount(newValue);
  };

  const handleInputChange = (event) => {
    props.setResultCount(event.target.value === '' ? '' : Number(event.target.value));
  };

  const handleBlur = () => {
    if (props.resultCount < 1) {
        props.setResultCount(1);
    } else if (props.resultCount > 10000) {
        props.setResultCount(10000);
    }
  };

  return (
    <Box sx={{ width: 205 }}>
      <Typography id="input-slider" gutterBottom>
        Resultados
      </Typography>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs>
          <Slider
            value={typeof props.resultCount === 'number' ? props.resultCount : 0}
            onChange={handleSliderChange}
            aria-labelledby="input-slider"
          />
        </Grid>
        <Grid item>
          <Input
            value={props.resultCount}
            size="small"
            onChange={handleInputChange}
            onBlur={handleBlur}
            inputProps={{
              step: 10,
              min: 0,
              max: 10000,
              type: 'number',
              'aria-labelledby': 'input-slider',
            }}
          />
        </Grid>
      </Grid>
    </Box>
  );
}
