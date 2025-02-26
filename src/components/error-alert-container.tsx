"use client";

import { useContainerErrorStore } from "@/lib/store";
import { useEffect } from "react";

export const ErrorAlertContainer = ({children}) => {
  const { errorMessage, setContainerError } = useContainerErrorStore();

  useEffect(() => {
    if (errorMessage !== "") {
      const timer = setTimeout(() => setContainerError(""), 6000);
      return () => clearTimeout(timer);
    }
  }, [errorMessage, setContainerError]);

  return (
    <>
      {children}
      {errorMessage !== "" && (
        <div className="absolute w-full h-full z-20 text-black top-0">
          <div className="absolute w-[250px] h-[75px] bg-white bottom-5 left-5 rounded-lg flex justify-center items-center">
            <p className="text-sm font-light text-[#111111]">{errorMessage}</p>
          </div>
        </div>
      )}
    </>
  );
};
