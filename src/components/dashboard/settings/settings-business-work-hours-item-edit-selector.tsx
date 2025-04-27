'use client'

import { useSettingsEditingWorkingHours } from "@/lib/store";

export default function SettingsBusinessWorkHoursItemEditSelector({day, open, close}:{day:string, open:string, close:string}) {
  //ZUSTAND STORE
  const updateOpenHour = useSettingsEditingWorkingHours(store => store.updateOpenHour)
  const updateCloseHour = useSettingsEditingWorkingHours(store => store.updateCloseHour)

  const generateTimeOptions = () => {
    const times: string[] = [];
    for (let hour = 6; hour <= 21; hour++) {
      for (let min = 0; min < 60; min += 15) {
        const h = hour.toString().padStart(2, "0");
        const m = min.toString().padStart(2, "0");
        times.push(`${h}:${m}`);
      }
    }
    return times;
  };
  const allOptions = generateTimeOptions()
  const filteredCloseOptions = allOptions.filter((time) => time > open);

  const handleOpenSelectOnChange = (value:string) => {
    updateOpenHour(day, value)
  }

  const handleCloseSelectOnChange = (value:string) => {
    updateCloseHour(day, value)
  }


  return (
    <div className="flex flex-row justify-between gap-10">
      <select 
        className="border w-24 text-center" 
        defaultValue={String(open)}
        onChange={(e) => handleOpenSelectOnChange(e.target.value)}
        >
        {allOptions.map((item) => (
          <option key={item} value={item}>{item}</option>
        ))}
      </select>

      <select 
        className="border w-24 text-center" 
        defaultValue={close}
        onChange={(e) => handleCloseSelectOnChange(e.target.value)}
      >
        {filteredCloseOptions.map((item) => (
          <option key={item} value={item}>{item}</option>
        ))}
      </select>
    </div>
  );
}
