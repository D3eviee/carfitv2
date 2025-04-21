'use client'
import DashboardContentContainer from "@/components/dashboard/dashboard-content-container";
import { useQuery } from "@tanstack/react-query";
import { Bar, BarChart, Tooltip, XAxis, YAxis } from 'recharts';
import { getLastSevenDaysAppointmentNumbers, getLastSevenDaysServicesNumbers, getTodayReservations } from "./actions";
import { format, getDate } from "date-fns";
import { displayAppointmentTime } from "@/utils";
import { HandCoins, Watch } from "lucide-react";

export default function Dashboard() {
  const {data: appointments, status} = useQuery({
    queryKey: ["todayAppointments" ],
    queryFn: async () => {
      const events =  await getTodayReservations()
      return events
    }
  })

  const {data: last7DaysStas} = useQuery({
    queryKey: ["getLastSevenDaysAppointmentNumbers" ],
    queryFn: async () => {
      const number =  await getLastSevenDaysAppointmentNumbers()
      return number
    }
  })

  const {data: last7daysTopServices} = useQuery({
    queryKey: ["getLastSevenDaysServicesNumbers" ],
    queryFn: async () => {
      const amounts =  await getLastSevenDaysServicesNumbers()
      return amounts
    }
  })

  if(status == "pending") return <p>PENDING</p>
  if(status == "error") return <p>ERROR</p>

  console.log(last7daysTopServices)

  return (
      <DashboardContentContainer>  
        <div className="flex flex-row gap-8 w-full h-[800px]">
          <div className="border-2 w-1/2 h-full flex flex-col gap-8 p-8 rounded-[10px] ">
            <h1 className="font-semibold text-[#111s] text-xl">Dzisiejsze wizyty</h1>
            <div className="flex flex-col h-full overflow-scroll">
              {appointments?.map((item, index) => (
                <div key={index} className="border-b-[0.5px] border-b-[#F2F4F8] flex flex-row gap-8 w-full px-2 py-3">
                  <div className="text-black font-light text-xl text-right w-fit flex flex-col">
                    <p>{getDate(item.reservationStart)}</p>
                    <p>{format(item.reservationStart, "MMM")}</p>
                  </div>
                  
                <div className="flex flex-col w-full gap-4">
                    <p className="text-sm text-[#333] font-normal">{`${format(item.reservationStart, "EEEE")}, ${format(item.reservationStart, "d")} ${format(item.reservationStart, "MMMM")} ${format(item.reservationStart, "y")} ${format(item.reservationStart, "k")}:${format(item.reservationStart, "mm")}`}</p>

                    <div className="flex flex-row  flex-wrap gap-3">
                      {
                        item.services.map((item) => (
                          <p  key={item.service.name} className="text-xs text-[#111] font-medium bg-slate-200 px-2 py-1 rounded">{item.service.name}</p>
                        ))
                      }
                    </div>

                    <div className="flex flex-row items-center gap-4">
                      <div className="flex flex-row gap-1">
                        <Watch size={18} strokeWidth={2}/>
                        <p className="text-sm text-[#333] font-normal">{displayAppointmentTime(item.duration)}</p>
                      </div>
                      <div className="flex flex-row gap-1">
                        <HandCoins size={18} strokeWidth={2}/>
                        <p className="text-sm text-[#333] font-normal">{item.charge} PLN</p>
                      </div>
                      <p className="text-xs text-white font-medium bg-red-500 px-1.5 py-0.5 rounded-md">{item.status}</p>
                    </div>
                </div>
              </div>
              ))}

              {appointments?.length == 0 && <p className="text-center text-sm font-light text-[#333] h-full flex  justify-center items-center">Brak wizyt</p>}
            </div>
          </div>

          <div className="flex flex-col w-1/2 h-full gap-8">
            <div className="border-2 flex flex-col w-full h-1/2 p-8 rounded-[10px] justify-between gap-3">
              <div className="flex flex-col gap-1">
                <h1 className="font-semibold text-[#111] text-md">Liczba wizyt</h1>
                <div className="flex flex-row gap-2">
                  <h2 className="text-[#555] font-semibold text-2xl">Dzisiaj: </h2>
                  <h2 className="text-[#555] font-normal text-2xl">{last7DaysStas?.[6].numberOfVisits} Wizyty</h2>
                </div>
              </div>
              
              <div>
              <BarChart width={500} height={220} data={last7DaysStas}>
                  <XAxis dataKey="day"/>
                  <YAxis type="number" dataKey="numberOfVisits" allowDecimals={false}/>
                  <Tooltip  content={({ active, payload, label }) => {
                    if (active && payload && payload.length) {
                    return (
                      <div style={{ backgroundColor: 'white', padding: '8px', border: '1px solid #ccc', borderRadius: '6px' }}>
                        <p className="m-0 text-xs"><strong>{label}</strong></p>
                        <p className="m-0 text-xs">Liczba wizyt: {payload[0].value}</p>
                      </div>
                    );
                }
                return null;
              }}/>
                  <Bar dataKey="numberOfVisits" fill="#1674F0" barSize={20}/>
              </BarChart>
              </div>
            </div>
            
            <div className="border-2 flex flex-col w-full h-1/2 p-8 rounded-[10px] justify-between gap-8">
              <h1 className="font-semibold text-[#111] text-md">Najczęściej wybierane usługi</h1>
              <div>
              <BarChart width={500} height={250} data={last7daysTopServices} layout="vertical" margin={{left: 10 }}>
                <XAxis type="number" className="text-sm" allowDecimals={false} />
                <YAxis type="category" dataKey="name" className="text-xs" tick={{ fontSize: 14 }} />
                <Tooltip />
                <Bar dataKey="count" fill="#1674F0" barSize={20} />
              </BarChart>
              </div>
            </div>
          </div>
        </div>
      </DashboardContentContainer>
  );
}
