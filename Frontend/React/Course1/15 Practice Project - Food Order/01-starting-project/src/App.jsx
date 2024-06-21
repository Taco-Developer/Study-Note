import { CartContextProvider } from './store/CartContext';
import { UserProgressContextProvider } from './store/UserProgressContext';

import Header from './components/Header';
import Meals from './components/Meals';
import Cart from './components/Cart';
import Checkout from './components/Checkout';

function App() {
  return (
    <CartContextProvider>
      <UserProgressContextProvider>
        <Header />
        <Meals />
        <Checkout />
        <Cart />
      </UserProgressContextProvider>
    </CartContextProvider>
  );
}

export default App;
