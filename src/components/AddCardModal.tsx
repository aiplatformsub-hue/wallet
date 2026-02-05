import { useState } from "react";
import { X } from "lucide-react";
import type { CardCategory, FinanceCard, IdentityCard, CardType, CardNetwork, IdType } from "../types";

interface AddCardModalProps {
  isOpen: boolean;
  onClose: () => void;
  activeTab: CardCategory;
  onAddFinanceCard: (card: FinanceCard) => void;
  onAddIdentityCard: (card: IdentityCard) => void;
}

const gradients = [
  "from-indigo-600 via-purple-600 to-pink-500",
  "from-slate-800 via-slate-700 to-slate-600",
  "from-emerald-500 via-teal-500 to-cyan-500",
  "from-amber-500 via-orange-500 to-red-500",
  "from-blue-700 via-blue-600 to-sky-500",
  "from-rose-500 via-fuchsia-500 to-violet-500",
  "from-lime-500 via-green-500 to-emerald-500",
  "from-cyan-500 via-blue-500 to-indigo-500",
];

function maskCardNumber(num: string): string {
  const digits = num.replace(/\s/g, "");
  if (digits.length < 8) return num;
  const first4 = digits.slice(0, 4);
  const last4 = digits.slice(-4);
  return `${first4} •••• •••• ${last4}`;
}

