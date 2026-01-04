
import React from 'react';
import { ShoppingBag, TrendingUp, Info } from 'lucide-react';
import { GoldRates } from '../../types';

interface GoldMarketProps {
  rates: GoldRates;
  formatNumber: (n: number) => string;
  isFull?: boolean;
}

const GoldMarket: React.FC<GoldMarketProps> = ({ rates, formatNumber, isFull }) => {
  const items = [
    { label: 'عيار 21 (الأكثر تداولاً)', value: rates.k21, icon: '21k' },
    { label: 'عيار 18', value: rates.k18, icon: '18k' },
    { label: 'عيار 24', value: rates.k24, icon: '24k' },
    { label: 'أونصة الذهب', value: rates.ounce, icon: 'OZ' },
  ];

  return (
    <div className={`glass p-8 rounded-2xl border border-amber-500/20 space-y-6 ${isFull ? 'w-full' : ''}`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-500/20 flex items-center justify-center">
            <ShoppingBag className="text-amber-400" />
          </div>
          <h3 className="text-xl font-bold">سوق الذهب 2026</h3>
        </div>
        <div className="text-[10px] font-bold text-amber-500 flex items-center gap-2">
          <TrendingUp size={12} />
          سعر محلي محدث
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {items.map((item, idx) => (
          <div key={idx} className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/5 hover:border-amber-500/30 transition-all">
            <div className="flex items-center gap-3">
              <div className="text-xs font-black text-amber-500/50">{item.icon}</div>
              <span className="text-sm font-bold text-gray-300">{item.label}</span>
            </div>
            <div className="text-lg font-black text-white">
              {formatNumber(item.value)} <span className="text-[10px] text-gray-500 font-bold">ل.س</span>
            </div>
          </div>
        ))}
      </div>

      {isFull && (
        <div className="p-4 glass bg-amber-500/5 rounded-xl flex gap-3 items-start">
          <Info className="text-amber-500 shrink-0 mt-1" size={16} />
          <p className="text-[10px] text-gray-400 leading-relaxed">
            تخضع أسعار الذهب لتقلبات السوق العالمية ويتم تسعيرها هنا بالليرة السورية الجديدة المعتمدة في 2026. الأسعار استرشادية لغايات التقييم والتدقيق المالي الشخصي.
          </p>
        </div>
      )}
    </div>
  );
};

export default GoldMarket;
