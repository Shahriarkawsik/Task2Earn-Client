import submitImg from "../../../assets/submitImg.png";
import pendingImg from "../../../assets/pendingImg.png";
import coin from "../../../assets/coin.png";
import useGetallTask from "../../../Hooks/useGetallTask";
import useAuth from "../../../Hooks/useAuth";

const BuyerHome = () => {
  /*
  Buyer will see his total task Count (task added by user),  pending Task( sum of all  
required_workers count of his added Tasks), and total payment paid by the user. 
  */
  const [tasks] = useGetallTask();
  const { user } = useAuth();

  const currentUserTasks = tasks.filter(
    (task) => task?.buyerEmail === user?.email
  );
  const pendingTask = currentUserTasks.reduce(
    (total, task) => total + parseInt(task.requiredWorkers),
    0
  );
  const totalPayment = currentUserTasks.reduce(
    (total, task) => total + parseInt(task.totalPayableAmount),
    0
  );
  
  return (
    <section className="py-5">
      <h1 className="font-Cinzel font-semibold text-20 leading-11 text-color3">
        Hi, Welcome Back!
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
        {/* ** Total Task Count */}
        <div className="bg-gradient-to-r from-[#BB34F5] to-[#FCDCFF] rounded-lg flex justify-center items-center gap-6 py-9">
          <img className="w-20" src={submitImg} alt="" />
          <div className="text-center">
            <p className="font-Inter font-extrabold text-40 leading-12">
              {currentUserTasks?.length || 0}
            </p>
            <p className="text-2xl leading-7">Total Submission Task</p>
          </div>
        </div>
        {/* Total pending submission */}
        <div className="bg-gradient-to-r from-[#d3a256] to-[#fde8c0] rounded-lg flex justify-center items-center gap-6 py-9">
          <img className="w-20" src={pendingImg} alt="" />
          <div className="text-center">
            <p className="font-Inter font-extrabold text-40 leading-12">
              {pendingTask || 0}
            </p>
            <p className="text-2xl leading-7">Pending Submission</p>
          </div>
        </div>
        {/* Total Payment */}
        <div className="bg-gradient-to-r from-[#fe4880] to-[#fecde9] rounded-lg flex justify-center items-center gap-6 py-9">
          <img className="w-20 rounded-full" src={coin} alt="" />
          <div className="text-center">
            <p className="font-Inter font-extrabold text-40 leading-12">
              {totalPayment || 0}
            </p>
            <p className="text-2xl leading-7">Total Payment</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BuyerHome;
