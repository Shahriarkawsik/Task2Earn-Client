import { NavLink } from "react-router-dom";
import logo from "../../assets/logo.png";
import coin from "../../assets/coin.png";
import useAuth from "./../../Hooks/useAuth";
import "./Navbar.css";
import Swal from "sweetalert2";
import useCalculateCoin from "../../Hooks/useCalculateCoin";
import { GiHamburgerMenu } from "react-icons/gi";
// import useAxiosPublic from "../../Hooks/useAxiosPublic";

const Navbar = () => {
  const { user, SignOutUser } = useAuth();
  const [currentUser] = useCalculateCoin();

  const handleLogOut = () => {
    SignOutUser()
      .then((res) => {
        if (res) {
          Swal.fire({
            position: "center",
            icon: "success",
            title: `Logout Successful`,
            showConfirmButton: false,
            timer: 1500,
          });
        }
      })
      .catch((err) => {
        Swal.fire({
          position: "center",
          icon: "error",
          title: `Logout unsuccessful`,
          text: `${err.message}`,
          showConfirmButton: false,
          timer: 2500,
        });
      });
  };
  const navItem = (
    <>
      {user ? (
        <li className=" hover:text-color1">
          <NavLink to={"dashboard"}>Dashboard</NavLink>
        </li>
      ) : (
        <>
          <li>
            <NavLink className=" hover:text-color1" to={"login"}>
              Login
            </NavLink>
          </li>
          <li className=" hover:text-color1">
            <NavLink to={"register"}>Register</NavLink>
          </li>
        </>
      )}
      <li>
        <a
          href="https://github.com/Shahriarkawsik"
          target="_blank"
          className=" hover:text-color1"
        >
          Join as Developer
        </a>
      </li>
    </>
  );

  return (
    <div className="navbar bg-base-100 w-11/12 lg:w-10/12 mx-auto">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <GiHamburgerMenu className="max-sm:w-6 max-sm:h-6 sm:w-7 sm:h-7 " />
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
          >
            {navItem}
          </ul>
        </div>
        <div className="flex items-center justify-center gap-3">
          <img
            src={logo}
            className="max-sm:w-6 max-sm:h-6 sm:w-7 sm:h-7"
            alt=""
          />
          <a className="sm:text-3xl font-Cinzel font-bold">Task2Earn</a>
        </div>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 lg:text-2xl font-semibold text-color3">
          {navItem}
        </ul>
      </div>
      <div className="navbar-end">
        {user && (
          <div className="flex items-center justify-center gap-2">
            {/* coin Image */}
            <div className="flex items-center justify-center gap-1 px-2 py-1 rounded-md sm:rounded-xl backdrop-blur-md bg-orange-200">
              <img
                src={coin}
                alt=""
                className="max-sm:w-6 max-sm:h-6 sm:w-7 sm:h-7 lg:w-10 lg:h-10 rounded-full"
              />
              <p className=" sm:text-3xl lg:text-2xl font-Cinzel font-bold">
                {currentUser.userAvailableCoin || 0}
              </p>
            </div>
            <div className="relative group">
              <img
                className="w-12 h-12 rounded-full"
                src={user?.photoURL}
                alt="photo"
              />
              <div className="z-10 hidden group-hover:block absolute w-max right-0 top-12 bg-gray-200 p-3 rounded-s-lg space-y-4">
                <h2>{user?.displayName}</h2>
                <button
                  className="font-bold bg-color2 p-3 rounded-lg text-white text-xl leading-6 font-Inter uppercase"
                  onClick={handleLogOut}
                >
                  Log out
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
