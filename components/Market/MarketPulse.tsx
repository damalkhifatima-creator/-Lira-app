
import React from 'react';
import { Activity, CheckCircle2, Shield } from 'lucide-react';
import { AppSettings } from '../../types';

interface MarketPulseProps {
  settings: AppSettings;
  formatNumber: (n: number) => string;
}

const MarketPulse: React.FC<MarketPulseProps> = ({ settings, formatNumber }) => {
  return (
    <div className="glass p-8 rounded-2xl border border-white/10 space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/20 flex items-center justify-center">
            <Shield className="text-emerald-400" />
          </div>
          <h3 className="text-xl font-bold">الحالة النقدية</h3>
        </div>
        <div className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-[10px] font-bold flex items-center gap-2">
          <Activity size={12} className="animate-pulse" />
          مستقر
        </div>
      </div>

      <div className="space-y-4">
        <div className="p-4 bg-emerald-500/5 rounded-xl border border-emerald-500/10">
           <p className="text-xs text-gray-400 mb-2">معامل التحويل الرسمي المعتمد</p>
           <div className="text-3xl font-black">1 : {formatNumber(settings.conversionFactor)}</div>
        </div>
        
        <div className="p-4 bg-white/5 rounded-xl border border-white/10 space-y-2">
          <div className="flex items-center gap-2 text-xs font-bold text-gray-300">
            <CheckCircle2 size={14} className="text-emerald-500" />
            نظام 2026: نشط
          </div>
          <p className="text-[10px] text-gray-500 leading-relaxed">
            تم تثبيت كافة العمليات المالية بالليرة الجديدة لضمان استقرار الأسعار في الأسواق المحلية والحد من التضخم.
          </p>
        </div>
      </div>
    </div>
  );
};

export default MarketPulse;
