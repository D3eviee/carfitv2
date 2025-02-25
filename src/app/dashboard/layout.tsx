import DashboardNavbar from "@/components/dashboard-navbar";
import { SidebarNavigation } from "@/components/sidebar-navigation";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="h- flex flex-col border">
      <DashboardNavbar/>
      <div className="relative flex flex-row">
        <SidebarNavigation/>
        {children}
      </div>
    </div>
  );
}
