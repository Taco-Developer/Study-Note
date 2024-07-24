import Link from 'next/link';

import Header from '@/components/header';

export default function Home() {
  return (
    <main>
      <Header />
      <p>🔥 Let&apos;s get started! 🔥</p>
      <p>
        {/* 

          NextJS는 서버 렌더링, 클라이언트 렌더링 모두 가능
            => URL 입력으로 이동하면 서버에서 렌더링
            => 페이지가 있고 링크로 이동하면 단일 페이지 애플리케이션에 머무르는 것을 허용하고
              클라이언트 측 자바스크립트 크드로 UI 업데이트

        */}
        {/* 
        
          a 태그로 이동하는 경우 백엔드에서 새로운 페이지를 다운 받음
            => 단일 페이지 애플리케이션이 아님 
            
        */}
        {/* <a href="/about">About Us</a> */}

        {/* 단일 페이지 유지를 위해 링크 이동은 <Link> 사용 */}
        <Link href="/about">About US</Link>
      </p>
    </main>
  );
}
