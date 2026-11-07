import { describe, expect, test } from 'bun:test';
import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import '../src/i18n/index';
import { SkillsPage } from '../src/features/skills/SkillsPage';

describe('SkillsPage', () => {
  test('renders skills page with all skill cards', () => {
    const html = renderToStaticMarkup(createElement(SkillsPage));
    expect(html).toContain('antislop-code');
    expect(html).toContain('antislop-ui');
    expect(html).toContain('frontend-design');
  });

  test('renders categories for all skills', () => {
    const html = renderToStaticMarkup(createElement(SkillsPage));
    expect(html).toContain('data-category="code"');
    expect(html).toContain('data-category="ui"');
    expect(html).toContain('data-category="design"');
  });
});
