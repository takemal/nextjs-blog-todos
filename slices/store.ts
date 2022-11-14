import { configureStore } from '@reduxjs/toolkit';
import { editingTaskReducer } from './taskslice';

export const store = configureStore({
  reducer: {
    editingTask: editingTaskReducer,
  },
});

// Stateの型定義
export type RootState = {
  editingTask: ReturnType<typeof editingTaskReducer>;
};

// dispatch設定
export type AppDispatch = typeof store.dispatch;
