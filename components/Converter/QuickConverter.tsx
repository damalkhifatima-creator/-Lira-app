
import React, { useState } from 'react';
import { RefreshCw, ArrowLeftRight } from 'lucide-react';
import { AppSettings } from '../../types';

interface QuickConverterProps {
  settings: AppSettings;
  formatNumber: (n: number) => string;
}

const QuickConverter: React.FC<QuickConverterProps> = ({ settings, formatNumber }) => {
  const [values, setValues] = useState({
    new: '',
    old: ''
  });

  const handleUpdate = (field: 'new' | 'old', value: string) => {
    const num = parseFloat(value) || 0;
    
    if (field === 'new') {
      setValues({
        new: value,
        old: (num * settings.conversionFactor).toString()
      });
    } else if (field === 'old') {
      setValues({
        new: (num / settings.conversionFactor).toString(),
        old: value
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
          <p className="text-gray-400 text-sm">تحويل فوري بين الليرة القديمة والجديدة.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-3">
          <label className="text-xs font-bold text-gray-400 uppercase tracking-widest mr-2">ليرة جديدة (2026)</label>
          <div className="relative">
            <input 
              type="number" 
              value={values.new}
              onChange={(e) => handleUpdate('new', e.target.value)}
              className="w-full bg-white/5 border border-white/10 p-5 rounded-2xl focus:border-emerald-500/50 outline-none font-bold text-xl"
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
              className="w-full bg-white/5 border border-white/10 p-5 rounded-2xl focus:border-indigo-500/50 outline-none font-bold text-xl"
              placeholder="0.00"
            />
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-indigo-400 font-bold">L.SO</div>
          </div>
        </div>
      </div>
      
      <div className="flex items-center justify-center pt-4 border-t border-white/5">
        <div className="text-xs font-medium text-gray-500 flex items-center gap-2">
          <RefreshCw size={12} className="animate-spin-slow" />
          تحديثات فورية بناءً على القرار المركزي
        </div>
      </div>
    </div>
  );
};

export default QuickConverter;
