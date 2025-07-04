import axios from "axios";

const axiosPublic = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
});
const useAxiosPublic = () => axiosPublic;

export default useAxiosPublic;
