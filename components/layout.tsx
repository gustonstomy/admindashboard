"use client";

import React, { ReactNode } from "react";
import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { usePathname } from "next/navigation";
// import { UseProtectedRoutes } from "@/lib/protectedRoutes";

interface HomeProps {
  children: ReactNode;
}

const Layout: React.FC<HomeProps> = ({ children }) => {
  const pathname = usePathname();
  const noLayoutRoutes = ["/login"];

  const isNoLayoutRoute = noLayoutRoutes.includes(pathname);

  if (isNoLayoutRoute) {
    return <main className="bg-primarybg">{children}</main>;
  }
  // UseProtectedRoutes();
  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties
      }
    >
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader />

        {children}
      </SidebarInset>
    </SidebarProvider>
  );
};
export default Layout;
