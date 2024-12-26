import { Calendar, Home, Inbox, Search, Settings } from "lucide-react";
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
import React from "react";

// Define menu items
const items = [
  {
    title: "Home",
    url: "#",
    icon: Home,
  },
  {
    title: "product",
    url: "/admin/product",
    icon: Inbox,
  },
  {
    title: "Orders",
    url: "/admin/order",
    icon: Calendar,
  },
  {
    title: "Customers",
    url: "/admin/customer",
    icon: Search,
  },
  {
    title: "Settings",
    url: "#",
    icon: Settings,
  },
];

// Define props for the AppSidebar
interface AppSidebarProps {
  property?: any; // Replace `any` with a specific type if you know the exact structure
}

export function AppSidebar({ property }: AppSidebarProps) {
  return (
    <Sidebar variant="sidebar">
      <SidebarContent>
        {items?.map((item) => {
          return (
            <SidebarMenuButton asChild>
              <a href={item.url} className="flex items-center gap-2">
                <item.icon />
                <span>{item.title}</span>
              </a>
            </SidebarMenuButton>
          );
        })}
        {/* <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                 
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup> */}
      </SidebarContent>
    </Sidebar>
  );
}
