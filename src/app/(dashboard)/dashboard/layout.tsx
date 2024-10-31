import { AppSidebar } from "@/components/ui/app-sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import React from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="flex justify-center w-full">
        <SidebarTrigger />
        <div className="w-full mt-4 px-10 flex-grow">{children}</div>
      </main>
    </SidebarProvider>
  );
}
