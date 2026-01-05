
import React, { useState } from 'react';
import { RefreshCw, ArrowLeftRight, DollarSign } from 'lucide-react';
import { AppSettings } from '../../types';
import { OFFICIAL_USD_RATE } from '../../constants';

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
        usd: (num / OFFICIAL_USD_RATE).toFixed(2)
      });
    } else if (field === 'old') {
      const newVal = num / settings.conversionFactor;
      setValues({
        new: newVal.toString(),
        old: value,
        usd: (newVal / OFFICIAL_USD_RATE).toFixed(2)
      });
    } else if (field === 'usd') {
      const newVal = num * OFFICIAL_USD_RATE;
      setValues({
        new: newVal.toString(),
        old: (newVal * settings.conversionFactor).toString(),
        usd: value
      });
    }
  };

  return (
    <div className="glass p-8 md:p-10 rounded-[2.5rem] border border-white/10 space-y-10 shadow-2xl">
      <div className="flex items-center gap-5">
        <div className="w-14 h-14 rounded-2xl bg-indigo-500/20 flex items-center justify-center border border-indigo-500/20 shadow-inner">
          <ArrowLeftRight className="text-indigo-400" size={28} />
        </div>
        <div>
          <h2 className="text-2xl font-black">المحول المالي السريع</h2>
          <p className="text-gray-400 text-sm">تحويل فوري وشامل لجميع القيم المعتمدة.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="space-y-3">
          <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest px-2">ليرة جديدة (2026)</label>
          <div className="relative group">
            <input 
              type="number" 
              value={values.new}
              onChange={(e) => handleUpdate('new', e.target.value)}
              className="w-full bg-white/5 border border-white/10 p-6 rounded-3xl focus:border-emerald-500/50 outline-none font-black text-2xl transition-all shadow-inner"
              placeholder="0"
            />
            <div className="absolute left-6 top-1/2 -translate-y-1/2 text-emerald-500 font-black text-sm">L.SN</div>
          </div>
        </div>

        <div className="space-y-3">
          <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest px-2">ليرة قديمة</label>
          <div className="relative group">
            <input 
              type="number" 
              value={values.old}
              onChange={(e) => handleUpdate('old', e.target.value)}
              className="w-full bg-white/5 border border-white/10 p-6 rounded-3xl focus:border-indigo-500/50 outline-none font-black text-2xl transition-all shadow-inner"
              placeholder="0"
            />
            <div className="absolute left-6 top-1/2 -translate-y-1/2 text-indigo-400 font-black text-sm">L.SO</div>
          </div>
        </div>

        <div className="space-y-3">
          <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest px-2">الدولار الأمريكي</label>
          <div className="relative group">
            <input 
              type="number" 
              value={values.usd}
              onChange={(e) => handleUpdate('usd', e.target.value)}
              className="w-full bg-white/5 border border-white/10 p-6 rounded-3xl focus:border-amber-500/50 outline-none font-black text-2xl transition-all shadow-inner"
              placeholder="0.00"
            />
            <div className="absolute left-6 top-1/2 -translate-y-1/2 text-amber-500 font-black text-sm">$ USD</div>
          </div>
        </div>
      </div>
      
      <div className="pt-6 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center gap-4">
        <div className="text-[10px] font-bold text-gray-500 flex items-center gap-2 uppercase tracking-widest">
          <RefreshCw size={12} className="animate-spin-slow" />
          معدل الصرف الرسمي: 1 دولار = {OFFICIAL_USD_RATE} ليرة جديدة
        </div>
        <div className="px-4 py-2 bg-emerald-500/10 text-emerald-500 rounded-full text-[10px] font-black border border-emerald-500/20">
          نظام التحويل الموحد نشط
        </div>
      </div>
    </div>
  );
};

export default QuickConverter;
