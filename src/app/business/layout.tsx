import BusinessNavbar from "@/components/business-navbar";
import "../globals.css";


export default  function RootLayout({children}: Readonly<{children: React.ReactNode}>) {
  return (
    <>
      <BusinessNavbar/>
      {children}
    </>
  );
}


