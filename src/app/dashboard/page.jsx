
"use client";

import { DashboardContent } from "@/components/dashboard-layout"; // move your big component here

export default function DashboardPage() {
  const username = typeof window !== "undefined" ? sessionStorage.getItem("username") : "";
  return <DashboardContent username={username} />;
}
