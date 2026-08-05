import 'server-only'
import { getEmailConfig, sendMail, type EmailResult } from './transport'
import { customerHeaders, customerFooter, emailLayout } from './render'

export type { EmailResult }

const STREAM_HOST = process.env.IPTV_SERVER_URL || 'http://line.trxdnscloud.ru'

// ─────────────────────────────────────────────────────────────
// Customer: order confirmation
// ─────────────────────────────────────────────────────────────

interface SendOrderConfirmationProps {
  to: string
  customerName: string
  orderNumber: string
  planName: string
  connections: number
  amount: string
}

export async function sendOrderConfirmation(props: SendOrderConfirmationProps): Promise<EmailResult> {
  const { to, customerName, orderNumber, planName, connections, amount } = props
  const config = await getEmailConfig()

  return sendMail({
    to,
    subject: `We received your order - ${orderNumber}`,
    headers: customerHeaders(config.replyTo),
    text: `Hi ${customerName},\n\nWe received your order and are processing it now.\n\nOrder summary:\n- Order #: ${orderNumber}\n- Plan: ${planName}\n- Connections: ${connections}\n- Total: ${amount}\n\nWe will send you payment details within 1 hour.\n\nView your dashboard: https://orca4ktv.com/dashboard\n\n- The Orca 4K TV Team\nhttps://orca4ktv.com`,
    html: emailLayout({
      headerTitle: 'Order Received',
      headerSubtitle: 'Thank you for choosing Orca 4K TV',
      footerHtml: customerFooter(config.replyTo),
      bodyHtml: `
          <p style="color:#d1d5db;">Hi <strong style="color:#fff;">${customerName}</strong>,</p>
          <p style="color:#d1d5db;">We received your order and are currently reviewing it. You will receive your payment details within <strong style="color:#fff;">1 hour</strong>.</p>
          <div style="background:#2c3034;border-radius:12px;padding:20px;margin:24px 0;">
            <p style="margin:0 0 8px;color:#9ca3af;font-size:12px;text-transform:uppercase;letter-spacing:.1em;">Order Summary</p>
            <table style="width:100%;border-collapse:collapse;">
              <tr><td style="color:#9ca3af;padding:6px 0;">Order #</td><td style="color:#fff;text-align:right;">${orderNumber}</td></tr>
              <tr><td style="color:#9ca3af;padding:6px 0;">Plan</td><td style="color:#fff;text-align:right;">${planName}</td></tr>
              <tr><td style="color:#9ca3af;padding:6px 0;">Connections</td><td style="color:#fff;text-align:right;">${connections}</td></tr>
              <tr style="border-top:1px solid #374151;"><td style="color:#fff;font-weight:700;padding:12px 0 6px;">Total</td><td style="color:#a855f7;font-weight:900;font-size:20px;text-align:right;">${amount}</td></tr>
            </table>
          </div>
          <div style="text-align:center;margin-top:32px;">
            <a href="https://orca4ktv.com/dashboard" style="background:linear-gradient(135deg,#7c3aed,#3b82f6);color:#fff;text-decoration:none;padding:14px 32px;border-radius:50px;font-weight:700;display:inline-block;">View My Dashboard</a>
          </div>`,
    }),
  })
}

// ─────────────────────────────────────────────────────────────
// Customer: payment link
// ─────────────────────────────────────────────────────────────

interface SendPaymentLinkProps {
  to: string
  customerName: string
  orderNumber: string
  planName: string
  amount: string
  paymentLink: string
}

