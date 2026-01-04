
import React, { useState, useRef } from 'react';
import { X, User as UserIcon, Camera, Key, Fingerprint } from 'lucide-react';
import { User } from '../../types';

interface AuthModalProps {
  onClose: () => void;
  onLogin: (user: User) => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ onClose, onLogin }) => {
  const [formData, setFormData] = useState({
    name: '',
    pin: '',
    photoUrl: ''
  });
  const [isRegistered, setIsRegistered] = useState(false);
  const [accNum, setAccNum] = useState('');
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Instant preview using URL.createObjectURL
      const previewUrl = URL.createObjectURL(file);
      setFormData(prev => ({ ...prev, photoUrl: previewUrl }));
      
      // Also convert to base64 for persistent storage
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({ ...prev, photoUrl: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && (formData.pin.length >= 3 && formData.pin.length <= 4)) {
      const generatedAcc = Math.floor(1000 + Math.random() * 9000).toString();
      setAccNum(generatedAcc);
      setIsRegistered(true);
    } else {
      alert('الرجاء التأكد من إدخال الاسم والرمز المكون من 3-4 أرقام');
    }
  };

  const handleFinalize = () => {
    onLogin({ ...formData, accountNumber: accNum });
    onClose();
  };

  if (isRegistered) {
    return (
      <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
        <div className="absolute inset-0 bg-slate-950/90 backdrop-blur-md" onClick={onClose} />
        <div className="relative glass w-full max-w-md p-8 rounded-[2.5rem] border-white/10 text-center space-y-8 animate-in zoom-in duration-300">
          <div className="w-20 h-20 emerald-gradient rounded-full flex items-center justify-center mx-auto shadow-xl shadow-emerald-500/20">
            <Fingerprint size={40} className="text-white" />
          </div>
          <div>
            <h2 className="text-3xl font-black mb-2">تم التسجيل بنجاح!</h2>
            <p className="text-gray-400">لقد تم تخصيص رقم حساب فريد لك في النظام المالي.</p>
          </div>
          
          <div className="bg-emerald-500/10 border-2 border-dashed border-emerald-500/30 p-6 rounded-3xl">
             <span className="text-xs text-emerald-400 font-black uppercase tracking-widest block mb-2">رقم الحساب الخاص بك</span>
             <span className="text-5xl font-black text-white tracking-[0.5em] pr-[-0.5em]">#{accNum}</span>
          </div>

          <p className="text-[10px] text-gray-500">يرجى حفظ هذا الرقم، سيتم استخدامه في جميع تعاملاتك النقدية القادمة.</p>

          <button 
            onClick={handleFinalize}
            className="w-full py-4 emerald-gradient rounded-2xl font-black shadow-lg"
          >
            دخول للمنصة
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-950/90 backdrop-blur-md" onClick={onClose} />
      <div className="relative glass w-full max-w-md p-8 rounded-[2.5rem] border-white/10 animate-in slide-in-from-bottom-8">
        <button onClick={onClose} className="absolute top-6 left-6 text-gray-400"><X /></button>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="text-center">
            <h2 className="text-2xl font-black mb-2">إنشاء حساب مواطن</h2>
            <p className="text-gray-400 text-sm">أهلاً بك في نظام 2026 المالي.</p>
          </div>

          <div className="flex flex-col items-center gap-4">
            <div className="relative w-24 h-24 rounded-full glass border-2 border-emerald-500/30 overflow-hidden flex items-center justify-center">
              {formData.photoUrl ? (
                <img src={formData.photoUrl} className="w-full h-full object-cover" />
              ) : (
                <UserIcon size={32} className="text-gray-500" />
              )}
              <button 
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="absolute bottom-0 right-0 p-2 bg-emerald-500 rounded-full text-white hover:scale-110 transition-transform"
              >
                <Camera size={14} />
              </button>
            </div>
            <input type="file" ref={fileInputRef} onChange={handlePhotoUpload} className="hidden" accept="image/*" />
          </div>

          <div className="space-y-4">
            <div className="relative">
              <UserIcon className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input 
                type="text" 
                placeholder="الاسم الكامل"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full bg-white/5 border border-white/10 p-4 pr-12 rounded-xl outline-none"
                required
              />
            </div>
            <div className="relative">
              <Key className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input 
                type="password" 
                placeholder="رمز PIN (3 أو 4 أرقام)"
                maxLength={4}
                value={formData.pin}
                onChange={(e) => setFormData({ ...formData, pin: e.target.value })}
                className="w-full bg-white/5 border border-white/10 p-4 pr-12 rounded-xl outline-none text-center tracking-widest"
                required
              />
            </div>
          </div>

          <button 
            type="submit"
            className="w-full py-4 emerald-gradient rounded-xl font-black shadow-lg shadow-emerald-500/20"
          >
            تفعيل الحساب
          </button>
        </form>
      </div>
    </div>
  );
};

export default AuthModal;
