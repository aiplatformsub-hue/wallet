import { Monitor, BookOpen } from "lucide-react";
import type { DisplayMode } from "../types";

interface DisplayToggleProps {
  mode: DisplayMode;
  onToggle: (mode: DisplayMode) => void;
}

export function DisplayToggle({ mode, onToggle }: DisplayToggleProps) {
  return (
    <div className="flex items-center gap-0.5 glass rounded-full p-0.5">
      <button
        onClick={() => onToggle("regular")}
        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all duration-300 cursor-pointer ${
          mode === "regular"
            ? "bg-white/30 text-white shadow-sm"
            : "text-white/50 hover:text-white/80"
        }`}
      >
        <Monitor size={12} />
        <span>Regular</span>
      </button>
      <button
        onClick={() => onToggle("eink")}
        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all duration-300 cursor-pointer ${
          mode === "eink"
            ? "bg-white/30 text-white shadow-sm"
            : "text-white/50 hover:text-white/80"
        }`}
      >
        <BookOpen size={12} />
        <span>E-Ink</span>
      </button>
    </div>
  );
}
