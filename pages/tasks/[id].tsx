import { GetStaticPaths, GetStaticProps } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { ParsedUrlQuery } from 'querystring';
import React, { useEffect } from 'react';
import useSWR from 'swr';
import { Layout } from '../../components/Layout';
import { getAllTaskIds, getTaskData } from '../../lib/tasks';
import { TaskType } from '../../types/task';

type Props = {
  fetchTask: TaskType;
};

interface Params extends ParsedUrlQuery {
  id: string;
}

const fetcher = async (url: string) => {
  const res = await fetch(url);
  return (await res.json()) as TaskType;
};

const Task = (props: Props) => {
  const { fetchTask } = props;
  const router = useRouter();
  const apiUrl = `${process.env.NEXT_PUBLIC_RESTAPI_URL}api/list-task/${fetchTask?.id}`;
  const { data: task, error, mutate } = useSWR(apiUrl, fetcher, { fallbackData: fetchTask });

  useEffect(() => {
    mutate();
  }, []);

  if (!task || router.isFallback) {
    return <div>Loading...</div>;
  }

  return (
    <Layout title={task.title}>
      <span className="mb-4">
        {'ID : '}
        {task.id}
      </span>
      <p className="mb-4 text-xl font-bold">{task.title}</p>
      <p className="mb-12">{task.created_at}</p>
      <Link href="/task-page">
        <div className="flex cursor-pointer mt-8">
          <svg
            className="w-6 h-6 mr-3"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
          </svg>
          <span>Back to task-page</span>
        </div>
      </Link>
    </Layout>
  );
};

export default Task;

// 事前生成するページのパス(URLパラメータ)のリストを返す
export const getStaticPaths: GetStaticPaths<Params> = async () => {
  const paths = await getAllTaskIds();
  return {
    paths, //[{params:{id:〜}},{params:〜},...]
    fallback: true,
  };
};

// SSG URLパラメータ情報をもとにpropsデータ取得
export const getStaticProps: GetStaticProps<Props, Params> = async ({ params }) => {
  const fetchTask = await getTaskData(params!.id);
  return {
    props: { fetchTask },
    revalidate: 3,
  };
};
