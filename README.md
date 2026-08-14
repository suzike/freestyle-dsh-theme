# dsh-theme

<div align="center">
  <img src="docs/images/banner.svg" alt="dsh-theme banner" width="100%" />
</div>

<p align="center">
  <a href="https://github.com/suzike/dsh-theme/releases"><img src="https://img.shields.io/github/v/release/suzike/dsh-theme?style=flat-square&label=version" alt="version"></a>
  <a href="LICENSE"><img src="https://img.shields.io/badge/license-BSD--3--Clause-blue.svg?style=flat-square" alt="license"></a>
  <a href="https://nodejs.org"><img src="https://img.shields.io/badge/node-%5E22.19%20%7C%7C%20%3E%3D24-green.svg?style=flat-square" alt="node"></a>
</p>

**dsh-theme** 是 [DeepSeek Harness (DSH)](https://github.com/deepseek-ai/DeepSeek-Harness) 的 Web GUI 主题体验插件：基于 **OKLCH 色彩模型**，提供「主题提案」与「主题设计器」两大能力，让用户**一键换肤、自由调色**。作为常驻 Web 插件热插拔安装，**跨重启持久化**。

---

## ✨ 特性

<table>
  <tr>
    <td width="50%">
      <img src="docs/images/proposer.svg" alt="主题提案" width="100%" />
      <p align="center"><b>主题提案</b> · 6 套风格预设 + 智能提案，点卡片即应用</p>
    </td>
    <td width="50%">
      <img src="docs/images/designer.svg" alt="主题设计器" width="100%" />
      <p align="center"><b>主题设计器</b> · 主色 / 副色 / 面板 三通道独立调节</p>
    </td>
  </tr>
</table>

- 🎨 **OKLCH 配色模型** — 色相 / 彩度 / 明度三通道独立可控，直觉且色彩感知均匀
- 🧭 **配色关系** — 邻近 / 互补 / 分裂互补 / 三角色 一键派生副色与面板色
- 🔒 **通道锁定** — 锁定某通道后，随机与配色关系将跳过它
- ⚡ **快速变体** — 柔和 / 鲜明 / 提亮 / 压暗 / 主副互换
- 🤖 **AI 命名** — 用默认模型为配色生成中文主题名 / 标签 / 介绍
- 📋 **JSON 导入导出** — 主题令牌可复制、可分享、可迁移
- 🖥️ **设置面板放大** — 自动把设置弹框加宽到 1120px，显示更完整
- ♻️ **持久化** — 常驻 Web 插件，重启 DeepSeek Harness 后仍然存在

---

## 📐 架构

<div align="center">
  <img src="docs/images/oklch-model.svg" alt="OKLCH 色彩模型" width="80%" />
</div>

每套主题由三个通道的 OKLCH 值定义，映射到 DSH 的完整 `--dsw-alias-*` / `--dsw-specific-*` 设计令牌（约 85 个，明暗两套），实现**全覆盖换肤**——背景层级、文字层级、边框、按钮、交互态、状态色、侧边栏等全部随主题切换。

| 通道 | 含义 | 映射到 |
|---|---|---|
| 主色 `th / c1 / l1` | 品牌强调色 | `brand-primary`、按钮、交互态 |
| 副色 `th2 / c2 / l2` | 次要强调色 | 侧边栏选中态 |
| 面板 `ths / sc / bg` | 背景表面色 | 各级背景层级 |
| 文字 `tx` | 正文墨色 | `label-primary` 等 |
| 侧边栏 `sb` | 左侧栏明度 | `sidebar-fill`（默认与主区一体） |

---

## 📦 安装

> 本插件为「双面」Web 插件：Host 半（AI 命名路由）运行在 DSH 进程，Client 半（主题 UI）加载到浏览器。

### 1. 克隆并构建

```bash
git clone https://github.com/suzike/dsh-theme.git
cd dsh-theme
pnpm install
pnpm build
```

构建产物：`lib/index.js`（Host 半）、`lib/client.js`（浏览器半）。

### 2. 挂载到你的 DSH profile

在 `~/.dsh/profiles/<profile>/package.json` 的 `dependencies` 里加入：

```json
{
  "dependencies": {
    "@linxin666/dsh-theme": "link:../path/to/dsh-theme"
  }
}
```

在 `~/.dsh/profiles/<profile>/cordis.patch.yml` 末尾追加：

```yaml
- insert:
    - id: theme
      name: '@linxin666/dsh-theme'
```

然后：

```bash
cd ~/.dsh/profiles/<profile>
pnpm install
```

### 3. 重启 dsh web

重启 DeepSeek Harness（或 `dsh web` 进程），刷新浏览器即可。

---

## 🚀 使用

1. 打开 **设置 → 通用 → 主题**，点 **「自定义…」**
2. **主题提案** 页签：点任意预设/提案卡片一键应用；「换一批」重新生成；「恢复默认」还原
3. **主题设计器** 页签：切换主色/副色/面板通道，拖色相/彩度/明度滑杆（或点色相色块），实时预览；支持通道锁定、配色关系、快速变体、AI 命名、JSON 导入导出
4. 「应用主题」提交，「恢复默认」还原

---

## 🗂️ 目录结构

```
dsh-theme/
├── src/
│   ├── index.ts              # Host 半：/api/dsh-theme/name AI 命名路由
│   └── client/
│       └── index.ts          # Client 半：主题提案 + 设计器 UI
├── shared/                   # 客户端打包预设（tsdown）
├── cordis.patch.yml          # 插件行注册
├── package.json              # 包声明（dsh.client / dsh.bundle）
├── tsdown.config.ts          # 构建配置
├── docs/images/              # 可视化配图
└── README.md
```

---

## 🔢 版本管理

本项目遵循 [语义化版本 SemVer](https://semver.org/)。每个发布版本打一个 git tag：

```bash
git tag v0.1.0
git push --tags
```

版本历史见 [Releases](https://github.com/suzike/dsh-theme/releases)。

---

## 📄 License

[BSD-3-Clause](LICENSE)
