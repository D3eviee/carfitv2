import { Pen } from "lucide-react";
import { useForm } from "react-hook-form";

export default function FifthStep() {
  const { register } = useForm();

  const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

  return (
    <form onSubmit={() => {}}>      
      <div>
            {daysOfWeek.map((day, key)=> {
                  return (<WorkingDay key={key} day={day} />)
            })}
      </div>
    </form>
  );
}

const WorkingDay = ({day}:{day:string}) => {
  return (
    <div className="grid grid-cols-[1fr_8fr_10fr_1fr] py-3.5 px-1 items-center border-t-[0.5px] border-[#CCCCCC] first-of-type:border-none">
      <input type="checkbox" className="w-4 h-4" />
      <h3 className="font-normal text-[#333333] pl-3 text-sm">{day}</h3>
      <p className="box-border pr-10 text-right text-sm m-0 text-[#333333] font-light ">18:00 - 20:00</p>
      <Pen color="#777777" size={15} />
    </div>
  );
};
