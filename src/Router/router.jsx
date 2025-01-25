import { createBrowserRouter } from "react-router-dom";
import Home from "../Pages/User/Home";
import Root from "../Root";
import Login from "./../Pages/User/Login";
import Register from "./../Pages/User/Register";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
    ],
  },
  // {
  //   path: "dashboard",
  //   element: <Root />,
  //   children: [
  //     {
  //       path: "/",
  //       element: <Home />,
  //     },
  //   ],
  // },
]);

export default router;
