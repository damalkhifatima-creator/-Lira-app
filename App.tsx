
import React, { useState, useEffect } from 'react';
import { Layout, Calculator, Coins, Grid, ShieldCheck, Lock, User as UserIcon, Home, Clock, LogOut } from 'lucide-react';
import Header from './components/Layout/Header';
import Hero from './components/Home/Hero';
import ValuationCalculator from './components/Calculator/ValuationCalculator';
import QuickConverter from './components/Converter/QuickConverter';
import MarketPulse from './components/Market/MarketPulse';
import BanknoteGallery from './components/Gallery/BanknoteGallery';
import PinPad from './components/Admin/PinPad';
import Dashboard from './components/Admin/Dashboard';
import AuthModal from './components/User/AuthModal';
import { AppSettings, NumberMode, User } from './types';
import { INITIAL_SETTINGS } from './constants';

const App: React.FC = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [showPinPad, setShowPinPad] = useState(false);
  const [showAuth, setShowAuth] = useState(false);
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('syr_user_v5');
    return saved ? JSON.parse(saved) : null;
  });
  const [activeTab, setActiveTab] = useState<'home' | 'calc' | 'conv' | 'gallery'>('home');
  const [settings, setSettings] = useState<AppSettings>(() => {
    const saved = localStorage.getItem('syr_app_settings_v5');
    return saved ? JSON.parse(saved) : INITIAL_SETTINGS;
  });
  const [numberMode, setNumberMode] = useState<NumberMode>('latin');

  useEffect(() => {
    localStorage.setItem('syr_app_settings_v5', JSON.stringify(settings));
  }, [settings]);

  useEffect(() => {
    if (user) {
      localStorage.setItem('syr_user_v5', JSON.stringify(user));
    } else {
      localStorage.removeItem('syr_user_v5');
    }
  }, [user]);

  const toggleNumberMode = () => setNumberMode(prev => prev === 'latin' ? 'arabic' : 'latin');

  const formatNumber = (num: number): string => {
    if (numberMode === 'latin') return num.toLocaleString('en-US');
    const arabicDigits = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'];
    return num.toLocaleString('en-US').replace(/\d/g, d => arabicDigits[parseInt(d)]);
  };

  const handleAdminAuth = (pin: string) => {
    if (pin === '88990077') {
      setIsAdmin(true);
      setShowPinPad(false);
      return true;
    }
    return false;
  };

  const handleLogoutUser = () => {
    setUser(null);
  };

  // Maintenance Check
  if (settings.maintenance.isPaused && !isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6 bg-[#020617] text-center">
        <div className="max-w-md space-y-8 animate-in fade-in zoom-in duration-700">
          <div className="w-24 h-24 bg-amber-500/20 rounded-full flex items-center justify-center mx-auto border border-amber-500/30">
            <Clock className="text-amber-500 animate-pulse" size={48} />
          </div>
          <h1 className="text-4xl font-black">نحن في صيانة</h1>
          <p className="text-gray-400 leading-relaxed">{settings.maintenance.reason}</p>
          <div className="glass p-6 rounded-2xl space-y-4">
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">وقت البدء:</span>
              <span className="font-bold">{settings.maintenance.startTime}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">العودة المتوقعة:</span>
              <span className="font-bold text-emerald-400">{settings.maintenance.endTime}</span>
            </div>
          </div>
          <button onClick={() => setShowPinPad(true)} className="text-[10px] text-gray-700 uppercase tracking-widest hover:text-gray-500">Admin Login</button>
        </div>
        {showPinPad && <PinPad onClose={() => setShowPinPad(false)} onSubmit={handleAdminAuth} />}
      </div>
    );
  }

  if (isAdmin) {
    return <Dashboard settings={settings} setSettings={setSettings} onLogout={() => setIsAdmin(false)} />;
  }

  const navItems = [
    { id: 'home', label: 'الرئيسية', icon: Home },
    { id: 'calc', label: 'الحاسبة', icon: Calculator },
    { id: 'conv', label: 'تحويل', icon: Coins },
    { id: 'gallery', label: 'الفئات', icon: Grid },
  ];

  return (
    <div className="min-h-screen relative pb-24 md:pb-12 overflow-x-hidden">
      <div className="animated-bg" />
      
      <Header 
        onAdminClick={() => setShowPinPad(true)} 
        onUserClick={() => user ? handleLogoutUser() : setShowAuth(true)}
        settings={settings}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        user={user}
      />

      <main className="container mx-auto px-4 pt-24 space-y-8 md:space-y-12">
        {activeTab === 'home' && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            {user && (
              <div className="glass p-4 rounded-2xl mb-8 flex items-center gap-4 border-emerald-500/20 animate-in slide-in-from-top-2">
                <div className="w-12 h-12 rounded-full border-2 border-emerald-500/40 overflow-hidden bg-slate-800">
                   {user.photoUrl ? <img src={user.photoUrl} className="w-full h-full object-cover" /> : <UserIcon className="m-2 text-emerald-500" />}
                </div>
                <div>
                  <h3 className="text-lg font-bold">أهلاً بك، {user.name}</h3>
                  <p className="text-xs text-gray-400">طاب يومك في سوريا الجديدة</p>
                </div>
              </div>
            )}
            <Hero onStart={() => setActiveTab('calc')} />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mt-8">
              <MarketPulse settings={settings} formatNumber={formatNumber} />
              <div className="glass p-8 rounded-2xl flex flex-col items-center justify-center text-center space-y-4">
                <ShieldCheck size={48} className="text-emerald-500" />
                <h3 className="font-black text-xl">نظام محمي 2026</h3>
                <p className="text-sm text-gray-400">جميع العمليات تخضع لأعلى معايير التشفير المالي لضمان سلامة مدخراتكم.</p>
              </div>
            </div>
            <div className="mt-8">
              <QuickConverter settings={settings} formatNumber={formatNumber} />
            </div>
          </div>
        )}

        {activeTab === 'calc' && <div className="animate-in fade-in slide-in-from-left-4 duration-500"><ValuationCalculator settings={settings} formatNumber={formatNumber} user={user} /></div>}
        {activeTab === 'conv' && <div className="max-w-2xl mx-auto animate-in fade-in slide-in-from-right-4 duration-500"><QuickConverter settings={settings} formatNumber={formatNumber} /></div>}
        {activeTab === 'gallery' && <div className="animate-in fade-in zoom-in-95 duration-500"><BanknoteGallery /></div>}
      </main>

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

      <div className="fixed bottom-20 left-4 md:bottom-10 md:left-6 z-40">
        <button 
          onClick={toggleNumberMode}
          className="p-3 md:p-4 glass rounded-full shadow-2xl hover:scale-110 transition-transform text-emerald-400 border border-emerald-500/20"
        >
          <div className="text-sm md:text-lg font-bold">{numberMode === 'latin' ? '١٢٣' : '123'}</div>
        </button>
      </div>

      {showPinPad && <PinPad onClose={() => setShowPinPad(false)} onSubmit={handleAdminAuth} />}
      {showAuth && <AuthModal onClose={() => setShowAuth(false)} onLogin={setUser} />}
    </div>
  );
};

export default App;
