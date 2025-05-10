import DashboardContentContainer from "@/components/dashboard/dashboard-content-container";
import "..//globals.css";
import Navbar from "@/components/navbar/navbar";


export default  function RootLayout({children}: Readonly<{children: React.ReactNode}>) {
  return (
    <>
      <Navbar/>
      <DashboardContentContainer>
        {children}
      </DashboardContentContainer>
    </>
  );
}