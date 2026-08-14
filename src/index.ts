// @ts-nocheck
/**
 * freestyle-dsh-theme — host half. Registers the /api/freestyle-dsh-theme/name route that names a
 * theme through the default model (llm.stream). The browser half (./client)
 * renders the theme proposer + designer in the settings panel.
 */
import type { Context } from '@deepseek-ai/cordis'

export const name = 'freestyle-dsh-theme'
export const inject = ['webServer']

const NAME_SYSTEM_PROMPT = '你是品牌色彩与界面主题命名专家。分析给定的 OKLCH 主题令牌，为它生成独特、具体且有画面感的中文主题身份。只输出 JSON：{"name":"2到8个汉字的主题名","tags":["3到5个简短特征标签"],"desc":"20到50字的主题特征介绍"}。名称不能使用"我的主题""自定义主题"等泛称；标签应覆盖色彩、明暗、材质和氛围，不要重复名称；介绍应说明主副色关系与适用感受。'

function writeJson(res, status, body) {
  const payload = JSON.stringify(body)
  res.writeHead(status, { 'content-type': 'application/json; charset=utf-8', 'referrer-policy': 'no-referrer' })
  res.end(payload)
}

async function readJsonBody(req) {
  const chunks = []
  let size = 0
  for await (const chunk of req) {
    const buffer = chunk
    size += buffer.length
    if (size > 65536) return undefined
    chunks.push(buffer)
  }
  try {
    const parsed = JSON.parse(Buffer.concat(chunks).toString('utf8'))
    return typeof parsed === 'object' && parsed !== null ? parsed : undefined
  } catch {
    return undefined
  }
}

function makeNameRoute(ctx) {
  return {
    kind: 'exact',
    path: '/api/freestyle-dsh-theme/name',
    handler: async (req, res) => {
      if (req.method !== 'POST') {
        writeJson(res, 405, { error: 'method not allowed' })
        return
      }
      const body = await readJsonBody(req)
      const llm = ctx.get('llm')
      const agentDefaultModel = ctx.get('agentDefaultModel')
      if (llm === undefined || agentDefaultModel === undefined) {
        writeJson(res, 200, { ok: false, error: '当前运行环境没有可用的 LLM 服务' })
        return
      }
      let sel
      try { sel = agentDefaultModel.currentSelection() } catch { sel = undefined }
      if (!sel || !sel.provider || !sel.model) {
        writeJson(res, 200, { ok: false, error: '尚未配置默认模型' })
        return
      }
      const options = {
        provider: sel.provider,
        model: sel.model,
        reasoningEffort: sel.reasoningEffort,
        system: NAME_SYSTEM_PROMPT,
        messages: [{ role: 'user', content: [{ type: 'text', text: JSON.stringify(body ?? {}) }] }],
        temperature: 0.8,
        maxTokens: 256,
      }
      let text = ''
      try {
        for await (const chunk of llm.stream(options)) {
          if (chunk && chunk.type === 'text-delta') text += chunk.text
          else if (chunk && chunk.type === 'finish') {
            const kind = chunk.reason && chunk.reason.kind
            if (kind === 'error' || kind === 'aborted') {
              const f = chunk.reason && chunk.reason.failure
              writeJson(res, 200, { ok: false, error: (f && f.message) ? f.message : String(kind) })
              return
            }
          }
        }
      } catch (e) {
        writeJson(res, 200, { ok: false, error: (e && e.message) ? e.message : String(e) })
        return
      }
      writeJson(res, 200, { ok: true, text })
    },
  }
}

export function apply(ctx: Context): void {
  ctx.effect(() => ctx.webServer.register(makeNameRoute(ctx)), 'freestyle-dsh-theme: name route')
}
