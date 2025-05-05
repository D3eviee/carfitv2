import { GoHome } from "react-icons/go";
import Link from "next/link";
import DashboardContentContainer from "@/components/dashboard/dashboard-content-container";

export default function SettingsPage() {
  return (
    <DashboardContentContainer>
      <div className="mb-[50px]">
        <h1 className="m-0 p00 text-[27px] font-semibold text-black" >Ustawienia</h1>
        <h3 className="mt-[5px] p-0 text-sm font-light">Zarządzaj informacjami o swojej firmie, konfiguruj opcje marketingowe, kalendarz, zarządzaj uprawnieniami pracowników</h3>
      </div>
      
      <div className="w-[1077px] mt-[30px] grid gap-[30px] grid-cols-3">
        <SettingGridItem 
          title="Inormacje o biznesie" 
          description="Przeglądaj i edytuj szczegóły dotyczące swojej firmy, zarządzaj lokalizacjami, źródłem klientów i udostępniaj linki do mediów społecznościowych"
          redirect="business" 
        />
        <SettingGridItem 
          title="Dni pracy" 
          description="Zarządzaj dniami i godzinami, w które twój serwis jest otwarty" 
          redirect="working-days"
        />
        <SettingGridItem 
          title="Galleria" 
          description="Dodawaj i zmieniaj zdjęcia widoczne na stronie twojego serwisu." 
          redirect="gallery"
        />
        </div>
      </DashboardContentContainer>
  );
}

export function SettingGridItem({title, description, redirect}:{title:string, description:string, redirect:string}){
  return(
    <Link href={`settings/${redirect}`}>
    <div className="bg-[#FDFDFD] h-[144px] w-[307px] px-[30px] py-[15px] border-[1.25px] rounded-[10px] flex gap-[15px] hover:bg-[#FAFAFA] hover:border-[#F2F2F2] hover:cursor-pointer">
      <GoHome className="-mt-[20px]" size={70} color="#F25287"/>
      <div className="settings-page-grid-item-description">
        <h3 className="p-0 m-0 text-medium text-[#000] mb-[8px]">{title}</h3>
        <p className="p-0 m-0 text-xs text-[#111] font-light">{description}</p>
      </div>
    </div>
    </Link>
  )
}