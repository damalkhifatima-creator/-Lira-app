
import React, { useState, useEffect } from 'react';
import { RefreshCw, Coins, DollarSign, ArrowLeftRight } from 'lucide-react';
import { AppSettings } from '../../types';

interface QuickConverterProps {
  settings: AppSettings;
  formatNumber: (n: number) => string;
}

const QuickConverter: React.FC<QuickConverterProps> = ({ settings, formatNumber }) => {
  const [values, setValues] = useState({
    new: '',
    old: '',
    usd: ''
  });

  const handleUpdate = (field: 'new' | 'old' | 'usd', value: string) => {
    const num = parseFloat(value) || 0;
    
    if (field === 'new') {
      setValues({
        new: value,
        old: (num * settings.conversionFactor).toString(),
        usd: (num / settings.usdRate).toString()
      });
    } else if (field === 'old') {
      setValues({
        new: (num / settings.conversionFactor).toString(),
        old: value,
        usd: (num / (settings.conversionFactor * settings.usdRate)).toString()
      });
    } else if (field === 'usd') {
      setValues({
        new: (num * settings.usdRate).toString(),
        old: (num * settings.usdRate * settings.conversionFactor).toString(),
        usd: value
      });
    }
  };

  return (
    <div className="glass p-8 rounded-[2rem] border-white/10 space-y-8">
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-2xl bg-indigo-500/20 flex items-center justify-center">
          <ArrowLeftRight className="text-indigo-400" />
        </div>
        <div>
          <h2 className="text-2xl font-black">المحول السريع</h2>
          <p className="text-gray-400 text-sm">تحويل فوري بين العملات الثلاث الرئيسية.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="space-y-3">
          <label className="text-xs font-bold text-gray-400 uppercase tracking-widest mr-2">ليرة جديدة (2026)</label>
          <div className="relative">
            <input 
              type="number" 
              value={values.new}
              onChange={(e) => handleUpdate('new', e.target.value)}
              className="w-full bg-white/5 border border-white/10 p-5 rounded-2xl focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/50 outline-none font-bold text-xl"
              placeholder="0.00"
            />
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-emerald-400 font-bold">L.SN</div>
          </div>
        </div>

        <div className="space-y-3">
          <label className="text-xs font-bold text-gray-400 uppercase tracking-widest mr-2">ليرة قديمة</label>
          <div className="relative">
            <input 
              type="number" 
              value={values.old}
              onChange={(e) => handleUpdate('old', e.target.value)}
              className="w-full bg-white/5 border border-white/10 p-5 rounded-2xl focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/50 outline-none font-bold text-xl"
              placeholder="0.00"
            />
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-indigo-400 font-bold">L.SO</div>
          </div>
        </div>

        <div className="space-y-3">
          <label className="text-xs font-bold text-gray-400 uppercase tracking-widest mr-2">دولار أمريكي</label>
          <div className="relative">
            <input 
              type="number" 
              value={values.usd}
              onChange={(e) => handleUpdate('usd', e.target.value)}
              className="w-full bg-white/5 border border-white/10 p-5 rounded-2xl focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/50 outline-none font-bold text-xl"
              placeholder="0.00"
            />
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-amber-400 font-bold">USD</div>
          </div>
        </div>
      </div>
      
      <div className="flex items-center justify-center pt-4 border-t border-white/5">
        <div className="text-xs font-medium text-gray-500 flex items-center gap-2">
          <RefreshCw size={12} className="animate-spin-slow" />
          تحديثات ثنائية الاتجاه (Real-time Sync)
        </div>
      </div>
    </div>
  );
};

export default QuickConverter;
