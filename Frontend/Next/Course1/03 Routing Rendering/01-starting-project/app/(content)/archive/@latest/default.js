/* 
  라우트는 서로 독립적으로 동작하는데 @archive 내의 [year] 라우트는 @latest 라우트와 동일한 페이지에서 렌더링되는데
  @latest 라우트에서 중첩된 [year] 라우트를 지원하지 않으면 문제가 발생함
    - 병렬 라우팅을 사용하는 경우엔 동일한 페이지에 표시되는 병렬 라우트는 전부 원하는 경로를 지원해야 함

  @archive에서 [year]를 지원하므로 @latest에서도 [year]를 지원해야 함
    - 만약 다른 병렬 라우트에선 해당 라우트가 필요 없다면 default.js 파일을 추가

  default.js: 표시할 기본 폴백 콘텐츠를 정의
  폴백 콘텐츠(default.js)가 표준 콘텐츠(page.js)와 같다면 page.js 파일을 없애고 default.js만 남겨둘 수 있음
*/

import NewsList from '@/components/news/news-list';

import { getLatestNews } from '@/lib/news';

export default function LatestNewsPage() {
  const latestNews = getLatestNews();

  return (
    <>
      <h2>Latest News</h2>
      <NewsList news={latestNews} />
    </>
  );
}
