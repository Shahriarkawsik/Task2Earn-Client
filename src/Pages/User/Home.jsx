import Banner from "../../Components/Home/Banner";
import SwiperSlider from "../../Components/Home/SwiperSlider";
import TopRatedWorker from "../../Components/Home/TopRatedWorker";

const Home = () => {
  return (
    <div className="bg-color6 space-y-20">
      <SwiperSlider />
      <TopRatedWorker />
    </div>
  );
};

export default Home;