export async function sendPaymentLink(props: SendPaymentLinkProps): Promise<EmailResult> {
  const { to, customerName, orderNumber, planName, amount, paymentLink } = props
  const config = await getEmailConfig()

  return sendMail({
    to,
    subject: `Next step for your order - ${orderNumber}`,
    headers: customerHeaders(config.replyTo),
    text: `Hi ${customerName},\n\nYour order ${orderNumber} for ${planName} is ready.\n\nAmount due: ${amount}\n\nComplete your order here: ${paymentLink}\n\nOnce confirmed, your subscription will be activated and we will send your setup details.\n\nQuestions? Reply to this email.\n\n- The Orca 4K TV Team\nhttps://orca4ktv.com`,
    html: emailLayout({
      headerTitle: 'Complete Your Order',
      headerSubtitle: 'One step left to activate your Orca 4K TV plan',
      footerHtml: customerFooter(config.replyTo),
      bodyHtml: `
          <p style="color:#d1d5db;">Hi <strong style="color:#fff;">${customerName}</strong>,</p>
          <p style="color:#d1d5db;">Your order <strong style="color:#fff;">${orderNumber}</strong> for <strong style="color:#fff;">${planName}</strong> is ready to complete.</p>
          <div style="background:#2c3034;border-radius:12px;padding:20px;margin:24px 0;text-align:center;">
            <p style="margin:0 0 4px;color:#9ca3af;font-size:12px;text-transform:uppercase;">Amount Due</p>
            <p style="margin:0;color:#a855f7;font-size:36px;font-weight:900;">${amount}</p>
          </div>
          <p style="color:#d1d5db;">Use the link below to complete your order:</p>
          <div style="text-align:center;margin:32px 0;">
            <a href="${paymentLink}" style="background:#7c3aed;color:#fff;text-decoration:none;padding:16px 40px;border-radius:50px;font-weight:900;font-size:16px;display:inline-block;">Complete Order</a>
          </div>
          <p style="color:#6b7280;font-size:13px;">Once payment is confirmed, your subscription will be activated and setup details sent to this email address.</p>
          <p style="color:#6b7280;font-size:13px;">Have questions? Simply reply to this email and we will help you right away.</p>`,
    }),
  })
}

// ─────────────────────────────────────────────────────────────
// Customer: credentials ready (one box per connection slot)
// ─────────────────────────────────────────────────────────────

interface CredentialSlot {
  slot: number
  username: string
  password: string
  m3uUrl: string
  portalUrl?: string
  hostUrlBackups?: string[]
}

interface SendCredentialsProps {
  to: string
  customerName: string
  planName: string
  endDate: string
  credentials: CredentialSlot[]
}

