import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { TaskProps } from '../types';


interface TasksStore {
  tasks: TaskProps[];
  addTask: (task: TaskProps) => void;
  deleteTask: (taskId: string) => void;
  completeTask: (taskId: string) => void;
}

const initialState: TasksStore = {
  tasks: [],
  addTask: (task) => {},
  completeTask: (taskId) => {},
  deleteTask: (taskId) => {},
};

export const useTodoStore = create(
  persist<TasksStore>(
    (set) => ({
      ...initialState,

      addTask: (task) => {
        set((state) => ({
          tasks: [...state.tasks, task],
        }));
      },

      completeTask: (taskId) => {
        set((state) => ({
          tasks: state.tasks.map((task) =>
            task.id === taskId
              ? { ...task, isCompleted: !task.isCompleted }
              : task
          ),
        }));
      },

      deleteTask: (taskId) => {
        set((state) => ({
          tasks: state.tasks.filter((task) => task.id !== taskId),
        }));
      },
    }),
    {
      name: 'tasks-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
