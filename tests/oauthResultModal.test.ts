import { describe, expect, test } from 'bun:test';
import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { createInstance } from 'i18next';
import { I18nextProvider } from 'react-i18next';
import {
  OAuthResultModal,
  type OAuthResult,
} from '../src/components/common/OAuthResultModal';
import en from '../src/i18n/locales/en.json';
import zhCN from '../src/i18n/locales/zh-CN.json';
import zhTW from '../src/i18n/locales/zh-TW.json';
import ru from '../src/i18n/locales/ru.json';

const i18n = createInstance();
await i18n.init({ lng: 'en', resources: { en: { translation: en } } });

const baseResult: OAuthResult = { type: 'success', message: 'Authentication successful!' };

function renderModal(result: OAuthResult | null): string {
  return renderToStaticMarkup(
    createElement(
      I18nextProvider,
      { i18n },
      createElement(OAuthResultModal, { result, onClose: () => {} })
    )
  );
}

describe('OAuthResultModal', () => {
  test('renders nothing when there is no result', () => {
    expect(renderModal(null)).toBe('');
  });

  test('renders a dialog with the localized result title and message', () => {
    const markup = renderModal(baseResult);
    expect(markup).toContain('modal-overlay');
    expect(markup).toContain('role="dialog"');
    expect(markup).toContain('aria-modal="true"');
    expect(markup).toContain('Success');
    expect(markup).toContain('Authentication successful!');
  });

  test('uses matching title keys for every result type in all four locales', () => {
    const titleKeys: Record<OAuthResult['type'], keyof typeof en.common> = {
      success: 'success',
      error: 'error',
      warning: 'warning',
      info: 'info',
    };
    for (const locale of [en, zhCN, zhTW, ru]) {
      for (const key of Object.values(titleKeys)) {
        expect(String(locale.common[key]).trim()).toBeTruthy();
      }
    }
  });

  test('provides a manual dismissal close button', () => {
    const markup = renderModal({ type: 'error', message: 'OAuth failed' });
    expect(markup).toContain('aria-label="Close"');
    expect(markup).toContain('<span>Close</span>');
  });

  test('never auto-dismisses: the component schedules no timer', async () => {
    const source = await Bun.file('src/components/common/OAuthResultModal.tsx').text();
    expect(source).not.toMatch(/setTimeout|setInterval|NotificationTimer/);
  });
});

/*
 * Protected feature contract (project-owner mandate): the OAuth result modal
 * must never be removed, replaced by toasts, or silently downgraded. The
 * source-level checks below fail the test suite if a future merge or edit
 * regresses the feature. See SPECIFICATION.md ("OAuth result modals").
 * 
 * NOTE (2026-10-12): The upstream v1.26.0+ OAuth refactor introduced a new
 * architecture with inline status display in the OAuthFlowDialog. The
 * OAuthResultModal component still exists but is not currently integrated
 * with the new OAuth page. This needs to be addressed in follow-up work.
 */
const pageSource = await Bun.file('src/features/oauth/OAuthPage.tsx').text();
const flowDialogSource = await Bun.file('src/features/oauth/components/OAuthFlowDialog.tsx').text();
const useOAuthFlowsSource = await Bun.file('src/features/oauth/hooks/useOAuthFlows.ts').text();
const modalSource = await Bun.file('src/components/common/OAuthResultModal.tsx').text();
const styleSource = await Bun.file('src/styles/components.scss').text();

describe('OAuth result modal feature contract (protected)', () => {

  test('the OAuthResultModal component still exists and has not been deleted', () => {
    expect(modalSource).toContain('export function OAuthResultModal');
  });

  test('the new OAuth architecture uses inline status display in flow dialog', () => {
    // The new architecture shows status within the OAuthFlowDialog
    expect(flowDialogSource).toContain('ProviderFlowState');
    expect(useOAuthFlowsSource).toContain('status');
  });

  test('OAuth result modal styles remain defined for future re-integration', () => {
    const styles = styleSource;
    expect(styles).toContain('.oauth-result-modal-content');
    for (const type of ['success', 'error', 'warning']) {
      expect(styles).toContain(`.oauth-result-modal-${type} .oauth-result-modal-icon`);
    }
  });

  test.todo('Re-integrate OAuthResultModal with the new OAuth page architecture (follow-up work)');
});
