import Link from 'next/link';
import Image from 'next/image';

import MainHeaderBackground from './main-header-background';
import NavLink from './nav-link';

/* 
  import된 이미지 경로는 src 속성에 저장됨
    기본 img 태그에서 사용시 logoImg.src
    Image 태그에서 사용하는 경우엔 그대로 사용 
      객체 전체엔 최적화된 방법으로 Image 컴포넌트를 띄울 수 있는 정보가 포함됨
*/
import logoImg from '@/assets/logo.png';
import classes from './main-header.module.css';

function MainHeader() {
  return (
    <>
      <MainHeaderBackground />
      <header className={classes.header}>
        <Link href="/" className={classes.logo}>
          {/* 항상 보이는 요소이기 때문에 지연 로딩이 필요 없음 => priority 설정 */}
          <Image src={logoImg} alt="A flate with food on it" priority />
          NextLevel Food
        </Link>

        <nav className={classes.nav}>
          <ul>
            <li>
              <NavLink href="/meals">Browse Meals</NavLink>
            </li>
            <li>
              <NavLink href="/community">Foodies Community</NavLink>
            </li>
          </ul>
        </nav>
      </header>
    </>
  );
}

export default MainHeader;
