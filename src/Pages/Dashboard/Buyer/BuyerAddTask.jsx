import { useForm } from "react-hook-form";
import SectionHeading from "./../../../Components/SectionHeading";
import useCalculateCoin from "../../../Hooks/useCalculateCoin";
import { useNavigate } from "react-router-dom";
import useAxiosSecure from "./../../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";
import useAuth from "../../../Hooks/useAuth";

const BuyerAddTask = () => {
  const [currentUser] = useCalculateCoin();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (taskDetails) => {
    const taskInfo = {
      payableAmount: taskDetails.payableAmount,
      requiredWorkers: taskDetails.requiredWorkers,
      completionDate: taskDetails.completionDate,
      detailDescription: taskDetails.detailDescription,
      submissionInfo: taskDetails.submissionInfo,
      taskDetail: taskDetails.taskDetail,
      taskImageURL: taskDetails.taskImageURL,
      taskTitle: taskDetails.taskTitle,
      totalPayableAmount:
        taskDetails.requiredWorkers * taskDetails.payableAmount,
      buyerEmail: user.email,
      buyerName: user.displayName,
    };

    if (
      taskDetails.requiredWorkers * taskDetails.payableAmount <
      currentUser?.userAvailableCoin
    ) {
      axiosSecure
        .post("/tasks", taskInfo)
        .then((res) => {
          if (res.data) {
            // task add successful হলে user এর available coin মাইনাস করতে হবে ।
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
      <SectionHeading title={"ADD A task"} subtitle={`---What's new?---`} />

      <div className="m-12 bg-white lg:w-11/12 mx-auto p-6 space-y-4">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-4 grid grid-cols-1 lg:grid-cols-2 lg:gap-6"
        >
          {/*  Task Title */}
          <div className=" space-y-2">
            <label className="fieldset-label font-Inter font-semibold text-xl leading-6">
              Task Title*
            </label>
            <input
              type="text"
              className="w-full input input-bordered bg-white font-Inter text-xl rounded-md p-3 text-color4"
              placeholder="Type here...."
              {...register("taskTitle", { require: true })}
              required
            />
            {errors.taskTitle && (
              <span className="text-red-600">Task Title is required</span>
            )}
          </div>
          {/* Task Detail */}
          <div className=" space-y-2">
            <label className="fieldset-label font-Inter font-semibold text-xl leading-6">
              Task Detail*
            </label>
            <input
              type="text"
              className="w-full input input-bordered bg-white font-Inter text-xl rounded-md p-3 text-color4"
              placeholder="Type here...."
              {...register("taskDetail", { require: true })}
              required
            />
            {errors.taskDetail && (
              <span className="text-red-600">Task Detail is required</span>
            )}
          </div>
          {/* Detail Description*/}
          <div className=" space-y-2">
            <label className="fieldset-label font-Inter font-semibold text-xl leading-6">
              Detail Description*
            </label>
            <input
              type="text"
              className="w-full input input-bordered bg-white font-Inter text-xl rounded-md p-3 text-color4"
              placeholder="Type here...."
              {...register("detailDescription", { require: true })}
              required
            />
            {errors.detailDescription && (
              <span className="text-red-600">
                Detail Description is required
              </span>
            )}
          </div>
          {/* Required Workers*/}
          <div className=" space-y-2">
            <label className="fieldset-label font-Inter font-semibold text-xl leading-6">
              Required Workers*
            </label>
            <input
              type="number"
              className="w-full input input-bordered bg-white font-Inter text-xl rounded-md p-3 text-color4"
              placeholder="Type here...."
              {...register("requiredWorkers", { require: true })}
              required
            />
            {errors.requiredWorkers && (
              <span className="text-red-600">Required Workers is required</span>
            )}
          </div>
          {/* Payable Amount*/}
          <div className=" space-y-2">
            <label className="fieldset-label font-Inter font-semibold text-xl leading-6">
              Payable Amount*
            </label>
            <input
              type="number"
              className="w-full input input-bordered bg-white font-Inter text-xl rounded-md p-3 text-color4"
              placeholder="Type here...."
              {...register("payableAmount", { require: true })}
              required
            />
            {errors.payableAmount && (
              <span className="text-red-600">Payable Amount is required</span>
            )}
          </div>
          {/* Completion Date*/}
          <div className=" space-y-2">
            <label className="fieldset-label font-Inter font-semibold text-xl leading-6">
              Completion Date*
            </label>
            <input
              type="date"
              className="w-full input input-bordered bg-white font-Inter text-xl rounded-md p-3 text-color4"
              placeholder="Type here...."
              {...register("completionDate", { require: true })}
              required
            />
            {errors.completionDate && (
              <span className="text-red-600">Completion Date is required</span>
            )}
          </div>
          {/* Submission Info*/}
          <div className=" space-y-2">
            <label className="fieldset-label font-Inter font-semibold text-xl leading-6">
              Submission Info*
            </label>
            <input
              type="text"
              className="w-full input input-bordered bg-white font-Inter text-xl rounded-md p-3 text-color4"
              placeholder="Type here...."
              {...register("submissionInfo", { require: true })}
              required
            />
            {errors.submissionInfo && (
              <span className="text-red-600">Submission Info is required</span>
            )}
          </div>
          {/* Task ImageURL  */}
          {/* ToDo: input file হবে */}
          <div className=" space-y-2">
            <label className="fieldset-label font-Inter font-semibold text-xl leading-6">
              Task ImageURL*
            </label>
            <input
              type="url"
              className="w-full input input-bordered bg-white font-Inter text-xl rounded-md p-3 text-color4"
              placeholder="Type here...."
              {...register("taskImageURL", { require: true })}
              required
            />
            {errors.taskImageURL && (
              <span className="text-red-600">Task ImageURL is required</span>
            )}
          </div>
          <input
            type="submit"
            value={"Add Task"}
            className="bg-color1 font-Inter font-bold text-2xl text-white rounded-lg py-2 col-span-2"
          />
        </form>
      </div>
    </section>
  );
};

export default BuyerAddTask;
