import { Avatar, Box, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import React, { FC, ReactElement } from 'react';
import { Status } from '../createTaskForm/enums/Status';
import { emitCorrectBorderColor } from './helpers/emitCorrectBorderColor';
import { emitCorrectLabel } from './helpers/emitCorrectLabel';
import { ITaskCounter } from './interfaces/ITaskCounter';

const TaskCounter: FC<ITaskCounter> = (props): ReactElement => {
  const { count = 0, status = Status.todo } = props;
  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
    >
      <Avatar
        sx={{
          backgroundColor: 'transparent',
          border: '5px solid',
          width: '96px',
          height: '96px',
          marginBottom: '16px',
          borderColor: emitCorrectBorderColor(status),
        }}
      >
        <Typography color="#fff" variant="h4">
          {count}
        </Typography>
      </Avatar>
      <Typography color="#fff" fontWeight="bold" fontSize="20px" variant="h5">
        {emitCorrectLabel(status)}
      </Typography>
    </Box>
  );
};

export default TaskCounter;

TaskCounter.propTypes = {
  count: PropTypes.number,
  status: PropTypes.oneOf(Object.values(Status)),
};