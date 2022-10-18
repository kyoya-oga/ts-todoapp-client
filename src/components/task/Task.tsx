import { Box } from '@mui/material';
import PropTypes from 'prop-types';
import React, { FC, ReactElement } from 'react';
import { Priority } from '../createTaskForm/enums/Priority';
import { Status } from '../createTaskForm/enums/Status';
import { renderPriorityBorderColor } from './helpers/renderPriorityBorderColor';
import { ITask } from './interfaces/ITask';
import TaskDescription from './_taskDescription';
import TaskFooter from './_taskFooter';
import TaskHeader from './_taskHeader';

const Task: FC<ITask> = (props): ReactElement => {
  const {
    title = 'Task Title',
    date = new Date(),
    description = 'lorem ipsum dolor sit amet',
    priority = Priority.normal,
    status = Status.completed,
    onStatusChange = (e) => console.log(e),
    onClick = (e) => console.log(e),
    id,
  } = props;
  return (
    <Box
      mb={4}
      p={2}
      sx={{
        backgroundColor: 'background.paper',
        borderRadius: '8px',
        border: '1px solid',
        borderColor: renderPriorityBorderColor(priority),
      }}
    >
      <TaskHeader title={title} date={date} />
      <TaskDescription description={description} />
      <TaskFooter
        id={id}
        status={status}
        onClick={onClick}
        onStatusChange={onStatusChange}
      />
    </Box>
  );
};

export default Task;

Task.propTypes = {
  title: PropTypes.string,
  date: PropTypes.instanceOf(Date),
  description: PropTypes.string,
  priority: PropTypes.oneOf(Object.keys(Priority)),
  status: PropTypes.oneOf(Object.keys(Status)),
  onClick: PropTypes.func,
  onStatusChange: PropTypes.func,
};
