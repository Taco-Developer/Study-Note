/*
  error.js 에러에 대응할 페이지
  클라이언트 측에서 발생하는 에러를 포함한 해당 컴포넌트의 모든 오류를 잡을 수 있도록 보장
    => 클라이언트 컴포넌트로 생성
*/
'use client';

function Error() {
  return (
    <main className="error">
      <h1>An error occurred!</h1>
      <p>Failed to fetch meal data. Please try again.</p>
    </main>
  );
}

export default Error;
