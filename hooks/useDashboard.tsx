import { endpoints } from "@/constant";
import axiosInstance from "@/constant/axiosInstance";
import { useQuery } from "@tanstack/react-query";

const getDashboardSummary = async () => {
  const data = await axiosInstance.get(
    endpoints.dashboard.GET_DASHBOARD_SUMMARY,
    {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    }
  );
  return data;
};
export function useGetDashboardSummary() {
  return useQuery({
    queryKey: ["dashboardSummary"],
    queryFn: getDashboardSummary,
  });
}
const getDashboardChart = async () => {
  const data = await axiosInstance.get(
    endpoints.dashboard.GET_DASHBOARD_CHART,
    {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    }
  );
  return data;
};
export function useGetDashboardChart() {
  return useQuery({
    queryKey: ["dashboardChart"],
    queryFn: getDashboardChart,
  });
}
