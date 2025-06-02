import { endpoints } from "@/constant";
import axiosInstance from "@/constant/axiosInstance";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

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

const createCategory = async (categoryData: any) => {
  const data = await axiosInstance.post(
    endpoints.category.CREATE_CATEGORY,
    categoryData,
    {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    }
  );
  return data;
};

export function useCreateCategory() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: {}) => createCategory(payload),
    onSuccess: () => {
      toast.success("Category Created successfully!");
      queryClient.invalidateQueries({ queryKey: ["productDetails"] });
      queryClient.invalidateQueries({ queryKey: ["products"] });
      queryClient.invalidateQueries({ queryKey: ["category"] });
    },
  });
}
const updateCategory = async (id: string, categoryData: any) => {
  const { data } = await axiosInstance.patch(
    endpoints.category.UPDATE_CATEGORY(id),
    categoryData,
    {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    }
  );
  return data;
};

export function useUpdateCategory() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, categoryData }: { id: string; categoryData: any }) =>
      updateCategory(id, categoryData),

    onSuccess: () => {
      toast.success("Category updated successfully!");
      queryClient.invalidateQueries({ queryKey: ["productDetails"] });
      queryClient.invalidateQueries({ queryKey: ["products"] });
      queryClient.invalidateQueries({ queryKey: ["category"] });
    },
  });
}
const deleteCategory = async (id: number) => {
  const { data } = await axiosInstance.delete(
    endpoints.category.DELETE_CATEGORY(id),
    {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    }
  );
  return data;
};

export function useDeleteCategory() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => deleteCategory(id),
    onSuccess: () => {
      toast.success("Category deleted successfully!");
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
    onError: () => {
      toast.error("Failed to delete category.");
    },
  });
}
