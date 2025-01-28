import SectionHeading from "../../../Components/SectionHeading";
import useCalculateCoin from "../../../Hooks/useCalculateCoin";
import useGetAllSubmission from "../../../Hooks/useGetAllSubmission";

const WorkerSubmission = () => {
  const [submissions] = useGetAllSubmission();
  const [currentUser] = useCalculateCoin();
  const mySubmissions = submissions.filter(
    (submission) => submission.workerEmail === currentUser.userEmail
  );

  return (
    <section className="bg-[#f6f6f6] min-h-screen">
      <SectionHeading title={"My Submission's"} subtitle={"---What new??---"} />
      <div className="m-12 bg-white lg:w-11/12 mx-auto p-6 space-y-4">
        <h1 className="font-Cinzel font-bold text-3xl leading-11 text-color3">
          My Submission: {mySubmissions.length}
        </h1>
        <div className="overflow-x-auto">
          <table className="table table-zebra">
            {/* head */}
            <thead className="bg-color1 text-white text-xl font-bold">
              <tr className="text-center">
                <th></th>
                <th>Task Name</th>
                <th>Buyer Name</th>
                <th>Buyer Email</th>
                <th>Payment Amount</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {/* row 1 */}
              {mySubmissions.map((submission, index) => (
                <tr key={submission?._id} className="text-center text-20">
                  <th className="font-Cinzel">{index + 1}</th>
                  <th>{submission?.taskTitle}</th>
                  <th>{submission?.buyerName}</th>
                  <th>{submission?.buyerEmail}</th>
                  <th>{submission?.payableAmount}</th>
                  <th
                    className={`${
                      submission?.status === "pending"
                        ? "text-red-600"
                        : "text-green-600"
                    }`}
                  >
                    {submission?.status}
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

export default WorkerSubmission;
