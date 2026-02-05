import { Shield, Car, Globe, GraduationCap } from "lucide-react";
import type { IdentityCard, DisplayMode } from "../types";

interface IdentityCardViewProps {
  card: IdentityCard;
  mode: DisplayMode;
}

function IdIcon({ idType }: { idType: string }) {
  const size = 20;
  switch (idType) {
    case "drivers_license":
      return <Car size={size} />;
    case "passport":
      return <Globe size={size} />;
    case "student_id":
      return <GraduationCap size={size} />;
    default:
      return <Shield size={size} />;
  }
}

function idTypeLabel(idType: string): string {
  switch (idType) {
    case "drivers_license":
      return "Driver's License";
    case "passport":
      return "Passport";
    case "national_id":
      return "National ID";
    case "student_id":
      return "Student ID";
    default:
      return "ID Card";
  }
}

export function IdentityCardView({ card, mode }: IdentityCardViewProps) {
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

        <div className="flex justify-between items-start mb-5">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-lg border-2 border-stone-400 flex items-center justify-center text-stone-600">
              <IdIcon idType={card.idType} />
            </div>
            <div>
              <p className="text-stone-800 text-sm font-bold uppercase tracking-wide">{idTypeLabel(card.idType)}</p>
              <p className="text-stone-400 text-[10px] uppercase tracking-wider">{card.issuingAuthority}</p>
            </div>
          </div>
        </div>

        <div className="mb-4 pb-4 border-b-2 border-dashed border-stone-300">
          <p className="text-stone-400 text-[10px] uppercase tracking-wider mb-0.5">Full Name</p>
          <p className="text-stone-800 text-base font-bold uppercase tracking-wide">{card.fullName}</p>
        </div>

        <div className="grid grid-cols-3 gap-3">
          <div>
            <p className="text-stone-400 text-[10px] uppercase tracking-wider mb-0.5">ID Number</p>
            <p className="text-stone-700 text-xs font-medium tracking-wide">{card.idNumber}</p>
          </div>
          <div>
            <p className="text-stone-400 text-[10px] uppercase tracking-wider mb-0.5">Issued</p>
            <p className="text-stone-700 text-xs font-medium">{card.issueDate}</p>
          </div>
          <div>
            <p className="text-stone-400 text-[10px] uppercase tracking-wider mb-0.5">Expires</p>
            <p className="text-stone-700 text-xs font-medium">{card.expiryDate}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`relative rounded-2xl p-6 bg-gradient-to-br ${card.gradient} text-white overflow-hidden shadow-lg transition-all duration-500`}>
      <div className="absolute -top-8 -right-8 w-36 h-36 bg-white/10 rounded-full" />
      <div className="absolute bottom-4 right-4 w-20 h-20 bg-white/5 rounded-full" />

      <div className="relative z-10">
        <div className="flex justify-between items-start mb-5">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-lg bg-white/20 backdrop-blur-sm flex items-center justify-center">
              <IdIcon idType={card.idType} />
            </div>
            <div>
              <p className="text-white text-sm font-bold uppercase tracking-wide">{idTypeLabel(card.idType)}</p>
              <p className="text-white/60 text-[10px] uppercase tracking-wider">{card.issuingAuthority}</p>
            </div>
          </div>
        </div>

        <div className="mb-4 pb-4 border-b border-white/20">
          <p className="text-white/50 text-[10px] uppercase tracking-wider mb-0.5">Full Name</p>
          <p className="text-white text-base font-bold uppercase tracking-wide">{card.fullName}</p>
        </div>

        <div className="grid grid-cols-3 gap-3">
          <div>
            <p className="text-white/50 text-[10px] uppercase tracking-wider mb-0.5">ID Number</p>
            <p className="text-white text-xs font-medium tracking-wide">{card.idNumber}</p>
          </div>
          <div>
            <p className="text-white/50 text-[10px] uppercase tracking-wider mb-0.5">Issued</p>
            <p className="text-white text-xs font-medium">{card.issueDate}</p>
          </div>
          <div>
            <p className="text-white/50 text-[10px] uppercase tracking-wider mb-0.5">Expires</p>
            <p className="text-white text-xs font-medium">{card.expiryDate}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
