import { useState, useEffect } from "react";
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

  useEffect(() => {
    document.body.classList.toggle("eink-mode", displayMode === "eink");
  }, [displayMode]);

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

  const eink = displayMode === "eink";

  return (
    <div className="min-h-screen safe-top transition-all duration-500">
      <div className="max-w-md mx-auto px-4 py-6 pb-28">
        {/* Glass header bar */}
        <div className={`rounded-2xl p-4 mb-5 transition-all duration-500 ${
          eink ? "bg-stone-50 border-2 border-stone-300" : "glass-strong shadow-lg"
        }`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className={`w-10 h-10 rounded-2xl flex items-center justify-center transition-all duration-500 ${
                eink ? "bg-stone-800" : "glass-dark"
              }`}>
                <Wallet size={18} className="text-white" />
              </div>
              <div>
                <h1 className={`text-lg font-bold transition-colors duration-500 ${
                  eink ? "text-stone-900" : "text-white"
                }`}>
                  Wallet
                </h1>
                <p className={`text-[11px] transition-colors duration-500 ${
                  eink ? "text-stone-500" : "text-white/60"
                }`}>
                  {financeCards.length + identityCards.length} cards stored
                </p>
              </div>
            </div>
            <DisplayToggle mode={displayMode} onToggle={setDisplayMode} />
          </div>
        </div>

        {/* Tab bar */}
        <div className="mb-5">
          <TabBar activeTab={activeTab} onTabChange={setActiveTab} eink={eink} />
        </div>

        {/* Cards list */}
        <div className="space-y-4">
          {activeTab === "finance" ? (
            financeCards.length === 0 ? (
              <EmptyState label="No finance cards yet" eink={eink} />
            ) : (
              financeCards.map((card) => (
                <div key={card.id} className="group relative">
                  <FinanceCardView card={card} mode={displayMode} />
                  <button
                    onClick={() => handleDeleteFinance(card.id)}
                    className="absolute top-3 right-3 w-7 h-7 rounded-full glass-dark flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                  >
                    <Trash2 size={12} />
                  </button>
                </div>
              ))
            )
          ) : identityCards.length === 0 ? (
            <EmptyState label="No identity cards yet" eink={eink} />
          ) : (
            identityCards.map((card) => (
              <div key={card.id} className="group relative">
                <IdentityCardView card={card} mode={displayMode} />
                <button
                  onClick={() => handleDeleteIdentity(card.id)}
                  className="absolute top-3 right-3 w-7 h-7 rounded-full glass-dark flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                >
                  <Trash2 size={12} />
                </button>
              </div>
            ))
          )}
        </div>
      </div>

      {/* FAB */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 safe-bottom">
        <button
          onClick={() => setIsModalOpen(true)}
          className={`w-14 h-14 rounded-full flex items-center justify-center text-white transition-all duration-500 hover:scale-110 active:scale-95 cursor-pointer ${
            eink
              ? "bg-stone-800 shadow-lg shadow-stone-400/30"
              : "glass-dark shadow-lg shadow-black/20"
          }`}
        >
          <Plus size={22} />
        </button>
      </div>

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
    <div className={`text-center py-16 rounded-2xl transition-all duration-500 ${
      eink
        ? "border-2 border-dashed border-stone-300 text-stone-400"
        : "glass border-dashed text-white/60"
    }`}>
      <Wallet size={32} className="mx-auto mb-3 opacity-40" />
      <p className="text-sm font-medium">{label}</p>
      <p className="text-xs mt-1 opacity-60">Tap + to add one</p>
    </div>
  );
}

export default App;
