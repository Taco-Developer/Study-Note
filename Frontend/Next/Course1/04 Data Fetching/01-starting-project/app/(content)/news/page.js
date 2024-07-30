/* 
  클라이언트 측에서 데이터 가져오기
    - 모든 React App에서 사용 가능
    - NextJS에서 최선은 아님
*/
// 'use client';

// import { useEffect, useState } from 'react';

// import NewsList from '@/components/news/news-list';

// export default function NewsPage() {
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState();
//   const [news, setNews] = useState();

//   useEffect(() => {
//     setIsLoading(true);

//     const getNews = async () => {
//       const response = await fetch('http://localhost:8080/news');

//       if (!response.ok) {
//         setError('Failed to fetch news.');
//         return;
//       }

//       const news = await response.json();
//       setNews(news);
//     };

//     getNews();

//     setIsLoading(false);
//   }, []);

//   if (isLoading) return <p>Loading..</p>;
//   if (error) return <p>{error}</p>;

//   let newsContent;
//   if (news) newsContent = <NewsList news={news} />;

//   return (
//     <>
//       <h1>News Page</h1>
//       {newsContent}
//     </>
//   );
// }

// 서버 측에서 데이터 가져오기
import NewsList from '@/components/news/news-list';
import { getAllNews } from '@/lib/news';

export default async function NewsPage() {
  // backend 서버에서 가져오기
  // const response = await fetch('http://localhost:8080/news');
  // if (!response.ok) throw new Error('Failed to fetch news');
  // const news = await response.json();

  // NextJS에서 가져오기
  // backend 통신 없이 NextJS 서버에서 바로 가져오기 (데이터베이스가 NextJS 서버에 있기에 가능)
  const news = await getAllNews();

  return (
    <>
      <h1>News Page</h1>
      <NewsList news={news} />
    </>
  );
}
