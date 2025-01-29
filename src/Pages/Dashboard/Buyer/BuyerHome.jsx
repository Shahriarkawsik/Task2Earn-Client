import submitImg from "../../../assets/submitImg.png";
import pendingImg from "../../../assets/pendingImg.png";
import coin from "../../../assets/coin.png";
import useGetallTask from "../../../Hooks/useGetallTask";
import useAuth from "../../../Hooks/useAuth";
import useGetAllSubmission from "../../../Hooks/useGetAllSubmission";
import Swal from "sweetalert2";
import useGetAllUser from "../../../Hooks/useGetAllUser";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const BuyerHome = () => {
  const [tasks, taskRefetch] = useGetallTask();
  const { user } = useAuth();
  const [submissions] = useGetAllSubmission();
  const [users, refetch] = useGetAllUser();
  const axiosSecure = useAxiosSecure();
  const currentUserTaskSubmission = submissions.filter(
    (submit) =>
      submit?.buyerEmail === user?.email && submit.status === "pending"
  );

  const currentUserTasks = tasks.filter(
    (task) => task?.buyerEmail === user?.email
  );
  const pendingTask = currentUserTasks.reduce(
    (total, task) => total + parseInt(task.requiredWorkers),
    0
  );
  const totalPayment = currentUserTasks.reduce(
    (total, task) => total + parseInt(task.totalPayableAmount),
    0
  );
  // View Submission
  const handleViewSubmission = (submissionDetails) => {
    Swal.fire({
      text: submissionDetails,
    });
  };
  const handleApproveTask = (id) => {
    const [submittedTask] = submissions.filter((submit) => submit?._id === id);
    const { workerEmail, payableAmount } = submittedTask;
    const [{ _id, userAvailableCoin, userRole }] = users.filter(
      (user) => user?.userEmail === workerEmail
    );

    // update Submission Status
    axiosSecure
      .patch(`/submissions/${id}`, { status: "approved" })
      .then((res) => {
        if (res.data) {
          // increase worker coin
          refetch();
          axiosSecure
            .patch(`/users/${_id}`, {
              userAvailableCoin:
                parseInt(userAvailableCoin) + parseInt(payableAmount),
              userRole: userRole,
            })
            .then((res) => {
              if (res.data) {
                refetch();
                Swal.fire({
                  position: "center",
                  icon: "success",
                  title: "Status Update Successful",
                  showConfirmButton: false,
                  timer: 1500,
                });
              }
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
  const handleRejectTask = (id) => {
    const [{ taskId }] = submissions.filter((submit) => submit?._id === id);
    const [{ _id, requiredWorkers, taskTitle, taskDetail, submissionInfo }] =
      tasks.filter((submit) => submit?._id === taskId);

    // update submission Status
    axiosSecure
      .patch(`/submissions/${id}`, { status: "reject" })
      .then((res) => {
        if (res.data) {
          taskRefetch();
          // increase require worker
          axiosSecure
            .patch(`/tasks/${_id}`, {
              taskTitle: taskTitle,
              taskDetail: taskDetail,
              submissionInfo: submissionInfo,
              requiredWorkers: parseInt(requiredWorkers) + 1,
            })
            .then((res) => {
              if (res.data) {
                taskRefetch();
                Swal.fire({
                  position: "center",
                  icon: "success",
                  title: "Successfully Rejected The Task",
                  showConfirmButton: false,
                  timer: 1500,
                });
              }
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
    <section className="py-5">
      <h1 className="font-Cinzel font-semibold text-20 leading-11 text-color3">
        Hi, Welcome Back!
      </h1>
      {/* cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
        {/* ** Total Task Count */}
        <div className="bg-gradient-to-r from-[#BB34F5] to-[#FCDCFF] rounded-lg flex justify-center items-center gap-6 py-9">
          <img className="w-20" src={submitImg} alt="" />
          <div className="text-center">
            <p className="font-Inter font-extrabold text-40 leading-12">
              {currentUserTasks?.length || 0}
            </p>
            <p className="text-2xl leading-7">Total Submission Task</p>
          </div>
        </div>
        {/* Total pending Task */}
        <div className="bg-gradient-to-r from-[#d3a256] to-[#fde8c0] rounded-lg flex justify-center items-center gap-6 py-9">
          <img className="w-20" src={pendingImg} alt="" />
          <div className="text-center">
            <p className="font-Inter font-extrabold text-40 leading-12">
              {pendingTask || 0}
            </p>
            <p className="text-2xl leading-7">Pending Task</p>
          </div>
        </div>
        {/* Total Payment */}
        <div className="bg-gradient-to-r from-[#fe4880] to-[#fecde9] rounded-lg flex justify-center items-center gap-6 py-9">
          <img className="w-20 rounded-full" src={coin} alt="" />
          <div className="text-center">
            <p className="font-Inter font-extrabold text-40 leading-12">
              {totalPayment || 0}
            </p>
            <p className="text-2xl leading-7">Total Payment</p>
          </div>
        </div>
      </div>
      {/* pending task */}
      {currentUserTaskSubmission.length ? (
        <div className="m-12 bg-white lg:w-11/12 mx-auto p-6 space-y-4">
          <h1 className="font-Cinzel font-bold text-3xl leading-11 text-color3">
            Total Pending Task: {currentUserTaskSubmission.length}
          </h1>
          <div className="overflow-x-auto">
            <table className="table table-zebra">
              {/* head */}
              <thead className="bg-color1 text-white text-xl font-bold">
                <tr className="text-center">
                  <th></th>
                  <th>Task Title</th>
                  <th>Worker Name</th>
                  <th>Payable Amount</th>
                  <th>
                    <button>View Submission</button>
                  </th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {/* tasks */}
                {currentUserTaskSubmission.map((submission, index) => (
                  <tr
                    key={submission._id}
                    className="text-center text-20 font-medium"
                  >
                    <th>{index + 1}</th>
                    <th>{submission.taskTitle}</th>
                    <th>{submission.workerName}</th>
                    <th>{submission.payableAmount}</th>
                    <th>
                      <button
                        className="bg-color1 text-white px-4 py-1 rounded-md "
                        onClick={() =>
                          handleViewSubmission(submission.submissionDetails)
                        }
                      >
                        View Submission
                      </button>
                    </th>
                    {/* action */}
                    <th className="flex items-center justify-center gap-1">
                      <button
                        onClick={() => handleApproveTask(submission._id)}
                        className="bg-green-700 text-white px-4 py-1 rounded-md "
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => handleRejectTask(submission._id)}
                        className="bg-red-600 text-white px-4 py-1 rounded-md "
                      >
                        Reject
                      </button>
                    </th>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="m-12 bg-white lg:w-11/12 mx-auto p-6 space-y-4">
          <h1 className="font-Cinzel font-bold text-3xl leading-11 text-color3 text-center">
            No pending data available.
          </h1>
        </div>
      )}
    </section>
  );
};

export default BuyerHome;
