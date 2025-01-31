import { Link } from "react-router-dom";
import useGetallTask from "./../../Hooks/useGetallTask";
import SectionHeading from "../SectionHeading";
const FeaturedTasks = () => {
  const [tasks] = useGetallTask();
  const availableTask = tasks.filter((task) => task.requiredWorkers > 0);
  const topPayingTask = availableTask.sort(
    (a, b) => b.payableAmount - a.payableAmount
  );
  // console.log(topPayingTask);
  return (
    <section className="lg:w-10/12 mx-auto space-y-5">
      <SectionHeading
        title={"Featured Tasks"}
        subtitle={"---Top Paying & Trending Tasks---"}
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 items-center justify-center">
        {topPayingTask.map((task) => (
          <div
            key={task._id}
            className="rounded-xl p-6 space-y-3 shadow-2xl bg-color6 hover:scale-105 transition-all"
          >
            <figure className="rounded-xl h-[250px]">
              <img
                className="w-full h-full rounded-xl"
                src={task?.taskImageURL}
                alt={task?.taskTitle}
              />
            </figure>

            <p>
              <strong>Task Title :</strong> {task?.taskTitle}
            </p>
            <p>
              <strong>Buyer Name :</strong> {task?.buyerName}
            </p>
            <p>
              <strong>Completion Date :</strong> {task?.completionDate}
            </p>
            <p>
              <strong>Payable Amount :</strong> {task?.payableAmount}
            </p>
            <p>
              <strong>Required Workers :</strong> {task?.requiredWorkers}
            </p>
            <Link to={`/dashboard/workerTaskList/${task?._id}`}>
              <button className="px-4 py-3 rounded-xl bg-amber-300 text-xl">
                View Details
              </button>
            </Link>
          </div>
        ))}
      </div>
      <div className="flex items-center justify-center py-5">
        <Link to={`/dashboard/workerTaskList`}>
          <button className="px-4 py-3 lg:px-10 lg:py-3 rounded-xl bg-color1 hover:bg-color2 text-white text-xl shadow-2xl">
            See More
          </button>
        </Link>
      </div>
    </section>
  );
};

export default FeaturedTasks;
