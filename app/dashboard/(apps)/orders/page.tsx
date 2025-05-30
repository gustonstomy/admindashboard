"use client";

import { SectionCards } from "@/components/section-cards";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { IconDotsVertical } from "@tabler/icons-react";
import { useGetOrders, useGetOrderSummary } from "@/hooks/useOrders";
import { Skeleton } from "@/components/ui/skeleton";
import { useRouter } from "next/navigation";
import { OrderSectionCards } from "@/components/order-section-card";

type Order = {
  id: string;
  order_number: number;
  name: string;
  status: number;
  total_amount: number;
  payment_method: number;
  payment_status: string;
  address: string;
  user: {
    phone: string;
  };
};
export default function Page() {
  const { data, isLoading } = useGetOrders();
  const { data: orderSummary } = useGetOrderSummary();

  const mockProducts: Order[] = data?.data?.data?.list || [];

  console.log("Order Summary", orderSummary?.data?.data);

  if (isLoading) {
    return (
      <div className="">
        <SkeletonLoader />
      </div>
    );
  }
  return (
    <div className="p-6">
      <div className="flex justify-between">
        <h1 className="text-2xl font-bold ">Orders</h1>
      </div>
      <div className="@container/main flex flex-1 flex-col gap-2 py-4 md:gap-6 md:py-6 mb-4">
        <OrderSectionCards OrderStatisticsData={orderSummary?.data?.data} />
      </div>
      <table className="min-w-full border border-gray-200">
        <thead>
          <tr className="bg-gray-100">
            <th className="py-2 px-4 border-b ">Order number</th>
            <th className="py-2 px-4 border-b">Status</th>
            <th className="py-2 px-4 border-b">Price</th>
            <th className="py-2 px-4 border-b">Payment Status</th>
            <th className="py-2 px-4 border-b">Payment Method</th>
            <th className="py-2 px-4 border-b">Address</th>
            <th className="py-2 px-4 border-b">Phone</th>
            <th className="py-2 px-4 border-b">Action</th>
          </tr>
        </thead>
        <tbody>
          {mockProducts?.map((product) => (
            <tr key={product.order_number} className="hover:bg-gray-50">
              <td className="py-2 px-4 border-b text-center">
                {product?.order_number}
              </td>
              <td className="py-2 px-4 border-b text-center">
                {product?.status}
              </td>
              <td className="py-2 px-4 border-b text-center">
                GH₵ {product?.total_amount}
              </td>
              <td className="py-2 px-4 border-b text-center">
                {product?.payment_status}
              </td>
              <td className="py-2 px-4 border-b text-center">
                {product?.payment_method ?? "N/A"}
              </td>
              <td className="py-2 px-4 border-b text-center">
                {product?.address}
              </td>
              <td className="py-2 px-4 border-b text-center">
                {product?.user?.phone}
              </td>
              <td className="py-2 px-4 border-b text-center">
                <EditSection id={product?.id} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function EditSection({ id }: { id: string }) {
  const router = useRouter();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="data-[state=open]:bg-muted text-muted-foreground flex size-8"
          size="icon"
        >
          <IconDotsVertical />
          <span className="sr-only">Open menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-32">
        <DropdownMenuItem>Edit</DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => router.push(`/dashboard/order-details/${id}`)}
        >
          View details
        </DropdownMenuItem>
        {/* <DropdownMenuItem>Favorite</DropdownMenuItem> */}
        <DropdownMenuSeparator />
        <DropdownMenuItem variant="destructive">Delete</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
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
