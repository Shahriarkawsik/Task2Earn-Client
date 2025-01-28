import img1 from "../../assets/photo/5.jpeg";
import img2 from "../../assets/photo/3.png";
import img3 from "../../assets/photo/2.jpg";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
const SwiperSlider = () => {
  return (
    <Swiper
      spaceBetween={30}
      centeredSlides={true}
      autoplay={{
        delay: 2500,
        disableOnInteraction: false,
      }}
      pagination={{
        clickable: true,
      }}
      navigation={true}
      modules={[Autoplay, Pagination, Navigation]}
      className="mySwiper"
    >
      {/* <Swiper navigation={true} modules={[Navigation]} className="mySwiper"> */}
      <SwiperSlide>
        <div
          data-aos="zoom-in"
          data-aos-duration="1000"
          style={{
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${img1})`,
            objectFit: "cover",
            backgroundRepeat: "no-repeat",
            backgroundSize: "100% 100%",
          }}
          className="w-full h-[300px] lg:h-[550px] flex flex-col gap-2 lg:gap-5 justify-center items-center font-Poppins"
        >
          <h2
            data-aos="fade-up"
            data-aos-duration="1000"
            className="z-20 text-xl sm:text-4xl lg:text-6xl leading-10 font-extrabold sm:font-normal hover:text-color4 text-white py-2 sm:py-5  lg:py-7 rounded-lg Nothing"
          >
            title
          </h2>
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div
          data-aos="zoom-in"
          data-aos-duration="1000"
          style={{
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${img2})`,
            objectFit: "cover",
            backgroundRepeat: "no-repeat",
            backgroundSize: "100% 100%",
          }}
          className="w-full h-[300px] lg:h-[550px] flex flex-col gap-2 lg:gap-5 justify-center items-center font-Poppins"
        >
          <h2
            data-aos="fade-up"
            data-aos-duration="1000"
            className="z-20 text-xl sm:text-4xl lg:text-6xl leading-10 font-extrabold sm:font-normal hover:text-color4 text-white py-2 sm:py-5  lg:py-7 rounded-lg Nothing"
          >
            title
          </h2>
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div
          data-aos="zoom-in"
          data-aos-duration="1000"
          style={{
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${img3})`,
            objectFit: "cover",
            backgroundRepeat: "no-repeat",
            backgroundSize: "100% 100%",
          }}
          className="w-full h-[300px] lg:h-[550px] flex flex-col gap-2 lg:gap-5 justify-center items-center font-Poppins"
        >
          <h2
            data-aos="fade-up"
            data-aos-duration="1000"
            className="z-20 text-xl sm:text-4xl lg:text-6xl leading-10 font-extrabold sm:font-normal hover:text-color4 text-white py-2 sm:py-5  lg:py-7 rounded-lg Nothing"
          >
            title
          </h2>
        </div>
      </SwiperSlide>
    </Swiper>
  );
};

export default SwiperSlider;
