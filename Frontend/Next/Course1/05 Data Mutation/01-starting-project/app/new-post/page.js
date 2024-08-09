import PostForm from '@/components/post-form';

import { createPost } from '@/actions/posts';

export default function NewPostPage() {
  // use client 부분을 다른 컴포넌트로 분리
  return <PostForm action={createPost} />;
}
