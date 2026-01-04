
import React, { useState, useMemo } from 'react';
// Added Calculator to the imported icons
import { Download, Trash2, Plus, Minus, Info, ShieldCheck, Printer, Calculator } from 'lucide-react';
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
      case 'square': return 'rounded-xl';
      case 'rectangle': return 'rounded-lg';
      default: return 'rounded-xl';
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-12">
      {/* Enhanced Printable Official Report */}
      <div className="hidden print:block p-10 bg-white text-slate-900 min-h-[297mm] border-[12px] border-slate-50 relative overflow-hidden">
        {/* Background Watermark */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.03] rotate-[-35deg] pointer-events-none select-none">
           <h1 className="text-9xl font-black whitespace-nowrap">OFFICIAL REPORT 2026</h1>
        </div>

        {/* Header */}
        <div className="flex justify-between items-start border-b-4 border-emerald-500 pb-10 mb-10">
          <div className="flex items-center gap-8">
            {settings.logoUrl ? (
                <div className={`overflow-hidden flex items-center justify-center border-2 border-slate-100 bg-slate-50 shadow-sm ${getLogoShapeClass()}`} 
                     style={{ width: settings.logoSize * 1.8, height: settings.logoShape === 'rectangle' ? 'auto' : settings.logoSize * 1.8 }}>
                    <img src={settings.logoUrl} className="max-w-full max-h-full p-2" alt="Official Logo" />
                </div>
            ) : (
                <div className="w-20 h-20 bg-emerald-500 rounded-2xl flex items-center justify-center shadow-lg">
                    <ShieldCheck className="text-white" size={40} />
                </div>
            )}
            <div className="space-y-1">
              <h1 className="text-4xl font-black tracking-tight">{settings.siteName}</h1>
              <p className="text-sm font-bold text-slate-500 uppercase tracking-widest">المختبر المركزي للسياسات النقدية 2026</p>
              <div className="flex items-center gap-2 text-[10px] text-emerald-600 font-bold bg-emerald-50 px-2 py-1 rounded-md w-fit">
                 <ShieldCheck size={12} />
                 نظام جرد مالي مشفر ومعتمد
              </div>
            </div>
          </div>
          <div className="text-left font-mono space-y-1">
            <p className="text-[10px] text-slate-400 font-bold uppercase">Report Metadata</p>
            <p className="text-xs text-slate-600">التاريخ: {new Date().toLocaleDateString('ar-SY')}</p>
            <p className="text-xs text-slate-600">الوقت: {new Date().toLocaleTimeString('ar-SY')}</p>
            <p className="text-xs text-emerald-600 font-black">ID: SYR-{Math.floor(100000 + Math.random() * 900000)}</p>
          </div>
        </div>

        {/* User Context */}
        {user && (
          <div className="grid grid-cols-3 gap-6 mb-10">
            <div className="col-span-2 bg-slate-50 p-6 rounded-[2rem] flex items-center gap-6 border border-slate-200">
               <div className="w-20 h-20 rounded-full border-4 border-white shadow-md overflow-hidden bg-white">
                  {user.photoUrl ? <img src={user.photoUrl} className="w-full h-full object-cover" /> : <div className="w-full h-full bg-slate-200" />}
               </div>
               <div className="space-y-1">
                  <p className="text-[9px] text-slate-400 font-black uppercase tracking-widest">Authorized Personnel</p>
                  <p className="text-2xl font-black">{user.name}</p>
                  <p className="text-xs text-slate-500 font-medium">مواطن مسجل في السجل المالي الذكي</p>
               </div>
            </div>
            <div className="bg-emerald-500 p-6 rounded-[2rem] text-white flex flex-col justify-center items-center shadow-xl shadow-emerald-500/20">
               <p className="text-[9px] font-black uppercase tracking-[0.2em] mb-2 opacity-80">Account Number</p>
               <p className="text-3xl font-mono font-black">#{user.accountNumber}</p>
            </div>
          </div>
        )}

        {/* Financial Breakdown Table */}
        <div className="space-y-6 mb-12">
           <div className="flex items-center justify-between">
              <h3 className="text-xl font-black flex items-center gap-3">
                 <div className="w-2 h-8 bg-emerald-500 rounded-full" />
                 تفاصيل الجرد النقدية (Inventory Details)
              </h3>
              <div className="text-[10px] font-bold text-slate-400 italic">معامل التحويل المعتمد: 1:{settings.conversionFactor}</div>
           </div>
           <table className="w-full border-collapse">
              <thead>
                <tr className="bg-slate-900 text-white">
                  <th className="p-4 text-right text-xs font-black uppercase rounded-tr-2xl">الفئة النقدية</th>
                  <th className="p-4 text-center text-xs font-black uppercase">الكمية (ورقة)</th>
                  <th className="p-4 text-left text-xs font-black uppercase rounded-tl-2xl">المجموع الجزئي</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {DENOMINATIONS.map(den => (
                  <tr key={den} className={counts[den] > 0 ? 'bg-emerald-50/20' : ''}>
                    <td className="p-4 text-right">
                       <span className="font-black text-lg">{formatNumber(den)}</span>
                       <span className="text-xs text-slate-400 mr-2">ليرة جديدة</span>
                    </td>
                    <td className="p-4 text-center">
                       <span className="font-mono text-lg font-bold">{formatNumber(counts[den])}</span>
                    </td>
                    <td className="p-4 text-left">
                       <span className="font-black text-lg text-emerald-700">{formatNumber(den * counts[den])}</span>
                       <span className="text-[10px] text-slate-400 ml-1">ل.س</span>
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot className="border-t-4 border-slate-900">
                <tr className="bg-slate-50">
                  <td colSpan={2} className="p-6 text-right font-black text-slate-600">الإجمالي النهائي بالليرة الجديدة</td>
                  <td className="p-6 text-left text-3xl font-black text-slate-900">{formatNumber(totalNew)} <span className="text-sm">ل.س</span></td>
                </tr>
                <tr className="bg-emerald-600 text-white">
                  <td colSpan={2} className="p-6 text-right font-black">القيمة المقابلة بالليرة السورية القديمة</td>
                  <td className="p-6 text-left text-2xl font-black">{formatNumber(totalOld)} <span className="text-sm">ل.س</span></td>
                </tr>
              </tfoot>
           </table>
        </div>

        {/* Verification Footer */}
        <div className="grid grid-cols-2 gap-12 pt-10">
           <div className="space-y-6">
              <div className="p-4 border-2 border-dashed border-slate-200 rounded-2xl">
                 <p className="text-[10px] text-slate-400 font-bold mb-4 uppercase">Security Verification Stamp</p>
                 <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-full border-4 border-emerald-500/30 flex items-center justify-center rotate-[-15deg]">
                       <ShieldCheck className="text-emerald-500/50" size={32} />
                    </div>
                    <div className="space-y-1">
                       <p className="text-[9px] font-black text-slate-700">VERIFIED BY SYR-2026</p>
                       <p className="text-[8px] text-slate-400">Digital Signature Hash: {Math.random().toString(36).substring(7).toUpperCase()}</p>
                    </div>
                 </div>
              </div>
              <p className="text-[10px] text-slate-400 leading-relaxed italic">
                 * تم إصدار هذا المستند عبر المنصة الرسمية لخبير العملة السورية. المعلومات الواردة فيه دقيقة بناءً على المدخلات المقدمة من قبل المستخدم المسجل.
              </p>
           </div>
           
           <div className="flex flex-col justify-end items-center space-y-4">
              <div className="w-48 h-px bg-slate-300" />
              <p className="text-xs font-black text-slate-700">توقيع الموّظف المسؤول / صاحب الحساب</p>
           </div>
        </div>

        <div className="absolute bottom-6 left-10 right-10 flex justify-between items-center text-[9px] text-slate-400 font-bold uppercase tracking-widest border-t pt-4">
           <span>{settings.siteName} - Future Finance</span>
           <span>Page 01 of 01</span>
           <span>Confidential Financial Data</span>
        </div>
      </div>

      {/* Main UI View */}
      <div className="flex items-center justify-between no-print">
        <div className="animate-in fade-in slide-in-from-right duration-500">
          <h2 className="text-3xl font-black mb-2 flex items-center gap-3">
            <Calculator className="text-emerald-400" />
            حاسبة التدقيق والتقييم
          </h2>
          <p className="text-gray-400 text-sm">أدخل عدد الأوراق النقدية التي تملكها من كل فئة للتحقق من قيمتها المحدثة.</p>
        </div>
        <button 
          onClick={reset}
          className="p-4 glass rounded-2xl text-red-400 hover:bg-red-500/10 transition-all active:scale-90"
          title="تصفير الحقول"
        >
          <Trash2 size={24} />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 no-print">
        <div className="space-y-4 animate-in fade-in slide-in-from-right duration-700">
          {DENOMINATIONS.map((den) => (
            <div key={den} className="glass p-5 rounded-3xl flex items-center justify-between border border-white/5 hover:border-emerald-500/30 transition-all group relative overflow-hidden">
              <div className="flex items-center gap-5">
                <div className="w-20 h-12 emerald-gradient rounded-xl flex items-center justify-center text-white font-black text-lg shadow-lg shadow-emerald-500/10">
                  {formatNumber(den)}
                </div>
                <div>
                  <div className="text-sm font-black text-gray-200">ليرة سورية</div>
                  <div className="text-[10px] text-emerald-500 font-bold">إصدار 2026 الجديد</div>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <button onClick={() => updateCount(den, -1)} className="p-3 glass rounded-xl hover:bg-white/10 transition-colors active:scale-90"><Minus size={18} /></button>
                <input 
                  type="number"
                  value={counts[den] || ''}
                  onChange={(e) => handleManualInput(den, e.target.value)}
                  className="w-20 bg-transparent text-center font-black text-2xl focus:outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none text-emerald-400"
                  placeholder="0"
                />
                <button onClick={() => updateCount(den, 1)} className="p-3 glass rounded-xl text-emerald-400 hover:bg-emerald-500/20 transition-colors active:scale-90"><Plus size={18} /></button>
              </div>
            </div>
          ))}
        </div>

        <div className="space-y-6 h-fit sticky top-28 animate-in fade-in slide-in-from-left duration-700">
          <div className="glass p-10 rounded-[2.5rem] border-2 border-emerald-500/20 space-y-10 relative overflow-hidden group shadow-2xl">
            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 blur-3xl rounded-full" />
            
            <div className="text-center space-y-4">
              <div className="text-gray-400 text-xs font-black uppercase tracking-[0.3em]">Total Balance (New)</div>
              <div className="text-6xl font-black text-white flex items-baseline justify-center gap-3">
                {formatNumber(totalNew)}
                <span className="text-xl text-emerald-500">ل.س</span>
              </div>
            </div>

            <div className="space-y-5 pt-10 border-t border-white/10">
              <div className="flex justify-between items-center bg-white/5 p-4 rounded-2xl">
                <span className="text-gray-400 text-xs font-bold uppercase">Legacy Equivalent</span>
                <span className="font-black text-xl text-indigo-400">{formatNumber(totalOld)} <span className="text-xs">ل.س</span></span>
              </div>
              <div className="flex justify-between items-center px-4">
                <span className="text-gray-500 text-[10px] font-bold">معامل التحويل المعتمد</span>
                <span className="text-xs font-bold text-gray-400">1 : {formatNumber(settings.conversionFactor)}</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <button 
                onClick={exportPDF}
                disabled={totalNew === 0}
                className="col-span-1 py-4 emerald-gradient rounded-2xl flex items-center justify-center gap-3 font-black text-white shadow-xl hover:scale-105 transition-transform disabled:opacity-50 disabled:scale-100 active:scale-95"
              >
                <Printer size={20} />
                طباعة PDF
              </button>
              <button 
                onClick={exportPDF}
                disabled={totalNew === 0}
                className="col-span-1 py-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl flex items-center justify-center gap-3 font-black text-white transition-all disabled:opacity-50 active:scale-95"
              >
                <Download size={20} />
                تصدير ملف
              </button>
            </div>
          </div>

          <div className="glass p-6 rounded-3xl flex items-start gap-5 border border-white/10">
            <div className="p-3 bg-emerald-500/10 rounded-2xl">
              <Info className="text-emerald-400 shrink-0" size={24} />
            </div>
            <div className="space-y-1">
              <h4 className="font-bold text-sm">ملاحظة تقنية</h4>
              <p className="text-[11px] text-gray-400 leading-relaxed">
                يتم حساب القيم بناءً على المعايير المصرفية الرسمية لعام 2026. هذا التقرير صالح للتوثيق الشخصي والمؤسساتي المبدئي.
              </p>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media print {
          @page { margin: 0; size: A4 portrait; }
          .no-print { display: none !important; }
          body { 
            background: white !important; 
            color: black !important; 
            margin: 0 !important;
            padding: 0 !important;
            -webkit-print-color-adjust: exact !important; 
            print-color-adjust: exact !important;
          }
          #root { width: 100% !important; padding: 0 !important; margin: 0 !important; }
          .container { width: 100% !important; max-width: none !important; padding: 0 !important; margin: 0 !important; }
          .animated-bg { display: none !important; }
          main { padding-top: 0 !important; }
          header { display: none !important; }
        }
      `}</style>
    </div>
  );
};

export default ValuationCalculator;
