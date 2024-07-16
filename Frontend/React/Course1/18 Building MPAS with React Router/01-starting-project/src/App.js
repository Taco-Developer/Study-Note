import {
  createBrowserRouter,
  RouterProvider,
  // createRoutesFromElements,
  // Route,
} from 'react-router-dom';

import HomePage from './pages/Home';
import ProductsPage from './pages/Products';
import RootLayout from './pages/Root';
import ErrorPage from './pages/Error';
import ProductDetailPage from './pages/ProductDetail';

// 방법1
// path에 /로 시작하는 경우 절대 경로, /없이 시작하는 경우 상대 경로
const router = createBrowserRouter([
  {
    // 절대 경로
    path: '/',
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      // 상대 경로
      // { path: '', element: <HomePage /> },
      // index: true 설정으로 부모 경로의 기본 자식을 설정할 수 있음
      { index: true, element: <HomePage /> },
      { path: 'products', element: <ProductsPage /> },
      // 동적 라우트 사용
      { path: 'products/:productId', element: <ProductDetailPage /> },
    ],
  },
]);

// 방법 2
// const routeDefinition = createRoutesFromElements(
//   <Route>
//     <Route path="/" element={<HomePage />} />
//     <Route path="/products" element={<ProductsPage />} />
//   </Route>
// );
// const router = createBrowserRouter(routeDefinition);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
