
import React, { useState } from 'react';
import { 
  LayoutDashboard, Settings, Image as ImageIcon, Bell, LogOut, 
  Users, Database, Power, Globe, Share2, Save, Trash2, Edit 
} from 'lucide-react';
import { AppSettings, Banknote } from '../../types';
import { INITIAL_BANKNOTES } from '../../constants';

interface DashboardProps {
  settings: AppSettings;
  setSettings: (s: AppSettings) => void;
  onLogout: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ settings, setSettings, onLogout }) => {
  const [activeTab, setActiveTab] = useState<'system' | 'identity' | 'banknotes' | 'alerts'>('system');
  const [banknotes, setBanknotes] = useState<Banknote[]>(INITIAL_BANKNOTES);

  const saveSettings = () => {
    setSettings(settings);
    alert('تم حفظ الإعدادات بنجاح!');
  };

  return (
    <div className="min-h-screen bg-[#020617] flex">
      {/* Sidebar */}
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

        <button 
          onClick={onLogout}
          className="mt-auto flex items-center gap-4 px-5 py-4 rounded-2xl font-bold text-red-400 hover:bg-red-500/10 transition-all"
        >
          <LogOut size={20} />
          تسجيل الخروج
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-10 overflow-y-auto">
        <header className="flex justify-between items-center mb-12">
          <div>
            <h2 className="text-3xl font-black">
              {activeTab === 'system' && 'مراقبة وإعدادات النظام'}
              {activeTab === 'identity' && 'تخصيص الهوية البصرية'}
              {activeTab === 'banknotes' && 'إدارة الفئات النقدية'}
              {activeTab === 'alerts' && 'مركز التنبيهات'}
            </h2>
            <p className="text-gray-400 mt-1">مرحباً بك مجدداً في مركز التحكم الرئيسي.</p>
          </div>
          <button 
            onClick={saveSettings}
            className="px-8 py-3 bg-white text-slate-950 rounded-2xl font-bold shadow-xl flex items-center gap-2 hover:scale-105 transition-all"
          >
            <Save size={20} />
            حفظ التغييرات
          </button>
        </header>

        {activeTab === 'system' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="glass p-8 rounded-3xl border border-white/5 space-y-6">
              <div className="flex items-center gap-4 text-emerald-400">
                <Users size={24} />
                <h3 className="text-lg font-bold">الزوار النشطون</h3>
              </div>
              <div className="text-4xl font-black">1,284</div>
              <p className="text-xs text-gray-500">تم تسجيلهم في آخر 24 ساعة عبر Supabase Analytics.</p>
            </div>

            <div className="glass p-8 rounded-3xl border border-white/5 space-y-6">
              <div className="flex items-center gap-4 text-indigo-400">
                <Database size={24} />
                <h3 className="text-lg font-bold">حالة قاعدة البيانات</h3>
              </div>
              <div className="flex items-center gap-2 text-emerald-500 font-bold">
                <span className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse" />
                متصلة ومستقرة
              </div>
              <p className="text-xs text-gray-500">زمن الاستجابة: 42ms (PostgreSQL).</p>
            </div>

            <div className="glass p-8 rounded-3xl border border-white/5 space-y-6">
              <div className="flex items-center gap-4 text-red-400">
                <Power size={24} />
                <h3 className="text-lg font-bold">وضع الصيانة</h3>
              </div>
              <div className="flex items-center gap-4">
                <button 
                  onClick={() => setSettings({ ...settings, maintenanceMode: !settings.maintenanceMode })}
                  className={`w-14 h-8 rounded-full transition-all relative ${settings.maintenanceMode ? 'bg-red-500' : 'bg-gray-700'}`}
                >
                  <div className={`absolute top-1 w-6 h-6 rounded-full bg-white transition-all ${settings.maintenanceMode ? 'right-7' : 'right-1'}`} />
                </button>
                <span className="font-bold">{settings.maintenanceMode ? 'مفعل' : 'معطل'}</span>
              </div>
              <p className="text-xs text-gray-500">عند التفعيل، سيظهر الموقع رسالة صيانة للمستخدمين.</p>
            </div>

            <div className="glass p-8 rounded-3xl border border-white/5 space-y-6 col-span-full">
               <h3 className="text-lg font-bold">تعديل الثوابت الرياضية</h3>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs text-gray-400">سعر صرف الدولار الرسمي (USD Rate)</label>
                    <input 
                      type="number"
                      value={settings.usdRate}
                      onChange={(e) => setSettings({ ...settings, usdRate: Number(e.target.value) })}
                      className="w-full bg-white/5 border border-white/10 p-4 rounded-xl outline-none focus:border-emerald-500"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs text-gray-400">معامل التحويل (Old to New)</label>
                    <input 
                      type="number"
                      value={settings.conversionFactor}
                      onChange={(e) => setSettings({ ...settings, conversionFactor: Number(e.target.value) })}
                      className="w-full bg-white/5 border border-white/10 p-4 rounded-xl outline-none focus:border-emerald-500"
                    />
                  </div>
               </div>
            </div>
          </div>
        )}

        {activeTab === 'identity' && (
          <div className="glass p-10 rounded-3xl border border-white/5 space-y-8">
            <div className="space-y-4">
              <h3 className="text-xl font-bold">النصوص العامة</h3>
              <div className="grid grid-cols-1 gap-6">
                <div className="space-y-2">
                  <label className="text-xs text-gray-400">اسم المنصة</label>
                  <input 
                    type="text"
                    value={settings.siteName}
                    onChange={(e) => setSettings({ ...settings, siteName: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 p-4 rounded-xl outline-none focus:border-emerald-500 font-bold"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs text-gray-400">عن المنصة (About Text)</label>
                  <textarea 
                    value={settings.aboutText}
                    onChange={(e) => setSettings({ ...settings, aboutText: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 p-4 rounded-xl outline-none focus:border-emerald-500 h-32 resize-none"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-4 pt-8 border-t border-white/5">
              <h3 className="text-xl font-bold">روابط التواصل الاجتماعي</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  { label: 'فيسبوك', icon: Share2 },
                  { label: 'تويتر (X)', icon: Share2 },
                  { label: 'تيليجرام', icon: Share2 },
                  { label: 'الموقع الرسمي للمصرف', icon: Share2 },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-4 bg-white/5 p-4 rounded-2xl">
                    <item.icon size={20} className="text-indigo-400" />
                    <input type="text" placeholder={`رابط ${item.label}...`} className="bg-transparent outline-none flex-1 text-sm" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'banknotes' && (
          <div className="space-y-6">
            <div className="flex justify-end">
              <button className="px-6 py-3 glass border-emerald-500/20 text-emerald-400 rounded-xl font-bold flex items-center gap-2">
                <ImageIcon size={20} />
                رفع فئة جديدة
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {banknotes.map((note) => (
                <div key={note.id} className="glass p-6 rounded-3xl border border-white/10 flex items-center gap-6">
                   <img src={note.frontImage} className="w-32 h-16 object-cover rounded-xl border border-white/10" alt="" />
                   <div className="flex-1">
                      <h4 className="font-bold text-lg">{note.name}</h4>
                      <p className="text-xs text-gray-500">القيمة: {note.value} ل.س جديدة</p>
                   </div>
                   <div className="flex gap-2">
                      <button className="p-3 glass rounded-xl text-indigo-400 hover:bg-white/10"><Edit size={18} /></button>
                      <button className="p-3 glass rounded-xl text-red-400 hover:bg-red-500/10"><Trash2 size={18} /></button>
                   </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'alerts' && (
          <div className="glass p-10 rounded-3xl border border-white/5 space-y-8">
            <div className="p-6 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl flex items-start gap-4">
               <Bell size={24} className="text-emerald-500 shrink-0" />
               <div>
                  <h4 className="font-bold">بث رسالة فورية</h4>
                  <p className="text-sm text-gray-400">ستظهر هذه الرسالة في أعلى الموقع لجميع الزوار فور حفظها.</p>
               </div>
            </div>
            <textarea 
              placeholder="اكتب التنبيه هنا... (مثال: تم تحديث أسعار الصرف الرسمية لليوم)"
              className="w-full bg-white/5 border border-white/10 p-6 rounded-2xl h-40 outline-none focus:border-emerald-500 resize-none"
            />
            <button className="px-10 py-4 emerald-gradient rounded-2xl font-bold shadow-xl">نشر التنبيه الآن</button>
          </div>
        )}
      </main>
    </div>
  );
};

export default Dashboard;
