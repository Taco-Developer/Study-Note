import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

import NewChallenge from './NewChallenge.jsx';

export default function Header() {
  const [isCreatingNewChallenge, setIsCreatingNewChallenge] = useState();

  function handleStartAddNewChallenge() {
    setIsCreatingNewChallenge(true);
  }

  function handleDone() {
    setIsCreatingNewChallenge(false);
  }

  return (
    <>
      {/* 요소가 DOM에서 삭제될 때 exit 옵션을 확인해서 있다면 실행 후 삭제  */}
      <AnimatePresence>
        {isCreatingNewChallenge && <NewChallenge onDone={handleDone} />}
      </AnimatePresence>

      <header id="main-header">
        <h1>Your Challenges</h1>
        <motion.button
          onClick={handleStartAddNewChallenge}
          className="button"
          whileHover={{ scale: 1.1 }}
          transition={{ type: 'spring', stiffness: 500 }}
        >
          Add Challenge
        </motion.button>
      </header>
    </>
  );
}
