import { useForm } from "react-hook-form";
import SectionHeading from "../../../Components/SectionHeading";
import { useNavigate } from "react-router-dom";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import { useEffect, useState } from "react";
import useCalculateCoin from "./../../../Hooks/useCalculateCoin";
import coinImg from "../../../assets/coin.png";
import Swal from "sweetalert2";

const WorkerWithdrawal = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const [coin, setCoin] = useState(0);
  const [withdrawAmount, setWithdrawAmount] = useState(0);
  useEffect(() => {
    setWithdrawAmount(coin * 0.05);
  }, [coin]);
  const navigate = useNavigate();
  const axiosPublic = useAxiosPublic();
  const [currentUser, refetch] = useCalculateCoin();
  const currentDate = `${new Date().getDate()}-${
    new Date().getMonth() + 1
  }-${new Date().getFullYear()}`;

  const onSubmit = (userInfo) => {
    const withdrawDetails = {
      workerEmail: currentUser?.userEmail,
      workerName: currentUser?.userName,
      withdrawalCoin: userInfo.coinWithDraw,
      withdrawalAmount: withdrawAmount.toFixed(2),
      withdrawalDate: currentDate,
      paymentSystem: userInfo.paymentSystem,
      status: "pending",
    };

    axiosPublic
      .post("withdrawals", withdrawDetails)
      .then((res) => {
        if (res.data) {
          reset();
          refetch();
          //here update user coin
          axiosPublic
            .patch(`/users/${currentUser?._id}`, {
              userRole: currentUser?.userRole,
              userAvailableCoin:
                currentUser?.userAvailableCoin - userInfo.coinWithDraw,
            })
            .then((res) => {
              if (res.data) {
                refetch();
                Swal.fire({
                  position: "center",
                  icon: "success",
                  title: "withdrawal Successful",
                  showConfirmButton: false,
                  timer: 1500,
                });
              }
            });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <section className="bg-[#f6f6f6] min-h-screen my-5 ">
      <SectionHeading title={"Withdrawal"} subtitle={"---Earn More---"} />

      <div className="my-12 space-y-6 w-10/12 mx-auto">
        <h1 className="font-Inter font-bold text-40 leading-48 text-color2 text-center">
          Withdrawal
        </h1>
        {/* card */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-gradient-to-r from-[#BB34F5] to-[#FCDCFF] rounded-lg flex justify-center items-center gap-6 py-9">
            <img className="w-20" src={coinImg} alt="" />
            <div className="text-center">
              <p className="font-Inter font-extrabold text-40 leading-12">
                {currentUser?.userAvailableCoin || 0}
              </p>
              <p className="text-2xl leading-7">Total Available Coin</p>
            </div>
          </div>
          <div className="bg-gradient-to-r from-[#d3a256] to-[#fde8c0] rounded-lg flex justify-center items-center gap-6 py-9">
            <img className="w-20" src={coinImg} alt="" />
            <div className="text-center">
              <p className="font-Inter font-extrabold text-40 leading-12">
                $ {currentUser?.userAvailableCoin * 0.05}
              </p>
              <p className="text-2xl leading-7">Available Amount</p>
            </div>
          </div>
        </div>
        {/* Form */}
        <div className="w-2/3 mx-auto space-y-2">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="card-body text-xl "
          >
            <fieldset className="fieldset  space-y-3">
              {/* Coin To Withdraw */}
              <div className="space-y-2">
                <label className="fieldset-label font-Inter font-semibold text-xl leading-6">
                  Coin To WithDraw*
                </label>
                <input
                  type="number"
                  min={200}
                  onKeyUp={(e) => setCoin(Number(e.target.value))}
                  className="w-full input input-bordered bg-white font-Inter text-xl rounded-md p-3 text-color4 border-none"
                  placeholder="Type here...."
                  {...register("coinWithDraw", { required: true })}
                  required
                />
                {errors.coinWithDraw && (
                  <span className="text-red-600">Coin is required</span>
                )}
              </div>
              {/* Withdraw Amount */}
              <div className="w-full space-y-2">
                <label className="fieldset-label font-Inter font-semibold text-xl leading-6">
                  Withdraw Amount ($) *
                </label>
                <input
                  type="number"
                  value={withdrawAmount.toFixed(2)}
                  readOnly
                  placeholder="Type here...."
                  {...register("withdrawAmount", { required: true })}
                  className="w-full input input-bordered border-none bg-white font-Inter text-xl rounded-md p-3 text-color4"
                  required
                />
                {errors.withdrawAmount && (
                  <span className="text-red-600">
                    Withdraw Amount is required
                  </span>
                )}
              </div>
              {/* Payment System */}
              <div className="w-full space-y-2">
                <label className="fieldset-label font-Inter font-semibold text-xl leading-6">
                  Payment System*
                </label>
                <select
                  {...register("paymentSystem", { require: true })}
                  className="bg-white text-[rgb(251,128,79)] p-3 rounded-md w-full border-none text-xl"
                >
                  <option value="bkash">Bkash</option>
                  <option value="rocket">Rocket</option>
                  <option value="nagad">Nagad</option>
                  <option value="other">Other</option>
                </select>
                {errors.paymentSystem && (
                  <span className="text-red-600">
                    Payment System is required
                  </span>
                )}
              </div>
              {/* Account Number */}
              <div className="w-full space-y-2">
                <label className="fieldset-label font-Inter font-semibold text-xl leading-6">
                  Account Number*
                </label>
                <input
                  type="number"
                  maxLength={11}
                  placeholder="+880 1234 567891"
                  {...register("accountNumber", {
                    required: "Account Number is required",
                  })}
                  className="w-full input input-bordered bg-white font-Inter text-xl rounded-md p-3 text-color4 border-none"
                />
                {errors.accountNumber && (
                  <span className="text-red-600">
                    {errors.password.message}
                  </span>
                )}
              </div>

              <input
                type="submit"
                value={`${
                  currentUser.userAvailableCoin >= 200
                    ? "Withdraw"
                    : "Insufficient coin"
                }`}
                className={`bg-color1 font-Inter font-bold text-2xl text-white rounded-lg py-2 ${
                  currentUser.userAvailableCoin < 200
                    ? "opacity-50 cursor-not-allowed"
                    : ""
                }`}
              />
            </fieldset>
          </form>
        </div>
      </div>
    </section>
  );
};

export default WorkerWithdrawal;
