import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";

import img1 from "../../assets/photo/5.jpeg";
import img2 from "../../assets/photo/3.png";
import img3 from "../../assets/photo/2.jpg";

const Banner = () => {
  return (
    <Carousel
      interval="1500"
      showStatus={false}
      infiniteLoop={true}
      autoPlay={true}
      className="flex flex-col items-center justify-center"
    >
      <div className="w-full h-[800px]">
        <img className="w-full h-full" src={img1} />
        <p className="legend text-40">Legend 1</p>
      </div>
      <div className="w-full h-[800px]">
        <img className="w-full h-full" src={img2} />
      </div>
      <div className="w-full h-[800px]">
        <img className="w-full h-full" src={img3} />
      </div>
    </Carousel>
  );
};

export default Banner;
