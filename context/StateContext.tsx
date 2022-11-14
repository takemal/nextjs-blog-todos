import { createContext, useState } from 'react';
import { TaskType } from '../types/task';

type Props = {
  children: React.ReactNode;
};

type ContextType = {
  selectedTask: TaskType;
  setSelectedTask: (selectedTask: TaskType) => void;
};

const initialState = { id: '0', title: '' };

export const StateContext = createContext<ContextType>({
  selectedTask: initialState,
  setSelectedTask: (selectedTask) => {},
});

export default function StateContextProvider(props: Props) {
  const { children } = props;
  const [selectedTask, setSelectedTask] = useState(initialState);

  return (
    <StateContext.Provider
      value={{
        selectedTask,
        setSelectedTask,
      }}
    >
      {props.children}
    </StateContext.Provider>
  );
}
