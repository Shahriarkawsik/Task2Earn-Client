import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

const useGetAllSubmission = () => {
  const axiosPublic = useAxiosPublic();
  const { data: submissions = [], refetch } = useQuery({
    queryKey: ["submissions"],
    queryFn: async () => {
      const res = await axiosPublic.get("/submissions");
      return res.data;
    },
  });

  return [submissions, refetch];
};

export default useGetAllSubmission;
