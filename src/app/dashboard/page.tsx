'use client'
import DashboardContentContainer from "@/components/dashboard/dashboard-content-container";
import { useContainerErrorStore } from "@/lib/store";

export default function Dashboard() {

  const err = useContainerErrorStore(state => state.errorMessage)
  return (
      <DashboardContentContainer>
        <div>DASHBOARD MAIN</div>
      </DashboardContentContainer>
  
  );
}
