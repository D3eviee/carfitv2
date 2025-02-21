import { useForm } from 'react-hook-form';
import { FormLabel } from '../form-label';
import { FormError } from '../form-error';
import { FormInput } from '../form-input';
import { z } from 'zod';
import { businessOnboardingSchema } from '@/lib/schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormButton } from '../form-button';
import { useOnboardingStore } from '@/lib/store';

export default function OnboardingBusienssInformation({ onClick = () => {} }) {
  //DEFINING FORM TYPES
  const onboardingBusienssInformation = businessOnboardingSchema.pick({
    businessName: true,
    businessOwner: true,
    businessPhone: true
  })

  type OnboardingBusienssInformation = z.infer<typeof onboardingBusienssInformation>

  const setData = useOnboardingStore((state)=>state.setData)

  //DEFINING USEFORM HOOK
  const {register, handleSubmit, formState, trigger} = useForm<OnboardingBusienssInformation>({
    resolver: zodResolver(onboardingBusienssInformation),
      defaultValues: {
        businessName: useOnboardingStore((state)=> state.businessName),
        businessOwner: useOnboardingStore((state)=> state.businessOwner),
        businessPhone: useOnboardingStore((state)=> state.businessPhone),
      },
    });

  //FUNCTION FOR HANDLING FORM
  const onSubmit = async (data: OnboardingBusienssInformation) => {
    const isValid = await trigger()
    if(isValid){
      setData(data)
      onClick()
    }
  };

  return(
       <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">
          <div>
            <FormLabel text="Business name" htmlFor="businessName" />
            <FormInput type="text" id="businessName" placeholder="Tesla" register={register}/>
            <FormError>{formState.errors.businessName?.message}</FormError>
          </div>

          <div>
            <FormLabel text="Business owner" htmlFor="businessOwner" />
            <FormInput type="text" id="businessOwner" placeholder="Jacky Macky" register={register}/>
            <FormError>{formState.errors.businessOwner?.message}</FormError>
          </div>

          <div>
            <FormLabel text="Phone" htmlFor="businessPhone" />
            <FormInput type="text" id="businessPhone" placeholder="514333901" register={register}/>
            <FormError>{formState.errors.businessPhone?.message}</FormError>
          </div>

          <FormButton label="Continue" disabled={formState.isValidating}/>
      </form>    
  )
}