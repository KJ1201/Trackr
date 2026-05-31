import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import AppSidebar from "./AppSidebar";
import { Outlet } from "react-router-dom";

function AppLayout() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
      <SidebarTrigger />
        <Outlet />
      </SidebarInset>
    </SidebarProvider>
  );
}

export default AppLayout;
