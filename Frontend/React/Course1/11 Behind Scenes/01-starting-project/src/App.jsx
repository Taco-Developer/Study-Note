import { useState } from 'react';

import Counter from './components/Counter/Counter2.jsx';
import Header from './components/Header.jsx';
import ConfigureCounter from './components/Counter/ConfigureCounter.jsx';

import { log } from './log.js';

function App() {
  log('<App /> rendered');

  const [chosenCount, setChosenCount] = useState(0);

  // 같은 함수 내에서 여러 상태 업데이트가 일어나는 경우 함께 배칭되어 한 번의 함수 실행을 유도함
  function handleSetCount(num) {
    // 상태 업데이트의 경우 리액트에 의해 일정이 조정되는 것으로 바로 변경되지 않음
    setChosenCount(num);
    setChosenCount(chosenCount + 1); // 현재 값에 1을 더한 값으로 변경됨
    // 이전 상태를 사용하는 경우 함수를 이용 => 리액트가 가장 최신 상태를 제공함
    setChosenCount((prev) => prev + 1);
    console.log(chosenCount); // 변경된 값이 아닌 현재 값이 출력됨
  }

  return (
    <>
      <Header />
      <main>
        <ConfigureCounter onSet={handleSetCount} />
        {/* 
          key를 추가함으로써 컴포넌트 인스턴스를 다시 생성할 수 있음
          key가 변하면 이전과는 다른 인스턴스로 판단하기 때문에 이전 인스턴스는 지우고 새롭게 생성함
            => 내부에 있는 리액트 훅이 다시 실행됨 (useState 등)
         */}
        <Counter key={chosenCount} initialCount={chosenCount} />
        <Counter initialCount={0} />
      </main>
    </>
  );
}

export default App;
