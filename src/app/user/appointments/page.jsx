import UserAppointmentList from '../../../components/user/user-appointment-list';
import { userAuth} from './../actions'

export default async function Appointments(){

  const user = userAuth()
  const id = (await user).id

  return (
    <div>
        <div className="mb-[50px]">
        <h1 className="m-0 p00 text-[27px] font-semibold text-black" >Appointments</h1>
        <h3 className="mt-[5px] p-0 text-sm font-light">Here you can see and manage all your appointments.</h3>
      </div>

      <UserAppointmentList userId={id} />
    </div>
  )
}