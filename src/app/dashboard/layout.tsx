import NavbarDashboard from "@/components/navbar/navbar-dashboard";
import { SidebarNavigation } from "@/components/sidebar-navigation";
import { ReactNode } from "react";

export default function Layout({children}: {children: ReactNode}) {
  return (
    <>
      <NavbarDashboard/>
      <SidebarNavigation/>
      {children}
    </>
  );
}
