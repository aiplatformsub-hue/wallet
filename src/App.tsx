import { useState } from "react";
import { Plus, Wallet, Trash2 } from "lucide-react";
import type { CardCategory, DisplayMode, FinanceCard, IdentityCard } from "./types";
import { sampleFinanceCards, sampleIdentityCards } from "./data";
import { DisplayToggle } from "./components/DisplayToggle";
import { TabBar } from "./components/TabBar";
import { FinanceCardView } from "./components/FinanceCardView";
import { IdentityCardView } from "./components/IdentityCardView";
import { AddCardModal } from "./components/AddCardModal";

function App() {
  const [displayMode, setDisplayMode] = useState<DisplayMode>("regular");
  const [activeTab, setActiveTab] = useState<CardCategory>("finance");
  const [financeCards, setFinanceCards] = useState<FinanceCard[]>(sampleFinanceCards);
  const [identityCards, setIdentityCards] = useState<IdentityCard[]>(sampleIdentityCards);
  const [isModalOpen, setIsModalOpen] = useState(false);

  function handleAddFinanceCard(card: FinanceCard) {
    setFinanceCards((prev) => [...prev, card]);
  }

  function handleAddIdentityCard(card: IdentityCard) {
    setIdentityCards((prev) => [...prev, card]);
  }

  function handleDeleteFinance(id: string) {
    setFinanceCards((prev) => prev.filter((c) => c.id !== id));
  }

  function handleDeleteIdentity(id: string) {
    setIdentityCards((prev) => prev.filter((c) => c.id !== id));
  }

  const einkBg = displayMode === "eink";

  return (
    <div className={`min-h-screen transition-colors duration-500 ${einkBg ? "bg-stone-100" : "bg-gray-50"}`}>
      {/* App container - mobile-first */}
      <div className="max-w-md mx-auto px-4 py-6 pb-24">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2.5">
            <div className={`w-10 h-10 rounded-2xl flex items-center justify-center transition-colors duration-500 ${einkBg ? "bg-stone-800" : "bg-gray-900"}`}>
              <Wallet size={18} className="text-white" />
            </div>
            <div>
              <h1 className={`text-xl font-bold transition-colors duration-500 ${einkBg ? "text-stone-900" : "text-gray-900"}`}>
                Wallet
              </h1>
              <p className={`text-xs transition-colors duration-500 ${einkBg ? "text-stone-500" : "text-gray-400"}`}>
                {financeCards.length + identityCards.length} cards stored
              </p>
            </div>
          </div>
          <DisplayToggle mode={displayMode} onToggle={setDisplayMode} />
        </div>

        {/* Tab bar */}
        <div className="mb-5">
          <TabBar activeTab={activeTab} onTabChange={setActiveTab} />
        </div>

        {/* Cards list */}
        <div className="space-y-4">
          {activeTab === "finance" ? (
            financeCards.length === 0 ? (
              <EmptyState label="No finance cards yet" eink={einkBg} />
            ) : (
              financeCards.map((card) => (
                <div key={card.id} className="group relative">
                  <FinanceCardView card={card} mode={displayMode} />
                  <button
                    onClick={() => handleDeleteFinance(card.id)}
                    className="absolute top-3 right-3 w-7 h-7 rounded-full bg-black/20 backdrop-blur-sm flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer hover:bg-black/40"
                  >
                    <Trash2 size={12} />
                  </button>
                </div>
              ))
            )
          ) : identityCards.length === 0 ? (
            <EmptyState label="No identity cards yet" eink={einkBg} />
          ) : (
            identityCards.map((card) => (
              <div key={card.id} className="group relative">
                <IdentityCardView card={card} mode={displayMode} />
                <button
                  onClick={() => handleDeleteIdentity(card.id)}
                  className="absolute top-3 right-3 w-7 h-7 rounded-full bg-black/20 backdrop-blur-sm flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer hover:bg-black/40"
                >
                  <Trash2 size={12} />
                </button>
              </div>
            ))
          )}
        </div>
      </div>

      {/* FAB */}
      <button
        onClick={() => setIsModalOpen(true)}
        className={`fixed bottom-6 right-1/2 translate-x-1/2 w-14 h-14 rounded-full shadow-lg flex items-center justify-center text-white transition-all duration-500 hover:scale-105 active:scale-95 cursor-pointer ${
          einkBg ? "bg-stone-800 shadow-stone-300" : "bg-gray-900 shadow-gray-300"
        }`}
      >
        <Plus size={22} />
      </button>

      {/* Modal */}
      <AddCardModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        activeTab={activeTab}
        onAddFinanceCard={handleAddFinanceCard}
        onAddIdentityCard={handleAddIdentityCard}
      />
    </div>
  );
}

function EmptyState({ label, eink }: { label: string; eink: boolean }) {
  return (
    <div className={`text-center py-16 rounded-2xl border-2 border-dashed transition-colors duration-500 ${eink ? "border-stone-300 text-stone-400" : "border-gray-200 text-gray-400"}`}>
      <Wallet size={32} className="mx-auto mb-3 opacity-40" />
      <p className="text-sm font-medium">{label}</p>
      <p className="text-xs mt-1 opacity-60">Tap + to add one</p>
    </div>
  );
}

export default App;
