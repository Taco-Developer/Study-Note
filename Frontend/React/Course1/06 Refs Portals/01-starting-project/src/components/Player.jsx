import { useRef } from 'react';
import { useState } from 'react';

export default function Player() {
  // useState만 사용
  // const [enteredPlayerName, setEnteredPlayerName] = useState('');
  // const [submitted, setSubmitted] = useState(false);

  // const handleChange = (event) => {
  //   setSubmitted(false);
  //   setEnteredPlayerName(event.target.value);
  // };

  // const handleClick = () => {
  //   setSubmitted(true);
  // };

  // useRef 사용
  const playerName = useRef();
  const [enteredPlayerName, setEnteredPlayerName] = useState('');

  const handleClick = () => {
    setEnteredPlayerName(playerName.current.value);
  };

  return (
    <section id="player">
      {/* <h2>Welcome {submitted ? enteredPlayerName : 'unknown entity'}</h2> */}
      <h2>Welcome {enteredPlayerName ?? 'unknown entity'}</h2>
      <p>
        <input
          type="text"
          // value={enteredPlayerName}
          // onChange={handleChange}
          ref={playerName}
        />
        <button onClick={handleClick}>Set Name</button>
      </p>
    </section>
  );
}