export async function sendCredentialsReady(props: SendCredentialsProps): Promise<EmailResult> {
  const { to, customerName, planName, endDate, credentials } = props
  const config = await getEmailConfig()

  const normalizeM3u = (url: string) => url.replace(/^https?:\/\/[^/]*/i, STREAM_HOST)

  const total = credentials.length
  const showSlotLabel = total > 1

  const textBlocks = credentials
    .map(c => {
      const heading = showSlotLabel ? `--- Connection ${c.slot} ---\n` : ''
      const m3u = normalizeM3u(c.m3uUrl)
      const lines = [
        `${heading}Username: ${c.username}`,
        `Password: ${c.password}`,
        `M3U URL: ${m3u}`,
      ]
      if (c.portalUrl) lines.push(`Portal URL: ${c.portalUrl}`)
      const backups = (c.hostUrlBackups || []).filter(b => b && b.trim())
      backups.forEach((b, i) => lines.push(`Host URL Backup ${i + 1}: ${b}`))
      return lines.join('\n')
    })
    .join('\n\n')

  const htmlBlocks = credentials
    .map(c => {
      const heading = showSlotLabel
        ? `<p style="margin:0 0 12px;color:#fbbf24;font-size:13px;font-weight:700;text-transform:uppercase;letter-spacing:.1em;">Connection ${c.slot} of ${total}</p>`
        : `<p style="margin:0 0 16px;color:#9ca3af;font-size:12px;text-transform:uppercase;letter-spacing:.1em;">Setup Information</p>`
      const m3u = normalizeM3u(c.m3uUrl)
      const backups = (c.hostUrlBackups || []).filter(b => b && b.trim())
      const backupRows = backups
        .map((b, i) => `<tr><td style="color:#9ca3af;padding:8px 0;vertical-align:top;">Host URL <span style="color:#6b7280;font-size:11px;">(backup ${i + 1})</span></td><td style="color:#60a5fa;font-family:monospace;font-size:12px;text-align:right;word-break:break-all;">${b}</td></tr>`)
        .join('')
      return `
        <div style="background:#2c3034;border-radius:12px;padding:20px;margin:0 0 16px;">
          ${heading}
          <table style="width:100%;border-collapse:collapse;">
            <tr><td style="color:#9ca3af;padding:8px 0;vertical-align:top;">Username</td><td style="color:#a855f7;font-family:monospace;text-align:right;">${c.username}</td></tr>
            <tr><td style="color:#9ca3af;padding:8px 0;vertical-align:top;">Password</td><td style="color:#a855f7;font-family:monospace;text-align:right;">${c.password}</td></tr>
            <tr><td style="color:#9ca3af;padding:8px 0;vertical-align:top;">M3U URL</td><td style="color:#60a5fa;font-family:monospace;font-size:11px;text-align:right;word-break:break-all;">${m3u}</td></tr>
            ${c.portalUrl ? `<tr><td style="color:#9ca3af;padding:8px 0;vertical-align:top;">Portal URL</td><td style="color:#60a5fa;font-family:monospace;font-size:12px;text-align:right;">${c.portalUrl}</td></tr>` : ''}
            ${backupRows}
          </table>
        </div>`
    })
    .join('')

  const introLine = showSlotLabel
    ? `Your subscription is now active. You have ${total} independent connections - each with its own login. Use a different one on each device or share with family.`
    : `Your subscription is now active. Below are your setup details - keep them somewhere safe.`

  return sendMail({
    to,
    subject: `Your Orca 4K TV subscription is now active`,
    headers: customerHeaders(config.replyTo),
    text: `Hi ${customerName},\n\nYour ${planName} subscription is now active until ${endDate}.\n\n${textBlocks}\n\nYou can also find this information anytime in your dashboard:\nhttps://orca4ktv.com/dashboard/subscription\n\nNeed help setting up? Watch our video tutorials:\nhttps://orca4ktv.com/setup-guide\n\nOr reply to this email - we are happy to help.\n\n- The Orca 4K TV Team\nhttps://orca4ktv.com`,
    html: emailLayout({
      headerTitle: 'Your Subscription is Active',
      headerSubtitle: `${planName} - Active until ${endDate}`,
      footerHtml: customerFooter(config.replyTo),
      bodyHtml: `
          <p style="color:#d1d5db;">Hi <strong style="color:#fff;">${customerName}</strong>,</p>
          <p style="color:#d1d5db;">${introLine}</p>
          ${htmlBlocks}
          <p style="color:#d1d5db;font-size:13px;">You can also access these details at any time from your dashboard:</p>
          <div style="text-align:center;margin:24px 0;">
            <a href="https://orca4ktv.com/dashboard/subscription" style="background:linear-gradient(135deg,#7c3aed,#3b82f6);color:#fff;text-decoration:none;padding:14px 32px;border-radius:50px;font-weight:700;display:inline-block;">View My Dashboard</a>
          </div>
          <div style="text-align:center;margin:20px 0 8px;">
            <a href="https://orca4ktv.com/setup-guide" style="background:linear-gradient(135deg,#7c3aed,#3b82f6);color:#fff;text-decoration:none;padding:12px 28px;border-radius:50px;font-weight:700;font-size:13px;display:inline-block;">&#128250; Setup Guide &amp; Video Tutorials</a>
          </div>
          <p style="color:#6b7280;font-size:12px;text-align:center;">Need help setting up? Our guide has video tutorials for every device.</p>`,
    }),
  })
}

// ─────────────────────────────────────────────────────────────
// Customer: trial activation (link only — never raw credentials)
// ─────────────────────────────────────────────────────────────

interface SendTrialCredentialsProps {
  to: string
  name: string
  activation_url: string
  expires_at: string
  duration_hours: number
}

