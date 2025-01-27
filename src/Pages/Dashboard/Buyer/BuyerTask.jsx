import { FaPen, FaRegTrashAlt } from "react-icons/fa";
import SectionHeading from "../../../Components/SectionHeading";
import useAuth from "../../../Hooks/useAuth";
import useGetallTask from "../../../Hooks/useGetallTask";

const BuyerTask = () => {
  const [tasks] = useGetallTask();
  const { user } = useAuth();

  const currentUserTasks = tasks.filter(
    (task) => task?.buyerEmail === user?.email
  );

  const handleUpdateTask = (id) => {
    console.log(id);
  };
  const handleDeleteTask = (id) => {
    console.log(id);
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
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {/* tasks */}
              {currentUserTasks.map((task, index) => (
                <tr key={task._id} className="text-center text-20 font-medium">
                  <th>{index + 1}</th>
                  <th>{task.taskTitle}</th>
                  <th>{task.taskDetail}</th>
                  <th>{task.completionDate}</th>
                  <th>{task.requiredWorkers}</th>
                  <th>{task.payableAmount}</th>
                  <th className="flex items-center justify-center gap-1">
                    <button
                      onClick={() => handleUpdateTask(task._id)}
                      className="bg-color1 text-white p-4 rounded-md text-2xl"
                    >
                      <FaPen />
                    </button>
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
