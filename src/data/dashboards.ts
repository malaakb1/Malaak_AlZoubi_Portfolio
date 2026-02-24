import type { Dashboard } from '@/types';

const si = (slug: string) => `https://cdn.simpleicons.org/${slug}`;

// ─── Dashboards ──────────────────────────────────────────────────────────────
// Images go in: public/images/dashboards/{slug}/
//   - hero.png   → heroImage
//   - thumb.png  → thumbnail
//   - 1.png, 2.png, … → screenshots[]

export const dashboards: Dashboard[] = [
  // ── 1. 120 Years of Olympics ────────────────────────────────────────────────
  {
    slug: '120-years-of-olympics',
    featured: true,
    date: '2024-04',
    category: 'reporting',
    title: {
      en: '120 Years of Olympic Data',
      ar: '120 عاماً من بيانات الأولمبياد',
    },
    shortDescription: {
      en: 'Interactive Power BI dashboard exploring 120 years of Olympic medal data — medals by team, sport, gender distribution, and historical trends.',
      ar: 'لوحة Power BI تفاعلية تستكشف 120 عاماً من بيانات الميداليات الأولمبية — الميداليات حسب الفريق والرياضة وتوزيع الجنسين والاتجاهات التاريخية.',
    },
    longDescription: {
      en: 'This Power BI dashboard provides a comprehensive visual exploration of 120 years of Olympic Games data. It breaks down medal counts by team, individual athletes, sport, and gender. Interactive slicers for Gender, Team, and Year allow dynamic filtering. The dashboard reveals how Olympic participation and medal distribution have evolved from 1896 to the modern era, highlighting shifts in gender representation and the rise and fall of dominant sporting nations.',
      ar: 'توفر لوحة Power BI هذه استكشافاً بصرياً شاملاً لـ 120 عاماً من بيانات الألعاب الأولمبية. تعرض أعداد الميداليات حسب الفريق والرياضيين الأفراد والرياضة والجنس. تسمح الشرائح التفاعلية بالتصفية الديناميكية حسب الجنس والفريق والسنة. تكشف اللوحة كيف تطورت المشاركة الأولمبية وتوزيع الميداليات من 1896 حتى العصر الحديث.',
    },
    heroImage: '/images/dashboards/120-years-of-olympics/hero.png',
    thumbnail: '/images/dashboards/120-years-of-olympics/hero.png',
    tools: ['powerbi'],
    tags: ['Power BI', 'Olympics', 'Sports Analytics', 'Historical Data', 'DAX'],
    kpis: [
      { label: { en: 'Total Medals', ar: 'إجمالي الميداليات' }, value: '271K+' },
      { label: { en: 'Teams', ar: 'الفرق' }, value: '200+' },
      { label: { en: 'Sports', ar: 'الرياضات' }, value: '60+' },
    ],
    screenshots: [
      '/images/dashboards/120-years-of-olympics/hero.png',
    ],
    liveUrl: 'https://www.linkedin.com/posts/malaak-al-zoubi_powerbi-data-dataanalytics-activity-7179545356219600896-mulP/?utm_source=share&utm_medium=member_desktop&rcm=ACoAADly3zwB-1qHFdhbtTqvL8pCFTPUyAHr6Qk',
    role: {
      en: 'Dashboard Designer & Data Analyst',
      ar: 'مصممة لوحات بيانات ومحللة بيانات',
    },
    datasetName: '120 Years of Olympic History',
    dataSources: {
      en: 'Historical Olympic Games dataset covering athlete details, events, medals, and participating nations from 1896 to 2016.',
      ar: 'مجموعة بيانات تاريخ الألعاب الأولمبية تغطي تفاصيل الرياضيين والأحداث والميداليات والدول المشاركة من 1896 إلى 2016.',
    },
    modeling: {
      en: 'Data was cleaned and modeled in Power BI with DAX measures for medal aggregations, gender ratios, and year-over-year participation trends. Interactive slicers enable drill-down by gender, team, and year.',
      ar: 'تم تنظيف البيانات ونمذجتها في Power BI مع مقاييس DAX لتجميعات الميداليات ونسب الجنسين واتجاهات المشاركة سنوياً. تتيح الشرائح التفاعلية التعمق حسب الجنس والفريق والسنة.',
    },
    keyInsights: [
      { en: 'The United States leads with 18K+ medals, followed by France (12K) and Great Britain (11K)', ar: 'تتصدر الولايات المتحدة بأكثر من 18 ألف ميدالية، تليها فرنسا (12 ألف) وبريطانيا (11 ألف)' },
      { en: 'Male athletes account for 72.5% of total games participation vs 27.5% female', ar: 'يشكل الرياضيون الذكور 72.5% من إجمالي المشاركات مقابل 27.5% للإناث' },
      { en: 'Athletics and Swimming are the top medal-producing sports across all Olympic history', ar: 'ألعاب القوى والسباحة هما الرياضتان الأكثر إنتاجاً للميداليات عبر التاريخ الأولمبي' },
    ],
    techStack: [
      { name: 'Power BI', iconUrl: si('powerbi'), iconType: 'simpleicons', color: '#F2C811' },
    ],
  },

  // ── 2. Syria Food Prices Tableau Dashboard ─────────────────────────────────
  {
    slug: 'syria-food-prices',
    featured: true,
    date: '2024-09',
    category: 'eda',
    title: {
      en: 'Syria Food Prices — Tableau Analysis',
      ar: 'أسعار الغذاء في سوريا — تحليل Tableau',
    },
    shortDescription: {
      en: 'Exploratory Tableau dashboard visualising WFP food price data across Syrian governorates with trend analysis and commodity comparisons.',
      ar: 'لوحة Tableau استكشافية لتصور بيانات أسعار الغذاء من WFP عبر المحافظات السورية مع تحليل الاتجاهات ومقارنة السلع.',
    },
    longDescription: {
      en: 'Using World Food Programme price monitoring data, this Tableau dashboard provides an interactive view of food commodity prices across all Syrian governorates from 2015 to 2024. Users can filter by commodity, time range, and region to understand inflation patterns, supply disruptions, and seasonal variations. The dashboard was part of a larger data science exploration that combined EDA with predictive modeling.',
      ar: 'باستخدام بيانات مراقبة الأسعار من برنامج الغذاء العالمي، توفر لوحة Tableau هذه عرضاً تفاعلياً لأسعار السلع الغذائية عبر جميع المحافظات السورية من 2015 إلى 2024. يمكن للمستخدمين التصفية حسب السلعة والنطاق الزمني والمنطقة لفهم أنماط التضخم وانقطاعات الإمداد والتغيرات الموسمية.',
    },
    heroImage: '/images/dashboards/syria-food-prices/hero.png',
    thumbnail: '/images/dashboards/syria-food-prices/hero.png',
    tools: ['tableau', 'python'],
    tags: ['Tableau', 'Python', 'EDA', 'WFP', 'Food Prices', 'Time Series'],
    kpis: [
      { label: { en: 'Governorates Covered', ar: 'المحافظات المشمولة' }, value: '14' },
      { label: { en: 'Data Points', ar: 'نقاط البيانات' }, value: '50K+' },
      { label: { en: 'Commodities Tracked', ar: 'السلع المتتبعة' }, value: '25' },
    ],
    screenshots: [
      '/images/dashboards/syria-food-prices/hero.png',
    ],
    liveUrl: 'https://public.tableau.com/views/SyrianFoodPricesDuringtheConflict/Dashboard1?:language=en-US&:sid=&:redirect=auth&:display_count=n&:origin=viz_share_link',
    role: {
      en: 'Data Analyst & Dashboard Designer',
      ar: 'محللة بيانات ومصممة لوحات',
    },
    datasetName: 'WFP Food Prices Dataset',
    dataSources: {
      en: 'World Food Programme (WFP) VAM food price monitoring data, covering monthly prices for staple commodities across Syrian markets.',
      ar: 'بيانات مراقبة أسعار الغذاء من برنامج الغذاء العالمي (WFP)، تغطي الأسعار الشهرية للسلع الأساسية عبر الأسواق السورية.',
    },
    modeling: {
      en: 'Data was preprocessed in Python (Pandas) for cleaning, imputation of missing months, and currency normalization. Tableau was used for visual analytics with calculated fields for YoY change, moving averages, and regional comparisons.',
      ar: 'تمت معالجة البيانات مسبقاً في Python (Pandas) للتنظيف وتعويض الأشهر المفقودة وتوحيد العملات. استُخدم Tableau للتحليل المرئي مع حقول محسوبة للتغير السنوي والمتوسطات المتحركة والمقارنات الإقليمية.',
    },
    keyInsights: [
      { en: 'Bread prices increased 300% between 2019–2023 in Aleppo', ar: 'ارتفعت أسعار الخبز 300% بين 2019-2023 في حلب' },
      { en: 'Coastal governorates showed more stable pricing due to better supply chains', ar: 'أظهرت المحافظات الساحلية أسعاراً أكثر استقراراً بسبب سلاسل توريد أفضل' },
      { en: 'Seasonal spikes correlate with harvest periods and conflict escalation', ar: 'ترتبط الارتفاعات الموسمية بفترات الحصاد وتصاعد النزاع' },
    ],
    techStack: [
      { name: 'Tableau',  iconUrl: undefined, iconType: 'text', color: '#E97627' },
      { name: 'Python',   iconUrl: si('python'), iconType: 'simpleicons', color: '#3776AB' },
      { name: 'Pandas',   iconUrl: si('pandas'), iconType: 'simpleicons', color: '#150458' },
    ],
  },

  // ── 3. HR Analytics Python Dashboard ───────────────────────────────────────
  {
    slug: 'hr-analytics',
    featured: true,
    date: '2024-06',
    category: 'hr',
    title: {
      en: 'HR Analytics Dashboard — Python',
      ar: 'لوحة تحليلات الموارد البشرية — Python',
    },
    shortDescription: {
      en: 'Python-based interactive dashboard analyzing employee attrition, satisfaction scores, and department-level workforce metrics.',
      ar: 'لوحة تفاعلية مبنية بـ Python لتحليل معدل دوران الموظفين ودرجات الرضا ومقاييس القوى العاملة على مستوى الأقسام.',
    },
    longDescription: {
      en: 'This dashboard was built using Plotly Dash to explore HR data for a mid-size company. It visualizes key workforce metrics including attrition rates by department, satisfaction survey results, salary distributions, and tenure analysis. Interactive filters let HR managers drill into specific departments or job roles. A predictive component uses a trained Random Forest model to flag at-risk employees.',
      ar: 'تم بناء هذه اللوحة باستخدام Plotly Dash لاستكشاف بيانات الموارد البشرية لشركة متوسطة الحجم. تصور مقاييس القوى العاملة الرئيسية بما في ذلك معدلات الاستنزاف حسب القسم ونتائج استطلاعات الرضا وتوزيعات الرواتب وتحليل مدة الخدمة. تسمح الفلاتر التفاعلية لمديري الموارد البشرية بالتعمق في أقسام أو أدوار وظيفية محددة.',
    },
    heroImage: '/images/dashboards/hr-analytics/hero.png',
    thumbnail: '/images/dashboards/hr-analytics/hero.png',
    tools: ['python'],
    tags: ['Python', 'Plotly', 'Dash', 'HR', 'Attrition', 'EDA'],
    kpis: [
      { label: { en: 'Attrition Rate', ar: 'معدل الاستنزاف' }, value: '16.1%' },
      { label: { en: 'Avg Satisfaction', ar: 'متوسط الرضا' }, value: '3.6/5' },
      { label: { en: 'Departments', ar: 'الأقسام' }, value: '9' },
    ],
    screenshots: [
      '/images/dashboards/hr-analytics/hero.png',
    ],
    liveUrl: 'https://drive.google.com/file/d/11AeFpfW6jGhl_Ki46OXgayQdQmRr7C8I/view',
    role: {
      en: 'Data Analyst & Python Developer',
      ar: 'محللة بيانات ومطورة Python',
    },
    datasetName: 'IBM HR Analytics Dataset',
    dataSources: {
      en: 'IBM HR Analytics Employee Attrition dataset (Kaggle), supplemented with synthetic satisfaction survey data.',
      ar: 'مجموعة بيانات IBM للتحليلات الموارد البشرية واستنزاف الموظفين (Kaggle)، مدعومة ببيانات استطلاع رضا اصطناعية.',
    },
    modeling: {
      en: 'Data cleaning and feature engineering in Pandas. Plotly Dash was used for the interactive frontend. A Random Forest classifier was trained to predict attrition risk, with SHAP values used for interpretability.',
      ar: 'تنظيف البيانات وهندسة الميزات في Pandas. استُخدم Plotly Dash للواجهة التفاعلية. تم تدريب مُصنف Random Forest للتنبؤ بمخاطر الاستنزاف، مع استخدام قيم SHAP للتفسير.',
    },
    keyInsights: [
      { en: 'Sales department has the highest attrition rate at 21%', ar: 'يملك قسم المبيعات أعلى معدل استنزاف بنسبة 21%' },
      { en: 'Employees with <2 years tenure are 3x more likely to leave', ar: 'الموظفون ذوو الخدمة أقل من سنتين أكثر عرضة للمغادرة بمقدار 3 أضعاف' },
      { en: 'Work-life balance score is the strongest predictor of satisfaction', ar: 'درجة التوازن بين العمل والحياة هي أقوى مؤشر للرضا' },
    ],
    techStack: [
      { name: 'Python',   iconUrl: si('python'),   iconType: 'simpleicons', color: '#3776AB' },
      { name: 'Plotly',   iconUrl: si('plotly'),   iconType: 'simpleicons', color: '#3F4F75' },
      { name: 'Pandas',   iconUrl: si('pandas'),   iconType: 'simpleicons', color: '#150458' },
      { name: 'Scikit-learn', iconUrl: si('scikitlearn'), iconType: 'simpleicons', color: '#F7931E' },
    ],
  },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────
export const getFeaturedDashboards = () => dashboards.filter((d) => d.featured);
export const getDashboardBySlug = (slug: string) => dashboards.find((d) => d.slug === slug);
