import { Alert, Box, Grid, LinearProgress } from '@mui/material';
import { useMutation, useQuery } from '@tanstack/react-query';
import { format } from 'date-fns';
import React, { FC, ReactElement } from 'react';
import { sendApiRequest } from '../../helpers/sendApiRequest';
import { Status } from '../createTaskForm/enums/Status';
import { IUpdateTask } from '../createTaskForm/interfaces/IUpdateTask';
import Task from '../task/Task';
import TaskCounter from '../TaskCounter/TaskCounter';
import { ITaskApi } from './interfaces/ITaskApi';

const TaskArea: FC = (): ReactElement => {
  const { error, isLoading, data, refetch } = useQuery(['tasks'], async () => {
    return await sendApiRequest<ITaskApi[]>(
      'http://localhost:8000/tasks',
      'GET'
    );
  });

  const updateTaskMutation = useMutation((data: IUpdateTask) =>
    sendApiRequest(`http://localhost:8000/tasks`, 'PUT', data)
  );

  function onStatusChangeHandler(
    e: React.ChangeEvent<HTMLInputElement>,
    id: string
  ) {
    updateTaskMutation.mutate({
      id,
      status: e.target.checked ? Status.inProgress : Status.todo,
    });
  }

  return (
    <Grid item md={8} px={4}>
      <Box mb={8} px={4}>
        <h2>Status Of Your Tasks As On {format(new Date(), 'PPPP')}</h2>
      </Box>
      <Grid container display="flex" justifyContent="center">
        <Grid
          item
          display="flex"
          flexDirection="row"
          justifyContent="space-around"
          alignItems="center"
          md={10}
          xs={12}
          mb={8}
        >
          <TaskCounter />
          <TaskCounter />
          <TaskCounter />
        </Grid>
        <Grid item display="flex" flexDirection="column" xs={10} md={8}>
          <>
            {error && (
              <Alert severity="error">There was an error fetching tasks</Alert>
            )}
            {!error && Array.isArray(data) && data.length === 0 && (
              <Alert severity="warning">There are no tasks to display</Alert>
            )}
            {isLoading ? (
              <LinearProgress />
            ) : (
              Array.isArray(data) &&
              data.length > 0 &&
              data.map((item) => {
                return item.status === Status.todo ||
                  item.status === Status.inProgress ? (
                  <Task
                    key={item.id}
                    id={item.id}
                    title={item.title}
                    date={new Date(item.date)}
                    description={item.description}
                    status={item.status}
                    priority={item.priority}
                    onStatusChange={onStatusChangeHandler}
                  />
                ) : null;
              })
            )}
          </>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default TaskArea;
