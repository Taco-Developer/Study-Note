/*
  use server => Sever Action 생성
  서버에서, 오직 서버에서만 실행될 수 있게 보장해주는 기능
    - async 함수

  하나의 파일에서 use client와 use server를 함께 정의할 수 없음
    - Server Action은 다른 파일로 분리해서 정의 후 import해서 사용
    - NextJS의 빌드 프로세스는 기본적으로 이를 명확히 분리할 수 없기 때문에 서버 측 코드가 클라이언트 측에 위치해
      보안 문제가 생기거나 다른 문제가 발생할 수 있음

  특정 함수를 Server Action으로 만드는 경우 서버에서 동작할 함수 내부에 'use server' 표시
  파일에 있는 모든 함수를 Server Action으로 만드는 경우 파일 최상단에 'use server' 표시
*/

'use server';

import { redirect } from 'next/navigation';
import { saveMeal } from './meals';
import { revalidatePath } from 'next/cache';

function isInvalidText(text) {
  return !text || text.trim() === '';
}

/*
  form이 제출되면 NextJS가 자동으로 요청을 생성해 웹사이트를 제공하는 NextJS 서버로 보냄
  이 후 이 함수가 실행되어 서버에서 form 제출을 제어할 수 있음

  자동적으로 formData를 받음
  form의 input 태그에 의해 수집된 데이터가 formData 객체로 수집됨
*/

// export async function shareMeal(formData) {
// useActionState로 action을 전달하는 경우 수정 필요 => 인수 변경(첫 번재 인수: prevState, 두 번째 인수: formData)
export async function shareMeal(prevState, formData) {
  const meal = {
    title: formData.get('title'),
    summary: formData.get('summary'),
    instructions: formData.get('instructions'),
    image: formData.get('image'),
    creator: formData.get('name'),
    creator_email: formData.get('email'),
  };

  // 서버 측에서 입력 유효성 검증
  if (
    isInvalidText(meal.title) ||
    isInvalidText(meal.summary) ||
    isInvalidText(meal.instructions) ||
    isInvalidText(meal.creator) ||
    isInvalidText(meal.creator_email) ||
    !meal.creator_email.includes('@') ||
    !meal.image ||
    meal.image.size === 0 // 유효하지 않은 파일
  ) {
    // 에러 페이지로 이동 => 입력값이 사라짐
    // throw new Error('Invalid Input');

    // Server Action은 객체를 반환할 수 있음 - 직렬화 가능 객체(메서드를 만들면 안됨)
    // error message 객체 전달
    return {
      message: 'Invalid input.',
    };
  }

  await saveMeal(meal);

  /* 
    NextJS는 build할 때 미리 페이지를 생성하고 요청하면 생성된 페이지를 전달함
      - 새로운 meal을 추가해도 이전에 생성된 페이지를 전달해 새로 생성한 meal을 볼 수 없는 문제가 발생
      - 데이터가 변경되면 캐시의 전체나 일부를 비우라고 전달해야 함
  */

  /* 
    revalidatePath: 경로에 속하는 캐시의 유효성을 다시 검사함
    path: 유효성을 다시 검사할 경로
    type: 경로의 페이지나 레이아웃을 선택 (page: 페이지만 검사[기본값], layout: 레이아웃을 검사하므로 중첩된 페이지 모두 검사)
  */
  revalidatePath('/meals');

  redirect('/meals');
}
