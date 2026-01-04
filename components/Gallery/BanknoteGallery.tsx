
import React, { useState } from 'react';
import { Eye, ShieldCheck, ShoppingCart, X } from 'lucide-react';
import { Banknote } from '../../types';

interface BanknoteGalleryProps {
  banknotes: Banknote[];
}

const BanknoteGallery: React.FC<BanknoteGalleryProps> = ({ banknotes }) => {
  const [selectedBanknote, setSelectedBanknote] = useState<Banknote | null>(null);
  const [side, setSide] = useState<'front' | 'back'>('front');

  return (
    <div className="space-y-12 pb-24">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h2 className="text-3xl font-black mb-2">دليل الفئات النقدية الجديدة</h2>
          <p className="text-gray-400">تعرف على التفاصيل الفنية وميزات الأمان لكل ورقة نقدية.</p>
        </div>
        <div className="flex gap-2">
          <div className="px-4 py-2 glass rounded-xl text-xs font-bold text-gray-300">إصدار 2026</div>
          <div className="px-4 py-2 glass rounded-xl text-xs font-bold text-emerald-400 border border-emerald-500/20 italic">High-Security Print</div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {banknotes.map((note) => (
          <div 
            key={note.id}
            className="group glass rounded-3xl overflow-hidden border border-white/10 hover:border-emerald-500/50 transition-all cursor-pointer shadow-xl hover:shadow-emerald-500/10"
            onClick={() => {
              setSelectedBanknote(note);
              setSide('front');
            }}
          >
            <div className="aspect-[2/1] relative overflow-hidden">
              <img 
                src={note.frontImage} 
                alt={note.name} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-80" />
              <div className="absolute bottom-4 right-4 flex items-center gap-2">
                <span className="text-2xl font-black text-white">{note.value}</span>
                <span className="text-xs font-bold text-gray-300">ليرة جديدة</span>
              </div>
              <div className="absolute top-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="p-3 glass rounded-full text-white backdrop-blur-md">
                  <Eye size={20} />
                </div>
              </div>
            </div>
            <div className="p-6 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold">{note.name}</h3>
                <div className="flex gap-1">
                  {[1, 2, 3].map(i => (
                    <div key={i} className="w-1.5 h-1.5 rounded-full bg-emerald-500/40" />
                  ))}
                </div>
              </div>
              <p className="text-sm text-gray-400 line-clamp-2">
                {note.purchasingPower}
              </p>
              <button className="w-full py-3 rounded-xl border border-white/10 group-hover:bg-white/5 transition-colors text-sm font-bold flex items-center justify-center gap-2">
                عرض التفاصيل الكاملة
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Detail Modal */}
      {selectedBanknote && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm" onClick={() => setSelectedBanknote(null)} />
          <div className="relative w-full max-w-5xl glass rounded-[2.5rem] border border-white/10 overflow-hidden animate-in fade-in zoom-in duration-300 max-h-[90vh] overflow-y-auto">
            <button 
              onClick={() => setSelectedBanknote(null)}
              className="absolute top-6 left-6 p-2 hover:bg-white/10 rounded-full transition-colors z-10"
            >
              <X size={24} />
            </button>

            <div className="grid grid-cols-1 lg:grid-cols-2">
              <div className="p-8 lg:p-12 space-y-10">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 emerald-gradient rounded-2xl flex items-center justify-center text-white text-2xl font-black shadow-lg">
                      {selectedBanknote.value}
                    </div>
                    <h2 className="text-4xl font-black">{selectedBanknote.name}</h2>
                  </div>
                  <div className="flex gap-3">
                    <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 text-xs font-bold rounded-lg border border-emerald-500/20">Legal Tender 2026</span>
                    <span className="px-3 py-1 bg-indigo-500/10 text-indigo-400 text-xs font-bold rounded-lg border border-indigo-500/20">Official Design</span>
                  </div>
                </div>

                <div className="space-y-6">
                  <h3 className="text-lg font-bold flex items-center gap-2">
                    <ShieldCheck className="text-emerald-400" size={20} />
                    ميزات الأمان (Security Features)
                  </h3>
                  <div className="grid grid-cols-1 gap-3">
                    {selectedBanknote.securityFeatures.map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-3 p-4 bg-white/5 rounded-2xl border border-white/5">
                        <div className="w-2 h-2 rounded-full bg-emerald-500" />
                        <span className="text-gray-300 font-medium text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-6">
                  <h3 className="text-lg font-bold flex items-center gap-2">
                    <ShoppingCart className="text-indigo-400" size={20} />
                    القوة الشرائية (Purchasing Power)
                  </h3>
                  <div className="p-5 glass border-indigo-500/20 rounded-2xl">
                    <p className="text-gray-400 leading-relaxed text-sm">
                      {selectedBanknote.purchasingPower}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-slate-900/50 p-8 lg:p-12 flex flex-col items-center justify-center space-y-8 border-r border-white/5">
                <div className="relative group w-full max-w-lg aspect-[2/1] perspective-1000">
                  <div className={`relative w-full h-full transition-all duration-700 transform-style-3d ${side === 'back' ? 'rotate-y-180' : ''}`}>
                    <div className="absolute inset-0 backface-hidden">
                      <img src={selectedBanknote.frontImage} className="w-full h-full object-cover rounded-3xl shadow-2xl border-4 border-white/10" alt="Front" />
                    </div>
                    <div className="absolute inset-0 backface-hidden rotate-y-180">
                      <img src={selectedBanknote.backImage} className="w-full h-full object-cover rounded-3xl shadow-2xl border-4 border-white/10" alt="Back" />
                    </div>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <button 
                    onClick={() => setSide('front')}
                    className={`px-8 py-3 rounded-2xl font-bold transition-all ${side === 'front' ? 'bg-white text-slate-950 shadow-xl' : 'glass text-gray-400 hover:text-white'}`}
                  >
                    الوجه الأمامي
                  </button>
                  <button 
                    onClick={() => setSide('back')}
                    className={`px-8 py-3 rounded-2xl font-bold transition-all ${side === 'back' ? 'bg-white text-slate-950 shadow-xl' : 'glass text-gray-400 hover:text-white'}`}
                  >
                    الوجه الخلفي
                  </button>
                </div>

                <div className="text-xs text-center text-gray-500 italic max-w-sm">
                  * الصور المعروضة هي نماذج تقريبية للتصاميم المعتمدة رسمياً لعام 2026.
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BanknoteGallery;
