"use client";

import UserTable from "@/components/data-table";
import { Skeleton } from "@/components/ui/skeleton";
import { UserSectionCards } from "@/components/user/section-carts";
import { useGetDashboardChart } from "@/hooks/useDashboard";
import { useUserSummary } from "@/hooks/useUser";
import React from "react";

export default function Page() {
  const { data, isLoading } = useUserSummary();
  const userSummary: UserStatsData = data?.data?.data;
  const { data: tableData, isLoading: usersLoading } = useGetDashboardChart();

  const userData: User = tableData?.data?.data?.list || [];
  if (isLoading || usersLoading) {
    return <SkeletonLoader />;
  }

  return (
    <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
      <UserSectionCards data={userSummary} />

      <UserTable isLoading={isLoading} data={userData} />
    </div>
  );
}

function SkeletonLoader() {
  return (
    <div className="p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 justify-between mb-4">
        <Skeleton className="w-[20rem] h-[10rem]" />
        <Skeleton className="w-[20rem] h-[10rem]" />
        <Skeleton className="w-[20rem] h-[10rem]" />
        <Skeleton className="w-[20rem] h-[10rem]" />
      </div>

      <Skeleton className="w-full h-[40rem]" />
    </div>
  );
}
