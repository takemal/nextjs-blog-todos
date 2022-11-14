import Link from 'next/link';
import React from 'react';
import { PostType } from '../types/posts';

type Props = {
  post: PostType;
};

const Post = (props: Props) => {
  const { post } = props;
  return (
    <div>
      <span>{post.id}</span>
      {' : '}
      <Link href={`/posts/${post.id}`}>
        <span className="cursor-pointer text-white border-b border-gray-500 hover:bg-gray-600">{post.title}</span>
      </Link>
    </div>
  );
};

export default Post;
