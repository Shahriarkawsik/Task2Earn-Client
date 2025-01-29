import useAxiosSecure from "./useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const useGetAllWithdrawals = () => {
  const axiosSecure = useAxiosSecure();
  const { data: withdrawals = [], refetch } = useQuery({
    queryKey: ["withdrawals"],
    queryFn: async () => {
      const res = await axiosSecure.get("/withdrawals");
      return res.data;
    },
  });

  return [withdrawals, refetch];
};

export default useGetAllWithdrawals;
