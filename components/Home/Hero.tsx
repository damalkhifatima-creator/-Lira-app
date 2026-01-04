
import React from 'react';
import { ArrowLeft, CheckCircle, ShieldCheck } from 'lucide-react';

const Hero: React.FC<{ onStart: () => void }> = ({ onStart }) => {
  return (
    <section className="relative overflow-hidden pt-12">
      {/* Background Syrian Eagle Watermark */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 opacity-[0.03] pointer-events-none -ml-20">
        <svg viewBox="0 0 24 24" className="w-[800px] h-[800px]" fill="currentColor">
          <path d="M12,4.5C12,4.5 9,7 7,12C5,17 7,20 12,20C17,20 19,17 17,12C15,7 12,4.5 12,4.5M12,6C13.5,7.5 15,10 15,12C15,14 14,16 12,18C10,16 9,14 9,12C9,10 10.5,7.5 12,6Z" />
        </svg>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-8 z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-500 text-sm font-bold animate-fade-in">
            <ShieldCheck size={16} />
            بوابة الانتقال النقدي الرسمي 2026
          </div>
          <h1 className="text-5xl md:text-7xl font-black leading-tight">
            مستقبل <span className="text-transparent bg-clip-text bg-gradient-to-l from-emerald-400 to-amber-400">الاقتصاد السوري</span> يبدأ هنا.
          </h1>
          <p className="text-xl text-gray-400 max-w-xl leading-relaxed">
            المنصة الرسمية المعتمدة لتقييم وتحويل الليرة السورية الجديدة. نسعى لتوفير الشفافية والأمان لكل مواطن في مرحلة التحول التاريخي.
          </p>
          <div className="flex flex-wrap gap-4">
            <button 
              onClick={onStart}
              className="px-8 py-4 emerald-gradient rounded-2xl font-bold text-white shadow-xl shadow-emerald-500/20 hover:scale-105 transition-transform flex items-center gap-3"
            >
              ابدأ التقييم الآن
              <ArrowLeft size={20} />
            </button>
            <button className="px-8 py-4 glass rounded-2xl font-bold text-white hover:bg-white/5 transition-colors border border-white/10">
              دليل الاستخدام
            </button>
          </div>
          <div className="flex items-center gap-6 pt-4">
            <div className="flex items-center gap-2 text-sm text-gray-400 font-medium">
              <CheckCircle size={16} className="text-emerald-500" />
              توثيق مركزي
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-400 font-medium">
              <CheckCircle size={16} className="text-emerald-500" />
              أمان سيادي
            </div>
          </div>
        </div>

        <div className="relative">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-emerald-500/10 blur-[120px] rounded-full" />
          <div className="relative glass p-6 rounded-[2.5rem] border-white/20 shadow-2xl transition-transform duration-500 hover:scale-[1.02]">
            <img 
              src="https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?auto=format&fit=crop&q=80&w=1200" 
              alt="Syrian Vision 2026" 
              className="rounded-[2rem] w-full h-[400px] object-cover shadow-2xl opacity-80"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent rounded-[2rem]" />
            <div className="absolute -bottom-6 -right-6 glass p-6 rounded-2xl border-amber-500/20 shadow-2xl animate-bounce">
              <div className="text-xs text-gray-400 mb-1">السعر المعتمد</div>
              <div className="text-2xl font-black text-amber-500">1$ = 50 ل.س</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
