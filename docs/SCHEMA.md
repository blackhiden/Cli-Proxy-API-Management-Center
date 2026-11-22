# Frontend Data Schemas and Storage Contracts

This document outlines the data schemas, persistent storage schemas, and API contracts consumed by the CLI Proxy API Management Frontend.

## 1. Browser Persistent Storage (localStorage)

Keys used in `localStorage` for client-side persistence:

| Key | Type | Description |
|---|---|---|
| `cpa_management_api_endpoint` | `string` | Base URL of the backend Management API |
| `cpa_management_key` | `string` | Stored (obfuscated) management key if "Remember me" is checked |
| `cpa_remember_key` | `boolean` | Flag indicating whether credentials should persist |
| `cpa_lang` | `string` | Selected UI language code (`en`, `zh-CN`, `zh-TW`, `ru`, `vi`, `ko`, `tr`) |
| `cpa_theme` | `string` | Selected theme (`dark`, `light`, `white`, `auto`) |

## 2. Zustand Store State Schemas

### `useAuthStore` (`src/stores/authStore.ts`)
- `token`: `string | null` - Current bearer token / management key
- `apiEndpoint`: `string` - Target API endpoint
- `isAuthenticated`: `boolean` - Authentication status
- `serverVersion`: `ServerVersionInfo | null` - Version, commit, and build date
- `serverPluginSupport`: `ServerPluginSupport | null` - Plugin capabilities flags

### `useConfigStore` (`src/stores/configStore.ts`)
- `rawConfig`: `RawConfig | null` - Backend v8 YAML/JSON configuration object
- `parsedConfig`: `ParsedConfig | null` - Normalized runtime configuration
- `status`: `'idle' | 'loading' | 'success' | 'error'` - Fetch state
- `error`: `string | null` - Last error encountered
- `lastFetched`: `number | null` - Timestamp of last cache refresh

### `useThemeStore` / `useLanguageStore`
- Manages current theme and active localization catalog.

## 3. Management API Data Models (`src/types/`)

### Authentication & Auth Files (`src/types/authFile.ts`)
- `AuthFileInfo`:
  - `id`: `string`
  - `name`: `string`
  - `path`: `string`
  - `type`: `string`
  - `size`: `number`
  - `updatedAt`: `string`
  - `oauthExcludedModels`?: `string[]`
  - `oauthModelAliases`?: `Record<string, string>`

### Provider & Routing Models (`src/types/routing.ts`, `src/types/provider.ts`)
- `RoutingConfig`:
  - Tiers, member weights, failover policies, and route assignments.
- `ProviderDescriptor`:
  - Provider capabilities, protocol, authentication fields, and models.

### Quota Models (`src/types/quota.ts`)
- `QuotaInfo`:
  - Limits, remaining usage, reset intervals, and tier definitions.

### Plugins (`src/types/plugin.ts`)
- `PluginInfo`:
  - `id`: `string`
  - `name`: `string`
  - `version`: `string`
  - `enabled`: `boolean`
  - `routes`: `PluginRoute[]`
