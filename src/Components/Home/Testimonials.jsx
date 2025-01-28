import { useEffect, useState } from "react";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
// import required modules
import { Navigation } from "swiper/modules";
import SectionHeading from "../SectionHeading";
import { FaQuoteLeft } from "react-icons/fa";

const Testimonials = () => {
  const axiosPublic = useAxiosPublic();
  const [testimonial, setTestimonial] = useState([]);
  useEffect(() => {
    axiosPublic.get("/testimonials").then((res) => {
      setTestimonial(res.data);
    });
  }, []);

  return (
    <section className="space-y-6 w-10/12 mx-auto">
      <SectionHeading
        title={"testimonial"}
        subtitle={"---What Our Clients Say---"}
      />
      <Swiper navigation={true} modules={[Navigation]} className="mySwiper">
        {testimonial.map((review) => (
          <SwiperSlide key={review._id}>
            <div className="flex flex-col justify-center items-center space-y-5 py-10 bg-color6">
              <img
                className="w-[150px] h-[150px] rounded-full"
                src={review.userPhoto}
                alt=""
              />
              <FaQuoteLeft className="text-6xl text-color2 mx-auto" />

              <div className="space-y-2 text-center">
                <p className="w-5/6 mx-auto text-color4 text-xl leading-6 font-Inter">
                  {review.quote}
                </p>
                <h1 className="text-color8 font-Inter font-semibold text-3xl leading-7">
                  {review.userName}
                </h1>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default Testimonials;
