import React from 'react';
import { Link } from 'react-router-dom';

const PRODUCTS = [
  { id: 'p1', title: 'Product 1' },
  { id: 'p2', title: 'Product 2' },
  { id: 'p3', title: 'Product 3' },
];

function ProductsPage() {
  return (
    <>
      <h1>The Products Page</h1>
      <ul>
        {/* 동적 라우트에 링크 추가 */}
        {PRODUCTS.map(({ id, title }) => (
          <li key={id}>
            <Link to={`/products/${id}`}>{title}</Link>
          </li>
        ))}
      </ul>
    </>
  );
}

export default ProductsPage;
