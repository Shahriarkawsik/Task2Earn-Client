import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import useAuth from "../../../Hooks/useAuth";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import Swal from "sweetalert2";

const CheckoutForm = ({ amount }) => {
  const { register, handleSubmit } = useForm();
  const stripe = useStripe();
  const elements = useElements();
  const [err, setErr] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const { user } = useAuth();
  const axiosPublic = useAxiosPublic();

  const onSubmit = async (data) => {
    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);

    if (card == null) {
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      setErr(error.message);
    } else {
      setErr("");
      // console.log("[PaymentMethod]", paymentMethod);
    }
    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            email: user?.email || "Anonymous",
            name: user?.displayName || "Anonymous",
          },
        },
      });

    if (confirmError) {
      // console.log("Confirm error: ", confirmError);
      // toast.error("Something went wrong");
    } else {
      axiosPublic
        .post("/storePayment", { email: user.email, amount: amount })
        .then((res) => {
          if (res.data.insertedId) {
            Swal.fire({
              position: "center",
              icon: "success",
              title: "Success!",
              text: "Your payment is successful.",
              showConfirmButton: false,
              timer: 1500,
            });
          }
        });
      // Call api here that payment has received
      // Payment is in the paymentIntent object. Call api to store data in database
    }
  };

  useEffect(() => {
    axiosPublic
      .post("/create-payment-intent", { price: amount })
      .then((res) => {
        setClientSecret(res.data.clientSecret);
      });
  }, []);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full mx-auto my-4 max-w-md p-8 space-y-3 rounded-xl shadow-xl border"
    >
      <h1 className="text-2xl font-bold text-center">Checkout</h1>
      <div className="space-y-6">
        <div className="space-y-1 text-sm">
          <label htmlFor="amount" className="block">
            Amount*
          </label>
          <input
            type="text"
            {...register("amount")}
            defaultValue={amount}
            readOnly
            className="w-full px-4 py-3 rounded-md"
          />
        </div>
        <div className="space-y-1 text-sm">
          <label htmlFor="yourEmail" className="block">
            Your Email
          </label>
          <input
            type="email"
            readOnly
            defaultValue={user?.email}
            {...register("email")}
            className="w-full px-4 py-3 rounded-md"
          />
        </div>
        {/* Card info start */}
        <div className="space-y-1 text-sm">
          <label htmlFor="yourEmail" className="block">
            Card Info
          </label>
          <CardElement
            className="px-4 py-3 rounded border"
            options={{
              style: {
                base: {
                  fontSize: "16px",
                  color: "#000",
                  "::placeholder": {
                    color: "#000",
                  },
                },
              },
            }}
          />
          <p className="text-red-500">{err}</p>
        </div>
        {/* Card info start */}

        <button className="w-full bg-violet-400 text-white rounded-md hover:bg-none px-4 py-3">
          Submit
        </button>
        {/* {clientSecret ? (
          <button
            type="submit"
            className="w-full bg-violet-400 px-4 text-white py-3 rounded-md"
          >
            Submit
          </button>
        ) : (
          <button className="w-full bg-violet-400 text-white rounded-md hover:bg-none px-4 py-3">
            Submit
          </button>
        )} */}
      </div>
    </form>
  );
};

export default CheckoutForm;
