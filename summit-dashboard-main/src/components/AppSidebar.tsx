import {
  Calendar,
  GalleryVerticalEnd,
  Home,
  Inbox,
  LogOut,
  Settings,
  UserIcon,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import {  NavLink } from "react-router";
import { useRecoilState } from "recoil";
import { UserAuthState } from '@/atoms/authAtom';
import { UserState } from "@/atoms/userAtom";

export function AppSidebar({ children }: { children: React.ReactNode }) {

  const [_auth, setAuth] = useRecoilState(UserAuthState)
  const [user, setUser] = useRecoilState(UserState)
  const logout = ()=> {
    setAuth(null)
    setUser(null)
  }


// Menu items.
const items = [
  {
    title: "Home",
    url: "/",
    icon: Home,
  },
  {
    title: "Drugs",
    url: "/drugs",
    icon: Inbox,
  },
  {
    title: "Schedule",
    url: "/all-schedule",
    icon: Calendar,
  },
  {
    title: "Settings",
    url: "/settings",
    icon: Settings,
  },
];

const navSecondary = [
 
  {
    title: user?.fullName,
    url: "#",
    icon: UserIcon,
  },
  {
    title: "Logout",
    url: "#",
    icon: LogOut,
  },
];


  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel className="py-10 h-full text-lg px-2 flex items-center flex-col gap-2 justify-between uppercase">
              <SidebarMenuItem className="flex items-center gap-2 pb-10">
                <div className="flex h-6 w-6 items-center justify-center rounded-md space-x-4 gap-4 bg-primary text-primary-foreground">
                  <GalleryVerticalEnd className="size-4" />
                </div>
                ADdrugs
              </SidebarMenuItem>
              <SidebarGroupContent className="h-[80vh] flex justify-between flex-col">
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
                <SidebarMenu className="space-y-2 px-2">
                  {navSecondary.map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton asChild>
                        <div onClick={logout}>
                          {item?.icon && <item.icon />}
                          <span>{item.title}</span>
                        </div>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroupLabel>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
      <main className="px-4 w-full">
        <SidebarTrigger />
        {children}
      </main>
    </SidebarProvider>
  );
}
