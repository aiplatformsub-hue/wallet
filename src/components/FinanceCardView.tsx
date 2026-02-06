import { Wifi } from "lucide-react";
import type { FinanceCard, DisplayMode } from "../types";

interface FinanceCardViewProps {
  card: FinanceCard;
  mode: DisplayMode;
}

function NetworkLogo({ network }: { network: string }) {
  switch (network) {
    case "visa":
      return <span className="text-xl font-bold italic tracking-tight">VISA</span>;
    case "mastercard":
      return (
        <div className="flex -space-x-2">
          <div className="w-5 h-5 rounded-full bg-red-500 opacity-80" />
          <div className="w-5 h-5 rounded-full bg-yellow-500 opacity-80" />
        </div>
      );
    case "amex":
      return <span className="text-xs font-bold tracking-widest">AMEX</span>;
    case "discover":
      return <span className="text-xs font-bold">DISCOVER</span>;
    default:
      return null;
  }
}

export function FinanceCardView({ card, mode }: FinanceCardViewProps) {
  if (mode === "eink") {
    return (
      <div
        className="relative rounded-2xl p-6 bg-stone-50 border-2 border-stone-300 shadow-none transition-all duration-500"
        style={{ fontFamily: "'Courier New', 'Courier', monospace" }}
      >
        <div className="absolute inset-0 rounded-2xl opacity-30 pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='6' height='6' viewBox='0 0 6 6' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%239C92AC' fill-opacity='0.08' fill-rule='evenodd'%3E%3Cpath d='M5 0h1L0 6V5zM6 5v1H5z'/%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />

        <div className="flex justify-between items-start mb-8">
          <div>
            <p className="text-stone-500 text-xs uppercase tracking-wider">{card.bankName}</p>
            <p className="text-stone-400 text-[10px] mt-0.5 uppercase">{card.type} card</p>
          </div>
          <div className="text-stone-700">
            <NetworkLogo network={card.network} />
          </div>
        </div>

        <div className="mb-6">
          <p className="text-stone-800 text-lg tracking-[0.2em] font-medium">{card.cardNumber}</p>
        </div>

        <div className="flex justify-between items-end">
          <div>
            <p className="text-stone-400 text-[10px] uppercase tracking-wider mb-0.5">Card Holder</p>
            <p className="text-stone-700 text-sm font-medium uppercase tracking-wide">{card.cardHolder}</p>
          </div>
          <div className="text-right">
            <p className="text-stone-400 text-[10px] uppercase tracking-wider mb-0.5">Expires</p>
            <p className="text-stone-700 text-sm font-medium">{card.expiryDate}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`relative rounded-2xl p-6 overflow-hidden text-white transition-all duration-500 bg-gradient-to-br ${card.gradient}`}
      style={{
        boxShadow: "0 8px 32px rgba(0, 0, 0, 0.18), inset 0 1px 0 rgba(255, 255, 255, 0.3)",
      }}
    >
      {/* Glass overlay */}
      <div className="absolute inset-0 bg-white/5 backdrop-blur-[1px]" />
      {/* Decorative glass circles */}
      <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/15 rounded-full blur-sm" />
      <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-white/10 rounded-full blur-sm" />
      <div className="absolute top-1/2 right-1/4 w-24 h-24 bg-white/5 rounded-full blur-md" />

      <div className="relative z-10">
        <div className="flex justify-between items-start mb-8">
          <div>
            <p className="text-white/80 text-xs font-medium uppercase tracking-wider">{card.bankName}</p>
            <p className="text-white/50 text-[10px] mt-0.5 uppercase">{card.type} card</p>
          </div>
          <div className="flex items-center gap-2">
            <Wifi size={16} className="text-white/70 rotate-90" />
            <NetworkLogo network={card.network} />
          </div>
        </div>

        {/* Glass chip */}
        <div className="w-10 h-7 rounded-md mb-4 flex items-center justify-center"
          style={{
            background: "linear-gradient(135deg, rgba(255,215,0,0.6), rgba(255,235,130,0.4))",
            backdropFilter: "blur(4px)",
            border: "1px solid rgba(255,215,0,0.3)",
          }}
        >
          <div className="w-6 h-4 rounded-sm border border-yellow-400/40 bg-yellow-300/30" />
        </div>

        <div className="mb-6">
          <p className="text-white text-lg tracking-[0.2em] font-medium drop-shadow-sm">{card.cardNumber}</p>
        </div>

        <div className="flex justify-between items-end">
          <div>
            <p className="text-white/50 text-[10px] uppercase tracking-wider mb-0.5">Card Holder</p>
            <p className="text-white text-sm font-medium uppercase tracking-wide drop-shadow-sm">{card.cardHolder}</p>
          </div>
          <div className="text-right">
            <p className="text-white/50 text-[10px] uppercase tracking-wider mb-0.5">Expires</p>
            <p className="text-white text-sm font-medium drop-shadow-sm">{card.expiryDate}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
