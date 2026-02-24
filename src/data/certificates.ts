import type { CertificateEntry } from '@/types';

// ─── Certificates ────────────────────────────────────────────────────────────
// Images go in: public/images/certificates/{id}.png

export const certificates: CertificateEntry[] = [
  {
    id: 'correlation-one-fellowship',
    title: { en: 'CorrelationOne AI/ML Fellowship', ar: 'زمالة CorrelationOne في AI/ML' },
    issuer: 'CorrelationOne',
    date: '2025',
    category: 'ml',
    skills: ['Machine Learning', 'Python', 'Data Science', 'Model Deployment'],
    credentialUrl: 'https://www.credential.net/ebda5e7b-7ded-4939-91f6-5250871bcb55#acc.Cl7Fq1Wx',
    image: '/images/certificates/correlation-one-fellowship.png',
    color: '#C4829A',
  },
  {
    id: 'data-science-ibm',
    title: { en: 'IBM Professional Certificate in Data Science', ar: 'شهادة IBM المهنية في علم البيانات' },
    issuer: 'IBM / Coursera',
    date: '2025',
    category: 'data-science',
    skills: ['Python', 'SQL', 'Data Visualization', 'Machine Learning'],
    credentialUrl: 'https://www.coursera.org/account/accomplishments/professional-cert/JJQPH3KLTT28',
    image: '/images/certificates/data-science-ibm.png',
    color: '#054ADA',
  },
  {
    id: 'n8n-automation',
    title: { en: 'n8n Workflow Automation', ar: 'أتمتة سير العمل n8n' },
    issuer: 'n8n Academy',
    date: '2025',
    category: 'automation',
    skills: ['n8n', 'Workflow Automation', 'API Integration', 'Webhooks'],
    credentialUrl: 'https://drive.google.com/file/d/17uyMXyNYpzUqtwhBJ4HNww0onCnMltmu/view',
    image: '/images/certificates/n8n-automation.png',
    color: '#EA4B71',
  },
  {
    id: 'prompt-engineering',
    title: { en: 'Prompt Engineering for ChatGPT', ar: 'هندسة الأوامر لـ ChatGPT' },
    issuer: 'Vanderbilt University',
    date: '2025',
    category: 'prompt-engineering',
    skills: ['Prompt Engineering', 'LLMs', 'ChatGPT', 'Few-shot Learning'],
    credentialUrl: 'https://drive.google.com/file/d/1drUp4MXC5HgOUaaFUEg9Cemneq0tkY1S/view',
    image: '/images/certificates/prompt-engineering.png',
    color: '#412991',
  },
  {
    id: 'green-digital-ai',
    title: { en: 'Green Digital and Opportunities of AI Program', ar: 'برنامج الرقمنة الخضراء وفرص الذكاء الاصطناعي' },
    issuer: 'INCO',
    date: '2025',
    category: 'genai',
    skills: ['AI Strategy', 'Green Technology', 'Digital Transformation'],
    credentialUrl: 'https://drive.google.com/file/d/15zWlS5d0Aae2orhWm41_8BceFKWscuWR/view',
    image: '/images/certificates/green-digital-ai.png',
    color: '#2ECC71',
  },
  {
    id: 'supervised-ml-stanford',
    title: { en: 'Supervised Machine Learning: Regression and Classification', ar: 'التعلم الآلي الخاضع للإشراف: الانحدار والتصنيف' },
    issuer: 'Stanford University / Coursera',
    date: '2025',
    category: 'ml',
    skills: ['Supervised Learning', 'Regression', 'Classification', 'scikit-learn'],
    credentialUrl: 'https://www.coursera.org/account/accomplishments/verify/IVHA990NYVNE',
    image: '/images/certificates/supervised-ml-stanford.png',
    color: '#8C1515',
  },
  {
    id: 'generative-ai-aws',
    title: { en: 'Introducing Generative AI with AWS', ar: 'مقدمة في الذكاء الاصطناعي التوليدي مع AWS' },
    issuer: 'Udacity',
    date: '2025',
    category: 'genai',
    skills: ['Generative AI', 'AWS', 'LLMs', 'Cloud AI'],
    credentialUrl: 'https://www.udacity.com/certificate/e/2bcf25e4-3d26-11f0-ae61-1342c5659867',
    image: '/images/certificates/generative-ai-aws.png',
    color: '#FF9900',
  },
  {
    id: 'advanced-powerbi',
    title: { en: 'Advanced Power BI', ar: 'Power BI المتقدم' },
    issuer: 'The Hope',
    date: '2025',
    category: 'bi-tools',
    skills: ['Power BI', 'DAX', 'Power Query', 'Data Modeling'],
    credentialUrl: 'https://drive.google.com/file/d/1t-e11xD74aYBSdfDJrhxf10iBN3iFNYS/view',
    image: '/images/certificates/advanced-powerbi.png',
    color: '#F2C811',
  },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────
export const getCertificatesByCategory = (cat: string) =>
  cat === 'all' ? certificates : certificates.filter((c) => c.category === cat);
