import LandingSearchForm from "@/components/landing/landing-search-form";
import LandingTopServiceCard from "@/components/landing/landing-top-service-card";
import LandingRecommendedServicesSection from "@/components/landing/landing-recommended-services-section";
import { Suspense } from "react";


export default async function Landing() {
  const topServices = ["Wymiana kół", "Wymiana opon", "Detailing", "Czyszczenie auta", "Naprawa silnika"]

  return (
    <div className="mt-64 mx-64 mb-64">
      {/* PAGE HEADER */}
      <div className="mb-11">
        <h1 className="w-full text-6xl font-semibold">Book a visit</h1>
        <h1 className="w-full text-6xl font-semibold">keep your car fit</h1>
      </div>

      {/* SEARCH FORM */}
      <LandingSearchForm/>

      <div className="mb-100 "> 
        <h3 className="font-md text-[#333] text-[25px]">Najlepsze kategorie</h3>

        <div className="mt-[30px] flex gap-8 overflow-scroll ">
          {topServices.map(serviceName => (
            <LandingTopServiceCard key={serviceName} serviceCategoryName={serviceName}/>
          ))}
        </div>
      </div>
        
      <Suspense fallback={<p className="text-black">Loading...</p>}>
        <LandingRecommendedServicesSection />
      </Suspense>
      
    </div>
  );
}
