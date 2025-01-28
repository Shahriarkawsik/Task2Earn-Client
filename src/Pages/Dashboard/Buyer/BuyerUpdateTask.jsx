import { useForm } from "react-hook-form";
import SectionHeading from "./../../../Components/SectionHeading";
import { useNavigate, useParams } from "react-router-dom";
import useAxiosSecure from "./../../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";
import useGetallTask from "./../../../Hooks/useGetallTask";

const BuyerUpdateTask = () => {
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const [tasks, refetch] = useGetallTask();
  const { id } = useParams();
  const [task] = tasks.filter((task) => task._id === id);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (taskDetails) => {
    const taskInfo = {
      taskTitle: taskDetails.taskTitle,
      submissionInfo: taskDetails.submissionInfo,
      taskDetail: taskDetails.taskDetail,
    };

    axiosSecure
      .patch(`/tasks/${id}`, taskInfo)
      .then((res) => {
        if (res.data) {
          reset();
          refetch();
          navigate("dashboard/buyerTask");
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Update Successful",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      })
      .catch((err) => {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Update Unsuccessful",
          text: err.message,
          showConfirmButton: false,
          timer: 1500,
        });
      });
  };

  return (
    <section className="bg-[#f6f6f6] min-h-screen">
      <SectionHeading title={"Update A Task"} subtitle={`---What's new?---`} />

      <div className="m-4 sm:m-8 lg:m-12 bg-white max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 space-y-6">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4"
        >
          {/* Task Title */}
          <div className="space-y-2">
            <label className="font-semibold text-sm sm:text-base lg:text-lg">
              Task Title*
            </label>
            <input
              defaultValue={task?.taskTitle}
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
          <div className="space-y-2">
            <label className="font-semibold text-sm sm:text-base lg:text-lg">
              Task Detail*
            </label>
            <input
              type="text"
              defaultValue={task?.taskDetail}
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
          <div className="space-y-2">
            <label className="font-semibold text-sm sm:text-base lg:text-lg">
              Required Workers*
            </label>
            <input
              defaultValue={task?.requiredWorkers}
              readOnly
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
          <div className="space-y-2">
            <label className="font-semibold text-sm sm:text-base lg:text-lg">
              Payable Amount*
            </label>
            <input
              type="number"
              defaultValue={task?.payableAmount}
              readOnly
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
          <div className="space-y-2">
            <label className="font-semibold text-sm sm:text-base lg:text-lg">
              Completion Date*
            </label>
            <input
              type="date"
              defaultValue={task?.completionDate}
              readOnly
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
          <div className="space-y-2">
            <label className="font-semibold text-sm sm:text-base lg:text-lg">
              Submission Info*
            </label>
            <input
              type="text"
              defaultValue={task?.submissionInfo}
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
          <div className="space-y-2">
            <label className="font-semibold text-sm sm:text-base lg:text-lg">
              Task Image URL*
            </label>
            <input
              type="url"
              defaultValue={task?.taskImageURL}
              readOnly
              className="w-full input input-bordered bg-white text-sm sm:text-base lg:text-lg rounded-md p-2 sm:p-3"
              placeholder="Type here..."
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
            value={"Update Task"}
            className="bg-blue-500 hover:bg-blue-600 text-white text-lg font-bold rounded-lg py-2 px-4 col-span-1 sm:col-span-2"
          />
        </form>
      </div>
    </section>
  );
};

export default BuyerUpdateTask;
