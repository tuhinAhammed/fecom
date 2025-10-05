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
