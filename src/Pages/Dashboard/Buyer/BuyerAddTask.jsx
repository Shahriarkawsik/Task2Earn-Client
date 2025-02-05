import { useForm } from "react-hook-form";
import SectionHeading from "./../../../Components/SectionHeading";
import useCalculateCoin from "../../../Hooks/useCalculateCoin";
import { useNavigate } from "react-router-dom";
import useAxiosSecure from "./../../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";
import useAuth from "../../../Hooks/useAuth";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import HelmetTitle from "../../../Components/HelmetTitle";

const imageHostingKey = import.meta.env.VITE_IMAGEBB_HOSTING_KEY;
const imageHostingAPI = `https://api.imgbb.com/1/upload?key=${imageHostingKey}`;

const BuyerAddTask = () => {
  const [currentUser] = useCalculateCoin();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();
  const axiosPublic = useAxiosPublic();
  const { user } = useAuth();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (taskDetails) => {
    // Image
    const imageFile = { image: taskDetails.taskImageURL[0] };
    const res = await axiosPublic.post(imageHostingAPI, imageFile, {
      headers: {
        "content-type": "multipart/form-data",
      },
    });

    // Form থেকে পাওয়া data
    const taskInfo = {
      payableAmount: taskDetails.payableAmount,
      requiredWorkers: taskDetails.requiredWorkers,
      completionDate: taskDetails.completionDate,
      submissionInfo: taskDetails.submissionInfo,
      taskDetail: taskDetails.taskDetail,
      taskImageURL: res.data.data.display_url,
      taskTitle: taskDetails.taskTitle,
      taskStatus: "pending",
      totalPayableAmount:
        taskDetails.requiredWorkers * taskDetails.payableAmount,
      buyerEmail: user.email,
      buyerName: user.displayName,
    };

    // check user current coin
    if (
      taskDetails.requiredWorkers * taskDetails.payableAmount <
      currentUser?.userAvailableCoin
    ) {
      axiosSecure
        .post("/tasks", taskInfo)
        .then((res) => {
          if (res.data) {
            axiosSecure.patch(`/users/${currentUser._id}`, {
              userRole: currentUser.userRole,
              userAvailableCoin:
                currentUser?.userAvailableCoin -
                taskDetails.requiredWorkers * taskDetails.payableAmount,
            });
            reset();
            Swal.fire({
              position: "center",
              icon: "success",
              title: "Successfully submitted",
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
    } else {
      Swal.fire({
        position: "center",
        icon: "error",
        title: `Submission Fail`,
        text: "Please Purchase coin",
        showConfirmButton: false,
        timer: 2500,
      });
      reset();
      navigate("/dashboard/buyerPurchaseCoin");
    }
  };

  return (
    <section className="bg-[#f6f6f6] min-h-screen">
      <SectionHeading title={"ADD A Task"} subtitle={`---What's new?---`} />
      <HelmetTitle pageTitle={"Add Task | Dashboard"} />
      <div className="m-4 sm:m-8 lg:m-12 bg-white max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 space-y-6">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4"
        >
          {/* Task Title */}
          <div className="space-y-3">
            <label className="font-semibold text-sm sm:text-base lg:text-lg">
              Task Title*
            </label>
            <input
              type="text"
              className="w-full input input-bordered bg-white text-sm sm:text-base lg:text-lg rounded-md p-2 sm:p-3"
              placeholder="Type here..."
              {...register("taskTitle", { require: true })}
              required
            />
            {errors.taskTitle && (
              <span className="text-red-600 text-sm">
                Task Title is required
              </span>
            )}
          </div>
          {/* Task Detail */}
          <div className="space-y-3">
            <label className="font-semibold text-sm sm:text-base lg:text-lg">
              Task Detail*
            </label>
            <input
              type="text"
              className="w-full input input-bordered bg-white text-sm sm:text-base lg:text-lg rounded-md p-2 sm:p-3"
              placeholder="Type here..."
              {...register("taskDetail", { require: true })}
              required
            />
            {errors.taskDetail && (
              <span className="text-red-600 text-sm">
                Task Detail is required
              </span>
            )}
          </div>

          {/* Required Workers */}
          <div className="space-y-3">
            <label className="font-semibold text-sm sm:text-base lg:text-lg">
              Required Workers*
            </label>
            <input
              type="number"
              className="w-full input input-bordered bg-white text-sm sm:text-base lg:text-lg rounded-md p-2 sm:p-3"
              placeholder="Type here..."
              {...register("requiredWorkers", { require: true })}
              required
            />
            {errors.requiredWorkers && (
              <span className="text-red-600 text-sm">
                Required Workers is required
              </span>
            )}
          </div>

          {/* Payable Amount */}
          <div className="space-y-3">
            <label className="font-semibold text-sm sm:text-base lg:text-lg">
              Payable Amount*
            </label>
            <input
              type="number"
              className="w-full input input-bordered bg-white text-sm sm:text-base lg:text-lg rounded-md p-2 sm:p-3"
              placeholder="Type here..."
              {...register("payableAmount", { require: true })}
              required
            />
            {errors.payableAmount && (
              <span className="text-red-600 text-sm">
                Payable Amount is required
              </span>
            )}
          </div>

          {/* Completion Date */}
          <div className="space-y-3">
            <label className="font-semibold text-sm sm:text-base lg:text-lg">
              Completion Date*
            </label>
            <input
              type="date"
              className="w-full input input-bordered bg-white text-sm sm:text-base lg:text-lg rounded-md p-2 sm:p-3"
              {...register("completionDate", { require: true })}
              required
            />
            {errors.completionDate && (
              <span className="text-red-600 text-sm">
                Completion Date is required
              </span>
            )}
          </div>

          {/* Submission Info */}
          <div className="space-y-3">
            <label className="font-semibold text-sm sm:text-base lg:text-lg">
              Submission Info*
            </label>
            <input
              type="text"
              className="w-full input input-bordered bg-white text-sm sm:text-base lg:text-lg rounded-md p-2 sm:p-3"
              placeholder="Type here..."
              {...register("submissionInfo", { require: true })}
              required
            />
            {errors.submissionInfo && (
              <span className="text-red-600 text-sm">
                Submission Info is required
              </span>
            )}
          </div>

          {/* Task Image URL */}
          <div className="space-y-3">
            <label className="fieldset-label font-Inter font-semibold text-xl leading-6">
              Image file*
            </label>
            <input
              type="file"
              className="file-input file-input-ghost"
              {...register("taskImageURL", { require: true })}
              required
            />
            {errors.taskImageURL && (
              <span className="text-red-600 text-sm">
                Task Image URL is required
              </span>
            )}
          </div>

          <input
            type="submit"
            value={"Add Task"}
            className="bg-blue-500 hover:bg-blue-600 text-white text-lg font-bold rounded-lg py-2 px-4 col-span-1 sm:col-span-2"
          />
        </form>
      </div>
    </section>
  );
};

export default BuyerAddTask;
