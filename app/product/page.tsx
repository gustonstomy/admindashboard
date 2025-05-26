"use client";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { DataTable } from "@/components/data-table";
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
import { useGetProducts } from "@/hooks/useProducts";
import { Skeleton } from "@/components/ui/skeleton";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";
import { useRef } from "react";

type Product = {
  id: number;
  name: string;
  price: number;
  stock: number;
  size: string;
  images: { image_url: string }[];
};
export default function Page() {
  const [openDelete, setOpenDelete] = useState<boolean>(false);
  const { data, isLoading } = useGetProducts();
  const mockProducts: Product[] = data?.data?.data?.list;
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
      <Dialog open={openDelete} onOpenChange={setOpenDelete}>
        <DialogTrigger asChild></DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are you absolutely sure?</DialogTitle>
            <DialogDescription>
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
      <div className="flex justify-between ">
        <h1 className="text-2xl font-bold mb-4">Products</h1>
        <Button
          onClick={() => router.push("/create")}
          type="button"
          className="bg-[#B88E2F] p-4 text-white hover:text-black"
          variant="outline"
        >
          <Plus />
          Add Product
        </Button>
      </div>
      <div className="@container/main flex flex-1 flex-col gap-2 py-4 md:gap-6 md:py-6 mb-4">
        <SectionCards />
      </div>
      <div className="overflow-x-scroll w-[310px] lg:w-auto">
        <table className="min-w-full border border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-2 px-4 border-b ">Image</th>
              <th className="py-2 px-4 border-b ">ID</th>
              <th className="py-2 px-4 border-b">Name</th>
              <th className="py-2 px-4 border-b">Price</th>
              <th className="py-2 px-4 border-b">Stock</th>
              <th className="py-2 px-4 border-b">size</th>
              <th className="py-2 px-4 border-b"></th>
            </tr>
          </thead>
          <tbody>
            {mockProducts?.map((product) => (
              <tr key={product?.id} className="hover:bg-gray-50">
                <td className="py-2 px-4 border-b text-center">
                  <Image
                    src={product?.images[0]?.image_url || "/placeholder.png"}
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
                  ${product?.price}
                </td>
                <td className="py-2 px-4 border-b text-center">
                  {product?.stock}
                </td>
                <td className="py-2 px-4 border-b text-center">
                  {product?.size}
                </td>
                <td className="py-2 px-4 border-b text-center">
                  <EditSection id={product?.id} setOpenDelete={setOpenDelete} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function EditSection({
  id,
  setOpenDelete,
}: {
  id: number;
  setOpenDelete: (open: boolean) => void;
}) {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const router = useRouter();
  const triggerRef = useRef(null);
  return (
    <DropdownMenu
      open={dropdownOpen}
      onOpenChange={setDropdownOpen}
      modal={false}
    >
      <DropdownMenuTrigger asChild>
        <Button
          ref={triggerRef}
          variant="ghost"
          className="data-[state=open]:bg-muted text-muted-foreground flex size-8"
          size="icon"
          onClick={() => setDropdownOpen(!dropdownOpen)}
        >
          <IconDotsVertical />
          <span className="sr-only">Open menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-32">
        <DropdownMenuItem>Edit</DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => router.push(`/product-details?id=${id}`)}
          className="cursor-pointer"
        >
          View details
        </DropdownMenuItem>
        {/* <DropdownMenuItem>Favorite</DropdownMenuItem> */}
        <DropdownMenuSeparator />

        <DropdownMenuItem
          variant="destructive"
          onClick={() => setOpenDelete(true)}
        >
          Delete
        </DropdownMenuItem>
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
