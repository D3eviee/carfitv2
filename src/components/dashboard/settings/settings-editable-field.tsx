import { useState } from "react";
import { Pencil } from "lucide-react";

type EditableFieldProps = {
  label: string;
  value: string;
  dbKey: string
  isEditable?: boolean
  onSave: (newValue: { [key: string]: string }) => void;
};

export default function SettingEditableField({ label, value, onSave, dbKey, isEditable = true }: EditableFieldProps) {
  const [editing, setEditing] = useState(false);
  const [tempValue, setTempValue] = useState(value);

  const handleSave = () => {
    onSave({[dbKey]: tempValue});
    setEditing(false);
  };

  const handleCancel = () => {
    setTempValue(value)
    setEditing(false);
  };

  return (
    <div className="flex flex-col gap-[2px]">
        <h3 className="p-0 m-0 text-[#333333] text-[13px] font-semibold">{label}</h3>
          
      {!editing ? (
        <div className="flex items-start justify-between">
          <p className="max-w-[230px] p-0 m-0 text-[#777777] text-[13px] font-normal">{value}</p>
          {isEditable && 
            <Pencil
            size={16}
            className="text-gray-500 cursor-pointer"
            onClick={() => setEditing(true)}
          />
          }
        </div>
      ) : (
        <div className="flex flex-row gap-2 justify-between border-[1px] border-[#777] rounded px-1 ">
          <input
            value={tempValue}
            onChange={(e) => setTempValue(e.target.value)}
            className="w-full py-2 text-gray-900 text-xs focus:outline-none"
          />
          <div className="flex flex-row items-center gap-4">
            <button
              onClick={handleCancel}
              className="text-sm text-gray-500 px-1.5 py-1  hover:bg-[#F2F2F2] hover:text-black"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="text-sm bg-[#111] px-1.5 py-1 rounded-sm text-white font-semibold hover:underline"
            >
              Save
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