export async function sendTrialCredentials(props: SendTrialCredentialsProps): Promise<EmailResult> {
  const { to, name, activation_url, expires_at, duration_hours } = props
  const config = await getEmailConfig()

  const expiryFormatted = new Date(expires_at).toLocaleDateString('en-US', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit', timeZoneName: 'short',
  })

  return sendMail({
    to,
    subject: `Your Orca 4K TV access details`,
    headers: customerHeaders(config.replyTo),
    text: `Hi ${name},\n\nYour Orca 4K TV access is ready.\n\nThis is a ${duration_hours}-hour trial - expires ${expiryFormatted}.\n\nActivate your access here:\n${activation_url}\n\nAfter activation, your login details will be available on your dashboard at https://orca4ktv.com/dashboard/trial\n\nNeed help getting set up?\nhttps://orca4ktv.com/setup-guide\n\n- The Orca 4K TV Team\nhttps://orca4ktv.com`,
    html: emailLayout({
      headerTitle: 'Your access is ready',
      headerSubtitle: 'Orca 4K TV',
      footerHtml: customerFooter(config.replyTo),
      bodyHtml: `
          <p style="color:#d1d5db;">Hi <strong style="color:#fff;">${name}</strong>,</p>
          <p style="color:#d1d5db;">Your Orca 4K TV access is ready. Click below to activate your account and view your login details on your dashboard.</p>

          <div style="background:#0c2a47;border:1px solid #1e3a5f;border-radius:12px;padding:16px 20px;margin:24px 0;text-align:center;">
            <p style="margin:0 0 4px;color:#93c5fd;font-size:12px;text-transform:uppercase;letter-spacing:.1em;font-weight:700;">${duration_hours}-hour trial</p>
            <p style="margin:0;color:#dbeafe;font-size:15px;font-weight:700;">Expires ${expiryFormatted}</p>
          </div>

          <div style="text-align:center;margin:28px 0 12px;">
            <a href="${activation_url}" style="background:linear-gradient(135deg,#7c3aed,#3b82f6);color:#fff;text-decoration:none;padding:14px 36px;border-radius:50px;font-weight:900;font-size:15px;display:inline-block;">Activate my access</a>
          </div>
          <p style="color:#9ca3af;font-size:13px;text-align:center;margin:0 0 32px;">Your login details will appear on your dashboard right after activation.</p>

          <div style="text-align:center;margin:0 0 8px;">
            <a href="https://orca4ktv.com/setup-guide" style="background:#2c3034;color:#a855f7;text-decoration:none;padding:12px 28px;border-radius:50px;font-weight:700;font-size:13px;display:inline-block;">Setup guide</a>
          </div>
          <p style="color:#6b7280;font-size:12px;text-align:center;margin:8px 0 0;">Step-by-step instructions for every device.</p>`,
    }),
  })
}

// ─────────────────────────────────────────────────────────────
// Admin alerts — go to the configured admin notification email.
// No hardcoded fallback: unset → skipped.
// ─────────────────────────────────────────────────────────────

async function adminRecipient(): Promise<string | null> {
  const config = await getEmailConfig()
  return config.adminEmail || null
}

interface AdminNewOrderAlertProps {
  customerEmail: string
  customerName: string
  orderNumber: string
  planName: string
  connections: number
  amount: string
  orderId: string
  renewal?: { username?: string | null; playlistUrl?: string | null; slot?: number | null }
}

