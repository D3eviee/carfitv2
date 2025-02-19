import { LabelHTMLAttributes } from "react";

interface LabelProps extends LabelHTMLAttributes<HTMLLabelElement> {
  text: string;
}

export const FormLabel = ({text, htmlFor} : LabelProps) => {
    return (
        <label htmlFor={htmlFor} className="inline-block text-[#333] text-[14px] mb-[5px]">{text}</label>
    )
}