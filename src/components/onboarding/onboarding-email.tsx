import { useForm } from "react-hook-form";
import { businessOnboardingSchema } from "@/lib/schema";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormInput } from "../form-input";
import { FormError } from "../form-error";
import { FormLabel } from "../form-label";
import { FormButton } from "../form-button";

export default function OnboardingEmail({ onClick = () => {} }) {
  //DEFINING FORM TYPES
  const onboardingEmail = businessOnboardingSchema.pick({
    email: true,
    password: true,
  });

  type OnboardingEmail = z.infer<typeof onboardingEmail>;

  //DEFINING USEFORM HOOK
  const { register, handleSubmit, formState, trigger } =
    useForm<OnboardingEmail>({
      resolver: zodResolver(onboardingEmail),
      defaultValues: {
        email: "",
        password: "",
      },
    });

  //FUNCTION FOR HANDLING FORM
  const onSubmit = async (data: OnboardingEmail) => {
    console.log(data)
    const isValid = await trigger()
    if(isValid) onClick()
  };

  return (
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
  );
}
