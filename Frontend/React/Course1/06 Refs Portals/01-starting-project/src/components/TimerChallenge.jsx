import { useRef, useState } from 'react';

import ResultModal from './ResultModal.jsx';

// 변수로 설정할 경우 타이머가 여러 개인 경우 마지막에 시작한 타이머로 덮어씀 => useRef 사용해서 해결
// let timer;

export default function TimerChallenge({ title, targetTime }) {
  const timer = useRef();
  const dialog = useRef();

  // setTimeout
  // const [timerStarted, setTimerStarted] = useState(false);
  // const [timerExpired, setTimerExpired] = useState(false);

  // setInterval
  const [timeRemaining, setTimeRemaining] = useState(targetTime * 1000);

  const timerIsActive = timeRemaining > 0 && timeRemaining < targetTime * 1000;
  if (timeRemaining <= 0) {
    clearInterval(timer.current);
    dialog.current.open();
  }

  const handleReset = () => {
    setTimeRemaining(targetTime * 1000);
  };

  const handleStart = () => {
    // timer = setTimeout(() => {
    //   setTimerExpired(true);
    // }, targetTime * 1000);

    // setTimeout으로 한 번만 확인
    // timer.current = setTimeout(() => {
    //   setTimerExpired(true);

    //   // dialog => ResultModal에 있는 dialog 자체
    //   // dialog.current.showModal();

    //   // dialog => ResultModal에서 노출하고 있는 open 메서드를 가진 객체
    //   dialog.current.open();
    // }, targetTime * 1000);

    // setTimerStarted(true);

    // setInterval로 남은 시간 확인
    timer.current = setInterval(() => {
      setTimeRemaining((prevTimeRemaining) => prevTimeRemaining - 10);
    }, 10);
  };

  const handleStop = () => {
    // clearTimeout(timer);
    // clearTimeout(timer.current);
    dialog.current.open();
    clearInterval(timer.current);
  };

  return (
    <>
      <ResultModal
        ref={dialog}
        targetTime={targetTime}
        remainingTime={timeRemaining}
        onReset={handleReset}
      />
      <section className="challenge">
        <h2>{title}</h2>
        <p className="challenge-time">
          {targetTime} second{targetTime > 1 ? 's' : ''}
        </p>
        <p>
          <button onClick={timerIsActive ? handleStop : handleStart}>
            {timerIsActive ? 'Stop' : 'Start'} Challenge
          </button>
        </p>
        <p className={timerIsActive ? 'active' : ''}>
          {timerIsActive ? 'Time is running...' : 'Timer inactive'}
        </p>
      </section>
    </>
  );
}
