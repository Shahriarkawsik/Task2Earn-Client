import { useState } from "react";
import useAuth from "./useAuth";
import useAxiosPublic from "./useAxiosPublic";
import { useQuery } from "@tanstack/react-query";

const useCalculateCoin = () => {
  const { user } = useAuth();
  const axiosPublic = useAxiosPublic();
  const { data: currentUser = {}, refetch } = useQuery({
    queryKey: ["users", user?.email],
    queryFn: async () => {
      const res = await axiosPublic.get(`/users?email=${user?.email}`);
      refetch();
      return res.data;
    },
  });
  const userRole = currentUser?.userRole;
  const [addCoin, setAddCoin] = useState(currentUser.userAvailableCoin);
  return [addCoin, setAddCoin, userRole];
};

export default useCalculateCoin;
