import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useRevealGroup } from '@/hooks/motion';
import { IconCode, IconPalette, IconSparkles } from '@/components/ui/icons';
import styles from './SkillsPage.module.scss';

interface Skill {
  name: string;
  description: string;
  icon: React.ReactNode;
  category: 'code' | 'ui' | 'design';
}

export function SkillsPage() {
  const { t } = useTranslation();
  const containerRef = useRevealGroup<HTMLDivElement>(0.08);

  const skills: Skill[] = useMemo(
    () => [
      {
        name: 'antislop-code',
        description: t('skills.antislop_code.description'),
        icon: <IconCode />,
        category: 'code',
      },
      {
        name: 'antislop-ui',
        description: t('skills.antislop_ui.description'),
        icon: <IconPalette />,
        category: 'ui',
      },
      {
        name: 'frontend-design',
        description: t('skills.frontend_design.description'),
        icon: <IconSparkles />,
        category: 'design',
      },
    ],
    [t],
  );

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <h1 className={styles.title}>{t('skills.title')}</h1>
        <p className={styles.subtitle}>{t('skills.subtitle')}</p>
      </header>

      <div ref={containerRef} className={styles.grid}>
        {skills.map((skill) => (
          <article key={skill.name} className={styles.card} data-category={skill.category}>
            <div className={styles.cardHeader}>
              <div className={styles.iconWrapper}>{skill.icon}</div>
              <h2 className={styles.skillName}>{skill.name}</h2>
            </div>
            <p className={styles.description}>{skill.description}</p>
            <div className={styles.footer}>
              <span className={styles.badge}>{t(`skills.category.${skill.category}`)}</span>
            </div>
          </article>
        ))}
      </div>

      <footer className={styles.notice}>
        <p>{t('skills.notice')}</p>
      </footer>
    </div>
  );
}
