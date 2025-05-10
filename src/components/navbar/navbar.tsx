import Link from "next/link";
import NavbarProfileMenu from "./navbar-profile";
import { getNavbarUserData } from "@/actions/actions";

export default async function Navbar() {
    //checking what type of user is loged id 
    const userData = await getNavbarUserData()

  return (
    <nav className="relative flex flex-row justify-between items-center px-20 pt-11">
      <Link href="/">
        <h3 className="font-semibold text-2xl/7">CarFit</h3>
      </Link>

      {userData ? (
        <div className="flex gap-4 justify-center items-center">
          <NavbarProfileMenu userData={userData} />
        </div>) 
      : (
        <div className="flex gap-6">
          <Link href="/support">
            <button className="px-[15px] py-[9px] text-[#111] bg-gray-100 font-semibold rounded-[5px] text-sm hover:bg-gray-200">Wsparcie</button>
          </Link>

          <Link href="/business">
            <button className="px-[15px] py-[9px] text-white bg-[#111] font-semibold rounded-[5px] text-sm hover:bg-[333]">Dla biznesu</button>
          </Link>
          <Link href="/sign-in">
            <button className="px-[15px] py-[9px] text-white bg-[#111] font-semibold rounded-[5px] text-sm hover:bg-[333]">Zaloguj</button>
          </Link>
        </div>
        )}
    </nav>
  )
}
