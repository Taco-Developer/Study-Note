import NewTask from './NewTask.jsx';

export default function Tasks({ tasks, onAdd, onDelete }) {
  let content = (
    <p className="text-stone-800 my-4">
      This project does not have any tasks yet.
    </p>
  );
  if (tasks.length > 0)
    content = (
      <ul className="p-4 mt-8 rounded-md bg-stone-100">
        {tasks.map(({ id, text }) => (
          <li key={id} className="flex justify-between my-4">
            <span>{text}</span>
            <button
              className="text-stone-700 hover:text-red-500"
              onClick={() => {
                onDelete(id);
              }}
            >
              Clear
            </button>
          </li>
        ))}
      </ul>
    );

  return (
    <section>
      <h2 className="text-2xl font-bold text-stone-700 mb-4">Tasks</h2>
      <NewTask onAdd={onAdd} />
      {content}
    </section>
  );
}
