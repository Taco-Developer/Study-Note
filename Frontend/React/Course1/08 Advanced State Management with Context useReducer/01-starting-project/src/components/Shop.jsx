// Prop Drilling 발생

// import { DUMMY_PRODUCTS } from '../dummy-products.js';
// import Product from './Product.jsx';

// export default function Shop({ onAddItemToCart }) {
//   return (
//     <section id="shop">
//       <h2>Elegant Clothing For Everyone</h2>

//       <ul id="products">
//         {DUMMY_PRODUCTS.map((product) => (
//           <li key={product.id}>
//             <Product {...product} onAddToCart={onAddItemToCart} />
//           </li>
//         ))}
//       </ul>
//     </section>
//   );
// }

// 컴포넌트 합성 활용

export default function Shop({ children }) {
  return (
    <section id="shop">
      <h2>Elegant Clothing For Everyone</h2>
      <ul id="products">{children}</ul>
    </section>
  );
}
