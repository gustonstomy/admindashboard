import { endpoints } from "@/constant";
import axiosInstance from "@/constant/axiosInstance";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

const getProducts = async () => {
  const data = await axiosInstance.get(endpoints.product.GET_PRODUCTS, {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });
  return data;
};

export function useGetProducts() {
  return useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
  });
}

const getProductDetails = async (id: number) => {
  const data = await axiosInstance.get(
    endpoints.product.GET_PRODUCTDETAILS(id),
    {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    }
  );
  return data;
};

export function useGetProductDetails(id: number) {
  return useQuery({
    queryKey: ["productDetails", id],
    queryFn: () => getProductDetails(id),
  });
}

const getCategory = async () => {
  const data = await axiosInstance.get(endpoints.category.GET_CATEGORY, {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });
  return data;
};

export function useGetCategory() {
  return useQuery({
    queryKey: ["category"],
    queryFn: getCategory,
  });
}

const createProduct = async (payload: {
  name: string;
  description: string;
  size: string;
  category_id: number;
  price: number;
  currency: string;
  width: number;
  height: number;
  weight: number;
  stock_quantity: string;
  images: {};
}) => {
  const { data } = await axiosInstance.post(
    endpoints.product.CREATE_PRODUCT,
    payload,
    {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    }
  );
  return data;
};

export function useCreateProduct() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createProduct,
    onSuccess: () => {
      toast("Product created successfully!");
      queryClient.invalidateQueries({ queryKey: ["profile"] });
    },
  });
}

const updateProduct = async (id: string, payload: {}) => {
  const { data } = await axiosInstance.patch(
    endpoints.product.UPDATE_PRODUCT(id),
    payload,
    {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    }
  );
  return data;
};
export function useUpdateProduct(id: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: {}) => updateProduct(id, payload),
    onSuccess: () => {
      toast.success("Product updated successfully!");
      queryClient.invalidateQueries({ queryKey: ["productDetails", id] });
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });
}

const deleteProduct = async (id: number) => {
  const { data } = await axiosInstance.delete(
    endpoints.product.DELETE_PRODUCT(id),
    {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    }
  );
  return data;
};
export function useDeleteProduct(id: number) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => deleteProduct(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["productDetails"] });
      toast("Product deleted successfully!");
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });
}
