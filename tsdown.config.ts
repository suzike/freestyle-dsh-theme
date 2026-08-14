/**
 * Standalone build config for the dsh-theme plugin.
 *
 * Uses the repo's shared client-bundle preset (shared/tsdown.client.ts):
 * node-half lib/ (host AI-naming route) plus the browser bundle lib/client.js
 * (closure-factory artifact for the GUI's __ModuleLoader__). The client entry
 * is auto-detected at src/client/index.ts by the preset.
 */
import { clientBundle } from './shared/tsdown.client.ts'

export default clientBundle('@linxin666/dsh-theme', ['src/index.ts'], {
  libExternal: [
    '@deepseek-ai/dsh-host-webserver',
    '@deepseek-ai/dsh-settings',
  ],
})
