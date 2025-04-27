export default function SettingsBusinessWorkHoursItem({ day }) {
    return (
      <div className="flex justify-between items-center py-4 px-4 border bg-[#F2F4F8] rounded">
        <h3 className="text-sm font-medium text-[#000] ">{day.dayOfWeek}</h3>
        <p className="text-right text-sm m-0 text-[#333] font-semibold ">{day.isOpen ? `${day.open} - ${day.close}` : "Zamknięte"}</p>
      </div>
    );
}