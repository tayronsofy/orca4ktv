import 'server-only'
import nodemailer from 'nodemailer'
import type { Transporter } from 'nodemailer'
import { createAdminClient } from '@/lib/supabase/admin'

export interface EmailResult {
  ok: boolean
  id?: string
  error?: string
  skipped?: boolean
}

export interface EmailConfig {
  host: string
  port: number
  secure: boolean
  user: string
  pass: string
  fromName: string
  fromEmail: string
  replyTo: string
  adminEmail: string
}

const CACHE_TTL_MS = 60_000

let cachedConfig: { value: EmailConfig; at: number } | null = null
let cachedTransport: { transporter: Transporter; key: string } | null = null

export function clearEmailConfigCache() {
  cachedConfig = null
  cachedTransport = null
}

/**
 * Resolve SMTP config: smtp_settings row first, env fallback per field.
 * Cached for 60s; /admin/settings saves call clearEmailConfigCache().
 */
export async function getEmailConfig(): Promise<EmailConfig> {
  if (cachedConfig && Date.now() - cachedConfig.at < CACHE_TTL_MS) {
    return cachedConfig.value
  }

  let row: Record<string, unknown> | null = null
  try {
    const supabase = createAdminClient()
    const { data } = await supabase.from('smtp_settings').select('*').eq('id', 1).single()
    row = data
  } catch {
    row = null // table missing / DB down — env fallbacks keep dev flows alive
  }

  const str = (v: unknown) => (typeof v === 'string' && v.trim() ? v.trim() : undefined)

  const config: EmailConfig = {
    host: str(row?.host) ?? process.env.SMTP_HOST ?? 'smtp.hostinger.com',
    port: (typeof row?.port === 'number' ? row.port : undefined) ?? Number(process.env.SMTP_PORT || 465),
    secure:
      (typeof row?.secure === 'boolean' ? row.secure : undefined) ??
      (process.env.SMTP_SECURE ? process.env.SMTP_SECURE !== 'false' : true),
    user: str(row?.smtp_user) ?? process.env.SMTP_USER ?? '',
    pass: str(row?.smtp_pass) ?? process.env.SMTP_PASS ?? '',
    fromName: str(row?.from_name) ?? process.env.EMAIL_FROM_NAME ?? 'Orca 4K TV',
    fromEmail: str(row?.from_email) ?? process.env.EMAIL_FROM ?? 'support@orca4ktv.com',
    replyTo: str(row?.reply_to) ?? process.env.EMAIL_REPLY_TO ?? 'support@orca4ktv.com',
    adminEmail: str(row?.admin_email) ?? process.env.ADMIN_NOTIFICATION_EMAIL ?? '',
  }

  cachedConfig = { value: config, at: Date.now() }
  return config
}

function getTransport(config: EmailConfig): Transporter {
  const key = `${config.host}:${config.port}:${config.secure}:${config.user}`
  if (cachedTransport && cachedTransport.key === key) return cachedTransport.transporter

  const transporter = nodemailer.createTransport({
    host: config.host,
    port: config.port,
    secure: config.secure,
    auth: { user: config.user, pass: config.pass },
  })
  cachedTransport = { transporter, key }
  return transporter
}

export interface SendMailInput {
  to: string
  subject: string
  text: string
  html: string
  replyTo?: string
  headers?: Record<string, string>
}

/**
 * Low-level send. Never throws:
 *  - no credentials configured → logs and returns { ok: true, skipped: true }
 *  - transport error → { ok: false, error }
 */
export async function sendMail(input: SendMailInput): Promise<EmailResult> {
  const config = await getEmailConfig()

  if (!config.host || !config.user || !config.pass) {
    console.log(`[email] skipped (no SMTP credentials configured): "${input.subject}" -> ${input.to}`)
    return { ok: true, skipped: true }
  }

  try {
    const info = await getTransport(config).sendMail({
      from: `"${config.fromName}" <${config.fromEmail}>`,
      to: input.to,
      replyTo: input.replyTo || config.replyTo,
      subject: input.subject,
      text: input.text,
      html: input.html,
      headers: input.headers,
    })
    return { ok: true, id: info.messageId }
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err)
    console.error(`[email] send failed: "${input.subject}" -> ${input.to}: ${message}`)
    return { ok: false, error: message }
  }
}
