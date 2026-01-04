
import React, { useState, useEffect } from 'react';
import { Shield, User, Lock, Layout, Calculator, Coins, Grid } from 'lucide-react';
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
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'py-2 glass shadow-lg' : 'py-6 bg-transparent'}`}>
      <div className="container mx-auto px-4 flex items-center justify-between">
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => setActiveTab('home')}>
          <div className="w-10 h-10 emerald-gradient rounded-xl flex items-center justify-center shadow-emerald-500/20 shadow-lg">
            <Shield className="text-white w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl font-black text-white tracking-tight leading-none">{settings.siteName}</h1>
            <p className="text-[10px] text-emerald-400 font-bold uppercase tracking-widest mt-1">Vision 2026</p>
          </div>
        </div>

        <nav className="hidden md:flex items-center gap-8 text-sm font-semibold">
          {[
            { id: 'home', label: 'الرئيسية', icon: Layout },
            { id: 'calc', label: 'حاسبة التقييم', icon: Calculator },
            { id: 'conv', label: 'المحول السريع', icon: Coins },
            { id: 'gallery', label: 'دليل الفئات', icon: Grid },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex items-center gap-2 transition-colors ${activeTab === item.id ? 'text-emerald-400' : 'text-gray-400 hover:text-white'}`}
            >
              <item.icon size={18} />
              {item.label}
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <button className="p-2 text-gray-400 hover:text-white transition-colors">
            <User size={20} />
          </button>
          <button 
            onClick={onAdminClick}
            className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 rounded-full text-xs font-bold border border-white/10 transition-all"
          >
            <Lock size={14} className="text-amber-400" />
            دخول إداري
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