export async function sendAdminNewOrderAlert(props: AdminNewOrderAlertProps): Promise<EmailResult> {
  const { customerEmail, customerName, orderNumber, planName, connections, amount, orderId, renewal } = props
  const adminEmail = await adminRecipient()
  if (!adminEmail) {
    console.log('[email] admin order alert skipped: no admin notification email configured')
    return { ok: true, skipped: true }
  }

  const renewalText = renewal
    ? `\n\n--- Playlist Renewal ---\nUsername: ${renewal.username || '?'}\nSlot: ${renewal.slot ?? '?'}${renewal.playlistUrl ? `\nPlaylist URL: ${renewal.playlistUrl}` : ''}`
    : ''

  const renewalHtml = renewal
    ? `
          <div style="background:#2c3034;border:1px solid #a855f7;border-radius:12px;padding:20px;margin-bottom:24px;">
            <p style="margin:0 0 12px;color:#a855f7;font-size:11px;text-transform:uppercase;letter-spacing:.1em;font-weight:700;">&#128257; Playlist Renewal</p>
            <table style="width:100%;border-collapse:collapse;">
              <tr><td style="color:#9ca3af;padding:6px 0;">Username</td><td style="color:#fff;text-align:right;font-weight:700;font-family:monospace;">${renewal.username || '?'}</td></tr>
              <tr><td style="color:#9ca3af;padding:6px 0;">Slot</td><td style="color:#fff;text-align:right;">${renewal.slot ?? '?'}</td></tr>
              ${renewal.playlistUrl ? `<tr><td style="color:#9ca3af;padding:6px 0;">Playlist URL</td><td style="color:#60a5fa;text-align:right;word-break:break-all;font-size:12px;">${renewal.playlistUrl}</td></tr>` : ''}
            </table>
          </div>`
    : ''

  return sendMail({
    to: adminEmail,
    subject: `${renewal ? 'Playlist renewal' : 'New order'} received: ${orderNumber}`,
    text: `${renewal ? 'Playlist renewal' : 'New order'} received\n\nOrder: ${orderNumber}\nCustomer: ${customerName} (${customerEmail})\nPlan: ${planName}\nConnections: ${connections}\nTotal: $${amount}${renewalText}\n\nManage: https://orca4ktv.com/admin/orders/${orderId}`,
    html: emailLayout({
      headerTitle: renewal ? 'Playlist Renewal Request' : 'New Order Received',
      headerSubtitle: orderNumber,
      footerHtml: `Orca 4K TV Admin Alert &middot; <a href="https://orca4ktv.com/admin/orders" style="color:#a855f7;">View all orders</a>`,
      bodyHtml: `
          ${renewalHtml}
          <div style="background:#2c3034;border-radius:12px;padding:20px;margin-bottom:24px;">
            <p style="margin:0 0 12px;color:#9ca3af;font-size:11px;text-transform:uppercase;letter-spacing:.1em;">Customer</p>
            <p style="margin:0 0 4px;color:#fff;font-size:16px;font-weight:700;">${customerName}</p>
            <p style="margin:0;color:#a855f7;">${customerEmail}</p>
          </div>
          <div style="background:#2c3034;border-radius:12px;padding:20px;margin-bottom:24px;">
            <p style="margin:0 0 12px;color:#9ca3af;font-size:11px;text-transform:uppercase;letter-spacing:.1em;">Order Details</p>
            <table style="width:100%;border-collapse:collapse;">
              <tr><td style="color:#9ca3af;padding:6px 0;">Plan</td><td style="color:#fff;text-align:right;font-weight:700;">${planName}</td></tr>
              <tr><td style="color:#9ca3af;padding:6px 0;">Connections</td><td style="color:#fff;text-align:right;">${connections}</td></tr>
              <tr style="border-top:1px solid #374151;"><td style="color:#fff;font-weight:700;padding:10px 0 4px;">Total</td><td style="color:#a855f7;font-weight:900;font-size:22px;text-align:right;">$${amount}</td></tr>
            </table>
          </div>
          <div style="text-align:center;">
            <a href="https://orca4ktv.com/admin/orders/${orderId}" style="background:linear-gradient(135deg,#7c3aed,#3b82f6);color:#fff;text-decoration:none;padding:14px 32px;border-radius:50px;font-weight:700;display:inline-block;font-size:15px;">Manage Order</a>
          </div>`,
    }),
  })
}

interface AdminNewTrialAlertProps {
  name: string
  email: string
  device: string
  country: string
  trialId: string
}

export async function sendAdminNewTrialAlert(props: AdminNewTrialAlertProps): Promise<EmailResult> {
  const { name, email, device, country } = props
  const adminEmail = await adminRecipient()
  if (!adminEmail) {
    console.log('[email] admin trial alert skipped: no admin notification email configured')
    return { ok: true, skipped: true }
  }

  return sendMail({
    to: adminEmail,
    subject: `New Trial Request - ${name}`,
    text: `New trial request received\n\nName: ${name}\nEmail: ${email}\nDevice: ${device}\nCountry: ${country}\n\nReview: https://orca4ktv.com/admin/trials`,
    html: emailLayout({
      headerTitle: 'New Trial Request',
      headerSubtitle: name,
      footerHtml: `Orca 4K TV Admin Alert &middot; <a href="https://orca4ktv.com/admin/trials" style="color:#a855f7;">View all trials</a>`,
      bodyHtml: `
          <div style="background:#2c3034;border-radius:12px;padding:20px;margin-bottom:24px;">
            <table style="width:100%;border-collapse:collapse;">
              <tr><td style="color:#9ca3af;padding:6px 0;">Name</td><td style="color:#fff;text-align:right;font-weight:700;">${name}</td></tr>
              <tr><td style="color:#9ca3af;padding:6px 0;">Email</td><td style="color:#a855f7;text-align:right;">${email}</td></tr>
              <tr><td style="color:#9ca3af;padding:6px 0;">Device</td><td style="color:#fff;text-align:right;">${device}</td></tr>
              <tr><td style="color:#9ca3af;padding:6px 0;">Country</td><td style="color:#fff;text-align:right;">${country}</td></tr>
            </table>
          </div>
          <div style="text-align:center;">
            <a href="https://orca4ktv.com/admin/trials" style="background:linear-gradient(135deg,#7c3aed,#3b82f6);color:#fff;text-decoration:none;padding:14px 32px;border-radius:50px;font-weight:700;display:inline-block;font-size:15px;">Review in Admin</a>
          </div>`,
    }),
  })
}

