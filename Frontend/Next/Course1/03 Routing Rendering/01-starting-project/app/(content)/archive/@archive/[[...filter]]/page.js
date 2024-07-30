/* 
  [year]
  특정 연도를 선택하고 해당하는 뉴스만 보여주도록 설정

  @archive 폴더에 동적 라우트 세그먼트([year])를 추가해 선택된 연도를 플레이스홀더이자 URL에 부호화될 값으로 설정해서
  세부 사항을 표시하거나 해당 연도에 속하는 사용 항목 목록을 표시할 수 있음
    - /archive/[year] 컨텐츠가 @archive의 page.js가 표시되는 부분에 추가됨
*/

/*
  [[...filter]] - Catch-All 라우트

  모든 경로 세그먼트를 filter로 받음
    - 경로가 /archive/2024/3인 경우 filter에 [2024, 3]가 들어감
*/

import Link from 'next/link';

import NewsList from '@/components/news/news-list';

import {
  getAvailableNewsMonths,
  getAvailableNewsYears,
  getNewsForYear,
  getNewsForYearAndMonth,
} from '@/lib/news';

export default function FilteredNewsPage({ params }) {
  // const newsYear = params.year;
  // const news = getNewsForYear(newsYear);
  // return <NewsList news={news} />

  const filter = params.filter;

  const selectedYear = filter?.[0];
  const selectedMonth = filter?.[1];

  let news;
  let newsContent = <p>No News found for the selected period.</p>;
  let links = getAvailableNewsYears();

  if (selectedYear && !selectedMonth) {
    news = getNewsForYear(selectedYear);
    links = getAvailableNewsMonths(selectedYear);
  }

  if (selectedYear && selectedMonth) {
    news = getNewsForYearAndMonth(selectedYear, selectedMonth);
    links = [];
  }

  if (news && news.length > 0) newsContent = <NewsList news={news} />;

  // 잘못된 경로 처리
  if (
    (selectedYear && !getAvailableNewsYears().includes(+selectedYear)) ||
    (selectedMonth &&
      !getAvailableNewsMonths(selectedYear).includes(+selectedMonth))
  )
    throw Error('Invalid filter');

  return (
    <>
      <header id="archive-header">
        <nav>
          <ul>
            {links.map((link) => {
              const href = selectedYear
                ? `/archive/${selectedYear}/${link}`
                : `/archive/${link}`;
              return (
                <li key={link}>
                  <Link href={href}>{link}</Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </header>
      {newsContent}
    </>
  );
}
