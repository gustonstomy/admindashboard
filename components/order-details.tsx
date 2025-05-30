"use client";

import React, { useState } from "react";
import {
  Package,
  User,
  MapPin,
  Calendar,
  CreditCard,
  AlertCircle,
  CheckCircle,
  XCircle,
  Clock,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useGetOrderDetails } from "@/hooks/useOrders";

interface OrderDetailsProps {
  id: any;
}

const OrderDetails: React.FC<OrderDetailsProps> = ({ id }) => {
  const { data: orderDetailsData, isLoading: orderDetailsLoading } =
    useGetOrderDetails(id);

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Sample data - replace with your actual prop data
  const data = {
    message: "Order retrieved successfully",
    data: {
      id: 2,
      order_number: "20250515GF5KY5",
      status: "cancelled",
      subtotal: "99.99",
      tax: "0.00",
      shipping_cost: "0.00",
      discount: "0.00",
      total_amount: "99.99",
      amount_paid: "0.00",
      payment_method: null,
      payment_status: "unpaid",
      amount_due: 99.99,
      notes: null,
      lat: "5.667783",
      lng: "-0.166718",
      address: "MR9M+376, Madina",
      created_at: "2025-05-15T16:26:56.000000Z",
      user: {
        id: 1,
        name: "Derrick Azaglo",
        email: "de.azaglo@gmail.com",
        phone: "+233549632604",
      },
      order_group: {
        id: 2,
        created_at: "2025-05-15T16:26:56.000000Z",
      },
      items: [
        {
          id: 2,
          quantity: 1,
          price: null,
          total: "0.00",
          product: {
            id: 1,
            name: "Test Product",
            description: "This is a sample product description.",
            price: "99.99",
            sku: "HOGAe040",
          },
          images: [
            {
              id: 1,
              image_url:
                "https://res.cloudinary.com/dfdz4coc9/image/upload/v1747326225/image/rvr691m1wv1ozxmqtge6.jpg",
              display_url: 1,
              is_primary: true,
            },
            {
              id: 2,
              image_url:
                "https://res.cloudinary.com/dfdz4coc9/image/upload/v1747326230/image/idymetwf5fhfiuryyan1.jpg",
              display_url: 2,
              is_primary: false,
            },
          ],
        },
      ],
    },
  };

  const order = orderDetailsData?.data.data;

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800 border-green-200";
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "cancelled":
        return "bg-red-100 text-red-800 border-red-200";
      case "processing":
        return "bg-blue-100 text-blue-800 border-blue-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status?.toLowerCase()) {
      case "completed":
        return <CheckCircle className="w-4 h-4" />;
      case "pending":
        return <Clock className="w-4 h-4" />;
      case "cancelled":
        return <XCircle className="w-4 h-4" />;
      case "processing":
        return <Package className="w-4 h-4" />;
      default:
        return <AlertCircle className="w-4 h-4" />;
    }
  };

  const getPaymentStatusColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case "paid":
        return "bg-green-100 text-green-800";
      case "unpaid":
        return "bg-red-100 text-red-800";
      case "partial":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formatCurrency = (amount: string | number) => {
    return `$${parseFloat(amount?.toString()).toFixed(2)}`;
  };

  const nextImage = () => {
    if (order.items[0]?.images) {
      setCurrentImageIndex((prev) =>
        prev === order.items[0].images.length - 1 ? 0 : prev + 1
      );
    }
  };

  const prevImage = () => {
    if (order.items[0]?.images) {
      setCurrentImageIndex((prev) =>
        prev === 0 ? order.items[0].images.length - 1 : prev - 1
      );
    }
  };

  return (
    <div className="max-w-6xl lg:ml-8 p-6  min-h-screen">
      {/* Header */}
      <div className="bg-white rounded-lg  border border-gray-200 p-6 mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Order Details</h1>
            <p className="text-gray-600 mt-1">Order #{order?.order_number}</p>
          </div>
          <div className="flex items-center gap-3">
            <span
              className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(
                order?.status
              )}`}
            >
              {getStatusIcon(order?.status)}
              {order?.status?.charAt(0).toUpperCase() + order?.status?.slice(1)}
            </span>
            <span
              className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getPaymentStatusColor(
                order?.payment_status
              )}`}
            >
              <CreditCard className="w-4 h-4 mr-1" />
              {order?.payment_status.charAt(0).toUpperCase() +
                order?.payment_status.slice(1)}
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Order Items */}
        <div className="lg:col-span-2 space-y-6">
          {/* Order Items */}
          <div className="bg-white rounded-lg  border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                <Package className="w-5 h-5" />
                Order Items
              </h2>
            </div>
            <div className="p-6">
              {order?.items.map((item: any, index: number) => (
                <div key={item?.id} className="flex gap-4">
                  {/* Product Images */}
                  <div className="flex-shrink-0">
                    {item?.images && item?.images.length > 0 ? (
                      <div className="relative">
                        <img
                          src={item?.images[currentImageIndex]?.image_url}
                          alt={item?.product?.name}
                          className="w-24 h-24 object-cover rounded-lg border border-gray-200"
                        />
                        {item?.images?.length > 1 && (
                          <div className="absolute inset-0 flex items-center justify-between">
                            <button
                              onClick={prevImage}
                              className="bg-black bg-opacity-50 text-white p-1 rounded-full hover:bg-opacity-70 transition-all"
                            >
                              <ChevronLeft className="w-3 h-3" />
                            </button>
                            <button
                              onClick={nextImage}
                              className="bg-black bg-opacity-50 text-white p-1 rounded-full hover:bg-opacity-70 transition-all"
                            >
                              <ChevronRight className="w-3 h-3" />
                            </button>
                          </div>
                        )}
                        {item?.images?.length > 1 && (
                          <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 flex gap-1">
                            {item?.images?.map((_: any, imgIndex: number) => (
                              <div
                                key={imgIndex}
                                className={`w-1.5 h-1.5 rounded-full ${
                                  imgIndex === currentImageIndex
                                    ? "bg-blue-500"
                                    : "bg-gray-300"
                                }`}
                              />
                            ))}
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="w-24 h-24 bg-gray-200 rounded-lg flex items-center justify-center">
                        <Package className="w-8 h-8 text-gray-400" />
                      </div>
                    )}
                  </div>

                  {/* Product Details */}
                  <div className="flex-grow">
                    <h3 className="font-semibold text-gray-900">
                      {item?.product?.name}
                    </h3>
                    <p className="text-gray-600 text-sm mt-1">
                      {item?.product?.description}
                    </p>
                    <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                      <span>SKU: {item?.product?.sku}</span>
                      <span>Qty: {item?.quantity}</span>
                      <span className="font-medium text-gray-900">
                        {formatCurrency(item?.product?.price)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Customer Information */}
          <div className="bg-white rounded-lg  border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                <User className="w-5 h-5" />
                Customer Information
              </h2>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-500">
                    Name
                  </label>
                  <p className="text-gray-900 mt-1">{order?.user?.name}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">
                    Email
                  </label>
                  <p className="text-gray-900 mt-1">{order?.user?.email}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">
                    Phone
                  </label>
                  <p className="text-gray-900 mt-1">{order?.user?.phone}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">
                    Customer ID
                  </label>
                  <p className="text-gray-900 mt-1">#{order?.user?.id}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Delivery Information */}
          <div className="bg-white rounded-lg border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                <MapPin className="w-5 h-5" />
                Delivery Information
              </h2>
            </div>
            <div className="p-6">
              <div className="space-y-3">
                <div>
                  <label className="text-sm font-medium text-gray-500">
                    Address
                  </label>
                  <p className="text-gray-900 mt-1">{order?.address}</p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-500">
                      Latitude
                    </label>
                    <p className="text-gray-900 mt-1">{order?.lat}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">
                      Longitude
                    </label>
                    <p className="text-gray-900 mt-1">{order?.lng}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Order Summary */}
        <div className="space-y-6">
          {/* Order Summary */}
          <div className="bg-white rounded-lg  border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">
                Order Summary
              </h2>
            </div>
            <div className="p-6 space-y-4">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span className="text-gray-900">
                  {formatCurrency(order?.subtotal)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Tax</span>
                <span className="text-gray-900">
                  {formatCurrency(order?.tax)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Shipping</span>
                <span className="text-gray-900">
                  {formatCurrency(order?.shipping_cost)}
                </span>
              </div>
              {parseFloat(order?.discount) > 0 && (
                <div className="flex justify-between text-green-600">
                  <span>Discount</span>
                  <span>-{formatCurrency(order?.discount)}</span>
                </div>
              )}
              <div className="border-t pt-4">
                <div className="flex justify-between text-lg font-semibold">
                  <span>Total</span>
                  <span>{formatCurrency(order?.total_amount)}</span>
                </div>
              </div>
              <div className="space-y-2 pt-2 border-t">
                <div className="flex justify-between">
                  <span className="text-gray-600">Amount Paid</span>
                  <span className="text-gray-900">
                    {formatCurrency(order?.amount_paid)}
                  </span>
                </div>
                <div className="flex justify-between font-medium">
                  <span>Amount Due</span>
                  <span
                    className={
                      parseFloat(order?.amount_due.toString()) > 0
                        ? "text-red-600"
                        : "text-green-600"
                    }
                  >
                    {formatCurrency(order?.amount_due)}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Order Information */}
          <div className="bg-white rounded-lg  border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                Order Information
              </h2>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-500">
                  Order Date
                </label>
                <p className="text-gray-900 mt-1">
                  {formatDate(order?.created_at)}
                </p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">
                  Order ID
                </label>
                <p className="text-gray-900 mt-1">#{order?.id}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">
                  Order Group
                </label>
                <p className="text-gray-900 mt-1">#{order?.order_group?.id}</p>
              </div>
              {order?.payment_method && (
                <div>
                  <label className="text-sm font-medium text-gray-500">
                    Payment Method
                  </label>
                  <p className="text-gray-900 mt-1">{order?.payment_method}</p>
                </div>
              )}
              {order?.notes && (
                <div>
                  <label className="text-sm font-medium text-gray-500">
                    Notes
                  </label>
                  <p className="text-gray-900 mt-1">{order?.notes}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
