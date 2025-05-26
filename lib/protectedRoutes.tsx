import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store";

export function UseProtectedRoutes() {
  const router = useRouter();
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn());
  if (!isLoggedIn) {
    router.push("/login");
    return;
  }

  return <div></div>;
}
