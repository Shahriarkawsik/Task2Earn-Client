import { Link, NavLink, Outlet } from "react-router-dom";
import logo from "../../assets/logo.png";
import coin from "../../assets/coin.png";
import useCalculateCoin from "../../Hooks/useCalculateCoin";
import { BiSolidBellRing } from "react-icons/bi";
import { BsList } from "react-icons/bs";
import useAuth from "../../Hooks/useAuth";
import useGetAllUser from "../../Hooks/useGetAllUser";
const Dashboard = () => {
  const [addCoin, , userRole] = useCalculateCoin();
  const { user } = useAuth();
  const [users] = useGetAllUser();


  return (
    <section className="grid grid-cols-1 lg:grid-cols-9 xl:grid-cols-12">
      {/* Sidebar */}
      <div className="drawer lg:drawer-open lg:col-span-3 xl:col-span-2 ">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="h-fit w-full flex items-center justify-center gap-6 scroll-smooth">
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

        <div className="drawer-side overflow-hidden">
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
              {userRole === "worker" && (
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
              {userRole === "buyer" && (
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
              {userRole === "admin" && (
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
      <div className="lg:col-span-6 xl:col-span-10 bg-[rgb(246, 246, 246)] min-h-screen px-3 pt-10 ">
        <div className="flex rounded-xl shadow-xl">
          <div className="w-[95%] flex justify-end items-center gap-5 p-2">
            {/* coin and role */}
            <div className="flex flex-col items-center gap-2">
              {/* coin Image */}
              <div className="flex items-center justify-center gap-1 px-2 py-1 rounded-xl backdrop-blur-md bg-orange-200">
                <img src={coin} alt="" className="w-10 h-10 rounded-full" />
                <p className="text-2xl font-Cinzel font-bold">{addCoin || 0}</p>
              </div>
              <p className="font-semibold font-Inter uppercase">{userRole}</p>
            </div>
            {/* user info */}
            <div className="flex flex-col justify-center items-center gap-3">
              <img
                className="w-12 h-12 rounded-full"
                src={user?.photoURL}
                alt="photo"
              />
              <p className="font-semibold font-Inter">{user?.displayName}</p>
            </div>
          </div>
          <div className="w-[5%] flex items-center justify-center text-3xl">
            <BiSolidBellRing />
          </div>
        </div>
        <Outlet />
      </div>
    </section>
  );
};

export default Dashboard;
