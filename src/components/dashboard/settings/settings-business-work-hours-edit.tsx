import SettingsBusinessWorkHoursItemEdit from "./settings-business-work-hours-item-edit";

type WorkingHour = {
  id: string;
  updatedAt: Date;
  serviceId: string;
  dayOfWeek: string;
  open: string;
  close: string;
  isOpen: boolean;
};

type SettingsBusinessWorkHoursProps = {
  workingHoursData: WorkingHour[];
};

export default function SettingsBusinessWorkHoursEdit({workingHoursData}:SettingsBusinessWorkHoursProps){

  return (
    <div className="flex flex-col gap-2 w-full">
        {workingHoursData.map((day, _)=> (
            <SettingsBusinessWorkHoursItemEdit key={day.dayOfWeek} day={day} />
        ))}
    </div>
    );
}
