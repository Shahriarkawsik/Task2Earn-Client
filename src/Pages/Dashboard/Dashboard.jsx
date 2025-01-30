import { Link, NavLink, Outlet } from "react-router-dom";
import logo from "../../assets/logo.png";
import coin from "../../assets/coin.png";
import useCalculateCoin from "../../Hooks/useCalculateCoin";
import { BiSolidBellRing } from "react-icons/bi";
import { BsList } from "react-icons/bs";
import useAuth from "../../Hooks/useAuth";
import Footer from "../../Components/Footer";

const Dashboard = () => {
  const [currentUser] = useCalculateCoin();
  const { user } = useAuth();

  return (
    <section className="grid grid-cols-1 lg:grid-cols-9 xl:grid-cols-12">
      {/* Sidebar */}
      <div className="drawer lg:drawer-open lg:col-span-3 xl:col-span-2 ">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="h-fit w-full flex items-center justify-center gap-6 ">
          {/* Page content here */}
          <label
            htmlFor="my-drawer-2"
            className="btn drawer-button w-[20%] lg:hidden "
          >
            <BsList className="text-2xl text-color1" />
          </label>
          <Link to={"/"} className="lg:hidden flex-1">
            <div className="flex justify-center items-center gap-2 px-3 py-6 ">
              <img className="w-10" src={logo} alt="" />
              <h2 className="text-color1 text-4xl md:text-4xl lg:text-base xl:text-3xl font-bold">
                Task2Earn
              </h2>
            </div>
          </Link>
        </div>

        <div className="drawer-side overflow-hidden z-50">
          <label
            htmlFor="my-drawer-2"
            aria-label="close sidebar"
            className="drawer-overlay "
          ></label>
          <div className="menu bg-amber-100 max-lg:w-[350px] text-base-content min-h-full px-4">
            <Link to={"/"} className="">
              <div className="flex justify-center items-center gap-2 px-3 py-10 ">
                <img src={logo} alt="" />
                <h2 className="text-color1 text-4xl font-bold">Task2Earn</h2>
              </div>
            </Link>
            {/* Sidebar content here */}
            <ul className="text-xl font-Inter text-color3 space-y-3">
              {/* worker NavLink */}
              {currentUser?.userRole === "worker" && (
                <>
                  <li>
                    <NavLink
                      className=" hover:text-color1"
                      to={"/dashboard/workerHome"}
                    >
                      Home
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      className=" hover:text-color1"
                      to={"/dashboard/workerTaskList"}
                    >
                      TaskList
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      className=" hover:text-color1"
                      to={"/dashboard/workerSubmission"}
                    >
                      My Submissions
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      className=" hover:text-color1"
                      to={"/dashboard/workerWithdrawal"}
                    >
                      Withdrawals
                    </NavLink>
                  </li>
                </>
              )}
              {/* Buyer NavLink */}
              {currentUser?.userRole === "buyer" && (
                <>
                  <li>
                    <NavLink
                      className=" hover:text-color1"
                      to={"/dashboard/buyerHome"}
                    >
                      Home
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      className=" hover:text-color1"
                      to={"/dashboard/buyerAddTask"}
                    >
                      Add new Tasks
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      className=" hover:text-color1"
                      to={"/dashboard/buyerTask"}
                    >
                      My Task’s
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      className=" hover:text-color1"
                      to={"/dashboard/buyerPurchaseCoin"}
                    >
                      Purchase Coin
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      className=" hover:text-color1"
                      to={"/dashboard/buyerPayment"}
                    >
                      Payment history
                    </NavLink>
                  </li>
                </>
              )}
              {/* Admin NavLink */}
              {currentUser?.userRole === "admin" && (
                <>
                  <li>
                    <NavLink
                      className=" hover:text-color1"
                      to={"/dashboard/adminHome"}
                    >
                      Home
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      className=" hover:text-color1"
                      to={"/dashboard/manageUser"}
                    >
                      Manage Users
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      className=" hover:text-color1"
                      to={"/dashboard/manageTask"}
                    >
                      Manage Task
                    </NavLink>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </div>
      <div className="lg:col-span-6 xl:col-span-10 bg-[rgb(246, 246, 246)] min-h-screen px-2 sm:px-3 pt-10 ">
        <div className="flex rounded-xl shadow-xl">
          <div className="w-[85%]  flex justify-end items-center py-2 sm:gap-5">
            {/* sm:w-[90%] lg:w-[95%] */}
            {/* coin and role */}
            <div className="flex flex-col items-center gap-2">
              {/* coin Image */}
              <div className="flex items-center justify-center min-sm:gap-6 px-2 py-1 rounded-md sm:rounded-xl backdrop-blur-md bg-orange-200 -z-10">
                <img
                  src={coin}
                  alt=""
                  className="max-sm:w-10 max-sm:h-10 sm:w-10 sm:h-10 lg:w-10 lg:h-10 rounded-full"
                />
                <p className="text-2xl sm:text-3xl lg:text-2xl font-Cinzel font-bold">
                  {currentUser?.userAvailableCoin || 0}
                </p>
              </div>
              {/* user role */}
              <p className="font-semibold font-Inter uppercase sm:text-xl">
                {currentUser?.userRole}
              </p>
            </div>
            {/* user info */}
            <div className="flex flex-col justify-center items-center gap-1 ">
              <img
                className="w-12 h-12 rounded-full"
                src={user?.photoURL}
                alt="photo"
              />
              <p className="font-semibold font-Inter sm:text-xl text-center">
                {currentUser?.userName}
              </p>
            </div>
          </div>
          {/* notification */}
          <div className="w-[15%] flex items-center justify-center text-3xl">
            <BiSolidBellRing />
          </div>
        </div>
        <div className="min-h-[66%]">
          <Outlet />
        </div>
        <Footer />
      </div>
    </section>
  );
};

export default Dashboard;
