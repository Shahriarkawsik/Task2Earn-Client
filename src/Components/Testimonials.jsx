import React, { useEffect, useState } from "react";
/***************************** Slider ******************************/
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
// import required modules
import { Navigation } from "swiper/modules";
/***************************** Slider ******************************/

/***************************** Rating ******************************/
import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";
import SectionHeading from "./SectionHeading";
import { FaQuoteLeft } from "react-icons/fa";
import axios from "axios";
/***************************** Rating ******************************/

const Testimonials = () => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BASE_URL}/review`)
      .then((response) => setReviews(response.data));
  }, []);
  return (
    <section className="w-8/12 mx-auto">
      <SectionHeading
        title={"TESTIMONIALS"}
        subtitle={"---What Our Clients Say---"}
      />
      <Swiper navigation={true} modules={[Navigation]} className="mySwiper">
        {reviews.map((review) => (
          <SwiperSlide key={review._id}>
            <div className="flex flex-col justify-center items-center space-y-10 py-10">
              <Rating
                style={{ maxWidth: 180 }}
                value={review.rating}
                readOnly
              />
              <FaQuoteLeft className="text-6xl text-color2 mx-auto" />
              <div className="space-y-5 text-center">
                <p className="w-5/6 mx-auto text-color4 text-xl leading-9 font-Inter">
                  {review.details}
                </p>
                <h1 className="text-color8 font-Inter font-medium text-32 leading-39">
                  {review.name}
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
