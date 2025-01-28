import { useParams } from "react-router-dom";
import useGetallTask from "./../../../Hooks/useGetallTask";

const AvailableTaskDetails = () => {
  const { id } = useParams();
  const [tasks] = useGetallTask();
  const [task] = tasks.filter((task) => task._id === id);

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
        // onSubmit={handleSubmit}
        className="bg-gray-50 p-4 rounded-lg shadow-md space-y-3"
      >
        <label
          htmlFor="submissionDetails"
          className="block text-color3 font-medium "
        >
          Submission Details:
        </label>
        <textarea
          id="submissionDetails"
          placeholder="Enter your submission details here..."
          value={task?.taskDetail}
          required
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-300 "
        ></textarea>
        <button
          type="submit"
          className={`w-full p-3 text-white font-bold rounded-lg`}
          // ${isSubmitting ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-600" }
          //   disabled={isSubmitting}
        >
          {/* {isSubmitting ? "Submitting..." : "Submit"} */}
        </button>
      </form>
    </section>
  );
};

export default AvailableTaskDetails;
