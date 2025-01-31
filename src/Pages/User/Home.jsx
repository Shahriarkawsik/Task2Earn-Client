import Collapse from "../../Components/Home/Collapse";
import FeaturedTasks from "../../Components/Home/FeaturedTasks";
import Membership from "../../Components/Home/Membership";
import SwiperSlider from "../../Components/Home/SwiperSlider";
import Testimonials from "../../Components/Home/Testimonials";
import TopRatedWorker from "../../Components/Home/TopRatedWorker";
import HelmetTitle from "./../../Components/HelmetTitle";

const Home = () => {
  return (
    <div className="bg-color6 space-y-20 pb-20">
      <HelmetTitle pageTitle={"Home"} />
      <SwiperSlider />
      <TopRatedWorker />
      <Testimonials />
      <FeaturedTasks />
      <Collapse />
      <Membership />
    </div>
  );
};

export default Home;
