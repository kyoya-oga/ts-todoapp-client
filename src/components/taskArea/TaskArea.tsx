import { Grid } from '@mui/material';
import React, { FC, ReactElement } from 'react';

const TaskArea: FC = (): ReactElement => {
  return (
    <Grid item md={8} px={4}>
      <h2>Content</h2>
    </Grid>
  );
};

export default TaskArea;
