'use client'
import { type ClassValue, clsx } from "clsx"
import { useParams } from "next/navigation"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function displayVisitTime(rangeBeginning:number, rangeEnding:number, durationType: string, duration: number){
  if(durationType == "unknown") return "Czas trawani wizyty może być zmienny";
  else if(durationType == "precise"){
    const hours = Number(Math.floor(duration/60))
    const minutes = Number(duration%60)
    
    if(hours == 0) return `${minutes}min` 
    else if(minutes == 0 )return `${hours}h` 
    else return `${hours}h ${minutes}min`
  } 
  else{
    const [rangeBeginningHours, rangeBeginingMinutes] = [Math.floor(rangeBeginning/60), rangeBeginning%60]
    const [rangeEndingHours, rangeEndingMinutes] = [Math.floor(rangeEnding/60), rangeEnding%60]

    if(rangeBeginningHours == 0 && rangeEndingHours == 0) return String(rangeBeginingMinutes + "min - " + rangeEndingMinutes + "min")
    else if(rangeBeginningHours == 0){
      if(rangeEndingMinutes != 0) return String(rangeBeginingMinutes + "min - " + rangeEndingHours + "h " + rangeEndingMinutes + "min")
      else return String(rangeBeginingMinutes + "min - " + rangeEndingHours + "h ")
    }
    else {
      if(rangeBeginingMinutes != 0 && rangeEndingMinutes != 0) return String(rangeBeginningHours + "h " + rangeBeginingMinutes + "min - " + rangeEndingHours + "h " + rangeEndingMinutes + "min")
      else if(rangeBeginingMinutes == 0) return String(rangeBeginningHours + "h " + " - " + rangeEndingHours + "h " + rangeEndingMinutes + "min")
      else if(rangeEndingMinutes == 0) String(rangeBeginningHours + "h " + rangeBeginingMinutes + "min - " + rangeEndingHours + "h ")
    }
  }
}

 export function getServiceIdFromParams() {
    const param = useParams();
    if (Array.isArray(param.business)) {
        return param.business[param.business.length - 1]; // Handle case if it's an array
    } else if (param.business) {
        return param.business.slice(-36);
    } else {
        return "";
    }
}