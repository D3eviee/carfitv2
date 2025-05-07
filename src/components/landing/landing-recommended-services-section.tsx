import { getRecommendedServices } from "@/app/(landing)/actions";
import BusinessCard from "../business-card";

export default async function LandingRecommendedServicesSection() {
  const recommendedServices = await getRecommendedServices()

  if ('error' in recommendedServices) {
    return <p>Wystąpił błąd podczas pobierania rekomendacji.</p>;
  }

  return (
    <div className="mt-20 "> 
        <h3 className="font-md text-[#333] text-[25px]">Recommended</h3>
        <div className="mt-[30px] flex flex-row gap-8 overflow-scroll">
          {recommendedServices.length === 0 && <p>No services are recommened</p>}

          {recommendedServices ? recommendedServices!.map((service) => (
            <BusinessCard key={service.id} serviceData={service}/>
          ))
          : "No services are recommened"
        }
        </div>
    </div>
  );
}