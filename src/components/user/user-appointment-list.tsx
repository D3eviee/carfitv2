'use client'
import { getClientAppointments } from "../../app/user/actions";
import { useQuery } from "@tanstack/react-query";
import UserAppointmentListItem from "./user-appointment-list-item";

export default function UserAppointmentList({userId}:{userId:string}){

  // GETTING ALL OF THE USER APPOINTMENTS
  const {data} = useQuery({
    queryKey: ["allAppointments", userId],
    queryFn: async () => {
      const appointments = await getClientAppointments()
      return appointments
    }
  })


  return (
    <div className="flex flex-col flex-wrap justify-between gap-5 min-h-56 w-full">
        {data?.length == 0 && <p className="flex items-center justify-center text-[#333] font-normal">No appointments</p>}

        {data?.map((item, i) => {
          return <UserAppointmentListItem key={i} appointmentDetails={item}/>
        })
        }
    </div>
  )
}