import BookingServiceList from "../booking-service-list"
import { BookingCalendar } from "./booking-calendar"

export const BookingChoosingDate = () => {
    return (
        <div className="w-7/12">
          <BookingCalendar/>
        </div>
    )
}