/*
  병렬 라우팅 - 라우트 두 개의 콘텐츠를 동일한 페이지에서 렌더링하는 기능

  병렬 라우팅을 설정하려면 병렬 라우트를 포함하려는 경로에 layout 파일이 필요
  병렬 라우트마다 하위 폴더 하나를 추가해야 함
    - 폴더는 @기호로 시작

  layout 파일에서 작업할 때 병렬 라우트 폴더(@ 기호로 시작하는 폴더)가 옆에 있는 경우 children 뿐만 아니라
  병렬 라우트마다 프로퍼티를 받음
    - 프로퍼티 이름은 @ 뒤에 작성한 이름
*/

export default function ArchiveLayout({ archive, latest }) {
  return (
    <div>
      <h1>News Archive</h1>
      <section id="archive-filter">{archive}</section>
      <section id="archive-latest">{latest}</section>
    </div>
  );
}
