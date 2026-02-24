export type Locale = 'en' | 'ar';

export interface BilingualString {
  en: string;
  ar: string;
}

export type ProjectCategory =
  | 'genai'
  | 'nlp'
  | 'cv'
  | 'data'
  | 'mlops'
  | 'webapi'
  | 'product';

export interface ToolItem {
  name: string;
  iconUrl?: string;
  iconType?: 'simpleicons' | 'devicon' | 'custom' | 'text';
  color?: string;
}

export interface ProjectLink {
  type: 'github' | 'demo' | 'video' | 'images' | 'linkedin' | 'other';
  label: BilingualString;
  url: string;
}

export interface ArchitectureNode {
  id: string;
  label: BilingualString;
  sublabel?: BilingualString;
  type: 'input' | 'process' | 'model' | 'storage' | 'api' | 'output' | 'ui';
}

export interface Architecture {
  description: BilingualString;
  nodes: ArchitectureNode[];
}

export interface Project {
  id: string;
  title: BilingualString;
  shortDesc: BilingualString;
  fullDesc: BilingualString;
  category: ProjectCategory;
  tags: string[];
  tools: ToolItem[];
  links: ProjectLink[];
  features: BilingualString[];
  role: BilingualString;
  architecture: Architecture;
  challenges: BilingualString;
  results: BilingualString;
  gallery: string[];
  featured: boolean;
  year: number;
  /** If set, marks the project as company/client work (not a personal project). */
  company?: string;
}

export interface TimelineItem {
  role: BilingualString;
  company: string;
  period: BilingualString;
  description: BilingualString;
  type: 'work' | 'education' | 'volunteer';
}

export interface Certification {
  title: BilingualString;
  issuer: string;
  year: string;
  url?: string;
  color: string;
}

// ─── Dashboard types ──────────────────────────────────────────────────────────

export type DashboardTool = 'powerbi' | 'tableau' | 'python' | 'excel' | 'sql' | 'other';
export type DashboardCategory = 'eda' | 'monitoring' | 'forecasting' | 'reporting' | 'finance' | 'hr' | 'other';

export interface DashboardKPI {
  label: BilingualString;
  value: string;
}

export interface Dashboard {
  slug: string;
  title: BilingualString;
  shortDescription: BilingualString;
  longDescription: BilingualString;
  heroImage: string;
  thumbnail: string;
  tools: DashboardTool[];
  tags: string[];
  category: DashboardCategory;
  kpis: DashboardKPI[];
  screenshots: string[];
  liveUrl?: string;
  repoUrl?: string;
  date: string;
  role?: BilingualString;
  datasetName?: string;
  dataSources: BilingualString;
  modeling: BilingualString;
  keyInsights: BilingualString[];
  techStack: ToolItem[];
  featured: boolean;
}

// ─── Certificate types (enhanced) ────────────────────────────────────────────

export type CertificateCategory =
  | 'ml'
  | 'data-science'
  | 'genai'
  | 'bi-tools'
  | 'prompt-engineering'
  | 'automation'
  | 'other';

export interface CertificateEntry {
  id: string;
  title: BilingualString;
  issuer: string;
  date: string;
  category: CertificateCategory;
  skills: string[];
  credentialUrl?: string;
  certificateFile?: string;
  image?: string;
  color: string;
}
