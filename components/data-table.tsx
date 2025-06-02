"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useState } from "react";
import { Edit2, Plus, X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { set } from "zod";
import { useDeleteUser, useGetUserDetails } from "@/hooks/useUser";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

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
  const [openSheet, setOpenSheet] = useState<boolean>(false);
  const [deleteId, setDeleteId] = useState<number>();
  const [userId, setUserId] = useState<number>();

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
      <DeleteDialog
        openDelete={openDelete}
        setOpenDelete={setOpenDelete}
        id={deleteId!}
      />
      <UserDetailsSheet
        openSheet={openSheet}
        setOpenSheet={setOpenSheet}
        userId={userId!}
      />
      <div className="flex justify-between ">
        <h1 className="text-2xl font-bold mb-4">Users Tables</h1>
      </div>

      <div className="overflow-x-scroll w-[360px] lg:w-auto">
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
              <th className="py-2 px-4 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {data?.map((user: User) => (
              <tr key={user?.id} className="hover:bg-gray-50">
                <td className="py-2 px-4 border-b text-center">
                  <Image
                    src={user?.image || "/placeholder.png"}
                    alt={user?.name}
                    width={50}
                    height={50}
                    className="mx-auto rounded-md object-cover"
                  />
                </td>
                <td className="py-2 px-4 border-b text-center">{user?.id}</td>
                <td className="py-2 px-4 border-b text-center">{user?.name}</td>
                <td className="py-2 px-4 border-b text-center">
                  {user?.phone}
                </td>
                <td className="py-2 px-4 border-b text-center">
                  {user?.email || "N/A"}
                </td>
                <td className="py-2 px-4 border-b text-center">
                  {user?.status}
                </td>
                <td className="py-2 px-4 border-b text-center">
                  {formatDate(user?.last_seen) ?? ""}
                </td>
                <td className="py-2 px-4 border-b text-center">
                  <button
                    onClick={() => {
                      setOpenDelete(true), setDeleteId(user?.id);
                    }}
                    className="text-blue-600 hover:text-red-500 p-1 rounded-full hover:bg-red-100 transition-colors"
                    title="Ban User"
                  >
                    <X className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => {
                      setOpenSheet(true), setUserId(user.id);
                    }}
                    className="text-green-600 hover:text-green-900 p-1 rounded-full hover:bg-green-100 transition-colors"
                    title="Save"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
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
        <Skeleton className="lg:w-[16rem] md:w-[14rem] w-[20rem] xl:w-[20rem] h-[10rem]" />
        <Skeleton className="lg:w-[16rem] md:w-[14rem] w-[20rem] xl:w-[20rem] h-[10rem]" />
        <Skeleton className="lg:w-[16rem] md:w-[14rem] w-[20rem] xl:w-[20rem] h-[10rem]" />
        <Skeleton className="lg:w-[16rem] md:w-[14rem] w-[20rem] xl:w-[20rem] h-[10rem]" />
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

function DeleteDialog({
  openDelete,
  setOpenDelete,
  id,
}: {
  id: number;
  openDelete: boolean;
  setOpenDelete: (open: boolean) => void;
}) {
  const mutation = useDeleteUser();
  const handleDelete = () => {
    mutation.mutate(id);
    setOpenDelete(false);
  };
  return (
    <Dialog open={openDelete} onOpenChange={setOpenDelete}>
      <form>
        <DialogTrigger asChild></DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Ban User</DialogTitle>
            <DialogDescription>
              Are you sure you want to ban this user? This action cannot be
              undone.
            </DialogDescription>
          </DialogHeader>
          <Button
            onClick={handleDelete}
            type="button"
            className="bg-[#B88E2F] p-4 mt-8 text-white hover:text-red-500 hover:bg-red-100 hover:border  transition-colors duration-300"
            variant="outline"
          >
            Ban User
          </Button>
        </DialogContent>
      </form>
    </Dialog>
  );
}

function UserDetailsSheet({
  openSheet,
  setOpenSheet,
  userId,
}: {
  userId: number;
  openSheet: boolean;
  setOpenSheet: (open: boolean) => void;
}) {
  const { data, isLoading } = useGetUserDetails(userId?.toString());
  const userDetails = data?.data?.data;

  return (
    <Sheet onOpenChange={setOpenSheet} open={openSheet}>
      <SheetTrigger></SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>User details</SheetTitle>
          <SheetDescription>
            <div className="flex flex-col gap-8 mt-8">
              <div className="flex w-[200px] h-[200px]  bg-gray-200 rounded-lg">
                <Image
                  src={userDetails?.image}
                  alt={userDetails?.name}
                  width={200}
                  height={200}
                  className="object-cover rounded-lg"
                />
              </div>
              <div className="flex border p-2 bg-gray-200 text-black font-medium text-sm rounded-lg">
                {userDetails?.name}
              </div>
              <div className="flex border p-2 bg-gray-200 text-black font-medium text-sm rounded-lg">
                {userDetails?.phone}
              </div>
              <div className="flex border p-2 bg-gray-200 text-black font-medium text-sm rounded-lg">
                {userDetails?.email}
              </div>
              <div className="flex border p-2 bg-gray-200 text-black font-medium text-sm rounded-lg">
                {userDetails?.status}
              </div>
              <div className="flex border p-2 bg-gray-200 text-black font-medium text-sm rounded-lg">
                {formatDate(userDetails?.last_seen ?? "")}
              </div>
            </div>
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
}
