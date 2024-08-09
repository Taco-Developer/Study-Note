// import { unstable_noStore as noStore } from 'next/cache';

import Messages from '@/components/messages';

import { getMessages } from '@/lib/messages';

/* 
  fech 함수에 config 객체를 사용하지 않고 데이터 캐싱 제어 
    - export const revalidate = 시간
    - export const dynamic = 'force-dynamic' (cache: 'no-store'와 같음)
    - import {unstable_noStore} from 'next/cache' (cache: 'no-store'와 같음)
*/

/* 
  Full Route Cache

  프로덕션으로 빌드하면 모든 페이지를 미리 렌더링함
    - 동적 페이지 제외
  
  Full Route Cache 제어
    - export const dynamic = 'force-dynamic' (cache: 'no-store'와 같음)으로 해당 페이지의 Full Route Cache를 비활성화 가능
    - 캐시 재검증 (revalidatePath)
*/

// export const revalidate = 5;
// export const dynamic = 'force-dynamic';

export default async function MessagesPage() {
  /* 
    Data Cache

    NextJS는 백엔드에서 데이터를 가져오는 fetch 함수를 사용할 때 응답 데이터를 내부적으로 관리되는
    서버 측 캐시에 저장하고 계속 재사용함
      - 사용자가 더 이상 재사용하지 말라고 지시할 때까지 사용 (revalidatePath)

    fetch 함수의 config 객체로 다양한 설정 가능
      - cache: 'force-cache'(기본값, 캐시 후 재사용), 'no-store'(현재 이곳에서 보내는 요청의 데이터를 캐시하지 않음)
      - next: { revalidate: 시간 }(설정한 시간동안 캐시된 데이터 재사용)
  */
  // const response = await fetch('http://localhost:8080/messages', {
  //   headers: {
  //     'X-ID': 'page',
  //   },
  // });

  // const response = await fetch('http://localhost:8080/messages', {
  //   next: {
  //     revalidate: 5,
  //   },
  // });

  // noStore();

  // const response = await fetch('http://localhost:8080/messages', {
  //   next: {
  //     tags: ['msg'],
  //   },
  // });
  // const messages = await response.json();

  const messages = await getMessages();

  if (!messages || messages.length === 0) {
    return <p>No messages found</p>;
  }

  return <Messages messages={messages} />;
}
