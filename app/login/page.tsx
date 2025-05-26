"use client";

import { useSingIn, useSingUp } from "@/hooks/auth";
import { useAuthStore } from "@/store";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Cookies from "js-cookie";

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

const signupSchema = z
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

export default function LoggedIn() {
  const [isLoggedIn, setIsLoggedIn] = useState<string>("login");

  // Then use the appropriate schema based on mode
  const currentSchema = isLoggedIn === "login" ? loginSchema : signupSchema;

  type FormData = z.infer<typeof currentSchema>;
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
    resolver: zodResolver(currentSchema),
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

  const handleTab = (txt: string) => {
    setIsLoggedIn(txt);
  };

  const onSubmit = (data: FormData) => {
    console.log("Loggging data:", data);

    const payload = {
      email: data.email,
      password: data.password,
    };

    loginMutate(payload, {
      onSuccess: (responseData) => {
        login(responseData.token);
        const token = responseData.token;
        Cookies.set("admin-auth-token", token, {
          secure: false,
          sameSite: "strict",
        });
        router.push("/");
      },
      onError: (errorResponse) => {
        console.log("Login error:", errorResponse?.message);
      },
    });
  };
  return (
    <div className="flex w-full h-[100dvh] items-center justify-center ">
      <div className="bg-[#B88E2F]  flex flex-col rounded-2xl">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-6 p-4 w-[20rem] md:w-[30rem]"
        >
          <h1 className="text-2xl font-bold text-center">Login</h1>
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
            {...register("password")}
            type="password"
            placeholder="Password"
            className="p-2 border border-gray-300 rounded"
          />
          {errors.password && (
            <p className="text-red-500">{errors.password.message}</p>
          )}
          <button
            // disabled={isLoggedInPending}
            className="bg-[#fff] text-black p-2 rounded cursor-pointer"
          >
            {" "}
            {isLoggedInPending ? "Loading..." : "Login"}
          </button>
          {/* <p className="text-center">
            Don't have an account?{" "}
            <button
              type="button"
              onClick={() => handleTab("register")}
              className="text-blue-500"
            >
              register
            </button>
          </p> */}
        </form>

        <div className="flex items-center justify-center px-4 py-2">
          <div className="w-full border-t border-gray-300"></div>
          <span className="mx-2 text-gray-500">or</span>
          <div className="w-full border-t border-gray-300"></div>
        </div>
      </div>
    </div>
  );
}
