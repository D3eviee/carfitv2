'use client'
import { QueryClient, useMutation, useQueryClient } from "@tanstack/react-query";
import SettingEditableField from "./settings-editable-field";
import { setSettingDataForBusiness } from "@/app/dashboard/actions";

type SettingsBusinessSocialsViewProps = {
    fb: string 
    ig: string 
    website: string
}

export function SettingsBusinessSocialsView({settings}:{settings: SettingsBusinessSocialsViewProps}){
    const queryClient = useQueryClient()

    const {mutate} = useMutation<unknown, unknown, Record<string, string>>({
        mutationKey: ["changeSetting"],
        mutationFn: async (data) => {   
            return await setSettingDataForBusiness(data)
        },
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ['getWorkingTimeData'] })
        }
      })

    return(
      <div className="py-[30px] px-[50px] border-[0.5px] border-[#D4D4D4] rounded-[10px] shadow-[0px_1px_2px_0px_#ACACAC30]">
        <div className="mt-[30px] grid grid-cols-2 grid-rows-2 gap-[40px]">
          <SettingEditableField label="Facebook" value={settings.fb} dbKey="name" onSave={(data) => mutate(data)}/>
          <SettingEditableField label="Instagram" value={settings.ig} dbKey="" onSave={() => mutate}/>
          <SettingEditableField label="Strona internetowa" value={settings.website} dbKey="" onSave={() => mutate}/>
        </div>
      </div>
    )
  }