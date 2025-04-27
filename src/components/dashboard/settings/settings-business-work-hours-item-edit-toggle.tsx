'use client'
import { useSettingsEditingWorkingHours } from "@/lib/store";
import { useState } from "react";

export default function ToggleSwitch({ isOpen, dayName }: { isOpen: boolean, dayName: string }) {
  const [tempCheck, setTempCheck] = useState(isOpen)

  const updateIsOpen = useSettingsEditingWorkingHours((store) => store.updateIsOpen);

  const handleSwitch = () => {
    setTempCheck((prevState) => {
      const newState = !prevState;
      updateIsOpen(dayName, newState);
      return newState;
    });
  };

  return (
    <label className="relative cursor-pointer inline-block w-10 h-6">
    <input
      type="checkbox"
      className="sr-only"
      checked={tempCheck}
      onChange={handleSwitch}
    />
    <div
      className={`w-10 h-6 rounded-full transition-colors duration-300 ${
        tempCheck ? "bg-blue-600" : "bg-gray-300"
      }`}
    />
    <div
      className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow-md transform transition-transform duration-300 ${
        tempCheck ? "translate-x-4" : ""
      }`}
    />
  </label>
  );
}
