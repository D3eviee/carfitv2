import { X } from "lucide-react";
import { createPortal } from "react-dom";
import { ReactNode } from "react";

type ModalProps = {
  open: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
}

export default function ModalProvider({ open, onClose, title, children}: ModalProps) {
  if (!open) return null;

  return createPortal(
    <div>
    {/* OVERLAY  */}
      <div
        className="absolute top-0 bg-black opacity-40 w-full h-full z-10"
        onClick={onClose}
      />
    {/* CONTENT  */}
      <div className="absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] min-w-96 max-w-[550px] bg-[#FFF] z-20 rounded-lg">
        <div className="px-3 py-2 flex items-center justify-center border-b-[0.5px] border-[#D4D4D4]">
          <h1 className="font-base text-xs">{title}</h1>
          <X  size={21} color="#111" className="ml-auto cursor-pointer" onClick={onClose} />
        </div>
        <div className="px-8 py-5">{children}</div>
      </div>
    </div>,
    document.body
  );
}