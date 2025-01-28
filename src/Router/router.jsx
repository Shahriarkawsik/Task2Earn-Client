import { createBrowserRouter } from "react-router-dom";
import Home from "../Pages/User/Home";
import Root from "../Root";
import Login from "./../Pages/User/Login";
import Register from "./../Pages/User/Register";
import Dashboard from "../Pages/Dashboard/Dashboard";
import WorkerHome from "../Pages/Dashboard/Worker/WorkerHome";
import WorkerTask from "../Pages/Dashboard/Worker/WorkerTask";
import WorkerSubmission from "../Pages/Dashboard/Worker/WorkerSubmission";
import WorkerWithdrawal from "../Pages/Dashboard/Worker/WorkerWithdrawal";
import BuyerHome from "./../Pages/Dashboard/Buyer/BuyerHome";
import BuyerAddTask from "./../Pages/Dashboard/Buyer/BuyerAddTask";
import BuyerTask from "./../Pages/Dashboard/Buyer/BuyerTask";
import BuyerPurchaseCoin from "./../Pages/Dashboard/Buyer/BuyerPurchaseCoin";
import BuyerPayment from "./../Pages/Dashboard/Buyer/BuyerPayment";
import AdminHome from "../Pages/Dashboard/Admin/AdminHome";
import ManageUser from "../Pages/Dashboard/Admin/ManageUser";
import ManageTask from "../Pages/Dashboard/Admin/ManageTask";
import BuyerUpdateTask from "../Pages/Dashboard/Buyer/BuyerUpdateTask";
import AvailableTaskDetails from "../Pages/Dashboard/Worker/AvailableTaskDetails";
import PaymentPage from "../Pages/Dashboard/Buyer/PaymentPage";

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
  {
    path: "dashboard",
    element: <Dashboard />,
    children: [
      // Worker
      {
        path: "workerHome",
        element: <WorkerHome />,
      },
      {
        path: "workerTaskList",
        element: <WorkerTask />,
      },
      {
        path: "workerTaskList/:id",
        element: <AvailableTaskDetails />,
      },
      {
        path: "workerSubmission",
        element: <WorkerSubmission />,
      },
      {
        path: "workerWithdrawal",
        element: <WorkerWithdrawal />,
      },
      // Buyer
      {
        path: "buyerHome",
        element: <BuyerHome />,
      },
      {
        path: "buyerAddTask",
        element: <BuyerAddTask />,
      },
      {
        path: "buyerUpdateTask/:id",
        element: <BuyerUpdateTask />,
      },
      {
        path: "buyerTask",
        element: <BuyerTask />,
      },
      {
        path: "buyerPurchaseCoin",
        element: <BuyerPurchaseCoin />,
      },
      {
        path: "buyerPayment",
        element: <BuyerPayment />,
      },
      {
        path: "checkout/:id",
        element: <PaymentPage />,
      },
      // Admin
      {
        path: "adminHome",
        element: <AdminHome />,
      },
      {
        path: "manageUser",
        element: <ManageUser />,
      },
      {
        path: "manageTask",
        element: <ManageTask />,
      },
    ],
  },
]);

export default router;
