/* 
  (그룹명)으로 라우트 그룹을 나눌 수 있음
    - 그룹을 나누면 다른 페이지, 라우트에 다른 레이아웃 설정 가능
    - (content) 그룹은 헤더가 있고 (marketing) 그룹은 헤더가 없음
*/

import MainHeader from '@/components/header/main-header';

import '../globals.css';

export const metadata = {
  title: 'Next.js Page Routing & Rendering',
  description: 'Learn how to route to different pages.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <div id="page">
          <MainHeader />
          {children}
        </div>
      </body>
    </html>
  );
}
