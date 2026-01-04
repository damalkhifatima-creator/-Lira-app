
import React from 'react';
import { ArrowLeft, CheckCircle, ShieldCheck, Zap } from 'lucide-react';

const Hero: React.FC<{ onStart: () => void }> = ({ onStart }) => {
  return (
    <section className="relative overflow-hidden pt-4 md:pt-8">
      {/* Background Watermark Removed */}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
        <div className="space-y-6 md:space-y-8 z-10 text-center md:text-right">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 text-[10px] md:text-xs font-bold">
            <ShieldCheck size={14} />
            بوابة الانتقال النقدي المعتمدة 2026
          </div>
          <h1 className="text-4xl md:text-6xl font-black leading-tight">
            مستقبل <span className="text-transparent bg-clip-text bg-gradient-to-l from-emerald-400 to-indigo-400">نقدنا السوري</span> بلمسة واحدة.
          </h1>
          <p className="text-base md:text-lg text-gray-400 max-w-xl mx-auto md:mx-0 leading-relaxed">
            المنصة الذكية الأسرع لتقييم وتحويل الليرة السورية الجديدة. كل ما تحتاجه لإدارة أموالك في العصر الجديد.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <button 
              onClick={onStart}
              className="px-8 py-4 emerald-gradient rounded-2xl font-bold text-white shadow-xl shadow-emerald-500/20 hover:scale-105 transition-transform flex items-center justify-center gap-3"
            >
              ابدأ التقييم
              <ArrowLeft size={18} />
            </button>
            <button className="px-8 py-4 glass rounded-2xl font-bold text-white hover:bg-white/5 transition-colors border border-white/10 flex items-center justify-center gap-2">
              <Zap size={18} className="text-emerald-400" />
              كيف يعمل؟
            </button>
          </div>
          <div className="flex items-center justify-center md:justify-start gap-4 pt-4">
            <div className="flex items-center gap-2 text-[10px] text-gray-400 font-bold uppercase tracking-wider">
              <CheckCircle size={14} className="text-emerald-500" />
              دقة متناهية
            </div>
            <div className="flex items-center gap-2 text-[10px] text-gray-400 font-bold uppercase tracking-wider">
              <CheckCircle size={14} className="text-emerald-500" />
              تحديث فوري
            </div>
          </div>
        </div>

        <div className="relative mt-8 lg:mt-0 px-4 md:px-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-emerald-500/5 blur-[100px] rounded-full" />
          <div className="relative glass p-4 rounded-[2rem] border-white/10 shadow-2xl overflow-hidden">
            <img 
              src="https://images.unsplash.com/photo-1518458028785-8fbcd101ebb9?auto=format&fit=crop&q=80&w=1200" 
              alt="Syrian Economy 2026" 
              className="rounded-[1.5rem] w-full h-[250px] md:h-[350px] object-cover opacity-60 grayscale hover:grayscale-0 transition-all duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent rounded-[1.5rem]" />
            {/* Exchange rate box removed as requested */}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
