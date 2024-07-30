/* 
  Intercepting Route
  인터셉팅 라우트는 대체 라우트로 페이지 내부 링크를 통한 탐색 여부에 따라 활성화됨
    - 내부 내비게이션 요청을 가로챔
    - 새로 고침이나 외부에서 들어올 땐 다른 페이지가 표시됨

  ()가로챌 세그먼트로 인터셉트 설정 가능
    - URL 경로를 기준
    - (.) 같은 경로
    - (..) 이전 경로(한 수준 위)

  병렬 라우트와 결합할 때 유용함
    - 인터셉트가 된 경우 모달로 보여주고 새로 고침이나 링크를 직접 입력해 들어오면 전체 화면을 보여주는 경우
*/

import { notFound } from 'next/navigation';

import ModalBackdrop from '@/components/modal/modal-backdrop';

import { getNewsItem } from '@/lib/news';

export default async function InterceptedImagePage({ params }) {
  const newsSlug = params.newsSlug;
  const newsItem = await getNewsItem(newsSlug);
  if (!newsItem) notFound();

  return (
    <>
      <ModalBackdrop />
      <dialog className="modal" open>
        <div className="fullscreen-image">
          <img src={`/images/news/${newsItem.image}`} alt={newsItem.title} />
        </div>
      </dialog>
    </>
  );
}
