import { GoHome } from "react-icons/go";
import Link from "next/link";
import DashboardContentContainer from "@/components/dashboard/dashboard-content-container";

export default function SettingsPage() {
  return (
    <DashboardContentContainer>
      <div className="mb-[50px]">
        <h1 className="m-0 p00 text-[27px] font-semibold text-black" >Settings</h1>
        <h3 className="mt-[5px] p-0 text-sm font-light">Manage your business information, set up marketing options, calendar, mange workers permissions and more.</h3>
      </div>
      
      <div className="w-[1077px] mt-[30px] grid gap-[30px] grid-cols-3">
        <SettingGridItem title="Business Information" description="Check and edit details about your business, manage locations, client source and provide social media links" />
        <SettingGridItem title="Business Information" description="Check and edit details about your business, manage locations, client source and provide social media links" />
        <SettingGridItem title="Business Information" description="Check and edit details about your business, manage locations, client source and provide social media links" />
        <SettingGridItem title="Business Information" description="Check and edit details about your business, manage locations, client source and provide social media links" />
        <SettingGridItem title="Business Information" description="Check and edit details about your business, manage locations, client source and provide social media links" />
        <SettingGridItem title="Business Information" description="Check and edit details about your business, manage locations, client source and provide social media links" />
      </div>
      </DashboardContentContainer>
  );
}

export function SettingGridItem(
  {title, description}:{title:string, description:string}
  ){
  return(
    <Link href="settings/business?tab=details">
    <div className="bg-[#FDFDFD] w-[307px] px-[30px] py-[15px] border-[1.25px] rounded-[10px] flex gap-[15px] hover:bg-[#FAFAFA] hover:border-[#F2F2F2] hover:cursor-pointer">
      {<GoHome className="-mt-[20px]" size={70} color="#F25287"/>}
      <div className="settings-page-grid-item-description">
        <h3 className="p-0 m-0 text-medium text-[#000] mb-[8px]">{title}</h3>
        <p className="p-0 m-0 text-xs text-[#111] font-light">{description}</p>
      </div>
    </div>
    </Link>
  )
}
