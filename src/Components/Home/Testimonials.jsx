
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";

const Testimonials = () => {
  const axiosPublic = useAxiosPublic();
  const { data: testimonials = [] } = useQuery({
    queryKey: ["testimonials"],
    queryFn: async () => {
      const res = axiosPublic.get("/testimonials");
      return res;
    },
  });
  console.log(testimonials);
  return <div></div>;
};

export default Testimonials;
