import Image from 'next/image';

import classes from './page.module.css';
import { getMeal } from '@/lib/meals';
import { notFound } from 'next/navigation';

/*
  동적으로 생성되는 page에선 async 함수 generateMetadata를 export해서 메타 데이터를 등록할 수 있음
    - NextJS가 해당 함수를 실행하므로 메타 데이터를 반환해야 함
  
  페이지 컴포넌트가 속성으로 받는 것과 동일한 데이터를 받음
*/
export async function generateMetadata({ params }) {
  const meal = getMeal(params.mealSlug);

  if (!meal) notFound();

  return {
    title: meal.title,
    description: meal.summary,
  };
}

function MealDetailsPage({ params }) {
  const meal = getMeal(params.mealSlug);

  // 데이터를 찾을 수 없는 경우 가장 가까운 NotFound로 이동
  if (!meal) notFound();

  meal.instructions = meal.instructions.replace(/\n/g, '<br />');

  return (
    <>
      <header className={classes.header}>
        <div className={classes.image}>
          <Image src={meal.image} alt={meal.title} fill sizes="100%" />
        </div>
        <div className={classes.headerText}>
          <h1>{meal.title}</h1>
          <p className={classes.creator}>
            by <a href={`mailto:${meal.creator_email}`}>{meal.creator}</a>
          </p>
          <p className={classes.summary}>{meal.summary}</p>
        </div>
      </header>
      <main>
        {/* 
          HTML 코드로 출력하는 경우 dangerouslySetInnerHTML 속성 사용
            그냥 출력하다면 크로스 사이트 스크립트(XSS) 공격에 노출되므로 검증을 위해 사용
            __html 속성에 화면에 출력될 내용 전달
        */}
        <p
          className={classes.instructions}
          dangerouslySetInnerHTML={{
            __html: meal.instructions,
          }}
        ></p>
      </main>
    </>
  );
}

export default MealDetailsPage;
