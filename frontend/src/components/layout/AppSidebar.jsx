import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  SidebarFooter,
} from "@/components/ui/sidebar";
import { Link, useLocation } from "react-router-dom";
import SearchForm from "../common/SearchForm";
import {
  BriefcaseBusiness,
  CircleUser,
  LucideLayoutDashboard,
  FileUser,
  Files,
  KanbanSquareIcon
} from "lucide-react";
import ThreeDotMenu from "../common/ThreeDotMenu";
import { useAuth } from "@/context/authContext";

function AppSidebar() {
  const location = useLocation();

  const { user, logout } = useAuth();

  const sidebarItems = [
    { title: "Dashboard", url: "/dashboard", icon: LucideLayoutDashboard },
    { title: "Board", url: "/board", icon: KanbanSquareIcon },
    { title: "Applications", url: "/applications", icon: FileUser },
    { title: "Contacts", url: "/contacts", icon: CircleUser },
    { title: "Documents", url: "/documents", icon: Files },
  ];

  const menuItems = [{ title: "Logout", menuFunc: logout }];

  return (
    <Sidebar variant="inset">
      <SidebarHeader>
        <SidebarMenuButton
          size="lg"
          className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
        >
          <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
            <BriefcaseBusiness className="size-4" />
          </div>
          <div className="flex flex-col gap-0.5 leading-none">
            <span className="text-2xl font-black">Trackr</span>
          </div>
        </SidebarMenuButton>
        <SearchForm />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {sidebarItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    size="lg"
                    isActive={location.pathname === item.url}
                  >
                    <Link to={item.url}>
                      {item.icon && <item.icon className="size-5" />}
                      {item.title}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground justify-between"
            >
              <div className="flex items-center justify-center gap-2">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-ring text-sidebar-primary-foreground">
                  <CircleUser className="size-4" />
                </div>
                <div className="flex flex-col gap-0.5 leading-none">
                  <span className="font-black">{user.username}</span>
                </div>
              </div>
              <ThreeDotMenu itemList={menuItems} />
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}

export default AppSidebar;
