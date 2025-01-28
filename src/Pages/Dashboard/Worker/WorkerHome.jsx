import submitImg from "../../../assets/submitImg.png";
import pendingImg from "../../../assets/pendingImg.png";
import coin from "../../../assets/coin.png";
import useGetAllSubmission from "../../../Hooks/useGetAllSubmission";
import useCalculateCoin from "../../../Hooks/useCalculateCoin";

const WorkerHome = () => {
  const [submissions] = useGetAllSubmission();
  const [currentUser] = useCalculateCoin();
  const mySubmissions = submissions.filter(
    (submission) => submission.workerEmail === currentUser.userEmail
  );
  const pendingSubmission = mySubmissions.filter(
    (submit) => submit.status === "pending"
  );
  const approvedSubmission = mySubmissions.filter(
    (submit) => submit.status === "approved"
  );
  const totalEarning = approvedSubmission.reduce(
    (total, submit) => total + submit.payableAmount,
    0
  );

  return (
    <section className="py-5 space-y-8">
      <h1 className="font-Cinzel font-semibold text-20 leading-11 text-color3">
        Hi, Welcome Back!
      </h1>
      {/* TODO: worker যখন কাজ সাবমিট করবে তখন এই সাবমিশন পাব */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
        {/* ** Total Submission */}
        <div className="bg-gradient-to-r from-[#BB34F5] to-[#FCDCFF] rounded-lg flex justify-center items-center gap-6 py-9">
          <img className="w-20" src={submitImg} alt="" />
          <div className="text-center">
            <p className="font-Inter font-extrabold text-40 leading-12">
              {mySubmissions?.length || 0}
            </p>
            <p className="text-2xl leading-7">Total Submission</p>
          </div>
        </div>
        {/* Total pending submission */}
        <div className="bg-gradient-to-r from-[#d3a256] to-[#fde8c0] rounded-lg flex justify-center items-center gap-6 py-9">
          <img className="w-20" src={pendingImg} alt="" />
          <div className="text-center">
            <p className="font-Inter font-extrabold text-40 leading-12">
              {pendingSubmission.length}
            </p>
            <p className="text-2xl leading-7">Pending Submission</p>
          </div>
        </div>
        {/* Total Earning */}
        <div className="bg-gradient-to-r from-[#fe4880] to-[#fecde9] rounded-lg flex justify-center items-center gap-6 py-9">
          <img className="w-20 rounded-full" src={coin} alt="" />
          <div className="text-center">
            <p className="font-Inter font-extrabold text-40 leading-12">
              {totalEarning}
            </p>
            <p className="text-2xl leading-7">Total Earning</p>
          </div>
        </div>
      </div>
      {/* Approved Submission */}
      <div>
        <h1 className="font-Cinzel font-semibold text-20 leading-11 text-color3">
          Approved Submission
        </h1>
        <div className="overflow-x-auto">
          <table className="table table-zebra">
            {/* head */}
            <thead className="bg-color1 text-white text-xl font-bold">
              <tr className="text-center">
                <th></th>
                <th>Task Name</th>
                <th>Buyer Name</th>
                <th>Payment Amount</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {/* row 1 */}
              {approvedSubmission.map((submission, index) => (
                <tr key={submission?._id} className="text-center text-20">
                  <th className="font-Cinzel">{index + 1}</th>
                  <th>{submission?.taskTitle}</th>
                  <th>{submission?.buyerName}</th>
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

export default WorkerHome;
