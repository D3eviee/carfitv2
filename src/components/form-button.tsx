import { ButtonHTMLAttributes } from "react"

interface FormButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    label: string
}

export const FormButton = ({label, disabled}: FormButtonProps) => {
    return (
        <button 
            type="submit" 
            disabled={disabled}
            className="w-full flex bg-[#111111] py-2 justify-center items-center rounded-[7px] font-medium text-sm mt-[20px]"
        >{label}</button>
    )
}