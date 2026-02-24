'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import type { Locale } from '@/types';

const si = (slug: string) => `https://cdn.simpleicons.org/${slug}`;

interface Skill {
  name: string;
  icon?: string;
  color: string;
}

const skillGroups: { key: string; skills: Skill[] }[] = [
  {
    key: 'ai',
    skills: [
      { name: 'Python',       icon: si('python'),        color: '#3776AB' },
      { name: 'Hugging Face', icon: si('huggingface'),   color: '#FFD21E' },
      { name: 'LangChain',    icon: si('langchain'),     color: '#1C3C3C' },
      { name: 'OpenAI',       icon: undefined,           color: '#412991' },
      { name: 'PyTorch',      icon: si('pytorch'),       color: '#EE4C2C' },
    ],
  },
  {
    key: 'ml',
    skills: [
      { name: 'scikit-learn', icon: si('scikitlearn'),   color: '#F7931E' },
      { name: 'pandas',       icon: si('pandas'),        color: '#150458' },
      { name: 'NumPy',        icon: si('numpy'),         color: '#013243' },
      { name: 'Jupyter',      icon: si('jupyter'),       color: '#F37626' },
      { name: 'Tableau',      icon: undefined,           color: '#E97627' },
    ],
  },
  {
    key: 'backend',
    skills: [
      { name: 'FastAPI',      icon: si('fastapi'),       color: '#009688' },
      { name: 'Flask',        icon: si('flask'),         color: '#000000' },
      { name: 'GitHub',       icon: si('github'),        color: '#181717' },
      { name: 'Docker',       icon: si('docker'),        color: '#2496ED' },
      { name: 'Git',          icon: si('git'),           color: '#F05032' },
    ],
  },
  {
    key: 'cloud',
    skills: [
      { name: 'Azure',        icon: undefined,           color: '#0078D4' },
      { name: 'Google Cloud', icon: si('googlecloud'),   color: '#4285F4' },
      { name: 'Gradio',       icon: si('gradio'),        color: '#FF7C00' },
      { name: 'OpenCV',       icon: si('opencv'),        color: '#5C3EE8' },
      { name: 'matplotlib',   icon: undefined,           color: '#11557C' },
    ],
  },
];

/* Tiny pill that gracefully falls back from icon → text label */
function SkillPill({ skill }: { skill: Skill }) {
  const [imgError, setImgError] = useState(false);
  const showIcon = skill.icon && !imgError;

  return (
    <div
      className="flex items-center gap-2 px-3 py-2 rounded-xl border border-[var(--color-border)] bg-[var(--color-card)] hover:border-primary-200 dark:hover:border-primary-800 hover:shadow-soft transition-all duration-200 group cursor-default"
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
    <section className="section-padding bg-[var(--color-bg-2)]" aria-labelledby="skills-title">
      <div className={cn('max-w-6xl mx-auto px-4 sm:px-6', isRTL && 'text-right')}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-10"
        >
          <h2 id="skills-title" className="text-3xl sm:text-4xl font-serif mb-2">
            {t('title')}
          </h2>
        </motion.div>

        <div className="space-y-8">
          {skillGroups.map((group, gi) => (
            <motion.div
              key={group.key}
              initial={{ opacity: 0, x: isRTL ? 20 : -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: gi * 0.1, duration: 0.5 }}
            >
              <h3 className="text-xs font-semibold uppercase tracking-widest text-[var(--color-text-muted)] mb-4">
                {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                {t(`categories.${group.key}` as Parameters<typeof t>[0])}
              </h3>
              <div className={cn('flex flex-wrap gap-3', isRTL && 'flex-row-reverse')}>
                {group.skills.map((skill) => (
                  <SkillPill key={skill.name} skill={skill} />
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
