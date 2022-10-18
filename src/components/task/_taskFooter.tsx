import { Box, Button, FormControlLabel, Switch } from '@mui/material';
import PropTypes from 'prop-types';
import React, { FC, ReactElement } from 'react';
import { Status } from '../createTaskForm/enums/Status';
import { ITaskFooter } from './interfaces/ITaskFooter';

const TaskFooter: FC<ITaskFooter> = (props): ReactElement => {
  const {
    id,
    status,
    onClick = (e) => console.log(e),
    onStatusChange = (e) => console.log(e),
  } = props;
  return (
    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      mt={4}
    >
      <FormControlLabel
        label="In Progress"
        control={
          <Switch
            onChange={(e) => onStatusChange(e, id)}
            color="warning"
            defaultChecked={status === Status.inProgress}
          />
        }
      />
      <Button
        variant="contained"
        color="success"
        size="small"
        sx={{ color: '#fff' }}
        onClick={(e) => onClick(e, id)}
      >
        Mark Complete
      </Button>
    </Box>
  );
};

export default TaskFooter;

TaskFooter.propTypes = {
  onClick: PropTypes.func,
  onStatusChange: PropTypes.func,
  id: PropTypes.string.isRequired,
  status: PropTypes.string,
};
