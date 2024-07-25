'use client';

import { useFormState } from 'react-dom';
// import { useActionState } from 'react';

import ImagePicker from '@/components/meals/image-picker';
import MealsFormSubmit from '@/components/meals/meals-form-submit';

import { shareMeal } from '@/lib/actions';
import classes from './page.module.css';

function ShareMealPage() {
  /* 
    useFormState = useActionState

    클라이언트 컴포넌트에서 동작

    useFormState가 최신 버전에서 useActionState로 변경 됨
    useFormState는 react-dom에서 useActionsState는 react에서 import

    사용할 Server Action과 아직 응답 받기 전 사용할 초기값 전달
    state: 가장 최근에 받은 응답값
    formAction: form이 실행할 action (이 액션을 사용해야 useActionState가 컴포넌트에 접근해 상태를 관리할 수 있음)
  */

  const [state, formAction] = useFormState(shareMeal, { message: null });
  // const [state, formAction] = useActionState(shareMeal, { message: null });

  return (
    <>
      <header className={classes.header}>
        <h1>
          Share your <span className={classes.highlight}>favorite meal</span>
        </h1>
        <p>Or any other meal you feel needs sharing!</p>
      </header>
      <main className={classes.main}>
        <form className={classes.form} action={formAction}>
          <div className={classes.row}>
            <p>
              <label htmlFor="name">Your name</label>
              <input type="text" id="name" name="name" required />
            </p>
            <p>
              <label htmlFor="email">Your email</label>
              <input type="email" id="email" name="email" required />
            </p>
          </div>
          <p>
            <label htmlFor="title">Title</label>
            <input type="text" id="title" name="title" required />
          </p>
          <p>
            <label htmlFor="summary">Short Summary</label>
            <input type="text" id="summary" name="summary" required />
          </p>
          <p>
            <label htmlFor="instructions">Instructions</label>
            <textarea
              id="instructions"
              name="instructions"
              rows="10"
              required
            ></textarea>
          </p>
          <ImagePicker label="Your image" name="image" />
          {state.message && <p>{state.message}</p>}
          <p className={classes.actions}>
            <MealsFormSubmit />
          </p>
        </form>
      </main>
    </>
  );
}

export default ShareMealPage;