export function AddCardModal({ isOpen, onClose, activeTab, onAddFinanceCard, onAddIdentityCard }: AddCardModalProps) {
  const [cardType, setCardType] = useState<CardType>("credit");
  const [network, setNetwork] = useState<CardNetwork>("visa");
  const [cardNumber, setCardNumber] = useState("");
  const [cardHolder, setCardHolder] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [bankName, setBankName] = useState("");

  const [idType, setIdType] = useState<IdType>("drivers_license");
  const [fullName, setFullName] = useState("");
  const [idNumber, setIdNumber] = useState("");
  const [issueDate, setIssueDate] = useState("");
  const [idExpiry, setIdExpiry] = useState("");
  const [issuingAuthority, setIssuingAuthority] = useState("");

  const [selectedGradient, setSelectedGradient] = useState(0);

  if (!isOpen) return null;

  function handleSubmitFinance(e: React.FormEvent) {
    e.preventDefault();
    const card: FinanceCard = {
      id: `fc-${Date.now()}`,
      category: "finance",
      type: cardType,
      cardNumber: maskCardNumber(cardNumber),
      cardHolder,
      expiryDate,
      network,
      bankName,
      gradient: gradients[selectedGradient],
    };
    onAddFinanceCard(card);
    onClose();
    resetForm();
  }

  function handleSubmitIdentity(e: React.FormEvent) {
    e.preventDefault();
    const card: IdentityCard = {
      id: `id-${Date.now()}`,
      category: "identity",
      idType,
      fullName,
      idNumber,
      issueDate,
      expiryDate: idExpiry,
      issuingAuthority,
      gradient: gradients[selectedGradient],
    };
    onAddIdentityCard(card);
    onClose();
    resetForm();
  }

  function resetForm() {
    setCardNumber("");
    setCardHolder("");
    setExpiryDate("");
    setBankName("");
    setFullName("");
    setIdNumber("");
    setIssueDate("");
    setIdExpiry("");
    setIssuingAuthority("");
    setSelectedGradient(0);
  }

  const inputClass =
    "w-full px-3 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-500/30 focus:border-brand-500 transition-all";
  const labelClass = "block text-xs font-medium text-gray-500 uppercase tracking-wider mb-1.5";
  const selectClass =
    "w-full px-3 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-brand-500/30 focus:border-brand-500 transition-all appearance-none";

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-md bg-white rounded-t-3xl sm:rounded-3xl shadow-2xl max-h-[85vh] overflow-y-auto">
        <div className="sticky top-0 bg-white/90 backdrop-blur-sm px-6 pt-6 pb-3 flex items-center justify-between border-b border-gray-100 rounded-t-3xl z-10">
          <h2 className="text-lg font-bold text-gray-900">
            {activeTab === "finance" ? "Add Card" : "Add ID"}
          </h2>
          <button onClick={onClose} className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-gray-200 transition-colors cursor-pointer">
            <X size={16} />
          </button>
        </div>

        <div className="p-6">
          {/* Gradient picker */}
          <div className="mb-5">
            <label className={labelClass}>Card Color</label>
            <div className="flex gap-2 flex-wrap">
              {gradients.map((g, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setSelectedGradient(i)}
                  className={`w-8 h-8 rounded-full bg-gradient-to-br ${g} transition-all cursor-pointer ${
                    selectedGradient === i ? "ring-2 ring-offset-2 ring-gray-400 scale-110" : "opacity-60 hover:opacity-100"
                  }`}
                />
              ))}
            </div>
          </div>

          {activeTab === "finance" ? (
            <form onSubmit={handleSubmitFinance} className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className={labelClass}>Type</label>
                  <select value={cardType} onChange={(e) => setCardType(e.target.value as CardType)} className={selectClass}>
                    <option value="credit">Credit</option>
                    <option value="debit">Debit</option>
                  </select>
                </div>
                <div>
                  <label className={labelClass}>Network</label>
                  <select value={network} onChange={(e) => setNetwork(e.target.value as CardNetwork)} className={selectClass}>
                    <option value="visa">Visa</option>
                    <option value="mastercard">Mastercard</option>
                    <option value="amex">Amex</option>
                    <option value="discover">Discover</option>
                  </select>
                </div>
              </div>
              <div>
                <label className={labelClass}>Bank Name</label>
                <input type="text" value={bankName} onChange={(e) => setBankName(e.target.value)} placeholder="e.g. Chase Sapphire" className={inputClass} required />
              </div>
              <div>
                <label className={labelClass}>Card Number</label>
                <input type="text" value={cardNumber} onChange={(e) => setCardNumber(e.target.value)} placeholder="1234 5678 9012 3456" maxLength={19} className={inputClass} required />
              </div>
              <div>
                <label className={labelClass}>Card Holder</label>
                <input type="text" value={cardHolder} onChange={(e) => setCardHolder(e.target.value)} placeholder="Full name on card" className={inputClass} required />
              </div>
              <div>
                <label className={labelClass}>Expiry Date</label>
                <input type="text" value={expiryDate} onChange={(e) => setExpiryDate(e.target.value)} placeholder="MM/YY" maxLength={5} className={inputClass} required />
              </div>
              <button type="submit" className="w-full py-3 bg-gray-900 text-white rounded-xl font-semibold text-sm hover:bg-gray-800 transition-colors cursor-pointer">
                Add Card
              </button>
            </form>
          ) : (
            <form onSubmit={handleSubmitIdentity} className="space-y-4">
              <div>
                <label className={labelClass}>ID Type</label>
                <select value={idType} onChange={(e) => setIdType(e.target.value as IdType)} className={selectClass}>
                  <option value="drivers_license">Driver's License</option>
                  <option value="passport">Passport</option>
                  <option value="national_id">National ID</option>
                  <option value="student_id">Student ID</option>
                </select>
              </div>
              <div>
                <label className={labelClass}>Full Name</label>
                <input type="text" value={fullName} onChange={(e) => setFullName(e.target.value)} placeholder="Full legal name" className={inputClass} required />
              </div>
              <div>
                <label className={labelClass}>ID Number</label>
                <input type="text" value={idNumber} onChange={(e) => setIdNumber(e.target.value)} placeholder="e.g. DL-1234-5678" className={inputClass} required />
              </div>
              <div>
                <label className={labelClass}>Issuing Authority</label>
                <input type="text" value={issuingAuthority} onChange={(e) => setIssuingAuthority(e.target.value)} placeholder="e.g. California DMV" className={inputClass} required />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className={labelClass}>Issue Date</label>
                  <input type="text" value={issueDate} onChange={(e) => setIssueDate(e.target.value)} placeholder="MM/YYYY" maxLength={7} className={inputClass} required />
                </div>
                <div>
                  <label className={labelClass}>Expiry Date</label>
                  <input type="text" value={idExpiry} onChange={(e) => setIdExpiry(e.target.value)} placeholder="MM/YYYY" maxLength={7} className={inputClass} required />
                </div>
              </div>
              <button type="submit" className="w-full py-3 bg-gray-900 text-white rounded-xl font-semibold text-sm hover:bg-gray-800 transition-colors cursor-pointer">
                Add ID
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
