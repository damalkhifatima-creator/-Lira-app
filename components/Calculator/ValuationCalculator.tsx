
import React, { useState, useMemo } from 'react';
import { Calculator, Download, Trash2, Plus, Minus, Info, User as UserIcon } from 'lucide-react';
import { AppSettings, User } from '../../types';
import { DENOMINATIONS } from '../../constants';

interface ValuationCalculatorProps {
  settings: AppSettings;
  formatNumber: (n: number) => string;
  user: User | null;
}

const ValuationCalculator: React.FC<ValuationCalculatorProps> = ({ settings, formatNumber, user }) => {
  const [counts, setCounts] = useState<Record<number, number>>(
    DENOMINATIONS.reduce((acc, den) => ({ ...acc, [den]: 0 }), {} as Record<number, number>)
  );

  const totalNew = useMemo(() => {
    return Object.entries(counts).reduce((sum: number, [den, count]: [string, number]) => sum + (Number(den) * count), 0);
  }, [counts]);

  const totalOld = totalNew * settings.conversionFactor;

  const updateCount = (den: number, delta: number) => {
    setCounts(prev => ({ ...prev, [den]: Math.max(0, prev[den] + delta) }));
  };

  const handleManualInput = (den: number, val: string) => {
    const num = parseInt(val) || 0;
    setCounts(prev => ({ ...prev, [den]: Math.max(0, num) }));
  };

  const reset = () => {
    setCounts(DENOMINATIONS.reduce((acc, den) => ({ ...acc, [den]: 0 }), {} as Record<number, number>));
  };

  const exportPDF = () => {
    window.print();
  };

  const getLogoShapeClass = () => {
    switch (settings.logoShape) {
      case 'circle': return 'rounded-full';
      case 'square': return 'rounded-lg';
      case 'rectangle': return 'rounded-md';
      default: return 'rounded-xl';
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Printable Report Header - Hidden by default */}
      <div className="hidden print:block mb-8 space-y-6">
        <div className="flex justify-between items-center border-b-2 border-emerald-500 pb-6">
          <div className="flex items-center gap-4">
            {settings.logoUrl && (
                <div className={`overflow-hidden flex items-center justify-center border border-gray-200 ${getLogoShapeClass()}`} style={{ width: settings.logoSize, height: settings.logoShape === 'rectangle' ? 'auto' : settings.logoSize }}>
                    <img src={settings.logoUrl} className="max-w-full max-h-full" style={{ width: settings.logoSize }} alt="Logo" />
                </div>
            )}
            <div>
              <h1 className="text-2xl font-black text-slate-900">{settings.siteName}</h1>
              <p className="text-sm text-gray-600">تقرير جرد مالي رسمي - عام 2026</p>
            </div>
          </div>
          <div className="text-left">
            <p className="text-xs text-gray-500">التاريخ: {new Date().toLocaleDateString('ar-SY')}</p>
          </div>
        </div>

        {user && (
          <div className="bg-gray-50 p-4 rounded-xl flex items-center gap-4 border">
            {user.photoUrl && <img src={user.photoUrl} className="w-12 h-12 rounded-full border" />}
            <div>
              <p className="text-xs text-gray-500">اسم المدقق</p>
              <p className="font-bold">{user.name}</p>
            </div>
          </div>
        )}
      </div>

      <div className="flex items-center justify-between no-print">
        <div>
          <h2 className="text-3xl font-black mb-2">حاسبة التدقيق والتقييم</h2>
          <p className="text-gray-400">أدخل عدد الأوراق النقدية التي تملكها من كل فئة.</p>
        </div>
        <button 
          onClick={reset}
          className="p-3 glass rounded-xl text-red-400 hover:bg-red-500/10 transition-colors"
        >
          <Trash2 size={24} />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-4 no-print">
          {DENOMINATIONS.map((den) => (
            <div key={den} className="glass p-4 rounded-2xl flex items-center justify-between border border-white/5 hover:border-emerald-500/30 transition-all group">
              <div className="flex items-center gap-4">
                <div className="w-16 h-10 bg-emerald-500/10 rounded-lg flex items-center justify-center text-emerald-400 font-bold border border-emerald-500/20">
                  {formatNumber(den)}
                </div>
                <div className="text-sm font-bold text-gray-300">ليرة جديدة</div>
              </div>
              
              <div className="flex items-center gap-3">
                <button onClick={() => updateCount(den, -1)} className="p-2 glass rounded-lg"><Minus size={16} /></button>
                <input 
                  type="number"
                  value={counts[den] || ''}
                  onChange={(e) => handleManualInput(den, e.target.value)}
                  className="w-16 bg-transparent text-center font-bold text-xl focus:outline-none"
                  placeholder="0"
                />
                <button onClick={() => updateCount(den, 1)} className="p-2 glass rounded-lg text-emerald-400"><Plus size={16} /></button>
              </div>
            </div>
          ))}
        </div>

        {/* Breakdown for Print */}
        <div className="hidden print:block print:w-full">
           <table className="w-full border-collapse">
              <thead>
                <tr className="bg-emerald-50">
                  <th className="border p-2 text-right">الفئة</th>
                  <th className="border p-2 text-center">العدد</th>
                  <th className="border p-2 text-left">المجموع</th>
                </tr>
              </thead>
              <tbody>
                {DENOMINATIONS.map(den => (
                  <tr key={den}>
                    <td className="border p-2">{formatNumber(den)} ليرة</td>
                    <td className="border p-2 text-center">{formatNumber(counts[den])}</td>
                    <td className="border p-2 text-left">{formatNumber(den * counts[den])} ل.س</td>
                  </tr>
                ))}
              </tbody>
           </table>
        </div>

        <div className="space-y-6 h-fit sticky top-28">
          <div className="glass p-8 rounded-3xl border-2 border-emerald-500/20 space-y-8 relative overflow-hidden group print:border-slate-300 print:text-slate-900">
            <div className="text-center space-y-2">
              <div className="text-gray-400 text-sm font-bold uppercase tracking-widest print:text-gray-600">إجمالي المبلغ بالجديد</div>
              <div className="text-5xl font-black text-emerald-400 print:text-emerald-700 flex items-baseline justify-center gap-2">
                {formatNumber(totalNew)}
                <span className="text-xl">ل.س</span>
              </div>
            </div>

            <div className="space-y-4 pt-8 border-t border-white/10 print:border-slate-300">
              <div className="flex justify-between items-center">
                <span className="text-gray-400 text-sm print:text-gray-600">بالليرة القديمة</span>
                <span className="font-bold text-lg">{formatNumber(totalOld)} ل.س</span>
              </div>
            </div>

            <button 
              onClick={exportPDF}
              className="w-full py-4 emerald-gradient rounded-2xl flex items-center justify-center gap-3 font-bold text-white shadow-xl no-print"
            >
              <Download size={20} />
              تصدير تقرير مفصل
            </button>
          </div>

          <div className="glass p-6 rounded-2xl flex items-start gap-4 no-print">
            <Info className="text-indigo-400 shrink-0 mt-1" size={20} />
            <p className="text-xs text-gray-400 leading-relaxed">
              هذا التقرير مخصص لغايات الجرد الشخصي. نظام 2026 يضمن دقة التحويل بناءً على معامل {settings.conversionFactor}:1 المعتمد.
            </p>
          </div>
        </div>
      </div>

      <style>{`
        @media print {
          .no-print { display: none !important; }
          body { background: white !important; color: black !important; }
          .glass { backdrop-filter: none !important; border-color: #eee !important; background: white !important; }
          .emerald-gradient { background: #10b981 !important; color: white !important; }
        }
      `}</style>
    </div>
  );
};

export default ValuationCalculator;
