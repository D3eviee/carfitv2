import { create } from "zustand";
import { BusinessOnboardingSchema } from "./schema";
import { addMonths, getMonth, subMonths } from "date-fns";

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

type ModalStoreProps = {
  isAddCategoryModalOpen: boolean;
  isAddServiceModalOpen: boolean;
  toggleCategoryModal: () => void;
  toggleServiceModal: () => void;
  closeModals: () => void;
};

export const useModalStore = create<ModalStoreProps>((set) => ({
  isAddCategoryModalOpen: false,
  isAddServiceModalOpen: false,
  toggleCategoryModal: () => set((state) => ({ isAddCategoryModalOpen: !state.isAddCategoryModalOpen })),
  toggleServiceModal: () => set((state) => ({ isAddServiceModalOpen: !state.isAddServiceModalOpen })),
  closeModals: () => set((state) => ({ 
    isAddServiceModalOpen: false,
    isAddCategoryModalOpen: false
  })),
}));


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


type CalendarStoreProps = {
  todayDate: Date
  activeDate: Date
  selectedDate: Date
  setSelectedDate: (day:Date) => void
  setNextActiveMonth: (date: Date) => void
  setPreviousActiveMonth: (date: Date) => void
}

export const useCalendarStore = create<CalendarStoreProps>((set) => ({
  todayDate: new Date(),
  activeDate: new Date(),
  selectedDate: new Date(),
  setSelectedDate : (day) => set(()=>({selectedDate : day})),
  setNextActiveMonth: (date) => set(()=>({activeDate : addMonths(date, 1)})),
  setPreviousActiveMonth: (date) => set(()=>({activeDate : subMonths(date, 1)})),
}));

type EventTimeStoreProps = {
  activeEventTime: Date | undefined
  setActiveEventTime: (time:Date) => void
}

export const useEventTimeStore = create<EventTimeStoreProps>((set) => ({
  activeEventTime: undefined,
  setActiveEventTime : (time) => set(()=>({activeEventTime : time})),
}));