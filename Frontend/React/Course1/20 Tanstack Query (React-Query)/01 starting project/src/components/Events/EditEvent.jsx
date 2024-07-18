import {
  Link,
  redirect,
  useNavigate,
  useNavigation,
  useParams,
  useSubmit,
} from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { fetchEvent, queryClient, updateEvent } from '../../util/http.js';

import Modal from '../UI/Modal.jsx';
import EventForm from './EventForm.jsx';
import ErrorBlock from '../UI/ErrorBlock.jsx';

export default function EditEvent() {
  const navigate = useNavigate();
  const { state } = useNavigation();
  const { id } = useParams();
  const submit = useSubmit();

  // useLoaderData로 데이터에 접근하기 보다 useQuery를 사용
  // useQuery가 다시 실행되면 캐시를 사용하고 리액트 쿼리의 다른 이점 유지됨
  const { data, isError, error } = useQuery({
    queryKey: ['events', id],
    queryFn: ({ signal }) => fetchEvent({ signal, id }),
    staleTime: 10000,
  });

  // const { mutate } = useMutation({
  //   mutationFn: updateEvent,
  //   // 낙관적 업데이트 => 화면에 먼저 업데이트된 데이터를 보여준 이후 업데이트를 실패하면 원래 데이터로 롤백
  //   onMutate: async (data) => {
  //     const newEvent = data.event;

  //     // 특정 키의 모든 활성 쿼리 취소 => 해당 쿼리의 응답 데이터와 낙관적으로 업데이트된 쿼리 데이터 충돌 방지
  //     await queryClient.cancelQueries({ queryKey: ['events', id] });

  //     // 롤백을 위한 이전 데이터 저장
  //     const prevEvent = queryClient.getQueryData(['events', id]);

  //     // 저장된 데이터 수정
  //     queryClient.setQueryData(['events', id], newEvent);

  //     // context 반환
  //     return { prevEvent };
  //   },
  //   onError: (error, data, context) => {
  //     // context로 받은 이전 데이터로 수정(업데이트 전으로 롤백)
  //     queryClient.setQueryData(['events', id], context.prevEvent);
  //   },
  //   // 성공, 실패 여부와 상관없이 mutation이 완료되면 실행됨
  //   onSettled: () => {
  //     // 백엔드의 다른 작업으로 백엔드와 프론트엔드 간 데이터가 일치하지 않는 경우 다시 동기화 실행
  //     queryClient.invalidateQueries({ queryKey: ['events', id] });
  //   },
  // });

  function handleSubmit(formData) {
    // mutate({ id, event: formData });
    // navigate('../');
    submit(formData, { method: 'PUT' });
  }

  function handleClose() {
    navigate('../');
  }

  let content;

  if (isError)
    content = (
      <>
        <ErrorBlock
          title="Fail to fetch event"
          message={
            error.info?.message ||
            'Fail to fetch event. Please check your inputs and try again later.'
          }
        />
        <div className="form-actions">
          <Link to="../" className="button">
            Okay
          </Link>
        </div>
      </>
    );

  if (data)
    content = (
      <EventForm inputData={data} onSubmit={handleSubmit}>
        {state === 'submitting' ? (
          <p>Sending data...</p>
        ) : (
          <>
            <Link to="../" className="button-text">
              Cancel
            </Link>
            <button type="submit" className="button">
              Update
            </button>
          </>
        )}
      </EventForm>
    );

  return <Modal onClose={handleClose}>{content}</Modal>;
}

export function loader({ params }) {
  return queryClient.fetchQuery({
    queryKey: ['events', params.id],
    queryFn: ({ signal }) => fetchEvent({ signal, id: params.id }),
  });
}

// 낙관적 업데이트는 불가능
export async function action({ request, params }) {
  const formData = await request.formData();
  const updatedEventData = Object.fromEntries(formData);
  await updateEvent({ id: params.id, event: updatedEventData });
  await queryClient.invalidateQueries({ queryKey: ['events'] });
  return redirect('../');
}
