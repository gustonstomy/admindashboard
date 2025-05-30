import OrderDetails from "@/components/order-details";
import React from "react";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <div>
      <OrderDetails id={id} />
    </div>
  );
}
