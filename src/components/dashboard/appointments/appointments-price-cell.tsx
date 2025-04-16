export  default function AppointmentDateCell({getValue}){
    const rawPrice = getValue()
    const price = `${parseFloat(rawPrice)} PLN`

    return (
        <div className="w-full ">
            <p className="text-sm text-[#111] font-normal w-fit">{price}</p>
        </div>
    )
}