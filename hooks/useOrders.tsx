import { endpoints } from "@/constant";
import axiosInstance from "@/constant/axiosInstance";
import { useQuery } from "@tanstack/react-query";

const getOrders = async () => {
  const data = await axiosInstance.get(endpoints.order.GET_ORDERS, {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });
  return data;
};

export function useGetOrders() {
  return useQuery({
    queryKey: ["orders"],
    queryFn: getOrders,
  });
}
