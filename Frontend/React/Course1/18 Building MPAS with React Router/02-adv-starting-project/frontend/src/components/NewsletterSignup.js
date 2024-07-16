import { useFetcher } from 'react-router-dom';

import classes from './NewsletterSignup.module.css';
import { useEffect } from 'react';

function NewsletterSignup() {
  // useFetcher는 loader나 action이 있는 라우트로 화면이 전환되지 않고 사용하기 위해 사용
  // 기본 제공 Form의 경우 해당 라우트로 전환됨
  const { Form, data, state } = useFetcher();

  useEffect(() => {
    if (state === 'idle' && data && data.message) {
      window.alert(data.message);
    }
  }, [data, state]);

  return (
    <Form method="POST" action="/newsletter" className={classes.newsletter}>
      <input
        type="email"
        placeholder="Sign up for newsletter..."
        aria-label="Sign up for newsletter"
      />
      <button>Sign up</button>
    </Form>
  );
}

export default NewsletterSignup;
