import { create } from "zustand";
import { BusinessOnboardingSchema } from "./schema";

export type OnboardingState = Partial<BusinessOnboardingSchema> & {
    setData: (data: Partial<BusinessOnboardingSchema>) => void;
    resetData: () => void
}

export type ContainerError = {
  errorMessage: string
  setContainerError: (error: string) => void
}

export const useContainerErrorStore = create<ContainerError>()((set) => ({
  errorMessage: "",
  setContainerError: (error) => set(() => ({ errorMessage: error}))
  
}))

export const useOnboardingStore = create<OnboardingState>()((set) => ({
    setData: (data) => set(data),
    resetData: () => set({
      email: "",
      password: "",
      businessCategory: "",
      businessName: "",
      businessOwner: "",
      businessPhone: "",
      businessTown: "",
      businessZipcode: "",
      businessDistrict: "",
      businessStreet: "",
    })
}))

interface WorkingDaysStore {
    days: WorkingDay[];
    updateIsOpen: (dayName: string, value: boolean) => void;
    updateOpenHour: (dayName: string, value: string) => void;
    updateCloseHour: (dayName: string, value: string) => void;
  }

const useWorkingDays = create<WorkingDaysStore>()((set) => ({
    days: [
      { isOpen: true, day: "Monday", open: "7:00", close: "18:00" },
      { isOpen: true, day: "Tuesday", open: "7:00", close: "18:00" },
      { isOpen: true, day: "Wednesday", open: "7:00", close: "18:00" },
      { isOpen: true, day: "Thursday", open: "7:00", close: "18:00" },
      { isOpen: true, day: "Friday", open: "7:00", close: "18:00" },
      { isOpen: false, day: "Saturday", open: "7:00", close: "18:00" },
      { isOpen: false, day: "Sunday", open: "7:00", close: "18:00" }
    ],
  
    updateIsOpen: (dayName, value) =>
      set((state) => ({
        days: state.days.map((day) =>
          day.day === dayName ? {...day, isOpen: value} : day
        ),
      })),

    updateOpenHour: (dayName, value) =>
        set((state) => ({
          days: state.days.map((day) =>
            day.day === dayName ? {...day, open: value} : day
          ),
    })),

    updateCloseHour: (dayName, value) =>
        set((state) => ({
          days: state.days.map((day) =>
            day.day === dayName ? {...day, close: value} : day
          ),
    })),
}));
  
export default useWorkingDays;