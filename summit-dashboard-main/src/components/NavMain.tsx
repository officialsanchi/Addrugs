"use client";

import {
  GalleryVerticalEnd,
  type LucideIcon,
} from "lucide-react";

import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { NavLink } from "react-router";

export function NavMain({
  items,
}: {
  items: {
    title: string;
    url: string;
    icon?: LucideIcon;
  }[];
}) {
  return (
    <SidebarGroup>
      <SidebarGroupContent className="flex flex-col gap-2">
        <SidebarMenu>
          <SidebarMenuItem className="flex items-center gap-2 pb-10">
            <div className="flex h-6 w-6 items-center justify-center rounded-md space-x-4 gap-4 bg-primary text-primary-foreground">
              <GalleryVerticalEnd className="size-4" />
            </div>
            ADdrugs
          </SidebarMenuItem>
        </SidebarMenu>
        <SidebarMenu className=" space-y-3">
          <SidebarGroupContent>
            <SidebarMenu className="space-y-2 px-2">
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink to={item.url}>
                      {item?.icon && <item.icon />}
                      <span>{item.title}</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
