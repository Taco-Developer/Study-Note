'use client';

// form 태그 안에서 사용 가능
import { useFormStatus } from 'react-dom';

function MealsFormSubmit() {
  const { pending } = useFormStatus();

  return (
    <button disabled={pending}>{pending ? 'Submitting' : 'Share Meal'}</button>
  );
}

export default MealsFormSubmit;
