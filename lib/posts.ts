import fetch from 'node-fetch';
import { PostType } from '../types/posts';

// データ全件取得
export const getAllPostsData = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_RESTAPI_URL}api/list-post/`);
  const posts = (await res.json()) as PostType[];
  const filteredPosts = posts.sort((a, b) => Date.parse(b.created_at) - Date.parse(a.created_at));
  return filteredPosts;
};

// 全idリストを取得
export const getAllPostsIds = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_RESTAPI_URL}api/list-post/`);
  const posts = (await res.json()) as PostType[];
  return posts.map((post) => {
    return { params: { id: String(post.id) } };
  });
};

// idからデータ取得
export const getPostData = async (id: string) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_RESTAPI_URL}api/detail-post/${id}/`);
  const post = (await res.json()) as PostType;
  return post;
};
