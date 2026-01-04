
export interface Banknote {
  id: number;
  value: number;
  name: string;
  frontImage: string;
  backImage: string;
  securityFeatures: string[];
  purchasingPower: string;
}

export interface MaintenanceConfig {
  isPaused: boolean;
  startTime: string;
  endTime: string;
  reason: string;
}

export interface VisualIdentity {
  primaryColor: string;
  themeMode: 'dark' | 'glass';
}

export interface AppSettings {
  siteName: string;
  logoUrl: string;
  aboutText: string;
  maintenance: MaintenanceConfig;
  visual: VisualIdentity;
  conversionFactor: number;
}

export interface User {
  name: string;
  pin: string;
  photoUrl: string;
}

export type NumberMode = 'arabic' | 'latin';
