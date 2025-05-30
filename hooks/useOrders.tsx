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

const getOrderDetails = async (id: string) => {
  const data = await axiosInstance.get(endpoints.order.ORDER_DETAILS(id), {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });
  return data;
};
export function useGetOrderDetails(id: string) {
  return useQuery({
    queryKey: ["orderDetails", id],
    queryFn: () => getOrderDetails(id),
  });
}

const getOrderSummary = async () => {
  const data = await axiosInstance.get(endpoints.order.GET_ORDER_SUMMARY, {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });
  return data;
};

export function useGetOrderSummary() {
  return useQuery({
    queryKey: ["orderSummary"],
    queryFn: getOrderSummary,
  });
}
