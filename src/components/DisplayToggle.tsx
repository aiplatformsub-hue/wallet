import { Monitor, BookOpen } from "lucide-react";
import type { DisplayMode } from "../types";

interface DisplayToggleProps {
  mode: DisplayMode;
  onToggle: (mode: DisplayMode) => void;
}

export function DisplayToggle({ mode, onToggle }: DisplayToggleProps) {
  return (
    <div className="flex items-center gap-1 bg-white/80 backdrop-blur-sm rounded-full p-1 shadow-sm border border-gray-200/60">
      <button
        onClick={() => onToggle("regular")}
        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-300 cursor-pointer ${
          mode === "regular"
            ? "bg-gray-900 text-white shadow-md"
            : "text-gray-500 hover:text-gray-700"
        }`}
      >
        <Monitor size={14} />
        <span>Regular</span>
      </button>
      <button
        onClick={() => onToggle("eink")}
        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-300 cursor-pointer ${
          mode === "eink"
            ? "bg-gray-900 text-white shadow-md"
            : "text-gray-500 hover:text-gray-700"
        }`}
      >
        <BookOpen size={14} />
        <span>E-Ink</span>
      </button>
    </div>
  );
}
