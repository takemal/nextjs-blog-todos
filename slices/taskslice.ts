import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TaskType } from '../types/task';
import { RootState } from './store';

// タスクの初期値
export const initialEditingTask: TaskType = {
  id: '',
  title: '',
};

export const editingTaskSlice = createSlice({
  name: 'editingTask',
  initialState: initialEditingTask,
  reducers: {
    // 更新
    updateTaskAction: (state: TaskType, action) => {
      return { ...state, ...action.payload };
    },
    // 初期化
    initialTaskAction: () => {
      return {
        id: '',
        title: '',
      };
    },
  },
});

export const editingTaskReducer = editingTaskSlice.reducer;
export const { initialTaskAction, updateTaskAction } = editingTaskSlice.actions;

// state情報をそのままとる
export const selectTask = (state: RootState) => state.editingTask;
