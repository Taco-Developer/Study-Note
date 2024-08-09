import { getMessages } from '@/lib/messages';

export default async function MessagesLayout({ children }) {
  /* 
    Request Memoization

    정확히 같은 요청의 경우 한 번만 요청을 보내고 응답을 재사용함
      - 단, headers와 같은 설정이 다른 경우 url이 같더라도 같은 요청으로 보지 않음
  */
  // const response = await fetch('http://localhost:8080/messages', {
  //   headers: {
  //     'X-ID': 'layout',
  //   },
  // });
  // const response = await fetch('http://localhost:8080/messages');
  // const messages = await response.json();

  const messages = await getMessages();
  const totalMessages = messages.length;

  return (
    <>
      <h1>Important Messages</h1>
      <p>{totalMessages} messages found</p>
      <hr />
      {children}
    </>
  );
}
