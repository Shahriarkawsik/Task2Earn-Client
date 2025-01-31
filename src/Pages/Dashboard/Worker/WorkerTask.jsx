import { Link } from "react-router-dom";
import SectionHeading from "../../../Components/SectionHeading";
import useGetallTask from "../../../Hooks/useGetallTask";
import HelmetTitle from "../../../Components/HelmetTitle";

const WorkerTask = () => {
  const [tasks] = useGetallTask();
  const availableTask = tasks.filter((task) => task.requiredWorkers > 0);

  return (
    <section className="bg-[#f6f6f6] min-h-screen">
      <HelmetTitle pageTitle={"Task List | Dashboard"} />
      <SectionHeading title={"My Task"} subtitle={"---How to do??---"} />
      <div className="m-12 bg-white lg:w-11/12 mx-auto p-6 space-y-4 rounded-xl">
        <h1 className="font-Cinzel font-bold text-3xl leading-11 text-color3 ">
          Total Available Task: {tasks.length}
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 items-center justify-center">
          {availableTask.map((task) => (
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
              <Link to={task?._id}>
                <button className="px-4 py-3 rounded-xl bg-amber-300 text-xl">
                  View Details
                </button>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WorkerTask;
