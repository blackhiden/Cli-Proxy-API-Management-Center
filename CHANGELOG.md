# CLI Proxy API Management Center Changelog

## [Unreleased]

## [1.29.3] - 2026-11-24

### Merged

- Merged `upstream/main` at `3866a168` into `dev` as `01e0d5ae`.
- Resolved four locale conflicts (`en`, `vi`, `zh-CN`, `zh-TW`) by combining upstream terminology with
  fork-only keys. Kept the fork's server-persisted API-key-name hint in `zh-TW` because upstream's
  browser-storage wording contradicts the implemented `access.api-key-names` behavior.
- Preserved all protected fork features: OAuth `noProxy`, protected Codex and Antigravity providers,
  OAuth result modal, update notifications, and usage feature.

### Added (from upstream)

- Excluded-model rule editor now tracks a draft against published rules and candidates, preserves raw
  input across its own updates, resets on external changes, and remounts per auth file.
- Auth-file delete confirmation uses localized `{{name}}` interpolation; quota idle labels,
  quota-management wording, and language names were updated across locales.

### Validation

- Focused protected-feature/merge suites: 75 pass, 1 known todo, 0 fail.
- `bun run verify`: 2434 pass, 1 todo, 0 fail. Lint: 0 errors, 4 pre-existing warnings. Build:
  passed; single-file `dist/index.html` is 4,201.85 kB (gzip 1,358.67 kB).
- Browser verification was not performed; no backend or mocked-auth session was available.

## [1.29.2] - 2026-11-23

### Merged

- Merged `upstream/main` at `3128b0ba` into `dev` as `3923fa80`.
- Resolved one conflict in `BaseProviderForm.tsx` by combining upstream's `savedProxyUrl` and native
  member-field selector with the fork's direct-connection checkbox, disabled proxy input, and
  override hint.
- Preserved all protected fork features: OAuth `noProxy`, protected Codex and Antigravity providers,
  OAuth result modal, update notifications, and usage feature.

### Added (from upstream)

- Native provider group member-field inheritance, probe transport resolution, config YAML helpers,
  Antigravity validation, quota error message, auth-file status/refresh/model-catalog action split,
  and routing `applyPlan`.
- Strict locale parity test covering keys, interpolation tokens, and plural forms across all seven
  locales.

### Fixed

- Completed locale parity for all seven locales without dropping existing duplicate locale keys.
- Compared `apiKeyNames` structurally during visual-config rebase so unchanged names no longer mark
  the editor dirty.
- Preserved explicitly entered `proxy-url: "direct"` in native member forms when no direct-connection
  control is present, while unchecked fork forms still clear the marker.

### Validation

- `bun run verify`: 2434 pass, 1 todo, 0 fail. Lint: 0 errors, 4 pre-existing warnings. Build:
  passed; single-file `dist/index.html` is 4,204.67 kB (gzip 1,359.52 kB).
- Focused protected-feature/merge suites: 114 pass, 1 known todo, 0 fail.
- Browser verification was not performed; no backend or mocked-auth session was available.

## [1.29.1] - 2026-11-23

### Merged

- Merged `upstream/main` at `aef56a47` into `dev` (tag `v1.29.0`). The merge commit is `64564b37`.
- Resolved three conflicts by combining both sides:
  - `SponsorProviderForm.tsx`: kept upstream's `FormSection` layout and accessibility improvements while
    preserving the fork's direct-connection switch and proxy override behavior.
  - `useVisualConfig.ts`: used upstream's comment/anchor-preserving `writeClientKeys` and kept the fork's
    `access.api-key-names` persistence on top of it.
  - `visualConfigV8.test.ts`: kept the fork's key-name regression test alongside all upstream YAML
    preservation tests.
- Preserved all protected fork features: OAuth `noProxy`/direct connection behavior, protected Codex and
  Antigravity OAuth providers, OAuth result modal, update notification system, and usage feature.

### Added (from upstream)

- Provider workbench redesign with native connection forms, native provider groups, disabled-state handling,
  connection-pool validation, brand panels, provider picker, resource cards, and sheet-view navigation.
