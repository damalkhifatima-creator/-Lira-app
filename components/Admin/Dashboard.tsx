
import React, { useState, useRef, useMemo } from 'react';
import { 
  LayoutDashboard, Settings, Image as ImageIcon, LogOut, 
  Save, Clock, Upload, X, Menu, Laptop, Tablet, Smartphone,
  Circle, Square, RectangleHorizontal, Grid, Edit3, Users, Search,
  User as UserIcon, Shield, Headset, Megaphone, ToggleLeft, ToggleRight,
  Coins, Trash2, Plus, Info, ImagePlus, CheckCircle2, AlertCircle
} from 'lucide-react';
import { AppSettings, Banknote, User, FloatingImage } from '../../types';
import { supabase } from '../../supabase';

interface DashboardProps {
  settings: AppSettings;
  setSettings: (s: AppSettings) => void;
  banknotes: Banknote[];
  setBanknotes: (b: Banknote[]) => void;
  users: User[];
  onLogout: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ settings, setSettings, banknotes, setBanknotes, users, onLogout }) => {
  const [activeTab, setActiveTab] = useState<'system' | 'banknotes' | 'users' | 'services' | 'maintenance'>('system');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [editingNoteId, setEditingNoteId] = useState<number | null>(null);
  const [userSearch, setUserSearch] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'success' | 'error'>('idle');
  
  const logoInputRef = useRef<HTMLInputElement>(null);
  const globalBgInputRef = useRef<HTMLInputElement>(null);
  const floatingInputRef = useRef<HTMLInputElement>(null);

  const filteredUsers = useMemo(() => {
    return users.filter(u => 
      u.name.toLowerCase().includes(userSearch.toLowerCase()) || 
      u.accountNumber.includes(userSearch)
    );
  }, [users, userSearch]);

  const uploadToSupabase = async (file: File, path: string): Promise<string | null> => {
    try {
      const fileName = `${Date.now()}_${file.name.replace(/\s+/g, '_')}`;
      const { data, error } = await supabase.storage
        .from('assets')
        .upload(`${path}/${fileName}`, file, { cacheControl: '3600', upsert: false });

      if (error) throw error;
      const { data: { publicUrl } } = supabase.storage.from('assets').getPublicUrl(data.path);
      return publicUrl;
    } catch (err: any) {
      alert(`خطأ في رفع الملف: ${err.message || JSON.stringify(err)}`);
      return null;
    }
  };

  const handleInstantImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, path: string, callback: (url: string) => void) => {
    const file = e.target.files?.[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      callback(previewUrl);
      const uploadedUrl = await uploadToSupabase(file, path);
      if (uploadedUrl) callback(uploadedUrl);
    }
  };

  const handleGlobalSave = async () => {
    setIsSaving(true);
    setSaveStatus('idle');
    try {
      // 1. مزامنة إعدادات التطبيق الأساسية
      const { error: settingsError } = await supabase
        .from('app_settings')
        .upsert({
          id: 1,
          site_name: settings.siteName,
          logo_url: settings.logoUrl,
          logo_shape: settings.logoShape,
          logo_size: settings.logoSize,
          about_text: settings.aboutText,
          maintenance_is_paused: settings.maintenance.isPaused,
          maintenance_start_time: settings.maintenance.startTime,
          maintenance_end_time: settings.maintenance.endTime,
          maintenance_reason: settings.maintenance.reason,
          visual_primary_color: settings.visual.primaryColor,
          visual_theme_mode: settings.visual.themeMode,
          visual_global_background_image: settings.visual.globalBackgroundImage,
          services_support_link: settings.services.supportLink,
          services_news_ticker: settings.services.newsTicker,
          services_show_converter: settings.services.showConverter,
          services_show_gallery: settings.services.showGallery,
          services_show_news: settings.services.showNews,
          conversion_factor: settings.conversionFactor
        });

      if (settingsError) throw settingsError;

      // 2. مزامنة فئات العملة (Batch Upsert)
      const banknotesToSave = banknotes.map(n => ({
        id: n.id,
        value: n.value,
        name: n.name,
        front_image: n.frontImage,
        back_image: n.backImage,
        security_features: n.securityFeatures,
        purchasing_power: n.purchasingPower
      }));

      const { error: notesError } = await supabase
        .from('banknotes')
        .upsert(banknotesToSave);

      if (notesError) throw notesError;

      setSaveStatus('success');
      setTimeout(() => setSaveStatus('idle'), 3000);
    } catch (err: any) {
      console.error('Save Operation Failure:', err);
      setSaveStatus('error');
      const errorMessage = err?.message || err?.details || JSON.stringify(err);
      alert(`فشل المزامنة السحابية:\n${errorMessage}`);
    } finally {
      setIsSaving(false);
    }
  };

  const addFloatingImage = async (url: string) => {
    try {
      const { error } = await supabase.from('floating_images').insert({
        url: url,
        top_pos: Math.random() * 80 + 10,
        left_pos: Math.random() * 80 + 10,
        size_px: Math.random() * 60 + 40,
        duration: Math.random() * 10 + 5
      });
      if (error) throw error;
    } catch (err: any) { alert(`خطأ: ${err.message}`); }
  };

  const removeFloatingImage = async (id: string) => {
    try {
      const { error } = await supabase.from('floating_images').delete().eq('id', id);
      if (error) throw error;
    } catch (err: any) { alert(`خطأ: ${err.message}`); }
  };

  const toggleService = (key: keyof typeof settings.services) => {
    setSettings({
      ...settings,
      services: { ...settings.services, [key]: !settings.services[key] }
    });
  };

  return (
    <div className="min-h-screen bg-[#020617] flex flex-col md:flex-row font-cairo text-white overflow-hidden relative">
      <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-emerald-500/5 blur-[150px] rounded-full z-0 pointer-events-none" />
      
      <aside className={`
        fixed inset-y-0 right-0 w-72 md:w-64 border-l border-white/5 p-6 flex flex-col glass z-[90] transition-transform duration-300
        ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full md:translate-x-0 md:static'}
      `}>
        <div className="flex items-center gap-3 mb-12">
          <div className="w-10 h-10 emerald-gradient rounded-xl flex items-center justify-center shadow-lg">
            <LayoutDashboard className="text-white w-6 h-6" />
          </div>
          <h1 className="text-xl font-black tracking-tight">إدارة النظام</h1>
        </div>

        <nav className="flex-1 space-y-2">
          {[
            { id: 'system', label: 'الإعدادات العامة', icon: Settings },
            { id: 'banknotes', label: 'تحديث العملات', icon: ImagePlus },
            { id: 'users', label: 'المواطنين', icon: Users },
            { id: 'services', label: 'الخدمات', icon: Megaphone },
            { id: 'maintenance', label: 'الصيانة', icon: Clock },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => { setActiveTab(item.id as any); setIsMobileMenuOpen(false); }}
              className={`w-full flex items-center gap-4 px-5 py-4 rounded-2xl font-bold transition-all ${
                activeTab === item.id ? 'bg-emerald-500 text-white shadow-xl shadow-emerald-500/20' : 'text-gray-400 hover:bg-white/5'
              }`}
            >
              <item.icon size={20} />
              <span className="text-sm">{item.label}</span>
            </button>
          ))}
        </nav>

        <button onClick={onLogout} className="mt-8 flex items-center gap-4 px-5 py-4 rounded-2xl font-bold text-red-400 hover:bg-red-500/10 transition-all">
          <LogOut size={20} /> <span className="text-sm">خروج آمن</span>
        </button>
      </aside>

      <main className="flex-1 p-6 md:p-10 lg:p-14 overflow-y-auto h-screen relative z-10">
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
          <div className="space-y-1">
            <h2 className="text-3xl font-black">لوحة التحكم السحابية 2026</h2>
            <p className="text-gray-500 text-sm">أهلاً بك في نظام الإدارة المركزي الفائق.</p>
          </div>
          <button 
            onClick={handleGlobalSave}
            disabled={isSaving}
            className={`
              w-full md:w-auto px-10 py-4 rounded-2xl font-black flex items-center justify-center gap-3 transition-all active:scale-95 shadow-2xl
              ${saveStatus === 'success' ? 'bg-emerald-600' : saveStatus === 'error' ? 'bg-red-600' : 'bg-emerald-500 hover:bg-emerald-400'}
            `}
          >
            {isSaving ? <Clock className="animate-spin" size={18} /> : saveStatus === 'success' ? <CheckCircle2 size={18} /> : saveStatus === 'error' ? <AlertCircle size={18} /> : <Save size={18} />}
            {isSaving ? 'جاري المزامنة...' : saveStatus === 'success' ? 'تم الحفظ بنجاح' : saveStatus === 'error' ? 'فشل الحفظ' : 'حفظ التغييرات'}
          </button>
        </header>

        <div className="max-w-6xl mx-auto space-y-8 pb-32">
          {activeTab === 'system' && (
            <div className="space-y-8 animate-in fade-in duration-500">
              <div className="glass p-8 md:p-12 rounded-[2.5rem] border border-white/5 shadow-2xl space-y-10">
                <h3 className="text-xl font-black flex items-center gap-3 border-b border-white/5 pb-6">
                  <Settings className="text-emerald-400" size={24} /> الأساسيات
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <label className="text-xs font-bold text-gray-400 px-1 uppercase tracking-widest">اسم المنصة الرسمي</label>
                    <input 
                      type="text" value={settings.siteName} 
                      onChange={(e) => setSettings({ ...settings, siteName: e.target.value })}
                      className="w-full bg-white/5 border border-white/10 p-5 rounded-2xl outline-none focus:border-emerald-500/50 transition-all font-bold text-lg" 
                    />
                  </div>
                  <div className="space-y-3">
                    <label className="text-xs font-bold text-gray-400 px-1 uppercase tracking-widest">معامل التحويل</label>
                    <div className="relative">
                      <input 
                        type="number" value={settings.conversionFactor} 
                        onChange={(e) => setSettings({ ...settings, conversionFactor: Number(e.target.value) })}
                        className="w-full bg-white/5 border border-white/10 p-5 rounded-2xl outline-none focus:border-emerald-500/50 transition-all font-mono font-black text-2xl text-emerald-400" 
                      />
                      <div className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-500 text-xs font-bold">1:N</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="glass p-8 md:p-12 rounded-[2.5rem] border border-white/5 shadow-2xl space-y-10">
                <h3 className="text-xl font-black flex items-center gap-3 border-b border-white/5 pb-6">
                  <ImageIcon className="text-emerald-400" size={24} /> الهوية والرموز
                </h3>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                  <div className="space-y-6">
                    <label className="text-sm font-black text-gray-300">خلفية المنصة الرئيسية</label>
                    <div 
                      onClick={() => globalBgInputRef.current?.click()}
                      className="aspect-video glass rounded-[2rem] border-2 border-dashed border-white/10 overflow-hidden relative cursor-pointer group hover:border-emerald-500/40 transition-all"
                    >
                      {settings.visual.globalBackgroundImage ? (
                        <img src={settings.visual.globalBackgroundImage} className="w-full h-full object-cover transition-transform group-hover:scale-105 duration-700" />
                      ) : (
                        <div className="w-full h-full flex flex-col items-center justify-center text-gray-500 gap-3">
                          <Upload size={32} className="opacity-20" />
                          <span className="text-sm font-bold opacity-30">انقر للرفع</span>
                        </div>
                      )}
                      <input type="file" ref={globalBgInputRef} className="hidden" accept="image/*" onChange={(e) => handleInstantImageUpload(e, 'backgrounds', (url) => setSettings({...settings, visual: {...settings.visual, globalBackgroundImage: url}}))} />
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div className="flex justify-between items-center">
                      <label className="text-sm font-black text-gray-300">الرموز العائمة</label>
                      <button 
                        onClick={() => floatingInputRef.current?.click()}
                        className="p-2 bg-emerald-500/10 text-emerald-400 rounded-xl hover:bg-emerald-500 transition-colors hover:text-white"
                      >
                        <Plus size={18} />
                      </button>
                      <input type="file" ref={floatingInputRef} className="hidden" accept="image/*" onChange={(e) => handleInstantImageUpload(e, 'floating', (url) => addFloatingImage(url))} />
                    </div>
                    <div className="grid grid-cols-3 sm:grid-cols-4 gap-4 max-h-[250px] overflow-y-auto pr-2 custom-scroll">
                      {settings.visual.floatingImages.map((img) => (
                        <div key={img.id} className="aspect-square glass rounded-2xl p-2 relative group border border-white/5 hover:border-emerald-500/30 transition-all">
                          <img src={img.url} className="w-full h-full object-contain" />
                          <button onClick={() => removeFloatingImage(img.id)} className="absolute -top-2 -right-2 p-1.5 bg-red-500 rounded-lg text-white opacity-0 group-hover:opacity-100 transition-opacity">
                            <X size={12} />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'banknotes' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-in fade-in duration-500">
              {banknotes.map((note) => (
                <div key={note.id} className="glass p-8 rounded-[2.5rem] border border-white/5 space-y-6 group hover:border-emerald-500/30 transition-all">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-5">
                      <div className="w-14 h-14 emerald-gradient rounded-2xl flex items-center justify-center font-black text-2xl text-white shadow-xl">{note.value}</div>
                      <div>
                        <h4 className="font-black text-lg">{note.name}</h4>
                        <span className="text-[10px] text-emerald-400 font-bold uppercase tracking-widest">Active Asset</span>
                      </div>
                    </div>
                    <button 
                      onClick={() => setEditingNoteId(editingNoteId === note.id ? null : note.id)}
                      className={`p-3 rounded-xl transition-all ${editingNoteId === note.id ? 'bg-emerald-500 text-white' : 'bg-white/5 hover:bg-white/10'}`}
                    >
                      <Edit3 size={20} />
                    </button>
                  </div>

                  {editingNoteId === note.id && (
                    <div className="space-y-6 pt-4 animate-in slide-in-from-top-4 duration-300">
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-gray-500">ميزات الأمان (قائمة نصوص)</label>
                        <textarea 
                          value={note.securityFeatures.join(', ')} 
                          onChange={(e) => setBanknotes(banknotes.map(n => n.id === note.id ? {...n, securityFeatures: e.target.value.split(',').map(s => s.trim())} : n))}
                          className="w-full bg-white/5 border border-white/10 p-5 rounded-2xl text-sm outline-none h-24 focus:border-emerald-500/50"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label className="text-[10px] font-black uppercase text-gray-500">الوجه الأمامي</label>
                          <div className="aspect-[2/1] glass rounded-2xl overflow-hidden cursor-pointer relative group/img">
                            <img src={note.frontImage} className="w-full h-full object-cover" />
                            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover/img:opacity-100 flex items-center justify-center transition-opacity">
                              <Upload size={24} />
                            </div>
                            <input type="file" className="hidden" accept="image/*" onChange={(e) => handleInstantImageUpload(e, `banknotes/${note.id}/front`, (url) => setBanknotes(banknotes.map(n => n.id === note.id ? {...n, frontImage: url} : n)))} />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <label className="text-[10px] font-black uppercase text-gray-500">الوجه الخلفي</label>
                          <div className="aspect-[2/1] glass rounded-2xl overflow-hidden cursor-pointer relative group/img">
                            <img src={note.backImage} className="w-full h-full object-cover" />
                            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover/img:opacity-100 flex items-center justify-center transition-opacity">
                              <Upload size={24} />
                            </div>
                            <input type="file" className="hidden" accept="image/*" onChange={(e) => handleInstantImageUpload(e, `banknotes/${note.id}/back`, (url) => setBanknotes(banknotes.map(n => n.id === note.id ? {...n, backImage: url} : n)))} />
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {activeTab === 'users' && (
            <div className="glass p-8 md:p-12 rounded-[2.5rem] border border-white/5 space-y-10 animate-in fade-in duration-500">
              <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8 border-b border-white/5 pb-8">
                <div className="space-y-1">
                  <h3 className="text-xl font-black">قاعدة بيانات المواطنين</h3>
                  <p className="text-sm text-gray-500">مراقبة الحسابات المالية المفعلة لعام 2026.</p>
                </div>
                <div className="relative w-full lg:w-96">
                  <Search className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                  <input 
                    type="text" placeholder="بحث بالاسم أو رقم الحساب..." 
                    value={userSearch} onChange={(e) => setUserSearch(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 p-4 pr-12 rounded-2xl outline-none focus:border-emerald-500/50 font-bold"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredUsers.length > 0 ? filteredUsers.map((u, idx) => (
                  <div key={idx} className="glass p-6 rounded-3xl border border-white/5 flex items-center gap-5 hover:bg-white/5 transition-all">
                    <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-emerald-500/20 shadow-xl">
                      {u.photoUrl ? <img src={u.photoUrl} className="w-full h-full object-cover" /> : <UserIcon className="m-4 text-emerald-400" />}
                    </div>
                    <div className="flex-1 overflow-hidden">
                      <h5 className="font-black text-lg truncate">{u.name}</h5>
                      <span className="text-xs font-mono font-bold text-emerald-400">#{u.accountNumber}</span>
                    </div>
                  </div>
                )) : (
                  <div className="col-span-full py-12 text-center text-gray-500 font-bold italic">لا يوجد مستخدمين مسجلين حالياً.</div>
                )}
              </div>
            </div>
          )}

          {activeTab === 'services' && (
            <div className="glass p-8 md:p-12 rounded-[2.5rem] border border-white/5 space-y-10 animate-in fade-in duration-500 shadow-2xl">
              <h3 className="text-xl font-black border-b border-white/5 pb-8 flex items-center gap-3">
                 <Megaphone className="text-emerald-400" size={22} /> إدارة الخدمات والاتصال
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                 <div className="space-y-4">
                    <label className="text-xs font-black text-gray-400 px-1 uppercase tracking-widest">رابط الدعم الفني</label>
                    <input 
                      type="text" value={settings.services.supportLink}
                      onChange={(e) => setSettings({...settings, services: {...settings.services, supportLink: e.target.value}})}
                      className="w-full bg-white/5 border border-white/10 p-5 rounded-2xl outline-none focus:border-emerald-500/50 font-bold"
                    />
                 </div>
                 <div className="space-y-4">
                    <label className="text-xs font-black text-gray-400 px-1 uppercase tracking-widest">شريط الأخبار العاجل</label>
                    <input 
                      type="text" value={settings.services.newsTicker}
                      onChange={(e) => setSettings({...settings, services: {...settings.services, newsTicker: e.target.value}})}
                      className="w-full bg-white/5 border border-white/10 p-5 rounded-2xl outline-none focus:border-emerald-500/50 font-bold"
                    />
                 </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
                 {[
                    { id: 'showConverter', label: 'المحول', icon: Coins },
                    { id: 'showGallery', label: 'الفئات', icon: Grid },
                    { id: 'showNews', label: 'الأخبار', icon: Megaphone },
                 ].map((service) => (
                    <button 
                       key={service.id}
                       onClick={() => toggleService(service.id as any)}
                       className={`p-8 rounded-[2rem] border-2 flex flex-col items-center gap-6 transition-all ${settings.services[service.id as keyof typeof settings.services] ? 'bg-emerald-500 border-emerald-500 text-white' : 'bg-white/5 border-white/10 text-gray-500 opacity-60'}`}
                    >
                       <service.icon size={32} />
                       <span className="font-black">{service.label}</span>
                       {settings.services[service.id as keyof typeof settings.services] ? <ToggleRight size={32} /> : <ToggleLeft size={32} />}
                    </button>
                 ))}
              </div>
            </div>
          )}

          {activeTab === 'maintenance' && (
            <div className="glass p-8 md:p-12 rounded-[2.5rem] border border-white/5 space-y-10 animate-in fade-in duration-500 shadow-2xl">
              <div className="flex justify-between items-center border-b border-white/5 pb-8">
                <h3 className="text-xl font-black flex items-center gap-3">
                   <Clock className="text-amber-500" size={22} /> وضع الصيانة
                </h3>
                <button 
                  onClick={() => setSettings({...settings, maintenance: {...settings.maintenance, isPaused: !settings.maintenance.isPaused}})}
                  className={`px-8 py-3 rounded-2xl font-black ${settings.maintenance.isPaused ? 'bg-red-500' : 'bg-amber-500'}`}
                >
                  {settings.maintenance.isPaused ? 'إيقاف الصيانة' : 'تفعيل الصيانة'}
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                 <input type="datetime-local" value={settings.maintenance.startTime} onChange={(e) => setSettings({...settings, maintenance: {...settings.maintenance, startTime: e.target.value}})} className="bg-white/5 border border-white/10 p-5 rounded-2xl outline-none" />
                 <input type="datetime-local" value={settings.maintenance.endTime} onChange={(e) => setSettings({...settings, maintenance: {...settings.maintenance, endTime: e.target.value}})} className="bg-white/5 border border-white/10 p-5 rounded-2xl outline-none" />
                 <textarea value={settings.maintenance.reason} onChange={(e) => setSettings({...settings, maintenance: {...settings.maintenance, reason: e.target.value}})} className="md:col-span-2 bg-white/5 border border-white/10 p-5 rounded-2xl outline-none h-32" />
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
