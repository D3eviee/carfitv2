import { businessOnboardingSchema } from '@/lib/schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { FormLabel } from '../form-label';
import { FormError } from '../form-error';
import { FormButton } from '../form-button';
import { FormInput } from '../form-input';

export default function OnboardingAdress({ onClick = () => {} }){
  //DEFINING FORM TYPES
  const onboardingAddress = businessOnboardingSchema.pick({
    businessTown: true,
    businessZipcode: true,
    businessDistrict: true,
    businessStreet: true
  });

  type OnboardingAddress = z.infer<typeof onboardingAddress>;

  //DEFINING USEFORM HOOK
  const { register, handleSubmit, formState, trigger } =
      useForm<OnboardingAddress>({
        resolver: zodResolver(onboardingAddress),
        defaultValues: {
          businessTown: "",
          businessZipcode: "",
          businessDistrict: "",
          businessStreet: ""
        },
      });

    const onSubmit = async (data: OnboardingAddress) => {
      console.log(data)
      const isValid = await trigger()
      if(isValid) onClick();
    };

  return(
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">
        <div>
        <FormLabel text="Town" htmlFor="businessTown" />
        <FormInput type="text" id="businessTown" placeholder="Ponznań" register={register}/>
        <FormError>{formState.errors.businessTown?.message}</FormError>
        </div>

        <div>
          <FormLabel text="Zip code" htmlFor="businessZipcode" />
          <FormInput type="text" id="businessZipcode" placeholder="61-131" register={register}/>
          <FormError>{formState.errors.businessZipcode?.message}</FormError>
        </div>

        <div>
        <FormLabel text="District" htmlFor="businessDistrict" />
        <FormInput type="text" id="businessDistrict" placeholder="Nowe Miasto" register={register}/>
        <FormError>{formState.errors.businessDistrict?.message}</FormError>
        </div>

        <div>
        <FormLabel text="Street" htmlFor="businessStreet" />
        <FormInput type="text" id="businessStreet" placeholder="Milczańska 5/161" register={register}/>
        <FormError>{formState.errors.businessStreet?.message}</FormError>
        </div>

        <FormButton label="Continue" disabled={formState.isValidating}/>

      </form>    
  )
}