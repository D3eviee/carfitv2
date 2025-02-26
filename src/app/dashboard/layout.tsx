import DashboardNavbar from "@/components/dashboard-navbar";
import { SidebarNavigation } from "@/components/sidebar-navigation";
import { ReactNode } from "react";

export default function Layout({children}: {children: ReactNode}) {

  return (
      <div className="h- flex flex-col">
        <DashboardNavbar/>
        <div className="relative flex flex-row">
          <SidebarNavigation/>
          {children}
        </div>
      </div>
  );
}
