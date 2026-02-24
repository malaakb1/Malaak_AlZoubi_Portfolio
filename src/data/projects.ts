import type { Project } from '@/types';

// ─── Tool icon helper ────────────────────────────────────────────────────────
// Simple Icons CDN (free, no API key): https://cdn.simpleicons.org/{slug}
// Devicon CDN: https://cdn.jsdelivr.net/gh/devicons/devicon/icons/{name}/{name}-original.svg
const si = (slug: string) => `https://cdn.simpleicons.org/${slug}`;

// ─── Projects ────────────────────────────────────────────────────────────────
export const projects: Project[] = [

  // ── 1. TransformMe AI ──────────────────────────────────────────────────────
  {
    id: 'transformme-ai',
    featured: true,
    year: 2024,
    category: 'cv',
    tags: ['Python', 'Gradio', 'Hugging Face', 'Stable Diffusion', 'Computer Vision', 'Image Segmentation'],
    title: {
      en: 'TransformMe AI — Graduation Project',
      ar: 'TransformMe AI — مشروع التخرج',
    },
    shortDesc: {
      en: 'AI-powered photo editing tool with automated background masking and Stable Diffusion-based style generation, wrapped in an interactive Gradio UI.',
      ar: 'أداة تحرير صور مدعومة بالذكاء الاصطناعي تُؤتمت عملية حذف الخلفية (background masking) وتوليد أساليب بصرية باستخدام Stable Diffusion، ضمن واجهة Gradio تفاعلية.',
    },
    fullDesc: {
      en: `TransformMe AI is a graduation project that combines computer vision and generative AI to create an accessible photo-editing experience. The tool automates background segmentation using pre-trained Hugging Face models, then feeds the masked subject into a Stable Diffusion pipeline to apply creative style transfers or background replacements.\n\nThe Gradio interface makes the tool available directly in a browser without any local GPU requirement, lowering the barrier for non-technical users who want professional AI-enhanced photos.`,
      ar: 'TransformMe AI هو مشروع تخرج يجمع بين رؤية الحاسوب (computer vision) والذكاء الاصطناعي التوليدي لإنشاء تجربة تحرير صور سهلة الوصول. يُؤتمت الأداة عملية تجزئة الخلفية (background segmentation) باستخدام نماذج مدرَّبة مسبقاً من Hugging Face، ثم يُمرر الكائن المُقتطع إلى pipeline الـ Stable Diffusion لتطبيق تحويل الأسلوب أو استبدال الخلفية.\n\nواجهة Gradio تجعل الأداة متاحة مباشرةً في المتصفح دون الحاجة إلى GPU محلي، مما يُخفض عائق الاستخدام أمام غير المتخصصين.',
    },
    tools: [
      { name: 'Python',          iconUrl: si('python'),          iconType: 'simpleicons', color: '#3776AB' },
      { name: 'Gradio',          iconUrl: si('gradio'),          iconType: 'simpleicons', color: '#FF7C00' },
      { name: 'Hugging Face',    iconUrl: si('huggingface'),     iconType: 'simpleicons', color: '#FFD21E' },
      { name: 'Stable Diffusion',iconUrl: undefined,             iconType: 'text',        color: '#7C3AED' },
      { name: 'OpenCV',          iconUrl: si('opencv'),          iconType: 'simpleicons', color: '#5C3EE8' },
      { name: 'PyTorch',         iconUrl: si('pytorch'),         iconType: 'simpleicons', color: '#EE4C2C' },
    ],
    features: [
      { en: 'Automated background removal using Hugging Face segmentation models', ar: 'إزالة تلقائية للخلفية باستخدام نماذج Segmentation من Hugging Face' },
      { en: 'Stable Diffusion-powered style transfer and creative background generation', ar: 'نقل الأسلوب الفني وتوليد خلفيات إبداعية باستخدام Stable Diffusion' },
      { en: 'Interactive Gradio web UI — no local GPU required', ar: 'واجهة ويب تفاعلية عبر Gradio — دون الحاجة إلى GPU محلي' },
      { en: 'Support for multiple diffusion model checkpoints', ar: 'دعم checkpoints متعددة لنماذج Diffusion' },
      { en: 'Real-time preview of masking and generation results', ar: 'معاينة فورية لنتائج الـ masking والتوليد' },
    ],
    role: {
      en: 'Sole developer (graduation project). Researched and integrated segmentation models from Hugging Face Hub, built the Stable Diffusion generation pipeline, and designed the Gradio interface end-to-end.',
      ar: 'مطورة وحيدة (مشروع التخرج). بحثت في نماذج الـ segmentation وأدمجتها من Hugging Face Hub، وبنيت pipeline توليد Stable Diffusion، وصممت واجهة Gradio من البداية إلى النهاية.',
    },
    architecture: {
      description: {
        en: 'User uploads a photo → Hugging Face segmentation model extracts the foreground mask → masked image is passed to Stable Diffusion with a text or style prompt → generated image is returned to the Gradio UI.',
        ar: 'يرفع المستخدم صورة ← نموذج segmentation من Hugging Face يستخرج قناع المقدمة (foreground mask) ← الصورة المُقنَّعة تُمرَّر إلى Stable Diffusion مع prompt نصي ← الصورة المولَّدة تُعرض في واجهة Gradio.',
      },
      nodes: [
        { id: 'input',   label: { en: 'User Photo Upload', ar: 'رفع الصورة' },                   type: 'input'   },
        { id: 'seg',     label: { en: 'HF Segmentation Model', ar: 'نموذج HF للـ Segmentation' }, type: 'model'   },
        { id: 'mask',    label: { en: 'Foreground Mask', ar: 'Foreground Mask' },                 type: 'process' },
        { id: 'sd',      label: { en: 'Stable Diffusion', ar: 'Stable Diffusion' },               type: 'model'   },
        { id: 'output',  label: { en: 'Generated Image', ar: 'الصورة المولَّدة' },               type: 'output'  },
        { id: 'ui',      label: { en: 'Gradio Web UI', ar: 'واجهة Gradio' },                     type: 'ui'      },
      ],
    },
    results: {
      en: 'Delivered a fully functional end-to-end AI photo editor as a graduation project. The tool successfully demonstrated automated masking and creative image generation from a single browser-accessible interface, showcasing the practical integration of open-source diffusion models.',
      ar: 'تم تسليم محرر صور ذكاء اصطناعي متكامل كمشروع تخرج. أثبتت الأداة نجاح أتمتة الـ masking وتوليد الصور الإبداعية من خلال واجهة متاحة عبر المتصفح، مما عرض التكامل العملي لنماذج Diffusion مفتوحة المصدر.',
    },
    challenges: {
      en: 'The primary challenge was maintaining generation quality while integrating two very different model types (discriminative segmentation + generative diffusion). Latency was managed by optimizing the pipeline order and using lighter checkpoints during development. Deploying Gradio in a shareable format required careful environment configuration.',
      ar: 'التحدي الرئيسي كان الحفاظ على جودة التوليد مع دمج نموذجين مختلفين (segmentation تمييزي + diffusion توليدي). تمت إدارة زمن الاستجابة (latency) عبر تحسين ترتيب الـ pipeline واستخدام checkpoints أخف خلال التطوير. نشر Gradio بصيغة قابلة للمشاركة تطلَّب ضبط البيئة بعناية.',
    },
    links: [
      { type: 'linkedin', label: { en: 'LinkedIn Post', ar: 'منشور LinkedIn' }, url: 'https://www.linkedin.com/posts/malaak-al-zoubi_graduation-project-ai-activity-7286321432274350080-z6Kw?utm_source=social_share_send&utm_medium=member_desktop_web&rcm=ACoAADly3zwB-1qHFdhbtTqvL8pCFTPUyAHr6Qk' },
    ],
    gallery: [],
  },

  // ── 2. RAG Assistant for Excellence Awards ─────────────────────────────────
  {
    id: 'rag-excellence-awards',
    featured: true,
    year: 2025,
    category: 'genai',
    tags: ['Python', 'Flask', 'LangChain', 'FAISS', 'OpenAI', 'RAG', 'Bilingual', 'NLP'],
    title: {
      en: 'AI-Powered RAG Assistant — Excellence Awards Platform',
      ar: 'مساعد RAG الذكي — منصة جوائز التميز',
    },
    shortDesc: {
      en: 'Bilingual AR/EN chatbot with a full RAG pipeline, streaming responses, voice interaction, a PDF viewer, and multi-category document search — built at AI Brains.',
      ar: 'روبوت محادثة ثنائي اللغة (عربي/إنجليزي) مع pipeline RAG كامل واستجابة فورية (streaming) وتفاعل صوتي وعارض PDF وبحث متعدد الفئات — مُطوَّر في AI Brains.',
    },
    fullDesc: {
      en: `Built at AI Brains, this production chatbot serves as the intelligent query interface for an Excellence Awards platform. Users can ask questions in Arabic or English about award criteria, regulations, and historical decisions.\n\nThe system uses a LangChain RAG pipeline backed by a FAISS vector store and OpenAI embeddings. Answers are streamed token-by-token for a responsive feel. An integrated PDF viewer lets users see the source document alongside the answer, and voice input/output extends accessibility.`,
      ar: 'طُوِّر في AI Brains، هذا الروبوت الذكي الإنتاجي يعمل كواجهة استعلام ذكية لمنصة جوائز التميز. يمكن للمستخدمين طرح أسئلة بالعربية أو الإنجليزية حول معايير الجوائز واللوائح والقرارات التاريخية.\n\nيستخدم النظام pipeline LangChain للـ RAG مدعوماً بـ vector store من نوع FAISS وـ embeddings من OpenAI. تُبَثّ الإجابات token بـ token لتجربة استجابة آنية. عارض PDF مدمج يُتيح للمستخدم مشاهدة المستند المصدر جنباً إلى جنب مع الإجابة، والإدخال/الإخراج الصوتي يُعزز إمكانية الوصول.',
    },
    tools: [
      { name: 'Python',   iconUrl: si('python'),   iconType: 'simpleicons', color: '#3776AB' },
      { name: 'Flask',    iconUrl: si('flask'),    iconType: 'simpleicons', color: '#000000' },
      { name: 'LangChain',iconUrl: si('langchain'),iconType: 'simpleicons', color: '#1C3C3C' },
      { name: 'FAISS',    iconUrl: undefined,      iconType: 'text',        color: '#0066CC' },
      { name: 'OpenAI',   iconUrl: undefined,      iconType: 'text',        color: '#412991' },
      { name: 'RAG',      iconUrl: undefined,      iconType: 'text',        color: '#C4829A' },
    ],
    features: [
      { en: 'Bilingual (Arabic & English) natural language query handling', ar: 'معالجة استعلامات اللغة الطبيعية ثنائية اللغة (عربي وإنجليزي)' },
      { en: 'Full RAG pipeline: embedding, FAISS vector search, contextual generation', ar: 'Pipeline RAG كامل: embedding وبحث FAISS vector وتوليد سياقي' },
      { en: 'Streaming token-by-token responses for real-time feel', ar: 'استجابات token بـ token في الوقت الفعلي' },
      { en: 'Voice input and text-to-speech output', ar: 'إدخال صوتي وإخراج نصي إلى كلام' },
      { en: 'Integrated PDF viewer with source highlighting', ar: 'عارض PDF مدمج مع تحديد المصدر' },
      { en: 'Multi-category document indexing for award regulations and decisions', ar: 'فهرسة مستندات متعددة الفئات للوائح الجوائز والقرارات' },
    ],
    role: {
      en: 'AI Developer at AI Brains. Designed and implemented the full RAG pipeline (embedding, vector store, retrieval, generation), built the Flask API backend, integrated streaming and voice features, and developed the frontend chat interface.',
      ar: 'مطورة ذكاء اصطناعي في AI Brains. صممت ونفذت pipeline RAG الكامل (embedding وvector store والاسترجاع والتوليد)، وبنيت Flask API الخلفي، وأدمجت ميزات الـ streaming والصوت، وطورت واجهة المحادثة الأمامية.',
    },
    architecture: {
      description: {
        en: 'User query → language detection → LangChain query processing → FAISS semantic search → top-k document chunks retrieved → OpenAI GPT generation with context → streaming response to frontend → PDF source viewer.',
        ar: 'استعلام المستخدم → كشف اللغة → معالجة الاستعلام بـ LangChain → بحث دلالي في FAISS → استرجاع top-k مقاطع من المستندات → توليد GPT من OpenAI مع السياق → streaming إلى الواجهة الأمامية → عارض مصدر PDF.',
      },
      nodes: [
        { id: 'query',    label: { en: 'User Query (AR/EN)', ar: 'استعلام المستخدم (عربي/إنجليزي)' }, type: 'input'   },
        { id: 'langchain',label: { en: 'LangChain Pipeline',  ar: 'Pipeline LangChain' },               type: 'process' },
        { id: 'faiss',    label: { en: 'FAISS Vector Store',  ar: 'FAISS Vector Store' },               type: 'storage' },
        { id: 'openai',   label: { en: 'OpenAI GPT',          ar: 'OpenAI GPT' },                       type: 'model'   },
        { id: 'stream',   label: { en: 'Streaming Response',  ar: 'استجابة Streaming' },               type: 'output'  },
        { id: 'pdf',      label: { en: 'PDF Viewer',          ar: 'عارض PDF' },                         type: 'ui'      },
      ],
    },
    results: {
      en: 'Delivered a production-ready bilingual RAG chatbot that significantly reduced manual document lookup time for award administrators. The streaming interface provided a noticeably more responsive experience compared to a batch-response approach.',
      ar: 'تم تسليم روبوت محادثة RAG ثنائي اللغة جاهز للإنتاج، قلَّص بشكل ملحوظ وقت البحث اليدوي في المستندات لمديري الجوائز. وفَّرت واجهة Streaming تجربة أكثر استجابةً بشكل ملحوظ مقارنةً بالإجابات الدفعية.',
    },
    challenges: {
      en: 'Handling bilingual document chunks required careful embedding strategy — mixed-language queries needed a retrieval approach that did not penalize cross-language semantic similarity. Optimizing FAISS index build time for large document collections and ensuring latency stayed acceptable during streaming were the main engineering challenges.',
      ar: 'معالجة مقاطع المستندات ثنائية اللغة تطلَّبت استراتيجية embedding دقيقة — الاستعلامات متعددة اللغات احتاجت نهج استرجاع لا يُعاقب على التشابه الدلالي عبر اللغات. تحسين وقت بناء FAISS index لمجموعات المستندات الكبيرة وضمان بقاء زمن الاستجابة مقبولاً خلال Streaming كانا التحديين الهندسيين الرئيسيين.',
    },
    links: [],
    gallery: [],
    company: 'AI Brains',
  },

  // ── 3. Tashrea Assistant ───────────────────────────────────────────────────
  {
    id: 'tashrea-assistant',
    featured: true,
    year: 2025,
    category: 'genai',
    tags: ['Python', 'FastAPI', 'OCR', 'Gemini AI', 'Azure OpenAI', 'Azure Blob Storage', 'NLP', 'Document Intelligence'],
    title: {
      en: 'Tashrea — AI-Powered Legislative Analysis Platform',
      ar: 'تشريع — منصة التحليل التشريعي بالذكاء الاصطناعي',
    },
    shortDesc: {
      en: 'FastAPI platform for legislative document analysis: OCR extraction, AI-powered article comparison, drafting suggestions, bilingual search, and Azure-integrated classification.',
      ar: 'منصة FastAPI لتحليل الوثائق التشريعية: استخراج OCR ومقارنة مواد بالذكاء الاصطناعي واقتراحات صياغة وبحث ثنائي اللغة وتصنيف مدمج مع Azure.',
    },
    fullDesc: {
      en: `Tashrea is an enterprise-grade legislative intelligence platform built at AI Brains. It ingests PDF legislation via OCR, stores documents in Azure Blob Storage, and applies a multi-stage AI pipeline for deep legal analysis.\n\nThe FastAPI backend orchestrates article-by-article comparison using Gemini AI, provides drafting suggestions for amendments, supports bilingual (AR/EN) query expansion for deep search, and serves an Azure OpenAI-powered chatbot for free-form Q&A. A document classification pipeline automatically tags and organizes incoming files.`,
      ar: 'تشريع (Tashrea) هي منصة ذكاء تشريعية بمستوى المؤسسات، طُوِّرت في AI Brains. تستوعب الوثائق التشريعية بصيغة PDF عبر OCR، وتخزَّن في Azure Blob Storage، وتُطبَّق عليها pipeline ذكاء اصطناعي متعدد المراحل للتحليل القانوني العميق.\n\nيُنسِّق FastAPI الخلفي المقارنة مادة بمادة باستخدام Gemini AI، ويُقدم اقتراحات صياغة للتعديلات، ويدعم توسيع الاستعلامات ثنائي اللغة (عربي/إنجليزي) للبحث العميق، ويُشغِّل روبوت محادثة مدعوم بـ Azure OpenAI للأسئلة الحرة. pipeline تصنيف المستندات تُوسِّم الملفات الواردة وتنظمها تلقائياً.',
    },
    tools: [
      { name: 'Python',        iconUrl: si('python'),          iconType: 'simpleicons', color: '#3776AB' },
      { name: 'FastAPI',       iconUrl: si('fastapi'),         iconType: 'simpleicons', color: '#009688' },
      { name: 'OCR',           iconUrl: undefined,             iconType: 'text',        color: '#E67E22' },
      { name: 'Gemini AI',     iconUrl: si('googlegemini'),    iconType: 'simpleicons', color: '#4285F4' },
      { name: 'Azure OpenAI',  iconUrl: undefined,             iconType: 'text',        color: '#0078D4' },
      { name: 'Azure Blob',    iconUrl: undefined,             iconType: 'text',        color: '#0078D4' },
      { name: 'LangChain',     iconUrl: si('langchain'),       iconType: 'simpleicons', color: '#1C3C3C' },
    ],
    features: [
      { en: 'OCR-based PDF ingestion and text extraction for Arabic and English documents', ar: 'استيعاب PDF واستخراج النص عبر OCR للوثائق العربية والإنجليزية' },
      { en: 'Article-by-article AI comparison using Gemini AI', ar: 'مقارنة مادة بمادة بالذكاء الاصطناعي باستخدام Gemini AI' },
      { en: 'AI-assisted legislative drafting suggestions for amendments', ar: 'اقتراحات صياغة تشريعية مدعومة بالذكاء الاصطناعي للتعديلات' },
      { en: 'Bilingual query expansion for deep semantic search', ar: 'توسيع الاستعلامات ثنائي اللغة للبحث الدلالي العميق' },
      { en: 'Azure OpenAI-powered free-form legislative chatbot', ar: 'روبوت محادثة تشريعي حر مدعوم بـ Azure OpenAI' },
      { en: 'Automated document classification and Azure Blob Storage pipeline', ar: 'تصنيف تلقائي للمستندات وpipeline Azure Blob Storage' },
    ],
    role: {
      en: 'AI Developer at AI Brains. Built the FastAPI backend architecture, implemented the OCR ingestion pipeline, integrated Gemini AI for article comparison, designed bilingual query expansion, and connected the Azure OpenAI chatbot and Blob Storage services.',
      ar: 'مطورة ذكاء اصطناعي في AI Brains. بنيت معمارية FastAPI الخلفية، ونفذت pipeline استيعاب OCR، وأدمجت Gemini AI لمقارنة المواد، وصممت توسيع الاستعلامات ثنائي اللغة، وربطت خدمات Azure OpenAI وAzure Blob Storage.',
    },
    architecture: {
      description: {
        en: 'PDF upload → OCR text extraction → Azure Blob Storage → classification pipeline → Gemini AI article comparison → bilingual query expansion → deep search → Azure OpenAI chatbot → FastAPI responses.',
        ar: 'رفع PDF → استخراج OCR → Azure Blob Storage → pipeline التصنيف → مقارنة Gemini AI للمواد → توسيع الاستعلامات ثنائي اللغة → بحث عميق → روبوت Azure OpenAI → استجابات FastAPI.',
      },
      nodes: [
        { id: 'upload',  label: { en: 'PDF Upload',           ar: 'رفع PDF' },               type: 'input'   },
        { id: 'ocr',     label: { en: 'OCR Extraction',       ar: 'استخراج OCR' },           type: 'process' },
        { id: 'blob',    label: { en: 'Azure Blob Storage',   ar: 'Azure Blob Storage' },    type: 'storage' },
        { id: 'gemini',  label: { en: 'Gemini AI Analysis',   ar: 'تحليل Gemini AI' },       type: 'model'   },
        { id: 'azure',   label: { en: 'Azure OpenAI Chatbot', ar: 'روبوت Azure OpenAI' },    type: 'model'   },
        { id: 'fastapi', label: { en: 'FastAPI Backend',      ar: 'FastAPI الخلفي' },        type: 'api'     },
        { id: 'output',  label: { en: 'Analysis & Response',  ar: 'التحليل والاستجابة' },   type: 'output'  },
      ],
    },
    results: {
      en: 'Delivered a comprehensive legislative analysis platform that reduced manual document review effort for legal teams. The bilingual search capability enabled effective querying across Arabic and English legislation, and the automated classification pipeline improved document organization at scale.',
      ar: 'تم تسليم منصة تحليل تشريعي شاملة قلَّصت جهد المراجعة اليدوية للمستندات للفِرَق القانونية. أتاحت قدرة البحث ثنائي اللغة الاستعلام الفعَّال عبر التشريعات العربية والإنجليزية، وحسَّن pipeline التصنيف التلقائي تنظيم المستندات على نطاق واسع.',
    },
    challenges: {
      en: 'OCR quality on Arabic legal text presented significant challenges — Arabic script variation, specialized vocabulary, and mixed-language documents required custom preprocessing and post-correction steps. Orchestrating multiple AI services (Gemini + Azure OpenAI) in a single coherent pipeline while maintaining response consistency required careful prompt engineering and error handling.',
      ar: 'جودة OCR على النصوص القانونية العربية مثَّلت تحديات كبيرة — تنوع الخط العربي والمصطلحات المتخصصة والمستندات متعددة اللغات تطلَّبت معالجة مسبقة مخصصة وخطوات تصحيح لاحق. تنسيق خدمات ذكاء اصطناعي متعددة (Gemini + Azure OpenAI) في pipeline متسق مع الحفاظ على اتساق الاستجابات تطلَّب هندسة prompt دقيقة ومعالجة أخطاء محكمة.',
    },
    links: [],
    gallery: [],
    company: 'AI Brains',
  },

  // ── 4. Food Prices in Syria ────────────────────────────────────────────────
  {
    id: 'syria-food-prices',
    featured: false,
    year: 2024,
    category: 'data',
    tags: ['Python', 'pandas', 'matplotlib', 'Tableau', 'EDA', 'Feature Engineering', 'Data Visualization'],
    title: {
      en: 'Food Prices in Syria During the Conflict — EDA & Visualization',
      ar: 'أسعار المواد الغذائية في سوريا خلال النزاع — EDA وتصوير بياني',
    },
    shortDesc: {
      en: 'Exploratory data analysis of WFP Syria food price data (2011–2017) with feature engineering, temporal trend visualization, and an interactive Tableau dashboard.',
      ar: 'تحليل استكشافي لبيانات أسعار الغذاء في سوريا من WFP (2011–2017) مع feature engineering وتصوير الاتجاهات الزمنية ولوحة Tableau تفاعلية.',
    },
    fullDesc: {
      en: `This project analyzes the World Food Programme's Syria food price dataset spanning the years 2011–2017 — covering the period of the Syrian civil conflict. The analysis explores how commodity prices evolved across different regions and markets under conflict conditions.\n\nUsing pandas for data cleaning and feature engineering, the project constructs temporal and geographic features, identifies price volatility patterns, and visualizes regional disparities. A Tableau dashboard provides interactive exploration of the findings.`,
      ar: 'يحلل هذا المشروع بيانات أسعار الغذاء في سوريا من WFP للفترة 2011–2017 — التي تغطي فترة النزاع المسلح. يستكشف التحليل كيف تطورت أسعار السلع عبر المناطق والأسواق المختلفة في ظل ظروف النزاع.\n\nباستخدام pandas لتنظيف البيانات وـ feature engineering، يبني المشروع ميزات زمنية وجغرافية، ويحدد أنماط تقلب الأسعار، ويُصوِّر التفاوتات الإقليمية بيانياً. لوحة Tableau توفر استكشافاً تفاعلياً للنتائج.',
    },
    tools: [
      { name: 'Python',    iconUrl: si('python'),     iconType: 'simpleicons', color: '#3776AB' },
      { name: 'pandas',    iconUrl: si('pandas'),     iconType: 'simpleicons', color: '#150458' },
      { name: 'matplotlib',iconUrl: undefined,        iconType: 'text',        color: '#11557C' },
      { name: 'Tableau',   iconUrl: undefined,        iconType: 'text',        color: '#E97627' },
      { name: 'NumPy',     iconUrl: si('numpy'),      iconType: 'simpleicons', color: '#013243' },
    ],
    features: [
      { en: 'Data cleaning and standardization of WFP commodity price records', ar: 'تنظيف وتوحيد بيانات أسعار سلع WFP' },
      { en: 'Feature engineering: rolling averages, price volatility indices, regional aggregations', ar: 'Feature engineering: متوسطات متحركة ومؤشرات تقلب الأسعار وتجميعات إقليمية' },
      { en: 'Temporal trend analysis across conflict timeline', ar: 'تحليل الاتجاهات الزمنية عبر timeline النزاع' },
      { en: 'Geographic price disparity visualization', ar: 'تصوير بياني للتفاوتات الجغرافية في الأسعار' },
      { en: 'Interactive Tableau dashboard for multi-dimensional exploration', ar: 'لوحة Tableau تفاعلية للاستكشاف متعدد الأبعاد' },
    ],
    role: {
      en: 'Sole analyst. Handled all stages from raw data ingestion, cleaning, and feature engineering through to visualization design and Tableau dashboard creation.',
      ar: 'محللة وحيدة. تناولت جميع المراحل من استيعاب البيانات الخام والتنظيف وـ feature engineering حتى تصميم التصوير البياني وإنشاء لوحة Tableau.',
    },
    architecture: {
      description: {
        en: 'WFP raw CSV data → pandas cleaning & feature engineering → matplotlib/seaborn static visualizations → Tableau interactive dashboard.',
        ar: 'بيانات CSV الخام من WFP → تنظيف pandas وـ feature engineering → تصورات ثابتة بـ matplotlib/seaborn → لوحة Tableau التفاعلية.',
      },
      nodes: [
        { id: 'data',  label: { en: 'WFP Dataset (CSV)', ar: 'بيانات WFP (CSV)' },          type: 'input'   },
        { id: 'clean', label: { en: 'pandas Cleaning',    ar: 'تنظيف pandas' },              type: 'process' },
        { id: 'feat',  label: { en: 'Feature Engineering',ar: 'Feature Engineering' },       type: 'process' },
        { id: 'viz',   label: { en: 'matplotlib Charts',  ar: 'رسوم matplotlib' },           type: 'output'  },
        { id: 'tab',   label: { en: 'Tableau Dashboard',  ar: 'لوحة Tableau' },             type: 'ui'      },
      ],
    },
    results: {
      en: 'Produced a clear analytical narrative of food price dynamics during the Syrian conflict, with actionable visualizations and an interactive dashboard that allows exploration by commodity, region, and time period.',
      ar: 'أُنتِجت سرديةٌ تحليلية واضحة لديناميكيات أسعار الغذاء خلال النزاع السوري، مع تصورات قابلة للتنفيذ ولوحة تفاعلية تتيح الاستكشاف حسب السلعة والمنطقة والفترة الزمنية.',
    },
    challenges: {
      en: 'The dataset had significant missing values and inconsistent market naming across regions. Constructing meaningful temporal features while handling gaps in conflict-affected areas required domain-aware imputation strategies and careful temporal alignment.',
      ar: 'كانت مجموعة البيانات تحتوي على قيم مفقودة كثيرة وتسمية غير متسقة للأسواق عبر المناطق. بناء ميزات زمنية ذات معنى مع معالجة الثغرات في المناطق المتضررة من النزاع تطلَّب استراتيجيات imputation تراعي النطاق ومحاذاة زمنية دقيقة.',
    },
    links: [
      { type: 'github', label: { en: 'GitHub', ar: 'GitHub' }, url: 'https://github.com/malaakb1/Food-Prices-in-Syria-during-the-Conflict' },
      { type: 'images', label: { en: 'Tableau Dashboard', ar: 'لوحة Tableau' }, url: 'https://public.tableau.com/views/SyrianFoodPricesDuringtheConflict/Dashboard1?:language=en-US&:sid=&:redirect=auth&:display_count=n&:origin=viz_share_link' },
    ],
    gallery: [],
  },

  // ── 5. Music Genre Classification ─────────────────────────────────────────
  {
    id: 'music-genre-classification',
    featured: false,
    year: 2024,
    category: 'data',
    tags: ['Python', 'scikit-learn', 'Random Forest', 'Ensemble', 'ML Pipeline', 'Audio Features'],
    title: {
      en: 'Music Genre Classification — ML Pipeline',
      ar: 'تصنيف أنواع الموسيقى — ML Pipeline',
    },
    shortDesc: {
      en: 'End-to-end scikit-learn ML pipeline for music genre classification: preprocessing, feature scaling, baseline Random Forest, and an ensemble voting classifier.',
      ar: 'Pipeline تعلم آلي متكامل بـ scikit-learn لتصنيف أنواع الموسيقى: معالجة مسبقة وتطبيع ميزات ونموذج أساسي Random Forest ومصنِّف تصويت تجميعي.',
    },
    fullDesc: {
      en: `This project builds a complete machine learning pipeline to classify music tracks by genre using audio feature datasets (such as GTZAN). The pipeline handles preprocessing, feature scaling, and model training using scikit-learn.\n\nStarting with a baseline Random Forest classifier, the project progressively introduces ensemble methods including soft voting over multiple classifiers. Evaluation is done with cross-validation and standard classification metrics.`,
      ar: 'يبني هذا المشروع pipeline تعلم آلي متكاملاً لتصنيف المقاطع الموسيقية حسب النوع باستخدام مجموعات بيانات الميزات الصوتية (مثل GTZAN). يتولى الـ pipeline المعالجة المسبقة والتطبيع والتدريب باستخدام scikit-learn.\n\nانطلاقاً من نموذج أساسي Random Forest، يُقدِّم المشروع تدريجياً طرق Ensemble بما فيها التصويت الناعم عبر مصنِّفات متعددة. يُجرى التقييم بـ cross-validation ومقاييس التصنيف المعيارية.',
    },
    tools: [
      { name: 'Python',       iconUrl: si('python'),       iconType: 'simpleicons', color: '#3776AB' },
      { name: 'scikit-learn', iconUrl: si('scikitlearn'),  iconType: 'simpleicons', color: '#F7931E' },
      { name: 'NumPy',        iconUrl: si('numpy'),        iconType: 'simpleicons', color: '#013243' },
      { name: 'pandas',       iconUrl: si('pandas'),       iconType: 'simpleicons', color: '#150458' },
      { name: 'Jupyter',      iconUrl: si('jupyter'),      iconType: 'simpleicons', color: '#F37626' },
    ],
    features: [
      { en: 'Preprocessing pipeline with feature scaling (StandardScaler)', ar: 'Pipeline معالجة مسبقة مع تطبيع الميزات (StandardScaler)' },
      { en: 'Baseline Random Forest classifier with hyperparameter tuning', ar: 'نموذج أساسي Random Forest مع ضبط المعاملات' },
      { en: 'Ensemble voting classifier combining multiple models', ar: 'مصنِّف تصويت Ensemble يجمع نماذج متعددة' },
      { en: 'Cross-validation for robust performance estimation', ar: 'Cross-validation لتقدير أداء موثوق' },
      { en: 'Confusion matrix and classification report analysis', ar: 'تحليل مصفوفة الالتباس وتقرير التصنيف' },
    ],
    role: {
      en: 'Sole developer. Built the complete ML pipeline from data loading through feature engineering, model training, ensemble design, and evaluation.',
      ar: 'مطورة وحيدة. بنيت pipeline التعلم الآلي الكامل من تحميل البيانات عبر feature engineering وتدريب النماذج وتصميم Ensemble والتقييم.',
    },
    architecture: {
      description: {
        en: 'Audio feature CSV → pandas ingestion → scikit-learn Pipeline (imputation → scaling) → Random Forest baseline → Ensemble Voting → evaluation metrics.',
        ar: 'CSV الميزات الصوتية → استيعاب pandas → scikit-learn Pipeline (imputation → تطبيع) → أساسي Random Forest → Ensemble Voting → مقاييس التقييم.',
      },
      nodes: [
        { id: 'data',     label: { en: 'Audio Feature Dataset', ar: 'مجموعة الميزات الصوتية' }, type: 'input'   },
        { id: 'preproc',  label: { en: 'Preprocessing Pipeline', ar: 'Pipeline المعالجة' },     type: 'process' },
        { id: 'rf',       label: { en: 'Random Forest',         ar: 'Random Forest' },           type: 'model'   },
        { id: 'ensemble', label: { en: 'Ensemble Voting',        ar: 'Ensemble Voting' },         type: 'model'   },
        { id: 'eval',     label: { en: 'Evaluation Metrics',    ar: 'مقاييس التقييم' },          type: 'output'  },
      ],
    },
    results: {
      en: 'The ensemble voting classifier outperformed the baseline Random Forest across standard genre classification benchmarks. The structured pipeline approach made the model modular and easy to extend with additional classifiers.',
      ar: 'تفوَّق مصنِّف Ensemble Voting على نموذج Random Forest الأساسي عبر معايير تصنيف الأنواع القياسية. النهج القائم على Pipeline المنظَّم جعل النموذج معيارياً وسهل التوسيع بمصنِّفات إضافية.',
    },
    challenges: {
      en: 'Selecting and combining the right subset of audio features for each classifier type required iterative experimentation. Class imbalance in certain genre categories needed to be addressed through stratified sampling and careful evaluation methodology.',
      ar: 'اختيار ودمج المجموعة الصحيحة من الميزات الصوتية لكل نوع مصنِّف تطلَّب تجارب متكررة. عدم توازن الفئات في بعض تصنيفات الأنواع احتاج معالجةً عبر أخذ عينات طبقي (stratified sampling) ومنهجية تقييم دقيقة.',
    },
    links: [
      { type: 'github', label: { en: 'GitHub', ar: 'GitHub' }, url: 'https://github.com/malaakb1/Music-Genre-Classification' },
    ],
    gallery: [],
  },

  // ── 6. Salaries Data Analysis ──────────────────────────────────────────────
  {
    id: 'salaries-eda',
    featured: false,
    year: 2024,
    category: 'data',
    tags: ['Python', 'pandas', 'matplotlib', 'EDA', 'Data Cleaning', 'Statistical Analysis'],
    title: {
      en: 'Salaries Data Analysis — EDA',
      ar: 'تحليل بيانات الرواتب — EDA',
    },
    shortDesc: {
      en: 'Comprehensive EDA on a large salary dataset: data cleaning, outlier handling, statistical analysis, and multi-dimensional visualizations revealing compensation trends.',
      ar: 'EDA شاملة لمجموعة بيانات رواتب كبيرة: تنظيف البيانات ومعالجة القيم الشاذة والتحليل الإحصائي وتصورات متعددة الأبعاد تكشف اتجاهات التعويضات.',
    },
    fullDesc: {
      en: `This exploratory data analysis project examines a large salary dataset to uncover compensation patterns, industry trends, and factors influencing pay. The analysis covers the full EDA lifecycle: data loading, quality assessment, missing value treatment, outlier detection, and a comprehensive visualization suite.\n\nStatistical summaries and correlation analyses provide quantitative insight, while matplotlib-based visualizations make the findings accessible and presentation-ready.`,
      ar: 'يفحص هذا المشروع للتحليل الاستكشافي مجموعة بيانات رواتب كبيرة للكشف عن أنماط التعويضات واتجاهات الصناعة والعوامل المؤثرة على الأجور. يغطي التحليل دورة EDA الكاملة: تحميل البيانات وتقييم الجودة ومعالجة القيم المفقودة وكشف القيم الشاذة ومجموعة تصور بياني شاملة.\n\nتوفر الملخصات الإحصائية وتحليلات الارتباط رؤية كمية، بينما تجعل التصورات البيانية بـ matplotlib النتائج قابلة للوصول وجاهزة للعرض.',
    },
    tools: [
      { name: 'Python',     iconUrl: si('python'),     iconType: 'simpleicons', color: '#3776AB' },
      { name: 'pandas',     iconUrl: si('pandas'),     iconType: 'simpleicons', color: '#150458' },
      { name: 'matplotlib', iconUrl: undefined,        iconType: 'text',        color: '#11557C' },
      { name: 'NumPy',      iconUrl: si('numpy'),      iconType: 'simpleicons', color: '#013243' },
      { name: 'Jupyter',    iconUrl: si('jupyter'),    iconType: 'simpleicons', color: '#F37626' },
    ],
    features: [
      { en: 'Thorough data cleaning: type coercion, duplicate removal, missing value strategies', ar: 'تنظيف شامل للبيانات: تحويل الأنواع وإزالة التكرارات واستراتيجيات القيم المفقودة' },
      { en: 'Outlier detection and treatment using IQR and z-score methods', ar: 'كشف ومعالجة القيم الشاذة باستخدام طرق IQR وz-score' },
      { en: 'Distribution analysis of salary by role, industry, and experience', ar: 'تحليل توزيع الراتب حسب الدور والصناعة والخبرة' },
      { en: 'Correlation matrix and feature relationship analysis', ar: 'مصفوفة الارتباط وتحليل علاقات الميزات' },
      { en: 'Business-ready visualizations (box plots, histograms, bar charts, heatmaps)', ar: 'تصورات جاهزة للأعمال (box plots وhistograms وbar charts وheatmaps)' },
    ],
    role: {
      en: 'Sole analyst. Led all phases of the EDA from data acquisition through insight generation and visualization.',
      ar: 'محللة وحيدة. قادت جميع مراحل الـ EDA من الحصول على البيانات حتى توليد الرؤى والتصوير البياني.',
    },
    architecture: {
      description: {
        en: 'Raw salary dataset → pandas data cleaning → statistical EDA → matplotlib/seaborn visualizations → insights report.',
        ar: 'مجموعة بيانات الرواتب الخام → تنظيف pandas → EDA إحصائية → تصورات matplotlib/seaborn → تقرير الرؤى.',
      },
      nodes: [
        { id: 'data',  label: { en: 'Raw Dataset',         ar: 'البيانات الخام' },    type: 'input'   },
        { id: 'clean', label: { en: 'Data Cleaning',        ar: 'تنظيف البيانات' },   type: 'process' },
        { id: 'eda',   label: { en: 'Statistical EDA',      ar: 'EDA إحصائية' },      type: 'process' },
        { id: 'viz',   label: { en: 'Visualizations',       ar: 'التصورات البيانية' },type: 'output'  },
        { id: 'rep',   label: { en: 'Insights Report',      ar: 'تقرير الرؤى' },     type: 'output'  },
      ],
    },
    results: {
      en: 'Delivered a complete analytical report with clear visual narratives on salary trends, role-based compensation ranges, and key influencing factors, providing actionable insights for stakeholders.',
      ar: 'قُدِّم تقرير تحليلي كامل بسرديات بصرية واضحة حول اتجاهات الرواتب ونطاقات التعويضات القائمة على الأدوار والعوامل المؤثرة الرئيسية، مما يوفر رؤى قابلة للتنفيذ لأصحاب المصلحة.',
    },
    challenges: {
      en: 'The dataset contained heterogeneous salary formats (hourly, monthly, annual) requiring standardization, as well as high cardinality categorical columns needing bucketing strategies before meaningful aggregation was possible.',
      ar: 'كانت مجموعة البيانات تحتوي على صيغ رواتب غير متجانسة (بالساعة، بالشهر، بالسنة) تتطلب توحيداً، فضلاً عن أعمدة فئوية عالية الكثافة تحتاج استراتيجيات تجميع قبل أن يصبح التجميع ذا معنى.',
    },
    links: [
      { type: 'github', label: { en: 'GitHub', ar: 'GitHub' }, url: 'https://github.com/malaakb1' },
    ],
    gallery: [],
  },

  // ── 7. Diamond Price Prediction ────────────────────────────────────────────
  {
    id: 'diamond-price-prediction',
    featured: false,
    year: 2024,
    category: 'data',
    tags: ['Python', 'XGBoost', 'scikit-learn', 'GridSearchCV', 'Feature Engineering', 'Regression'],
    title: {
      en: 'Diamond Price Prediction — XGBoost',
      ar: 'التنبؤ بأسعار الماس — XGBoost',
    },
    shortDesc: {
      en: 'Regression model for diamond price prediction using feature engineering (volume), ordinal encoding, GridSearchCV tuning, and XGBoost — benchmarked against multiple baselines.',
      ar: 'نموذج انحدار للتنبؤ بأسعار الماس باستخدام feature engineering (الحجم) وترميز ترتيبي وضبط GridSearchCV وـ XGBoost — مُقارَن بنماذج أساسية متعددة.',
    },
    fullDesc: {
      en: 'This supervised regression project predicts diamond prices using a structured ML pipeline. Key feature engineering steps include creating a derived volume feature (x * y * z) and applying ordinal encoding to categorical quality variables (cut, color, clarity).\n\nMultiple baseline models are benchmarked before hyperparameter optimization via GridSearchCV. XGBoost is selected as the final model after outperforming alternatives on held-out validation data.',
      ar: 'يتنبأ هذا المشروع للانحدار الخاضع للإشراف بأسعار الماس باستخدام pipeline تعلم آلي منظمة. تشمل خطوات feature engineering الرئيسية إنشاء ميزة حجم مشتقة وتطبيق الترميز الترتيبي على المتغيرات النوعية الجودية (cut وcolor وclarity).\n\nتتم مقارنة نماذج أساسية متعددة قبل تحسين المعاملات عبر GridSearchCV. يختار XGBoost كنموذج نهائي بعد تفوقه على البدائل على بيانات التحقق المحجوبة.',
    },
    tools: [
      { name: 'Python',       iconUrl: si('python'),      iconType: 'simpleicons', color: '#3776AB' },
      { name: 'XGBoost',      iconUrl: undefined,         iconType: 'text',        color: '#189F4A' },
      { name: 'scikit-learn', iconUrl: si('scikitlearn'), iconType: 'simpleicons', color: '#F7931E' },
      { name: 'pandas',       iconUrl: si('pandas'),      iconType: 'simpleicons', color: '#150458' },
      { name: 'NumPy',        iconUrl: si('numpy'),       iconType: 'simpleicons', color: '#013243' },
      { name: 'Jupyter',      iconUrl: si('jupyter'),     iconType: 'simpleicons', color: '#F37626' },
    ],
    features: [
      { en: 'Derived volume feature engineering (x × y × z dimensions)', ar: 'هندسة ميزة الحجم المشتقة (أبعاد x × y × z)' },
      { en: 'Ordinal encoding for cut, color, and clarity quality variables', ar: 'ترميز ترتيبي لمتغيرات جودة cut وcolor وclarity' },
      { en: 'Feature scaling and pipeline construction with scikit-learn', ar: 'تطبيع الميزات وبناء Pipeline بـ scikit-learn' },
      { en: 'Multi-model benchmarking (Linear Regression, Ridge, Random Forest, XGBoost)', ar: 'مقارنة نماذج متعددة (Linear Regression وRidge وRandom Forest وXGBoost)' },
      { en: 'GridSearchCV hyperparameter optimization', ar: 'تحسين المعاملات بـ GridSearchCV' },
    ],
    role: {
      en: 'Sole developer. Designed the feature engineering strategy, built the pipeline, ran baseline comparisons, and tuned the final XGBoost model.',
      ar: 'مطورة وحيدة. صممت استراتيجية feature engineering، وبنيت الـ pipeline، وأجريت مقارنات النماذج الأساسية، وضبطت نموذج XGBoost النهائي.',
    },
    architecture: {
      description: {
        en: 'Diamond dataset → cleaning → feature engineering (volume, encoding) → scaling → model benchmarking → GridSearchCV → XGBoost prediction.',
        ar: 'مجموعة بيانات الماس → تنظيف → feature engineering (الحجم والترميز) → تطبيع → مقارنة النماذج → GridSearchCV → تنبؤ XGBoost.',
      },
      nodes: [
        { id: 'data',   label: { en: 'Diamond Dataset',        ar: 'بيانات الماس' },          type: 'input'   },
        { id: 'feat',   label: { en: 'Feature Engineering',    ar: 'Feature Engineering' },   type: 'process' },
        { id: 'bench',  label: { en: 'Model Benchmarking',     ar: 'مقارنة النماذج' },         type: 'process' },
        { id: 'gs',     label: { en: 'GridSearchCV Tuning',    ar: 'ضبط GridSearchCV' },      type: 'process' },
        { id: 'xgb',    label: { en: 'XGBoost Final Model',    ar: 'XGBoost النموذج النهائي' },type: 'model'   },
        { id: 'pred',   label: { en: 'Price Prediction',       ar: 'التنبؤ بالسعر' },          type: 'output'  },
      ],
    },
    results: {
      en: 'XGBoost with GridSearchCV-tuned hyperparameters achieved the lowest prediction error among all benchmarked models. The volume feature proved to be a strong predictor, demonstrating the value of domain-informed feature engineering over raw attribute usage.',
      ar: 'حقق XGBoost مع المعاملات المُحسَّنة بـ GridSearchCV أقل خطأ في التنبؤ بين جميع النماذج المُقارَنة. أثبتت ميزة الحجم أنها متنبئ قوي، مما يُظهر قيمة feature engineering المستنيرة بالمجال مقارنةً باستخدام الخصائص الخام.',
    },
    challenges: {
      en: 'Handling the ordinality of categorical quality variables (where "Ideal" cut is better than "Good") required careful encoding to ensure the model could leverage their natural order. GridSearchCV over a large parameter space required efficient cross-validation strategy to keep compute time manageable.',
      ar: 'معالجة الترتيبية لمتغيرات الجودة النوعية (حيث cut نوع "Ideal" أفضل من "Good") تطلَّبت ترميزاً دقيقاً لضمان قدرة النموذج على الاستفادة من ترتيبها الطبيعي. تطبيق GridSearchCV على فضاء معاملات كبير تطلَّب استراتيجية cross-validation فعَّالة للحفاظ على وقت حسابي معقول.',
    },
    links: [
      { type: 'github', label: { en: 'GitHub', ar: 'GitHub' }, url: 'https://github.com/malaakb1/Diamond-price-prediction-XGBoost' },
    ],
    gallery: [],
  },

  // ── 8. Tasreefah ──────────────────────────────────────────────────────────
  {
    id: 'tasreefah',
    featured: false,
    year: 2024,
    category: 'product',
    tags: ['Product Strategy', 'Business Research', 'Food Tech', 'Sustainability', 'Marketplace', 'WFP Hackathon'],
    title: {
      en: 'Tasreefah — Food Waste Reduction Startup',
      ar: 'تصريفة — شركة ناشئة للحد من هدر الغذاء',
    },
    shortDesc: {
      en: 'Award-winning marketplace concept connecting retailers with consumers to sell near-expiry food at discounted prices — winner at the WFP Food Waste Hackathon 2024.',
      ar: 'مفهوم سوق إلكتروني حائز على جائزة يربط تجار التجزئة بالمستهلكين لبيع الأغذية قريبة الانتهاء بأسعار مخفضة — فائز في WFP Food Waste Hackathon 2024.',
    },
    fullDesc: {
      en: `Tasreefah (Arabic: "disposal/clearance") is a marketplace startup concept designed to tackle food waste by creating a platform where retailers and food producers can list near-expiry products at steep discounts, connecting them directly with budget-conscious consumers.\n\nThe project won funding recognition at the WFP Food Waste Hackathon (2024). The concept was developed through market research, competitive analysis, partnership modeling, and business strategy formulation, with a focus on the MENA region's food waste challenge.`,
      ar: 'تصريفة هي مفهوم شركة ناشئة لسوق إلكتروني صمم لمعالجة هدر الغذاء من خلال إنشاء منصة تتيح للتجار ومنتجي الأغذية عرض المنتجات قريبة انتهاء الصلاحية بخصومات كبيرة، تربطهم مباشرة بالمستهلكين المهتمين بالتوفير.\n\nفاز المشروع بتقدير تمويلي في WFP Food Waste Hackathon (2024). طور المفهوم من خلال أبحاث السوق والتحليل التنافسي ونمذجة الشراكات وصياغة استراتيجية الأعمال، مع التركيز على تحدي هدر الغذاء في منطقة MENA.',
    },
    tools: [
      { name: 'Product Strategy',   iconUrl: undefined, iconType: 'text', color: '#C4829A' },
      { name: 'Market Research',    iconUrl: undefined, iconType: 'text', color: '#9B8EC4' },
      { name: 'Business Analysis',  iconUrl: undefined, iconType: 'text', color: '#E8A87C' },
      { name: 'Partnership Design', iconUrl: undefined, iconType: 'text', color: '#5DADE2' },
      { name: 'Pitch Deck',         iconUrl: undefined, iconType: 'text', color: '#58D68D' },
    ],
    features: [
      { en: 'Marketplace model connecting retailers with consumers for near-expiry products', ar: 'نموذج سوق إلكتروني يربط التجار بالمستهلكين للمنتجات قريبة الانتهاء' },
      { en: 'Dual-sided value proposition: retailer revenue recovery + consumer savings', ar: 'قيمة مزدوجة: استرداد إيرادات التجار + توفير للمستهلكين' },
      { en: 'Partnership strategy with food retailers and supermarkets', ar: 'استراتيجية شراكة مع تجار التجزئة والسوبرماركت' },
      { en: 'Sustainability impact: measurable food waste reduction potential', ar: 'تأثير استدامة: إمكانية قياس انخفاض هدر الغذاء' },
      { en: 'Targeted at the MENA region food waste challenge', ar: 'مُستهدِف تحدي هدر الغذاء في منطقة MENA' },
    ],
    role: {
      en: 'Co-founder / Product Lead. Led market research, business model formulation, partnership strategy, and the hackathon pitch presentation.',
      ar: 'مؤسسة مشاركة / قائدة المنتج. قادت أبحاث السوق وصياغة نموذج الأعمال واستراتيجية الشراكة وعرض Hackathon.',
    },
    architecture: {
      description: {
        en: 'Market Research → Problem Definition → Business Model Canvas → Partnership Strategy → Platform Concept → Pitch & Validation.',
        ar: 'بحث السوق → تحديد المشكلة → Business Model Canvas → استراتيجية الشراكة → مفهوم المنصة → العرض والتحقق.',
      },
      nodes: [
        { id: 'research',  label: { en: 'Market Research',       ar: 'بحث السوق' },              type: 'input'   },
        { id: 'problem',   label: { en: 'Problem Definition',    ar: 'تحديد المشكلة' },           type: 'process' },
        { id: 'model',     label: { en: 'Business Model',        ar: 'نموذج الأعمال' },           type: 'process' },
        { id: 'platform',  label: { en: 'Platform Concept',      ar: 'مفهوم المنصة' },            type: 'process' },
        { id: 'pitch',     label: { en: 'WFP Hackathon Pitch',   ar: 'WFP Hackathon عرض' },       type: 'output'  },
        { id: 'award',     label: { en: 'Award & Funding',       ar: 'الجائزة والتمويل' },        type: 'output'  },
      ],
    },
    results: {
      en: 'Tasreefah received funding recognition at the WFP Food Waste Hackathon 2024, validating the business model and market opportunity. The project demonstrated the practical application of data-informed market research in building a compelling sustainability startup pitch.',
      ar: 'حصلت تصريفة على تقدير تمويلي في WFP Food Waste Hackathon 2024، مما أثبت نموذج الأعمال وفرصة السوق. أثبت المشروع التطبيق العملي لأبحاث السوق المبنية على البيانات في بناء عرض ناجح لشركة ناشئة مستدامة.',
    },
    challenges: {
      en: 'Designing a compelling double-sided marketplace model that simultaneously addressed retailer pain points (inventory clearance) and consumer motivations (savings + sustainability) required deep market research and iterative positioning. Winning hackathon judges required distilling complex business logic into a clear, impactful narrative.',
      ar: 'تصميم نموذج سوق مزدوج الجانب مقنع يعالج نقاط ألم التجار (تصفية المخزون) ودوافع المستهلكين (التوفير + الاستدامة) في آنٍ معاً تطلَّب بحثاً سوقياً معمَّقاً وتحديد موضع متكرر. إقناع محكمي Hackathon تطلَّب تقطير منطق أعمال معقد إلى سردية واضحة ومؤثرة.',
    },
    links: [
      { type: 'linkedin', label: { en: 'LinkedIn Post', ar: 'منشور LinkedIn' }, url: 'https://www.linkedin.com/in/malaak-al-zoubi/' },
    ],
    gallery: [],
  },
];

export const getFeaturedProjects = () => projects.filter((p) => p.featured);
export const getProjectById = (id: string) => projects.find((p) => p.id === id);
export const getProjectsByCategory = (cat: string) =>
  cat === 'all' ? projects : projects.filter((p) => p.category === cat);
