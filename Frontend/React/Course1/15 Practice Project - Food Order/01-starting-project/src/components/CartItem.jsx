import { useContext } from 'react';
import { currencyFormatter } from '../util/formatting';
import CartContext from '../store/CartContext';

function CartItem({ name, quantity, price, onIncrease, onDecrease }) {
  const { addItem, removeItem } = useContext(CartContext);

  return (
    <li className="cart-item">
      <p>
        {name} - {quantity} X {currencyFormatter.format(price)}
      </p>
      <p className="cart-item-actions">
        <button onClick={onDecrease}>-</button>
        <span>{quantity}</span>
        <button onClick={onIncrease}>+</button>
      </p>
    </li>
  );
}

export default CartItem;
