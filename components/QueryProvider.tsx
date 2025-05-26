"use client";

import React, { useEffect, useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "sonner";

const queryClient = new QueryClient();

export const ReactQueryProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      {/* Render Toaster only on the client */}
      {isClient && <Toaster richColors />}
      <div>{children}</div>
      {/* <ReactQueryDevtools initialIsOpen={false} /> */}
    </QueryClientProvider>
  );
};
