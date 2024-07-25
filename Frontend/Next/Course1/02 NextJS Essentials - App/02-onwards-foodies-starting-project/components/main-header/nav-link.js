/*
서버 컴포넌트의 이점을 잃지 않기 위해서
클라이언트 컴포넌트로 동작해야 하는 컴포넌트는
컴포넌트 트리에서 최대한 아래로 내려서 이용
*/
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import classes from './nav-link.module.css';

function NavLink({ href, children }) {
  // usePathname: 현재 활동 경로 반환 <= 클라이언트 컴포넌트에서 동작
  const path = usePathname();

  return (
    <Link
      href={href}
      className={
        path.startsWith(href)
          ? `${classes.link} ${classes.active}`
          : classes.link
      }
    >
      {children}
    </Link>
  );
}

export default NavLink;
