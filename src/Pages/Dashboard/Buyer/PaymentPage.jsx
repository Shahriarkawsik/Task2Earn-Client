import { Elements } from "@stripe/react-stripe-js";

import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./CheckoutForm";
import { useParams } from "react-router-dom";

const PaymentPage = () => {
  const { id } = useParams();
  const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);
  return (
    <>
      <Elements stripe={stripePromise}>
        <CheckoutForm amount={id} />
      </Elements>
    </>
  );
};

export default PaymentPage;
