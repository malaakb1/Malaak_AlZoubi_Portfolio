import type { BilingualString } from '@/types';

export interface Recommendation {
  id: string;
  quote: BilingualString;
  name: string;
  title: BilingualString;
  institution: BilingualString;
}

export const recommendations: Recommendation[] = [
  {
    id: 'essam-al-daoud',
    quote: {
      en: 'A bright and inquisitive student with a gift for quantitative and analytical thinking. Her academic record shows a high average that falls within the top of the class.',
      ar: 'طالبة ذكية وفضولية تتمتع بموهبة في التفكير الكمي والتحليلي. يُظهر سجلها الأكاديمي معدلاً مرتفعاً يقع ضمن أعلى الطلاب في الصف.',
    },
    name: 'Prof. Essam Al Daoud',
    title: {
      en: 'Professor',
      ar: 'أستاذ دكتور',
    },
    institution: {
      en: 'Faculty of Information Technology, Zarqa University',
      ar: 'كلية تكنولوجيا المعلومات، جامعة الزرقاء',
    },
  },
  {
    id: 'sattam-almatarneh',
    quote: {
      en: 'An outstanding student with hard work, academic aptitude, and motivation. Her performance is driven by her clarity of fundamentals, enabling her to latch onto new topics and fields swiftly.',
      ar: 'طالبة متميزة بعملها الجاد وكفاءتها الأكاديمية ودافعيتها. أداؤها مدفوع بوضوحها في الأساسيات، مما يمكّنها من الانتقال إلى مواضيع ومجالات جديدة بسرعة.',
    },
    name: 'Dr. Sattam Almatarneh',
    title: {
      en: 'Head of Data Science & AI Department',
      ar: 'رئيس قسم علم البيانات والذكاء الاصطناعي',
    },
    institution: {
      en: 'Faculty of Information Technology, Zarqa University',
      ar: 'كلية تكنولوجيا المعلومات، جامعة الزرقاء',
    },
  },
  {
    id: 'badia-alfathi',
    quote: {
      en: 'Malaak stood out for her curiosity, discipline, and commitment to personal and professional growth. She consistently demonstrated strong technical capabilities in Python, SQL, and Excel, paired with a thoughtful, strategic approach to problem-solving.',
      ar: 'تميّزت ملاك بفضولها وانضباطها والتزامها بالنمو الشخصي والمهني. أظهرت باستمرار قدرات تقنية قوية في Python وSQL وExcel، مع نهج مدروس واستراتيجي لحل المشكلات.',
    },
    name: 'Badia Alfathi',
    title: {
      en: 'Data Consultant & Data Analysis Mentor',
      ar: 'مستشارة بيانات ومرشدة تحليل بيانات',
    },
    institution: {
      en: 'CorrelationOne',
      ar: 'CorrelationOne',
    },
  },
  {
    id: 'mohamed-awaad',
    quote: {
      en: 'Malaak has shown strong capability in designing and delivering end-to-end AI applications. She effectively translates requirements into well-structured solutions and deploys models—including modern large language models—to production environments.',
      ar: 'أظهرت ملاك قدرة قوية في تصميم وتسليم تطبيقات ذكاء اصطناعي متكاملة. تترجم المتطلبات بفعالية إلى حلول منظمة وتنشر النماذج — بما فيها نماذج اللغة الكبيرة الحديثة — في بيئات الإنتاج.',
    },
    name: 'Mohamed Awaad',
    title: {
      en: 'CEO',
      ar: 'الرئيس التنفيذي',
    },
    institution: {
      en: 'AI Brains',
      ar: 'AI Brains',
    },
  },
  {
    id: 'abdulrahman-albasheer',
    quote: {
      en: 'What I appreciate most about Malaak is her sincere willingness to help others and her calm, thoughtful approach. She takes her role seriously and works with genuine compassion.',
      ar: 'ما أقدره أكثر في ملاك هو استعدادها الصادق لمساعدة الآخرين ونهجها الهادئ والمدروس. تأخذ دورها بجدية وتعمل بتعاطف حقيقي.',
    },
    name: 'Abdulrahman Albasheer',
    title: {
      en: 'Program Officer',
      ar: 'مسؤول برامج',
    },
    institution: {
      en: 'Molham Volunteering Team',
      ar: 'فريق ملهم التطوعي',
    },
  },
];
