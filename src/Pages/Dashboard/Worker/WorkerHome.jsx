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

  return (
    <section className="py-5">
      <h1 className="font-Cinzel font-semibold text-20 leading-11 text-color3">
        Hi, Welcome Back!
      </h1>
      {/*       
      Workers will see the Total Submission (Count of all submissions made by the worker), Total 
pending submission (Count of all submissions made by the worker where status is pending ), 
and Total Earning ( sum of payable_amount of the worker where status is approved ).  
      */}
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
              {/* {availableCoin} */} 0
            </p>
            <p className="text-2xl leading-7">Total Earning</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WorkerHome;
