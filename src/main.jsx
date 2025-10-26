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
import Wishlist from "./Pages/Wishlist.jsx";
import PrivacyPolicy from "./Pages/PrivacyPolicy.jsx";
import TermsCondition from "./Pages/TermsCondition.jsx";
import OrderStatus from "./Pages/OrderStatus.jsx";
import Faqs from "./Pages/Faqs.jsx";
import ReturnPolicy from "./Pages/RetirnPolicy.jsx";
import Support from "./Pages/Support.jsx";
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
        path: "/about-us",
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
        path: "/wishlist",
        index: true,
        element: <Wishlist />,
      },
      {
        path: "/privacy-policy",
        index: true,
        element: <PrivacyPolicy />,
      },
      {
        path: "/terms-condition",
        index: true,
        element: <TermsCondition />,
      },
      {
        path: "/return-policy",
        index: true,
        element: <ReturnPolicy />,
      },
      {
        path: "/support",
        index: true,
        element: <Support />,
      },
      {
        path: "/order-status",
        index: true,
        element: <OrderStatus />,
      },
      {
        path: "/faqs",
        index: true,
        element: <Faqs />,
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
