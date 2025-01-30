import facebook from "../assets/facebook.png";
import linkedIn from "../assets/linkedIn.png";
import { GrGithub } from "react-icons/gr";
const Footer = () => {
  return (
    <footer className="font-Inter">
      <div className="grid grid-cols-1 lg:grid-cols-2 text-white">
        {/* w-11/12 lg:w-10/12 mx-auto */}
        <div className="flex flex-col items-start justify-center bg-color7 py-5 max-lg:pl-12 lg:pl-24 space-y-3">
          <h1 className="text-2xl sm:text-2xl lg:text-40 font-bold text-color1 ">
            Task2Earn
          </h1>
          <p>Turn Tasks into Earnings – Work Smart, Earn More!</p>
        </div>
        <div className="space-y-5 bg-color8 py-5 max-lg:pl-12  lg:pr-2pl-24">
          <h1 className="text-2xl sm:text-2xl lg:text-40 font-bold lg:text-center">
            Social Contact
          </h1>
          <div className="flex items-center gap-5 max-lg:justify-start justify-center">
            {/* Facebook */}
            <button>
              <a href="https://www.facebook.com/shahriar.kawsik">
                <img className="max-sm:w-10" src={facebook} alt="" />
              </a>
            </button>
            {/* github */}
            <button>
              <a href="https://github.com/Shahriarkawsik">
                <GrGithub className="text-white text-4xl sm:text-5xl" />
              </a>
            </button>
            {/* Facebook */}
            <button>
              <a href="https://www.linkedin.com/in/shahriar-kawsik-21916117b">
                <img className="max-sm:w-10" src={linkedIn} alt="" />
              </a>
            </button>
          </div>
        </div>
      </div>

      <p className="text-center py-2 bg-black text-white text-xs sm:text-xl">
        Copyright © Task2Earn {new Date().getFullYear()}. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
