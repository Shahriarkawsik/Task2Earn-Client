import useAuth from "./useAuth";
import useAxiosPublic from "./useAxiosPublic";
import { useQuery } from "@tanstack/react-query";

const useCalculateCoin = () => {
  const { user } = useAuth();
  const axiosPublic = useAxiosPublic();
  const { data: currentUser = {}, refetch } = useQuery({
    queryKey: ["user", user?.email],
    queryFn: async () => {
      const res = await axiosPublic.get(`/user?email=${user?.email}`);
      refetch();
      return res.data;
    },
  });
  return [currentUser];
};

export default useCalculateCoin;
