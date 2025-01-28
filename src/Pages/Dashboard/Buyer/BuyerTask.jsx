import { FaPen, FaRegTrashAlt } from "react-icons/fa";
import SectionHeading from "../../../Components/SectionHeading";
import useAuth from "../../../Hooks/useAuth";
import useGetallTask from "../../../Hooks/useGetallTask";
import { Link } from "react-router-dom";
import useAxiosSecure from "./../../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";
import useCalculateCoin from "../../../Hooks/useCalculateCoin";

const BuyerTask = () => {
  const [tasks, refetch] = useGetallTask();
  const { user } = useAuth();
  const [currentUser] = useCalculateCoin();
  const axiosSecure = useAxiosSecure();

  const currentUserTasks = tasks.filter(
    (task) => task?.buyerEmail === user?.email
  );
  const sortedTasks = currentUserTasks.sort((a, b) => {
    const dateA = new Date(a.completionDate);
    const dateB = new Date(b.completionDate);
    return dateB - dateA;
  });

  const handleDeleteTask = (id) => {
    const [selectedTask] = currentUserTasks.filter((task) => task?._id === id);
    const { totalPayableAmount, taskStatus } = selectedTask;

    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        // pending task
        if (taskStatus === "pending" || taskStatus === "onProgress") {
          axiosSecure
            .patch(`/users/${currentUser._id}`, {
              userRole: currentUser.userRole,
              userAvailableCoin:
                currentUser.userAvailableCoin + totalPayableAmount,
            })
            .then((res) => {
              if (res.data) {
                axiosSecure.delete(`/tasks/${id}`).then((res) => {
                  if (res.data) {
                    refetch();
                    Swal.fire({
                      title: "Deleted!",
                      text: "Your file has been deleted.",
                      icon: "success",
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
        }
        //completed Task
        else {
          axiosSecure
            .delete(`/tasks/${id}`)
            .then((res) => {
              if (res.data) {
                refetch();
                Swal.fire({
                  title: "Deleted!",
                  text: "Your file has been deleted.",
                  icon: "success",
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
        }
      }
    });
  };
  return (
    <section className="bg-[#f6f6f6] min-h-screen">
      <SectionHeading title={"My Task's"} subtitle={"---How to do??---"} />
      <div className="m-12 bg-white lg:w-11/12 mx-auto p-6 space-y-4">
        <h1 className="font-Cinzel font-bold text-3xl leading-11 text-color3">
          Total Available Task: {currentUserTasks.length}
        </h1>
        <div className="overflow-x-auto">
          <table className="table table-zebra">
            {/* head */}
            <thead className="bg-color1 text-white text-xl font-bold">
              <tr className="text-center">
                <th></th>
                <th>Task Name</th>
                <th>Description</th>
                <th>Completion Date</th>
                <th>Required Workers</th>
                <th>Payable Amount </th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {/* tasks */}
              {sortedTasks.map((task, index) => (
                <tr key={task._id} className="text-center text-20 font-medium">
                  <th>{index + 1}</th>
                  <th>{task.taskTitle}</th>
                  <th>{task.taskDetail}</th>
                  <th>{task.completionDate}</th>
                  <th>{task.requiredWorkers}</th>
                  <th>{task.payableAmount}</th>
                  <th
                    className={`${
                      task.taskStatus === "pending"
                        ? "text-red-600"
                        : task.taskStatus === "onProgress"
                        ? "text-yellow-500"
                        : "text-green-600" //Completed Color
                    }`}
                  >
                    {task.taskStatus}
                  </th>
                  <th className="flex items-center justify-center gap-1">
                    <Link to={`/dashboard/buyerUpdateTask/${task._id}`}>
                      <button className="bg-color1 text-white p-4 rounded-md text-2xl">
                        <FaPen />
                      </button>
                    </Link>
                    <button
                      onClick={() => handleDeleteTask(task._id)}
                      className="bg-color1 text-white p-4 rounded-md text-2xl"
                    >
                      <FaRegTrashAlt />
                    </button>
                  </th>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default BuyerTask;
