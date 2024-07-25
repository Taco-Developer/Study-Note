import MainHeader from '@/components/main-header/main-header';

import './globals.css';

/* 
  NextJS가 metadata로 export 되고 있는 변수나 상수를 찾아 메타데이터 필드를 지정함
    - metadata를 export함으로써 다양항 메타데이터를 추가할 수 있음

  metadata를 layout에 추가한다면 해당 layout이 감싸고 있는 모든 페이지에 자동으로 적용됨
    - 중첩된 layout이나 page에 metadata가 있다면 중첩된 metadata가 우선 적용됨 
*/
export const metadata = {
  title: 'NextLevel Food',
  description: 'Delicious meals, shared by a food-loving community.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <MainHeader />
        {children}
      </body>
    </html>
  );
}
