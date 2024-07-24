/*
  폴더명을 대괄호([])로 감싸서 동적 라우팅 가능
    => NextJS에서 params prop에 동적 라우트 객체를 전달함

  대괄호 안에 입력한 key로 params에서 값을 찾을 수 있음
*/

function BlogPostPage({ params }) {
  return (
    <main>
      <h1>Blog Post</h1>
      <p>{params.slug}</p>
    </main>
  );
}

export default BlogPostPage;
