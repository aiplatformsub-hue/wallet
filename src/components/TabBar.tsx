import { CreditCard, IdCard } from "lucide-react";
import type { CardCategory } from "../types";

interface TabBarProps {
  activeTab: CardCategory;
  onTabChange: (tab: CardCategory) => void;
}

export function TabBar({ activeTab, onTabChange }: TabBarProps) {
  return (
    <div className="flex gap-1 bg-gray-100 rounded-2xl p-1">
      <button
        onClick={() => onTabChange("finance")}
        className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-sm font-semibold transition-all duration-300 cursor-pointer ${
          activeTab === "finance"
            ? "bg-white text-gray-900 shadow-sm"
            : "text-gray-400 hover:text-gray-600"
        }`}
      >
        <CreditCard size={16} />
        Finance
      </button>
      <button
        onClick={() => onTabChange("identity")}
        className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-sm font-semibold transition-all duration-300 cursor-pointer ${
          activeTab === "identity"
            ? "bg-white text-gray-900 shadow-sm"
            : "text-gray-400 hover:text-gray-600"
        }`}
      >
        <IdCard size={16} />
        Identity
      </button>
    </div>
  );
}
