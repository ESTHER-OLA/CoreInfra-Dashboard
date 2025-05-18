import React from "react";
import { AppSidebar } from "@/components/AppSidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import AppHeader from "@/components/AppHeader";

export default function DashboardLayout({ children }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="w-full">
        <div className="block md:hidden">
          <SidebarTrigger />
        </div>
        <AppHeader />
        {children}
      </main>
    </SidebarProvider>
  );
}
