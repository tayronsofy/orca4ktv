import 'server-only'

/** Deliverability headers for all customer-facing emails (not admin alerts). */
export function customerHeaders(replyTo: string): Record<string, string> {
  return {
    'List-Unsubscribe': `<mailto:${replyTo}>`,
    'List-Unsubscribe-Post': 'List-Unsubscribe=One-Click',
    'X-Entity-Ref-ID': 'orca4ktv-transactional',
  }
}

/** Shared dark-theme email chrome: header gradient + content + footer. */
export function emailLayout(opts: {
  headerTitle: string
  headerSubtitle?: string
  bodyHtml: string
  footerHtml: string
}): string {
  return `
      <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;background:#1f2326;color:#fff;border-radius:16px;overflow:hidden;">
        <div style="background:linear-gradient(135deg,#7c3aed,#3b82f6);padding:32px;text-align:center;">
          <h1 style="margin:0;font-size:24px;font-weight:900;">${opts.headerTitle}</h1>
          ${opts.headerSubtitle ? `<p style="margin:8px 0 0;opacity:.85;">${opts.headerSubtitle}</p>` : ''}
        </div>
        <div style="padding:32px;">
          ${opts.bodyHtml}
        </div>
        <div style="padding:16px 32px;border-top:1px solid #2c3034;text-align:center;color:#6b7280;font-size:12px;">
          ${opts.footerHtml}
        </div>
      </div>
    `
}

export function customerFooter(replyTo: string): string {
  return `&copy; 2026 Orca 4K TV &middot; <a href="https://orca4ktv.com" style="color:#a855f7;">orca4ktv.com</a> &middot; <a href="mailto:${replyTo}" style="color:#6b7280;">Contact support</a>`
}
