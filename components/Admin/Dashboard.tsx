
import React, { useState, useRef } from 'react';
import { 
  LayoutDashboard, Settings, Image as ImageIcon, LogOut, 
  Save, Palette, Clock, Upload, X, Menu, Laptop, Tablet, Smartphone
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
    <div className="min-h-screen bg-[#020617] flex flex-col md:flex-row font-cairo text-white overflow-hidden">
      {/* Mobile Top Bar */}
      <div className="md:hidden p-4 glass flex justify-between items-center z-[100] sticky top-0">
        <div className="flex items-center gap-2">
           <LayoutDashboard size={20} className="text-emerald-400" />
           <h1 className="font-black text-sm">لوحة التحكم</h1>
        </div>
        <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="p-2 hover:bg-white/10 rounded-lg">
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Sidebar (Responsive Overlay for Mobile) */}
      <aside className={`
        fixed inset-y-0 right-0 w-72 md:w-64 lg:w-80 border-l border-white/5 p-6 flex flex-col glass z-[90] transition-transform duration-300
        ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full md:translate-x-0 md:static'}
      `}>
        <div className="hidden md:flex items-center gap-3 mb-10">
          <div className="w-10 h-10 emerald-gradient rounded-xl flex items-center justify-center">
            <LayoutDashboard className="text-white w-6 h-6" />
          </div>
          <h1 className="text-xl font-black">مركز الإدارة</h1>
        </div>

        <nav className="flex-1 space-y-1">
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
              <span className="text-sm">{item.label}</span>
            </button>
          ))}
        </nav>

        <button onClick={onLogout} className="mt-8 flex items-center gap-4 px-5 py-4 rounded-2xl font-bold text-red-400 hover:bg-red-500/10 transition-all">
          <LogOut size={20} /> <span className="text-sm">خروج</span>
        </button>
      </aside>

      {/* Main Panel Content */}
      <main className="flex-1 p-4 md:p-8 lg:p-12 overflow-y-auto h-screen">
        <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <div className="space-y-1">
            <h2 className="text-2xl lg:text-3xl font-black">الإعدادات الذكية 2026</h2>
            <div className="flex gap-4 text-[10px] text-gray-500 font-bold uppercase tracking-widest">
                <span className="flex items-center gap-1"><Laptop size={10} /> PC</span>
                <span className="flex items-center gap-1"><Tablet size={10} /> Tablet</span>
                <span className="flex items-center gap-1"><Smartphone size={10} /> Mobile</span>
            </div>
          </div>
          <button className="w-full sm:w-auto px-8 py-3 bg-emerald-500 text-white rounded-2xl font-bold shadow-xl flex items-center justify-center gap-2 hover:bg-emerald-600 transition-all active:scale-95">
            <Save size={18} /> حفظ التغييرات
          </button>
        </header>

        <div className="max-w-5xl mx-auto grid grid-cols-1 gap-6">
          {activeTab === 'system' && (
            <div className="space-y-6 animate-in fade-in duration-500">
              <div className="glass p-6 md:p-8 rounded-3xl border border-white/5">
                <h3 className="text-lg font-bold mb-6 border-b border-white/5 pb-4">معلومات المنصة الأساسية</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-400">اسم الموقع الرسمي</label>
                    <input 
                      type="text" 
                      value={settings.siteName} 
                      onChange={(e) => setSettings({ ...settings, siteName: e.target.value })}
                      className="w-full bg-white/5 border border-white/10 p-4 rounded-xl outline-none focus:border-emerald-500/50 transition-colors" 
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-400">معامل التحويل (N:O)</label>
                    <input 
                      type="number" 
                      value={settings.conversionFactor} 
                      onChange={(e) => setSettings({ ...settings, conversionFactor: Number(e.target.value) })}
                      className="w-full bg-white/5 border border-white/10 p-4 rounded-xl outline-none focus:border-emerald-500/50 transition-colors" 
                    />
                  </div>
                </div>
              </div>

              <div className="glass p-6 md:p-8 rounded-3xl border border-white/5">
                <h3 className="text-lg font-bold mb-6 flex items-center gap-3">
                   <Upload size={18} className="text-emerald-400" />
                   إدارة الشعار البصري
                </h3>
                <div className="flex flex-col sm:flex-row items-center gap-8">
                   <div className="w-32 h-32 md:w-40 md:h-40 glass rounded-2xl flex items-center justify-center border-2 border-dashed border-white/10 shrink-0">
                      {settings.logoUrl ? (
                        <img src={settings.logoUrl} className="max-w-full max-h-full p-3 object-contain" />
                      ) : (
                        <ImageIcon className="text-gray-700" size={32} />
                      )}
                   </div>
                   <div className="space-y-4 text-center sm:text-right flex-1">
                      <p className="text-sm text-gray-400 leading-relaxed">يمكنك رفع شعار مخصص للمنصة. ننصح باستخدام صور بخلفية شفافة (SVG or PNG) بحجم لا يتجاوز 1 ميجا.</p>
                      <input type="file" ref={logoInputRef} onChange={handleLogoUpload} className="hidden" accept="image/*" />
                      <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
                        <button 
                            onClick={() => logoInputRef.current?.click()}
                            className="px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl font-bold text-sm transition-all"
                        >
                            اختيار ملف جديد
                        </button>
                        {settings.logoUrl && (
                            <button 
                                onClick={() => setSettings({...settings, logoUrl: ''})}
                                className="px-6 py-3 text-red-400 hover:bg-red-500/10 rounded-xl font-bold text-sm transition-all"
                            >
                                حذف الشعار
                            </button>
                        )}
                      </div>
                   </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'maintenance' && (
            <div className="glass p-6 md:p-8 rounded-3xl border border-white/5 space-y-8 animate-in fade-in duration-500">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <h3 className="text-lg font-bold">حالة النظام ووضع الصيانة</h3>
                  <p className="text-gray-400 text-xs mt-1">يؤدي تفعيل هذا الوضع إلى حجب المحتوى عن المستخدمين.</p>
                </div>
                <button 
                  onClick={() => setSettings({ 
                    ...settings, 
                    maintenance: { ...settings.maintenance, isPaused: !settings.maintenance.isPaused } 
                  })}
                  className={`w-full sm:w-auto px-6 py-3 rounded-xl font-bold transition-all shadow-lg ${settings.maintenance.isPaused ? 'bg-red-500 text-white shadow-red-500/20' : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 shadow-emerald-500/10'}`}
                >
                  {settings.maintenance.isPaused ? 'إيقاف وضع الصيانة' : 'تفعيل وضع الصيانة'}
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-400">تاريخ وبدء الصيانة</label>
                  <input 
                    type="datetime-local" 
                    value={settings.maintenance.startTime}
                    onChange={(e) => setSettings({ ...settings, maintenance: { ...settings.maintenance, startTime: e.target.value }})}
                    className="w-full bg-white/5 border border-white/10 p-4 rounded-xl outline-none focus:border-emerald-500/50" 
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-400">تاريخ العودة المتوقع</label>
                  <input 
                    type="datetime-local" 
                    value={settings.maintenance.endTime}
                    onChange={(e) => setSettings({ ...settings, maintenance: { ...settings.maintenance, endTime: e.target.value }})}
                    className="w-full bg-white/5 border border-white/10 p-4 rounded-xl outline-none focus:border-emerald-500/50" 
                  />
                </div>
                <div className="md:col-span-2 space-y-2">
                  <label className="text-xs font-bold text-gray-400">رسالة توضيحية للزوار</label>
                  <textarea 
                    value={settings.maintenance.reason}
                    onChange={(e) => setSettings({ ...settings, maintenance: { ...settings.maintenance, reason: e.target.value }})}
                    className="w-full bg-white/5 border border-white/10 p-4 rounded-xl outline-none h-32 resize-none focus:border-emerald-500/50" 
                    placeholder="اكتب هنا سبب الصيانة..."
                  />
                </div>
              </div>
            </div>
          )}

          {activeTab === 'visual' && (
            <div className="glass p-6 md:p-8 rounded-3xl border border-white/5 space-y-6 animate-in fade-in duration-500">
               <h3 className="text-lg font-bold border-b border-white/5 pb-4">تخصيص الهوية البصرية</h3>
               <div className="space-y-8">
                  <div className="space-y-4">
                    <label className="text-sm font-bold text-gray-400">لون النظام الرئيسي</label>
                    <div className="flex flex-wrap gap-4">
                      {['#10b981', '#3b82f6', '#f59e0b', '#ef4444', '#8b5cf6', '#e11d48'].map(color => (
                        <button 
                          key={color}
                          onClick={() => setSettings({ ...settings, visual: { ...settings.visual, primaryColor: color }})}
                          className={`w-12 h-12 rounded-2xl border-2 transition-all duration-300 ${settings.visual.primaryColor === color ? 'border-white scale-110 shadow-[0_0_20px_rgba(255,255,255,0.2)]' : 'border-transparent opacity-40 hover:opacity-100'}`}
                          style={{ backgroundColor: color }}
                        />
                      ))}
                    </div>
                  </div>
                  
                  <div className="p-6 bg-white/5 rounded-2xl border border-white/5">
                    <h4 className="font-bold text-sm mb-2">معاينة الوضع الحالي</h4>
                    <p className="text-xs text-gray-500 mb-4">يؤثر هذا اللون على الأيقونات، الأزرار، والخطوط المميزة في الواجهة الرئيسية.</p>
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: settings.visual.primaryColor }} />
                        <span className="text-sm font-mono">{settings.visual.primaryColor}</span>
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
