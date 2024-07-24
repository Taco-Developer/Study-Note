/*
  layout.js
    페이지가 렌더링되는 레이아웃

  Next 프로젝트는 최소 하나의 근본 layout.js가 필요
    app 폴더에 layout.js 파일이 하나 있어야 함
      근본 레이아웃은 웹사이트의 일반적인 HTML 뼈대를 잡기 위해 필수
 */

import './globals.css';

/*
  metadata로 export
    페이지 제목, 페이지 설명, 기타 메타데이터를 포함하는 객체
    head 태그에 들어갈 내용 => NextJS에 의해 자동으로 설정됨
*/
export const metadata = {
  title: 'NextJS Course App',
  description: 'Your first NextJS app!',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      {/* children => 현재 활성화된 페이지 내용 */}
      <body>{children}</body>
    </html>
  );
}
