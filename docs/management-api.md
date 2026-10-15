# Management API Contract (UI Perspective)

This document describes the parts of the CLI Proxy API **Management API**
that the Management Center depends on. It is a consumption contract, not a
backend specification — the source of truth is the
[CLIProxyAPI](https://github.com/router-for-me/CLIProxyAPI) backend.

## Base URL and authentication

- All management endpoints live under `/v0/management` on the backend's API
  port.
- The UI accepts addresses with or without scheme and with or without the
  `/v0/management` suffix, and normalizes them before use.
- Every request carries the management key as
  `Authorization: Bearer <MANAGEMENT_KEY>`.
- Connecting from a non-localhost browser requires the backend to allow
  remote management (`allow-remote-management: true`). Repeated auth
  failures can cause the backend to temporarily block the remote IP.

## Version discovery

- The backend reports its version on every Management API response via the
  **`X-CPA-Version`** header.
- The UI tracks this header and enforces a **fail-closed floor** at login:
  backend `< v7.1.0` — or a backend that reports no version at all — is
  rejected with a dedicated localized diagnostic.
- The floor constant is `MIN_BACKEND_VERSION` in `src/utils/version.ts`.
  Raising the floor is a breaking UX change and must be reflected in the
  README (both languages) and the changelog in the same PR.

## Endpoint families used by the UI

| Page          | What the UI calls                                                       |
| ------------- | ----------------------------------------------------------------------- |
| Dashboard     | Config/version reads; model availability snapshot                       |
| Config Panel  | Full `config.yaml` read/write (source mode uses the raw YAML document); client key labels persist at `access.api-key-names` alongside `access.api-keys` |
| AI Providers  | Provider key CRUD (Gemini/Codex/Claude/Vertex + OpenAI-compatible)       |
| Auth Files    | Credential upload/download/delete, filtered listing, per-file model list (optional), OAuth excluded-models and alias mapping |
| OAuth         | OAuth/device-flow start + status polling for Codex, Anthropic/Claude, Antigravity, Kimi, xAI/Grok; Vertex JSON and iFlow cookie import |
| Quota         | Quota limits/usage reads and updates per provider                        |
| Logs          | Incremental log tail, clear, error-log file download                     |
| Live Flow     | WebSocket subscription to **`/live-flow/ws`**                            |
| System        | Update check, request-logging toggle, `/v1/models` fetch (needs ≥1 proxy API key) |

## Optional capabilities and graceful degradation

Several endpoints are **optional backend capabilities**. The UI must treat
them as possibly absent and degrade by hiding the feature or showing an
"unsupported" state — never a hard error:

- Live Flow (`/live-flow/ws`) — the page renders only when the backend
  `cpa-fork-liveflow-enabled` option is on (legacy key `flow-visualization-enabled` 
  also supported for backward compatibility).
- Per-auth-file supported-model lists.
- OAuth excluded-models and alias-mapping management.
- Log-related endpoints (the Logs nav item appears only when file logging
  is enabled in Basic Settings).

## Browser-side calls (not proxied)

The OpenAI-compatible provider "test" button runs **`chat/completions`
directly from the browser** against the provider endpoint. Its result
depends on the browser's network and the provider's CORS policy — a failure
does not prove the backend cannot reach the provider. Document this
distinction when changing provider UI copy.

## WebSocket: `/live-flow/ws`

- Single subscriber socket; server pushes request-flow events as JSON.
- The UI buffers events and renders a bounded (200) recent-events table
  plus the topology canvas. Pause/resume is client-side only — events are
  buffered while paused (buffered count is shown; see
  `src/features/liveFlow/liveFlowStream.ts`).
- Large-scale event-shape changes on the backend must be coordinated with
  `tests/liveFlowEvents.test.ts` expectations.
