export type CardType = "credit" | "debit";
export type CardCategory = "finance" | "identity";
export type CardNetwork = "visa" | "mastercard" | "amex" | "discover";
export type IdType = "drivers_license" | "passport" | "national_id" | "student_id";

export interface FinanceCard {
  id: string;
  category: "finance";
  type: CardType;
  cardNumber: string;
  cardHolder: string;
  expiryDate: string;
  network: CardNetwork;
  bankName: string;
  gradient: string;
}

export interface IdentityCard {
  id: string;
  category: "identity";
  idType: IdType;
  fullName: string;
  idNumber: string;
  issueDate: string;
  expiryDate: string;
  issuingAuthority: string;
  gradient: string;
}

export type WalletCard = FinanceCard | IdentityCard;

export type DisplayMode = "regular" | "eink";
