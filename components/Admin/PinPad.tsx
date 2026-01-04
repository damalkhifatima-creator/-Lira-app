
import React, { useState } from 'react';
import { X, Lock, ArrowLeft } from 'lucide-react';

interface PinPadProps {
  onClose: () => void;
  onSubmit: (pin: string) => boolean;
}

const PinPad: React.FC<PinPadProps> = ({ onClose, onSubmit }) => {
  const [pin, setPin] = useState('');
  const [error, setError] = useState(false);

  const handleKey = (key: string) => {
    if (pin.length < 6) {
      setError(false);
      setPin(prev => prev + key);
    }
  };

  const clear = () => setPin('');
  const backspace = () => setPin(prev => prev.slice(0, -1));

  const handleEnter = () => {
    if (pin.length === 6) {
      const success = onSubmit(pin);
      if (!success) {
        setError(true);
        setPin('');
      }
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-950/90 backdrop-blur-md" onClick={onClose} />
      <div className="relative glass w-full max-w-sm p-8 rounded-[2.5rem] border-white/10 space-y-8 animate-in slide-in-from-bottom-10 duration-500">
        <button onClick={onClose} className="absolute top-6 left-6 text-gray-400 hover:text-white">
          <X size={24} />
        </button>

        <div className="text-center space-y-3">
          <div className="w-16 h-16 bg-amber-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Lock className="text-amber-400" />
          </div>
          <h2 className="text-2xl font-black">بوابة المدير</h2>
          <p className="text-gray-400 text-sm">أدخل الرمز المكون من 6 أرقام للوصول.</p>
        </div>

        <div className="flex justify-center gap-3">
          {[...Array(6)].map((_, i) => (
            <div 
              key={i} 
              className={`w-4 h-4 rounded-full border-2 transition-all duration-300 ${
                i < pin.length 
                  ? 'bg-emerald-500 border-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.5)]' 
                  : error ? 'border-red-500' : 'border-white/20'
              }`} 
            />
          ))}
        </div>

        {error && <p className="text-red-500 text-center text-xs font-bold animate-shake">الرمز السري غير صحيح!</p>}

        <div className="grid grid-cols-3 gap-4">
          {['1', '2', '3', '4', '5', '6', '7', '8', '9', 'C', '0', '⌫'].map((key) => (
            <button
              key={key}
              onClick={() => {
                if (key === 'C') clear();
                else if (key === '⌫') backspace();
                else handleKey(key);
              }}
              className="h-16 glass rounded-2xl text-xl font-bold hover:bg-white/10 transition-all active:scale-95"
            >
              {key}
            </button>
          ))}
        </div>

        <button 
          onClick={handleEnter}
          disabled={pin.length !== 6}
          className={`w-full py-4 rounded-2xl font-black text-white transition-all ${
            pin.length === 6 ? 'emerald-gradient shadow-xl shadow-emerald-500/20' : 'bg-white/5 text-gray-500 cursor-not-allowed'
          }`}
        >
          دخول
        </button>
      </div>
    </div>
  );
};

export default PinPad;
