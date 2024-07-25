import { Suspense } from 'react';
import Link from 'next/link';

import MealsGrid from '@/components/meals/meals-grid';

import classes from './page.module.css';
import { getMeals } from '@/lib/meals';

export const metadata = {
  title: 'All Meals',
  description: 'Browse the delicious meals shared by out vibrant community.',
};

// NextJS에선 컴포넌트 함수에 async 사용 가능
async function Meals() {
  // 처음 페이지로 들어올 때 await으로 화면 렌더에 시간이 걸리지만 이후엔 캐싱으로 인해 빠르게 화면이 보임
  const meals = await getMeals();

  return <MealsGrid meals={meals} />;
}

function MealsPage() {
  return (
    <>
      <header className={classes.header}>
        <h1>
          Delicious meals, created{' '}
          <span className={classes.highlight}>by you</span>
        </h1>
        <p>
          Choose your favorite recipe and cook it yourself. It is easy and fun!
        </p>
        <p className={classes.cta}>
          <Link href="/meals/share">Share Your Favorite Recipe</Link>
        </p>
      </header>
      <main className={classes.main}>
        {/* 페이지가 아닌 일부분 로딩만 필요한 경우 <Suspense> 활용 */}
        <Suspense
          fallback={<p className={classes.loading}>Fetching meals...</p>}
        >
          <Meals />
        </Suspense>
      </main>
    </>
  );
}

export default MealsPage;
