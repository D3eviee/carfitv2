import { ReactNode } from "react";

export default async function Modal({children}:{children:ReactNode}) {

  return (
    <>
     <div className="absolute w-full h-full bg-[#111]  opacity-30 top-0"/>
        <div className="absolute min-w-96 min-h-96 bg-white border top-[50%] translate-y-[-50%] left-[50%] translate-x-[-50%] rounded-xl ">
            <div className="flex justify-between items-center box-border px-4 py-3">
                <div className="text-center bg-red-500 rounded-[50%] w-[23px] text-white font-semibold">x</div>
                <p className="absolute left-[50%] translate-x-[-50%] text-medium  font-semibold">Title</p>
                <div className="px-3 border-[0.5px] border-[#F25287] text-[#F25287] tracking-wide font-semibold rounded-md hover:text-white hover:bg-[#F25287] hover:cursor-pointer">Save</div>
            </div>
            <div className="box-border p-10">
                {children}
            </div>
            
        </div>
    </>
  );
}
