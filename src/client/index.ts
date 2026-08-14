// @ts-nocheck
/**
 * freestyle-dsh-theme — browser half. Registers the 「主题」settings section with the
 * OKLCH theme proposer + designer, applies themes through theme.overrideTokens,
 * widens the settings panel, and names themes via /api/freestyle-dsh-theme/name.
 */
import React from 'react'

export const inject = ['slots']

const SUGGESTER_SOURCE = 'auto-theme-proposer'
const DESIGNER_SOURCE = 'theme-designer'
const PERSIST_KEY = 'freestyle-dsh-theme:last'

const CSS = `
.VOzbGW_panel{width:1120px !important;height:min(840px,100vh - 48px) !important;}
.atp-wrap{display:flex;flex-direction:column;gap:18px;}
.atp-head{display:flex;align-items:flex-start;gap:10px;flex-wrap:wrap;}
.atp-sub{font-size:12px;color:var(--dsw-alias-label-secondary);margin-top:2px;line-height:1.55;}
.atp-row{display:flex;align-items:center;gap:6px;flex-wrap:wrap;}
.atp-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(200px,1fr));gap:12px;}
.atp-card{border:1px solid var(--dsw-alias-border-l1);background:var(--dsw-alias-bg-layer-1);border-radius:14px;padding:11px;cursor:pointer;transition:border-color .16s,transform .16s,box-shadow .16s;}
.atp-card:hover{border-color:var(--dsw-alias-brand-primary);transform:translateY(-1px);box-shadow:0 8px 24px -12px rgb(0 0 0/.5);}
.atp-card.active{border-color:var(--dsw-alias-brand-primary);outline:2px solid var(--dsw-alias-brand-primary);outline-offset:1px;}
.atp-name{font-size:13px;font-weight:600;color:var(--dsw-alias-label-primary);margin-top:8px;}
.atp-meta{font-size:11px;color:var(--dsw-alias-label-secondary);margin-top:2px;}
.atp-section-label{font-size:11px;font-weight:600;letter-spacing:.07em;text-transform:uppercase;color:var(--dsw-alias-label-secondary);}
.atp-chip{padding:5px 12px;border-radius:999px;font-size:12px;border:1px solid var(--dsw-alias-border-l1);background:transparent;color:var(--dsw-alias-label-secondary);cursor:pointer;transition:all .14s;}
.atp-chip:hover{border-color:var(--dsw-alias-brand-primary);color:var(--dsw-alias-label-primary);}
.atp-chip.on{background:var(--dsw-alias-brand-primary);color:var(--dsw-alias-label-primary-foreground);border-color:transparent;}
.atp-btn{padding:7px 14px;border-radius:10px;font-size:12.5px;font-weight:500;border:1px solid var(--dsw-alias-border-l1);background:var(--dsw-alias-bg-layer-1);color:var(--dsw-alias-label-primary);cursor:pointer;transition:all .14s;}
.atp-btn:hover{border-color:var(--dsw-alias-brand-primary);}
.atp-btn:disabled{opacity:.45;cursor:default;}
.atp-btn.primary{background:linear-gradient(135deg,var(--dsw-alias-brand-primary),color-mix(in srgb,var(--dsw-alias-brand-primary) 76%,#000));color:var(--dsw-alias-label-primary-foreground);border-color:transparent;}
.tp-tabs{display:inline-flex;gap:4px;padding:4px;border-radius:12px;background:var(--dsw-alias-bg-layer-2);border:1px solid var(--dsw-alias-border-l1);align-self:flex-start;}
.tp-tab{padding:7px 18px;border-radius:9px;font-size:13px;font-weight:600;border:none;background:transparent;color:var(--dsw-alias-label-secondary);cursor:pointer;transition:all .15s;}
.tp-tab:hover{color:var(--dsw-alias-label-primary);}
.tp-tab.on{background:var(--dsw-alias-brand-primary);color:var(--dsw-alias-label-primary-foreground);box-shadow:0 2px 8px -2px color-mix(in srgb,var(--dsw-alias-brand-primary) 55%,transparent);}
.td-hero{position:relative;overflow:hidden;border-radius:18px;padding:24px;border:1px solid var(--dsw-alias-border-l1);background:linear-gradient(135deg,color-mix(in srgb,var(--dsw-alias-brand-primary) 15%,transparent),transparent 62%),var(--dsw-alias-bg-layer-1);}
.td-hero-title{font-size:20px;font-weight:700;color:var(--dsw-alias-label-primary);letter-spacing:-.02em;}
.td-hero-sub{font-size:12.5px;color:var(--dsw-alias-label-secondary);margin-top:6px;line-height:1.55;max-width:640px;}
.td-hero-actions{display:flex;align-items:center;gap:8px;flex-wrap:wrap;margin-top:16px;}
.td-grid{display:grid;grid-template-columns:minmax(250px,1fr) minmax(360px,1.5fr);gap:16px;align-items:start;}
@media (max-width:860px){.td-grid{grid-template-columns:1fr;}}
.td-card{border:1px solid var(--dsw-alias-border-l1);background:color-mix(in srgb,var(--dsw-alias-bg-layer-1) 85%,transparent);backdrop-filter:blur(14px) saturate(150%);border-radius:16px;padding:18px;box-shadow:0 1px 2px rgb(0 0 0/.04),0 10px 30px -22px rgb(0 0 0/.35);}
.td-card-head{display:flex;align-items:center;gap:8px;margin-bottom:13px;}
.td-card-dot{width:8px;height:8px;border-radius:50%;flex:none;}
.td-card-title{font-size:11px;font-weight:600;letter-spacing:.07em;text-transform:uppercase;color:var(--dsw-alias-label-secondary);}
.td-slider{display:grid;grid-template-columns:52px 1fr 52px;gap:10px;align-items:center;margin-top:11px;}
.td-sl{font-size:12px;color:var(--dsw-alias-label-secondary);}
.td-val{font-size:11.5px;color:var(--dsw-alias-label-secondary);text-align:right;font-variant-numeric:tabular-nums;}
.td-range{-webkit-appearance:none;appearance:none;width:100%;height:6px;border-radius:999px;background:var(--dsw-alias-bg-layer-2);outline:none;cursor:pointer;}
.td-range::-webkit-slider-thumb{-webkit-appearance:none;appearance:none;width:17px;height:17px;border-radius:50%;background:var(--dsw-alias-brand-primary);border:2.5px solid var(--dsw-alias-bg-base);box-shadow:0 1px 5px rgb(0 0 0/.35);cursor:pointer;transition:transform .12s;}
.td-range::-webkit-slider-thumb:hover{transform:scale(1.12);}
.td-range::-moz-range-thumb{width:14px;height:14px;border-radius:50%;background:var(--dsw-alias-brand-primary);border:2.5px solid var(--dsw-alias-bg-base);box-shadow:0 1px 5px rgb(0 0 0/.35);cursor:pointer;}
.td-range-hue{background:linear-gradient(90deg,oklch(.72 .16 0),oklch(.72 .16 45),oklch(.72 .16 90),oklch(.72 .16 135),oklch(.72 .16 180),oklch(.72 .16 225),oklch(.72 .16 270),oklch(.72 .16 315),oklch(.72 .16 360));}
.td-hue-grid{display:grid;grid-template-columns:repeat(12,1fr);gap:5px;margin-top:11px;}
.td-hue{height:20px;border-radius:6px;border:2px solid transparent;cursor:pointer;padding:0;transition:transform .1s,box-shadow .1s;}
.td-hue:hover{transform:scale(1.14);}
.td-hue.sel{border-color:var(--dsw-alias-label-primary);box-shadow:0 0 0 2px var(--dsw-alias-bg-base);}
.td-channel-swatch{width:44px;height:44px;border-radius:12px;border:1px solid var(--dsw-alias-border-l1);flex:none;box-shadow:inset 0 0 0 1px rgb(255 255 255/.08);}
.td-input{width:100%;box-sizing:border-box;padding:7px 10px;border-radius:9px;border:1px solid var(--dsw-alias-border-l1);background:var(--dsw-alias-bg-layer-2);color:var(--dsw-alias-label-primary);font-size:12.5px;font-family:inherit;outline:none;transition:border-color .14s;}
.td-input:focus{border-color:var(--dsw-alias-brand-primary);}
.td-tarea{width:100%;box-sizing:border-box;min-height:76px;font-family:ui-monospace,Consolas,monospace;font-size:11px;margin-top:10px;border-radius:10px;border:1px solid var(--dsw-alias-border-l1);background:var(--dsw-alias-bg-layer-2);color:var(--dsw-alias-label-primary);padding:9px;outline:none;resize:vertical;}
.td-tarea:focus{border-color:var(--dsw-alias-brand-primary);}
.td-tags{display:flex;flex-wrap:wrap;gap:5px;margin-top:8px;}
.td-hint{font-size:11.5px;color:var(--dsw-alias-label-secondary);line-height:1.55;margin-top:10px;}
.thg-row{border-bottom:1px solid var(--dsw-alias-border-l2);padding:16px 0;}
.thg-head{display:flex;align-items:center;gap:10px;}
.thg-label{font-size:14px;font-weight:500;color:var(--dsw-alias-label-primary);line-height:22px;}
.thg-desc{font-size:12px;color:var(--dsw-alias-label-tertiary);margin-top:2px;line-height:18px;}
`