- OAuth error-rule configuration in the visual config editor, with API normalization and localized validation.
- GitHub Copilot OAuth and quota support, provider artwork/logo helpers, and new connection-pool API modules.
- Expanded test coverage for native connection forms, group settings, provider workbench presentation,
  connection editing, OAuth error rules, and CSS custom-property contracts.

### Fixed

- Mapped legacy CSS custom properties in the preserved usage feature to existing theme tokens so the new
  upstream CSS contract test passes without removing or downgrading the feature.
- A concurrent local commit fixed the pre-existing `providerRequestTimeouts` scalar-parity test; that fix is
  included in this release.

### Validation

- `bun run verify`: 2509 pass, 1 todo, 18 fail. The remaining failures are the known locale-completeness,
  LoginRevealVeil source-shape, and visual-config rebase suites; no new failure category remains.
- `bun run lint`: 0 errors, 4 pre-existing warnings. `bun run build`: passed; single-file `dist/index.html`
  is 4,200.40 kB (gzip 1,356.68 kB).
- Browser verification of the changed upstream UI was not performed; no backend or mocked-auth session was
  available for the affected provider/configuration routes.

## [1.28.6] - 2026-11-22

### Changed

- Recorded the current `dev`/`main` merge history as release `v1.28.6`. No application source
  files changed after `v1.28.5`; the release contains the existing back-merge commits and release
  documentation only.

### Validation

- Git Flow preflight verified the clean tree, latest tag `v1.28.5`, calculated version `v1.28.6`,
  installed `git-flow` 1.12.3, and configured `main`/`dev` branches.
- Release documentation checked with `git diff --check`; no application code changed in this
  release.

## [1.28.5] - 2026-11-22

### Merged

- Merged `upstream/main` at `f7aae75` into `dev` (20 files changed, 598 insertions, 170 deletions).
  The merge was clean; no conflict resolution was required.
- Preserved all protected fork features: OAuth `noProxy`/direct connection behavior, protected
  Codex and Antigravity OAuth providers, OAuth result modal, update notification system, and usage
  feature.
- Preserved the local full rescan of `docs/CODE_GRAPH.md` and advanced its scan checkpoint to the
  merge commit.

### Added (from upstream)

- Enhanced payload replacement rules editor, visual-config rebase handling, search indexing, and
  localized validation messages across all seven locales.
- Model handling now incorporates display names and updated filtering logic, with new discovery
  selection tests.
- Upstream added and then reverted the CSS custom-property fix for #558; the net upstream state is
  unchanged.

### Fixed

- Update notifications now compare semantic versions instead of raw commit hashes. A fork build
  that is ahead of the upstream release (for example current `v8.0.82` vs upstream `v8.0.60`) no
  longer opens a false "Update Available" modal. Commit hashes remain display metadata only.
- The System page main-repository quick link now uses the same `blackhiden/CLIProxyAPI` URL as the
  update modal.

### Removed

- Removed an unused sidebar entry, route, page, translations, and tests.

### Validation

- Focused protected-feature suites: 38 pass, 1 known todo, 0 fail.
- `bun run verify`: 2419 pass, 1 todo, 19 fail. The failure set is identical to the pre-merge
  baseline at `b39642d` (2402 pass, 1 todo, 19 fail): locale completeness, LoginRevealVeil,
  visual-config rebase, and the request-timeout scalar parity test.
- `bun run lint`: 0 errors, 4 pre-existing warnings in unrelated test files.
- `bun run build`: passed; single-file `dist/index.html` is 4,101.02 kB (gzip 1,329.82 kB).
- Browser verification of the changed upstream UI was not performed in this workflow; no backend or
  mocked-auth session was available for the affected configuration routes.

## [1.28.2] - 2026-11-17

### Merged
- Merged `upstream/main` commit `706c7c6` into `dev` (139 files changed).
- Resolved the provider workbench overlap by retaining fork `resolveProxyUrl` behavior and
  upstream's exported `buildProviderKeyConfig` used by sensitive-replacement tests.
- Preserved protected OAuth providers, OAuth login proxy behavior, and OAuth result modal
  contracts. Updated provider direct-connection hints to use the upstream `CheckboxField` InfoTip.

