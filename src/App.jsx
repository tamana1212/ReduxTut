import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import AppLayout from "./pages/AppLayout";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import Toast from "./components/toast";
import { Provider } from "react-redux";
import store from "./store/store";

function App() {
  const router = createBrowserRouter([
    {
      element: <AppLayout  />,
      children: [
        {
          path: "/",
          element: (
            <Home
            />
          ),
        },
        {
          path: "/cart",
          element: <Cart />,
        },
      ],
    },
  ]);

  return (
    <>
      <Provider  store={store}>
      <RouterProvider router={router} />
      <Toast />
      </Provider>
    </>
  );
}

export default App;
