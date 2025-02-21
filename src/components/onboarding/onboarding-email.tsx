import { useForm } from "react-hook-form";
import { businessOnboardingSchema } from "@/lib/schema";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormInput } from "../form-input";
import { FormError } from "../form-error";
import { FormLabel } from "../form-label";
import { FormButton } from "../form-button";
import Link from "next/link";
import { useOnboardingStore } from "@/lib/store";

export default function OnboardingEmail({ onClick = () => {} }) {
  //DEFINING FORM TYPES
  const onboardingEmail = businessOnboardingSchema.pick({
    email: true,
    password: true,
  });

  type OnboardingEmail = z.infer<typeof onboardingEmail>;
  const setData = useOnboardingStore((state)=>state.setData)


  //DEFINING USEFORM HOOK
  const { register, handleSubmit, formState, trigger } =
    useForm<OnboardingEmail>({
      resolver: zodResolver(onboardingEmail),
      defaultValues: {
        email: useOnboardingStore((state)=> state.email),
        password: useOnboardingStore((state)=> state.password),
      },
    });

  //FUNCTION FOR HANDLING FORM
  const onSubmit = async (data: OnboardingEmail) => {
    const isValid = await trigger()

    if(isValid){
      setData(data)
      onClick()
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">
        <div>
          <FormLabel text="Email" htmlFor="email" />
          <FormInput id="email" type="text" placeholder="carfit@gmail.com" register={register}/>
          <FormError>{formState.errors.email?.message}</FormError>
        </div>

        <div>
          <FormLabel text="Password" htmlFor="password" />
          <FormInput type="password" id="password" placeholder="***********" register={register}/>
          <FormError>{formState.errors.password?.message}</FormError>
        </div>

        <FormButton label="Continue" disabled={formState.isValidating}/>
      </form>

      <p className="text-center text-[#333333] text-xs font-light pt-5">Already have an account? 
        <Link href='/sign-in'><span className="text-blue-900 font-semibold"> Login</span></Link>
      </p>
    </>
  );
}
