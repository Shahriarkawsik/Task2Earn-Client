import { Link } from "react-router-dom";
import SectionHeading from "../../../Components/SectionHeading";
import useGetallTask from "../../../Hooks/useGetallTask";

const WorkerTask = () => {
  const [tasks] = useGetallTask();
  const availableTask = tasks.filter((task) => task.requiredWorkers > 0);

  return (
    <section className="bg-[#f6f6f6] min-h-screen">
      <SectionHeading title={"My Task"} subtitle={"---How to do??---"} />
      <div className="m-12 bg-white lg:w-11/12 mx-auto p-6 space-y-4 rounded-xl">
        <h1 className="font-Cinzel font-bold text-3xl leading-11 text-color3 ">
          Total Available Task: {tasks.length}
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 items-center justify-center">
          {availableTask.map((task) => (
            <div
              key={task._id}
              className="rounded-xl p-6 space-y-3 shadow-2xl bg-color6"
            >
              <figure className="rounded-xl h-[250px]">
                <img
                  className="w-full h-full rounded-xl"
                  src="https://ucare.timepad.ru/11473ab5-b6f2-4143-9d97-c29304b95e8d/poster_event_2600657.jpg"
                  alt=""
                />
              </figure>
              <p>Task Title : {task?.taskTitle}</p>
              <p>Buyer Name : {task?.buyerName}</p>
              <p>Completion Date : {task?.completionDate}</p>
              <p>Payable Amount : {task?.payableAmount}</p>
              <p>Required Workers : {task?.requiredWorkers}</p>
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
