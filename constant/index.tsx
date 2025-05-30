import { profile } from "console";

export const BASE_URL = "https://backend-dev-si6tfq.laravel.cloud/";
export const endpoints = {
  LOGIN: "/api/v1/auth/admin/login",
  auth: {
    SIGNUP: "/api/v1/auth/admin/signup",
  },
  product: {
    GET_PRODUCTS: "/api/v1/admin/product",
    GET_PRODUCTDETAILS: (id: number) => `/api/v1/admin/product/${id}`,
    CREATE_PRODUCT: "/api/v1/admin/product",
    UPDATE_PRODUCT: (id: string) => `/api/v1/admin/product/${id}`,
    DELETE_PRODUCT: (id: number) => `/api/v1/admin/product/${id}`,
  },

  category: {
    GET_CATEGORY: "/api/v1/admin/category",
    CREATE_CATEGORY: "/api/v1/admin/category",
  },

  order: {
    GET_ORDERS: "/api/v1/admin/order",
    ORDER_DETAILS: (id: string) => `/api/v1/admin/order/${id}`,
    UPDATE_ORDER: (id: string) => `/api/v1/admin/order/${id}`,
    GET_ORDER_SUMMARY: "/api/v1/admin/order/summary",
  },
  profile: {
    GET_PROFILE: "/api/v1/users/profile",
    UPDATE_PROFILE: (id: string) => `/api/v1/users/profile/${id}`,
  },
  dashboard: {
    GET_DASHBOARD_SUMMARY: "/api/v1/admin/dashboard",
    GET_DASHBOARD_CHART: "/api/v1/admin/dashboard/users",
  },
};
