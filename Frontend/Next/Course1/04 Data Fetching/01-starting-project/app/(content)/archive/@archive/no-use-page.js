/* 
  [[...filter]]를 사용하는 경우 @archive 폴더의 page를 삭제해야 함
    - [[...filter]]의 page.js가 archive 이후의 모든 세그먼트를 캐치하기 때문에 충돌이 발생함
    - @archive의 page.js와 [[...filter]]의 page.js를 모두 로딩하려고 하기 때문
*/

import { getAvailableNewsYears } from '@/lib/news';
import Link from 'next/link';

export default function ArchivePage() {
  const links = getAvailableNewsYears();

  return (
    <header id="archive-header">
      <nav>
        <ul>
          {links.map((link) => (
            <li key={link}>
              <Link href={`/archive/${link}`}>{link}</Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