export function apply(ctx) {
  const el = React.createElement

  // Inject the plugin stylesheet (removed on dispose).
  const styleTag = document.createElement('style')
  styleTag.dataset.plugin = 'freestyle-dsh-theme'
  styleTag.textContent = CSS
  document.head.appendChild(styleTag)
  ctx.effect(() => () => { styleTag.remove() }, 'freestyle-dsh-theme: css')

  const slots = ctx.slots
  const theme = ctx.get('theme')

  const clamp = (v, min, max) => Math.max(min, Math.min(max, v))
  const srgbEncode = (v) => v <= 0.0031308 ? 12.92 * v : 1.055 * Math.pow(v, 1 / 2.4) - 0.055
  function oklchToRgb(L, C, H) {
    const rad = H * Math.PI / 180
    const a = C * Math.cos(rad)
    const b = C * Math.sin(rad)
    const ll = Math.pow(L + 0.3963377774 * a + 0.2158037573 * b, 3)
    const mm = Math.pow(L - 0.1055613458 * a - 0.0638541728 * b, 3)
    const ss = Math.pow(L - 0.0894841775 * a - 1.291485548 * b, 3)
    return [
      4.0767416621 * ll - 3.3077115913 * mm + 0.2309699292 * ss,
      -1.2684380046 * ll + 2.6097574011 * mm - 0.3413193965 * ss,
      -0.0041960863 * ll - 0.7034186147 * mm + 1.707614701 * ss,
    ].map((v) => Math.round(clamp(srgbEncode(v), 0, 1) * 255))
  }
  function oklchToHex(L, C, H) { return '#' + oklchToRgb(L, C, H).map((v) => v.toString(16).padStart(2, '0')).join('') }
  function oklchToRgba(L, C, H, alpha) { const c = oklchToRgb(L, C, H); return 'rgba(' + c[0] + ',' + c[1] + ',' + c[2] + ',' + alpha + ')' }

  const HARMONIES = [
    { key: 'analogous', label: '邻近' },
    { key: 'complementary', label: '互补' },
    { key: 'split', label: '分裂互补' },
    { key: 'triadic', label: '三角色' },
    { key: 'random', label: '随机' },
  ]
  function huesForHarmony(primary, harmony) {
    const hue = ((Math.round(primary) % 360) + 360) % 360
    const offsets = { analogous: [32, -22], complementary: [180, 8], split: [150, 210], triadic: [120, 240] }
    const o = offsets[harmony] || offsets.analogous
    return { th2: (hue + o[0]) % 360, ths: (hue + o[1] + 360) % 360 }
  }

  const DEF_LIGHT = { l1: 0.52, l2: 0.60, bg: 0.955, tx: 0.14, sb: 0.976 }
  const DEF_DARK = { l1: 0.76, l2: 0.76, bg: 0.14, tx: 0.955, sb: 0.098 }

  function fullPalette(t) {
    const light = t.mode === 'light'
    const th = t.th, th2 = t.th2, ths = t.ths
    const c1 = t.c1, c2 = t.c2, sc = t.sc
    const l1 = t.l1, l2 = t.l2, bg = t.bg, tx = t.tx, sb = t.sb !== undefined ? t.sb : (light ? 0.976 : 0.098)
    const H = (L, C, hh) => oklchToHex(L, C, hh)
    const A = (L, C, hh, al) => oklchToRgba(L, C, hh, al)

    const s_base = light ? 0.978 : Math.max(0.035, bg - 0.045)
    const s_l1   = light ? 0.988 : bg
    const s_l2   = light ? 0.955 : bg + 0.03
    const s_l3   = light ? 0.925 : bg + 0.055
    const s_over = light ? 0.94  : bg + 0.09
    const s_mod  = light ? 0.955 : bg + 0.05
    const s_code = light ? 0.968 : Math.max(0.035, bg - 0.03)

    const i1 = tx
    const i2 = light ? tx + 0.22 : tx - 0.20
    const i3 = light ? tx + 0.38 : tx - 0.30
    const i4 = light ? tx + 0.50 : tx - 0.40
    const i_dim = light ? 0.90 : 0.34
    const onAccent = l1 > 0.62 ? 0.13 : 0.97
    const accentInv = light ? 0.10 : 0.97
    const bline = (a) => light ? 'rgba(0,0,0,' + a + ')' : 'rgba(255,255,255,' + a + ')'

    return {
      '--dsw-alias-bg-base': H(s_base, sc * 0.3, ths),
      '--dsw-alias-bg-layer-1': H(s_l1, sc * 0.2, ths),
      '--dsw-alias-bg-layer-2': H(s_l2, sc * 0.4, ths),
      '--dsw-alias-bg-layer-3': H(s_l3, sc * 0.5, ths),
      '--dsw-alias-bg-overlay': H(s_over, sc * 0.5, ths),
      '--dsw-alias-bg-module-platform': H(s_mod, sc * 0.35, ths),
      '--dsw-alias-bg-multi-select': H(s_mod, sc * 0.35, ths),
      '--dsw-alias-bg-mask-1': 'rgba(0,0,0,' + (light ? 0.24 : 0.5) + ')',
      '--dsw-alias-bg-mask-2': 'rgba(0,0,0,' + (light ? 0.12 : 0.2) + ')',
      '--dsw-alias-bg-mask-3': 'rgba(0,0,0,0.48)',
      '--dsw-alias-bg-mask-photo': 'rgba(0,0,0,0.88)',
      '--dsw-alias-bg-mask-drop': A(light ? 0.98 : 0.10, 0, ths, 0.7),
      '--dsw-alias-bg-skeleton': light ? 'rgba(0,0,0,0.04)' : 'rgba(255,255,255,0.08)',
      '--dsw-alias-border-inverted': light ? 'rgba(0,0,0,0)' : 'rgba(255,255,255,0.06)',
      '--dsw-alias-border-inverted2': light ? 'rgba(0,0,0,0)' : 'rgba(255,255,255,0.08)',
      '--dsw-alias-border-l1': bline(light ? 0.05 : 0.06),
      '--dsw-alias-border-l2': bline(light ? 0.10 : 0.12),
      '--dsw-alias-border-l2-darkmode-thin': bline(light ? 0.10 : 0.06),
      '--dsw-alias-border-l3': bline(light ? 0.12 : 0.16),
      '--dsw-alias-border-l4': bline(light ? 0.16 : 0.20),
      '--dsw-alias-brand-primary': H(l1, c1, th),
      '--dsw-alias-brand-primary-invert': H(accentInv, sc * 0.2, ths),
      '--dsw-alias-brand-primary-new-colorprimary-new-color': H(l1, c1, th),
      '--dsw-alias-brand-text': H(l1, c1, th),
      '--dsw-alias-button-contrast-fill': H(light ? 0.12 : 0.95, sc * 0.1, ths),
      '--dsw-alias-button-elevated-fill': H(s_l1, sc * 0.2, ths),
      '--dsw-alias-button-floating-fill': H(s_l2, sc * 0.3, ths),
      '--dsw-alias-button-floating-hover': H(s_l3, sc * 0.4, ths),
      '--dsw-alias-button-ghost-active-border': H(i3, sc * 0.3, ths),
      '--dsw-alias-button-ghost-active-fill': H(light ? 0.90 : 0.28, sc * 0.4, ths),
      '--dsw-alias-button-ghost-active-hover': H(light ? 0.93 : 0.32, sc * 0.4, ths),
      '--dsw-alias-button-info-fill': H(l1, c1, th),
      '--dsw-alias-button-info-hover': H(clamp(l1 - (light ? 0.06 : -0.06), 0.2, 0.9), c1, th),
      '--dsw-alias-button-primary-dimmed': H(light ? 0.90 : 0.28, sc * 0.4, ths),
      '--dsw-alias-button-primary-fill': H(l1, c1, th),
      '--dsw-alias-button-primary-hover': H(clamp(l1 + (light ? -0.07 : 0.08), 0.2, 0.95), c1, th),
      '--dsw-alias-button-tool-bar-fill-invisible': 'rgba(31,31,31,0.36)',
      '--dsw-alias-button-tool-bar-fill': 'rgba(84,85,87,0.5)',
      '--dsw-alias-button-tool-bar-hover': 'rgba(84,85,87,0.6)',
      '--dsw-alias-interactive-bg-active': A(l1, c1, th, light ? 0.12 : 0.14),
      '--dsw-alias-interactive-bg-hover': A(l1, c1, th, light ? 0.07 : 0.12),
      '--dsw-alias-interactive-bg-hover-accent': A(l1, c1, th, light ? 0.14 : 0.22),
      '--dsw-alias-interactive-bg-hover-danger': A(0.5, 0.17, 25, light ? 0.08 : 0.14),
      '--dsw-alias-interactive-bg-hover-solid': H(light ? 0.90 : 0.26, sc * 0.4, ths),
      '--dsw-alias-label-caption': H(i4, 0.006, th),
      '--dsw-alias-label-dimmed': H(i_dim, 0.004, ths),
      '--dsw-alias-label-primary': H(i1, 0.008, th),
      '--dsw-alias-label-primary-bluish': H(i1, 0.008, th),
      '--dsw-alias-label-primary-dimmed': H(i2, 0.007, th),
      '--dsw-alias-label-primary-foreground': H(onAccent, 0.01, th),
      '--dsw-alias-label-primary-inverted': H(accentInv, 0.008, ths),
      '--dsw-alias-label-secondary': H(i2, 0.007, th),
      '--dsw-alias-label-tertiary': H(i3, 0.006, th),
      '--dsw-alias-markdown-citation': H(light ? 0.90 : 0.28, sc * 0.3, ths),
      '--dsw-alias-markdown-code-block': H(s_code, sc * 0.3, ths),
      '--dsw-alias-markdown-code-block-banner': H(light ? 0.985 : 0.16, sc * 0.25, ths),
      '--dsw-alias-markdown-code-segment-selected': H(s_l1, sc * 0.2, ths),
      '--dsw-alias-markdown-code-segment-unselected': H(s_l2, sc * 0.3, ths),
      '--dsw-alias-markdown-inline-code': H(light ? 0.90 : 0.24, sc * 0.3, ths),
      '--dsw-alias-markdown-placeholder': H(s_mod, sc * 0.3, ths),
      '--dsw-alias-markdown-tag': H(light ? 0.92 : 0.24, sc * 0.3, ths),
      '--dsw-alias-scrollbar-bg-l1': H(light ? 0.78 : 0.32, 0.004, ths),
      '--dsw-alias-scrollbar-bg-l2': H(light ? 0.78 : 0.30, 0.004, ths),
      '--dsw-alias-scrollbar-hover-l1': H(light ? 0.70 : 0.38, 0.004, ths),
      '--dsw-alias-scrollbar-hover-l2': H(light ? 0.70 : 0.36, 0.004, ths),
      '--dsw-alias-state-business-primary': H(l1, c1, th),
      '--dsw-alias-state-business-tertiary': A(l1, c1, th, light ? 0.14 : 0.22),
      '--dsw-alias-state-error-primary': H(light ? 0.50 : 0.72, 0.17, 25),
      '--dsw-alias-state-error-secondary': H(light ? 0.55 : 0.68, 0.16, 25),
      '--dsw-alias-state-success-primary': H(light ? 0.46 : 0.72, 0.15, 150),
      '--dsw-alias-state-success-secondary': H(light ? 0.52 : 0.66, 0.14, 150),
      '--dsw-alias-state-success-tertiary': H(light ? 0.95 : 0.24, 0.05, 150),
      '--dsw-alias-state-warn-label': H(light ? 0.55 : 0.78, 0.14, 70),
      '--dsw-alias-state-warn-primary': H(light ? 0.60 : 0.80, 0.14, 75),
      '--dsw-alias-state-warn-secondary': H(light ? 0.65 : 0.72, 0.14, 75),
      '--dsw-alias-state-warn-tertiary': H(light ? 0.95 : 0.26, 0.06, 75),
      '--dsw-alias-toast-bg': H(light ? 0.22 : 0.30, sc * 0.3, ths),
      '--dsw-alias-tooltip-bg': H(light ? 0.18 : 0.32, sc * 0.3, ths),
      '--dsw-specific-bubble': H(light ? 0.93 : 0.20, sc * 0.4, ths),
      '--dsw-specific-bubble-highlight': A(l1, c1, th, light ? 0.18 : 0.24),
      '--dsw-specific-input-major': H(s_l1, sc * 0.2, ths),
      '--dsw-specific-login-input': H(s_code, sc * 0.3, ths),
      '--dsw-specific-menu': H(s_over, sc * 0.5, ths),
      '--dsw-specific-selector': H(s_mod, sc * 0.35, ths),
      '--dsw-specific-sidebar-fill': H(sb, sc * 0.3, ths),
      '--dsw-specific-sidebar-nav-item-active': H(light ? 0.88 : 0.30, c2 * 0.4, th2),
      '--dsw-specific-sidebar-nav-item-active-accent': A(l1, c1, th, light ? 0.16 : 0.24),
      '--dsw-specific-sidebar-nav-item-hover': H(light ? 0.93 : 0.23, c2 * 0.25, th2),
      '--dsw-specific-tip': H(light ? 0.93 : 0.22, sc * 0.4, ths),
    }
  }

  function pair(lightPal, darkPal) {
    const tokens = {}
    for (const k of Object.keys(lightPal)) tokens[k] = { light: lightPal[k], dark: darkPal[k] }
    return tokens
  }

  const HUE_NAMES = [
    [0, '朱砂红'], [15, '珊瑚橙'], [30, '琥珀橙'], [45, '暖金沙'], [60, '柠檬黄'],
    [90, '青柠绿'], [120, '森林绿'], [150, '翡翠青'], [170, '冰蓝青'], [190, '冰川蓝'],
    [210, '深海蓝'], [230, '雾靛蓝'], [250, '石墨蓝'], [270, '暮光紫'], [290, '罗兰紫'],
    [310, '梅子紫'], [330, '樱粉'], [345, '玫瑰粉'],
  ]
  function hueName(h) {
    let best = HUE_NAMES[0], bd = 1e9
    for (const p of HUE_NAMES) { const d = Math.abs(h - p[0]); if (d < bd) { bd = d; best = p } }
    return best[1]
  }
  function harmonyLabel(k) { const f = HARMONIES.find((x) => x.key === k); return f ? f.label : '邻近' }

  function buildTheme(th, harmony, nameHint) {
    const related = huesForHarmony(th, harmony)
    const base = { th: th, th2: related.th2, ths: related.ths, c1: 0.165, c2: 0.05, sc: 0.03 }
    const light = fullPalette(Object.assign({}, base, DEF_LIGHT, { mode: 'light' }))
    const dark = fullPalette(Object.assign({}, base, DEF_DARK, { mode: 'dark' }))
    return {
      key: th + '|' + harmony + '|' + Math.random().toString(36).slice(2, 7),
      hue: th, harmony: harmony,
      name: nameHint || (hueName(th) + ' · ' + harmonyLabel(harmony)),
      swatches: { light: light, dark: dark },
      tokens: pair(light, dark),
    }
  }
  const CURATED = [
    { th: 168, harmony: 'analogous', name: '极光青' },
    { th: 72, harmony: 'analogous', name: '暖金沙' },
    { th: 300, harmony: 'triadic', name: '暮光紫' },
    { th: 350, harmony: 'analogous', name: '樱粉' },
    { th: 220, harmony: 'analogous', name: '深海蓝' },
    { th: 35, harmony: 'complementary', name: '熔岩橙' },
  ].map((c) => buildTheme(c.th, c.harmony, c.name))
  function randomBatch(harmony, n) {
    const out = []
    for (let i = 0; i < n; i++) {
      const th = Math.floor(Math.random() * 360)
      const h = harmony === 'random' ? HARMONIES[Math.floor(Math.random() * 4)].key : harmony
      out.push(buildTheme(th, h))
    }
    return out
  }

  function defaultTokens(mode) {
    const d = mode === 'light' ? DEF_LIGHT : DEF_DARK
    return { th: 168, th2: 200, ths: 176, c1: 0.16, c2: 0.14, sc: 0.03, l1: d.l1, l2: d.l2, bg: d.bg, tx: d.tx, sb: d.sb, mode: mode }
  }
  function switchModeTokens(t, mode) {
    const d = mode === 'light' ? DEF_LIGHT : DEF_DARK
    return { th: t.th, th2: t.th2, ths: t.ths, c1: t.c1, c2: t.c2, sc: t.sc, l1: d.l1, l2: d.l2, bg: d.bg, tx: d.tx, sb: d.sb, mode: mode }
  }
  function generateTokens(t) {
    const cur = fullPalette(t)
    const otherMode = t.mode === 'light' ? 'dark' : 'light'
    const d = otherMode === 'light' ? DEF_LIGHT : DEF_DARK
    const other = fullPalette({ th: t.th, th2: t.th2, ths: t.ths, c1: t.c1, c2: t.c2, sc: t.sc, l1: d.l1, l2: d.l2, bg: d.bg, tx: d.tx, sb: d.sb, mode: otherMode })
    return t.mode === 'light' ? pair(cur, other) : pair(other, cur)
  }
  function toInput(t) {
    return { version: 4, th: Math.round(t.th), th2: Math.round(t.th2), ths: Math.round(t.ths), c1: Number(t.c1.toFixed(3)), c2: Number(t.c2.toFixed(3)), sc: Number(t.sc.toFixed(3)), l1: Number(t.l1.toFixed(2)), l2: Number(t.l2.toFixed(2)), bg: Number(t.bg.toFixed(2)), tx: Number(t.tx.toFixed(2)), sb: Number(t.sb.toFixed(2)), mode: t.mode }
  }
  function normalizeTokens(raw) {
    const r = raw || {}
    const num = (v, fb, min, max) => clamp(Number.isFinite(Number(v)) ? Number(v) : fb, min, max)
    const mode = r.mode === 'light' ? 'light' : 'dark'
    return {
      th: num(r.th, 168, 0, 360), th2: num(r.th2, 200, 0, 360), ths: num(r.ths, 176, 0, 360),
      c1: num(r.c1, 0.16, 0.01, 0.28), c2: num(r.c2, 0.14, 0.01, 0.28), sc: num(r.sc, 0.03, 0.002, 0.09),
      l1: num(r.l1, mode === 'light' ? 0.52 : 0.76, 0.3, 0.95), l2: num(r.l2, mode === 'light' ? 0.60 : 0.76, 0.05, 0.97),
      bg: num(r.bg, mode === 'light' ? 0.955 : 0.14, 0.04, 0.98), tx: num(r.tx, mode === 'light' ? 0.14 : 0.955, 0.03, 1),
      sb: num(r.sb, mode === 'light' ? 0.976 : 0.098, 0.04, 0.98),
      mode: mode,
    }
  }

  let suggesterDisposer = null
  let designerDisposer = null
  ctx.effect(function () {
    return function () {
      if (suggesterDisposer) { suggesterDisposer(); suggesterDisposer = null }
      if (designerDisposer) { designerDisposer(); designerDisposer = null }
    }
  })

  function persistTheme(tokens) {
    try { localStorage.setItem(PERSIST_KEY, JSON.stringify(tokens)) } catch (e) {}
  }
  function clearPersistedTheme() {
    try { localStorage.removeItem(PERSIST_KEY) } catch (e) {}
  }
  function restorePersistedTheme() {
    try {
      const raw = localStorage.getItem(PERSIST_KEY)
      if (!raw || !theme) return
      const tokens = JSON.parse(raw)
      if (tokens && typeof tokens === 'object' && Object.keys(tokens).length > 0) {
        suggesterDisposer = theme.overrideTokens(SUGGESTER_SOURCE, tokens)
      }
    } catch (e) {}
  }

  function MiniPreview(p) {
    const bg = p['--dsw-alias-bg-base']
    const layer = p['--dsw-alias-bg-layer-1']
    const side = p['--dsw-specific-sidebar-fill']
    const border = p['--dsw-alias-border-l1']
    const text = p['--dsw-alias-label-primary']
    const text2 = p['--dsw-alias-label-secondary']
    const brand = p['--dsw-alias-brand-primary']
    const err = p['--dsw-alias-state-error-primary']
    const warn = p['--dsw-alias-state-warn-primary']
    const ok = p['--dsw-alias-state-success-primary']
    return el('div', { style: { background: bg, borderRadius: 12, overflow: 'hidden', border: '1px solid ' + border, boxShadow: '0 10px 28px -16px rgb(0 0 0/.55)' } },
      el('div', { style: { display: 'flex', alignItems: 'center', gap: 5, padding: '7px 10px', background: layer, borderBottom: '1px solid ' + border } },
        el('span', { style: { width: 8, height: 8, borderRadius: '50%', background: err } }),
        el('span', { style: { width: 8, height: 8, borderRadius: '50%', background: warn } }),
        el('span', { style: { width: 8, height: 8, borderRadius: '50%', background: ok } }),
        el('div', { style: { flex: 1 } }),
        el('div', { style: { width: 40, height: 5, borderRadius: 3, background: text2, opacity: .5 } }),
      ),
      el('div', { style: { display: 'flex', gap: 8, padding: 9 } },
        el('div', { style: { width: 34, borderRadius: 8, background: side, border: '1px solid ' + border, padding: 6, display: 'flex', flexDirection: 'column', gap: 5 } },
          el('div', { style: { width: 13, height: 13, borderRadius: 4, background: brand } }),
          el('div', { style: { height: 4, borderRadius: 2, background: text, opacity: .25 } }),
          el('div', { style: { height: 4, borderRadius: 2, background: text, opacity: .25 } }),
          el('div', { style: { height: 4, borderRadius: 2, background: text, opacity: .25 } }),
        ),
        el('div', { style: { flex: 1, display: 'flex', flexDirection: 'column', gap: 7 } },
          el('div', { style: { background: layer, borderRadius: 8, border: '1px solid ' + border, padding: 7 } },
            el('div', { style: { height: 6, width: '70%', borderRadius: 3, background: text } }),
            el('div', { style: { height: 5, width: '48%', borderRadius: 3, background: text2, marginTop: 4 } }),
            el('div', { style: { display: 'flex', gap: 5, marginTop: 7 } },
              el('div', { style: { width: 34, height: 12, borderRadius: 5, background: brand } }),
              el('div', { style: { width: 26, height: 12, borderRadius: 5, background: 'transparent', border: '1px solid ' + border } }),
            ),
          ),
          el('div', { style: { display: 'flex', gap: 6 } },
            el('div', { style: { flex: 1, background: layer, borderRadius: 7, border: '1px solid ' + border, height: 26 } }),
            el('div', { style: { flex: 1, background: layer, borderRadius: 7, border: '1px solid ' + border, height: 26 } }),
            el('div', { style: { flex: 1, background: layer, borderRadius: 7, border: '1px solid ' + border, height: 26 } }),
          ),
        ),
      ),
    )
  }

  function Card(props) {
    const t = props.t, mode = props.mode, active = props.active, onApply = props.onApply
    return el('div', {
      className: 'atp-card' + (active ? ' active' : ''), role: 'button', tabIndex: 0,
      onClick: function () { onApply(t) },
      onKeyDown: function (e) { if (e.key === 'Enter' || e.key === ' ') { onApply(t) } },
    },
      MiniPreview(mode === 'light' ? t.swatches.light : t.swatches.dark),
      el('div', { className: 'atp-name' }, t.name),
      el('div', { className: 'atp-meta' }, String(t.hue) + '° · ' + harmonyLabel(t.harmony) + (active ? ' · 已应用' : '')),
    )
  }

  function Suggester() {
    const hs = React.useState('random'), h = hs[0], setH = hs[1]
    const bs = React.useState(function () { return randomBatch('random', 8) }), batch = bs[0], setBatch = bs[1]
    const ms = React.useState('light'), mode = ms[0], setMode = ms[1]
    const as = React.useState(null), appliedKey = as[0], setAppliedKey = as[1]
    const apply = function (t) { suggesterDisposer = theme.overrideTokens(SUGGESTER_SOURCE, t.tokens); persistTheme(t.tokens); setAppliedKey(t.key) }
    const reset = function () { if (suggesterDisposer) { suggesterDisposer(); suggesterDisposer = null } clearPersistedTheme(); setAppliedKey(null) }
    const regenerate = function () { setBatch(randomBatch(h, 8)) }
    return el('div', { className: 'atp-wrap' },
      el('div', { className: 'atp-head' },
        el('div', null, el('div', { className: 'atp-sub' }, 'OKLCH 色相 + 配色关系自动生成；每套提案同时覆盖明/暗两套完整令牌')),
        el('div', { style: { flex: 1 } }),
        el('button', { className: 'atp-btn', onClick: function () { setMode(mode === 'light' ? 'dark' : 'light') } }, mode === 'light' ? '预览浅色' : '预览深色'),
        el('button', { className: 'atp-btn', onClick: regenerate }, '换一批'),
        el('button', { className: 'atp-btn', onClick: reset, disabled: appliedKey === null }, '恢复默认'),
      ),
      el('div', { className: 'atp-row' },
        el('span', { className: 'atp-section-label' }, '配色关系'),
        ...HARMONIES.map(function (hh) { return el('button', { key: hh.key, className: 'atp-chip' + (h === hh.key ? ' on' : ''), onClick: function () { setH(hh.key) } }, hh.label) }),
      ),
      el('div', { className: 'atp-section-label', style: { marginTop: 6 } }, '风格预设'),
      el('div', { className: 'atp-grid' }, ...CURATED.map(function (t) { return el(Card, { key: t.key, t: t, mode: mode, active: appliedKey === t.key, onApply: apply }) })),
      el('div', { className: 'atp-section-label', style: { marginTop: 10 } }, '智能提案 · 点击卡片即应用'),
      el('div', { className: 'atp-grid' }, ...batch.map(function (t) { return el(Card, { key: t.key, t: t, mode: mode, active: appliedKey === t.key, onApply: apply }) })),
    )
  }

  const CHANNELS = [
    { key: 'th', label: '主色', hueKey: 'th', cKey: 'c1', lKey: 'l1', cMax: 0.28 },
    { key: 'th2', label: '副色', hueKey: 'th2', cKey: 'c2', lKey: 'l2', cMax: 0.28 },
    { key: 'ths', label: '面板', hueKey: 'ths', cKey: 'sc', lKey: 'bg', cMax: 0.09 },
  ]
  const HUE_RAINBOW = Array.from({ length: 24 }, (_, i) => i * 15)

  function RangeRow(props) {
    return el('div', { className: 'td-slider' },
      el('span', { className: 'td-sl' }, props.label),
      el('input', { type: 'range', className: 'td-range' + (props.hue ? ' td-range-hue' : ''), min: props.min, max: props.max, step: props.step, value: props.value, onChange: function (e) { props.onChange(Number(e.target.value)) } }),
      el('span', { className: 'td-val' }, props.format(props.value)),
    )
  }

  function Designer() {
    const ts = React.useState(function () { return defaultTokens('light') }), t = ts[0], setT = ts[1]
    const chs = React.useState('th'), channel = chs[0], setChannel = chs[1]
    const ls = React.useState({ th: false, th2: false, ths: false }), locks = ls[0], setLocks = ls[1]
    const nms = React.useState(''), name = nms[0], setName = nms[1]
    const tgs = React.useState(''), tagsText = tgs[0], setTagsText = tgs[1]
    const dcs = React.useState(''), desc = dcs[0], setDesc = dcs[1]
    const aibs = React.useState(false), aiBusy = aibs[0], setAiBusy = aibs[1]
    const jss = React.useState(''), jsonText = jss[0], setJsonText = jss[1]
    const mss = React.useState(''), msg = mss[0], setMsg = mss[1]
    const lps = React.useState(true), livePreview = lps[0], setLivePreview = lps[1]
    const aps = React.useState(false), applied = aps[0], setApplied = aps[1]

    const flash = function (m) { setMsg(m) }
    const commit = function (next) {
      setT(next)
      if (livePreview) { designerDisposer = theme.overrideTokens(DESIGNER_SOURCE, generateTokens(next)); setApplied(true) }
    }
    const patch = function (partial) { commit(Object.assign({}, t, partial)) }

    const ch = CHANNELS.find(function (c) { return c.key === channel })
    const hVal = t[ch.hueKey], cVal = t[ch.cKey], lVal = t[ch.lKey]
    const lightRange = channel === 'ths' ? (t.mode === 'light' ? { min: 0.68, max: 0.98 } : { min: 0.04, max: 0.30 }) : { min: 0.05, max: 0.97 }

    const patchChannel = function (values) {
      const next = {}
      if (values.h !== undefined) next[ch.hueKey] = values.h
      if (values.c !== undefined) next[ch.cKey] = values.c
      if (values.l !== undefined) next[ch.lKey] = values.l
      patch(next)
    }
    const setMode = function (mode) { commit(switchModeTokens(t, mode)) }
    const applyHarmony = function (harmony) {
      const related = huesForHarmony(t.th, harmony)
      const next = {}
      if (!locks.th2) next.th2 = related.th2
      if (!locks.ths) next.ths = related.ths
      patch(next)
    }
    const randomize = function () {
      const hh = HARMONIES[Math.floor(Math.random() * 4)].key
      const related = huesForHarmony(t.th, hh)
      const next = {}
      if (!locks.th) { next.th = Math.floor(Math.random() * 360); next.c1 = Number((0.09 + Math.random() * 0.12).toFixed(3)) }
      if (!locks.th2) { next.th2 = related.th2; next.c2 = Number((0.08 + Math.random() * 0.12).toFixed(3)) }
      if (!locks.ths) { next.ths = related.ths; next.sc = Number((0.01 + Math.random() * 0.035).toFixed(3)) }
      patch(next)
    }
    const applyVariant = function (kind) {
      const next = {}
      if (kind === 'swap') {
        if (locks.th || locks.th2) { flash('先解锁主色与副色'); return }
        next.th = t.th2; next.th2 = t.th; next.c1 = t.c2; next.c2 = t.c1; next.l1 = t.l2; next.l2 = t.l1
      } else {
        const factor = kind === 'soft' ? 0.72 : kind === 'vivid' ? 1.18 : 1
        const delta = kind === 'bright' ? 0.05 : kind === 'deep' ? -0.05 : 0
        if (!locks.th) { next.c1 = clamp(t.c1 * factor, 0.01, 0.28); next.l1 = clamp(t.l1 + delta, 0.3, 0.95) }
        if (!locks.th2) { next.c2 = clamp(t.c2 * factor, 0.01, 0.28); next.l2 = clamp(t.l2 + delta, 0.05, 0.97) }
        if (!locks.ths) { next.sc = clamp(t.sc * factor, 0.002, 0.09); next.bg = clamp(t.bg + delta, 0.04, 0.98) }
      }
      patch(next)
    }
    const toggleLock = function (k) { setLocks(Object.assign({}, locks, { [k]: !locks[k] })) }
    const applyNow = function () { designerDisposer = theme.overrideTokens(DESIGNER_SOURCE, generateTokens(t)); persistTheme(generateTokens(t)); setApplied(true); flash('已应用') }
    const resetAll = function () { if (designerDisposer) { designerDisposer(); designerDisposer = null } clearPersistedTheme(); setApplied(false); setT(defaultTokens('light')); flash('已恢复默认') }
    const aiName = async function () {
      if (aiBusy) return
      setAiBusy(true)
      try {
        const response = await fetch('/api/freestyle-dsh-theme/name', {
          method: 'POST',
          headers: { 'content-type': 'application/json' },
          body: JSON.stringify({ tokens: toInput(t) }),
        })
        const res = await response.json()
        if (!res || res.ok !== true) { flash((res && res.error) || 'AI 命名失败'); return }
        const m = (res.text || '').match(/\{[\s\S]*\}/)
        const p = m ? JSON.parse(m[0]) : JSON.parse(res.text)
        if (!p || !p.name) { flash('AI 返回格式无效'); return }
        setName(String(p.name || '').slice(0, 16))
        setTagsText(Array.isArray(p.tags) ? p.tags.map(function (x) { return String(x).slice(0, 8) }).slice(0, 5).join('，') : '')
        setDesc(String(p.desc || '').slice(0, 72))
        flash('主题名称已生成')
      } catch (e) { flash('AI 命名出错：' + (e && e.message ? e.message : String(e))) } finally { setAiBusy(false) }
    }
    const exportJson = function () {
      const s = JSON.stringify(toInput(t), null, 2)
      setJsonText(s)
      try { if (typeof navigator !== 'undefined' && navigator.clipboard) { navigator.clipboard.writeText(s) } } catch (e) {}
      flash('已复制到剪贴板')
    }
    const importJson = function () {
      try {
        const parsed = normalizeTokens(JSON.parse(jsonText.trim()))
        setT(parsed); if (livePreview) { designerDisposer = theme.overrideTokens(DESIGNER_SOURCE, generateTokens(parsed)); setApplied(true) }
        flash('已导入')
      } catch (e) { flash('不是有效的主题 JSON') }
    }

    const previewPalette = fullPalette(t)
    const tags = tagsText ? tagsText.split(/[,，、|]/).map(function (x) { return x.trim() }).filter(Boolean).slice(0, 5) : []
    const swatchColor = oklchToHex(lVal, cVal, hVal)

    return el('div', { className: 'atp-wrap' },
      el('div', { className: 'td-hero' },
        el('div', { className: 'td-hero-title' }, '主题设计器'),
        el('div', { className: 'td-hero-sub' }, 'OKLCH 独立色彩通道 · 通道锁定 · 配色关系与快速变体 · AI 命名 · JSON 导入导出'),
        el('div', { className: 'td-hero-actions' },
          el('label', { className: 'atp-row', style: { fontSize: 12, color: 'var(--dsw-alias-label-secondary)', cursor: 'pointer', marginRight: 4 } },
            el('input', { type: 'checkbox', checked: livePreview, onChange: function (e) {
              const on = e.target.checked; setLivePreview(on)
              if (on) { designerDisposer = theme.overrideTokens(DESIGNER_SOURCE, generateTokens(t)); setApplied(true) }
              else if (designerDisposer) { designerDisposer(); designerDisposer = null; setApplied(false) }
            } }),
            ' 实时预览',
          ),
          msg ? el('span', { className: 'atp-sub', style: { marginTop: 0 } }, msg) : null,
          el('div', { style: { flex: 1 } }),
          el('button', { className: 'atp-btn primary', onClick: applyNow }, '应用主题'),
          el('button', { className: 'atp-btn', onClick: resetAll, disabled: !applied }, '恢复默认'),
        ),
      ),
      el('div', { className: 'td-grid' },
        el('div', { style: { display: 'flex', flexDirection: 'column', gap: 16 } },
          el('div', { className: 'td-card' },
            el('div', { className: 'td-card-head' },
              el('span', { className: 'td-card-dot', style: { background: 'var(--dsw-alias-brand-primary)' } }),
              el('span', { className: 'td-card-title' }, '实时预览'),
            ),
            MiniPreview(previewPalette),
            el('div', { className: 'atp-row', style: { marginTop: 12 } },
              el('button', { className: 'atp-chip' + (t.mode === 'dark' ? ' on' : ''), onClick: function () { setMode('dark') } }, '深色'),
              el('button', { className: 'atp-chip' + (t.mode === 'light' ? ' on' : ''), onClick: function () { setMode('light') } }, '浅色'),
            ),
          ),
          el('div', { className: 'td-card' },
            el('div', { className: 'td-card-head' },
              el('span', { className: 'td-card-dot', style: { background: 'var(--dsw-alias-state-warn-primary)' } }),
              el('span', { className: 'td-card-title' }, '风格起点'),
            ),
            el('div', { className: 'atp-row' },
              ...HARMONIES.slice(0, 4).map(function (hh) { return el('button', { key: hh.key, className: 'atp-chip', onClick: function () { applyHarmony(hh.key) } }, hh.label) }),
              el('button', { className: 'atp-chip', onClick: randomize }, '智能随机'),
            ),
            el('div', { className: 'atp-row', style: { marginTop: 8 } },
              el('span', { className: 'atp-section-label' }, '变体'),
              el('button', { className: 'atp-chip', onClick: function () { applyVariant('soft') } }, '柔和'),
              el('button', { className: 'atp-chip', onClick: function () { applyVariant('vivid') } }, '鲜明'),
              el('button', { className: 'atp-chip', onClick: function () { applyVariant('bright') } }, '提亮'),
              el('button', { className: 'atp-chip', onClick: function () { applyVariant('deep') } }, '压暗'),
              el('button', { className: 'atp-chip', onClick: function () { applyVariant('swap') } }, '主副互换'),
            ),
          ),
          el('div', { className: 'td-card' },
            el('div', { className: 'td-card-head' },
              el('span', { className: 'td-card-dot', style: { background: 'var(--dsw-alias-state-success-primary)' } }),
              el('span', { className: 'td-card-title' }, '主题身份'),
            ),
            el('div', { className: 'atp-row' },
              el('input', { className: 'td-input', style: { flex: 1 }, value: name, onChange: function (e) { setName(e.target.value) }, placeholder: '主题名称' }),
              el('button', { className: 'atp-btn', onClick: function () { aiName() }, disabled: aiBusy }, aiBusy ? '命名中…' : 'AI 命名'),
            ),
            el('input', { className: 'td-input', style: { marginTop: 8 }, value: tagsText, onChange: function (e) { setTagsText(e.target.value) }, placeholder: '特征标签，逗号分隔' }),
            el('input', { className: 'td-input', style: { marginTop: 8 }, value: desc, onChange: function (e) { setDesc(e.target.value) }, placeholder: '主题特征介绍' }),
            tags.length ? el('div', { className: 'td-tags' }, ...tags.map(function (tg) { return el('span', { key: tg, className: 'atp-chip' }, '# ' + tg) })) : null,
          ),
          el('div', { className: 'td-card' },
            el('div', { className: 'td-card-head' },
              el('span', { className: 'td-card-dot', style: { background: 'var(--dsw-alias-label-secondary)' } }),
              el('span', { className: 'td-card-title' }, 'JSON 导入 / 导出'),
            ),
            el('textarea', { className: 'td-tarea', value: jsonText, onChange: function (e) { setJsonText(e.target.value) }, placeholder: '粘贴主题 JSON，或点「导出 JSON」生成' }),
            el('div', { className: 'atp-row', style: { marginTop: 8 } },
              el('button', { className: 'atp-btn', onClick: exportJson }, '导出 JSON'),
              el('button', { className: 'atp-btn', onClick: importJson }, '导入并应用'),
            ),
          ),
        ),
        el('div', { className: 'td-card' },
          el('div', { className: 'td-card-head' },
            el('span', { className: 'td-card-dot', style: { background: 'var(--dsw-alias-brand-primary)' } }),
            el('span', { className: 'td-card-title' }, '独立色彩通道'),
          ),
          el('div', { className: 'atp-row' },
            el('div', { className: 'td-channel-swatch', style: { background: swatchColor } }),
            el('div', { style: { display: 'flex', flexDirection: 'column', gap: 1 } },
              el('span', { style: { fontSize: 13, fontWeight: 600, color: 'var(--dsw-alias-label-primary)' } }, ch.label + '通道'),
              el('span', { className: 'td-val', style: { textAlign: 'left' } }, swatchColor),
            ),
            el('div', { style: { flex: 1 } }),
            ...CHANNELS.map(function (c) { return el('button', { key: c.key, className: 'atp-chip' + (channel === c.key ? ' on' : ''), onClick: function () { setChannel(c.key) } }, c.label) }),
            el('button', { className: 'atp-chip', onClick: function () { toggleLock(ch.key) } }, (locks[ch.key] ? '已锁定' : '未锁定') + ' ' + ch.label),
          ),
          el('div', { className: 'td-hue-grid' },
            ...HUE_RAINBOW.map(function (val) {
              const sel = Math.abs(hVal - val) < 7.5 || (hVal > 352.5 && val === 0)
              return el('button', { key: val, className: 'td-hue' + (sel ? ' sel' : ''), title: val + '°', style: { background: oklchToHex(0.72, 0.16, val) }, onClick: function () { patchChannel({ h: val }) } })
            }),
          ),
          RangeRow({ label: '色相', hue: true, min: 0, max: 360, step: 1, value: hVal, format: function (v) { return Math.round(v) + '°' }, onChange: function (v) { patchChannel({ h: v }) } }),
          RangeRow({ label: '彩度', min: 0.01, max: ch.cMax, step: 0.002, value: cVal, format: function (v) { return v.toFixed(3) }, onChange: function (v) { patchChannel({ c: v }) } }),
          RangeRow({ label: '明度', min: lightRange.min, max: lightRange.max, step: 0.01, value: lVal, format: function (v) { return v.toFixed(2) }, onChange: function (v) { patchChannel({ l: v }) } }),
          el('div', { style: { height: 1, background: 'var(--dsw-alias-border-l1)', margin: '14px 0' } }),
          RangeRow({ label: '文字明度', min: t.mode === 'light' ? 0.06 : 0.68, max: t.mode === 'light' ? 0.45 : 1, step: 0.01, value: t.tx, format: function (v) { return v.toFixed(2) }, onChange: function (v) { patch({ tx: v }) } }),
          RangeRow({ label: '侧边栏明度', min: t.mode === 'light' ? 0.90 : 0.09, max: t.mode === 'light' ? 0.985 : 0.30, step: 0.005, value: t.sb, format: function (v) { return v.toFixed(3) }, onChange: function (v) { patch({ sb: v }) } }),
          el('div', { className: 'td-hint' }, '主色 → 品牌强调；副色 → 侧边栏选中态；面板 → 各级背景；侧边栏明度 → 左侧栏底色（默认与主区一致，一体色）。'),
        ),
      ),
    )
  }

  function ThemePage() {
    const ts = React.useState('suggest')
    const tab = ts[0], setTab = ts[1]
    return el('div', { className: 'atp-wrap' },
      el('div', { className: 'tp-tabs' },
        el('button', { className: 'tp-tab' + (tab === 'suggest' ? ' on' : ''), onClick: function () { setTab('suggest') } }, '主题提案'),
        el('button', { className: 'tp-tab' + (tab === 'design' ? ' on' : ''), onClick: function () { setTab('design') } }, '主题设计器'),
      ),
      el('div', { style: { display: tab === 'suggest' ? 'block' : 'none' } }, el(Suggester)),
      el('div', { style: { display: tab === 'design' ? 'block' : 'none' } }, el(Designer)),
    )
  }

  function ThemeGeneralItem() {
    const os = React.useState(false)
    const open = os[0], setOpen = os[1]
    return el('div', { className: 'thg-row' },
      el('div', { className: 'thg-head' },
        el('div', null,
          el('div', { className: 'thg-label' }, '主题'),
          el('div', { className: 'thg-desc' }, '主题提案与设计器 · OKLCH 配色'),
        ),
        el('div', { style: { flex: 1 } }),
        el('button', { className: 'atp-btn' + (open ? ' primary' : ''), onClick: function () { setOpen(!open) } }, open ? '收起' : '自定义…'),
      ),
      open ? el('div', { style: { marginTop: 18 } }, el(ThemePage)) : null,
    )
  }

  slots.inject('settings.general.item', function () {
    return slots.register(
      { name: 'settings.general.item', id: 'theme', order: 15, label: '主题' },
      function () { return el(ThemeGeneralItem) },
    )
  })

  restorePersistedTheme()
}
