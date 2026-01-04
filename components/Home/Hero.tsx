
import React from 'react';
import { ArrowLeft, CheckCircle } from 'lucide-react';

interface HeroProps {
  onStart: () => void;
}

const Hero: React.FC<HeroProps> = ({ onStart }) => {
  return (
    <section className="relative overflow-hidden pt-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-8 z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm font-bold animate-fade-in">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            النظام الموثوق لتقييم العملة 2026
          </div>
          <h1 className="text-5xl md:text-7xl font-black leading-tight">
            مستقبل <span className="text-transparent bg-clip-text bg-gradient-to-l from-emerald-400 to-indigo-400">الليرة السورية</span> بين يديك.
          </h1>
          <p className="text-xl text-gray-400 max-w-xl leading-relaxed">
            استعد للانتقال النقدي بكل ثقة. نوفر لك أدوات تقييم دقيقة، محولات فورية، ودليل شامل للفئات النقدية الجديدة لضمان أمان مدخراتك.
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
              تشفير عالي المستوى
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-400 font-medium">
              <CheckCircle size={16} className="text-emerald-500" />
              تحديثات فورية للسوق
            </div>
          </div>
        </div>

        <div className="relative">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-emerald-500/20 blur-[120px] rounded-full" />
          <div className="relative glass p-6 rounded-[2.5rem] border-white/20 shadow-2xl rotate-3 hover:rotate-0 transition-transform duration-500">
            <img 
              src="https://picsum.photos/seed/syr-cash/1000/600" 
              alt="Syrian New Currency" 
              className="rounded-[2rem] w-full h-auto shadow-2xl"
            />
            <div className="absolute -bottom-6 -right-6 glass p-6 rounded-2xl border-white/20 shadow-2xl animate-bounce">
              <div className="text-xs text-gray-400 mb-1">سعر الصرف الرسمي</div>
              <div className="text-2xl font-black text-emerald-400">1$ = 50 ل.س</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
