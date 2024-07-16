import React, { Suspense } from 'react';
import {
  Await,
  defer,
  json,
  redirect,
  useRouteLoaderData,
} from 'react-router-dom';

import EventItem from '../components/EventItem';
import EventsList from '../components/EventsList';

function EventDetailPage() {
  // useLoaderData => 가장 가까운 loader를 loader를 검색, 검색하는 최상단 범위는 현재 컴포넌트가 로딩된 라우트 정의
  // => 더 상위 라우트는 검색할 수 없으므로 더 상위 라우트에 있는 loader를 검색하기 위해선 useRouteLoaderData 사용
  // useRouteLoaderData => id에 해당하는 상위 라우트에서 loader 데이터를 찾음, 렌더링된 라우트에서만 찾을 수 있음
  const { event, events } = useRouteLoaderData('event-detail');

  return (
    <>
      <Suspense fallback={<p style={{ textAlign: 'center' }}>Loading...</p>}>
        <Await resolve={event}>
          {(loadedEvent) => <EventItem event={loadedEvent} />}
        </Await>
      </Suspense>
      <Suspense fallback={<p style={{ textAlign: 'center' }}>Loading...</p>}>
        <Await resolve={events}>
          {(loadedEvents) => <EventsList events={loadedEvents} />}
        </Await>
      </Suspense>
    </>
  );
}

export default EventDetailPage;

async function loadEvent(id) {
  const response = await fetch(`http://localhost:8080/events/${id}`);

  if (!response.ok) {
    throw json(
      { message: 'Could not fetch details for selected event.' },
      { status: 500 }
    );
  }

  const resData = await response.json();
  return resData.event;
}

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

export async function loader({ params }) {
  // defer에서 await을 사용함으로써 페이지 이동 전 먼저 응답받을 데이터를 선택할 수 있음
  return defer({
    event: await loadEvent(params.eventId),
    events: loadEvents(),
  });
}

export async function action({ params, request }) {
  const response = await fetch(
    `http://localhost:8080/events/${params.eventId}`,
    {
      method: request.method,
    }
  );

  if (!response.ok)
    throw json({ message: 'Could not delete event.' }, { status: 500 });

  return redirect('/events');
}
