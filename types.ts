
export interface Banknote {
  id: number;
  value: number;
  name: string;
  frontImage: string;
  backImage: string;
  securityFeatures: string[];
  purchasingPower: string;
}

export interface GoldRates {
  k24: number;
  k21: number;
  k18: number;
  ounce: number;
}

export interface AppSettings {
  siteName: string;
  logoUrl: string;
  aboutText: string;
  maintenanceMode: boolean;
  usdRate: number;
  conversionFactor: number;
  goldRates: GoldRates;
}

export interface VisitorStats {
  count: number;
  lastVisit: string;
}

export type NumberMode = 'arabic' | 'latin';

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}
