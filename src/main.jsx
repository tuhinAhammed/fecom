import * as React from "react";
import * as ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Home from "./Pages/Home.jsx";
import Shop from "./Pages/Shop.jsx";
import About from "./Pages/About.jsx";
import Contact from "./Pages/Contact.jsx";
import { Provider } from "react-redux";
import store from "./Redux/Store/store.js";
import SingleProduct from "./Pages/SingleProduct.jsx";
import NewArrivals from "./Pages/NewArrivals.jsx";
import TrendingProduct from "./Pages/TrendingProduct.jsx";
import Cart from "./Pages/Cart..jsx";
import SingleCategory from "./Pages/SingleCategory.jsx";
import Error from "./Pages/Error.jsx";
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/shop",
        index: true,
        element: <Shop />,
      },
      {
        path: "/about",
        index: true,
        element: <About />,
      },
      {
        path: "/contact",
        index: true,
        element: <Contact />,
      },
      {
        path: "/new-arrivals",
        index: true,
        element: <NewArrivals />,
      },
      {
        path: "/trending-products",
        index: true,
        element: <TrendingProduct />,
      },      
      {
        path: "/product/:name",
        index: true,
        element: <SingleProduct />,
      },
      {
        path: "/cart",
        index: true,
        element: <Cart />,
      },
      {
        path: "/category/:slug",
        index: true,
        element: <SingleCategory />,
      },
      {
        path: "*",
        index: true,
        element: <Error />,
      },
    ],
  },

]);
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
