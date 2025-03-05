import DashboardNavbar from "@/components/dashboard-navbar";
import { SidebarNavigation } from "@/components/sidebar-navigation";
import { ReactNode } from "react";

export default function Layout({children}: {children: ReactNode}) {

  return (
        <>
          <DashboardNavbar/>
          <SidebarNavigation/>
          {children}
        </>
  );
}
