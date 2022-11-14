import fetch from 'node-fetch';
import { TaskType } from '../types/task';

// データ全件取得
export const getAllTasksData = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_RESTAPI_URL}api/list-task/`);
  const tasks = (await res.json()) as TaskType[];
  const filteredTasks = tasks.sort((a, b) => Date.parse(b.created_at!) - Date.parse(a.created_at!));
  return filteredTasks;
};

// 全idリストを取得
export const getAllTaskIds = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_RESTAPI_URL}api/list-task/`);
  const tasks = (await res.json()) as TaskType[];
  return tasks.map((task) => {
    return { params: { id: String(task.id) } };
  });
};

// idからデータ取得
export const getTaskData = async (id: string) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_RESTAPI_URL}api/detail-task/${id}/`);
  const task = (await res.json()) as TaskType;
  return task;
};
