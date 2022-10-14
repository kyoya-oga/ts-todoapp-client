import { Box, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import React, { FC, ReactElement } from 'react';
import { ITaskDescription } from './interfaces/ITaskDescription';

const TaskDescription: FC<ITaskDescription> = (props): ReactElement => {
  const {
    description = 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore perferendis nihil doloremque.',
  } = props;
  return (
    <Box>
      <Typography>{description}</Typography>
    </Box>
  );
};

export default TaskDescription;

TaskDescription.propTypes = {
  description: PropTypes.string,
};
