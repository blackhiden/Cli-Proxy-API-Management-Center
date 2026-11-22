import { existsSync, readFileSync } from 'node:fs';
import { describe, expect, test } from 'bun:test';

const read = (path: string) => readFileSync(path, 'utf8');

const locales = ['en', 'zh-CN', 'zh-TW', 'ru', 'vi', 'ko', 'tr'];

describe('Retired navigation entry', () => {
  test('is absent from the router and sidebar', () => {
    const routes = read('src/router/MainRoutes.tsx');
    const layout = read('src/components/layout/MainLayout.tsx');

    expect(routes).not.toContain("'/skills'");
    expect(routes).not.toContain('SkillsPage');
    expect(layout).not.toContain("path: '/skills'");
    expect(layout).not.toContain('nav.skills');
    expect(layout).not.toContain('nav_meta.skills');
  });

  test('is absent from every locale and the feature tree', () => {
    for (const locale of locales) {
      const messages = JSON.parse(read(`src/i18n/locales/${locale}.json`)) as Record<
        string,
        unknown
      >;
      const nav = messages.nav as Record<string, unknown> | undefined;
      const navMeta = messages.nav_meta as Record<string, unknown> | undefined;

      expect(messages).not.toHaveProperty('skills');
      expect(nav).not.toHaveProperty('skills');
      expect(navMeta).not.toHaveProperty('skills');
    }

    expect(existsSync('src/features/skills')).toBe(false);
  });
});
