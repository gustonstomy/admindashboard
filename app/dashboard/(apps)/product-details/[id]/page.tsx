import ProductDetails from "@/components/product/product-details";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return (
    <div className="">
      <ProductDetails id={id} />
    </div>
  );
}
