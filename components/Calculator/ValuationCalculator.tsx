
import React, { useState, useMemo } from 'react';
import { Download, Trash2, Plus, Minus, Info, ShieldCheck, Printer, Calculator, Wallet, TrendingUp } from 'lucide-react';
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

  return (
    <div className="max-w-6xl mx-auto space-y-12 pb-32">
      {/* Official Printable Report Design (Hidden in UI) */}
      <div className="hidden print:block p-12 bg-white text-[#0f172a] font-cairo min-h-screen relative border-[16px] border-[#f1f5f9]">
         <div className="flex justify-between items-start border-b-8 border-emerald-500 pb-10 mb-10">
            <div className="flex items-center gap-6">
               <div className="w-24 h-24 bg-emerald-500 rounded-[2rem] flex items-center justify-center shadow-2xl">
                  <ShieldCheck className="text-white" size={48} />
               </div>
               <div className="space-y-1">
                  <h1 className="text-4xl font-black">{settings.siteName}</h1>
                  <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">Official Centralized Report 2026</p>
               </div>
            </div>
            <div className="text-left space-y-2">
               <p className="text-xs font-black text-slate-500 uppercase tracking-tighter">Report ID: SYR-{Math.floor(Math.random() * 900000 + 100000)}</p>
               <p className="text-xs font-bold">{new Date().toLocaleDateString('ar-SY')} | {new Date().toLocaleTimeString('ar-SY')}</p>
            </div>
         </div>

         {user && (
           <div className="bg-slate-50 p-8 rounded-[3rem] border border-slate-200 mb-10 flex items-center justify-between">
              <div className="flex items-center gap-6">
                 <div className="w-20 h-20 rounded-full border-4 border-white shadow-xl overflow-hidden bg-white">
                    {user.photoUrl ? <img src={user.photoUrl} className="w-full h-full object-cover" /> : <div className="w-full h-full bg-slate-200" />}
                 </div>
                 <div className="space-y-1">
                    <p className="text-xs font-black text-slate-400 uppercase">Authorized Citizen</p>
                    <p className="text-3xl font-black">{user.name}</p>
                 </div>
              </div>
              <div className="text-center bg-white px-8 py-4 rounded-[2rem] border border-slate-100 shadow-sm">
                 <p className="text-[10px] font-black text-slate-400 mb-1 uppercase tracking-widest">Account Number</p>
                 <p className="text-3xl font-mono font-black text-emerald-600">#{user.accountNumber}</p>
              </div>
           </div>
         )}

         <div className="space-y-8 mb-16">
            <h3 className="text-2xl font-black flex items-center gap-4">
               <div className="w-3 h-10 bg-emerald-500 rounded-full" />
               تفاصيل الجرد المالي (Financial Inventory)
            </h3>
            <table className="w-full text-lg">
               <thead className="bg-[#0f172a] text-white">
                  <tr>
                     <th className="p-5 text-right rounded-tr-3xl">الفئة النقدية</th>
                     <th className="p-5 text-center">الكمية (ورقة)</th>
                     <th className="p-5 text-left rounded-tl-3xl">الإجمالي الجزئي</th>
                  </tr>
               </thead>
               <tbody className="divide-y-2 divide-slate-100">
                  {DENOMINATIONS.map(den => (
                    <tr key={den} className={counts[den] > 0 ? 'bg-emerald-50' : ''}>
                       <td className="p-5 text-right font-black">{formatNumber(den)} ليرة جديدة</td>
                       <td className="p-5 text-center font-mono font-bold">{formatNumber(counts[den])}</td>
                       <td className="p-5 text-left font-black text-emerald-700">{formatNumber(den * counts[den])} ل.س</td>
                    </tr>
                  ))}
               </tbody>
               <tfoot>
                  <tr className="bg-slate-900 text-white">
                     <td colSpan={2} className="p-8 text-right text-xl font-black rounded-br-3xl">إجمالي الثروة بالليرة الجديدة</td>
                     <td className="p-8 text-left text-4xl font-black rounded-bl-3xl">{formatNumber(totalNew)} <span className="text-sm">L.SN</span></td>
                  </tr>
                  <tr className="bg-emerald-600 text-white">
                     <td colSpan={2} className="p-8 text-right text-xl font-black rounded-br-3xl">القيمة المقابلة بالليرة السورية القديمة</td>
                     <td className="p-8 text-left text-3xl font-black rounded-bl-3xl">{formatNumber(totalOld)} <span className="text-sm">L.SO</span></td>
                  </tr>
               </tfoot>
            </table>
         </div>

         <div className="grid grid-cols-2 gap-12 pt-10 border-t-2 border-slate-100">
            <div className="space-y-4">
               <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest">Verification Status</p>
               <div className="flex items-center gap-4 p-6 bg-slate-50 rounded-[2rem] border border-slate-100">
                  <div className="w-16 h-16 rounded-full border-4 border-emerald-200 flex items-center justify-center rotate-[-15deg]">
                     <ShieldCheck className="text-emerald-500/50" size={32} />
                  </div>
                  <div>
                     <p className="text-[11px] font-black text-emerald-700">CERTIFIED DIGITAL ASSET</p>
                     <p className="text-[9px] text-slate-400">Security Hash: {Math.random().toString(36).substring(7).toUpperCase()}</p>
                  </div>
               </div>
            </div>
            <div className="flex flex-col justify-end items-center">
               <div className="w-64 h-px bg-slate-300 mb-4" />
               <p className="text-sm font-black text-slate-700">توقيع المسؤول / الختم الرسمي</p>
            </div>
         </div>
      </div>

      {/* Main UI */}
      <div className="flex flex-col md:flex-row items-center justify-between no-print gap-8">
        <div className="text-center md:text-right space-y-2">
          <h2 className="text-4xl md:text-5xl font-black text-glow">مركز التقييم المركزي</h2>
          <p className="text-gray-400 font-bold">أدخل جرد مقتنياتك النقدية للحصول على تقرير مالي معتمد.</p>
        </div>
        <button 
          onClick={() => setCounts(DENOMINATIONS.reduce((a, d) => ({ ...a, [d]: 0 }), {}))}
          className="p-5 glass rounded-3xl text-red-400 hover:bg-red-500/10 transition-all shadow-2xl hover:scale-105"
        >
          <Trash2 size={28} />
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 no-print">
        <div className="space-y-5 animate-in slide-in-from-right duration-700">
          {DENOMINATIONS.map((den) => (
            <div key={den} className="glass p-6 rounded-[2.5rem] flex items-center justify-between border border-white/5 hover:border-emerald-500/40 transition-all group relative overflow-hidden">
               <div className="flex items-center gap-6">
                  <div className="w-24 h-16 emerald-gradient rounded-2xl flex items-center justify-center font-black text-2xl text-white shadow-xl group-hover:scale-110 transition-transform">
                    {formatNumber(den)}
                  </div>
                  <div className="space-y-0.5">
                    <p className="text-lg font-black tracking-tight">ليرة سورية</p>
                    <div className="flex items-center gap-2">
                       <ShieldCheck size={12} className="text-emerald-500" />
                       <span className="text-[10px] font-black text-emerald-500 uppercase tracking-widest">Security Ver. 2026</span>
                    </div>
                  </div>
               </div>

               <div className="flex items-center gap-6">
                  <button onClick={() => updateCount(den, -1)} className="w-12 h-12 glass rounded-xl flex items-center justify-center hover:bg-red-500/20 text-red-400 transition-colors"><Minus size={20} /></button>
                  <input 
                    type="number" value={counts[den] || ''} 
                    onChange={(e) => handleManualInput(den, e.target.value)}
                    className="w-24 bg-transparent text-center font-black text-3xl text-emerald-400 focus:outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                    placeholder="٠"
                  />
                  <button onClick={() => updateCount(den, 1)} className="w-12 h-12 glass rounded-xl flex items-center justify-center hover:bg-emerald-500/20 text-emerald-400 transition-colors"><Plus size={20} /></button>
               </div>
            </div>
          ))}
        </div>

        <div className="space-y-8 h-fit sticky top-32 animate-in slide-in-from-left duration-700">
          <div className="glass p-10 md:p-14 rounded-[3.5rem] border-2 border-emerald-500/30 space-y-12 relative overflow-hidden shadow-2xl">
            <div className="absolute -top-10 -right-10 w-48 h-48 bg-emerald-500/10 blur-[100px] rounded-full" />
            
            <div className="text-center space-y-6">
               <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 text-emerald-500 text-[10px] font-black uppercase tracking-widest border border-emerald-500/20">
                  <TrendingUp size={14} /> Total Financial Asset
               </div>
               <div className="flex flex-col items-center">
                  <span className="text-8xl font-black text-glow flex items-baseline gap-4">
                    {formatNumber(totalNew)}
                    <span className="text-2xl text-emerald-500 uppercase">L.SN</span>
                  </span>
                  <div className="w-32 h-1.5 emerald-gradient rounded-full mt-6 shadow-glow" />
               </div>
            </div>

            <div className="space-y-6">
               <div className="bg-white/5 p-6 rounded-[2.5rem] border border-white/5 flex items-center justify-between group hover:border-indigo-500/30 transition-all">
                  <div className="space-y-1">
                     <p className="text-[10px] text-gray-500 font-black uppercase tracking-widest">Legacy Equivalent</p>
                     <p className="text-2xl font-black text-indigo-400">{formatNumber(totalOld)} <span className="text-sm">L.SO</span></p>
                  </div>
                  <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 flex items-center justify-center">
                     <Wallet className="text-indigo-400" />
                  </div>
               </div>

               <div className="flex gap-4">
                  <button 
                    onClick={() => window.print()}
                    disabled={totalNew === 0}
                    className="flex-1 py-5 emerald-gradient rounded-[2rem] font-black flex items-center justify-center gap-3 shadow-xl hover:scale-105 transition-all disabled:opacity-50 active:scale-95"
                  >
                    <Printer size={22} /> تقرير رسمي
                  </button>
                  <button 
                    className="p-5 glass rounded-[2rem] border border-white/10 text-gray-400 hover:text-white transition-all active:scale-95"
                  >
                    <Download size={22} />
                  </button>
               </div>
            </div>
          </div>

          <div className="glass p-8 rounded-[2.5rem] border border-emerald-500/10 flex items-start gap-6">
             <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 flex items-center justify-center shrink-0">
                <Info className="text-emerald-400" size={24} />
             </div>
             <div className="space-y-1">
                <h4 className="font-black text-lg">مذكرة التقنيات النقدية</h4>
                <p className="text-gray-400 text-sm leading-relaxed font-medium">
                  نظام التقييم 2026 يستخدم خوارزميات التدقيق الموحدة الصادرة عن البنك المركزي السوري لضمان دقة التحول المالي.
                </p>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ValuationCalculator;
