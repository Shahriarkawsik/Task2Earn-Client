import workerImg from "../../../assets/worker.png";
import coin from "../../../assets/coin.png";
import payment from "../../../assets/payment.png";
import buyerImg from "../../../assets/buyer.png";
import TriangleBarChart from "../../../Components/Chart/TriangleBarChart";
import useGetAllUser from "../../../Hooks/useGetAllUser";
import useGetallTask from "./../../../Hooks/useGetallTask";
import useGetAllWithdrawals from "../../../Hooks/useGetAllWithdrawals";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const AdminHome = () => {
  //#TODO: fetch all users
  const [users] = useGetAllUser();
  const [tasks] = useGetallTask();
  const [withdrawals, refetch] = useGetAllWithdrawals();
  const axiosSecure = useAxiosSecure();

  const worker = users.filter((user) => user.userRole === "worker");
  const buyer = users.filter((user) => user.userRole === "buyer");
  const pendingWithdrawals = withdrawals.filter(
    (withdrawal) => withdrawal.status === "pending"
  );

  const availableCoin = users.reduce(
    (total, user) => total + user.userAvailableCoin,
    0
  );
  const totalPayment = tasks.reduce(
    (total, task) => total + task.totalPayableAmount,
    0
  );
  // change status
  const handleChangeStatus = (id) => {
    // get worker id
    const [{ workerId, withdrawalCoin }] = withdrawals.filter(
      (withdrawal) => withdrawal._id === id
    );
    // get user available coin and useRole
    const [{ userRole, userAvailableCoin }] = users.filter(
      (user) => user._id === workerId
    );

    Swal.fire({
      title: "Are you sure?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, update it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure
          .patch(`/withdrawals/${id}`, {
            status: "approved",
          })
          .then((res) => {
            if (res.data.modifiedCount) {
              refetch();
              // increase worker coin
              axiosSecure
                .patch(`/users/${workerId}`, {
                  userRole: userRole,
                  userAvailableCoin: userAvailableCoin - withdrawalCoin,
                })
                .then((res) => {
                  if (res.data) {
                    refetch();
                    Swal.fire({
                      title: "Updated!",
                      text: "Your payment status has been updated successfully.",
                      icon: "success",
                      position: "center",
                      showConfirmButton: false,
                      timer: 1500,
                    });
                  }
                });
            }
          })
          .catch((err) => {
            Swal.fire({
              position: "center",
              icon: "error",
              title: "Error",
              text: `${err.message}`,
              showConfirmButton: false,
              timer: 1500,
            });
          });
      }
    });
  };
  return (
    <section className="py-5 lg:w-11/12 mx-auto space-y-10">
      <h1 className="font-Cinzel font-semibold text-20 leading-11 text-color3">
        Hi, Welcome Back!
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 ">
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
            <p className="font-Inter font-extrabold text-40 leading-12">
              {totalPayment}
            </p>
            <p className="text-2xl leading-7">Payment</p>
          </div>
        </div>
      </div>

      {/* TODO: Withdraw request  */}
      <div className="bg-white space-y-4">
        <h1 className="font-Cinzel font-bold text-3xl leading-11 text-color3">
          Withdraw request : {pendingWithdrawals.length}
        </h1>
        <div className="overflow-x-auto">
          <table className="table table-zebra">
            {/* head */}
            <thead className="bg-color1 text-white text-xl font-bold">
              <tr className="text-center">
                <th></th>
                <th>User Name</th>
                <th>User Email</th>
                <th>Payment System</th>
                <th>Withdrawal Amount</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {/* row 1 */}
              {pendingWithdrawals.map((withdrawal, index) => (
                <tr key={withdrawal?._id} className="text-center text-20">
                  <th className="font-Cinzel">{index + 1}</th>
                  <th>{withdrawal?.workerName}</th>
                  <th>{withdrawal?.workerEmail}</th>
                  <th>{withdrawal?.paymentSystem}</th>
                  <th>{withdrawal?.withdrawalAmount}</th>
                  <th
                    onClick={() => handleChangeStatus(withdrawal?._id)}
                    className={`${
                      withdrawal?.status === "pending"
                        ? "text-red-600"
                        : "text-green-600"
                    } cursor-pointer`}
                  >
                    {withdrawal?.status}
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

export default AdminHome;
