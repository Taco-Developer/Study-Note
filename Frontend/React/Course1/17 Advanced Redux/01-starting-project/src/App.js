import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

// import { uiActions } from './store/ui-slice';
import { sendCartData, fetchCartData } from './store/cart-actions';

import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';
import Notification from './components/UI/Notification';

let isInitial = true;

function App() {
  const showCart = useSelector((state) => state.ui.cartIsVisible);

  // 컴포넌트에 http 로직 작성
  const dispatch = useDispatch();
  const notification = useSelector((state) => state.ui.notification);
  const cart = useSelector((state) => state.cart);

  // useEffect(() => {
  //   const sendCartData = async () => {
  //     dispatch(
  //       uiActions.showNotification({
  //         status: 'pending',
  //         title: 'Sending...',
  //         message: 'Sending cart data...',
  //       })
  //     );

  //     const response = await fetch(
  //       'https://course-react-ca2f1-default-rtdb.firebaseio.com/cart.json',
  //       {
  //         method: 'PUT',
  //         body: JSON.stringify(cart),
  //       }
  //     );

  //     if (!response.ok) throw new Error('Sending cart data failed.');

  //     dispatch(
  //       uiActions.showNotification({
  //         status: 'success',
  //         title: 'Success!',
  //         message: 'Sent cart data successfully!',
  //       })
  //     );
  //   };

  //   if (isInitial) {
  //     isInitial = false;
  //     return;
  //   }

  //   sendCartData().catch((error) => {
  //     dispatch(
  //       uiActions.showNotification({
  //         status: 'error',
  //         title: 'Error!',
  //         message: 'Sending cart data failed!',
  //       })
  //     );
  //   });
  // }, [cart, dispatch]);

  // cartData 가져오기
  useEffect(() => {
    dispatch(fetchCartData());
  }, [dispatch]);

  // 컴포넌트 대신 리덕스 파일에 http 로직 작성 => 컴포넌트를 가볍게 함
  useEffect(() => {
    if (isInitial) {
      isInitial = false;
      return;
    }

    if (cart.changed) dispatch(sendCartData(cart));
  }, [cart, dispatch]);

  return (
    <>
      {notification && (
        <Notification
          status={notification.status}
          title={notification.title}
          message={notification.message}
        />
      )}
      <Layout>
        {showCart && <Cart />}
        <Products />
      </Layout>
    </>
  );
}

export default App;
