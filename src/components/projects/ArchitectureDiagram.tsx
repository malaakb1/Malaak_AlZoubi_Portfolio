'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import type { Architecture, Locale } from '@/types';

interface ArchitectureDiagramProps {
  architecture: Architecture;
  locale: Locale;
  title: string;
}

// Cyber palette — translucent accent-on-dark node styles.
const nodeTypeStyles: Record<string, string> = {
  input:   'bg-primary-500/12  border border-primary-500/30  text-primary-200',
  process: 'bg-lavender-400/15 border border-lavender-400/35 text-lavender-200',
  model:   'bg-magenta-500/12  border border-magenta-500/30  text-magenta-200',
  storage: 'bg-gold-500/12     border border-gold-500/30     text-gold-200',
  api:     'bg-primary-500/12  border border-primary-500/30  text-primary-200',
  output:  'bg-magenta-500/12  border border-magenta-500/30  text-magenta-200',
  ui:      'bg-lavender-400/15 border border-lavender-400/35 text-lavender-200',
};

const nodeTypeIcons: Record<string, string> = {
  input:   '📥',
  process: '⚙️',
  model:   '🤖',
  storage: '🗄️',
  api:     '🔌',
  output:  '📤',
  ui:      '🖥️',
};

export function ArchitectureDiagram({ architecture, locale, title }: ArchitectureDiagramProps) {
  const isRTL = locale === 'ar';
  const nodes = architecture.nodes;

  // Chunk nodes into rows of 3
  const rows: typeof nodes[] = [];
  const chunkSize = 3;
  for (let i = 0; i < nodes.length; i += chunkSize) {
    rows.push(nodes.slice(i, i + chunkSize));
  }

  // Flat index counter for stagger animation
  let flatIndex = 0;

  return (
    <div className={cn('space-y-4', isRTL && 'text-right')}>
      <h3 className="text-sm font-semibold text-[var(--color-text-muted)] uppercase tracking-widest">
        {title}
      </h3>

      {/* Description */}
      <p className="text-sm text-[var(--color-text-muted)] leading-relaxed italic">
        {architecture.description[locale]}
      </p>

      {/* Visual flow */}
      <div className="overflow-x-auto pb-2">
        <div
          className="flex flex-col gap-0 min-w-max"
          role="img"
          aria-label={`Architecture diagram: ${title}`}
        >
          {rows.map((row, ri) => {
            const rowItems = row.map((node, ni) => {
              const idx = flatIndex++;
              return (
                <motion.div
                  key={node.id}
                  className={cn(
                    'flex items-center gap-2',
                    isRTL && 'flex-row-reverse',
                  )}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.08 }}
                >
                  {/* Node */}
                  <div
                    className={cn(
                      'arch-node border flex items-center gap-1.5 px-3 py-2 rounded-lg',
                      nodeTypeStyles[node.type] ?? nodeTypeStyles['process'],
                    )}
                    title={node.type}
                  >
                    <span aria-hidden="true" className="text-sm leading-none">
                      {nodeTypeIcons[node.type] ?? '⚙️'}
                    </span>
                    <div>
                      <div className="font-semibold leading-tight text-xs whitespace-nowrap">
                        {node.label[locale]}
                      </div>
                      {node.sublabel && (
                        <div className="text-xs opacity-70 leading-tight">
                          {node.sublabel[locale]}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Horizontal arrow between nodes in same row */}
                  {ni < row.length - 1 && (
                    <span
                      className="text-[var(--color-text-muted)] text-base leading-none select-none"
                      aria-hidden="true"
                      style={{ transform: isRTL ? 'scaleX(-1)' : undefined }}
                    >
                      →
                    </span>
                  )}
                </motion.div>
              );
            });

            return (
              <div key={ri}>
                {/* Row of nodes */}
                <div
                  className={cn(
                    'flex items-center gap-2',
                    isRTL && 'flex-row-reverse',
                  )}
                >
                  {rowItems}
                </div>

                {/* Down arrow between rows */}
                {ri < rows.length - 1 && (
                  <div
                    className={cn(
                      'py-1',
                      isRTL ? 'flex justify-end pe-6' : 'flex justify-start ps-6',
                    )}
                    aria-hidden="true"
                  >
                    <span className="text-[var(--color-text-muted)] text-lg leading-none">
                      ↓
                    </span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Legend */}
      <div className={cn('flex flex-wrap gap-3 mt-4', isRTL && 'flex-row-reverse justify-end')}>
        {Object.entries(nodeTypeStyles).map(([type, cls]) => (
          <span
            key={type}
            className={cn('inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs border font-medium', cls)}
          >
            <span aria-hidden="true">{nodeTypeIcons[type]}</span>
            {type.charAt(0).toUpperCase() + type.slice(1)}
          </span>
        ))}
      </div>
    </div>
  );
}
