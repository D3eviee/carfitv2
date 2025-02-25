import { IoMdArrowBack } from "react-icons/io";
import Link from 'next/link';
import Image from 'next/image';
import { RiMoreFill } from "react-icons/ri";
import DashboardContentContainer from '@/components/dashboard/dashboard-content-container';


export default async function SettingsPage({searchParams}) {
  const params  = await searchParams;
  const activeTab = params.tab;

  if (activeTab === "details") {
    var title = "Business details";
  } else if (activeTab === "locations"){
    var title = "Locations";
  } else if (activeTab === "links"){
    var title = "Social links";
  }

  return (
    <DashboardContentContainer>
      <div className="flex items-center gap-[20px]">
        <Link href="/dashboard/settings"><IoMdArrowBack  className="w-[30px] h-[30px] p-[10px] flex justify-center items-center rounded-[90px] bg-[#333333] shadow-[0px_1px_2px_0px_#33333333] hover:bg_[#555555] hover:cursor-pointer" color='#FFFFFF'/></Link>
        <div className="px-[7px] py-[15px] rounded-[5px] border-1 border-[#D4D4D4] text-[13px]">
        <p className="m-0 p-0 font-normal text-[#333333]"><span className="m-0 p-0 font-light text-[#777777]">Business | </span> Business Information</p>
        </div>
      </div>
      
      <div className="mt-[30px] flex flex-row gap-[30px]">
        <div className="h-[208px] px-[15px] py-[20px] border-[0.5px] border-[#D4D4D4] ml-[70px] rounded-[10px]">
          <h2 className="m-0 mb-[20px] font-normal text-medium text-[#333333]">Business Information</h2>
          <div className="flex gap-[10px] flex-col">
            <Link href={'?tab=details'}>
              <p className="text-sm font-light text-[#555555] m-0 px-[8px] py-[10px]">Business details</p>
            </Link>
            <Link href={'?tab=locations'}>
              <p className="text-sm font-light text-[#555555] m-0 px-[8px] py-[10px]">Locations</p>
            </Link>
            <Link href={'?tab=links'}>
              <p className="text-sm font-light text-[#555555] m-0 px-[8px] py-[10px]">Social links</p>
            </Link>
          </div>
        </div>
        <div className="flex flex-col gap-[20px]">
          <div className="p-[20px] border-[0.5px] border-[#D4D4D4] rounded-[5px]">
            <h2 className="m-0 p-0 mb-[5px] text-lg font-medium text-[#333333]">{title}</h2>
            <p className="m-0 p-0 text-[13px] font-light text-[#777777]">Set your business name, country  and language preferences. Add social media links to your profile.</p>
          </div>

          {activeTab === "details" && <BusinessDetailsForm/>}
          {activeTab === "locations" && <BusinessLocationsForm/>}
          {activeTab === "links" && <BusinessSocialLinksForm/>}
        </div>
      </div>
    </DashboardContentContainer>
  );
}

export function BusinessDetailsForm(){
  return(
    <div className="py-[30px] px-[70px] border-[0.5px] border-[#D4D4D4] rounded-[10px] shadow-[0px_1px_2px_0px_#ACACAC30]">
      <div className="flex justify-end">
        <button className="ml-[100%] text-[#F25287] rounded-[5px] py-[5px] px-[19px] bg-white border-[0.5px] border-[#F25287] text-xs font-medium shadow-[0px_1px_2px_0px_#D4D4D4] hover:cursor-pointer hover:bg-[#F25287] hover:text-white">Edit</button>
      </div>

      <div className="mt-[10px] grid grid-cols-2 grid-rows-2 gap-[40px]">
        <div className="flex flex-col gap-[2px]">
          <h3 className="p-0 m-0 text-[#333333] text-[13px] font-semibold">Business name</h3>
          <p className="max-w-[230px] p-0 m-0 text-[#777777] text-[13px] font-normal">Auto car service</p>
        </div>
        <div className="flex flex-col gap-[2px]">
          <h3 className="p-0 m-0 text-[#333333] text-[13px] font-semibold">Language</h3>
          <p className="max-w-[230px] p-0 m-0 text-[#777777] text-[13px] font-normal">English</p>
        </div>
        <div className="flex flex-col gap-[2px]">
          <h3 className="p-0 m-0 text-[#333333] text-[13px] font-semibold">Country</h3>
          <p className="max-w-[230px] p-0 m-0 text-[#777777] text-[13px] font-normal">United States</p>
        </div>
        <div className="flex flex-col gap-[2px]">
          <h3 className="p-0 m-0 text-[#333333] text-[13px] font-semibold">Currency</h3>
          <p className="max-w-[230px] p-0 m-0 text-[#777777] text-[13px] font-normal">USD</p>
        </div>
      </div>
    </div>
  )
}

export function BusinessLocationsForm(){
  return(
    <div className="settings-page-content-form">
      <div className='settings-page-content-form-button-container'>
        <button className='settings-page-content-form-button'>Edit</button>
      </div>

      <div className="settings-page-content-form-locations">
        <div className="settings-page-content-form-locations-item">
          <Image src={tesla_service} alt="service-image" width={149} height={88}/>
          <div className="settings-page-content-form-locations-item-title">
            <RiMoreFill className='settings-page-content-form-locations-item-title-icon'/>
            <h2>Tesla Auto Service</h2>
            <h4>1921 Calico Drive | Kennewick | Washington</h4>
          </div>
        </div>
      </div>

      <div className="settings-page-content-form-locations">
        <div className="settings-page-content-form-locations-item">
          <Image src={tesla_service} alt="service-image" width={149} height={88}/>
          <div className="settings-page-content-form-locations-item-title">
            <RiMoreFill className='settings-page-content-form-locations-item-title-icon'/>
            <h2>Tesla Auto Service</h2>
            <h4>1921 Calico Drive | Kennewick | Washington</h4>
          </div>
        </div>
      </div>
      <div className="settings-page-content-form-locations">
        <div className="settings-page-content-form-locations-item">
          <Image src={tesla_service} alt="service-image" width={149} height={88}/>
          <div className="settings-page-content-form-locations-item-title">
            <RiMoreFill className='settings-page-content-form-locations-item-title-icon'/>
            <h2>Tesla Auto Service</h2>
            <h4>1921 Calico Drive | Kennewick | Washington</h4>
          </div>
        </div>
      </div>
    </div>
  )
}

export function BusinessSocialLinksForm(){
  return(
    <div className="settings-page-content-form">
      <div className='settings-page-content-form-button-container'>
        <button className='settings-page-content-form-button'>Edit</button>
      </div>

      <div className="settings-page-content-form-grid">
        <div className="settings-page-content-form-grid-item">
          <h3>Facebook</h3>
          <p>https://www.facebook.com</p>
        </div>
        <div className="settings-page-content-form-grid-item">
          <h3>Instagram</h3>
          <p>To be provided</p>
        </div>
        <div className="settings-page-content-form-grid-item">
          <h3>Website</h3>
          <p>To be provided</p>
        </div>
        <div className="settings-page-content-form-grid-item">
          <h3>Currency</h3>
          <p>To be provided</p>
        </div>
      </div>
    </div>
  )
}