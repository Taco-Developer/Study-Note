import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

function HomePage() {
  // 프로그램적으로 네비게이션하기
  const navigate = useNavigate();
  const navigateHandler = () => {
    navigate('/products');
  };

  return (
    <>
      <h1>My Home Page</h1>
      <p>
        Go to <Link to="/products">the list of products</Link>
      </p>
      <p>
        <button onClick={navigateHandler}>Navigate</button>
      </p>
    </>
  );
}

export default HomePage;
