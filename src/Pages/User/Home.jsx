import SwiperSlider from "../../Components/Home/SwiperSlider";
import Testimonials from "../../Components/Home/Testimonials";
import TopRatedWorker from "../../Components/Home/TopRatedWorker";

const Home = () => {
  return (
    <div className="bg-color6 space-y-20">
      <SwiperSlider />
      <TopRatedWorker />
      <Testimonials />
    </div>
  );
};

export default Home;
