import SettingsBusinessWorkHoursItemEditSelector from "./settings-business-work-hours-item-edit-selector";
import ToggleSwitch from "./settings-business-work-hours-item-edit-toggle";

type Day = {
  id: string
  updatedAt: Date;
  serviceId: string;
  dayOfWeek: string
  open: string;
  close: string;
  isOpen: boolean;
}

export default function SettingsBusinessWorkHoursItemEdit({day}:{day:Day} ) {
  return (
    <div className="w-full flex flex-row justify-between c items-center py-4 px-4 border bg-[#F2F4F8] rounded">
      <h3 className="text-sm font-medium text-[#000] w-28 border">{day.dayOfWeek}</h3>
      {day.isOpen && <SettingsBusinessWorkHoursItemEditSelector day={day.dayOfWeek} open={day.open} close={day.close}/>}
      <ToggleSwitch isOpen={day.isOpen} dayName={day.dayOfWeek}/>
    </div>
  );
}