'use server';

import { redirect } from 'next/navigation';

import { storePost, updatePostLikeStatus } from '@/lib/posts';
import { uploadImage } from '@/lib/cloudinary';
import { revalidatePath } from 'next/cache';

/* 
    Form Action

    form 태그의 action 속성은 원래 데이터를 제출할 URL을 말함 (웹 표준)
    - Form Action을 지원하는 React 버전이나 NextJS에선 함수를 전달할 수 있음

    action 속성에 함수를 전달하는 경우 브라우저의 기본 동작을 막고 제출할 때 함수를 작동시킴npm
  */

/*
    useFormState(useActionState)의 Form Action

    첫 번째 인자로 prevState가 전달됨
      - FormData는 두 번째 인자
  */
export async function createPost(prevState, formData) {
  // use client를 사용하는 경우 인라인으로 use server를 사용할 수 없음
  // 'use server';

  const title = formData.get('title');
  const image = formData.get('image');
  const content = formData.get('content');

  // 서버에서 유효성 검사
  const errors = [];
  if (!title || title.trim().length === 0) errors.push('Title is required.');
  if (!content || content.trim().length === 0)
    errors.push('Content is required.');
  if (!image || image.size === 0) errors.push('Image is required.');

  if (errors.length > 0) return { errors };

  let imageUrl;
  try {
    imageUrl = await uploadImage(image);
  } catch (error) {
    throw new Error(
      'Image upload failed, post was not created. Please try again later.'
    );
  }

  await storePost({
    imageUrl,
    title,
    content,
    userId: 1,
  });

  revalidatePath('/', 'layout');
  redirect('/feed');
}

export async function togglePostLikeStatus(postId) {
  await updatePostLikeStatus(postId, 2);
  // revalidatePath: 캐시된 데이터를 보여주는 것이 아닌 업데이트된 버전을 생성해야 함을 알림
  revalidatePath('/', 'layout'); // 모든 페이지 재검증
}
