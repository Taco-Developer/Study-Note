import { useState, memo, useCallback, useMemo } from 'react';

import IconButton from '../UI/IconButton.jsx';
import MinusIcon from '../UI/Icons/MinusIcon.jsx';
import PlusIcon from '../UI/Icons/PlusIcon.jsx';
import CounterOutput from './CounterOutput.jsx';
import { log } from '../../log.js';

function isPrime(number) {
  log('Calculating if is prime number', 2, 'other');
  if (number <= 1) {
    return false;
  }

  const limit = Math.sqrt(number);

  for (let i = 2; i <= limit; i++) {
    if (number % i === 0) {
      return false;
    }
  }

  return true;
}

/*
memo 사용
memo 남용 금지 => 사용한다면 최대한 상위 컴포넌트에 사용 (상위 컴포넌트 재실행을 막으면 하위는 동시에 막힘)
memo는 컴포넌트의 속성 값을 확인하는데 모든 컴포넌트에 사용하면 속성을 확인으로 인해 성능에 악영향을 줌
*/
const Counter = memo(function Counter({ initialCount }) {
  log('<Counter /> rendered', 1);

  // useMemo => 컴포넌트 내부에서 함수 재실행 방지, 의존성에 추가된 값이 변한 경우에만 재실행
  // 사용상 주의 => 매번 재실행되어야 하는 함수의 경우 의존성 값 비교를 수행하기 때문에 오히려 성능에 악영향
  const initialCountIsPrime = useMemo(
    () => isPrime(initialCount),
    [initialCount]
  );

  const [counter, setCounter] = useState(initialCount);

  // useCallback => 다른 컴포넌트로 전달될 함수 재생성 방지, 의존성에 추가된 값이 변한 경우에만 재생성
  const handleDecrement = useCallback(function handleDecrement() {
    setCounter((prevCounter) => prevCounter - 1);
  }, []);

  const handleIncrement = useCallback(function handleIncrement() {
    setCounter((prevCounter) => prevCounter + 1);
  }, []);

  return (
    <section className="counter">
      <p className="counter-info">
        The initial counter value was <strong>{initialCount}</strong>. It{' '}
        <strong>is {initialCountIsPrime ? 'a' : 'not a'}</strong> prime number.
      </p>
      <p>
        <IconButton icon={MinusIcon} onClick={handleDecrement}>
          Decrement
        </IconButton>
        <CounterOutput value={counter} />
        <IconButton icon={PlusIcon} onClick={handleIncrement}>
          Increment
        </IconButton>
      </p>
    </section>
  );
});

export default Counter;