interface AdminNewContactAlertProps {
  name: string
  email: string
  subject: string
  message: string
}

export async function sendAdminNewContactAlert(props: AdminNewContactAlertProps): Promise<EmailResult> {
  const { name, email, subject, message } = props
  const adminEmail = await adminRecipient()
  if (!adminEmail) {
    console.log('[email] admin contact alert skipped: no admin notification email configured')
    return { ok: true, skipped: true }
  }

  return sendMail({
    to: adminEmail,
    replyTo: email, // reply goes straight to the customer
    subject: `New Contact Inquiry: ${subject}`,
    text: `New contact inquiry received\n\nName: ${name}\nEmail: ${email}\nSubject: ${subject}\n\nMessage:\n${message}`,
    html: emailLayout({
      headerTitle: 'New Contact Inquiry',
      headerSubtitle: `from ${name}`,
      footerHtml: `Orca 4K TV Support &middot; Reply directly to this email to contact the customer.`,
      bodyHtml: `
          <div style="background:#2c3034;border-radius:12px;padding:20px;margin-bottom:24px;">
            <table style="width:100%;border-collapse:collapse;">
              <tr><td style="color:#9ca3af;padding:6px 0;width:80px;">Name</td><td style="color:#fff;font-weight:700;">${name}</td></tr>
              <tr><td style="color:#9ca3af;padding:6px 0;width:80px;">Email</td><td style="color:#a855f7;">${email}</td></tr>
              <tr><td style="color:#9ca3af;padding:6px 0;width:80px;">Subject</td><td style="color:#fff;">${subject}</td></tr>
            </table>
          </div>
          <div style="background:#2c3034;border-radius:12px;padding:20px;">
            <p style="margin:0 0 8px;color:#9ca3af;font-size:11px;text-transform:uppercase;letter-spacing:.1em;">Message</p>
            <p style="margin:0;white-space:pre-wrap;color:#fff;line-height:1.6;">${message}</p>
          </div>`,
    }),
  })
}

// ─────────────────────────────────────────────────────────────
// Settings page: test email
// ─────────────────────────────────────────────────────────────

export async function sendTestEmail(to: string): Promise<EmailResult> {
  const config = await getEmailConfig()
  return sendMail({
    to,
    subject: 'Orca 4K TV - SMTP test email',
    text: `This is a test email from the Orca 4K TV admin panel.\n\nSMTP host: ${config.host}:${config.port} (secure: ${config.secure})\nFrom: ${config.fromName} <${config.fromEmail}>\n\nIf you received this, your SMTP settings are working.`,
    html: emailLayout({
      headerTitle: 'SMTP Test Successful',
      headerSubtitle: 'Orca 4K TV admin panel',
      footerHtml: customerFooter(config.replyTo),
      bodyHtml: `
          <p style="color:#d1d5db;">This is a test email from the Orca 4K TV admin panel.</p>
          <div style="background:#2c3034;border-radius:12px;padding:20px;margin:24px 0;">
            <table style="width:100%;border-collapse:collapse;">
              <tr><td style="color:#9ca3af;padding:6px 0;">SMTP host</td><td style="color:#fff;text-align:right;font-family:monospace;">${config.host}:${config.port}</td></tr>
              <tr><td style="color:#9ca3af;padding:6px 0;">Secure (SSL)</td><td style="color:#fff;text-align:right;">${config.secure ? 'yes' : 'no'}</td></tr>
              <tr><td style="color:#9ca3af;padding:6px 0;">From</td><td style="color:#fff;text-align:right;">${config.fromName} &lt;${config.fromEmail}&gt;</td></tr>
            </table>
          </div>
          <p style="color:#6b7280;font-size:13px;">If you received this, your SMTP settings are working.</p>`,
    }),
  })
}
