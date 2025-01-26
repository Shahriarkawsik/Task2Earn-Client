import { useLocation, useNavigate } from "react-router-dom";

import Swal from "sweetalert2";
import useAxiosPublic from "../../Hooks/useAxiosPublic";

const SelectRole = () => {
  const axiosPublic = useAxiosPublic();
  const location = useLocation();
  const navigate = useNavigate();
  const { userName, userEmail, userPhotoURL } = location.state;

  const handleRoleSelection = (role) => {
    const userDetails = {
      userName,
      userEmail,
      userPhotoURL,
      userRole: role,
      userAvailableCoin: role === "worker" ? 10 : 40, // Assign coins based on role
    };

    axiosPublic
      .post("/users", userDetails)
      .then((res) => {
        if (res.data.insertedId) {
          navigate("/dashboard");
          Swal.fire({
            position: "center",
            icon: "success",
            title: `Welcome ${userName}, role set as ${role}`,
            showConfirmButton: false,
            timer: 1500,
          });
        }
      })
      .catch((err) => {
        console.error("Database Error:", err.message);
        Swal.fire({
          position: "center",
          icon: "error",
          title: "Database Error",
          text: `${err.message}`,
          showConfirmButton: false,
          timer: 1500,
        });
      });
  };

  return (
    <div className="w-2/3 mx-auto flex items-center justify-center flex-col space-y-6 bg-amber-100 border py-20 rounded-3xl my-20">
      <h1 className="text-40 font-Inter leading-10 text-color3 font-bold">
        Select Your Role
      </h1>
      <div className="flex justify-center items-center gap-5">
        <button
          className="font-bold text-2xl bg-color1 px-3 py-2 rounded-xl text-white hover:bg-color2"
          onClick={() => handleRoleSelection("worker")}
        >
          Worker
        </button>
        <button
          className="font-bold text-2xl bg-color1 px-3 py-2 rounded-xl text-white hover:bg-color2"
          onClick={() => handleRoleSelection("buyer")}
        >
          Buyer
        </button>
      </div>
    </div>
  );
};

export default SelectRole;
