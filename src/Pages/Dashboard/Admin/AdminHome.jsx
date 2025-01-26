import worker from "../../../assets/worker.png";
import coin from "../../../assets/coin.png";
import payment from "../../../assets/payment.png";
import buyer from "../../../assets/buyer.png";
import TriangleBarChart from "../../../Components/Chart/TriangleBarChart";

const AdminHome = () => {
  //#TODO: fetch all users
  return (
    <section className="py-5">
      <h1 className="font-Cinzel font-semibold text-20 leading-11 text-color3">
        Hi, Welcome Back!
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {/* ** number of worker */}
        <div className="bg-gradient-to-r from-[#BB34F5] to-[#FCDCFF] rounded-lg flex justify-center items-center gap-6 py-9">
          <img className="w-20 rounded-full" src={worker} alt="" />
          <div className="text-center">
            <p className="font-Inter font-extrabold text-40 leading-12">1000</p>
            <p className="text-2xl leading-7">Worker</p>
          </div>
        </div>
        {/* Number of Buyer */}
        <div className="bg-gradient-to-r from-[#d3a256] to-[#fde8c0] rounded-lg flex justify-center items-center gap-6 py-9">
          <img className="w-20 rounded-full" src={buyer} alt="" />
          <div className="text-center">
            <p className="font-Inter font-extrabold text-40 leading-12">1000</p>
            <p className="text-2xl leading-7">Buyer</p>
          </div>
        </div>
        {/* Total available coin */}
        <div className="bg-gradient-to-r from-[#fe4880] to-[#fecde9] rounded-lg flex justify-center items-center gap-6 py-9">
          <img className="w-20 rounded-full" src={coin} alt="" />
          <div className="text-center">
            <p className="font-Inter font-extrabold text-40 leading-12">1000</p>
            <p className="text-2xl leading-7">Coin</p>
          </div>
        </div>
        {/* Total Payment */}
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
    </section>
  );
};

export default AdminHome;
