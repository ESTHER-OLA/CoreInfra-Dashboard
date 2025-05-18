"use client";
import { usePathname } from "next/navigation";
import { Search, Bell, User } from "lucide-react";
import { CiHome } from "react-icons/ci";
import { sidebarItems } from "@/lib/sidebarItems";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function AppHeader() {
  const pathname = usePathname();

  const findCurrentItem = (items, path) => {
    for (const item of items) {
      if (item.href && path.startsWith(item.href)) {
        return item;
      }

      if (item.children) {
        const child = item.children.find((child) =>
          path.startsWith(child.href)
        );
        if (child) return child;
      }
    }

    return null;
  };

  const currentItem = findCurrentItem(sidebarItems, pathname);

  const pageName = currentItem?.name || "Dashboard";
  const Icon = currentItem?.icon || CiHome;

  return (
    <header className="bg-white lg:p-4 border-b flex items-center justify-between">
      <div className="flex items-center space-x-2 text-gray-600">
        <Icon className="h-5 w-5" />
        <span>{pageName}</span>
      </div>
      <div className="flex items-center lg:space-x-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search"
            className="pl-10 lg:w-64 w-40 h-9 rounded-full bg-gray-50"
          />
        </div>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
        </Button>
        <Button variant="ghost" size="icon">
          <User className="h-5 w-5" />
        </Button>
      </div>
    </header>
  );
}