### Added (from upstream)
- Sensitive text replacement configuration for providers and payload replacement rules.
- Reusable field-label, checkbox-hint, and tooltip components, with localization and validation.

### Validation
- Build and lint pass; focused merge/protected-feature suites pass (123 tests, one existing OAuth
  result-modal integration follow-up remains TODO).
- Full suite currently has 18 pre-existing failures; visual-config rebase, locale-coverage, and
  login-transition failures were also reproduced on the pre-merge `dev` base.

## [1.26.7-arsydoni4326-alt] - 2026-11-07

### Merged
- Merged upstream commits from `1dc60b4` to `953fb24` (`upstream/main`) into `dev`.
  - Manual conflict resolution: LoginPage.module.scss (accepted upstream, removed UI beautification per MERGE-PRESERVATION.md)
  - 114 files changed, 9618 insertions(+), 355 deletions(-)

### Added (from upstream)
- **Routing feature** (`src/features/routing/`):
  - Full routing configuration UI with drag-and-drop tier management
  - Member cards with weight adjustment, tier movement, and policy controls
  - Change review dialog showing diff before save
  - Auto-scroll during drag operations
  - Complete routing logic for tier assignment and member management
  - API integration (`src/services/api/routing.ts`)
  - Comprehensive test coverage (routing board, page, auto-scroll)
- **Turkish locale** (`src/i18n/locales/tr.json`):
  - Complete Turkish translation added to the 7 supported languages
  - Registered in i18n configuration
- **AICodeMirror provider**:
  - Support for multiple protocols (Anthropic, OpenAI, Gemini, OpenRouter, Ollama, LM Studio)
  - Complete localization across all 7 languages
  - Provider icon and descriptor integration
  - Comprehensive test coverage
- **Login enhancements**:
  - DotMatrixHero component with animated dot matrix field
  - Refactored LoginForm component with improved structure
  - Login transition store for smooth page animations
  - Login redirect logic with auto-login entry support
  - New color palette system (`_palette.scss`)
  - Comprehensive test coverage (layout, form, hero, palette, transition)
- **Provider improvements**:
  - StepFun and Xiaomi provider icons
  - SponsorCampaignCard component with Double 11 campaign styling
  - Model discovery selection logic with protocol mapping
  - Enhanced sponsor provider forms with campaign card integration
  - Discovery selection tests
- **Quota enhancements**:
  - QuotaTierPreview component with jade texture for elite plans
  - Card tier system with visual differentiation
  - Claude reset grant request ID logic
  - Kimi plan detection improvements
  - Enhanced quota timeline with DST handling
  - Quota limit label consistency across providers
  - Comprehensive test coverage (card tier, limit labels, timeline DST, Kimi plan)
- **Select component improvements**:
  - Enhanced positioning logic (`selectPosition.ts`)
  - Better dropdown placement and viewport handling
- **Test coverage additions**:
  - Auto-login entry contract tests
  - Model entry removal tests
  - Plugin OAuth entries tests
  - Encryption utility tests
  - Models type tests

### Fixed (from upstream)
- OAuth: Plugin entry metadata decoding for escaped characters
- Quota: Grok client version updated to 1.0.70
- Quota: Consistent limit labeling across all providers

### Protected Features (verified intact through merge)
- ✅ OAuth result modal (OAuthResultModal.tsx)
- ✅ Protected OAuth providers - Codex and Antigravity (protectedOAuth/ module)
- ✅ Update notification system (UpdateModal.tsx, useUpdateStore.ts)
- ✅ All project documentation (CODE_GRAPH.md, SPECIFICATION.md, ARCHITECTURE.md, CHANGELOG.md, CONTRIBUTING.md, ROADMAP.md, session.md, docs/)
- ✅ Usage feature (src/features/usage/)
- ✅ All contract tests (oauthResultModal.test.ts, protectedOAuthProviders.test.ts, updateNotification.test.ts)

