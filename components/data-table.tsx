"use client";
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
import { SectionCards } from "@/components/section-cards";
import { useDeleteProduct, useGetProducts } from "@/hooks/useProducts";
import { Skeleton } from "@/components/ui/skeleton";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useState } from "react";

import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
type Product = {
  id: number;
  name: string;
  price: number;
  stock_quantity: number;
  size: string;
  images: { image_url: string }[];
};
export default function UserTable({
  data,
  isLoading,
}: {
  data?: any;
  isLoading: boolean;
}) {
  const [openDelete, setOpenDelete] = useState<boolean>(false);

  const router = useRouter();

  if (isLoading) {
    return (
      <div className="p-6">
        <SkeletonLoader />
      </div>
    );
  }

  return (
    <div className="p-6 ">
      <div className="flex justify-between ">
        <h1 className="text-2xl font-bold mb-4">Users Tables</h1>
      </div>

      <div className="overflow-x-scroll w-[310px] lg:w-auto">
        <table className="min-w-full border border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-2 px-4 border-b ">Image</th>
              <th className="py-2 px-4 border-b ">ID</th>
              <th className="py-2 px-4 border-b">Name</th>
              <th className="py-2 px-4 border-b">Phone</th>
              <th className="py-2 px-4 border-b">Email</th>
              <th className="py-2 px-4 border-b">Status</th>
              <th className="py-2 px-4 border-b">Last Seen</th>
            </tr>
          </thead>
          <tbody>
            {data?.map((product: User) => (
              <tr key={product?.id} className="hover:bg-gray-50">
                <td className="py-2 px-4 border-b text-center">
                  <Image
                    src={product?.image || "/placeholder.png"}
                    alt={product?.name}
                    width={50}
                    height={50}
                    className="mx-auto rounded-md object-cover"
                  />
                </td>
                <td className="py-2 px-4 border-b text-center">
                  {product?.id}
                </td>
                <td className="py-2 px-4 border-b text-center">
                  {product?.name}
                </td>
                <td className="py-2 px-4 border-b text-center">
                  ${product?.phone}
                </td>
                <td className="py-2 px-4 border-b text-center">
                  {product?.email || "N/A"}
                </td>
                <td className="py-2 px-4 border-b text-center">
                  {product?.status}
                </td>
                <td className="py-2 px-4 border-b text-center">
                  {formatDate(product?.last_seen) ?? ""}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
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

function formatDate(dateInput: string | Date): string {
  const date = typeof dateInput === "string" ? new Date(dateInput) : dateInput;
  return date.toLocaleString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
}
