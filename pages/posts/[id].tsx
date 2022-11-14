import { GetStaticPaths, GetStaticProps } from 'next';
import loadConfig from 'next/dist/server/config';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { ParsedUrlQuery } from 'querystring';
import React from 'react';
import { Layout } from '../../components/Layout';
import { getAllPostsIds, getPostData } from '../../lib/posts';
import { PostType } from '../../types/posts';

// 1. Paramsの型を定義し、ParsedUrlQueryをextendsする
interface Params extends ParsedUrlQuery {
  id: string;
}

type Props = {
  post: PostType;
};

const Post = (props: Props) => {
  const { post } = props;
  const router = useRouter();
  if (!post || router.isFallback) {
    return <div>Loading...</div>;
  }
  return (
    <Layout title={post.title}>
      <p className="m-4">
        {'ID : '}
        {post.id}
      </p>
      <p className="mb-4 text-xl font-bold">{post.title}</p>
      <p className="mb-12">{post.created_at}</p>
      <p className="px-10">{post.content}</p>
      <Link href="/blog-page">
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
          <span>Back to blog-page</span>
        </div>
      </Link>
    </Layout>
  );
};

export default Post;

// 事前生成するページのパス(URLパラメータ)のリストを返す
export const getStaticPaths: GetStaticPaths<Params> = async () => {
  const paths = await getAllPostsIds();
  return {
    paths, //[{params:{id:〜}},{params:〜},...]
    fallback: true,
  };
};

// SSG URLパラメータ情報をもとにpropsデータ取得
export const getStaticProps: GetStaticProps<Props, Params> = async ({ params }) => {
  const post = await getPostData(params!.id);
  return {
    props: { post },
    revalidate: 3,
  };
};
