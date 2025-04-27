import client_profile_picture from "@/../public/client_profile_picture.jpg";
import { addMinutes, format, getHours, getMinutes } from "date-fns";
import Image from "next/image";

type CalendarWeekViewEventProps = {
  clientId: string
  servicesIds: string[]
  reservationStart: Date
  duration: number
  charge: number
  client: {
    name: string
    email: string
    phone: string
  }
  clientName: string,
  clientPhone: string
};

export default function CalendarDayViewEvent({event}:{event:CalendarWeekViewEventProps}) {
  const startHour = getHours(event.reservationStart) - 6;
  const startMinutes = getMinutes(event.reservationStart);
  const blockHeight = Math.round(event.duration * 1.33);
  const top = (startHour * 80 + startMinutes * 1.33)

  const appointmentStartHour = format(event.reservationStart, "H")
  const appointmentStartMinute = format(event.reservationStart, "mm")
  const appointmentFinishHour = format(addMinutes(event.reservationStart, event.duration), "H")
  const appointmentFinishMinute = format(addMinutes(event.reservationStart, event.duration), "mm")

  return (
    <div
      className="absolute left-1/2 -translate-x-1/2 trans w-[98%] bg-[#9088D4] text-white text-sm  rounded-md p-2"
      style={{
        top: `${top}px`,
        height: `${blockHeight}px`,
      }}
    >
      <div className="h-full flex flex-row justify-between">
        <div className="flex flex-col ">
          <p className="font-medium text-xs">Wymaian opon</p>
          <p className="font-light text-xs">{`${appointmentStartHour}:${appointmentStartMinute} - ${appointmentFinishHour}:${appointmentFinishMinute}`}</p>
        </div>
        <div className="flex flex-row  items-center gap-1 mr-2">
          <div>
          <Image
            src={client_profile_picture}
            alt="client picture"
            className="rounded-full  h-[35px] w-[35px] mt-1"
          />
          </div>
          <div className="flex flex-col">
            <p className="font-normal text-xs">{event.clientId ? event.client.name :  event.clientName}</p>
            <p className="font-light text-xs">{event.clientId ? event.client.phone :  event.clientPhone}</p>
          </div>
        </div>
      </div>
    </div>
  );
}