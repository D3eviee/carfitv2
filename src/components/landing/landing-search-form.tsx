"use client";

import { MapPinned, Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LandingSearchForm() {
  const [location, setLocation] = useState("")
  const router = useRouter();

  const handleSearch = () => {
    const params = new URLSearchParams()
    if (location) params.append("location", location)
    router.push(`/search?${params.toString()}`)
  }

  return (
    <div className="py-2.5 px-3.5 mb-56 flex flex-row border border-[#333333] rounded-md gap-[15px]">
      <div className="flex flex-row w-full">
        {/* <div className="flex flex-row pr-1 w-full">
          <label htmlFor="service">
            <Search strokeWidth={1.5} className="pr-1" />
          </label>
          <input
            type="text"
            id="service"
            placeholder="Type of service"
            className="outline-none w-full"
            onChange={(e) => setService(e.target.value)}
          />
        </div> */}
        <div className="flex flex-row gap-3 w-full">
          <label htmlFor="location">
            <MapPinned strokeWidth={1.5} className="pr-1" />
          </label>
          <input
            type="text"
            id="location"
            placeholder="Location"
            className=" outline-none placeholder:text-red w-full"
            onChange={(e) => setLocation(e.target.value)}
          />
        </div>
      </div>

      <button
        className="h-7 font-semibold text-sm py-1 px-4 rounded-md bg-black text-white hover:bg-[#333333]"
        onClick={() => handleSearch()}
      >
        Search
      </button>
    </div>
  );
}
