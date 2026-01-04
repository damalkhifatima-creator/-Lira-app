
import React, { useState, useEffect } from 'react';
import { Layout, Calculator, Coins, Grid, ShieldCheck, Lock, ShoppingBag, Home } from 'lucide-react';
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
    const saved = localStorage.getItem('syr_app_settings_v4');
    return saved ? JSON.parse(saved) : INITIAL_SETTINGS;
  });
  const [numberMode, setNumberMode] = useState<NumberMode>('latin');

  useEffect(() => {
    localStorage.setItem('syr_app_settings_v4', JSON.stringify(settings));
  }, [settings]);

  const toggleNumberMode = () => setNumberMode(prev => prev === 'latin' ? 'arabic' : 'latin');

  const formatNumber = (num: number): string => {
    if (numberMode === 'latin') return num.toLocaleString('en-US');
    const arabicDigits = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'];
    return num.toLocaleString('en-US').replace(/\d/g, d => arabicDigits[parseInt(d)]);
  };

  const handleAdminAuth = (pin: string) => {
    // Updated admin password as requested
    if (pin === '88990077') {
      setIsAdmin(true);
      setShowPinPad(false);
      return true;
    }
    return false;
  };

  if (isAdmin) {
    return <Dashboard settings={settings} setSettings={setSettings} onLogout={() => setIsAdmin(false)} />;
  }

  const navItems = [
    { id: 'home', label: 'الرئيسية', icon: Home },
    { id: 'calc', label: 'الحاسبة', icon: Calculator },
    { id: 'conv', label: 'تحويل', icon: Coins },
    { id: 'gallery', label: 'الفئات', icon: Grid },
    { id: 'gold', label: 'الذهب', icon: ShoppingBag },
  ];

  return (
    <div className="min-h-screen relative pb-24 md:pb-12 overflow-x-hidden">
      <div className="animated-bg" />
      
      {/* Ticker removed as requested */}

      <Header 
        onAdminClick={() => setShowPinPad(true)} 
        settings={settings}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      <main className="container mx-auto px-4 pt-24 space-y-8 md:space-y-12">
        {activeTab === 'home' && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <Hero onStart={() => setActiveTab('calc')} />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mt-8">
              <MarketPulse settings={settings} formatNumber={formatNumber} />
              <GoldMarket rates={settings.goldRates} formatNumber={formatNumber} />
            </div>
            <div className="mt-8">
              <QuickConverter settings={settings} formatNumber={formatNumber} />
            </div>
          </div>
        )}

        {activeTab === 'calc' && <div className="animate-in fade-in slide-in-from-left-4 duration-500"><ValuationCalculator settings={settings} formatNumber={formatNumber} /></div>}
        {activeTab === 'conv' && <div className="max-w-2xl mx-auto animate-in fade-in slide-in-from-right-4 duration-500"><QuickConverter settings={settings} formatNumber={formatNumber} /></div>}
        {activeTab === 'gallery' && <div className="animate-in fade-in zoom-in-95 duration-500"><BanknoteGallery /></div>}
        {activeTab === 'gold' && <div className="max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500"><GoldMarket rates={settings.goldRates} formatNumber={formatNumber} isFull /></div>}
      </main>

      {/* Mobile Bottom Navigation Bar (App Experience) */}
      <div className="fixed bottom-0 left-0 right-0 glass border-t border-white/10 md:hidden z-[100] px-2 py-3">
        <div className="flex justify-around items-center">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id as any)}
              className={`flex flex-col items-center gap-1 transition-all ${activeTab === item.id ? 'text-emerald-400 scale-110' : 'text-gray-500'}`}
            >
              <item.icon size={20} fill={activeTab === item.id ? 'currentColor' : 'none'} fillOpacity={0.2} />
              <span className="text-[10px] font-bold">{item.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Floating Mode Toggle (Adjusted for Bottom Nav) */}
      <div className="fixed bottom-20 left-4 md:bottom-10 md:left-6 z-40">
        <button 
          onClick={toggleNumberMode}
          className="p-3 md:p-4 glass rounded-full shadow-2xl hover:scale-110 transition-transform text-emerald-400 border border-emerald-500/20"
        >
          <div className="text-sm md:text-lg font-bold">{numberMode === 'latin' ? '١٢٣' : '123'}</div>
        </button>
      </div>

      {showPinPad && <PinPad onClose={() => setShowPinPad(false)} onSubmit={handleAdminAuth} />}
    </div>
  );
};

export default App;
