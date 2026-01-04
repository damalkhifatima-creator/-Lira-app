
export interface Banknote {
  id: number;
  value: number;
  name: string;
  frontImage: string;
  backImage: string;
  securityFeatures: string[];
  purchasingPower: string;
}

export interface FloatingImage {
  id: string;
  url: string;
  top: number; // percentage
  left: number; // percentage
  size: number; // pixels
  animationDuration: number; // seconds
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
  globalBackgroundImage: string;
  floatingImages: FloatingImage[];
}

export interface AppServices {
  supportLink: string;
  newsTicker: string;
  showConverter: boolean;
  showGallery: boolean;
  showNews: boolean;
}

export interface AppSettings {
  siteName: string;
  logoUrl: string;
  logoShape: 'circle' | 'square' | 'rectangle';
  logoSize: number;
  aboutText: string;
  maintenance: MaintenanceConfig;
  visual: VisualIdentity;
  services: AppServices;
  conversionFactor: number;
}

export interface User {
  name: string;
  pin: string;
  photoUrl: string;
  accountNumber: string; // 4-digit account number
}

export type NumberMode = 'arabic' | 'latin';
