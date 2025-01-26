import workerImg from "../../../assets/worker.png";
import coin from "../../../assets/coin.png";
import payment from "../../../assets/payment.png";
import buyerImg from "../../../assets/buyer.png";
import TriangleBarChart from "../../../Components/Chart/TriangleBarChart";
import useGetAllUser from "../../../Hooks/useGetAllUser";

const AdminHome = () => {
  //#TODO: fetch all users
  const [users, refetch] = useGetAllUser();
  /*
  admin will see the count of total worker, total buyer, total available coin(sum of all users coin ),total payments 
  
userRole
"admin"
userAvailableCoin
0
  */
  const worker = users.filter((user) => user.userRole === "worker");
  const buyer = users.filter((user) => user.userRole === "buyer");
  // const availableCoin = users.reduce()
  const availableCoin = users.reduce(
    (total, user) => total + user.userAvailableCoin,
    0
  );

  return (
    <section className="py-5">
      <h1 className="font-Cinzel font-semibold text-20 leading-11 text-color3">
        Hi, Welcome Back!
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {/* ** number of worker */}
        <div className="bg-gradient-to-r from-[#BB34F5] to-[#FCDCFF] rounded-lg flex justify-center items-center gap-6 py-9">
          <img className="w-20 rounded-full" src={workerImg} alt="" />
          <div className="text-center">
            <p className="font-Inter font-extrabold text-40 leading-12">
              {worker.length}
            </p>
            <p className="text-2xl leading-7">Worker</p>
          </div>
        </div>
        {/* Number of Buyer */}
        <div className="bg-gradient-to-r from-[#d3a256] to-[#fde8c0] rounded-lg flex justify-center items-center gap-6 py-9">
          <img className="w-20 rounded-full" src={buyerImg} alt="" />
          <div className="text-center">
            <p className="font-Inter font-extrabold text-40 leading-12">
              {buyer.length}
            </p>
            <p className="text-2xl leading-7">Buyer</p>
          </div>
        </div>
        {/* Total available coin */}
        <div className="bg-gradient-to-r from-[#fe4880] to-[#fecde9] rounded-lg flex justify-center items-center gap-6 py-9">
          <img className="w-20 rounded-full" src={coin} alt="" />
          <div className="text-center">
            <p className="font-Inter font-extrabold text-40 leading-12">
              {availableCoin}
            </p>
            <p className="text-2xl leading-7">Coin</p>
          </div>
        </div>
        {/* Total Payment */}
        {/* TODO: Calculate total payment */}
        <div className="bg-gradient-to-r from-[#6aaeff] to-[#b6f7ff] rounded-lg flex justify-center items-center gap-6 py-9">
          <img className="w-20 rounded-full" src={payment} alt="" />
          <div className="text-center">
            <p className="font-Inter font-extrabold text-40 leading-12">1000</p>
            <p className="text-2xl leading-7">Payment</p>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2">
        <TriangleBarChart />
      </div>
      {/* TODO: Withdraw request  */}
    </section>
  );
};

export default AdminHome;
