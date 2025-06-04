"use client";
import React, { useState } from "react";
import { X, Upload, ImageIcon } from "lucide-react";
import { useCreateProduct } from "@/hooks/useProducts";
import { toast } from "sonner";
import { useGetCategory } from "@/hooks/useCategory";

type ImageInput = {
  image: File | null;
  preview: string | null;
  is_primary?: boolean;
  display_order: number;
};

const initialImageInputs: ImageInput[] = [
  { image: null, preview: null, is_primary: true, display_order: 1 },
  { image: null, preview: null, display_order: 2 },
];

export default function CreateProductPage() {
  const [form, setForm] = useState({
    name: "",
    description: "",
    size: "",
    category_id: 1,
    price: "",
    currency: "GHS",
    width: "",
    height: "",
    weight: "",
    stock_quantity: "",
  });

  const [images, setImages] = useState<ImageInput[]>(initialImageInputs);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const { data } = useGetCategory();
  const { mutate, isSuccess, isPending } = useCreateProduct();

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (idx: number, file: File | null) => {
    if (!file) {
      setImages((prev) =>
        prev.map((img, i) =>
          i === idx ? { ...img, image: null, preview: null } : img
        )
      );
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      setImages((prev) =>
        prev.map((img, i) =>
          i === idx
            ? { ...img, image: file, preview: e.target?.result as string }
            : img
        )
      );
    };
    reader.readAsDataURL(file);
  };

  const handlePrimaryChange = (idx: number) => {
    setImages((prev) =>
      prev.map((img, i) => ({
        ...img,
        is_primary: i === idx,
      }))
    );
  };

  const removeImage = (idx: number) => {
    setImages((prev) =>
      prev.map((img, i) =>
        i === idx ? { ...img, image: null, preview: null } : img
      )
    );
    // Reset file input
    const fileInput = document.querySelector(
      `input[type="file"]:nth-of-type(${idx + 1})`
    ) as HTMLInputElement;
    if (fileInput) fileInput.value = "";
  };

  const addImageSlot = () => {
    setImages([
      ...images,
      {
        image: null,
        preview: null,
        is_primary: false,
        display_order: images.length + 1,
      },
    ]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    setSuccess(false);

    try {
      // Filter out empty image slots and prepare images as base64
      const validImages = images.filter((img) => img.image);

      const imagePayload = await Promise.all(
        validImages.map(async (img) => {
          const base64 = await fileToBase64(img.image!);
          return {
            image: base64.split(",")[1],
            is_primary: img.is_primary,
            display_order: img.display_order,
          };
        })
      );

      const payload = {
        ...form,
        category_id: Number(form.category_id),
        price: Number(form.price),
        width: Number(form.width),
        height: Number(form.height),
        weight: Number(form.weight),
        images: imagePayload,
      };
      mutate(payload);

      setSuccess(true);
      setForm({
        name: "",
        description: "",
        size: "",
        category_id: 1,
        price: "",
        currency: "GHS",
        width: "",
        height: "",
        weight: "",
        stock_quantity: "",
      });
      setImages(initialImageInputs);
    } catch (err: any) {
      setError(err.message || "Failed to create product");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Create Product</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            name="name"
            placeholder="Product Name"
            value={form.name}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <textarea
            name="description"
            placeholder="Description"
            value={form.description}
            onChange={handleChange}
            required
            rows={3}
            className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {/* Size and Category */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            name="size"
            placeholder="Size"
            value={form.size}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <select
            name="category_id"
            value={form.category_id}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">Select a category</option>
            {data?.data?.data?.list?.map((category: any) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
          {/* <input
            name="category_id"
            type="number"
            placeholder="Category ID"
            value={form.category_id}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          /> */}
        </div>

        {/* Price and Currency */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            name="price"
            type="number"
            step="1"
            placeholder="Price"
            value={form.price}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <input
            name="stock_quantity"
            placeholder="Stock Quantity"
            value={form.stock_quantity}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {/* Dimensions and SKU */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <input
            name="width"
            type="number"
            step="0.01"
            placeholder="Width"
            value={form.width}
            onChange={handleChange}
            className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <input
            name="height"
            type="number"
            step="0.01"
            placeholder="Height"
            value={form.height}
            onChange={handleChange}
            className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <input
            name="weight"
            type="number"
            step="0.01"
            placeholder="Weight"
            value={form.weight}
            onChange={handleChange}
            className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {/* Images Section */}
        <div className=" rounded-lg">
          <label className="block font-semibold mb-4 text-gray-700 text-lg">
            Product Images
          </label>

          {images.map((img, idx) => (
            <div
              key={idx}
              className="mb-6 p-4 bg-white border border-gray-200 rounded-lg shadow-sm"
            >
              <div className="flex items-start gap-4">
                {/* File Input and Preview */}
                <div className="flex-1">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) =>
                      handleImageChange(
                        idx,
                        e.target.files ? e.target.files[0] : null
                      )
                    }
                    className="mb-3 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                  />

                  {/* Image Preview */}
                  {img.preview ? (
                    <div className="relative inline-block">
                      <img
                        src={img.preview}
                        alt={`Preview ${idx + 1}`}
                        className="w-32 h-32 object-cover rounded-lg border border-gray-300 shadow-sm"
                      />
                      <button
                        onClick={() => removeImage(idx)}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
                        type="button"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  ) : (
                    <div className="w-32 h-32 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center bg-gray-100">
                      <div className="text-center">
                        <ImageIcon className="mx-auto h-8 w-8 text-gray-400 mb-2" />
                        <p className="text-xs text-gray-500">No image</p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Controls */}
                <div className="flex flex-col gap-3">
                  <label className="flex items-center gap-2 text-sm">
                    <input
                      type="radio"
                      checked={!!img.is_primary}
                      onChange={() => handlePrimaryChange(idx)}
                      name="primaryImage"
                      className="text-blue-600"
                    />
                    <span className="font-medium">Primary Image</span>
                  </label>

                  <div className="text-sm text-gray-600">
                    <span className="font-medium">
                      Order: {img.display_order}
                    </span>
                  </div>
                </div>
              </div>

              {/* File Info */}
              {img.image && (
                <div className="mt-3 text-xs text-gray-500 bg-gray-50 p-2 rounded border">
                  <strong>File:</strong> {img.image.name} (
                  {(img.image.size / 1024).toFixed(1)} KB)
                </div>
              )}
            </div>
          ))}

          {/* Add More Button */}
          <button
            onClick={addImageSlot}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
            type="button"
          >
            <Upload size={16} />
            Add Another Image
          </button>

          {/* Upload Summary */}
          {images.some((img) => img.image) && (
            <div className="mt-4 p-3 bg-blue-50 rounded-lg">
              <p className="text-blue-700 text-sm">
                {images.filter((img) => img.image).length} image(s) selected
                {images.some((img) => img.is_primary) && " • Primary image set"}
              </p>
            </div>
          )}
        </div>

        {/* Error and Success Messages */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
            {error}
          </div>
        )}
        {isSuccess && (
          <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg">
            Product created successfully!
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isPending}
          className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
        >
          {isPending ? "Creating Product..." : "Create Product"}
        </button>
      </form>
    </div>
  );
}

// Helper to convert File to base64 string
function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      resolve(reader.result as string);
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}
