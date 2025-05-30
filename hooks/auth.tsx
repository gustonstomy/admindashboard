import { endpoints } from "@/constant";
import axiosInstance from "@/constant/axiosInstance";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const signUp = async (payload: {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  password_confirmation: string;
  phone: string;
  date_of_birth: string;
}) => {
  const { data } = await axiosInstance.post(endpoints.auth.SIGNUP, payload, {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });
  return data;
};

export function useSingUp() {
  return useMutation({
    mutationFn: signUp,
  });
}

const signIn = async (payload: { email: string; password: string }) => {
  const { data } = await axiosInstance.post(endpoints.LOGIN, payload, {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });
  return data;
};

export function useSingIn() {
  return useMutation({
    mutationFn: signIn,
  });
}

const updateProfile = async (
  payload: {
    first_name?: string;
    last_name?: string;
    email?: string;
    phone?: string;
  },
  id: string
) => {
  const { data } = await axiosInstance.patch(
    endpoints.profile.UPDATE_PROFILE(id),
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

export function useUpdateProfile(id: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: {
      first_name?: string;
      last_name?: string;
      email?: string;
      phone?: string;
    }) => updateProfile(payload, id),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["profile"] });
    },
  });
}

const getProfile = async () => {
  const data = await axiosInstance.get(endpoints.profile.GET_PROFILE, {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });
  return data;
};

export function useGetProfile() {
  return useQuery({
    queryKey: ["profile"],
    queryFn: getProfile,
  });
}
