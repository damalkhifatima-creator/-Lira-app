
import { Banknote, AppSettings } from './types';

export const CONVERSION_FACTOR = 100; // 100 Old = 1 New
export const USD_RATE = 50; // 1 USD = 50 New Lira
export const DENOMINATIONS = [10, 25, 50, 100, 200, 500];

export const INITIAL_BANKNOTES: Banknote[] = [
  {
    id: 1,
    value: 10,
    name: '10 ليرات جديدة',
    frontImage: 'https://picsum.photos/seed/syr10f/800/400',
    backImage: 'https://picsum.photos/seed/syr10b/800/400',
    securityFeatures: ['علامة مائية مدمجة', 'خيط أمان متحرك', 'حبر حراري'],
    purchasingPower: 'تعادل شراء ربطة خبز أو علبة كبريت.'
  },
  {
    id: 2,
    value: 25,
    name: '25 ليرة جديدة',
    frontImage: 'https://picsum.photos/seed/syr25f/800/400',
    backImage: 'https://picsum.photos/seed/syr25b/800/400',
    securityFeatures: ['طباعة بارزة', 'علامة تطابق خفية', 'شريط هولوغرافي'],
    purchasingPower: 'كافية لوجبة خفيفة سريعة.'
  },
  {
    id: 3,
    value: 50,
    name: '50 ليرة جديدة',
    frontImage: 'https://picsum.photos/seed/syr50f/800/400',
    backImage: 'https://picsum.photos/seed/syr50b/800/400',
    securityFeatures: ['تغير اللون عند الإمالة', 'خيط عريض مشفر', 'ملمس خشن للأطراف'],
    purchasingPower: 'تغطي مصاريف تنقل داخل المدينة.'
  },
  {
    id: 4,
    value: 100,
    name: '100 ليرة جديدة',
    frontImage: 'https://picsum.photos/seed/syr100f/800/400',
    backImage: 'https://picsum.photos/seed/syr100b/800/400',
    securityFeatures: ['علامة مائية ثلاثية الأبعاد', 'نافذة شفافة', 'رقم تسلسلي بارز'],
    purchasingPower: 'قيمة وجبة غداء كاملة لشخص واحد.'
  },
  {
    id: 5,
    value: 200,
    name: '200 ليرة جديدة',
    frontImage: 'https://picsum.photos/seed/syr200f/800/400',
    backImage: 'https://picsum.photos/seed/syr200b/800/400',
    securityFeatures: ['حبر يتغير لوناً', 'خيط أمان مزدوج', 'طباعة ميكروسكوبية'],
    purchasingPower: 'تكفي لتسوق منزلي بسيط.'
  },
  {
    id: 6,
    value: 500,
    name: '500 ليرة جديدة',
    frontImage: 'https://picsum.photos/seed/syr500f/800/400',
    backImage: 'https://picsum.photos/seed/syr500b/800/400',
    securityFeatures: ['أعلى معايير الأمان العالمية', 'رقاقة ذكية خفية', 'علامة للمكفوفين'],
    purchasingPower: 'قيمة شرائية عالية للسلع المعمرة.'
  }
];

export const INITIAL_SETTINGS: AppSettings = {
  siteName: 'خبير العملة السورية 2026',
  logoUrl: '',
  aboutText: 'منصة تقنية متكاملة تهدف إلى تسهيل عملية الانتقال النقدي للمواطن السوري في عام 2026، من خلال أدوات تقييم دقيقة ومعلومات موثوقة حول الفئات النقدية الجديدة.',
  maintenanceMode: false,
  usdRate: 50,
  conversionFactor: 100
};
