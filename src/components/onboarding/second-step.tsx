import Image from 'next/image';
import oklejanie from "../../../public/service_image_1.jpg"
import { ChevronRight } from 'lucide-react';

export default function SecondStep({ onClick = () => {} }){
  return(
      <form onSubmit={()=>{}} >
        <h4 className='text-sm text-[#777777] font-extralight'>Categories</h4>

        <div className='box-border max-h-[305px] overflow-scroll mt-3 '>
          <CategoryItem onClick={onClick}/>
          <CategoryItem onClick={onClick}/>
          <CategoryItem onClick={onClick}/>
          <CategoryItem onClick={onClick}/>
          <CategoryItem onClick={onClick}/>
          <CategoryItem onClick={onClick}/>
          <CategoryItem onClick={onClick}/>
        </div>
      </form>    
  )
}

function CategoryItem({ onClick = () => {} }) {
  return(
    <div className="box-border px-1 py-3 flex justify-between items-center border-b-[0.5px] border-[#CCCCCC]" onClick={onClick}>
      <div className="flex gap-3 items-center">
        <Image src={oklejanie} alt="Category image" height={45} width={45} className='aspect-square rounded-full'/>
        <h3 className="m-0 p-0 text-sm font-normal text-[#333333]">Wheel Change</h3>
      </div>
      <ChevronRight strokeWidth="0.5px" color='#333333'/>
    </div>
  )
}