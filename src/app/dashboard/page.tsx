'use client'
import DashboardContentContainer from "@/components/dashboard/dashboard-content-container";
import { ErrorAlertContainer } from "@/components/error-alert-container";
import { useContainerErrorStore } from "@/lib/store";

export default function Dashboard() {

  const err = useContainerErrorStore(state => state.errorMessage)
  console.log(err)

  return (
    <ErrorAlertContainer>
      <DashboardContentContainer>
        <div>DASHBOARD MAIN</div>
      </DashboardContentContainer>
    </ErrorAlertContainer>
  );
}
