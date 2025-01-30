// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import useGetallTask from "../../Hooks/useGetallTask";
const SwiperSlider = () => {
  const [tasks] = useGetallTask();
  const bannerTask = tasks.slice(0, 3);

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
      {bannerTask.map((task) => (
        <SwiperSlide key={task._id}>
          <div
            data-aos="zoom-in"
            data-aos-duration="1000"
            style={{
              backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${task.taskImageURL})`,
              objectFit: "cover",
              backgroundRepeat: "no-repeat",
              backgroundSize: "100% 100%",
            }}
            className="w-full h-[300px] lg:h-[550px] flex flex-col gap-2 lg:gap-5 justify-center items-center font-Poppins"
          >
            <h2
              data-aos="fade-up"
              data-aos-duration="1000"
              className="z-20 text-xl sm:text-4xl lg:text-6xl leading-5 font-extrabold sm:font-normal hover:text-color4 text-white py-2 sm:py-5  lg:py-7 rounded-lg Nothing"
            >
              {task.taskTitle}
            </h2>
            <h3
              data-aos="fade-up"
              data-aos-duration="1000"
              className="z-20 text-xl sm:text-xl lg:text-2xl leading-5 font-extrabold sm:font-normal hover:text-color4 text-white py-2 sm:py-5  lg:py-7 rounded-lg Nothing"
            >
              {task.taskDetail}
            </h3>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default SwiperSlider;
