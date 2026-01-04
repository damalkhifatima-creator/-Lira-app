
import React, { useState, useRef, useMemo } from 'react';
import { 
  LayoutDashboard, Settings, Image as ImageIcon, LogOut, 
  Save, Clock, Upload, X, Menu, Laptop, Tablet, Smartphone,
  Circle, Square, RectangleHorizontal, Grid, Edit3, Users, Search,
  User as UserIcon, Shield, Headset, Megaphone, ToggleLeft, ToggleRight,
  Coins, Trash2, Plus, Info, ImagePlus
} from 'lucide-react';
import { AppSettings, Banknote, User, FloatingImage } from '../../types';

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
  const globalBgInputRef = useRef<HTMLInputElement>(null);
  const floatingInputRef = useRef<HTMLInputElement>(null);
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
      // Use URL for immediate UI update
      const previewUrl = URL.createObjectURL(file);
      callback(previewUrl);

      // Convert to base64 for persistent storage
      const reader = new FileReader();
      reader.onloadend = () => {
        callback(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const addFloatingImage = (url: string) => {
    const newImg: FloatingImage = {
        id: Math.random().toString(36).substring(7),
        url: url,
        top: 10 + Math.floor(Math.random() * 60),
        left: 10 + Math.floor(Math.random() * 60),
        size: 60 + Math.floor(Math.random() * 120),
        animationDuration: 6 + Math.floor(Math.random() * 10)
    };
    setSettings({
        ...settings,
        visual: {
            ...settings.visual,
            floatingImages: [...settings.visual.floatingImages, newImg]
        }
    });
  };

  const removeFloatingImage = (id: string) => {
    setSettings({
        ...settings,
        visual: {
            ...settings.visual,
            floatingImages: settings.visual.floatingImages.filter(img => img.id !== id)
        }
    });
  };

  const navItems = [
    { id: 'system', label: 'إعدادات المنصة', icon: Settings },
    { id: 'banknotes', label: 'تحديث الصور', icon: ImagePlus },
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
    <div className="min-h-screen bg-[#020617] flex flex-col md:flex-row font-cairo text-white overflow-hidden relative">
      {/* Background decoration in dashboard */}
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-emerald-500/5 blur-[120px] rounded-full z-0 pointer-events-none" />
      
      {/* Mobile Top Bar */}
      <div className="md:hidden p-4 glass flex justify-between items-center z-[100] sticky top-0 backdrop-blur-2xl">
        <div className="flex items-center gap-2">
           <LayoutDashboard size={20} className="text-emerald-400" />
           <h1 className="font-black text-sm">لوحة التحكم</h1>
        </div>
        <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="p-2 hover:bg-white/10 rounded-lg transition-colors">
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Sidebar */}
      <aside className={`
        fixed inset-y-0 right-0 w-72 md:w-64 lg:w-80 border-l border-white/5 p-6 flex flex-col glass z-[90] transition-transform duration-300 backdrop-blur-3xl
        ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full md:translate-x-0 md:static'}
      `}>
        <div className="hidden md:flex items-center gap-3 mb-10">
          <div className="w-10 h-10 emerald-gradient rounded-xl flex items-center justify-center shadow-lg shadow-emerald-500/30">
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
          <LogOut size={20} /> <span className="text-sm">خروج من الإدارة</span>
        </button>
      </aside>

      {/* Main Panel Content */}
      <main className="flex-1 p-4 md:p-8 lg:p-12 overflow-y-auto h-screen relative z-10">
        <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-10 gap-4">
          <div className="space-y-1">
            <h2 className="text-2xl lg:text-3xl font-black">إعدادات المنصة 2026</h2>
            <div className="flex gap-4 text-[10px] text-gray-500 font-bold uppercase tracking-widest">
                <span className="flex items-center gap-1"><Laptop size={10} /> نظام الحاسوب</span>
                <span className="flex items-center gap-1"><Smartphone size={10} /> الهواتف الذكية</span>
            </div>
          </div>
          <button className="w-full sm:w-auto px-10 py-4 bg-emerald-500 text-white rounded-2xl font-black shadow-2xl shadow-emerald-500/20 flex items-center justify-center gap-3 hover:bg-emerald-600 transition-all active:scale-95 group">
              <Save size={18} className="group-hover:rotate-12 transition-transform" /> 
              حفظ الإعدادات النهائية
          </button>
        </header>

        <div className="max-w-5xl mx-auto grid grid-cols-1 gap-8 pb-32">
          {activeTab === 'system' && (
            <div className="space-y-8 animate-in fade-in duration-500">
              <div className="glass p-6 md:p-10 rounded-[2.5rem] border border-white/5 shadow-2xl">
                <h3 className="text-xl font-black mb-8 border-b border-white/5 pb-6 flex items-center gap-3">
                   <Settings className="text-emerald-400" size={20} />
                   معلومات المنصة الأساسية
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <label className="text-xs font-bold text-gray-400 px-1">اسم الموقع الرسمي</label>
                    <input 
                      type="text" 
                      value={settings.siteName} 
                      onChange={(e) => setSettings({ ...settings, siteName: e.target.value })}
                      className="w-full bg-white/5 border border-white/10 p-5 rounded-2xl outline-none focus:border-emerald-500/50 transition-all font-bold" 
                    />
                  </div>
                  <div className="space-y-3">
                    <label className="text-xs font-bold text-gray-400 px-1">معامل التحويل المركزي</label>
                    <div className="relative">
                        <input 
                        type="number" 
                        value={settings.conversionFactor} 
                        onChange={(e) => setSettings({ ...settings, conversionFactor: Number(e.target.value) })}
                        className="w-full bg-white/5 border border-white/10 p-5 rounded-2xl outline-none focus:border-emerald-500/50 transition-all font-mono font-bold text-emerald-400" 
                        />
                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[10px] text-gray-500 font-bold">1:N</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Background & Floating Images Section - Focused and Transparent */}
              <div className="glass p-6 md:p-10 rounded-[2.5rem] border border-white/5 space-y-10 shadow-2xl">
                 <div className="flex justify-between items-center border-b border-white/5 pb-6">
                    <h3 className="text-xl font-black flex items-center gap-3">
                        <ImageIcon size={22} className="text-emerald-400" />
                        الهوية البصرية والرموز العائمة
                    </h3>
                    <div className="px-4 py-1.5 bg-emerald-500/10 rounded-full text-emerald-400 text-[10px] font-black uppercase tracking-wider border border-emerald-500/20">
                        Visual Engine 2026
                    </div>
                 </div>

                 <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                    {/* Global Background Management */}
                    <div className="space-y-6">
                       <div className="flex items-center justify-between">
                          <label className="text-sm font-black text-gray-300">الصورة الخلفية للمنصة</label>
                          <span className="text-[10px] text-gray-500 font-bold uppercase">Background Layer</span>
                       </div>
                       <div 
                         className="aspect-video glass rounded-[2rem] border-2 border-dashed border-white/10 overflow-hidden relative group cursor-pointer transition-all hover:border-emerald-500/40"
                         onClick={() => globalBgInputRef.current?.click()}
                       >
                          {settings.visual.globalBackgroundImage ? (
                              <img src={settings.visual.globalBackgroundImage} className="w-full h-full object-cover transition-transform group-hover:scale-105 duration-700" />
                          ) : (
                              <div className="w-full h-full flex flex-col items-center justify-center text-gray-500 space-y-3">
                                 <Upload size={32} className="opacity-20" />
                                 <span className="text-sm font-bold italic">انقر لرفع خلفية الموقع</span>
                              </div>
                          )}
                          <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity space-y-2">
                             <Upload className="text-white" size={32} />
                             <span className="text-xs font-bold text-white uppercase tracking-widest">تحديث الخلفية فوراً</span>
                          </div>
                          <input type="file" ref={globalBgInputRef} className="hidden" accept="image/*" onChange={(e) => handleInstantImageUpload(e, (url) => setSettings({...settings, visual: {...settings.visual, globalBackgroundImage: url}}))} />
                       </div>
                       {settings.visual.globalBackgroundImage && (
                           <button onClick={(e) => { e.stopPropagation(); setSettings({...settings, visual: {...settings.visual, globalBackgroundImage: ''}})}} className="flex items-center gap-2 text-xs text-red-400 font-black hover:text-red-300 transition-colors bg-red-500/10 px-4 py-2 rounded-xl border border-red-500/20">
                              <Trash2 size={14} /> حذف الخلفية الحالية
                           </button>
                       )}
                    </div>

                    {/* Floating Images Management */}
                    <div className="space-y-6">
                       <div className="flex justify-between items-center">
                          <div className="space-y-1">
                             <label className="text-sm font-black text-gray-300">الرموز والعملات العائمة</label>
                             <p className="text-[10px] text-gray-500 font-bold">تتحرك تلقائياً في الخلفية</p>
                          </div>
                          <button 
                            onClick={() => floatingInputRef.current?.click()}
                            className="flex items-center gap-2 px-5 py-2.5 bg-emerald-500 rounded-xl text-white font-black text-xs hover:bg-emerald-600 transition-all shadow-xl shadow-emerald-500/20 active:scale-95"
                          >
                             <Plus size={14} /> إضافة رمز
                          </button>
                          <input type="file" ref={floatingInputRef} className="hidden" accept="image/*" onChange={(e) => handleInstantImageUpload(e, (url) => addFloatingImage(url))} />
                       </div>
                       <div className="grid grid-cols-3 sm:grid-cols-4 gap-4 max-h-[250px] overflow-y-auto pr-2 custom-scroll">
                          {settings.visual.floatingImages.map((img) => (
                             <div key={img.id} className="aspect-square glass rounded-2xl overflow-hidden relative group border border-white/5 hover:border-emerald-500/30 transition-all p-2">
                                <img src={img.url} className="w-full h-full object-contain drop-shadow-lg" />
                                <button 
                                  onClick={() => removeFloatingImage(img.id)}
                                  className="absolute top-1 right-1 p-1.5 bg-red-500 rounded-lg text-white opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"
                                >
                                   <X size={12} />
                                </button>
                             </div>
                          ))}
                          {settings.visual.floatingImages.length === 0 && (
                              <div className="col-span-full py-12 text-center text-[10px] text-gray-600 font-black italic border border-white/5 rounded-[2rem] bg-white/5 border-dashed">
                                 لم يتم إضافة أي رموز عائمة بعد.
                              </div>
                          )}
                       </div>
                    </div>
                 </div>
              </div>

              {/* Logo Settings */}
              <div className="glass p-6 md:p-10 rounded-[2.5rem] border border-white/5 shadow-2xl">
                <h3 className="text-xl font-black mb-8 border-b border-white/5 pb-6 flex items-center gap-3">
                   <Upload size={22} className="text-emerald-400" />
                   هوية الشعار المركزي
                </h3>
                
                <div className="flex flex-col lg:flex-row gap-12">
                   <div className={`w-40 h-40 md:w-56 md:h-56 glass flex items-center justify-center border-2 border-dashed border-white/10 shrink-0 transition-all overflow-hidden p-6 ${getLogoShapePreview()}`}>
                      {settings.logoUrl ? (
                        <img src={settings.logoUrl} className="max-w-full max-h-full object-contain drop-shadow-2xl" />
                      ) : (
                        <div className="text-center space-y-2 opacity-20">
                           <ImageIcon className="mx-auto" size={48} />
                           <p className="text-[10px] font-black uppercase">No Logo</p>
                        </div>
                      )}
                   </div>
                   
                   <div className="flex-1 space-y-10">
                      <div className="space-y-4">
                        <label className="text-xs font-bold text-gray-400 px-1 uppercase tracking-widest">تنسيق الشكل</label>
                        <div className="flex flex-wrap gap-4">
                            {[
                                { id: 'circle', label: 'دائري', icon: Circle },
                                { id: 'square', label: 'مربع', icon: Square },
                                { id: 'rectangle', label: 'مستطيل', icon: RectangleHorizontal }
                            ].map((shape) => (
                                <button
                                    key={shape.id}
                                    onClick={() => setSettings({ ...settings, logoShape: shape.id as any })}
                                    className={`flex items-center gap-3 px-6 py-3 rounded-2xl border transition-all ${settings.logoShape === shape.id ? 'bg-emerald-500 text-white border-emerald-500 shadow-xl shadow-emerald-500/20' : 'bg-white/5 border-white/10 text-gray-400 hover:bg-white/10'}`}
                                >
                                    <shape.icon size={18} />
                                    <span className="text-sm font-black">{shape.label}</span>
                                </button>
                            ))}
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div className="flex justify-between items-center">
                            <label className="text-xs font-bold text-gray-400 px-1 uppercase tracking-widest">مقياس الحجم</label>
                            <span className="text-sm font-mono text-emerald-400 font-black">{settings.logoSize}px</span>
                        </div>
                        <input 
                            type="range" 
                            min="30" 
                            max="120" 
                            value={settings.logoSize}
                            onChange={(e) => setSettings({ ...settings, logoSize: Number(e.target.value) })}
                            className="w-full h-2 bg-white/10 rounded-full appearance-none cursor-pointer accent-emerald-500"
                        />
                      </div>

                      <div className="flex flex-wrap gap-3 pt-2">
                        <input type="file" ref={logoInputRef} onChange={(e) => handleInstantImageUpload(e, (url) => setSettings({ ...settings, logoUrl: url }))} className="hidden" accept="image/*" />
                        <button 
                            onClick={() => logoInputRef.current?.click()}
                            className="flex-1 sm:flex-none px-10 py-4 bg-white/5 hover:bg-emerald-500/10 border border-white/10 rounded-2xl font-black text-sm transition-all flex items-center justify-center gap-3"
                        >
                            <Upload size={18} /> رفع شعار جديد
                        </button>
                        {settings.logoUrl && (
                            <button 
                                onClick={() => setSettings({...settings, logoUrl: ''})}
                                className="flex-1 sm:flex-none px-10 py-4 text-red-400 bg-red-500/5 hover:bg-red-500/10 border border-red-500/20 rounded-2xl font-black text-sm transition-all flex items-center justify-center gap-3"
                            >
                                <Trash2 size={18} /> حذف الشعار
                            </button>
                        )}
                      </div>
                   </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'banknotes' && (
            <div className="space-y-8 animate-in fade-in duration-500">
               <div className="glass p-8 rounded-[2rem] border border-white/5 mb-6 flex items-start gap-4">
                  <div className="p-3 bg-amber-500/10 rounded-2xl">
                     <Info className="text-amber-500" size={24} />
                  </div>
                  <div className="space-y-1">
                     <h4 className="font-black text-lg">ملاحظة أمنية للمدير</h4>
                     <p className="text-sm text-gray-400 leading-relaxed">
                        بناءً على بروتوكول 2026، لا يمكن تعديل "اسم العملة" أو "قيمتها" يدوياً. يمكنك فقط تحديث "الصور" و "ميزات الأمان" لضمان ثبات النظام المالي.
                     </p>
                  </div>
               </div>

               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 {banknotes.map((note) => (
                   <div key={note.id} className="glass p-8 rounded-[2.5rem] border border-white/5 flex flex-col gap-6 group hover:border-emerald-500/30 transition-all shadow-xl">
                      <div className="flex items-center justify-between">
                         <div className="flex items-center gap-4">
                            <div className="w-14 h-14 emerald-gradient rounded-2xl flex items-center justify-center font-black text-xl text-white shadow-xl shadow-emerald-500/20">{note.value}</div>
                            <div>
                               <h4 className="font-black text-lg">{note.name}</h4>
                               <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Currency Asset Locked</p>
                            </div>
                         </div>
                         <button 
                            onClick={() => setEditingNoteId(editingNoteId === note.id ? null : note.id)}
                            className={`p-3 rounded-xl transition-all ${editingNoteId === note.id ? 'bg-emerald-500 text-white shadow-lg' : 'bg-white/5 hover:bg-white/10'}`}
                         >
                            <Edit3 size={20} />
                         </button>
                      </div>

                      {editingNoteId === note.id ? (
                        <div className="space-y-6 mt-2 animate-in slide-in-from-top-4 duration-300">
                           <div className="grid grid-cols-2 gap-6">
                              <div className="space-y-2 opacity-40">
                                 <label className="text-[10px] text-gray-500 font-black uppercase tracking-widest px-1">اسم العملة (مقفل)</label>
                                 <div className="w-full bg-slate-900 border border-white/5 p-4 rounded-xl text-sm font-bold flex items-center gap-2">
                                    <Shield size={14} className="text-gray-600" /> {note.name}
                                 </div>
                              </div>
                              <div className="space-y-2 opacity-40">
                                 <label className="text-[10px] text-gray-500 font-black uppercase tracking-widest px-1">القيمة (مقفل)</label>
                                 <div className="w-full bg-slate-900 border border-white/5 p-4 rounded-xl text-sm font-black flex items-center gap-2">
                                    <Shield size={14} className="text-gray-600" /> {note.value}
                                 </div>
                              </div>
                           </div>
                           
                           <div className="space-y-2">
                              <label className="text-[10px] text-gray-400 font-black uppercase tracking-widest px-1">تحديث ميزات الأمان</label>
                              <textarea 
                                value={note.securityFeatures.join(', ')} 
                                onChange={(e) => setBanknotes(banknotes.map(n => n.id === note.id ? {...n, securityFeatures: e.target.value.split(',').map(s => s.trim())} : n))}
                                className="w-full bg-white/5 border border-white/10 p-5 rounded-2xl text-sm outline-none h-24 resize-none focus:border-emerald-500/50 transition-colors font-medium leading-relaxed" 
                                placeholder="علامة مائية، خيط أمان..."
                              />
                           </div>

                           <div className="grid grid-cols-2 gap-6">
                              <div className="space-y-3">
                                 <label className="text-[10px] text-gray-400 font-black uppercase tracking-widest px-1">تحديث الوجه الأمامي</label>
                                 <div className="aspect-[2/1] glass rounded-[1.5rem] border-2 border-dashed border-white/10 overflow-hidden relative cursor-pointer group/img" onClick={() => frontInputRef.current?.click()}>
                                    <img src={note.frontImage} className="w-full h-full object-cover opacity-40 group-hover/img:opacity-80 transition-all group-hover/img:scale-105" />
                                    <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover/img:opacity-100 transition-opacity bg-black/40 backdrop-blur-[2px]">
                                       <Upload size={24} className="mb-1" />
                                       <span className="text-[10px] font-black uppercase tracking-tighter">رفع الوجه الأمامي</span>
                                    </div>
                                    <input 
                                        type="file" 
                                        className="hidden" 
                                        onChange={(e) => handleInstantImageUpload(e, (url) => setBanknotes(banknotes.map(n => n.id === note.id ? {...n, frontImage: url} : n)))} 
                                        accept="image/*"
                                    />
                                 </div>
                              </div>
                              <div className="space-y-3">
                                 <label className="text-[10px] text-gray-400 font-black uppercase tracking-widest px-1">تحديث الوجه الخلفي</label>
                                 <div className="aspect-[2/1] glass rounded-[1.5rem] border-2 border-dashed border-white/10 overflow-hidden relative cursor-pointer group/img" onClick={() => backInputRef.current?.click()}>
                                    <img src={note.backImage} className="w-full h-full object-cover opacity-40 group-hover/img:opacity-80 transition-all group-hover/img:scale-105" />
                                    <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover/img:opacity-100 transition-opacity bg-black/40 backdrop-blur-[2px]">
                                       <Upload size={24} className="mb-1" />
                                       <span className="text-[10px] font-black uppercase tracking-tighter">رفع الوجه الخلفي</span>
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
                           <div className="pt-2">
                               <button 
                                onClick={() => setEditingNoteId(null)}
                                className="w-full py-4 bg-emerald-500 text-white rounded-2xl font-black text-sm shadow-xl active:scale-95 transition-all"
                               >
                                   حفظ التغييرات للفئة
                               </button>
                           </div>
                        </div>
                      ) : (
                        <div className="flex gap-4 p-4 bg-white/5 rounded-2xl border border-white/5">
                           <div className="flex-1 space-y-2">
                              <p className="text-[10px] text-gray-500 font-black uppercase tracking-tighter">Preview Front</p>
                              <img src={note.frontImage} className="w-full h-20 rounded-xl object-cover border border-white/10" />
                           </div>
                           <div className="flex-1 space-y-2">
                              <p className="text-[10px] text-gray-500 font-black uppercase tracking-tighter">Preview Back</p>
                              <img src={note.backImage} className="w-full h-20 rounded-xl object-cover border border-white/10" />
                           </div>
                        </div>
                      )}
                   </div>
                 ))}
               </div>
            </div>
          )}

          {activeTab === 'users' && (
            <div className="space-y-8 animate-in fade-in duration-500">
               <div className="glass p-8 md:p-12 rounded-[2.5rem] border border-white/5 space-y-8 shadow-2xl">
                  <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 border-b border-white/5 pb-8">
                     <div className="space-y-1">
                        <h3 className="text-xl font-black">إدارة المواطنين المسجلين</h3>
                        <p className="text-xs text-gray-500">مراقبة الحسابات المالية النشطة لعام 2026</p>
                     </div>
                     <div className="relative w-full lg:w-96">
                        <Search className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                        <input 
                            type="text" 
                            placeholder="بحث عن مواطن بالاسم أو رقم الحساب..."
                            value={userSearch}
                            onChange={(e) => setUserSearch(e.target.value)}
                            className="w-full bg-white/5 border border-white/10 p-4 pr-12 rounded-2xl outline-none focus:border-emerald-500/50 text-sm font-bold"
                        />
                     </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                     {filteredUsers.length > 0 ? filteredUsers.map((user, idx) => (
                        <div key={idx} className="glass p-6 rounded-[2rem] border border-white/5 flex items-center gap-5 hover:border-emerald-500/30 transition-all group hover:bg-emerald-500/5">
                           <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-emerald-500/20 group-hover:border-emerald-500/50 transition-all shadow-xl">
                              {user.photoUrl ? (
                                <img src={user.photoUrl} className="w-full h-full object-cover" />
                              ) : (
                                <UserIcon className="m-4 text-emerald-400" />
                              )}
                           </div>
                           <div className="flex-1 overflow-hidden">
                              <h5 className="font-black text-base truncate">{user.name}</h5>
                              <div className="flex items-center gap-3 mt-1.5">
                                 <span className="text-[10px] bg-emerald-500 text-white px-2.5 py-1 rounded-lg font-mono font-black shadow-lg shadow-emerald-500/20">#{user.accountNumber}</span>
                                 <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
                                 <span className="text-[9px] text-gray-500 font-black uppercase tracking-widest">Online</span>
                              </div>
                           </div>
                        </div>
                     )) : (
                        <div className="col-span-full py-24 text-center space-y-6">
                           <div className="w-24 h-24 bg-white/5 rounded-full flex items-center justify-center mx-auto border border-dashed border-white/10">
                              <Users className="text-gray-700 opacity-20" size={48} />
                           </div>
                           <p className="text-gray-500 font-black text-lg">لم يتم العثور على أي بيانات مطابقة.</p>
                        </div>
                     )}
                  </div>
               </div>
            </div>
          )}

          {activeTab === 'services' && (
            <div className="space-y-8 animate-in fade-in duration-500">
               <div className="glass p-8 md:p-12 rounded-[2.5rem] border border-white/5 space-y-10 shadow-2xl">
                  <h3 className="text-xl font-black border-b border-white/5 pb-8 flex items-center gap-3">
                     <Megaphone className="text-emerald-400" size={22} />
                     إدارة الخدمات الإضافية
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                     <div className="space-y-4">
                        <label className="text-xs font-black text-gray-400 px-1 uppercase tracking-widest">رابط الدعم الفني المباشر</label>
                        <div className="relative">
                           <Headset className="absolute right-5 top-1/2 -translate-y-1/2 text-emerald-500" size={20} />
                           <input 
                              type="text"
                              value={settings.services.supportLink}
                              onChange={(e) => setSettings({...settings, services: {...settings.services, supportLink: e.target.value}})}
                              className="w-full bg-white/5 border border-white/10 p-5 pr-14 rounded-2xl outline-none focus:border-emerald-500/50 font-bold transition-all"
                              placeholder="https://wa.me/..."
                           />
                        </div>
                     </div>
                     <div className="space-y-4">
                        <label className="text-xs font-black text-gray-400 px-1 uppercase tracking-widest">شريط الإعلانات المركزي</label>
                        <div className="relative">
                           <Megaphone className="absolute right-5 top-1/2 -translate-y-1/2 text-emerald-500" size={20} />
                           <input 
                              type="text"
                              value={settings.services.newsTicker}
                              onChange={(e) => setSettings({...settings, services: {...settings.services, newsTicker: e.target.value}})}
                              className="w-full bg-white/5 border border-white/10 p-5 pr-14 rounded-2xl outline-none focus:border-emerald-500/50 font-bold transition-all"
                              placeholder="اكتب التنبيه الرسمي هنا..."
                           />
                        </div>
                     </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 pt-6">
                     {[
                        { id: 'showConverter', label: 'المحول السريع', icon: Coins },
                        { id: 'showGallery', label: 'دليل الفئات', icon: Grid },
                        { id: 'showNews', label: 'شريط التنبيهات', icon: Megaphone },
                     ].map((service) => (
                        <button 
                           key={service.id}
                           onClick={() => toggleService(service.id as any)}
                           className={`p-8 rounded-[2rem] border-2 flex flex-col items-center gap-6 transition-all group ${settings.services[service.id as keyof typeof settings.services] ? 'bg-emerald-500 text-white border-emerald-500 shadow-xl shadow-emerald-500/20' : 'bg-white/5 border-white/10 text-gray-500 hover:bg-white/10 opacity-70'}`}
                        >
                           <service.icon size={32} className={`group-hover:scale-110 transition-transform ${settings.services[service.id as keyof typeof settings.services] ? 'text-white' : 'text-gray-500'}`} />
                           <span className="text-base font-black uppercase tracking-tighter">{service.label}</span>
                           <div className="pt-2">
                             {settings.services[service.id as keyof typeof settings.services] ? <ToggleRight size={32} /> : <ToggleLeft size={32} />}
                           </div>
                        </button>
                     ))}
                  </div>
               </div>
            </div>
          )}

          {activeTab === 'maintenance' && (
            <div className="glass p-8 md:p-12 rounded-[2.5rem] border border-white/5 space-y-10 animate-in fade-in duration-500 shadow-2xl">
              <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 border-b border-white/5 pb-8">
                <div className="space-y-1">
                  <h3 className="text-xl font-black flex items-center gap-3">
                     <Clock className="text-amber-500" size={22} />
                     بروتوكول الصيانة المركزي
                  </h3>
                  <p className="text-gray-500 text-xs">يتم حجب المنصة بالكامل عن الجمهور عند تفعيل هذا الوضع.</p>
                </div>
                <button 
                  onClick={() => setSettings({ 
                    ...settings, 
                    maintenance: { ...settings.maintenance, isPaused: !settings.maintenance.isPaused } 
                  })}
                  className={`w-full lg:w-auto px-10 py-4 rounded-2xl font-black transition-all shadow-2xl ${settings.maintenance.isPaused ? 'bg-red-500 text-white shadow-red-500/30' : 'bg-amber-500 text-white shadow-amber-500/30 hover:bg-amber-600'}`}
                >
                  {settings.maintenance.isPaused ? 'إيقاف الصيانة فوراً' : 'تفعيل وضع الصيانة'}
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <label className="text-xs font-black text-gray-400 px-1 uppercase tracking-widest">توقيت البدء المجدول</label>
                  <input 
                    type="datetime-local" 
                    value={settings.maintenance.startTime}
                    onChange={(e) => setSettings({ ...settings, maintenance: { ...settings.maintenance, startTime: e.target.value }})}
                    className="w-full bg-white/5 border border-white/10 p-5 rounded-2xl outline-none focus:border-emerald-500/50 font-bold" 
                  />
                </div>
                <div className="space-y-3">
                  <label className="text-xs font-black text-gray-400 px-1 uppercase tracking-widest">توقيت الانتهاء المتوقع</label>
                  <input 
                    type="datetime-local" 
                    value={settings.maintenance.endTime}
                    onChange={(e) => setSettings({ ...settings, maintenance: { ...settings.maintenance, endTime: e.target.value }})}
                    className="w-full bg-white/5 border border-white/10 p-5 rounded-2xl outline-none focus:border-emerald-500/50 font-bold" 
                  />
                </div>
                <div className="md:col-span-2 space-y-3">
                  <label className="text-xs font-black text-gray-400 px-1 uppercase tracking-widest">نص التوضيح للمستخدمين</label>
                  <textarea 
                    value={settings.maintenance.reason}
                    onChange={(e) => setSettings({ ...settings, maintenance: { ...settings.maintenance, reason: e.target.value }})}
                    className="w-full bg-white/5 border border-white/10 p-6 rounded-[2rem] outline-none h-40 resize-none focus:border-emerald-500/50 transition-all font-medium leading-relaxed" 
                    placeholder="اكتب هنا سبب الصيانة بالتفصيل..."
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
      
      <style>{`
        .custom-scroll::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scroll::-webkit-scrollbar-track {
          background: rgba(255,255,255,0.02);
        }
        .custom-scroll::-webkit-scrollbar-thumb {
          background: rgba(16, 185, 129, 0.2);
          border-radius: 10px;
        }
      `}</style>
    </div>
  );
};

export default Dashboard;
