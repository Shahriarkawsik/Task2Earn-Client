import { createBrowserRouter } from "react-router-dom";
import Home from "../Pages/User/Home";
import Root from "../Root";
import Login from "./../Pages/User/Login";
import Register from "./../Pages/User/Register";
import Dashboard from "../Pages/Dashboard/Dashboard";
import SelectRole from "../Pages/User/SelectRole";

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
      {
        path: "/selectRole",
        element: <SelectRole />,
      },
    ],
  },
  {
    path: "dashboard",
    element: <Dashboard />,
    // children: [
    //   {
    //     path: "/",
    //     element: <Home />,
    //   },
    // ],
  },
]);

export default router;
