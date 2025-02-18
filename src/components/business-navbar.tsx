import Link from "next/link";

export default async function BusinessNavbar(){
    return(
        <nav className="relative flex flex-row justify-between items-center px-20 pt-11">
            
            <Link href="/"><h3 className="font-semibold text-2xl/7">CarFit</h3></Link>

            <div className="flex gap-6">
            <Link href="/">
                <button className="px-[15px] py-[9px] text-white bg-black font-semibold rounded-[5px] text-sm hover:bg-[#333333]">Home</button>
            </Link> 
            <Link href="business/sign-in">
            <button className="px-[15px] py-[9px] text-white bg-black font-semibold rounded-[5px] text-sm hover:bg-[#333333]">Log in</button>
             </Link>
            </div>
        </nav>
    )
}
