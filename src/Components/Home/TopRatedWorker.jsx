import useGetAllUser from "../../Hooks/useGetAllUser";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import coin from "../../assets/coin.png";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import SectionHeading from "./../SectionHeading";

const TopRatedWorker = () => {
  const [users] = useGetAllUser();
  const workers = users
    .filter((user) => user.userRole === "worker")
    .sort((a, b) => b.userAvailableCoin - a.userAvailableCoin)
    .slice(0, 6);

  return (
    <section className="w-10/12 mx-auto space-y-6">
      <SectionHeading title={"Top earned worker"} />
      <Swiper
        pagination={{
          clickable: true,
        }}
        breakpoints={{
          640: {
            slidesPerView: 1,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          1024: {
            slidesPerView: 3,
            spaceBetween: 20,
          },
        }}
        modules={[Pagination]}
        className="mySwiper"
      >
        {workers.map((worker) => (
          <SwiperSlide key={worker._id}>
            <div className="relative shadow-2xl lg:shadow">
              <img
                className="w-full h-[250px]"
                src={worker.userPhotoURL}
                alt=""
              />
              <button className="flex items-center justify-center gap-1 px-2 py-1 rounded-md sm:rounded-xl backdrop-blur-md bg-orange-100 absolute top-2 right-2 sm:top-1 sm:right-0">
                <img src={coin} alt="" className="w-8 h-8 rounded-full" />
                <p className="text-xl sm:text-2xl font-Cinzel font-medium sm:font-bold">
                  {worker.userAvailableCoin || 0}
                </p>
              </button>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default TopRatedWorker;
