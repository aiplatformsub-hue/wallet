import { CreditCard, IdCard } from "lucide-react";
import type { CardCategory } from "../types";

interface TabBarProps {
  activeTab: CardCategory;
  onTabChange: (tab: CardCategory) => void;
  eink: boolean;
}

export function TabBar({ activeTab, onTabChange, eink }: TabBarProps) {
  if (eink) {
    return (
      <div className="flex gap-1 bg-stone-200 rounded-2xl p-1">
        <button
          onClick={() => onTabChange("finance")}
          className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-sm font-semibold transition-all duration-300 cursor-pointer ${
            activeTab === "finance"
              ? "bg-stone-50 text-stone-900 shadow-sm"
              : "text-stone-400 hover:text-stone-600"
          }`}
        >
          <CreditCard size={16} />
          Finance
        </button>
        <button
          onClick={() => onTabChange("identity")}
          className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-sm font-semibold transition-all duration-300 cursor-pointer ${
            activeTab === "identity"
              ? "bg-stone-50 text-stone-900 shadow-sm"
              : "text-stone-400 hover:text-stone-600"
          }`}
        >
          <IdCard size={16} />
          Identity
        </button>
      </div>
    );
  }

  return (
    <div className="flex gap-1 glass rounded-2xl p-1">
      <button
        onClick={() => onTabChange("finance")}
        className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-sm font-semibold transition-all duration-300 cursor-pointer ${
          activeTab === "finance"
            ? "bg-white/25 text-white shadow-sm"
            : "text-white/40 hover:text-white/70"
        }`}
      >
        <CreditCard size={16} />
        Finance
      </button>
      <button
        onClick={() => onTabChange("identity")}
        className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-sm font-semibold transition-all duration-300 cursor-pointer ${
          activeTab === "identity"
            ? "bg-white/25 text-white shadow-sm"
            : "text-white/40 hover:text-white/70"
        }`}
      >
        <IdCard size={16} />
        Identity
      </button>
    </div>
  );
}
