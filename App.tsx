
import React, { useState, useEffect } from 'react';
import { Layout, Calculator, Coins, Grid, ShieldCheck, Lock, AlertCircle, Sparkles, X, TrendingUp, ShoppingBag } from 'lucide-react';
import Header from './components/Layout/Header';
import Hero from './components/Home/Hero';
import ValuationCalculator from './components/Calculator/ValuationCalculator';
import QuickConverter from './components/Converter/QuickConverter';
import MarketPulse from './components/Market/MarketPulse';
import BanknoteGallery from './components/Gallery/BanknoteGallery';
import PinPad from './components/Admin/PinPad';
import Dashboard from './components/Admin/Dashboard';
import GoldMarket from './components/Market/GoldMarket';
import { AppSettings, NumberMode } from './types';
import { INITIAL_SETTINGS } from './constants';

const App: React.FC = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [showPinPad, setShowPinPad] = useState(false);
  const [activeTab, setActiveTab] = useState<'home' | 'calc' | 'conv' | 'gallery' | 'gold'>('home');
  const [settings, setSettings] = useState<AppSettings>(() => {
    const saved = localStorage.getItem('syr_app_settings_v3');
    return saved ? JSON.parse(saved) : INITIAL_SETTINGS;
  });
  const [numberMode, setNumberMode] = useState<NumberMode>('latin');

  useEffect(() => {
    localStorage.setItem('syr_app_settings_v3', JSON.stringify(settings));
  }, [settings]);

  const toggleNumberMode = () => setNumberMode(prev => prev === 'latin' ? 'arabic' : 'latin');

  const formatNumber = (num: number): string => {
    if (numberMode === 'latin') return num.toLocaleString('en-US');
    const arabicDigits = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'];
    return num.toLocaleString('en-US').replace(/\d/g, d => arabicDigits[parseInt(d)]);
  };

  const handleAdminAuth = (pin: string) => {
    if (pin === '123456') {
      setIsAdmin(true);
      setShowPinPad(false);
      return true;
    }
    return false;
  };

  if (isAdmin) {
    return <Dashboard settings={settings} setSettings={setSettings} onLogout={() => setIsAdmin(false)} />;
  }

  return (
    <div className="min-h-screen relative pb-20">
      <div className="animated-bg" />
      
      {/* News Ticker */}
      <div className="fixed top-0 left-0 right-0 h-8 bg-emerald-600 z-[60] flex items-center overflow-hidden whitespace-nowrap">
        <div className="px-4 bg-emerald-800 h-full flex items-center font-bold text-xs text-white z-10 shadow-lg">عاجل</div>
        <div className="animate-marquee inline-block text-xs font-bold text-white pr-full">
          • المصرف المركزي السوري يؤكد استقرار سعر الصرف الجديد عند {settings.usdRate} ليرة للدولار الواحد • غرام الذهب عيار 21 يسجل {settings.goldRates.k21} ليرة جديدة • تطبيق خبير العملة هو رفيقك الموثوق في عام 2026 •
        </div>
      </div>

      <Header 
        onAdminClick={() => setShowPinPad(true)} 
        settings={settings}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      <main className="container mx-auto px-4 pt-32 space-y-12">
        {activeTab === 'home' && (
          <>
            <Hero onStart={() => setActiveTab('calc')} />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <MarketPulse settings={settings} formatNumber={formatNumber} />
              <GoldMarket rates={settings.goldRates} formatNumber={formatNumber} />
            </div>
            <QuickConverter settings={settings} formatNumber={formatNumber} />
          </>
        )}

        {activeTab === 'calc' && <ValuationCalculator settings={settings} formatNumber={formatNumber} />}
        {activeTab === 'conv' && <div className="max-w-2xl mx-auto"><QuickConverter settings={settings} formatNumber={formatNumber} /></div>}
        {activeTab === 'gallery' && <BanknoteGallery />}
        {activeTab === 'gold' && <div className="max-w-4xl mx-auto"><GoldMarket rates={settings.goldRates} formatNumber={formatNumber} isFull /></div>}
      </main>

      {/* Floating Mode Toggle */}
      <div className="fixed bottom-10 left-6 z-40">
        <button 
          onClick={toggleNumberMode}
          className="p-4 glass rounded-full shadow-2xl hover:scale-110 transition-transform text-emerald-400 border border-emerald-500/20"
        >
          <div className="text-lg font-bold">{numberMode === 'latin' ? '١٢٣' : '123'}</div>
        </button>
      </div>

      {showPinPad && <PinPad onClose={() => setShowPinPad(false)} onSubmit={handleAdminAuth} />}

      <style>{`
        @keyframes marquee {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        .animate-marquee {
          animation: marquee 30s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default App;
