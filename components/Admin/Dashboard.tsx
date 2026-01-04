
import React, { useState, useRef, useMemo } from 'react';
import { 
  LayoutDashboard, Settings, Image as ImageIcon, LogOut, 
  Save, Clock, Upload, X, Menu, Laptop, Tablet, Smartphone,
  Circle, Square, RectangleHorizontal, Grid, Edit3, Users, Search,
  User as UserIcon, Shield, Headset, Megaphone, ToggleLeft, ToggleRight,
  Coins
} from 'lucide-react';
import { AppSettings, Banknote, User } from '../../types';

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
  
  const logoInputRef = useRef<HTMLInputElement>(null);
  const frontInputRef = useRef<HTMLInputElement>(null);
  const backInputRef = useRef<HTMLInputElement>(null);

  const filteredUsers = useMemo(() => {
    return users.filter(u => 
      u.name.toLowerCase().includes(userSearch.toLowerCase()) || 
      u.accountNumber.includes(userSearch)
    );
  }, [users, userSearch]);

  const handleInstantImageUpload = (e: React.ChangeEvent<HTMLInputElement>, callback: (data: string) => void) => {
    const file = e.target.files?.[0];
    if (file) {
      // Immediate UI update using ObjectURL
      const previewUrl = URL.createObjectURL(file);
      callback(previewUrl);

      // Async persistent storage conversion
      const reader = new FileReader();
      reader.onloadend = () => {
        callback(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const navItems = [
    { id: 'system', label: 'إعدادات النظام', icon: Settings },
    { id: 'banknotes', label: 'قوالب الفئات', icon: Grid },
    { id: 'users', label: 'إدارة المستخدمين', icon: Users },
    { id: 'services', label: 'الخدمات الذكية', icon: Megaphone },
    { id: 'maintenance', label: 'وضع الصيانة', icon: Clock },
  ];

  const getLogoShapePreview = () => {
    switch (settings.logoShape) {
      case 'circle': return 'rounded-full';
      case 'square': return 'rounded-2xl';
      case 'rectangle': return 'rounded-xl';
      default: return 'rounded-2xl';
    }
  };

  const toggleService = (key: keyof typeof settings.services) => {
    if (typeof settings.services[key] === 'boolean') {
      setSettings({
        ...settings,
        services: {
          ...settings.services,
          [key]: !settings.services[key]
        }
      });
    }
  };

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

      {/* Sidebar */}
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

        <div className="max-w-5xl mx-auto grid grid-cols-1 gap-6 pb-24">
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
                   إدارة وتخصيص الشعار
                </h3>
                
                <div className="flex flex-col lg:flex-row gap-8">
                   <div className={`w-32 h-32 md:w-40 md:h-40 glass flex items-center justify-center border-2 border-dashed border-white/10 shrink-0 transition-all overflow-hidden ${getLogoShapePreview()}`}>
                      {settings.logoUrl ? (
                        <img src={settings.logoUrl} className="max-w-full max-h-full p-3 object-contain" style={{ width: settings.logoSize * 2, height: settings.logoShape === 'rectangle' ? 'auto' : settings.logoSize * 2 }} />
                      ) : (
                        <ImageIcon className="text-gray-700" size={32} />
                      )}
                   </div>
                   
                   <div className="flex-1 space-y-6">
                      <div className="space-y-4">
                        <label className="text-xs font-bold text-gray-400">شكل الشعار</label>
                        <div className="flex flex-wrap gap-3">
                            {[
                                { id: 'circle', label: 'دائري', icon: Circle },
                                { id: 'square', label: 'مربع', icon: Square },
                                { id: 'rectangle', label: 'مستطيل', icon: RectangleHorizontal }
                            ].map((shape) => (
                                <button
                                    key={shape.id}
                                    onClick={() => setSettings({ ...settings, logoShape: shape.id as any })}
                                    className={`flex items-center gap-2 px-4 py-2 rounded-xl border transition-all ${settings.logoShape === shape.id ? 'bg-emerald-500/10 border-emerald-500 text-emerald-400' : 'bg-white/5 border-white/10 text-gray-400'}`}
                                >
                                    <shape.icon size={16} />
                                    <span className="text-xs font-bold">{shape.label}</span>
                                </button>
                            ))}
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div className="flex justify-between items-center">
                            <label className="text-xs font-bold text-gray-400">حجم الشعار في الهيدر</label>
                            <span className="text-xs font-mono text-emerald-400">{settings.logoSize}px</span>
                        </div>
                        <input 
                            type="range" 
                            min="24" 
                            max="80" 
                            value={settings.logoSize}
                            onChange={(e) => setSettings({ ...settings, logoSize: Number(e.target.value) })}
                            className="w-full h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                        />
                      </div>

                      <div className="flex flex-wrap gap-2 pt-2">
                        <input type="file" ref={logoInputRef} onChange={(e) => handleInstantImageUpload(e, (url) => setSettings({ ...settings, logoUrl: url }))} className="hidden" accept="image/*" />
                        <button 
                            onClick={() => logoInputRef.current?.click()}
                            className="px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl font-bold text-sm transition-all"
                        >
                            رفع صورة جديدة
                        </button>
                        {settings.logoUrl && (
                            <button 
                                onClick={() => setSettings({...settings, logoUrl: ''})}
                                className="px-6 py-3 text-red-400 hover:bg-red-500/10 rounded-xl font-bold text-sm transition-all"
                            >
                                حذف الصورة
                            </button>
                        )}
                      </div>
                   </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'banknotes' && (
            <div className="space-y-6 animate-in fade-in duration-500">
               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                 {banknotes.map((note) => (
                   <div key={note.id} className="glass p-6 rounded-3xl border border-white/5 flex flex-col gap-4">
                      <div className="flex items-center justify-between">
                         <div className="flex items-center gap-3">
                            <div className="w-10 h-10 emerald-gradient rounded-xl flex items-center justify-center font-bold">{note.value}</div>
                            <h4 className="font-bold">{note.name}</h4>
                         </div>
                         <button 
                            onClick={() => setEditingNoteId(editingNoteId === note.id ? null : note.id)}
                            className={`p-2 rounded-lg transition-colors ${editingNoteId === note.id ? 'bg-emerald-500 text-white' : 'bg-white/5 hover:bg-white/10'}`}
                         >
                            <Edit3 size={18} />
                         </button>
                      </div>

                      {editingNoteId === note.id ? (
                        <div className="space-y-4 mt-2 animate-in slide-in-from-top-2">
                           <div className="grid grid-cols-2 gap-4">
                              <div className="space-y-2">
                                 <label className="text-[10px] text-gray-500 font-bold">الاسم</label>
                                 <input 
                                    type="text" 
                                    value={note.name} 
                                    onChange={(e) => setBanknotes(banknotes.map(n => n.id === note.id ? {...n, name: e.target.value} : n))}
                                    className="w-full bg-white/5 border border-white/10 p-3 rounded-xl text-sm outline-none" 
                                 />
                              </div>
                              <div className="space-y-2">
                                 <label className="text-[10px] text-gray-500 font-bold">القيمة</label>
                                 <input 
                                    type="number" 
                                    value={note.value} 
                                    onChange={(e) => setBanknotes(banknotes.map(n => n.id === note.id ? {...n, value: Number(e.target.value)} : n))}
                                    className="w-full bg-white/5 border border-white/10 p-3 rounded-xl text-sm outline-none" 
                                 />
                              </div>
                           </div>
                           
                           <div className="space-y-2">
                              <label className="text-[10px] text-gray-500 font-bold">ميزات الأمان (مفصولة بفاصلة)</label>
                              <textarea 
                                value={note.securityFeatures.join(', ')} 
                                onChange={(e) => setBanknotes(banknotes.map(n => n.id === note.id ? {...n, securityFeatures: e.target.value.split(',').map(s => s.trim())} : n))}
                                className="w-full bg-white/5 border border-white/10 p-3 rounded-xl text-sm outline-none h-20 resize-none" 
                              />
                           </div>

                           <div className="grid grid-cols-2 gap-4">
                              <div className="space-y-2">
                                 <label className="text-[10px] text-gray-500 font-bold">الوجه الأمامي</label>
                                 <div className="aspect-[2/1] glass rounded-xl overflow-hidden relative cursor-pointer group" onClick={() => frontInputRef.current?.click()}>
                                    <img src={note.frontImage} className="w-full h-full object-cover opacity-50 group-hover:opacity-80 transition-opacity" />
                                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                       <Upload size={20} />
                                    </div>
                                    <input 
                                        type="file" 
                                        className="hidden" 
                                        onChange={(e) => handleInstantImageUpload(e, (url) => setBanknotes(banknotes.map(n => n.id === note.id ? {...n, frontImage: url} : n)))} 
                                        accept="image/*"
                                    />
                                 </div>
                              </div>
                              <div className="space-y-2">
                                 <label className="text-[10px] text-gray-500 font-bold">الوجه الخلفي</label>
                                 <div className="aspect-[2/1] glass rounded-xl overflow-hidden relative cursor-pointer group" onClick={() => backInputRef.current?.click()}>
                                    <img src={note.backImage} className="w-full h-full object-cover opacity-50 group-hover:opacity-80 transition-opacity" />
                                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                       <Upload size={20} />
                                    </div>
                                    <input 
                                        type="file" 
                                        className="hidden" 
                                        onChange={(e) => handleInstantImageUpload(e, (url) => setBanknotes(banknotes.map(n => n.id === note.id ? {...n, backImage: url} : n)))} 
                                        accept="image/*"
                                    />
                                 </div>
                              </div>
                           </div>
                        </div>
                      ) : (
                        <div className="flex gap-2 opacity-50">
                           <img src={note.frontImage} className="w-16 h-8 rounded-lg object-cover border border-white/10" />
                           <img src={note.backImage} className="w-16 h-8 rounded-lg object-cover border border-white/10" />
                        </div>
                      )}
                   </div>
                 ))}
               </div>
            </div>
          )}

          {activeTab === 'users' && (
            <div className="space-y-6 animate-in fade-in duration-500">
               <div className="glass p-6 md:p-8 rounded-3xl border border-white/5 space-y-6">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                     <h3 className="text-lg font-bold">إدارة المواطنين المسجلين</h3>
                     <div className="relative w-full sm:w-72">
                        <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
                        <input 
                            type="text" 
                            placeholder="بحث بالاسم أو رقم الحساب..."
                            value={userSearch}
                            onChange={(e) => setUserSearch(e.target.value)}
                            className="w-full bg-white/5 border border-white/10 p-3 pr-10 rounded-xl outline-none focus:border-emerald-500/50 text-sm"
                        />
                     </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                     {filteredUsers.length > 0 ? filteredUsers.map((user, idx) => (
                        <div key={idx} className="glass p-5 rounded-2xl border border-white/5 flex items-center gap-4 hover:border-emerald-500/30 transition-all group">
                           <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-emerald-500/20 group-hover:border-emerald-500/50 transition-colors">
                              {user.photoUrl ? (
                                <img src={user.photoUrl} className="w-full h-full object-cover" />
                              ) : (
                                <UserIcon className="m-3 text-emerald-400" />
                              )}
                           </div>
                           <div className="flex-1 overflow-hidden">
                              <h5 className="font-bold text-sm truncate">{user.name}</h5>
                              <div className="flex items-center gap-2 mt-1">
                                 <span className="text-[10px] bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded font-mono">#{user.accountNumber}</span>
                                 <span className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Active</span>
                              </div>
                           </div>
                        </div>
                     )) : (
                        <div className="col-span-full py-20 text-center space-y-4">
                           <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mx-auto">
                              <Users className="text-gray-700" size={40} />
                           </div>
                           <p className="text-gray-500 font-bold">لا يوجد مواطنين يطابقون البحث</p>
                        </div>
                     )}
                  </div>
               </div>
            </div>
          )}

          {activeTab === 'services' && (
            <div className="space-y-6 animate-in fade-in duration-500">
               <div className="glass p-6 md:p-8 rounded-3xl border border-white/5 space-y-8">
                  <h3 className="text-lg font-bold border-b border-white/5 pb-4">إدارة الخدمات والميزات</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                     <div className="space-y-4">
                        <label className="text-xs font-bold text-gray-400">رابط الدعم الفني (WhatsApp)</label>
                        <div className="relative">
                           <Headset className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                           <input 
                              type="text"
                              value={settings.services.supportLink}
                              onChange={(e) => setSettings({...settings, services: {...settings.services, supportLink: e.target.value}})}
                              className="w-full bg-white/5 border border-white/10 p-4 pr-12 rounded-xl outline-none"
                              placeholder="https://wa.me/..."
                           />
                        </div>
                     </div>
                     <div className="space-y-4">
                        <label className="text-xs font-bold text-gray-400">نص شريط التنبيهات</label>
                        <div className="relative">
                           <Megaphone className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                           <input 
                              type="text"
                              value={settings.services.newsTicker}
                              onChange={(e) => setSettings({...settings, services: {...settings.services, newsTicker: e.target.value}})}
                              className="w-full bg-white/5 border border-white/10 p-4 pr-12 rounded-xl outline-none"
                              placeholder="اكتب التنبيه هنا..."
                           />
                        </div>
                     </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-4">
                     {[
                        { id: 'showConverter', label: 'تفعيل المحول السريع', icon: Coins },
                        { id: 'showGallery', label: 'تفعيل دليل الفئات', icon: Grid },
                        { id: 'showNews', label: 'تفعيل شريط الأخبار', icon: Megaphone },
                     ].map((service) => (
                        <button 
                           key={service.id}
                           onClick={() => toggleService(service.id as any)}
                           className={`p-6 rounded-3xl border flex flex-col items-center gap-4 transition-all ${settings.services[service.id as keyof typeof settings.services] ? 'bg-emerald-500/10 border-emerald-500/30' : 'bg-white/5 border-white/10 opacity-60'}`}
                        >
                           <service.icon size={24} className={settings.services[service.id as keyof typeof settings.services] ? 'text-emerald-400' : 'text-gray-500'} />
                           <span className="text-sm font-bold">{service.label}</span>
                           {settings.services[service.id as keyof typeof settings.services] ? <ToggleRight className="text-emerald-400" /> : <ToggleLeft className="text-gray-700" />}
                        </button>
                     ))}
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
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
