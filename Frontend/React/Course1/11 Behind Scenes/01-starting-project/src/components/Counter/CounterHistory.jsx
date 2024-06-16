import { useState } from 'react';

import { log } from '../../log.js';

function HistoryItem({ count }) {
  log('<HistoryItem /> rendered', 3);

  const [selected, setSelected] = useState(false);

  function handleClick() {
    setSelected((prevSelected) => !prevSelected);
  }

  return (
    <li onClick={handleClick} className={selected ? 'selected' : undefined}>
      {count}
    </li>
  );
}

export default function CounterHistory({ history }) {
  log('<CounterHistory /> rendered', 2);

  return (
    <ol>
      {/* 
        state는 컴포넌트 타입과 컴포넌트가 사용되는 위치와 상관이 있음
        컴포넌트의 위치가 변경된다면 잘못된 위치로 상태가 전달될 수 있음

        위의 상황을 피하기 위해 key를 제공
          => 컴포넌트를 포함한 동적인 목록이 있는 경우 필수적으로 입력해서 각 컴포넌트를 구분함
          => 같은 타입의 형제 컴포넌트가 있는 경우 컴포넌트의 수나 위치가 변경될 수 있기에 key를 통해 각 컴포넌트를 구분
          => 컴포넌트 목록에서 컴포넌트의 수나 위치가 변경되는 경우
            index를 key로 활용하면 key가 계속 변하기 때문에 사용하는 의미가 없어짐
       */}
      {history.map(({ id, value }) => (
        <HistoryItem key={id} count={value} />
      ))}
    </ol>
  );
}
