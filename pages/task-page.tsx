import { GetStaticProps } from 'next';
import Link from 'next/link';
import React, { useEffect } from 'react';
import useSWR from 'swr';
import { Layout } from '../components/Layout';
import Task from '../components/Task';
import TaskForm from '../components/TaskForm';
import StateContextProvider from '../context/StateContext';
import { getAllTasksData } from '../lib/tasks';
import { TaskType } from '../types/task';

type Props = {
  filteredTasks: TaskType[];
};

const fetcher = async (url: string) => {
  const res = await fetch(url);
  return (await res.json()) as TaskType[];
};
const apiUrl = `${process.env.NEXT_PUBLIC_RESTAPI_URL}api/list-task/`;

const TaskPage = (props: Props) => {
  const { filteredTasks } = props;
  const { data: tasks, error, mutate } = useSWR(apiUrl, fetcher, { fallbackData: filteredTasks });
  const swrFilteredTasks = tasks?.sort((a, b) => Date.parse(b.created_at!) - Date.parse(a.created_at!));

  useEffect(() => {
    mutate();
  }, []);

  return (
    <StateContextProvider>
      <Layout title-="Task page">
        <TaskForm mutate={mutate} />
        <ul>
          {swrFilteredTasks && swrFilteredTasks.map((task) => <Task key={task.id} task={task} mutate={mutate} />)}
        </ul>
        <Link href="/main-page">page</Link>
        <div className="flex cursor-pointer mt-12">
          <svg
            className="w-6 h-6 mr-3"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
          </svg>
          <span>Back to main page</span>
        </div>
      </Layout>
    </StateContextProvider>
  );
};

export default TaskPage;

export const getStaticProps: GetStaticProps<Props> = async () => {
  const filteredTasks = await getAllTasksData();
  return {
    props: { filteredTasks },
    revalidate: 3,
  };
};
