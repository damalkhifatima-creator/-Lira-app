
import React, { useState, useMemo } from 'react';
import { Download, Trash2, Plus, Minus, Info, ShieldCheck, Printer, Calculator as CalcIcon, Wallet, TrendingUp } from 'lucide-react';
import { AppSettings, User } from '../../types';
import { DENOMINATIONS, OFFICIAL_USD_RATE } from '../../constants';

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
  const totalUsd = totalNew / OFFICIAL_USD_RATE;

  const updateCount = (den: number, delta: number) => {
    setCounts(prev => ({ ...prev, [den]: Math.max(0, prev[den] + delta) }));
  };

  const handleManualInput = (den: number, val: string) => {
    const num = parseInt(val) || 0;
    setCounts(prev => ({ ...prev, [den]: Math.max(0, num) }));
  };

  return (
    <div className="max-w-6xl mx-auto space-y-12 pb-32">
      {/* Official Printable Report Design */}
      <div className="hidden print:block p-12 bg-white text-[#0f172a] font-cairo min-h-screen relative border-[16px] border-[#f1f5f9]">
         <div className="flex justify-between items-start border-b-8 border-emerald-500 pb-10 mb-10">
            <div className="flex items-center gap-6">
               <div className="w-20 h-20 bg-emerald-500 rounded-2xl flex items-center justify-center shadow-xl">
                  <ShieldCheck className="text-white" size={40} />
               </div>
               <div>
                  <h1 className="text-3xl font-black">{settings.siteName}</h1>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Official Audit Report 2026</p>
               </div>
            </div>
            <div className="text-left space-y-1">
               <p className="text-xs font-black text-slate-500 uppercase">Report ID: {Math.random().toString(36).substring(7).toUpperCase()}</p>
               <p className="text-xs font-bold">{new Date().toLocaleString('ar-SY')}</p>
            </div>
         </div>

         {user && (
           <div className="bg-slate-50 p-6 rounded-3xl border border-slate-200 mb-8 flex items-center justify-between">
              <div className="flex items-center gap-4">
                 <div className="w-16 h-16 rounded-full border-2 border-white shadow-md overflow-hidden bg-slate-200">
                    {user.photoUrl && <img src={user.photoUrl} className="w-full h-full object-cover" />}
                 </div>
                 <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase">Account Holder</p>
                    <p className="text-xl font-black">{user.name}</p>
                 </div>
              </div>
              <div className="text-center">
                 <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Account ID</p>
                 <p className="text-2xl font-mono font-black text-emerald-600">#{user.accountNumber}</p>
              </div>
           </div>
         )}

         <table className="w-full mb-12">
            <thead className="bg-[#0f172a] text-white">
               <tr>
                  <th className="p-4 text-right">الفئة النقدية</th>
                  <th className="p-4 text-center">الكمية</th>
                  <th className="p-4 text-left">الإجمالي</th>
               </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
               {DENOMINATIONS.map(den => counts[den] > 0 && (
                 <tr key={den}>
                    <td className="p-4 text-right font-bold">{formatNumber(den)} ل.س جديدة</td>
                    <td className="p-4 text-center font-mono">{formatNumber(counts[den])}</td>
                    <td className="p-4 text-left font-black">{formatNumber(den * counts[den])} ل.س</td>
                 </tr>
               ))}
            </tbody>
            <tfoot>
               <tr className="bg-slate-900 text-white font-black">
                  <td colSpan={2} className="p-6 text-right text-lg">الإجمالي (الليرة الجديدة)</td>
                  <td className="p-6 text-left text-2xl">{formatNumber(totalNew)} ل.س</td>
               </tr>
               <tr className="bg-emerald-600 text-white font-black">
                  <td colSpan={2} className="p-6 text-right text-lg">المقابل بالدولار (سعر رسمي: {OFFICIAL_USD_RATE})</td>
                  <td className="p-6 text-left text-2xl">$ {formatNumber(Number(totalUsd.toFixed(2)))}</td>
               </tr>
            </tfoot>
         </table>

         <div className="pt-8 border-t border-slate-200 flex justify-between items-center opacity-50">
            <p className="text-xs font-bold">تم التدقيق آلياً - نظام خبير العملة 2026</p>
            <ShieldCheck size={24} />
         </div>
      </div>

      {/* Main UI */}
      <div className="flex flex-col md:flex-row items-center justify-between no-print gap-8 animate-in fade-in duration-700">
        <div className="text-center md:text-right space-y-2">
          <h2 className="text-4xl md:text-5xl font-black text-glow">مركز التقييم المركزي</h2>
          <p className="text-gray-400 font-bold">جرد مقتنياتك النقدية وتحويلها لقيم دولية معتمدة.</p>
        </div>
        <button 
          onClick={() => setCounts(DENOMINATIONS.reduce((a, d) => ({ ...a, [d]: 0 }), {}))}
          className="p-5 glass rounded-3xl text-red-400 hover:bg-red-500/10 transition-all shadow-xl hover:scale-105"
        >
          <Trash2 size={28} />
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 no-print">
        <div className="space-y-4 animate-in slide-in-from-right duration-700">
          {DENOMINATIONS.map((den) => (
            <div key={den} className="glass p-5 rounded-[2rem] flex items-center justify-between border border-white/5 hover:border-emerald-500/30 transition-all group">
               <div className="flex items-center gap-5">
                  <div className="w-20 h-14 emerald-gradient rounded-2xl flex items-center justify-center font-black text-xl text-white shadow-lg group-hover:scale-110 transition-transform">
                    {formatNumber(den)}
                  </div>
                  <div>
                    <p className="font-black text-white">ليرة جديدة</p>
                    <p className="text-[10px] text-emerald-500 font-bold uppercase tracking-widest">Security Ver. 2026</p>
                  </div>
               </div>

               <div className="flex items-center gap-4">
                  <button onClick={() => updateCount(den, -1)} className="w-10 h-10 glass rounded-xl flex items-center justify-center hover:bg-red-500/20 text-red-400 transition-colors"><Minus size={18} /></button>
                  <input 
                    type="number" value={counts[den] || ''} 
                    onChange={(e) => handleManualInput(den, e.target.value)}
                    className="w-16 bg-transparent text-center font-black text-2xl text-emerald-400 focus:outline-none"
                    placeholder="٠"
                  />
                  <button onClick={() => updateCount(den, 1)} className="w-10 h-10 glass rounded-xl flex items-center justify-center hover:bg-emerald-500/20 text-emerald-400 transition-colors"><Plus size={18} /></button>
               </div>
            </div>
          ))}
        </div>

        <div className="space-y-6 sticky top-32 animate-in slide-in-from-left duration-700">
          <div className="glass p-10 rounded-[3rem] border-2 border-emerald-500/30 space-y-10 relative overflow-hidden shadow-2xl">
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-emerald-500/5 blur-[80px] rounded-full" />
            
            <div className="text-center space-y-4">
               <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-500 text-[10px] font-black uppercase tracking-widest border border-emerald-500/20">
                  <TrendingUp size={12} /> القيمة الصافية للجرد
               </span>
               <div className="flex flex-col items-center">
                  <span className="text-7xl font-black text-glow flex items-baseline gap-3">
                    {formatNumber(totalNew)}
                    <span className="text-xl text-emerald-500">ل.س</span>
                  </span>
                  <div className="w-24 h-1 emerald-gradient rounded-full mt-4" />
               </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
               <div className="bg-white/5 p-5 rounded-3xl border border-white/5 space-y-1">
                  <p className="text-[10px] text-gray-500 font-black uppercase">القيمة القديمة</p>
                  <p className="text-xl font-black text-indigo-400">{formatNumber(totalOld)} <span className="text-[10px]">ل.س</span></p>
               </div>
               <div className="bg-white/5 p-5 rounded-3xl border border-white/5 space-y-1">
                  <p className="text-[10px] text-gray-500 font-black uppercase">القيمة بالدولار</p>
                  <p className="text-xl font-black text-emerald-400">$ {formatNumber(Number(totalUsd.toFixed(2)))}</p>
               </div>
            </div>

            <button 
              onClick={() => window.print()}
              disabled={totalNew === 0}
              className="w-full py-5 emerald-gradient rounded-2xl font-black flex items-center justify-center gap-3 shadow-xl hover:scale-105 transition-all disabled:opacity-50 disabled:scale-100"
            >
              <Printer size={20} /> إصدار تقرير تدقيق رسمي
            </button>
          </div>

          <div className="glass p-6 rounded-[2rem] border border-white/5 flex items-center gap-4">
             <div className="w-12 h-12 rounded-xl bg-indigo-500/10 flex items-center justify-center shrink-0">
                <Info className="text-indigo-400" size={20} />
             </div>
             <p className="text-gray-400 text-xs leading-relaxed font-medium">
                تنبيه: التقييم يعتمد على السعر الرسمي الثابت للدولار (1$ = {OFFICIAL_USD_RATE} ل.س جديدة).
             </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ValuationCalculator;
