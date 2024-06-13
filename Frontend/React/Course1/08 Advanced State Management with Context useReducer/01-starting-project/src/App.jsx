import CartContextProvider from './store/shopping-cart-context.jsx';

import Header from './components/Header.jsx';
import Shop from './components/Shop.jsx';
import Product from './components/Product.jsx';

import { DUMMY_PRODUCTS } from './dummy-products.js';

function App() {
  return (
    <CartContextProvider>
      {/* Prop Drilling 발생 */}
      {/* <Header
        cart={shoppingCart}
        onUpdateCartItemQuantity={handleUpdateCartItemQuantity}
      /> */}
      {/* Context API 활용 */}
      <Header />

      {/* Prop Drilling 발생 */}
      {/* <Shop onAddItemToCart={handleAddItemToCart} /> */}
      {/* 컴포넌트 합성으로 Prop Drilling 해결 */}
      <Shop>
        {DUMMY_PRODUCTS.map((product) => (
          <li key={product.id}>
            {/* <Product {...product} onAddToCart={handleAddItemToCart} /> */}
            {/* Context API 활용 */}
            <Product {...product} />
          </li>
        ))}
      </Shop>
    </CartContextProvider>
  );
}

export default App;
