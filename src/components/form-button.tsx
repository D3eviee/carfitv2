import { ButtonHTMLAttributes } from "react"

interface FormButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    label: string
}

export const FormButton = ({label, disabled, onClick}: FormButtonProps) => {
    return (
        <button 
            type="submit" 
            disabled={disabled}
            className="w-full flex text-white bg-[#111111] py-2 justify-center items-center rounded-[7px] font-medium text-sm mt-[20px]"
            onClick={onClick}
        >{label}</button>
    )
}