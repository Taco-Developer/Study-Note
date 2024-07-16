import { Suspense } from 'react';
import { Await, defer, json, useLoaderData } from 'react-router-dom';

import EventsList from '../components/EventsList';

function EventsPage() {
  // 가장 가까운 loader 데이터 접근
  // loader가 사용된 같은 수준이나 더 하위 수준에서 접근 가능
  // 상위 수준에선 접근할 수 없음
  // const events = useLoaderData();
  const data = useLoaderData();

  // if (data.isError) {
  //   return <p>{data.message}</p>;
  // }

  const events = data.events;

  return (
    // Suspense로 지연되는 화면 대신 표시할 화면 설정
    <Suspense fallback={<p style={{ textAlign: 'center' }}>Loading...</p>}>
      {/* Await => resolve에 전달된 Promise 작업이 끝난 경우 화면 띄움 */}
      <Await resolve={events}>
        {(loadedEvents) => <EventsList events={loadedEvents} />}
      </Await>
    </Suspense>
  );
}

export default EventsPage;

async function loadEvents() {
  const response = await fetch('http://localhost:8080/events');
  if (!response.ok) {
    // 오류 처리
    // 방법1 => 객체 반환
    // return { isError: true, message: 'Could not fetch events.' };

    // 방법2 => Response 생성 (status 활용)
    // throw new Response(JSON.stringify({ message: 'Could not fetch events.' }), {
    //   status: 500,
    // });

    // 방법3 => json 메서드 활용
    return json({ message: 'Could not fetch events.' }, { status: 500 });
  } else {
    // const resData = await response.json();
    // return resData.events;

    // loader에서 바로 전달된 경우 Promise로 전달하더라도 작동하지만 defer로 작동되는 경우 풀어서 반환
    // return response;
    const resData = await response.json();
    return resData.events;
  }
}

export async function loader() {
  // defer를 사용하면 먼저 컴포넌트를 가져온 후 데이터를 불러올 수 있음
  // key: Promise를 구분할 이름, value: Promise
  return defer({
    events: loadEvents(),
  });
}
