import * as React from 'react';
import Grid from "@mui/material/Grid2"
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

function BudgetItem(props: { budget: string; spending: string; }) {
  return (
    <Grid>
      Budget: {props.budget}
      Actual: {props.spending}
      <TextField />
      <Button>
        Submit
      </Button>
    </Grid>
  );
};

export default BudgetItem;