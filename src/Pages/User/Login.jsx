import { useForm } from "react-hook-form";
import HelmetTitle from "../../Components/HelmetTitle";
import bg from "../../assets/bgwood.png";
import authentication2 from "../../assets/login.png";
import useAuth from "../../Hooks/useAuth";
import { Link, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import Swal from "sweetalert2";

const Login = () => {
  const { signInUserWithEmail, createUserWithGoogle } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (userInfo) => {
    signInUserWithEmail(userInfo.email, userInfo.password)
      .then((result) => {
        if (result) {
          reset();
          navigate("/dashboard");
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Login Successful",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      })
      .catch((error) => {
        Swal.fire({
          position: "center",
          icon: "error",
          title: "Login unsuccessful",
          text: `${error.message}`,
          showConfirmButton: false,
          timer: 1500,
        });
      });
  };

  // Login with google
  const handleSignInWithGoogle = () => {
    createUserWithGoogle()
      .then((result) => {
        if (result) {
          const { displayName, email, photoURL } = result.user;

          // Redirect user to role selection
          navigate("/selectRole", {
            state: {
              userName: displayName,
              userEmail: email,
              userPhotoURL: photoURL,
            },
          });
        }
      })
      .catch((error) => {
        Swal.fire({
          position: "center",
          icon: "error",
          title: "Login Unsuccessful",
          text: `${error.message}`,
          showConfirmButton: false,
          timer: 1500,
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
      <HelmetTitle pageTitle={"Login"} />
      <div
        style={{
          backgroundImage: `url(${bg})`,
        }}
        className="grid grid-cols-1 lg:grid-cols-2 justify-center items-center w-4/5 mx-auto bg-no-repeat bg-cover shadow-2xl"
      >
        <figure>
          <img src={authentication2} alt="" />
        </figure>
        <div className="my-12 space-y-6">
          <h1 className="font-Inter font-bold text-40 leading-48 text-color2 text-center">
            Login
          </h1>
          {/* Form */}
          <div className="w-2/3 mx-auto space-y-2">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="card-body text-xl "
            >
              <fieldset className="fieldset  space-y-3">
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
                <input
                  type="submit"
                  value={"Login"}
                  className="bg-color1 font-Inter font-bold text-2xl text-white rounded-lg py-2"
                />
              </fieldset>
            </form>
          </div>
          <div className="text-center space-y-2 font-Inter">
            <p className="font-Inter text-color3 text-xl">
              <span className="font-medium">New here? </span>
              <span>
                <Link to={"/register"} className="font-bold ">
                  Create a New Account
                </Link>
              </span>
            </p>
            <p className="font-medium text-xl text-color2.5">Or sign in with</p>
            <div>
              <button
                onClick={handleSignInWithGoogle}
                className="border rounded-full p-1 bg-color7 border-color2.7"
              >
                <FcGoogle className="text-2xl" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
