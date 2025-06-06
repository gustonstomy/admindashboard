import UpdateProductPage from "@/components/product/update-product";
import React from "react";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return (
    <div>
      <UpdateProductPage id={id} />
    </div>
  );
}
