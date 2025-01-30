import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

const useGetAllUser = () => {
  const axiosSecure = useAxiosSecure();
  // const token = localStorage.getItem("access-token");
  const { data: users = [], refetch } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get(
        "/users"
        //   {
        //   headers: {
        //     authorization: `Bearer ${token}`,
        //   },
        // }
      );
      return res.data;
    },
  });

  return [users, refetch];
};

export default useGetAllUser;
