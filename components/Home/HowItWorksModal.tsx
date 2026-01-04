
import React from 'react';
import { X, CheckCircle, ArrowLeftRight, ShieldCheck, Zap } from 'lucide-react';

interface HowItWorksModalProps {
  onClose: () => void;
}

const HowItWorksModal: React.FC<HowItWorksModalProps> = ({ onClose }) => {
  const steps = [
    {
      icon: ArrowLeftRight,
      title: 'التحويل العادل',
      desc: 'نظامنا يعتمد معامل تحويل رسمي 1:100. كل 100 ليرة قديمة تصبح ليرة واحدة جديدة، مما يزيل الأصفار الزائدة ويسهل التعامل.'
    },
    {
      icon: ShieldCheck,
      title: 'أمان الفئات',
      desc: 'جميع الفئات الجديدة (10، 25، 50، 100، 200، 500) مزودة بأعلى تقنيات الأمان العالمية لمكافحة التزييف.'
    },
    {
      icon: Zap,
      title: 'تقييم فوري',
      desc: 'استخدم الحاسبة الذكية لإدخال الكميات النقدية التي تملكها والحصول على جرد مالي دقيق ومباشر للثروة بالليرة الجديدة.'
    }
  ];

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-950/90 backdrop-blur-md" onClick={onClose} />
      <div className="relative glass w-full max-w-2xl p-8 md:p-12 rounded-[2.5rem] border-white/10 animate-in zoom-in duration-300">
        <button onClick={onClose} className="absolute top-6 left-6 text-gray-400 hover:text-white transition-colors">
          <X size={24} />
        </button>

        <div className="space-y-10">
          <div className="text-center space-y-4">
            <h2 className="text-3xl font-black">كيف يعمل النظام المالي 2026؟</h2>
            <p className="text-gray-400">دليلك المبسط لفهم التحول النقدي في سوريا الجديدة.</p>
          </div>

          <div className="space-y-6">
            {steps.map((step, idx) => (
              <div key={idx} className="flex gap-6 p-6 rounded-3xl bg-white/5 border border-white/10">
                <div className="w-14 h-14 rounded-2xl emerald-gradient shrink-0 flex items-center justify-center text-white shadow-lg">
                  <step.icon size={28} />
                </div>
                <div className="space-y-1">
                  <h4 className="font-black text-xl">{step.title}</h4>
                  <p className="text-gray-400 text-sm leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="pt-4 flex justify-center">
            <button 
              onClick={onClose}
              className="px-10 py-4 emerald-gradient rounded-2xl font-black text-white shadow-xl hover:scale-105 transition-transform"
            >
              فهمت ذلك، دعنا نبدأ
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowItWorksModal;
