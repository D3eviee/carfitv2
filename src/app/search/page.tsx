'use client'
import { useQuery } from "@tanstack/react-query";
import { getSearchedBusinesses } from "../(landing)/actions";
import { useSearchParams } from 'next/navigation'
import BusinessCard from "@/components/business-card";

export default function Search() {
  const location = useSearchParams().get("location")

  const {data:searchResultBusinesses, status} = useQuery({
    queryKey: ["searchForBusinesses"],
    queryFn: async () => {
      if (!location) return []
      const result =  await getSearchedBusinesses(location)
      return result
    },
    enabled: !!location
  })

  if(status == "pending") return <p>LOADING...</p>
  if(status == "error") return <p>ERROR...</p>

  return (
    <div className="mt-20 px-64"> 
      <h3 className="font-md text-[#111] text-2xl">{`Warszataty dla: ${location}`}</h3>
      <div className="mt-[30px] flex flex-row gap-8 overflow-scroll">
      {searchResultBusinesses ?
        searchResultBusinesses.map((service) => (
          <BusinessCard key={service.id} serviceData={service}/>
        ))
        : "No data"
      }
      </div>
  </div>
  );
}
