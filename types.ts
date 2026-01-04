
export interface Banknote {
  id: number;
  value: number;
  name: string;
  frontImage: string;
  backImage: string;
  securityFeatures: string[];
  purchasingPower: string;
}

export interface AppSettings {
  siteName: string;
  logoUrl: string;
  aboutText: string;
  maintenanceMode: boolean;
  usdRate: number;
  conversionFactor: number;
}

export interface VisitorStats {
  count: number;
  lastVisit: string;
}

export type NumberMode = 'arabic' | 'latin';
