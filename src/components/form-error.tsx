import { ReactNode } from "react"

export const FormError = ({children}: {children:ReactNode}) => {
    return (
        <p className="text-red-600 text-xs font-medium">{children}</p>
    )
}