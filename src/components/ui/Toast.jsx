import { useEffect } from "react";
import { CheckCircle, AlertCircle, Info, X } from "lucide-react";
import { useToastStore } from "../../store/useToastStore";

export default function Toast() {
  const { toast, hideToast } = useToastStore();

  if (!toast) return null;

  const bgColors = {
    success: "bg-brand-dark border-brand-beige text-brand-light",
    error: "bg-brand-dark border-red-500/50 text-brand-light",
    info: "bg-brand-dark border-blue-500/50 text-brand-light",
  };

  const icons = {
    success: <CheckCircle className="text-brand-beige shrink-0" size={18} />,
    error: <AlertCircle className="text-red-500 shrink-0" size={18} />,
    info: <Info className="text-blue-400 shrink-0" size={18} />,
  };

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 md:left-auto md:translate-x-0 md:right-6 z-[100] animate-slide-up px-4 md:px-0 w-full max-w-[calc(100%-2rem)] md:max-w-sm">
      <div className={`flex items-center justify-between p-4 rounded-lg border shadow-2xl backdrop-blur-md bg-opacity-95 ${bgColors[toast.type] || bgColors.success}`}>
        <div className="flex items-center space-x-3">
          {icons[toast.type]}
          <p className="text-xs uppercase tracking-widest font-medium font-sans">{toast.message}</p>
        </div>
        <button onClick={hideToast} className="text-brand-light/50 hover:text-white transition-colors pl-4 focus:outline-none">
          <X size={16} />
        </button>
      </div>
    </div>
  );
}
