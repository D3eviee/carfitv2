import { format } from "date-fns";

export  default function AppointmentPriceCell({getValue}){
    const rawDate = getValue();
    const date = format(rawDate, "P")


    return (<div>
        {date}
    </div>)
}