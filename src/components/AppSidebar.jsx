"use client";
import Image from "next/image";
import { LogOut } from "lucide-react";
import { CiHome } from "react-icons/ci";
import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { sidebarItems } from "@/lib/sidebarItems";

export function AppSidebar() {
  const pathname = usePathname();

  // Sidebar should be blue if route is any /dashboard/cards* or related children
  const isCardsSection =
    pathname?.startsWith("/dashboard/cards") ||
    pathname?.startsWith("/dashboard/block-unblock-card") ||
    pathname?.startsWith("/dashboard/generate-reissue-pin") ||
    pathname?.startsWith("/dashboard/complaints-log") ||
    pathname?.startsWith("/dashboard/complaints-resolve") ||
    pathname?.startsWith("/dashboard/auth-list");

  const sidebarBgClass = isCardsSection ? "bg-dashboard" : "bg-dashboardWhite";

  const isActive = (href) => pathname === href;
  const isChildActive = (href) => pathname?.startsWith(href);

  const handleLogout = () => {
    sessionStorage.removeItem("username");
    window.location.href = "/login";
  };

  return (
    <Sidebar>
      <SidebarContent
        className={`transition-colors duration-300 ${sidebarBgClass} overflow-y-scroll text-textcolor hover:bg-hover scrollbar-hide`}
      >
        <SidebarGroup>
          <SidebarGroupLabel className="py-10">
            <Image
              src="/Lapo_Logo_rbg.png"
              alt="LAPO"
              width={120}
              height={50}
              className="h-auto"
            />
          </SidebarGroupLabel>

          <SidebarGroupContent>
            <Link
              href="/dashboard"
              className={`flex items-center gap-2 px-4 py-2 text-md rounded-md ${
                isActive("/dashboard")
                  ? "bg-hover text-button font-semibold border"
                  : ""
              }`}
            >
              <CiHome className="h-5 w-5" />
              Dashboard
            </Link>

            <div className="text-[10px] font-medium text-[#7E8B9C] p-4 uppercase">
              Main Menu
            </div>

            <SidebarMenu>
              {sidebarItems.map((item) =>
                item.children ? (
                  <SidebarMenuItem key={item.name}>
                    <details
                      className={`group w-full ${
                        item.children.some((child) => isChildActive(child.href))
                          ? "open"
                          : ""
                      }`}
                    >
                      {/* cards */}
                      <summary
                        className={`flex items-center gap-2 px-4 py-2 cursor-pointer text-md rounded-md list-none ${
                          item.children.some((child) =>
                            isChildActive(child.href)
                          )
                            ? "bg-hover text-button font-semibold border"
                            : ""
                        }`}
                      >
                        <item.icon className="h-5 w-5" />
                        {item.name}
                      </summary>

                      {/* cards items */}
                      <div className="pl-8 mt-1 space-y-1">
                        {item.children.map((child) => (
                          <Link
                            key={child.name}
                            href={child.href}
                            className={`flex items-center gap-2 px-4 py-2 rounded-md text-md ${
                              isActive(child.href)
                                ? "bg-hover text-button font-semibold border"
                                : ""
                            }`}
                          >
                            <child.icon className="h-4 w-4" />
                            {child.name}
                          </Link>
                        ))}
                      </div>
                    </details>
                  </SidebarMenuItem>
                ) : (
                  // other items
                  <SidebarMenuItem key={item.name}>
                    <SidebarMenuButton asChild>
                      <Link
                        href={item.href}
                        className={`flex items-center gap-2 px-4 py-2 rounded-md text-md ${
                          isActive(item.href)
                            ? "bg-hover text-button font-semibold border"
                            : "text-textcolor"
                        }`}
                      >
                        <item.icon className="h-5 w-5" />
                        {item.name}
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )
              )}

              <div className="p-4 mt-10" onClick={handleLogout}>
                <button className="flex items-center w-full px-4 py-2 text-sm text-[#121212] font-bold hover:bg-red-700 hover:text-dashboardWhite rounded-md">
                  <LogOut className="h-5 w-5 mr-3" />
                  Logout
                </button>
              </div>

              <div className="p-4 text-xs text-[#808080] mt-10">
                POWERED BY
                <div className="mt-2">
                  <Image
                    src="/Vector.png"
                    alt="LAPO"
                    width={120}
                    height={50}
                    className="h-auto"
                  />
                </div>
              </div>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
