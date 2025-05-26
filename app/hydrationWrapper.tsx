"use client";

// Important: This makes it a Client Component
import { useEffect, useState } from "react";
import Image from "next/image";
import shaqLogo from "@/public/images/shaqLogo.png";
import { useAuthStore } from "@/store";

export default function ClientHydrationWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isHydrated, setHydrated } = useAuthStore();
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  useEffect(() => {
    if (hasMounted) {
      setHydrated();
    }
  }, [hasMounted, setHydrated]);

  if (!isHydrated) {
    return (
      <section className="grid h-screen w-full place-content-center overflow-hidden bg-primarybg">
        {/* <Image src={shaqLogo} alt="shaqLogo" className="" /> */}
        <div className="h-20 w-20 animate-spin rounded-full border-4 border-solid border-primarybg border-t-transparent bg-white/50"></div>
      </section>
    );
  }

  return <>{children}</>;
}