### Verification Results
- TypeScript compilation: ✅ Passed
- Production build: ✅ Succeeded (dist/index.html: 3,804.10 kB │ gzip: 1,204.58 kB)
- Test suite: 1750 pass, 1 todo, 19 fail (pre-existing failures: Korean/Turkish/Vietnamese locale coverage, visual config rebase tests, cooldown section rendering)
- Protected feature contract tests: ✅ All pass (63 tests)
- Lint: ✅ Passed (warnings only, no errors)

### Release Artifacts
- **Release tag**: `v1.26.7-arsydoni4326-alt`
- **Release branch**: `release/v1.26.7-arsydoni4326-alt` (deleted after finish)
- **Main branch**: Updated with merge commit `7dfaa8d`
- **Develop branch**: Back-merged with tag, commit `db2499f`
- **Changes**: 114 files changed, 9618 insertions(+), 355 deletions(-)
- **Build output**: Single-file HTML artifact ready for deployment

## [1.26.6] - 2026-10-19

### Merged
- Merged upstream commits from `13f94b4` to `fe29633` (`upstream/main`) into `dev`.
  - Clean auto-merge, no conflicts
  - 6 files changed, 269 insertions(+), 67 deletions(-)
  - Upstream attempted to delete 4,173 lines including protected features and documentation; Git auto-merge correctly preserved fork-specific files

### Added (from upstream)
- Antigravity quota enhancements:
  - Quota bucket visibility logic for 5-hour, daily, weekly, and monthly limits
  - Gemini Argon model added to Antigravity Gemini quota group
  - Bucket label translation with "Remaining" suffix handling (`src/features/quota/providers/antigravity/labels.ts`)
  - User-agent constants updated for Antigravity Hub compatibility (v2.23.0)
  - Comprehensive label translation tests (`tests/antigravityQuotaLabels.test.ts`)
- Auth file quota section: refresh button now hidden for idle state (click-to-refresh prompt already visible)

### Protected Features (verified intact through merge)
- ✅ OAuth result modal (OAuthResultModal.tsx)
- ✅ Protected OAuth providers - Codex and Antigravity (protectedOAuth/ module)
- ✅ Update notification system (UpdateModal.tsx, useUpdateStore.ts)
- ✅ All project documentation (CODE_GRAPH.md, SPECIFICATION.md, ARCHITECTURE.md, CHANGELOG.md, CONTRIBUTING.md, ROADMAP.md, session.md, docs/)
- ✅ Usage feature (src/features/usage/)
- ✅ All contract tests (oauthResultModal.test.ts, protectedOAuthProviders.test.ts, updateNotification.test.ts)

### Verification Results
- TypeScript compilation: ✅ Passed
- Production build: ✅ Succeeded (dist/index.html: 3,487.73 kB │ gzip: 1,097.75 kB)
- Test suite: 1651 pass, 1 todo, 17 fail (pre-existing failures: Korean/Vietnamese locale coverage, visual config rebase tests, cooldown section rendering)
- Protected feature contract tests: ✅ All pass

## [1.26.5-arsydoni4326-alt] - 2026-10-16

### Merged
- Merged upstream commits from `390718e` to `13f94b4` (`upstream/main`) into `dev`.
  - Clean auto-merge, no conflicts
  - 40 files changed, 2212 insertions(+), 330 deletions(-)

