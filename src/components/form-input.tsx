import { InputHTMLAttributes } from "react"
import { UseFormRegister } from "react-hook-form"

interface FormInputProps extends InputHTMLAttributes<HTMLInputElement>{
    id: string
    register: UseFormRegister<any>
}

export const FormInput = ({type, id, placeholder, defaultValue, register}: FormInputProps) => {
    return (
        <input
            type={type}
            {...register(id)}
            id={id}
            placeholder={placeholder}
            defaultValue = {defaultValue}
            className="border-[0.5px] border-[#CCCCCC] w-full px-[7px] py-[5px] text-[#111] text-sm rounded-md mb-2 focus:outline-[#333333]"
          />
    )
}