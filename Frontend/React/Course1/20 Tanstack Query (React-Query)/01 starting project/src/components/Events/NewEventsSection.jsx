import { useQuery } from '@tanstack/react-query';
import { fetchEvents } from '../../util/http.js';

import LoadingIndicator from '../UI/LoadingIndicator.jsx';
import ErrorBlock from '../UI/ErrorBlock.jsx';
import EventItem from './EventItem.jsx';

export default function NewEventsSection() {
  // useQuery => 데이터를 가져올 때 사용(GET)
  // POST 요청에도 사용할 수 있지만 useMutation 사용이 더 좋음
  const { data, isPending, isError, error } = useQuery({
    queryKey: ['events', { max: 3 }],
    queryFn: ({ signal, queryKey }) => fetchEvents({ signal, ...queryKey[1] }),
    staleTime: 5000, // 데이터가 캐시된 시간이 staleTime 미만인 경우 해당 데이터 사용
    // gcTime: 1000,   // 데이터와 캐시를 얼마나 오래 보관할지 제어
  });

  let content;

  if (isPending) {
    content = <LoadingIndicator />;
  }

  if (isError) {
    content = (
      <ErrorBlock
        title="An error occurred"
        message={error.info?.message || 'Failed to fetch events'}
      />
    );
  }

  if (data) {
    content = (
      <ul className="events-list">
        {data.map((event) => (
          <li key={event.id}>
            <EventItem event={event} />
          </li>
        ))}
      </ul>
    );
  }

  return (
    <section className="content-section" id="new-events-section">
      <header>
        <h2>Recently added events</h2>
      </header>
      {content}
    </section>
  );
}
