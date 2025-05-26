"use client";

import { useSingIn, useSingUp } from "@/hooks/auth";
import { useAuthStore } from "@/store";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const formSchema = z
  .object({
    first_name: z.string().min(1, "First name is required"),
    last_name: z.string().min(1, "Last name is required"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    password_confirmation: z.string(),
    phone: z.string().min(9, "Phone number is required"),
    date_of_birth: z.string(),
  })
  .refine((data) => data.password === data.password_confirmation, {
    message: "Passwords do not match",
    path: ["password_confirmation"],
  });

export default function RegisterForm() {
  type FormData = z.infer<typeof formSchema>;
  const { login } = useAuthStore();
  const router = useRouter();
  const { mutate, data, error, isPending } = useSingUp();
  const {
    mutate: loginMutate,
    data: loginData,
    isPending: isLoggedInPending,
  } = useSingIn();

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      first_name: "",
      last_name: "",
      email: "",
      password: "",
      password_confirmation: "",
      phone: "",
      date_of_birth: "",
    },
  });

  const onSubmit = (data: FormData) => {
    mutate(data, {
      onSuccess: (responseData) => {
        login(responseData.token);
        router.push("/");
      },
      onError: (errorResponse) => {
        console.log("Signup error:", errorResponse?.message);
      },
    });
  };
  return (
    <div className="flex w-full  items-center justify-center ">
      <div className="bg-[#B88E2F]  flex flex-col rounded-2xl">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-6 p-4 w-[20rem] md:w-[30rem]"
        >
          <h1 className="text-2xl font-bold text-center">Register</h1>
          <input
            {...register("email")}
            type="email"
            placeholder="Email"
            className="p-2 border border-gray-300 rounded"
          />
          {errors.email && (
            <p className="text-red-500">{errors.email.message}</p>
          )}
          <input
            {...register("phone")}
            type="phone"
            placeholder="phone"
            className="p-2 border border-gray-300 rounded"
          />
          {errors.phone && (
            <p className="text-red-500">{errors.phone.message}</p>
          )}

          <input
            {...register("first_name")}
            type="first_name"
            placeholder="First Name"
            className="p-2 border border-gray-300 rounded"
          />
          {errors.first_name && (
            <p className="text-red-500">{errors.first_name.message}</p>
          )}

          <input
            {...register("last_name")}
            type="last_name"
            placeholder="Last Name"
            className="p-2 border border-gray-300 rounded"
          />
          {errors.last_name && (
            <p className="text-red-500">{errors.last_name.message}</p>
          )}
          <input
            {...register("password")}
            type="password"
            placeholder="password"
            className="p-2 border border-gray-300 rounded"
          />
          {errors.password && (
            <p className="text-red-500">{errors.password.message}</p>
          )}

          <input
            {...register("password_confirmation")}
            type="password"
            placeholder="confirm password"
            className="p-2 border border-gray-300 rounded"
          />
          {errors.password_confirmation && (
            <p className="text-red-500">
              {errors.password_confirmation.message}
            </p>
          )}
          <input
            {...register("date_of_birth")}
            type="date"
            placeholder="Date of birth"
            className="p-2 border border-gray-300 rounded"
          />
          {errors.date_of_birth && (
            <p className="text-red-500">{errors.date_of_birth.message}</p>
          )}
          <button
            disabled={isPending}
            className="bg-[#fff] text-black p-2 rounded"
          >
            {isPending ? "Loading..." : "Register"}
          </button>
          <p className="text-center">
            Don't have an account?{" "}
            {/* <button
                type="button"
                onClick={() => handleTab("login")}
                className="text-blue-500"
              >
                Log in
              </button> */}
          </p>
        </form>
      </div>
    </div>
  );
}
