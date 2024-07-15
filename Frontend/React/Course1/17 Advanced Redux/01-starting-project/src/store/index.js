import { configureStore } from '@reduxjs/toolkit';

import CartReducer from './cart-slice';
import UiReducer from './ui-slice';

const store = configureStore({
  reducer: {
    cart: CartReducer,
    ui: UiReducer,
  },
});

export default store;
