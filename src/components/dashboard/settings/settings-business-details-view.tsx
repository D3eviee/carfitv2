'use client'
import { useMutation, useQueryClient } from "@tanstack/react-query";
import SettingEditableField from "./settings-editable-field";
import { setSettingDataForBusiness } from "@/app/dashboard/actions";

type SettingsBusinessDetailsViewProps = {
    businessName: string 
    language: string 
    country: string
    currency: string 
}

export function SettingsBusinessDetailsView({settings}:{settings: SettingsBusinessDetailsViewProps}){
    const queryClient = useQueryClient()

    const {mutate} = useMutation<unknown, unknown, Record<string, string>>({
        mutationKey: ["changeSetting"],
        mutationFn: async (data) => {   
            return await setSettingDataForBusiness(data)
        },
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['settingsServiceData'] })
      })

    return(
      <div className="py-[30px] px-[50px] border-[0.5px] border-[#D4D4D4] rounded-[10px] shadow-[0px_1px_2px_0px_#ACACAC30]">
        <div className="mt-[30px] grid grid-cols-2 grid-rows-2 gap-[40px]">
          <SettingEditableField label="Nazwa firmy" value={settings.businessName} dbKey="name" isEditable={true} onSave={(data) => mutate(data)}/>
          <SettingEditableField label="Język" value={settings.language} dbKey="" isEditable={false} onSave={() => mutate}/>
          <SettingEditableField label="Kraj" value={settings.country} dbKey="" isEditable={false } onSave={() => mutate}/>
          <SettingEditableField label="Waluta" value={settings.currency} dbKey=""  isEditable={false} onSave={() => mutate}/>
        </div>
      </div>
    )
  }