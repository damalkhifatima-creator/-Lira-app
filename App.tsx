
import React, { useState, useEffect, useCallback } from 'react';
import { Layout, Calculator, Coins, TrendingUp, Grid, ShieldCheck, Settings, LogIn, X, Info, Download, AlertCircle } from 'lucide-react';
import Header from './components/Layout/Header';
import Hero from './components/Home/Hero';
import ValuationCalculator from './components/Calculator/ValuationCalculator';
import QuickConverter from './components/Converter/QuickConverter';
import MarketPulse from './components/Market/MarketPulse';
import BanknoteGallery from './components/Gallery/BanknoteGallery';
import PinPad from './components/Admin/PinPad';
import Dashboard from './components/Admin/Dashboard';
import { AppSettings, NumberMode } from './types';
import { INITIAL_SETTINGS } from './constants';

const App: React.FC = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [showPinPad, setShowPinPad] = useState(false);
  const [activeTab, setActiveTab] = useState<'home' | 'calc' | 'conv' | 'gallery'>('home');
  const [settings, setSettings] = useState<AppSettings>(() => {
    const saved = localStorage.getItem('syr_app_settings');
    return saved ? JSON.parse(saved) : INITIAL_SETTINGS;
  });
  const [numberMode, setNumberMode] = useState<NumberMode>('latin');
  const [alertMessage, setAlertMessage] = useState<string | null>(null);

  useEffect(() => {
    localStorage.setItem('syr_app_settings', JSON.stringify(settings));
  }, [settings]);

  const toggleNumberMode = () => {
    setNumberMode(prev => prev === 'latin' ? 'arabic' : 'latin');
  };

  const formatNumber = (num: number): string => {
    if (numberMode === 'latin') return num.toLocaleString('en-US');
    const arabicDigits = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'];
    return num.toLocaleString('en-US').replace(/\d/g, d => arabicDigits[parseInt(d)]);
  };

  const handleAdminAuth = (pin: string) => {
    if (pin === '123456') { // Default PIN for demo
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
      
      {/* Dynamic Background Elements */}
      <div className="fixed top-20 left-10 w-32 h-32 bg-emerald-500/10 rounded-full blur-3xl floating" />
      <div className="fixed bottom-20 right-10 w-48 h-48 bg-indigo-500/10 rounded-full blur-3xl floating" style={{ animationDelay: '2s' }} />

      <Header 
        onAdminClick={() => setShowPinPad(true)} 
        settings={settings}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      <main className="container mx-auto px-4 pt-24 space-y-12">
        {/* Banner Alert if any */}
        {alertMessage && (
          <div className="glass p-4 rounded-xl border-emerald-500/50 flex items-center gap-3 animate-pulse">
            <AlertCircle className="text-emerald-500" />
            <p className="text-sm font-medium">{alertMessage}</p>
          </div>
        )}

        {activeTab === 'home' && (
          <>
            <Hero onStart={() => setActiveTab('calc')} />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <MarketPulse settings={settings} formatNumber={formatNumber} />
              <div className="glass p-8 rounded-2xl flex flex-col justify-center items-center text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-indigo-500/20 flex items-center justify-center">
                  <ShieldCheck className="w-8 h-8 text-indigo-400" />
                </div>
                <h3 className="text-xl font-bold">نظام الأمان</h3>
                <p className="text-gray-400 text-sm">تطبيقنا يستخدم أحدث تقنيات التشفير لضمان سرية بياناتك المالية وحمايتها.</p>
              </div>
              <div className="glass p-8 rounded-2xl flex flex-col justify-center items-center text-center space-y-4 cursor-pointer hover:bg-white/5 transition-colors" onClick={() => setActiveTab('gallery')}>
                <div className="w-16 h-16 rounded-full bg-amber-500/20 flex items-center justify-center">
                  <Grid className="w-8 h-8 text-amber-400" />
                </div>
                <h3 className="text-xl font-bold">دليل العملات</h3>
                <p className="text-gray-400 text-sm">استكشف الفئات النقدية الجديدة وميزات الأمان المتقدمة المدمجة فيها.</p>
              </div>
            </div>
            <QuickConverter settings={settings} formatNumber={formatNumber} />
          </>
        )}

        {activeTab === 'calc' && (
          <ValuationCalculator settings={settings} formatNumber={formatNumber} />
        )}

        {activeTab === 'conv' && (
          <div className="max-w-2xl mx-auto">
             <QuickConverter settings={settings} formatNumber={formatNumber} />
          </div>
        )}

        {activeTab === 'gallery' && (
          <BanknoteGallery />
        )}
      </main>

      {/* PIN Pad Modal */}
      {showPinPad && (
        <PinPad 
          onClose={() => setShowPinPad(false)} 
          onSubmit={handleAdminAuth} 
        />
      )}

      {/* Floating Action Button for Settings */}
      <button 
        onClick={toggleNumberMode}
        className="fixed bottom-6 left-6 p-4 glass rounded-full shadow-2xl hover:scale-110 transition-transform text-emerald-400 z-40"
        title="تغيير نمط الأرقام"
      >
        <div className="text-lg font-bold">{numberMode === 'latin' ? '١٢٣' : '123'}</div>
      </button>

      {/* Mobile Footer Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 glass md:hidden flex justify-around p-3 z-50 border-t border-white/10">
         <button onClick={() => setActiveTab('home')} className={`flex flex-col items-center ${activeTab === 'home' ? 'text-emerald-400' : 'text-gray-400'}`}>
           <Layout size={20} />
           <span className="text-[10px] mt-1">الرئيسية</span>
         </button>
         <button onClick={() => setActiveTab('calc')} className={`flex flex-col items-center ${activeTab === 'calc' ? 'text-emerald-400' : 'text-gray-400'}`}>
           <Calculator size={20} />
           <span className="text-[10px] mt-1">الحاسبة</span>
         </button>
         <button onClick={() => setActiveTab('conv')} className={`flex flex-col items-center ${activeTab === 'conv' ? 'text-emerald-400' : 'text-gray-400'}`}>
           <Coins size={20} />
           <span className="text-[10px] mt-1">المحول</span>
         </button>
         <button onClick={() => setActiveTab('gallery')} className={`flex flex-col items-center ${activeTab === 'gallery' ? 'text-emerald-400' : 'text-gray-400'}`}>
           <Grid size={20} />
           <span className="text-[10px] mt-1">الدليل</span>
         </button>
      </nav>
    </div>
  );
};

export default App;
