
import React, { useState, useEffect } from 'react';
import { User, Lock, Layout, Calculator, Coins, Grid } from 'lucide-react';
import { AppSettings } from '../../types';

// Syrian Eagle SVG Component
const SyrianEagle = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor">
    <path d="M12,2L14.5,9H22L16,14L18.5,21L12,17L5.5,21L8,14L2,9H9.5L12,2Z" className="opacity-20" /> {/* Subtle star behind */}
    <path d="M12,4.5C12,4.5 9,7 7,12C5,17 7,20 12,20C17,20 19,17 17,12C15,7 12,4.5 12,4.5M12,6C13.5,7.5 15,10 15,12C15,14 14,16 12,18C10,16 9,14 9,12C9,10 10.5,7.5 12,6Z" />
    <rect x="10.5" y="10" width="3" height="1.5" rx="0.5" />
    <rect x="10.5" y="12.5" width="3" height="1.5" rx="0.5" />
    <path d="M7,10L4,11L3,14L5,13L7,10Z" />
    <path d="M17,10L20,11L21,14L19,13L17,10Z" />
  </svg>
);

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
          <div className="w-12 h-12 bg-amber-500/10 rounded-xl flex items-center justify-center border border-amber-500/20">
            <SyrianEagle className="text-amber-500 w-8 h-8" />
          </div>
          <div>
            <h1 className="text-xl font-black text-white tracking-tight leading-none">{settings.siteName}</h1>
            <p className="text-[10px] text-amber-500 font-bold uppercase tracking-widest mt-1">الجمهورية العربية السورية</p>
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
