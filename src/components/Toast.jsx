import React from 'react';
import { CheckCircle2 } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function Toast() {
  const { toastMessage } = useCart();

  if (!toastMessage) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-bounce-short">
      <div className="bg-[#222222] text-white px-5 py-3 rounded-xs shadow-2xl flex items-center gap-3 border-l-4 border-[#048287]">
        <CheckCircle2 size={18} className="text-[#048287]" />
        <span className="font-['Lato'] text-[13px] font-medium tracking-wide">
          {toastMessage}
        </span>
      </div>
    </div>
  );
}
