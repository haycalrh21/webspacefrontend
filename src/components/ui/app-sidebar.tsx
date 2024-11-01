import {
  ArrowBigRightIcon,
  Calendar,
  Clipboard,
  Fence,
  Folder,
  Home,
  ListCheck,
  MessageCircle,
  Pencil,
  Slash,
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
} from "@/components/ui/sidebar";
import Link from "next/link";
import ButtonDarkMode from "../ButtonDarkMode";

// Menu items.
const managements = [
  {
    title: "Dashbord",
    url: "/dashboard",
    icon: Home,
  },
  {
    title: "project",
    url: "/dashboard/project",
    icon: Folder,
  },
  {
    title: "Board",
    url: "/dashboard/board",
    icon: Fence,
  },
  {
    title: "Roadmap",
    url: "/dashboard/roadmap",
    icon: Calendar,
  },
];

const discuss = [
  {
    title: "Blog",
    url: "/dashboard/blog",
    icon: Pencil,
  },
  {
    title: "Discussion",
    url: "/dashboard/discussion",
    icon: MessageCircle,
  },
];

const referentials = [
  {
    title: "Activity",
    url: "/dashboard/activity",
    icon: Clipboard,
  },
];
const Mystuff = [
  {
    title: "Tasks",
    url: "/dashboard/tasks",
    icon: ListCheck,
  },
  {
    title: "telegram",
    url: "/dashboard/telegram",
    icon: MessageCircle,
  },
];
const Setting = [
  {
    title: "Home",
    url: "/",
    icon: Slash,
  },
  {
    title: "Logout",
    url: "/",
    icon: ArrowBigRightIcon,
  },
];
export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Management</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {managements.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
          <SidebarGroupLabel>Discuss</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {discuss.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
          <SidebarGroupLabel>Referential</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {referentials.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
          <SidebarGroupLabel>My Stuff</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {Mystuff.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
          <SidebarGroupLabel>Setting</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {Setting.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <ButtonDarkMode />
      </SidebarContent>
    </Sidebar>
  );
}
