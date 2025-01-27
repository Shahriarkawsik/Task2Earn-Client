import { useForm } from "react-hook-form";
import bg from "../../assets/bgwood.png";
import authentication2 from "../../assets/registration.png";
import HelmetTitle from "./../../Components/HelmetTitle";
import { Link, useNavigate } from "react-router-dom";
import useAxiosPublic from "./../../Hooks/useAxiosPublic";
import useAuth from "../../Hooks/useAuth";
import Swal from "sweetalert2";

const Register = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const axiosPublic = useAxiosPublic();
  const { createUserWithEmail } = useAuth();

  const onSubmit = (userInfo) => {
    const coin = userInfo.userRole === "worker" ? 10 : 40;

    const userDetails = {
      userName: userInfo.name,
      userEmail: userInfo.email,
      userPhotoURL: userInfo.profileURL,
      userRole: userInfo.userRole,
      userAvailableCoin: coin,
    };

    createUserWithEmail(userInfo.email, userInfo.password)
      .then((result) => {
        if (result.user) {
          axiosPublic
            .post("/users", userDetails)
            .then((res) => {
              if (res.data.insertedId) {
                reset();
                navigate("/dashboard");
                Swal.fire({
                  position: "center",
                  icon: "success",
                  title: `${userInfo.name}Register Successful`,
                  showConfirmButton: false,
                  timer: 1500,
                });
              } else {
                Swal.fire({
                  position: "center",
                  icon: "error",
                  title: `Database Error`,
                  showConfirmButton: false,
                  timer: 1500,
                });
              }
            })
            .catch((err) => {
              Swal.fire({
                position: "center",
                icon: "error",
                title: `Error`,
                text: err.message,
                showConfirmButton: false,
                timer: 2500,
              });
            });
        }
      })
      .catch((error) => {
        Swal.fire({
          position: "center",
          icon: "error",
          title: `Register unsuccessful`,
          text: error.message,
          showConfirmButton: false,
          timer: 2500,
        });
       
      });
  };
  return (
    <section
      style={{
        backgroundImage: `url(${bg})`,
      }}
      className="w-full bg-no-repeat bg-cover flex items-center justify-center min-h-screen"
    >
      <HelmetTitle pageTitle={"Register"} />
      <div
        style={{
          backgroundImage: `url(${bg})`,
        }}
        className="grid grid-cols-1 lg:grid-cols-2 justify-center items-center w-4/5 mx-auto bg-no-repeat bg-cover shadow-2xl"
      >
        <div className="my-12 space-y-6">
          <h1 className="font-Inter font-bold text-40 leading-48 text-color2 text-center">
            Register
          </h1>
          {/* Form */}
          <div className="w-2/3 mx-auto space-y-2">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="card-body text-xl "
            >
              <fieldset className="fieldset  space-y-3">
                {/* Name */}
                <div className=" space-y-2">
                  <label className="fieldset-label font-Inter font-semibold text-xl leading-6">
                    Name*
                  </label>
                  <input
                    type="text"
                    className="w-full input input-bordered bg-white font-Inter text-xl rounded-md p-3 text-color4"
                    placeholder="Type here...."
                    {...register("name", { require: true })}
                    required
                  />
                  {errors.name && (
                    <span className="text-red-600">Name is required</span>
                  )}
                </div>
                {/* Email */}
                <div className="w-full space-y-2">
                  <label className="fieldset-label font-Inter font-semibold text-xl leading-6">
                    Email*
                  </label>
                  <input
                    type="email"
                    placeholder="Type here...."
                    {...register("email", { require: true })}
                    className="w-full input input-bordered bg-white font-Inter text-xl rounded-md p-3 text-color4"
                    required
                  />
                  {errors.email && (
                    <span className="text-red-600">Email is required</span>
                  )}
                </div>
                {/* Profile URL */}
                <div className="w-full space-y-2">
                  <label className="fieldset-label font-Inter font-semibold text-xl leading-6">
                    Profile URL*
                  </label>
                  <input
                    type="url"
                    placeholder="Type here...."
                    {...register("profileURL", { require: true })}
                    className="w-full input input-bordered bg-white font-Inter text-xl rounded-md p-3 text-color4"
                    required
                  />
                  {errors.profileURL && (
                    <span className="text-red-600">
                      Profile URL is required
                    </span>
                  )}
                </div>
                {/* Password */}
                <div className="w-full space-y-2">
                  <label className="fieldset-label font-Inter font-semibold text-xl leading-6">
                    Password*
                  </label>
                  <input
                    type="password"
                    placeholder="Enter your password"
                    {...register("password", {
                      required: "Password is required",
                      // pattern: {
                      //   value:
                      //     /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                      //   message:
                      //     "Password must contain at least one uppercase letter, one lowercase letter, one number, one special character, and be at least 8 characters long",
                      // },
                    })}
                    className="w-full input input-bordered bg-white font-Inter text-xl rounded-md p-3 text-color4"
                  />
                  {errors.password && (
                    <span className="text-red-600">
                      {errors.password.message}
                    </span>
                  )}
                </div>
                {/* User Role */}
                <div className="w-full space-y-2">
                  <label className="fieldset-label font-Inter font-semibold text-xl leading-6">
                    User Role*
                  </label>
                  <select
                    {...register("userRole", { require: true })}
                    className="w-full bg-white font-Inter text-xl rounded-md p-3 text-color4"
                  >
                    <option value="worker" className="font-Inter">
                      Worker
                    </option>
                    <option value="buyer" className="font-Inter">
                      Buyer
                    </option>
                  </select>
                  {errors.password && (
                    <span className="text-red-600">
                      {errors.password.message}
                    </span>
                  )}
                </div>
                <input
                  type="submit"
                  value={"Register"}
                  className="bg-color1 font-Inter font-bold text-2xl text-white rounded-lg py-2"
                />
              </fieldset>
            </form>
          </div>
          <div className="text-center space-y-2 font-Inter">
            <p className="font-Inter text-color3 text-xl">
              <span className="font-medium">Already registered? </span>
              <span>
                <Link to={"/login"} className="font-bold ">
                  Go to Login
                </Link>
              </span>
            </p>
          </div>
        </div>
        <figure>
          <img src={authentication2} alt="" />
        </figure>
      </div>
    </section>
  );
};

export default Register;
