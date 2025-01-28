import { useNavigate, useParams } from "react-router-dom";
import useGetallTask from "./../../../Hooks/useGetallTask";
import { useForm } from "react-hook-form";
import useCalculateCoin from "../../../Hooks/useCalculateCoin";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import Swal from "sweetalert2";

const AvailableTaskDetails = () => {
  const { id } = useParams();
  const [tasks, refetch] = useGetallTask();
  const [task] = tasks.filter((task) => task._id === id);
  const [currentUser] = useCalculateCoin();
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const currentDate = `${new Date().getDate()}-${
    new Date().getMonth() + 1
  }-${new Date().getFullYear()}`;

  const onSubmit = (userInfo) => {
    const submissionInfo = {
      taskId: task?._id,
      taskTitle: task?.taskTitle,
      payableAmount: task?.payableAmount,
      workerEmail: currentUser?.userEmail,
      workerName: currentUser?.userName,
      buyerName: task?.buyerName,
      buyerEmail: task?.buyerEmail,
      submissionDetails: userInfo?.submissionDetails,
      submissionDate: currentDate,
      status: "pending",
    };

    axiosPublic
      .post("/submissions", submissionInfo)
      .then((res) => {
        if (res.data) {
          reset();
          refetch();
          navigate("/dashboard/workerTaskList");
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
          title: "Error",
          text: err.message,
          showConfirmButton: false,
          timer: 1500,
        });
      });
  };

  return (
    <section className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-10 font-Inter space-y-3">
      <h1 className="text-2xl font-bold text-color3 ">{task?.taskTitle}</h1>
      <img
        src={task?.taskImageURL}
        alt={task?.taskTitle}
        className="w-full h-64 object-cover rounded-lg "
      />
      <p className="text-color3 ">
        <strong>Description:</strong> {task?.taskDetail}
      </p>
      <p className="text-color3 ">
        <strong>Payable Amount:</strong> ${task?.payableAmount} per worker
      </p>
      <p className="text-color3 ">
        <strong>Required Workers:</strong> {task?.requiredWorkers}
      </p>
      <p className="text-color3 ">
        <strong>Buyer:</strong> {task?.buyerName} ({task?.buyerEmail})
      </p>
      <p className="text-color3 ">
        <strong>Completion Date:</strong> {task?.completionDate}
      </p>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-gray-50 p-4 rounded-lg shadow-md space-y-3"
      >
        <label
          htmlFor="submissionDetails"
          className="block text-color3 font-medium "
        >
          Submission Details:
        </label>
        <div>
          <textarea
            id="submissionDetails"
            placeholder="Enter your submission details here..."
            required
            style={{
              resize: "none",
            }}
            {...register("submissionDetails", { require: true })}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-300 "
          />
          {errors.submissionDetails && (
            <span className="text-red-600">
              Submission Details URL is required
            </span>
          )}
        </div>
        <div className="text-center">
          <button
            type="submit"
            className="w-1/3 mx-auto p-3 text-color3 bg-color5 font-bold rounded-lg"
          >
            Submit
          </button>
        </div>
      </form>
    </section>
  );
};

export default AvailableTaskDetails;
