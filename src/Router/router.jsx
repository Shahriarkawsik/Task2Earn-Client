import { createBrowserRouter } from "react-router-dom";
import Home from "../Pages/User/Home";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    // children: [
    //   {
    //     path: "contacts/:contactId",
    //     element: <Contact />,
    //   },
    // ],
  },
]);

export default router;
