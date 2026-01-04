
import React, { useState } from 'react';
import { 
  LayoutDashboard, Settings, Image as ImageIcon, Bell, LogOut, 
  Users, Database, Power, Globe, Share2, Save, Trash2, Edit, ShoppingBag 
} from 'lucide-react';
import { AppSettings, Banknote } from '../../types';
import { INITIAL_BANKNOTES } from '../../constants';

interface DashboardProps {
  settings: AppSettings;
  setSettings: (s: AppSettings) => void;
  onLogout: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ settings, setSettings, onLogout }) => {
  const [activeTab, setActiveTab] = useState<'system' | 'identity' | 'banknotes' | 'alerts' | 'gold'>('system');
  const [banknotes, setBanknotes] = useState<Banknote[]>(INITIAL_BANKNOTES);

  const saveSettings = () => {
    setSettings(settings);
    alert('تم حفظ الإعدادات بنجاح!');
  };

  const updateGold = (key: keyof typeof settings.goldRates, val: string) => {
    setSettings({
      ...settings,
      goldRates: { ...settings.goldRates, [key]: parseFloat(val) || 0 }
    });
  };

  return (
    <div className="min-h-screen bg-[#020617] flex">
      <aside className="w-72 border-l border-white/5 p-6 flex flex-col glass z-50">
        <div className="flex items-center gap-3 mb-12">
          <div className="w-10 h-10 emerald-gradient rounded-xl flex items-center justify-center">
            <LayoutDashboard className="text-white w-6 h-6" />
          </div>
          <h1 className="text-xl font-black">لوحة التحكم</h1>
        </div>

        <nav className="flex-1 space-y-2">
          {[
            { id: 'system', label: 'إعدادات النظام', icon: Settings },
            { id: 'gold', label: 'أسعار الذهب', icon: ShoppingBag },
            { id: 'identity', label: 'الهوية البصرية', icon: Globe },
            { id: 'banknotes', label: 'نماذج العملات', icon: ImageIcon },
            { id: 'alerts', label: 'التنبيهات', icon: Bell },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id as any)}
              className={`w-full flex items-center gap-4 px-5 py-4 rounded-2xl font-bold transition-all ${
                activeTab === item.id ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'text-gray-400 hover:bg-white/5'
              }`}
            >
              <item.icon size={20} />
              {item.label}
            </button>
          ))}
        </nav>

        <button onClick={onLogout} className="mt-auto flex items-center gap-4 px-5 py-4 rounded-2xl font-bold text-red-400 hover:bg-red-500/10 transition-all">
          <LogOut size={20} /> تسجيل الخروج
        </button>
      </aside>

      <main className="flex-1 p-10 overflow-y-auto">
        <header className="flex justify-between items-center mb-12">
          <div>
            <h2 className="text-3xl font-black">مركز الإدارة الرئيسي</h2>
            <p className="text-gray-400 mt-1">إدارة شاملة لبيانات خبير العملة 2026.</p>
          </div>
          <button onClick={saveSettings} className="px-8 py-3 bg-white text-slate-950 rounded-2xl font-bold shadow-xl flex items-center gap-2 hover:scale-105 transition-all">
            <Save size={20} /> حفظ التغييرات
          </button>
        </header>

        {activeTab === 'system' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="glass p-8 rounded-3xl border border-white/5 space-y-6">
              <div className="flex items-center gap-4 text-emerald-400"><Users size={24} /> <h3 className="text-lg font-bold">الزوار النشطون</h3></div>
              <div className="text-4xl font-black">3,492</div>
            </div>
            <div className="glass p-8 rounded-3xl border border-white/5 space-y-6 col-span-2">
               <h3 className="text-lg font-bold">تعديل الثوابت المالية</h3>
               <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs text-gray-400">سعر الصرف الرسمي (USD)</label>
                    <input type="number" value={settings.usdRate} onChange={(e) => setSettings({ ...settings, usdRate: Number(e.target.value) })} className="w-full bg-white/5 border border-white/10 p-4 rounded-xl outline-none" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs text-gray-400">معامل التحويل (Old to New)</label>
                    <input type="number" value={settings.conversionFactor} onChange={(e) => setSettings({ ...settings, conversionFactor: Number(e.target.value) })} className="w-full bg-white/5 border border-white/10 p-4 rounded-xl outline-none" />
                  </div>
               </div>
            </div>
          </div>
        )}

        {activeTab === 'gold' && (
          <div className="glass p-10 rounded-3xl border border-white/5 space-y-8">
            <h3 className="text-xl font-bold">تحديث أسعار الذهب (ليرة جديدة)</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {Object.keys(settings.goldRates).map((key) => (
                <div key={key} className="space-y-2">
                  <label className="text-xs text-gray-400 uppercase">غرام عيار {key.replace('k', '')}</label>
                  <input 
                    type="number" 
                    value={settings.goldRates[key as keyof typeof settings.goldRates]} 
                    onChange={(e) => updateGold(key as any, e.target.value)}
                    className="w-full bg-white/5 border border-white/10 p-4 rounded-xl outline-none focus:border-amber-500" 
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ... rest of the tabs like identity, banknotes, alerts remain similar but styled ... */}
      </main>
    </div>
  );
};

export default Dashboard;
