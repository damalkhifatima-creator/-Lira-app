
import React, { useState, useRef } from 'react';
import { 
  LayoutDashboard, Settings, Image as ImageIcon, Bell, LogOut, 
  Users, Save, Palette, Clock, Upload, X, Menu, Smartphone
} from 'lucide-react';
import { AppSettings } from '../../types';

interface DashboardProps {
  settings: AppSettings;
  setSettings: (s: AppSettings) => void;
  onLogout: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ settings, setSettings, onLogout }) => {
  const [activeTab, setActiveTab] = useState<'system' | 'visual' | 'maintenance'>('system');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const logoInputRef = useRef<HTMLInputElement>(null);

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSettings({ ...settings, logoUrl: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const navItems = [
    { id: 'system', label: 'إعدادات النظام', icon: Settings },
    { id: 'visual', label: 'الهوية البصرية', icon: Palette },
    { id: 'maintenance', label: 'وضع الصيانة', icon: Clock },
  ];

  return (
    <div className="min-h-screen bg-[#020617] flex flex-col md:flex-row font-cairo text-white">
      {/* Sidebar Mobile Toggle */}
      <div className="md:hidden p-4 glass flex justify-between items-center z-[100]">
        <h1 className="font-black">لوحة الإدارة</h1>
        <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Sidebar */}
      <aside className={`
        fixed inset-y-0 right-0 w-72 border-l border-white/5 p-6 flex flex-col glass z-[90] transition-transform duration-300
        ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full md:translate-x-0 md:static'}
      `}>
        <div className="hidden md:flex items-center gap-3 mb-12">
          <div className="w-10 h-10 emerald-gradient rounded-xl flex items-center justify-center">
            <LayoutDashboard className="text-white w-6 h-6" />
          </div>
          <h1 className="text-xl font-black">مركز التحكم</h1>
        </div>

        <nav className="flex-1 space-y-2">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setActiveTab(item.id as any);
                setIsMobileMenuOpen(false);
              }}
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

      {/* Content */}
      <main className="flex-1 p-4 md:p-10 overflow-y-auto">
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h2 className="text-2xl md:text-3xl font-black">الإعدادات الذكية 2026</h2>
            <p className="text-gray-400 text-sm mt-1">إدارة شاملة للنظام من أي جهاز.</p>
          </div>
          <button className="w-full md:w-auto px-8 py-3 bg-emerald-500 text-white rounded-2xl font-bold shadow-xl flex items-center justify-center gap-2 hover:scale-105 transition-all">
            <Save size={20} /> حفظ الإعدادات
          </button>
        </header>

        <div className="grid grid-cols-1 gap-6">
          {activeTab === 'system' && (
            <div className="space-y-6">
              <div className="glass p-6 md:p-8 rounded-3xl border border-white/5">
                <h3 className="text-xl font-bold mb-6">المعلومات الأساسية</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs text-gray-400 mb-2">اسم الموقع</label>
                    <input 
                      type="text" 
                      value={settings.siteName} 
                      onChange={(e) => setSettings({ ...settings, siteName: e.target.value })}
                      className="w-full bg-white/5 border border-white/10 p-4 rounded-xl outline-none" 
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-400 mb-2">معامل التحويل</label>
                    <input 
                      type="number" 
                      value={settings.conversionFactor} 
                      onChange={(e) => setSettings({ ...settings, conversionFactor: Number(e.target.value) })}
                      className="w-full bg-white/5 border border-white/10 p-4 rounded-xl outline-none" 
                    />
                  </div>
                </div>
              </div>

              <div className="glass p-6 md:p-8 rounded-3xl border border-white/5">
                <h3 className="text-xl font-bold mb-6 flex items-center gap-3">
                   <Upload size={20} className="text-emerald-400" />
                   تحميل الشعار (Logo)
                </h3>
                <div className="flex flex-col md:flex-row items-center gap-8">
                   <div className="w-32 h-32 glass rounded-2xl flex items-center justify-center border-2 border-dashed border-white/20">
                      {settings.logoUrl ? (
                        <img src={settings.logoUrl} className="max-w-full max-h-full p-2 object-contain" />
                      ) : (
                        <ImageIcon className="text-gray-600" size={32} />
                      )}
                   </div>
                   <div className="space-y-4 text-center md:text-right">
                      <p className="text-sm text-gray-400">يفضل استخدام صورة شفافة PNG بجودة عالية.</p>
                      <input type="file" ref={logoInputRef} onChange={handleLogoUpload} className="hidden" accept="image/*" />
                      <button 
                        onClick={() => logoInputRef.current?.click()}
                        className="px-6 py-3 glass border-emerald-500/20 text-emerald-400 rounded-xl font-bold"
                      >
                        اختيار ملف
                      </button>
                   </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'maintenance' && (
            <div className="glass p-6 md:p-8 rounded-3xl border border-white/5 space-y-8">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-bold">جدولة الصيانة</h3>
                  <p className="text-gray-400 text-xs">إيقاف الخدمة عن الزوار مؤقتاً.</p>
                </div>
                <button 
                  onClick={() => setSettings({ 
                    ...settings, 
                    maintenance: { ...settings.maintenance, isPaused: !settings.maintenance.isPaused } 
                  })}
                  className={`px-6 py-2 rounded-full font-bold transition-all ${settings.maintenance.isPaused ? 'bg-red-500 text-white' : 'bg-emerald-500/20 text-emerald-400'}`}
                >
                  {settings.maintenance.isPaused ? 'إيقاف الصيانة' : 'تفعيل الصيانة'}
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs text-gray-400 mb-2">وقت البدء</label>
                  <input 
                    type="datetime-local" 
                    value={settings.maintenance.startTime}
                    onChange={(e) => setSettings({ ...settings, maintenance: { ...settings.maintenance, startTime: e.target.value }})}
                    className="w-full bg-white/5 border border-white/10 p-4 rounded-xl outline-none" 
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-400 mb-2">وقت الانتهاء المتوقع</label>
                  <input 
                    type="datetime-local" 
                    value={settings.maintenance.endTime}
                    onChange={(e) => setSettings({ ...settings, maintenance: { ...settings.maintenance, endTime: e.target.value }})}
                    className="w-full bg-white/5 border border-white/10 p-4 rounded-xl outline-none" 
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-xs text-gray-400 mb-2">سبب التوقف</label>
                  <textarea 
                    value={settings.maintenance.reason}
                    onChange={(e) => setSettings({ ...settings, maintenance: { ...settings.maintenance, reason: e.target.value }})}
                    className="w-full bg-white/5 border border-white/10 p-4 rounded-xl outline-none h-32" 
                  />
                </div>
              </div>
            </div>
          )}

          {activeTab === 'visual' && (
            <div className="glass p-6 md:p-8 rounded-3xl border border-white/5 space-y-6">
               <h3 className="text-xl font-bold">الهوية البصرية</h3>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <label className="block text-xs text-gray-400">اللون الأساسي للنظام</label>
                    <div className="flex gap-4">
                      {['#10b981', '#3b82f6', '#f59e0b', '#ef4444', '#8b5cf6'].map(color => (
                        <button 
                          key={color}
                          onClick={() => setSettings({ ...settings, visual: { ...settings.visual, primaryColor: color }})}
                          className={`w-10 h-10 rounded-full border-2 ${settings.visual.primaryColor === color ? 'border-white scale-110 shadow-lg' : 'border-transparent opacity-50'}`}
                          style={{ backgroundColor: color }}
                        />
                      ))}
                    </div>
                  </div>
               </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
