
import React, { useState, useEffect } from 'react';
import { Lock, Layout, Calculator, Coins, Grid, Wallet, User as UserIcon, LogOut } from 'lucide-react';
import { AppSettings, User } from '../../types';

interface HeaderProps {
  onAdminClick: () => void;
  onUserClick: () => void;
  settings: AppSettings;
  activeTab: string;
  setActiveTab: (tab: any) => void;
  user: User | null;
}

const Header: React.FC<HeaderProps> = ({ onAdminClick, onUserClick, settings, activeTab, setActiveTab, user }) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const getLogoShapeClass = () => {
    switch (settings.logoShape) {
      case 'circle': return 'rounded-full';
      case 'square': return 'rounded-lg';
      case 'rectangle': return 'rounded-md';
      default: return 'rounded-xl';
    }
  };

  const logoStyle: React.CSSProperties = {
    width: `${settings.logoSize}px`,
    height: settings.logoShape === 'rectangle' ? 'auto' : `${settings.logoSize}px`,
    minWidth: `${settings.logoSize}px`,
    objectFit: 'contain'
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'py-3 glass shadow-lg' : 'py-5 bg-transparent'}`}>
      <div className="container mx-auto px-4 flex items-center justify-between">
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => setActiveTab('home')}>
          {settings.logoUrl ? (
            <div className={`overflow-hidden flex items-center justify-center bg-white/5 border border-white/10 ${getLogoShapeClass()}`} style={{ width: settings.logoSize, height: settings.logoShape === 'rectangle' ? 'auto' : settings.logoSize }}>
                <img src={settings.logoUrl} className="max-w-full max-h-full" style={logoStyle} alt="Logo" />
            </div>
          ) : (
            <div className="w-10 h-10 emerald-gradient rounded-xl flex items-center justify-center shadow-lg shadow-emerald-500/20">
              <Wallet className="text-white w-6 h-6" />
            </div>
          )}
          <div>
            <h1 className="text-lg md:text-xl font-black text-white tracking-tight leading-none">{settings.siteName}</h1>
            <p className="text-[9px] text-emerald-500 font-bold uppercase tracking-widest mt-1">النظام المالي الحديث</p>
          </div>
        </div>

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
            onClick={onUserClick}
            className={`flex items-center gap-2 px-3 py-2 rounded-xl text-[10px] font-black border transition-all ${user ? 'bg-emerald-500/10 border-emerald-500/30' : 'bg-white/5 border-white/10'}`}
          >
            {user ? (
              <>
                <div className="w-5 h-5 rounded-full overflow-hidden border border-emerald-500/50">
                  {user.photoUrl ? <img src={user.photoUrl} className="w-full h-full object-cover" /> : <UserIcon size={12} />}
                </div>
                <span>{user.name}</span>
                <LogOut size={10} className="text-red-400" />
              </>
            ) : (
              <>
                <UserIcon size={12} className="text-emerald-400" />
                <span>دخول مستخدم</span>
              </>
            )}
          </button>
          <button 
            onClick={onAdminClick}
            className="p-2 bg-white/5 hover:bg-white/10 rounded-xl border border-white/10"
          >
            <Lock size={12} className="text-gray-400" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
