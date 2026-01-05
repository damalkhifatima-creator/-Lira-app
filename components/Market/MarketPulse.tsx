
import React from 'react';
import { Activity, CheckCircle2, Shield, DollarSign } from 'lucide-react';
import { AppSettings } from '../../types';
import { OFFICIAL_USD_RATE } from '../../constants';

interface MarketPulseProps {
  settings: AppSettings;
  formatNumber: (n: number) => string;
}

const MarketPulse: React.FC<MarketPulseProps> = ({ settings, formatNumber }) => {
  return (
    <div className="glass p-8 rounded-[2.5rem] border border-white/10 space-y-8 shadow-2xl relative overflow-hidden group">
      <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 blur-[60px] rounded-full -mr-16 -mt-16 group-hover:bg-emerald-500/10 transition-colors" />
      
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 flex items-center justify-center border border-emerald-500/20">
            <Shield className="text-emerald-400" size={24} />
          </div>
          <h3 className="text-2xl font-black">حالة الاستقرار المالي</h3>
        </div>
        <div className="px-4 py-2 rounded-full bg-emerald-500/10 text-emerald-400 text-[10px] font-black flex items-center gap-3 border border-emerald-500/20">
          <Activity size={14} className="animate-pulse" />
          مستقر جداً
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div className="p-5 bg-emerald-500/5 rounded-3xl border border-emerald-500/10 space-y-1">
           <p className="text-[10px] text-gray-500 font-black uppercase tracking-widest">معامل التحويل الداخلي</p>
           <div className="text-2xl font-black flex items-center gap-2">
             1 <span className="text-xs opacity-40">:</span> {formatNumber(settings.conversionFactor)}
           </div>
        </div>
        
        <div className="p-5 bg-amber-500/5 rounded-3xl border border-amber-500/10 space-y-1">
           <p className="text-[10px] text-gray-500 font-black uppercase tracking-widest">السعر الرسمي للدولار</p>
           <div className="text-2xl font-black flex items-center gap-2 text-amber-500">
             <DollarSign size={18} /> {formatNumber(OFFICIAL_USD_RATE)} <span className="text-xs opacity-60">ل.س</span>
           </div>
        </div>
      </div>

      <div className="p-5 bg-white/5 rounded-3xl border border-white/10 space-y-3">
        <div className="flex items-center gap-2 text-[10px] font-black text-emerald-400 uppercase tracking-widest">
          <CheckCircle2 size={16} />
          بروتوكول 2026 نشط ومحمي
        </div>
        <p className="text-xs text-gray-500 leading-relaxed font-medium">
          تم تثبيت الأسعار لضمان استقرار القدرة الشرائية للمواطنين ومنع التلاعب في مرحلة التحول النقدي الكبرى.
        </p>
      </div>
    </div>
  );
};

export default MarketPulse;
