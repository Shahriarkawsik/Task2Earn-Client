import { Link } from "react-router-dom";
import SectionHeading from "../SectionHeading";
import { BiDollar } from "react-icons/bi";

const Membership = () => {
  return (
    <section className="w-11/12 lg:w-10/12 mx-auto space-y-5">
      <SectionHeading title={"VIP Membership 🚀"} />
      {/* membership card */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center justify-center">
        {/* Yearly Package */}
        <div
          data-aos="fade-up"
          data-aos-duration="1000"
          className="rounded-md font-Inter hover:scale-105 transition-all"
        >
          <h1 className="bg-color9 text-white text-center text-2xl font-semibold font-Inter py-5 rounded-tl-md rounded-tr-md">
            Yearly Package
          </h1>
          <div className="bg-color10 text-white py-3 space-y-2">
            <p className="flex items-center justify-center gap-2 text-4xl font-semibold  ">
              {" "}
              <BiDollar /> <span>99.99 /</span>{" "}
            </p>
            <p className="text-center text-2xl font-semibold">per Year</p>
          </div>
          <div className="text-center space-y-3 py-3 bg-color11  font-medium rounded-bl-md rounded-br-md">
            <p>✔️ Faster withdrawals processed within 12 hours.</p>
            <p>✔️ Earn a 7% bonus on every completed task.</p>
            <p>✔️ Free task promotion once per month (for buyers).</p>
            <p>✔️ VIP badge for increased credibility and trust.</p>
            <p>✔️ Access to exclusive high-paying & premium tasks.</p>
            <p>✔️ Priority customer support for quick issue resolution.</p>

            <div>
              <Link to={"/"}>
                <button className="bg-color9 hover:bg-color1 p-3 text-white rounded-md">
                  Subscribe Now
                </button>
              </Link>
            </div>
          </div>
        </div>
        {/* Monthly Package */}
        <div
          data-aos="fade-up"
          data-aos-duration="1000"
          className="rounded-md font-Inter hover:scale-105 transition-all"
        >
          <h1 className="bg-color12 text-white text-center text-2xl font-semibold font-Inter py-5 rounded-tl-md rounded-tr-md">
            Monthly Package
          </h1>
          <div className="bg-color13 text-white py-3 space-y-2">
            <p className="flex items-center justify-center gap-2 text-4xl font-semibold  ">
              {" "}
              <BiDollar /> <span>500 /</span>
            </p>
            <p className="text-center text-2xl font-semibold">per Year</p>
          </div>
          <div className="text-center space-y-3 py-3 bg-color14  font-medium rounded-bl-md rounded-br-md">
            <p>✔️ Faster withdrawals (processed within 12 hours).</p>
            <p>✔️ Priority approval for task submissions.</p>
            <p>✔️ 5% bonus earnings on every completed task.</p>
            <p>✔️ Exclusive access to premium & high-paying tasks.</p>
            <p>✔️ VIP customer support for faster query resolution.</p>
            <p>✔️ Special VIP badge to boost credibility.</p>
            <div>
              <Link to={"/"}>
                <button className="bg-color9 hover:bg-color1 p-3 text-white rounded-md">
                  Subscribe Now
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Membership;