### Added (from upstream)
- Claude quota enhancements:
  - Claude extra usage and independent dollar balances display (#489)
  - Reset grant reading logic with rate limit handling
  - Improved quota refresh logic with resetting state
- Quota improvements:
  - Hour-based window duration support with translations for all locales
  - `.quotaAmount` style updates for size consistency
  - Simplified plan display logic (hides subscription status when no plan present)
  - XAI pay-as-you-go disabled option display
  - Simplified refresh action rendering
  - `quotaPluginId` field added to AuthFileItem for backend compatibility
- OAuth UI refinements:
  - SponsorCard component consolidates sponsor functionality
- Auth file quota section improvements

### Fixed (from upstream)
- Session affinity terminology in zh-CN and zh-TW locales

### Changed
- Client API-key names are saved with the v8 configuration at `access.api-key-names` instead of browser-only storage. Existing local labels are copied into the configuration draft for migration on the next save.

### Protected Features (verified intact through merge)
- ✅ Codex and Antigravity OAuth providers (contract tests pass)
- ✅ OAuth result modals (contract tests pass, 1 todo for re-integration with new architecture)
- ✅ Update notification modal (single-show on initial load)

### Verification Results
- TypeScript compilation: ✅ Passed
- Production build: ✅ Succeeded (dist/index.html: 3,486.72 kB │ gzip: 1,097.38 kB)
- Test suite: 1645 pass, 17 fail (includes Korean/Vietnamese locale coverage issues for new upstream locales, visual config rebase tests, and pre-existing cooldown section rendering test)
- Protected feature contract tests: ✅ All pass (29 pass, 1 todo)

## [1.24.10-arsydoni4326-alt] - 2026-10-12

### Merged
- Merged upstream `v1.26.0` through `v1.26.2` (`upstream/main` at commit `390718e`) into `develop`.
  Conflict resolution:
  - `zh-TW.json`: Accepted upstream translations for new OAuth gallery UI features
  - OAuth page files: Removed old `src/pages/OAuthPage.*` files, accepted new feature-based structure in `src/features/oauth/`
- This merge includes a major OAuth page refactor that moves all OAuth functionality from `src/pages/` to a new feature-based structure in `src/features/oauth/`.

### Added (from upstream v1.26.0-v1.26.2)
- OAuth page completely redesigned as provider gallery with tile-based UI and focused flow dialog
  - New `src/features/oauth/` structure with modular components (ProviderTile, OAuthFlowDialog, VertexImportDialog)
  - Sponsor feature integration (Kimi Chinese and International sites with affiliate links)
  - Background OAuth flow continuation (closing dialog doesn't interrupt authorization)
  - Improved OAuth status visibility on provider tiles
- Korean locale support (ko.json) with comprehensive translations
- Plugin quota support via v8 Management API routes
  - Generic plugin quota display component
  - Plugin quota fetching through v8 plugin endpoints
- Config UI layout improvements:
  - Unified setting-row layout for toggles and inputs
  - Compact hairline rows for client API keys
  - Start-aligned add actions under list editors
  - New field layout utilities (rowSpans.ts)
- xAI quota improvements: shared usage breakdown display
- GitHub token configuration support
- Kimi tile icons optimized for sponsor cards (tile variants with contained logo)
- Extensive test coverage: OAuth page rendering, config setting layout, plugin quota, xAI quota headers, Korean locale

### Fixed
- Plugin quotas now correctly fetched through v8 plugin routes (upstream fix #490)
- Built-in quota cards stay ahead of plugin quotas in display order
- OAuth status polling resumes correctly after accepted callback (upstream fix #486)

### Protected Features (verified intact through merge)
- ✅ Codex and Antigravity OAuth providers present in upstream `src/features/oauth/providers.ts`
- ✅ OAuth result modals (protected by contract tests)
- ✅ Update notification modal (single-show on initial load)
- Note: Fork-specific `no_proxy` parameter and `directConnection` features need to be re-integrated
  into the new OAuth architecture (deferred to follow-up work)

### Known Issues
- Korean locale missing fork-specific translation keys (expected for new locale)
- Pre-existing test failures remain (cooldown section rendering, config UI state)

## [1.24.6-arsydoni4326-alt] - 2026-09-30

### Merged
- Merged upstream `v1.25.0` (`upstream/main` at commit `b87b948`) into `develop`. Three-way
  conflict resolution preserved all fork features while incorporating upstream changes:
  - `oauth.ts`: Fork's `no_proxy` parameter feature combined with upstream's unified `/oauth/auth-url` endpoint
  - `BaseProviderForm.tsx`: Kept approach that includes upstream's `sourceIndex`/`authIndex` fields
  - `useProviderWorkbench.ts`: Combined fork's `resolveProxyUrl`/`directConnection` with upstream's `sourceIndex`
- Previous upstream merge: `v1.24.1` with quota/i18n conflict resolution that kept both the fork's
  top-level `update_modal` block (required by `UpdateModal.tsx`) and the upstream `quota_management`
  block (including account-search keys) in all four locale files (`en`, `ru`, `zh-CN`, `zh-TW`).

### Added (from upstream v1.25.0)
- Logs page refactored to feature-based structure (`src/features/logs/`)
- Config draft recovery system with conflict detection
- Legacy backend probe for version compatibility
- Extensive new test coverage (logs, config patches, provider editing, fullscreen behavior)
- Config patch API with payload normalization
- Log buffer with cursor-based pagination and bounded memory
- Log fullscreen mode with Escape key handling

### Fixed
- Logs: Escape key handling respects event propagation (upstream fix)
- Config: Blocked conflicting payload replacements after recovery (upstream fix)
- Config: List edits recovered without replaying stale indexes (upstream fix)
- **OAuth page: restored missing non-featured OAuth providers (Codex, Antigravity, Meta,
  Anthropic, xAI, Devin)** that were accidentally hidden when commit `b4f131d` removed
  the `otherOAuthProviders` variable definition but left the JSX rendering section intact.
  The variable definition and its rendering section have been restored, and the protected
  OAuth providers contract suite verifies they stay present. See SPECIFICATION.md
  ("Protected OAuth providers").
- Hash-route navigation, such as `#/ai-providers` to `#/auth-files`, no longer checks for or
  opens the update notification modal.
- Quota: Claude Team organization plans are now prioritized in plan detection (upstream fix).
- Quota: xAI usage stays tied to its billing period, and unavailable usage is clarified
  instead of misreported (upstream fixes #441 and follow-up).
- Quota: live Codex renewal date is fetched from the backend instead of being estimated.
- Auth files: weight tooltip uses plain text instead of markup.

### Protected Features (preserved through merge)
- OAuth `no_proxy` parameter (direct connection toggle)
- Provider `directConnection` toggle and `resolveProxyUrl` logic
- Protected OAuth providers domain (Codex, Antigravity) with contract tests
- OAuth result modals (protected by contract tests)
- Update notification modal (single-show on initial load)

## [1.24.5-arsydoni4326-alt] - Previous Release

### Added
- Protected OAuth providers domain (`src/features/protectedOAuth/`) that enforces
  Antigravity and Codex OAuth must never be removed or replaced by upstream merges.
  Includes a contract test suite (`Protected OAuth providers — page contract
  (protected)` and `Protected OAuth providers — API contract (protected)` in
  `tests/protectedOAuthProviders.test.ts`) that fails the test suite if either
  provider's definition, icon, i18n key, page rendering, or API wiring regresses.
  Per project-owner mandate; see SPECIFICATION.md ("Protected OAuth providers").
- Protected-feature contract test suite (`OAuth result modal feature contract (protected)` in
  `tests/oauthResultModal.test.ts`) that fails the test suite if the OAuth result modal is ever
  removed, replaced by toasts, or downgraded (per project-owner mandate). No runtime behavior
  changed; the feature was verified intact and byte-identical to its introduction commit.
- OAuth process results (login success/failure, polling errors, callback validation,
  cancellation, and Vertex/iFlow import outcomes) now appear as a centered modal that stays
  open until manually dismissed, replacing the small transient toast notifications that were
  easy to miss. Built on the shared `Modal` component; no new translation keys required.
- The main OAuth result modal shows only the localized
  `*_oauth_status_success` / `*_oauth_status_error` message (for example
  "Authentication successful!" or "Authentication failed:"); runtime error details and the
  waiting status text are never appended to the modal. Detailed errors remain on the
  provider card's inline status line.
- Update notification modal shows only once after the initial browser load connects, including
  first visits and browser reloads (F5/Ctrl+R).
- Changelog section and upstream repository links in the update notification modal.
- Quota: account search by filename or email (upstream `feat(quota): add account search`).
- Quota: recognition of the Codex Business Premium entitlement (upstream fix #439).
- Plugin resource pages now use theme backgrounds instead of hard-coded colors (upstream fix).


## [0.0.0] - Initial

- Initial release of CLI Proxy API Management Center
- Support for English, Simplified Chinese, Traditional Chinese, and Russian
- Management of AI providers, auth files, OAuth, quota, and logs
- System information page with update checking capability
