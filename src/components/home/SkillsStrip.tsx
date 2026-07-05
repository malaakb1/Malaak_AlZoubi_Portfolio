'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { ColumnSection } from '@/components/ui/ColumnSection';
import { viewportOnce } from '@/lib/motion';
import type { Locale } from '@/types';

const si = (slug: string) => `https://cdn.simpleicons.org/${slug}`;

interface Skill {
  name: string;
  icon?: string;
  color: string;
}

const skillGroups: { key: string; accent: string; skills: Skill[] }[] = [
  {
    key: 'ai',
    accent: 'primary',
    skills: [
      { name: 'Python',       icon: si('python'),      color: '#3776AB' },
      { name: 'Hugging Face', icon: si('huggingface'), color: '#FFD21E' },
      { name: 'LangChain',    icon: si('langchain'),   color: '#1C3C3C' },
      { name: 'OpenAI',       icon: undefined,         color: '#412991' },
      { name: 'PyTorch',      icon: si('pytorch'),     color: '#EE4C2C' },
    ],
  },
  {
    key: 'ml',
    accent: 'magenta',
    skills: [
      { name: 'scikit-learn', icon: si('scikitlearn'), color: '#F7931E' },
      { name: 'pandas',       icon: si('pandas'),      color: '#150458' },
      { name: 'NumPy',        icon: si('numpy'),       color: '#013243' },
      { name: 'Jupyter',      icon: si('jupyter'),     color: '#F37626' },
      { name: 'Tableau',      icon: undefined,         color: '#E97627' },
    ],
  },
  {
    key: 'backend',
    accent: 'lavender',
    skills: [
      { name: 'FastAPI', icon: si('fastapi'), color: '#009688' },
      { name: 'Flask',   icon: si('flask'),   color: '#8B5CF6' },
      { name: 'GitHub',  icon: si('github'),  color: '#8B949E' },
      { name: 'Docker',  icon: si('docker'),  color: '#2496ED' },
      { name: 'Git',     icon: si('git'),     color: '#F05032' },
    ],
  },
  {
    key: 'cloud',
    accent: 'gold',
    skills: [
      { name: 'Azure',        icon: undefined,        color: '#0078D4' },
      { name: 'Google Cloud', icon: si('googlecloud'),color: '#4285F4' },
      { name: 'Gradio',       icon: si('gradio'),     color: '#FF7C00' },
      { name: 'OpenCV',       icon: si('opencv'),     color: '#5C3EE8' },
      { name: 'matplotlib',   icon: undefined,        color: '#11557C' },
    ],
  },
];

const accentText: Record<string, string> = {
  primary: 'text-primary-400',
  magenta: 'text-magenta-400',
  lavender: 'text-lavender-300',
  gold: 'text-gold-400',
};
const accentHover: Record<string, string> = {
  primary: 'hover:border-primary-400/60 hover:shadow-glow-mint',
  magenta: 'hover:border-magenta-400/60 hover:shadow-glow-pink',
  lavender: 'hover:border-lavender-400/60 hover:shadow-glow-purple',
  gold: 'hover:border-gold-400/60 hover:shadow-glow-gold',
};
const accentDot: Record<string, string> = {
  primary: 'bg-primary-500',
  magenta: 'bg-magenta-500',
  lavender: 'bg-lavender-400',
  gold: 'bg-gold-500',
};

function SkillPill({ skill, hover }: { skill: Skill; hover: string }) {
  const [imgError, setImgError] = useState(false);
  const showIcon = skill.icon && !imgError;

  return (
    <div
      className={cn(
        'flex items-center gap-2 px-3.5 py-2 rounded-xl border border-[var(--color-border)] bg-white/[0.03]',
        'transition-all duration-200 hover:-translate-y-0.5 group cursor-default',
        hover,
      )}
      title={skill.name}
    >
      {showIcon ? (
        <Image
          src={skill.icon!}
          alt={`${skill.name} logo`}
          width={18}
          height={18}
          className="object-contain flex-shrink-0"
          unoptimized
          onError={() => setImgError(true)}
        />
      ) : (
        <span
          className="flex-shrink-0 w-[18px] h-[18px] rounded flex items-center justify-center text-[9px] font-bold text-white"
          style={{ backgroundColor: skill.color }}
          aria-hidden="true"
        >
          {skill.name.slice(0, 2)}
        </span>
      )}
      <span className="text-xs font-medium text-[var(--color-text-muted)] group-hover:text-[var(--color-text)] transition-colors">
        {skill.name}
      </span>
    </div>
  );
}

interface SkillsStripProps {
  locale: Locale;
}

export function SkillsStrip({ locale }: SkillsStripProps) {
  const t = useTranslations('skills');
  const isRTL = locale === 'ar';

  return (
    <ColumnSection
      id="toolkit"
      isRTL={isRTL}
      eyebrow={isRTL ? 'الترسانة التقنية' : 'Toolkit'}
      title={t('title')}
    >
      <div className="grid sm:grid-cols-2 gap-5">
        {skillGroups.map((group, gi) => (
          <motion.div
            key={group.key}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            transition={{ delay: gi * 0.08, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="card p-5"
          >
            <h3 className={cn('flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-[0.18em] mb-4', accentText[group.accent], isRTL && 'flex-row-reverse')}>
              <span className={cn('w-1.5 h-1.5 rounded-full', accentDot[group.accent])} aria-hidden="true" />
              {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
              {t(`categories.${group.key}` as Parameters<typeof t>[0])}
            </h3>
            <div className={cn('flex flex-wrap gap-2.5', isRTL && 'flex-row-reverse')}>
              {group.skills.map((skill) => (
                <SkillPill key={skill.name} skill={skill} hover={accentHover[group.accent]} />
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </ColumnSection>
  );
}
