export default function Navbar(){
    return(
        <nav className="flex flex-row justify-between items-center px-20 pt-11">
            <h3 className="font-semibold text-2xl/7">CarFit</h3>
            <button className="px-[15px] py-[9px] text-white bg-black font-semibold rounded-[5px] text-sm hover:bg-[#333333]">Log in</button>
        </nav>
    )
}