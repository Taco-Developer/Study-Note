import { Link, useSubmit } from 'react-router-dom';

import classes from './EventItem.module.css';

function EventItem({ event }) {
  // useSubmit으로 라우트에 설정된 action을 실행할 수 있음
  const submit = useSubmit();

  function startDeleteHandler() {
    const proceed = window.confirm('Are you sure?');

    // submit(data, 옵션)
    if (proceed) submit(null, { method: 'DELETE' });
  }

  return (
    <article className={classes.event}>
      <img src={event.image} alt={event.title} />
      <h1>{event.title}</h1>
      <time>{event.date}</time>
      <p>{event.description}</p>
      <menu className={classes.actions}>
        <Link to="edit">Edit</Link>
        <button onClick={startDeleteHandler}>Delete</button>
      </menu>
    </article>
  );
}

export default EventItem;
