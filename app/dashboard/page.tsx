"use client";

import { AppSidebar } from "@/components/app-sidebar";

import { SectionCards } from "@/components/section-cards";
import data from "../data.json";
import {
  useGetDashboardChart,
  useGetDashboardSummary,
} from "@/hooks/useDashboard";
import { ChartBarMultiple } from "@/components/chart-area-interactive";
import UserTable from "@/components/data-table";

export default function Page() {
  const { data: chartData, isLoading: isChartLoading } =
    useGetDashboardSummary();
  const { data: tableData, isLoading } = useGetDashboardChart();

  const allCartData: DashboardSummary = chartData?.data?.data || [];
  const userData: User = tableData?.data?.data?.list || [];

  console.log("Table Data", userData);
  return (
    <div className="flex flex-1 flex-col">
      <div className="@container/main flex flex-1 flex-col gap-2">
        <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
          <SectionCards data={allCartData} />
          <div className="">
            <ChartBarMultiple data={allCartData?.totalRevenueChart} />
          </div>
          <UserTable isLoading={isLoading} data={userData} />
        </div>
      </div>
    </div>
  );
}
