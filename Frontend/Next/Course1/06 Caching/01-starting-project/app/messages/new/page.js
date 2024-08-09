import { redirect } from 'next/navigation';

import { addMessage } from '@/lib/messages';
import { revalidatePath, revalidateTag } from 'next/cache';

export default function NewMessagePage() {
  async function createMessage(formData) {
    'use server';

    const message = formData.get('message');
    addMessage(message);
    // revalidatePath: 해당하는 페이지의 캐시된 데이터를 재검증, 중첩된 페이지의 캐시된 데이터까지 재검증하려면 'layout' 옵션 추가
    // revalidatePath('/', 'layout');
    // revalidateTag: 요청을 보낼 때 config 객체에 tag를 설정할 수 있는데 해당 태그가 있는 모든 캐시된 데이터를 재검증
    revalidateTag('msg');
    redirect('/messages');
  }

  return (
    <>
      <h2>New Message</h2>
      <form action={createMessage}>
        <p className="form-control">
          <label htmlFor="message">Your Message</label>
          <textarea id="message" name="message" required rows="5" />
        </p>

        <p className="form-actions">
          <button type="submit">Send</button>
        </p>
      </form>
    </>
  );
}
