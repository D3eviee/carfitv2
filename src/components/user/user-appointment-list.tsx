'use client'
import { getAllClientAppointments } from "../../app/user/actions";
import { useQuery } from "@tanstack/react-query";
import UserAppointmentListItem from "./user-appointment-list-item";

export default function UserAppointmentList({userId}:{userId:string}){

  const {data} = useQuery({
    queryKey: ["allAppointments", userId],
    queryFn: async () => {
      const appointments = getAllClientAppointments(userId)
      return appointments
    }
  })

  return (
    <div className="grid columns-2 gap-6 min-h-56">
        {data?.length == 0 && <p className="flex items-center justify-center text-[#333] font-normal">No appointments</p>}

        {data?.map((item, i) => {
          return <UserAppointmentListItem key={i} appointmentDetails={item}/>
        })
        }
    </div>
  )
}