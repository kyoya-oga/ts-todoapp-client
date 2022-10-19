import React, { createContext, useContext, useState } from 'react';

type TaskStatusContextType = {
  updated: boolean;
  toggle: () => void;
};

export const TaskStatusContext = createContext<TaskStatusContextType | null>(
  null
);

type Props = {
  children: React.ReactNode;
};

export const TaskStatusContextProvider = ({ children }: Props) => {
  const [updated, setUpdated] = useState(false);

  function toggleHandler() {
    setUpdated(!updated);
  }

  return (
    <TaskStatusContext.Provider
      value={{
        updated,
        toggle: toggleHandler,
      }}
    >
      {children}
    </TaskStatusContext.Provider>
  );
};

export const useTaskStatusContext = () => {
  const taskStatusContext = useContext(TaskStatusContext);

  if (!taskStatusContext) {
    throw new Error(
      'useTaskStatusContext must be used within a TaskStatusProvider'
    );
  }

  return taskStatusContext;
};
