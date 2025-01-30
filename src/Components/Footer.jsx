import facebook from "../assets/facebook.png";
import linkedIn from "../assets/linkedIn.png";
import github from "../assets/github.png";
import { FaFacebook } from "react-icons/fa";
import { GrGithub } from "react-icons/gr";
const Footer = () => {
  return (
    <footer className="font-Inter">
      <div className="grid grid-cols-1 lg:grid-cols-2 text-white">
        {/* w-11/12 lg:w-10/12 mx-auto */}
        <div className="flex flex-col items-start justify-center bg-color7 py-5 lg:pl-24 space-y-3">
          <h1 className="text-40 font-bold text-color1 ">Task2Earn</h1>
          <p>Turn Tasks into Earnings – Work Smart, Earn More!</p>
        </div>
        <div className="text-center space-y-5 bg-color8 py-5  lg:pr-2pl-24">
          <h1 className="text-4xl font-bold ">Social Contact</h1>
          <div className="flex items-center gap-5 justify-center">
            {/* Facebook */}
            <button>
              <a href="https://www.facebook.com/shahriar.kawsik">
                <img src={facebook} alt="" />
              </a>
            </button>
            {/* github */}
            <button>
              <a href="https://github.com/Shahriarkawsik">
                {/* <img src={github} alt="" /> */}
                <GrGithub className="text-white text-5xl" />
              </a>
            </button>
            {/* Facebook */}
            <button>
              <a href="https://www.linkedin.com/in/shahriar-kawsik-21916117b">
                <img src={linkedIn} alt="" />
              </a>
            </button>
          </div>
        </div>
      </div>

      <p className="text-center py-2 bg-black text-white text-xl">
        Copyright © Task2Earn {new Date().getFullYear()}. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
