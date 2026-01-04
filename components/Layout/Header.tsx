
import React, { useState, useEffect } from 'react';
import { Lock, Layout, Calculator, Coins, Grid, Wallet } from 'lucide-react';
import { AppSettings } from '../../types';

interface HeaderProps {
  onAdminClick: () => void;
  settings: AppSettings;
  activeTab: string;
  setActiveTab: (tab: any) => void;
}

const Header: React.FC<HeaderProps> = ({ onAdminClick, settings, activeTab, setActiveTab }) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'py-3 glass shadow-lg' : 'py-5 bg-transparent'}`}>
      <div className="container mx-auto px-4 flex items-center justify-between">
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => setActiveTab('home')}>
          <div className="w-10 h-10 emerald-gradient rounded-xl flex items-center justify-center shadow-lg shadow-emerald-500/20">
            <Wallet className="text-white w-6 h-6" />
          </div>
          <div>
            <h1 className="text-lg md:text-xl font-black text-white tracking-tight leading-none">{settings.siteName}</h1>
            <p className="text-[9px] text-emerald-500 font-bold uppercase tracking-widest mt-1">النظام المالي الحديث</p>
          </div>
        </div>

        {/* Hidden on mobile, handled by bottom nav */}
        <nav className="hidden md:flex items-center gap-6 text-xs font-bold">
          {[
            { id: 'home', label: 'الرئيسية', icon: Layout },
            { id: 'calc', label: 'حاسبة التقييم', icon: Calculator },
            { id: 'conv', label: 'المحول السريع', icon: Coins },
            { id: 'gallery', label: 'دليل الفئات', icon: Grid },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex items-center gap-2 transition-colors px-3 py-2 rounded-lg ${activeTab === item.id ? 'text-emerald-400 bg-emerald-500/10' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
            >
              <item.icon size={16} />
              {item.label}
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button 
            onClick={onAdminClick}
            className="flex items-center gap-2 px-3 py-2 bg-white/5 hover:bg-white/10 rounded-xl text-[10px] font-black border border-white/10 transition-all"
          >
            <Lock size={12} className="text-emerald-400" />
            <span className="hidden sm:inline">دخول إداري</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
