
import React, { useState, useMemo } from 'react';
// Added Info icon to the imports
import { Calculator, Download, Trash2, Plus, Minus, FileText, Info } from 'lucide-react';
import { AppSettings } from '../../types';
import { DENOMINATIONS } from '../../constants';

interface ValuationCalculatorProps {
  settings: AppSettings;
  formatNumber: (n: number) => string;
}

const ValuationCalculator: React.FC<ValuationCalculatorProps> = ({ settings, formatNumber }) => {
  const [counts, setCounts] = useState<Record<number, number>>(
    DENOMINATIONS.reduce((acc, den) => ({ ...acc, [den]: 0 }), {})
  );

  const totalNew = useMemo(() => {
    return Object.entries(counts).reduce((sum, [den, count]) => sum + (Number(den) * count), 0);
  }, [counts]);

  const totalOld = totalNew * settings.conversionFactor;
  const totalUsd = totalNew / settings.usdRate;

  const updateCount = (den: number, delta: number) => {
    setCounts(prev => ({
      ...prev,
      [den]: Math.max(0, prev[den] + delta)
    }));
  };

  const handleManualInput = (den: number, val: string) => {
    const num = parseInt(val) || 0;
    setCounts(prev => ({ ...prev, [den]: Math.max(0, num) }));
  };

  const reset = () => {
    setCounts(DENOMINATIONS.reduce((acc, den) => ({ ...acc, [den]: 0 }), {}));
  };

  const exportPDF = () => {
    // Basic implementation of printing view
    window.print();
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-black mb-2">حاسبة التدقيق والتقييم</h2>
          <p className="text-gray-400">أدخل عدد الأوراق النقدية التي تملكها من كل فئة.</p>
        </div>
        <button 
          onClick={reset}
          className="p-3 glass rounded-xl text-red-400 hover:bg-red-500/10 transition-colors"
          title="تصفير الحقول"
        >
          <Trash2 size={24} />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-4">
          {DENOMINATIONS.map((den) => (
            <div key={den} className="glass p-4 rounded-2xl flex items-center justify-between border border-white/5 hover:border-emerald-500/30 transition-all group">
              <div className="flex items-center gap-4">
                <div className="w-16 h-10 bg-emerald-500/10 rounded-lg flex items-center justify-center text-emerald-400 font-bold border border-emerald-500/20">
                  {formatNumber(den)}
                </div>
                <div className="text-sm font-bold text-gray-300">ليرة جديدة</div>
              </div>
              
              <div className="flex items-center gap-3">
                <button 
                  onClick={() => updateCount(den, -1)}
                  className="p-2 glass rounded-lg hover:bg-white/10 transition-colors"
                >
                  <Minus size={16} />
                </button>
                <input 
                  type="number"
                  value={counts[den] || ''}
                  onChange={(e) => handleManualInput(den, e.target.value)}
                  className="w-16 bg-transparent text-center font-bold text-xl focus:outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                  placeholder="0"
                />
                <button 
                  onClick={() => updateCount(den, 1)}
                  className="p-2 glass rounded-lg hover:bg-white/10 transition-colors text-emerald-400"
                >
                  <Plus size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="space-y-6 sticky top-28 h-fit">
          <div className="glass p-8 rounded-3xl border-2 border-emerald-500/20 space-y-8 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 blur-3xl rounded-full group-hover:bg-emerald-500/10 transition-all" />
            
            <div className="text-center space-y-2">
              <div className="text-gray-400 text-sm font-bold uppercase tracking-widest">إجمالي المبلغ بالجديد</div>
              <div className="text-5xl font-black text-emerald-400 flex items-baseline justify-center gap-2">
                {formatNumber(totalNew)}
                <span className="text-xl">ل.س</span>
              </div>
            </div>

            <div className="space-y-4 pt-8 border-t border-white/10">
              <div className="flex justify-between items-center">
                <span className="text-gray-400 text-sm">بالليرة القديمة</span>
                <span className="font-bold text-lg">{formatNumber(totalOld)} ل.س</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400 text-sm">بالدولار الأمريكي</span>
                <span className="font-bold text-lg text-amber-400">{formatNumber(totalUsd)} $</span>
              </div>
            </div>

            <button 
              onClick={exportPDF}
              className="w-full py-4 glass rounded-2xl flex items-center justify-center gap-3 font-bold text-white hover:bg-emerald-500/10 transition-all border border-emerald-500/20 group"
            >
              <Download size={20} className="group-hover:-translate-y-1 transition-transform" />
              تصدير تقرير مفصل
            </button>
          </div>

          <div className="glass p-6 rounded-2xl flex items-start gap-4">
            <Info className="text-indigo-400 shrink-0 mt-1" size={20} />
            <p className="text-xs text-gray-400 leading-relaxed">
              تعتمد هذه الحاسبة معامل تحويل 1:{settings.conversionFactor} وسعر صرف رسمي 1$ = {settings.usdRate} ل.س جديدة. تأكد من دقة الأرقام المدخلة قبل الاعتماد على التقرير.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ValuationCalculator;
