
import { Banknote, AppSettings } from './types';

export const CONVERSION_FACTOR = 100; 
export const DENOMINATIONS = [10, 25, 50, 100, 200, 500];

export const INITIAL_BANKNOTES: Banknote[] = [
  {
    id: 1,
    value: 10,
    name: '10 ليرات جديدة',
    frontImage: 'https://images.unsplash.com/photo-1621933486609-2d8759af9998?auto=format&fit=crop&q=80&w=800',
    backImage: 'https://images.unsplash.com/photo-1554224155-1696413565d3?auto=format&fit=crop&q=80&w=800',
    securityFeatures: ['علامة مائية مدمجة', 'خيط أمان متحرك', 'حبر حراري'],
    purchasingPower: 'تعادل شراء ربطة خبز أو علبة كبريت.'
  },
  {
    id: 2,
    value: 25,
    name: '25 ليرة جديدة',
    frontImage: 'https://images.unsplash.com/photo-1580519542036-c47de6196ba5?auto=format&fit=crop&q=80&w=800',
    backImage: 'https://images.unsplash.com/photo-1607861717598-e47ccaff66b1?auto=format&fit=crop&q=80&w=800',
    securityFeatures: ['طباعة بارزة', 'علامة تطابق خفية', 'شريط هولوغرافي'],
    purchasingPower: 'كافية لوجبة خفيفة سريعة.'
  },
  {
    id: 3,
    value: 50,
    name: '50 ليرة جديدة',
    frontImage: 'https://images.unsplash.com/photo-1593672715438-d88a75639fac?auto=format&fit=crop&q=80&w=800',
    backImage: 'https://images.unsplash.com/photo-1561414927-6d86591d0c4f?auto=format&fit=crop&q=80&w=800',
    securityFeatures: ['تغير اللون عند الإمالة', 'خيط عريض مشفر', 'ملمس خشن للأطراف'],
    purchasingPower: 'تغطي مصاريف تنقل داخل المدينة.'
  },
  {
    id: 4,
    value: 100,
    name: '100 ليرة جديدة',
    frontImage: 'https://images.unsplash.com/photo-1633155527990-2e43bc3dd3b0?auto=format&fit=crop&q=80&w=800',
    backImage: 'https://images.unsplash.com/photo-1518458028785-8fbcd101ebb9?auto=format&fit=crop&q=80&w=800',
    securityFeatures: ['علامة مائية ثلاثية الأبعاد', 'نافذة شفافة', 'رقم تسلسلي بارز'],
    purchasingPower: 'قيمة وجبة غداء كاملة لشخص واحد.'
  },
  {
    id: 5,
    value: 200,
    name: '200 ليرة جديدة',
    frontImage: 'https://images.unsplash.com/photo-1621933486609-2d8759af9998?auto=format&fit=crop&q=80&w=800',
    backImage: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&q=80&w=800',
    securityFeatures: ['حبر يتغير لوناً', 'خيط أمان مزدوج', 'طباعة ميكروسكوبية'],
    purchasingPower: 'تكفي لتسوق منزلي بسيط.'
  },
  {
    id: 6,
    value: 500,
    name: '500 ليرة جديدة',
    frontImage: 'https://images.unsplash.com/photo-1502920513535-906370007802?auto=format&fit=crop&q=80&w=800',
    backImage: 'https://images.unsplash.com/photo-1611974715853-26d305b9f6f1?auto=format&fit=crop&q=80&w=800',
    securityFeatures: ['أعلى معايير الأمان العالمية', 'رقاقة ذكية خفية', 'علامة للمكفوفين'],
    purchasingPower: 'قيمة شرائية عالية للسلع المعمرة.'
  }
];

export const INITIAL_SETTINGS: AppSettings = {
  siteName: 'خبير العملة السورية 2026',
  logoUrl: '',
  aboutText: 'منصة تقنية متكاملة تهدف إلى تسهيل عملية الانتقال النقدي للمواطن السوري في عام 2026.',
  maintenance: {
    isPaused: false,
    startTime: '',
    endTime: '',
    reason: 'تحسينات دورية للنظام المالي'
  },
  visual: {
    primaryColor: '#10b981',
    themeMode: 'glass'
  },
  conversionFactor: 100
};
