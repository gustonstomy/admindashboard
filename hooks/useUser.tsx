import { endpoints } from "@/constant";
import axiosInstance from "@/constant/axiosInstance";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

const getUsers = async () => {
  const data = await axiosInstance.get(endpoints.user.GET_USERS, {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });
  return data;
};

export function useGetUsers() {
  return useQuery({
    queryKey: ["users"],
    queryFn: getUsers,
  });
}

const getUserDetails = async (id: string) => {
  const data = await axiosInstance.get(endpoints.user.GET_USER_DETAILS(id), {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });
  return data;
};

export function useGetUserDetails(id: string) {
  return useQuery({
    queryKey: ["userDetails", id],
    queryFn: () => getUserDetails(id),
  });
}

const userSummary = async () => {
  const data = await axiosInstance.get(endpoints.user.USER_SUMMARY, {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });
  return data;
};

export function useUserSummary() {
  return useQuery({
    queryKey: ["userSummary"],
    queryFn: userSummary,
  });
}

const deleteUser = async (id: number) => {
  const data = await axiosInstance.patch(endpoints.user.DELETE_USER(id), {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });
  return data;
};

export function useDeleteUser() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => deleteUser(id),
    onSuccess: () => {
      toast.success("User deleted successfully!");
      queryClient.invalidateQueries({ queryKey: ["dashboardChart"] });
    },
  });
}
