export const BASE_URL = "https://backend-dev-si6tfq.laravel.cloud";
export const endpoints = {
  auth: {
    LOGIN: "/api/v1/auth/admin/login",
    SIGNUP: "/api/v1/auth/admin/signup",
  },
  product: {
    UPDATE_PROFILE: (id: string) => `/api/v1/users/profile/${id}`,
    GET_PRODUCTS: "/api/v1/admin/product",
    GET_PRODUCTDETAILS: (id: number) => `/api/v1/admin/product/${id}`,
    CREATE_PRODUCT: "/api/v1/admin/product",
    UPDATE_PRODUCT: (id: number) => `/api/v1/admin/product/${id}`,
    DELETE_PRODUCT: (id: number) => `/api/v1/users/product/${id}`,
  },

  category: {
    GET_CATEGORY: "/api/v1/admin/category",
    CREATE_CATEGORY: "/api/v1/admin/category",
  },

  order: {
    GET_ORDERS: "/api/v1/admin/order",
    GET_ORDER_DETAILS: (id: number) => `/api/v1/admin/order/${id}`,
  },
  GET_PROFILE: "/api/v1/users/profile",
};
