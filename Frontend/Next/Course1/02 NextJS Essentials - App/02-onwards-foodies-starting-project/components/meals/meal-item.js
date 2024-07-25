import Link from 'next/link';
import Image from 'next/image';

import classes from './meal-item.module.css';

function MealItem({ title, slug, image, summary, creator }) {
  return (
    <article className={classes.meal}>
      <header>
        <div className={classes.image}>
          {/* 
            img를 import해서 사용하는 경우엔 NextJS는 이미지의 크기를 알 수 있지만
            그렇지 않은 경우엔 이미지의 크기를 알 수 없음

            이미지 크기를 알고 있는 경우 명시적으로 설정할 수 있지만 크기를 알 수 없는 경우 fill 속성을 이용할 수 있음
              부모 요소를 채우라고 NextJS에 알려줌
          */}
          <Image src={image} alt={title} fill sizes="100%" />
        </div>
        <div className={classes.headerText}>
          <h2>{title}</h2>
          <p>by {creator}</p>
        </div>
      </header>
      <div className={classes.content}>
        <p className={classes.summary}>{summary}</p>
        <div className={classes.actions}>
          <Link href={`/meals/${slug}`}>View Details</Link>
        </div>
      </div>
    </article>
  );
}

export default MealItem;
