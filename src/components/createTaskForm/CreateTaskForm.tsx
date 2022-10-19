import {
  Alert,
  AlertTitle,
  Box,
  Button,
  LinearProgress,
  Stack,
  Typography,
} from '@mui/material';
import { useMutation } from '@tanstack/react-query';
import React, { FC, ReactElement, useEffect, useState } from 'react';
import { useTaskStatusContext } from '../../context/TaskStatusContext';
import { sendApiRequest } from '../../helpers/sendApiRequest';
import { ICreateTask } from '../taskArea/interfaces/ICreateTask';
import { Priority } from './enums/Priority';
import { Status } from './enums/Status';
import TaskDateField from './_taskDateField';
import TaskDescriptionField from './_taskDescriptionField';
import TaskSelectField from './_taskSelectField';
import TaskTitleField from './_taskTitleField';

const CreateTaskForm: FC = (): ReactElement => {
  const [title, setTitle] = useState<string | undefined>(undefined);
  const [description, setDescription] = useState<string | undefined>(undefined);
  const [date, setDate] = useState<Date | null>(new Date());
  const [priority, setPriority] = useState<string>(Priority.normal);
  const [status, setStatus] = useState<string>(Status.todo);
  const [showSuccess, setShowSuccess] = useState<boolean>(false);

  const taskStatusContext = useTaskStatusContext();

  const createTaskMutation = useMutation((data: ICreateTask) =>
    sendApiRequest('http://localhost:8000/tasks', 'POST', data)
  );

  function createTaskHandler() {
    if (!title || !description || !date) {
      return;
    }

    const task: ICreateTask = {
      title,
      description,
      date: date.toString(),
      priority,
      status,
    };

    createTaskMutation.mutate(task);
  }

  useEffect(() => {
    if (createTaskMutation.isSuccess) {
      setShowSuccess(true);
      taskStatusContext.toggle();
    }

    const successTimeout = setTimeout(() => {
      setShowSuccess(false);
    }, 7000);

    return () => {
      clearTimeout(successTimeout);
    };
  }, [createTaskMutation.isSuccess]);

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="flex-start"
      width="100%"
      px={4}
      my={6}
    >
      {showSuccess && (
        <Alert severity="success" sx={{ width: '100%', marginBottom: '16px' }}>
          <AlertTitle>Success</AlertTitle>
          The task has been created successfully
        </Alert>
      )}
      <Typography mb={2} component="h2" variant="h6">
        Create A Task
      </Typography>
      <Stack sx={{ width: '100%' }} spacing={2}>
        <TaskTitleField
          disabled={createTaskMutation.isLoading}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />
        <TaskDescriptionField
          disabled={createTaskMutation.isLoading}
          onChange={(e) => setDescription(e.target.value)}
        />
        <TaskDateField
          disabled={createTaskMutation.isLoading}
          value={date}
          onChange={(date) => setDate(date)}
        />
        <Stack sx={{ width: '100%' }} direction="row" spacing={2}>
          <TaskSelectField
            disabled={createTaskMutation.isLoading}
            label="Status"
            name="status"
            value={status}
            onChange={(e) => setStatus(e.target.value as string)}
            items={[
              {
                value: Status.todo,
                label: Status.todo.toUpperCase(),
              },
              {
                value: Status.inProgress,
                label: Status.inProgress.toUpperCase(),
              },
            ]}
          />
          <TaskSelectField
            disabled={createTaskMutation.isLoading}
            label="Priority"
            name="priority"
            value={priority}
            onChange={(e) => setPriority(e.target.value as string)}
            items={[
              {
                value: Priority.low,
                label: Priority.low,
              },
              {
                value: Priority.normal,
                label: Priority.normal,
              },
              {
                value: Priority.high,
                label: Priority.high,
              },
            ]}
          />
        </Stack>
        {createTaskMutation.isLoading && <LinearProgress />}
        <Button
          onClick={createTaskHandler}
          variant="contained"
          size="large"
          fullWidth
          disabled={
            !title ||
            !description ||
            !date ||
            !status ||
            !priority ||
            createTaskMutation.isLoading
          }
        >
          {createTaskMutation.isLoading ? 'Creating...' : 'Create a Task'}
        </Button>
      </Stack>
    </Box>
  );
};

export default CreateTaskForm;
