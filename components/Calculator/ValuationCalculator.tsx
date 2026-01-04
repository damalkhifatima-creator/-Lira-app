
import React, { useState, useMemo } from 'react';
import { Download, Trash2, Plus, Minus, Info } from 'lucide-react';
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
    <div className="max-w-4xl mx-auto space-y-8 pb-12">
      {/* Printable Report Header */}
      <div className="hidden print:block mb-8 space-y-8 text-slate-900 bg-white p-8 border-2 border-slate-100 rounded-3xl">
        <div className="flex justify-between items-center border-b-2 border-emerald-500 pb-8">
          <div className="flex items-center gap-6">
            {settings.logoUrl && (
                <div className={`overflow-hidden flex items-center justify-center border border-slate-200 ${getLogoShapeClass()}`} style={{ width: settings.logoSize * 1.5, height: settings.logoShape === 'rectangle' ? 'auto' : settings.logoSize * 1.5 }}>
                    <img src={settings.logoUrl} className="max-w-full max-h-full" style={{ width: settings.logoSize * 1.5 }} alt="Logo" />
                </div>
            )}
            <div>
              <h1 className="text-3xl font-black">{settings.siteName}</h1>
              <p className="text-sm text-slate-500 font-bold">تقرير جرد مالي رسمي - نظام الانتقال النقدي 2026</p>
            </div>
          </div>
          <div className="text-left font-mono">
            <p className="text-xs text-slate-400">التاريخ: {new Date().toLocaleDateString('ar-SY')}</p>
            <p className="text-xs text-slate-400">الرقم المرجعي: SYR-{Math.floor(Math.random() * 999999)}</p>
          </div>
        </div>

        {user && (
          <div className="bg-slate-50 p-6 rounded-2xl flex items-center justify-between border border-slate-200">
            <div className="flex items-center gap-6">
              {user.photoUrl && <img src={user.photoUrl} className="w-16 h-16 rounded-full border-2 border-white shadow-sm" />}
              <div>
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">اسم المدقق المالي</p>
                <p className="text-xl font-black">{user.name}</p>
              </div>
            </div>
            <div className="text-left bg-white px-4 py-2 rounded-xl border border-slate-200 shadow-sm">
                <p className="text-[8px] text-slate-400 font-black uppercase tracking-widest mb-1">رقم الحساب</p>
                <p className="text-lg font-mono font-black text-emerald-600">#{user.accountNumber}</p>
            </div>
          </div>
        )}

        <div className="space-y-4">
           <h3 className="text-lg font-black border-r-4 border-emerald-500 pr-3">تفاصيل الجرد النقدية</h3>
           <table className="w-full border-collapse">
              <thead>
                <tr className="bg-slate-100">
                  <th className="border p-3 text-right text-xs uppercase text-slate-500 font-bold">الفئة النقدية</th>
                  <th className="border p-3 text-center text-xs uppercase text-slate-500 font-bold">الكمية (ورقة)</th>
                  <th className="border p-3 text-left text-xs uppercase text-slate-500 font-bold">المجموع (جديد)</th>
                </tr>
              </thead>
              <tbody>
                {DENOMINATIONS.map(den => (
                  <tr key={den} className={counts[den] > 0 ? 'bg-emerald-50/30' : ''}>
                    <td className="border p-3 font-bold">{formatNumber(den)} ليرة</td>
                    <td className="border p-3 text-center font-mono">{formatNumber(counts[den])}</td>
                    <td className="border p-3 text-left font-black">{formatNumber(den * counts[den])} ل.س</td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="bg-slate-900 text-white">
                  <td colSpan={2} className="p-4 text-right font-black">الإجمالي النهائي بالليرة الجديدة</td>
                  <td className="p-4 text-left text-2xl font-black">{formatNumber(totalNew)} ل.س</td>
                </tr>
                <tr className="bg-emerald-500 text-white">
                  <td colSpan={2} className="p-4 text-right font-black">ما يعادلها بالليرة القديمة</td>
                  <td className="p-4 text-left text-xl font-black">{formatNumber(totalOld)} ل.س</td>
                </tr>
              </tfoot>
           </table>
        </div>

        <div className="pt-10 border-t border-slate-100 text-center">
            <p className="text-[10px] text-slate-400">هذا التقرير تم إنتاجه آلياً عبر نظام {settings.siteName} لعام 2026. يخضع للتدقيق الرسمي عند الحاجة.</p>
        </div>
      </div>

      <div className="flex items-center justify-between no-print">
        <div>
          <h2 className="text-3xl font-black mb-2">حاسبة التدقيق والتقييم</h2>
          <p className="text-gray-400 text-sm">أدخل عدد الأوراق النقدية التي تملكها من كل فئة.</p>
        </div>
        <button 
          onClick={reset}
          className="p-3 glass rounded-xl text-red-400 hover:bg-red-500/10 transition-colors"
          title="تصفير الحقول"
        >
          <Trash2 size={24} />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 no-print">
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
                <button onClick={() => updateCount(den, -1)} className="p-2 glass rounded-lg hover:bg-white/10 transition-colors"><Minus size={16} /></button>
                <input 
                  type="number"
                  value={counts[den] || ''}
                  onChange={(e) => handleManualInput(den, e.target.value)}
                  className="w-16 bg-transparent text-center font-bold text-xl focus:outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                  placeholder="0"
                />
                <button onClick={() => updateCount(den, 1)} className="p-2 glass rounded-lg text-emerald-400 hover:bg-emerald-500/20 transition-colors"><Plus size={16} /></button>
              </div>
            </div>
          ))}
        </div>

        <div className="space-y-6 h-fit sticky top-28">
          <div className="glass p-8 rounded-3xl border-2 border-emerald-500/20 space-y-8 relative overflow-hidden group">
            <div className="text-center space-y-2">
              <div className="text-gray-400 text-xs font-bold uppercase tracking-widest">إجمالي المبلغ بالجديد</div>
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
            </div>

            <button 
              onClick={exportPDF}
              disabled={totalNew === 0}
              className="w-full py-4 emerald-gradient rounded-2xl flex items-center justify-center gap-3 font-black text-white shadow-xl hover:scale-105 transition-transform disabled:opacity-50 disabled:scale-100"
            >
              <Download size={20} />
              تصدير تقرير PDF
            </button>
          </div>

          <div className="glass p-6 rounded-2xl flex items-start gap-4">
            <Info className="text-emerald-400 shrink-0 mt-1" size={20} />
            <p className="text-xs text-gray-400 leading-relaxed">
              هذا التقرير مخصص لغايات الجرد الشخصي. نظام 2026 يضمن دقة التحويل بناءً على معامل {settings.conversionFactor}:1 المعتمد رسمياً.
            </p>
          </div>
        </div>
      </div>

      <style>{`
        @media print {
          @page { margin: 1cm; size: A4; }
          .no-print { display: none !important; }
          body { background: white !important; color: black !important; -webkit-print-color-adjust: exact; }
          #root > div { background: white !important; padding: 0 !important; }
        }
      `}</style>
    </div>
  );
};

export default ValuationCalculator;
