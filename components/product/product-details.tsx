"use client";

import React, { useState } from "react";
import {
  Heart,
  Star,
  ShoppingCart,
  Share2,
  Ruler,
  Package,
} from "lucide-react";
import { useGetProductDetails } from "@/hooks/useProducts";
import { useSearchParams } from "next/navigation";

// Type definitions
interface Category {
  id: number;
  name: string;
}

interface ProductImage {
  id: number;
  image_url: string;
  display_order: number;
  is_primary: boolean;
}

interface Product {
  id: number;
  name: string;
  description: string;
  size: string;
  category: Category;
  tag: string | null;
  images: ProductImage[];
  price: string;
  currency: string;
  width: string;
  height: string;
  weight: string | null;
  sku: string;
  slug: string;
  is_out_of_stock: boolean;
  is_disabled: boolean;
  rating_count: number;
  rating: string;
  is_favorite: boolean;
  created_at: string;
}

export default function ProductDetails({ id }: { id: string }) {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const { data, isPending } = useGetProductDetails(Number(id));

  const productData: Product = data?.data?.data;

  if (isPending || !productData) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-gray-500">Loading product details...</div>
      </div>
    );
  }

  const sortedImages = [...productData?.images].sort(
    (a, b) => a.display_order - b.display_order
  );

  const formatPrice = (price: string, currency: string) => {
    return `${currency} ${parseFloat(price).toLocaleString()}`;
  };

  return (
    <div className="max-w-7xl ml-8 mt-8 px-4 py-8 bg-gradient-to-br from-slate-50 to-white min-h-screen">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Image Gallery */}
        <div className="space-y-4">
          <div className="relative aspect-square rounded-2xl overflow-hidden bg-white shadow-2xl border border-gray-100">
            <img
              src={sortedImages[selectedImageIndex]?.image_url}
              alt={productData.name}
              className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
            />
            {productData.is_out_of_stock && (
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                <span className="bg-red-500 text-white px-6 py-2 rounded-full font-semibold text-lg">
                  Out of Stock
                </span>
              </div>
            )}
          </div>

          {/* Thumbnail Gallery */}
          {sortedImages.length > 1 && (
            <div className="flex space-x-3 overflow-x-auto pb-2">
              {sortedImages.map((image, index) => (
                <button
                  key={image.id}
                  onClick={() => setSelectedImageIndex(index)}
                  className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                    selectedImageIndex === index
                      ? "border-blue-500 shadow-lg scale-105"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <img
                    src={image.image_url}
                    alt={`${productData.name} ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product Information */}
        <div className="space-y-6">
          {/* Header */}
          <div>
            <div className="flex items-start justify-between mb-2">
              <div>
                <span className="inline-block bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full mb-3 capitalize">
                  {productData.category.name}
                </span>
                <h1 className="text-4xl font-bold text-gray-900 mb-2">
                  {productData.name}
                </h1>
              </div>
            </div>

            <div className="flex items-center space-x-4 mb-4">
              <span className="text-gray-400">•</span>
              <span className="text-sm text-gray-600">
                SKU: {productData.sku}
              </span>
            </div>
          </div>

          {/* Price */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-100">
            <div className="text-4xl font-bold text-gray-900 mb-2">
              {formatPrice(productData.price, productData.currency)}
            </div>
            <p className="text-gray-600">Inclusive of all taxes</p>
          </div>

          {/* Description */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">
              Description
            </h3>
            <p className="text-gray-700 leading-relaxed">
              {productData.description}
            </p>
          </div>

          {/* Specifications */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Specifications
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center space-x-3">
                <Package className="w-5 h-5 text-blue-500" />
                <div>
                  <span className="text-sm text-gray-500">Size</span>
                  <p className="font-medium">{productData.size}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Ruler className="w-5 h-5 text-blue-500" />
                <div>
                  <span className="text-sm text-gray-500">Dimensions</span>
                  <p className="font-medium">
                    {productData.width}" × {productData.height}"
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center mt-4">
            <div className="flex items-center space-x-1">
              <label className="text-sm font-medium text-gray-700">
                Quantity:
              </label>

              <span className="px-2 font-medium">9</span>
            </div>
            <div className="flex items-center space-x-1">
              <label className="text-sm font-medium text-gray-700">
                Weight:
              </label>

              <span className="px-2 font-medium">
                {productData?.weight ?? "0.00"}
              </span>
            </div>
            <div className="flex items-center space-x-1">
              <label className="text-sm font-medium text-gray-700">
                Width:
              </label>

              <span className="px-2 font-medium">
                {productData?.width ?? "0.00"}
              </span>
            </div>
            <div className="flex items-center space-x-1">
              <label className="text-sm font-medium text-gray-700">
                Height:
              </label>

              <span className="px-2 font-medium">
                {productData?.height ?? "0.00"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
