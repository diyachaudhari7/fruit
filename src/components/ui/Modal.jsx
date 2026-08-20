import React from "react";
import { cn } from "../../lib/utils";
import { X } from "lucide-react";

export function Modal({ isOpen, onClose, title, children, className }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className={cn("bg-white rounded-xl shadow-lg w-full max-w-md flex flex-col", className)}>
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-lg font-heading font-semibold text-textMain">{title}</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-textMain">
            <X size={20} />
          </button>
        </div>
        <div className="p-4 overflow-y-auto max-h-[80vh]">
          {children}
        </div>
      </div>
    </div>
  );
}
