import { XMLParser } from 'fast-xml-parser'

export interface XmlTvProgramme {
  channel: string
  start: string
  stop?: string
  title?: string
  desc?: string
}

export interface XmlTvSummary {
  channelCount: number
  programmeCount: number
  earliestStart?: string
  latestStop?: string
  sampleChannels: string[]
  samplePrograms: XmlTvProgramme[]
}

const parser = new XMLParser({
  ignoreAttributes: false,
  attributeNamePrefix: '@_',
  allowBooleanAttributes: true,
  parseAttributeValue: false,
  trimValues: true,
})

// XMLTV timestamps look like "20260507120000 +0000". Convert to ISO so we can compare.
function xmltvToIso(ts: string | undefined): string | undefined {
  if (!ts) return undefined
  const m = ts.match(/^(\d{4})(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})\s*([+-]\d{4})?$/)
  if (!m) return undefined
  const [, y, mo, d, h, mi, s, tz] = m
  const tzStr = tz ? `${tz.slice(0, 3)}:${tz.slice(3)}` : 'Z'
  return `${y}-${mo}-${d}T${h}:${mi}:${s}${tzStr}`
}

function arrayify<T>(v: T | T[] | undefined): T[] {
  if (v === undefined) return []
  return Array.isArray(v) ? v : [v]
}

function pickText(node: unknown): string | undefined {
  if (!node) return undefined
  if (typeof node === 'string') return node
  if (typeof node === 'object' && node !== null && '#text' in node) {
    const t = (node as Record<string, unknown>)['#text']
    if (typeof t === 'string') return t
  }
  return undefined
}

export interface XmlTvParseInput {
  xml: string
  maxSamplePrograms?: number
}

export function parseXmlTv({ xml, maxSamplePrograms = 10 }: XmlTvParseInput): XmlTvSummary {
  const root = parser.parse(xml)
  const tv = root?.tv
  if (!tv) {
    throw new Error('Not a valid XMLTV file (no <tv> root element).')
  }

  const channels = arrayify<Record<string, unknown>>(tv.channel)
  const programmes = arrayify<Record<string, unknown>>(tv.programme)

  const sampleChannels: string[] = channels.slice(0, 10).map((c) => {
    const id = (c as Record<string, string>)['@_id'] ?? ''
    const display = pickText((c as { 'display-name'?: unknown })['display-name'])
    return display ? `${display}${id ? ` (${id})` : ''}` : id || 'Unnamed channel'
  })

  let earliest: string | undefined
  let latest: string | undefined
  const samplePrograms: XmlTvProgramme[] = []

  for (const p of programmes) {
    const start = (p as Record<string, string>)['@_start']
    const stop = (p as Record<string, string>)['@_stop']
    const startIso = xmltvToIso(start)
    const stopIso = xmltvToIso(stop)

    if (startIso) {
      if (!earliest || startIso < earliest) earliest = startIso
    }
    if (stopIso) {
      if (!latest || stopIso > latest) latest = stopIso
    }

    if (samplePrograms.length < maxSamplePrograms) {
      samplePrograms.push({
        channel: (p as Record<string, string>)['@_channel'] ?? '',
        start: startIso ?? start ?? '',
        stop: stopIso,
        title: pickText((p as { title?: unknown }).title),
        desc: pickText((p as { desc?: unknown }).desc),
      })
    }
  }

  return {
    channelCount: channels.length,
    programmeCount: programmes.length,
    earliestStart: earliest,
    latestStop: latest,
    sampleChannels,
    samplePrograms,
  }
}
