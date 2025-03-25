import BookingServiceList from "../booking-service-list"

export const BookingChoosingServices = () => {
    return (
        <div className="w-7/12">
          <h1 className="text-[#000] text-3xl font-semibold mb-7">Choose Service</h1>
          <BookingServiceList/>
        </div>
    )
}