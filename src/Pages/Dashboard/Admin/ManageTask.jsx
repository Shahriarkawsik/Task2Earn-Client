import { FaRegTrashAlt } from "react-icons/fa";
import SectionHeading from "../../../Components/SectionHeading";
import useGetallTask from "./../../../Hooks/useGetallTask";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const ManageTask = () => {
  const [tasks, refetch] = useGetallTask();
  const axiosSecure = useAxiosSecure();
  const handleDeleteTask = (id) => {
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
        axiosSecure
          .delete(`/tasks/${id}`)
          .then((res) => {
            if (res.data.deletedCount) {
              refetch();
              Swal.fire({
                title: "Deleted!",
                text: "Your file has been deleted.",
                icon: "success",
                position: "center",
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
      }
    });
  };
  return (
    <section className="bg-[#f6f6f6] min-h-screen">
      <SectionHeading
        title={"MANAGE ALL TASK"}
        subtitle={"---How to do??---"}
      />
      <div className="m-12 bg-white lg:w-11/12 mx-auto p-6 space-y-4">
        <h1 className="font-Cinzel font-bold text-3xl leading-11 text-color3">
          Total Available Task: {tasks.length}
        </h1>
        <div className="overflow-x-auto">
          <table className="table table-zebra">
            {/* head */}
            <thead className="bg-color1 text-white text-xl font-bold">
              <tr className="text-center">
                <th></th>
                <th>Task Name</th>
                <th>Description</th>
                <th>Due Date</th>
                <th>Buyer Email</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {/* tasks */}
              {tasks.map((task, index) => (
                <tr key={task._id} className="text-center">
                  <th>{index + 1}</th>
                  <th>{task.taskTitle}</th>
                  <th>{task.taskDetail}</th>
                  <th>{task.completionDate}</th>
                  <th>{task.buyerEmail}</th>
                  <th
                    className={`${
                      task?.taskStatus === "pending"
                        ? "text-red-600"
                        : task?.taskStatus === "onProgress"
                        ? "text-yellow-500"
                        : "text-green-600"
                    }`}
                  >
                    {task.taskStatus}
                  </th>
                  <th className="flex items-center justify-center gap-1">
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

export default ManageTask;
