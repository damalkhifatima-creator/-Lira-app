
import React, { useState } from 'react';
import { X, Lock, Delete } from 'lucide-react';

interface PinPadProps {
  onClose: () => void;
  onSubmit: (pin: string) => boolean;
}

const PinPad: React.FC<PinPadProps> = ({ onClose, onSubmit }) => {
  const [pin, setPin] = useState('');
  const [error, setError] = useState(false);

  const handleKey = (key: string) => {
    if (pin.length < 8) { // Updated for the new 8-digit password
      setError(false);
      setPin(prev => prev + key);
    }
  };

  const clear = () => setPin('');
  const backspace = () => setPin(prev => prev.slice(0, -1));

  const handleEnter = () => {
    if (pin.length === 8) {
      const success = onSubmit(pin);
      if (!success) {
        setError(true);
        setPin('');
      }
    }
  };

  // Automatically attempt submission when 8 digits are reached
  React.useEffect(() => {
    if (pin.length === 8) {
      handleEnter();
    }
  }, [pin]);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-950/95 backdrop-blur-xl" onClick={onClose} />
      <div className="relative glass w-full max-w-sm p-6 md:p-8 rounded-[2rem] border-white/10 space-y-6 md:space-y-8 animate-in slide-in-from-bottom-10 duration-500">
        <button onClick={onClose} className="absolute top-5 left-5 text-gray-400 hover:text-white transition-colors">
          <X size={20} />
        </button>

        <div className="text-center space-y-2">
          <div className="w-14 h-14 bg-emerald-500/10 rounded-2xl flex items-center justify-center mx-auto mb-2 border border-emerald-500/20">
            <Lock className="text-emerald-400" size={24} />
          </div>
          <h2 className="text-xl font-black">الوصول المحمي</h2>
          <p className="text-gray-400 text-xs">أدخل رمز المدير المكون من 8 أرقام.</p>
        </div>

        <div className="flex justify-center gap-2">
          {[...Array(8)].map((_, i) => (
            <div 
              key={i} 
              className={`w-3 h-3 rounded-full border transition-all duration-300 ${
                i < pin.length 
                  ? 'bg-emerald-500 border-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]' 
                  : error ? 'border-red-500 bg-red-500/20' : 'border-white/20'
              }`} 
            />
          ))}
        </div>

        {error && <p className="text-red-500 text-center text-[10px] font-bold animate-shake">الرمز غير صحيح، حاول مجدداً.</p>}

        <div className="grid grid-cols-3 gap-3">
          {['1', '2', '3', '4', '5', '6', '7', '8', '9', 'C', '0', '⌫'].map((key) => (
            <button
              key={key}
              onClick={() => {
                if (key === 'C') clear();
                else if (key === '⌫') backspace();
                else handleKey(key);
              }}
              className="h-14 glass rounded-xl text-lg font-bold hover:bg-white/10 active:scale-95 transition-all flex items-center justify-center"
            >
              {key === '⌫' ? <Delete size={20} /> : key}
            </button>
          ))}
        </div>

        <div className="text-[10px] text-center text-gray-500">
          محاولات الدخول مراقبة أمنياً لعام 2026
        </div>
      </div>
    </div>
  );
};

export default PinPad;
