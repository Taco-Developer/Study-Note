'use client';

import { useOptimistic } from 'react';
import Image from 'next/image';

import { formatDate } from '@/lib/format';
import LikeButton from './like-icon';
import { togglePostLikeStatus } from '@/actions/posts';

function imageLoader(config) {
  // Cloudinary와 같은 이미지 호스트가 이미지 최적화 기능을 제공하는 경우 경로 수정을 통해 최적화된 이미지를 로드 가능
  const [urlStart, urlEnd] = config.src.split('/upload/');
  const transformation = `w_200,q_${config.quality}`;
  return `${urlStart}/upload/${transformation}/${urlEnd}`;
}

function Post({ post, action }) {
  return (
    <article className="post">
      <div className="post-image">
        {/* <img src={post.image} alt={post.title} /> */}
        {/* 
          import한 이미지가 아닌 이미지 객체(width, height를 포함)가 아니므로 
          width와 height를 지정해야함 (정확한 크기를 모르므로 fill 속성 권장)

          외부 사이트에서 이미지를 로드하는 경우 next.config 파일에 해당 사이트 잠금 해제 필요
        */}
        <Image
          /* 
            loader
            NextJS에서 이미지 경로를 결정할 때 실행되는 함수
            src를 결정할 때 설정한 src를 loader 함수를 통해 전달하여 경로를 조작할 수 있음
          */
          loader={imageLoader}
          src={post.image}
          /*
            fill
            로드된 이미지의 정확한 크기를 모르고 별다른 설정이 없는 경우 기본값으로 가능한 모든 공간을 채움
            
            Image를 fill 속성과 함께 사용하는 경우 해당 이미지의 컨테이너 요소를 추가하고 컨테이너의 CSS 스타일 설정을 변경
            Image 컴포넌트는 가장 가까운 부모 컨테이너에 position: absolute로 위치함 (주로 부모 컨테이너는 position: relative)
            Image 컴포넌트는 컨테이너의 너비와 높이를 채우므로 컨테이너에 너비와 높이 설정 필요

            보통 fill 속성을 사용하는 경우 크기를 알 수 없으므로 sizes 속성으로 뷰포트 너비에 따라 하나 이상의 크기를 설정해야 함
              - 현재 사례에선 loader를 통해 width를 설정했으므로 fill 속성 없이 width, height를 수동으로 설정 가능
          */
          // fill
          width={200}
          height={120} // CSS로 이미지 크기를 다시 조정하므로 height 값은 아무 값이나 설정 가능
          /*
            quality
            원래 품질 대신 이미지에 정해진 품질 값에 따라 이미지를 렌더링 (0 ~ 100)
          */
          quality={50}
          alt={post.title}
        />
      </div>
      <div className="post-content">
        <header>
          <div>
            <h2>{post.title}</h2>
            <p>
              Shared by {post.userFirstName} on{' '}
              <time dateTime={post.createdAt}>
                {formatDate(post.createdAt)}
              </time>
            </p>
          </div>
          <div>
            <form
              action={action.bind(null, post.id)}
              className={post.isLiked ? 'liked' : ''}
            >
              <LikeButton />
            </form>
          </div>
        </header>
        <p>{post.content}</p>
      </div>
    </article>
  );
}

export default function Posts({ posts }) {
  const [optimisticPosts, updateOptimisticPosts] = useOptimistic(
    posts,
    (prevPosts, updatedPostId) => {
      const updatedPostIndex = prevPosts.findIndex(
        (post) => post.id === updatedPostId
      );

      if (updatedPostIndex === -1) {
        return prevPosts;
      }

      const updatedPost = { ...prevPosts[updatedPostIndex] };
      updatedPost.likes = updatedPost.likes + (updatedPost.isLiked ? -1 : 1);
      updatedPost.isLiked = !updatedPost.isLiked;
      const newPosts = [...prevPosts];
      newPosts[updatedPostIndex] = updatedPost;
      return newPosts;
    }
  );

  if (!optimisticPosts || optimisticPosts.length === 0) {
    return <p>There are no posts yet. Maybe start sharing some?</p>;
  }

  async function updatePost(postId) {
    updateOptimisticPosts(postId);
    await togglePostLikeStatus(postId);
  }

  return (
    <ul className="posts">
      {optimisticPosts.map((post) => (
        <li key={post.id}>
          <Post post={post} action={updatePost} />
        </li>
      ))}
    </ul>
  );
}
