import Link from 'next/link';
import Image from 'next/image';

// NextJS에서 import하는 이미지는 경로가 아닌 이미지 객체 (src, width, height 등 포함)
import logo from '@/assets/logo.png';

export default function Header() {
  return (
    <header id="main-header">
      <Link href="/">
        {/* img 태그를 사용하는 경우 src 속성으로 import한 이미지 객체의 src 속성에 저장된 값을 사용 */}
        {/* <img src={logo.src} alt="Mobile phone with posts feed on it" /> */}
        {/* Image의 경우 src에 이미지 객체를 그대로 전달해야 함 */}
        <Image
          src={logo}
          /* 
            width, height
            수동으로 크기를 조절할 수 없음 (width, height로 크기를 조절하는 것은 권장하는 방법이 아님)
            뷰포트 너비에 따라 크기를 조정할 필요가 없는 경우 사용
          */
          width={100}
          height={100}
          /* 
            sizes
            크기를 조절하고 싶은 경우 sizes 활용 - 뷰포트 너비에 따라 NextJS에서 이미지 크기를 재조정해서 렌더링
          */
          // sizes="10vw"

          /* 
            priority
            NextJS는 기본적으로 이미지 요소에 loading 속성을 lazy로 설정
            항상 화면에 표시되는 이미지는 lazy 여부를 확인하는 절차가 불필요함으로 priority 속성으로 항상 표시됨을 알림
          */
          priority
          alt="Mobile phone with posts feed on it"
        />
      </Link>
      <nav>
        <ul>
          <li>
            <Link href="/feed">Feed</Link>
          </li>
          <li>
            <Link className="cta-link" href="/new-post">
              New Post
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
