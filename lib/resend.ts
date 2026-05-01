import { Resend } from 'resend'

function getResend() {
  return new Resend(process.env.RESEND_API_KEY || 'placeholder')
}

// "Orca 4K TV" — no "IPTV" in sender name (spam trigger)
const FROM = process.env.RESEND_FROM_EMAIL || 'Orca 4K TV <hello@orca4ktv.com>'
const REPLY_TO = process.env.RESEND_REPLY_TO || 'support@orca4ktv.com'

// Shared headers for all customer-facing emails
const CUSTOMER_HEADERS = {
  'List-Unsubscribe': `<mailto:${REPLY_TO}>`,
  'List-Unsubscribe-Post': 'List-Unsubscribe=One-Click',
  'X-Entity-Ref-ID': 'orca4ktv-transactional',
}

export type EmailType = 'order-confirmation' | 'payment-link' | 'credentials-ready'

interface SendOrderConfirmationProps {
  to: string
  customerName: string
  orderNumber: string
  planName: string
  connections: number
  amount: string
}

interface SendPaymentLinkProps {
  to: string
  customerName: string
  orderNumber: string
  planName: string
  amount: string
  paymentLink: string
}

interface CredentialSlot {
  slot: number
  username: string
  password: string
  m3uUrl: string
  portalUrl?: string
}

interface SendCredentialsProps {
  to: string
  customerName: string
  planName: string
  endDate: string
  credentials: CredentialSlot[]
}

interface AdminNewOrderAlertProps {
  customerEmail: string
  customerName: string
  orderNumber: string
  planName: string
  connections: number
  amount: string
  orderId: string
}

export async function sendAdminNewOrderAlert(props: AdminNewOrderAlertProps) {
  const { customerEmail, customerName, orderNumber, planName, connections, amount, orderId } = props
  const adminEmail = process.env.ADMIN_NOTIFICATION_EMAIL || 'tayron.sof@gmail.com'
  return getResend().emails.send({
    from: FROM,
    to: adminEmail,
    replyTo: REPLY_TO,
    subject: `New order received: ${orderNumber}`,
    text: `New order received\n\nOrder: ${orderNumber}\nCustomer: ${customerName} (${customerEmail})\nPlan: ${planName}\nConnections: ${connections}\nTotal: $${amount}\n\nManage: https://orca4ktv.com/admin/orders/${orderId}`,
    html: `
      <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;background:#1f2326;color:#fff;border-radius:16px;overflow:hidden;">
        <div style="background:linear-gradient(135deg,#7c3aed,#3b82f6);padding:24px 32px;">
          <h1 style="margin:0;font-size:22px;font-weight:900;">New Order Received</h1>
          <p style="margin:6px 0 0;opacity:.85;font-size:14px;">${orderNumber}</p>
        </div>
        <div style="padding:32px;">
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
          </div>
        </div>
        <div style="padding:16px 32px;border-top:1px solid #2c3034;text-align:center;color:#6b7280;font-size:12px;">
          Orca 4K TV Admin Alert &middot; <a href="https://orca4ktv.com/admin/orders" style="color:#a855f7;">View all orders</a>
        </div>
      </div>
    `,
  })
}

export async function sendOrderConfirmation(props: SendOrderConfirmationProps) {
  const { to, customerName, orderNumber, planName, connections, amount } = props
  return getResend().emails.send({
    from: FROM,
    to,
    replyTo: REPLY_TO,
    // Clean subject — no "IPTV", no exclamation spam
    subject: `We received your order — ${orderNumber}`,
    headers: CUSTOMER_HEADERS,
    // Plain text version (critical for inbox delivery)
    text: `Hi ${customerName},\n\nWe received your order and are processing it now.\n\nOrder summary:\n- Order #: ${orderNumber}\n- Plan: ${planName}\n- Connections: ${connections}\n- Total: ${amount}\n\nWe will send you payment details within 1 hour.\n\nView your dashboard: https://orca4ktv.com/dashboard\n\n— The Orca 4K TV Team\nhttps://orca4ktv.com`,
    html: `
      <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;background:#1f2326;color:#fff;border-radius:16px;overflow:hidden;">
        <div style="background:linear-gradient(135deg,#7c3aed,#3b82f6);padding:32px;text-align:center;">
          <h1 style="margin:0;font-size:24px;font-weight:900;">Order Received</h1>
          <p style="margin:8px 0 0;opacity:.85;">Thank you for choosing Orca 4K TV</p>
        </div>
        <div style="padding:32px;">
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
          </div>
        </div>
        <div style="padding:16px 32px;border-top:1px solid #2c3034;text-align:center;color:#6b7280;font-size:12px;">
          &copy; 2026 Orca 4K TV &middot; <a href="https://orca4ktv.com" style="color:#a855f7;">orca4ktv.com</a> &middot; <a href="mailto:${REPLY_TO}" style="color:#6b7280;">Contact support</a>
        </div>
      </div>
    `,
  })
}

export async function sendPaymentLink(props: SendPaymentLinkProps) {
  const { to, customerName, orderNumber, planName, amount, paymentLink } = props
  return getResend().emails.send({
    from: FROM,
    to,
    replyTo: REPLY_TO,
    // No "Pay Now" in subject — reads like a scam email
    subject: `Next step for your order — ${orderNumber}`,
    headers: CUSTOMER_HEADERS,
    text: `Hi ${customerName},\n\nYour order ${orderNumber} for ${planName} is ready.\n\nAmount due: ${amount}\n\nComplete your order here: ${paymentLink}\n\nOnce confirmed, your subscription will be activated and we will send your setup details.\n\nQuestions? Reply to this email.\n\n— The Orca 4K TV Team\nhttps://orca4ktv.com`,
    html: `
      <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;background:#1f2326;color:#fff;border-radius:16px;overflow:hidden;">
        <div style="background:linear-gradient(135deg,#7c3aed,#3b82f6);padding:32px;text-align:center;">
          <h1 style="margin:0;font-size:24px;font-weight:900;">Complete Your Order</h1>
          <p style="margin:8px 0 0;opacity:.85;">One step left to activate your Orca 4K TV plan</p>
        </div>
        <div style="padding:32px;">
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
          <p style="color:#6b7280;font-size:13px;">Have questions? Simply reply to this email and we will help you right away.</p>
        </div>
        <div style="padding:16px 32px;border-top:1px solid #2c3034;text-align:center;color:#6b7280;font-size:12px;">
          &copy; 2026 Orca 4K TV &middot; <a href="https://orca4ktv.com" style="color:#a855f7;">orca4ktv.com</a> &middot; <a href="mailto:${REPLY_TO}" style="color:#6b7280;">Contact support</a>
        </div>
      </div>
    `,
  })
}

export async function sendCredentialsReady(props: SendCredentialsProps) {
  const { to, customerName, planName, endDate, credentials } = props

  const normalizeM3u = (url: string) =>
    url.replace(/^https?:\/\/[^/]*/i, 'http://line.trxdnscloud.ru')

  const total = credentials.length
  const showSlotLabel = total > 1

  const textBlocks = credentials
    .map(c => {
      const heading = showSlotLabel ? `--- Connection ${c.slot} ---\n` : ''
      const m3u = normalizeM3u(c.m3uUrl)
      return `${heading}Username: ${c.username}\nPassword: ${c.password}\nM3U URL: ${m3u}${c.portalUrl ? `\nPortal URL: ${c.portalUrl}` : ''}`
    })
    .join('\n\n')

  const htmlBlocks = credentials
    .map(c => {
      const heading = showSlotLabel
        ? `<p style="margin:0 0 12px;color:#fbbf24;font-size:13px;font-weight:700;text-transform:uppercase;letter-spacing:.1em;">Connection ${c.slot} of ${total}</p>`
        : `<p style="margin:0 0 16px;color:#9ca3af;font-size:12px;text-transform:uppercase;letter-spacing:.1em;">Setup Information</p>`
      const m3u = normalizeM3u(c.m3uUrl)
      return `
        <div style="background:#2c3034;border-radius:12px;padding:20px;margin:0 0 16px;">
          ${heading}
          <table style="width:100%;border-collapse:collapse;">
            <tr><td style="color:#9ca3af;padding:8px 0;vertical-align:top;">Username</td><td style="color:#a855f7;font-family:monospace;text-align:right;">${c.username}</td></tr>
            <tr><td style="color:#9ca3af;padding:8px 0;vertical-align:top;">Password</td><td style="color:#a855f7;font-family:monospace;text-align:right;">${c.password}</td></tr>
            <tr><td style="color:#9ca3af;padding:8px 0;vertical-align:top;">M3U URL</td><td style="color:#60a5fa;font-family:monospace;font-size:11px;text-align:right;word-break:break-all;">${m3u}</td></tr>
            ${c.portalUrl ? `<tr><td style="color:#9ca3af;padding:8px 0;vertical-align:top;">Portal URL</td><td style="color:#60a5fa;font-family:monospace;font-size:12px;text-align:right;">${c.portalUrl}</td></tr>` : ''}
          </table>
        </div>`
    })
    .join('')

  const introLine = showSlotLabel
    ? `Your subscription is now active. You have ${total} independent connections — each with its own login. Use a different one on each device or share with family.`
    : `Your subscription is now active. Below are your setup details — keep them somewhere safe.`

  return getResend().emails.send({
    from: FROM,
    to,
    replyTo: REPLY_TO,
    subject: `Your Orca 4K TV subscription is now active`,
    headers: CUSTOMER_HEADERS,
    text: `Hi ${customerName},\n\nYour ${planName} subscription is now active until ${endDate}.\n\n${textBlocks}\n\nYou can also find this information anytime in your dashboard:\nhttps://orca4ktv.com/dashboard/subscription\n\nNeed help setting up? Watch our video tutorials:\nhttps://orca4ktv.com/setup-guide\n\nOr reply to this email — we are happy to help.\n\n— The Orca 4K TV Team\nhttps://orca4ktv.com`,
    html: `
      <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;background:#1f2326;color:#fff;border-radius:16px;overflow:hidden;">
        <div style="background:linear-gradient(135deg,#7c3aed,#3b82f6);padding:32px;text-align:center;">
          <h1 style="margin:0;font-size:24px;font-weight:900;">Your Subscription is Active</h1>
          <p style="margin:8px 0 0;opacity:.85;">${planName} — Active until ${endDate}</p>
        </div>
        <div style="padding:32px;">
          <p style="color:#d1d5db;">Hi <strong style="color:#fff;">${customerName}</strong>,</p>
          <p style="color:#d1d5db;">${introLine}</p>
          ${htmlBlocks}
          <p style="color:#d1d5db;font-size:13px;">You can also access these details at any time from your dashboard:</p>
          <div style="text-align:center;margin:24px 0;">
            <a href="https://orca4ktv.com/dashboard/subscription" style="background:linear-gradient(135deg,#7c3aed,#3b82f6);color:#fff;text-decoration:none;padding:14px 32px;border-radius:50px;font-weight:700;display:inline-block;">View My Dashboard</a>
          </div>
          <div style="text-align:center;margin:20px 0 8px;">
            <a href="https://orca4ktv.com/setup-guide" style="background:linear-gradient(135deg,#7c3aed,#3b82f6);color:#fff;text-decoration:none;padding:12px 28px;border-radius:50px;font-weight:700;font-size:13px;display:inline-block;">📺 Setup Guide &amp; Video Tutorials</a>
          </div>
          <p style="color:#6b7280;font-size:12px;text-align:center;">Need help setting up? Our guide has video tutorials for every device.</p>
        </div>
        <div style="padding:16px 32px;border-top:1px solid #2c3034;text-align:center;color:#6b7280;font-size:12px;">
          &copy; 2026 Orca 4K TV &middot; <a href="https://orca4ktv.com" style="color:#a855f7;">orca4ktv.com</a> &middot; <a href="mailto:${REPLY_TO}" style="color:#6b7280;">Contact support</a>
        </div>
      </div>
    `,
  })
}

interface SendTrialCredentialsProps {
  to: string
  name: string
  activation_url: string
  expires_at: string
  duration_hours: number
}

export async function sendTrialCredentials(props: SendTrialCredentialsProps) {
  const { to, name, activation_url, expires_at, duration_hours } = props

  const expiryFormatted = new Date(expires_at).toLocaleDateString('en-US', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit', timeZoneName: 'short',
  })

  return getResend().emails.send({
    from: FROM,
    to,
    replyTo: REPLY_TO,
    subject: `Your Orca 4K TV access details`,
    headers: CUSTOMER_HEADERS,
    text: `Hi ${name},\n\nYour Orca 4K TV access is ready.\n\nThis is a ${duration_hours}-hour trial — expires ${expiryFormatted}.\n\nActivate your access here:\n${activation_url}\n\nAfter activation, your login details will be available on your dashboard at https://orca4ktv.com/dashboard/trial\n\nNeed help getting set up?\nhttps://orca4ktv.com/setup-guide\n\n— The Orca 4K TV Team\nhttps://orca4ktv.com`,
    html: `
      <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;background:#1f2326;color:#fff;border-radius:16px;overflow:hidden;">
        <div style="background:linear-gradient(135deg,#7c3aed,#3b82f6);padding:32px;text-align:center;">
          <h1 style="margin:0;font-size:24px;font-weight:900;">Your access is ready</h1>
          <p style="margin:8px 0 0;opacity:.85;">Orca 4K TV</p>
        </div>
        <div style="padding:32px;">
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
          <p style="color:#6b7280;font-size:12px;text-align:center;margin:8px 0 0;">Step-by-step instructions for every device.</p>
        </div>
        <div style="padding:16px 32px;border-top:1px solid #2c3034;text-align:center;color:#6b7280;font-size:12px;">
          &copy; 2026 Orca 4K TV &middot; <a href="https://orca4ktv.com" style="color:#a855f7;">orca4ktv.com</a> &middot; <a href="mailto:${REPLY_TO}" style="color:#6b7280;">Contact support</a>
        </div>
      </div>
    `,
  })
}

interface AdminNewTrialAlertProps {
  name: string
  email: string
  device: string
  country: string
  trialId: string
}

export async function sendAdminNewTrialAlert(props: AdminNewTrialAlertProps) {
  const { name, email, device, country } = props
  const adminEmail = process.env.ADMIN_NOTIFICATION_EMAIL || 'tayron.sof@gmail.com'
  return getResend().emails.send({
    from: FROM,
    to: adminEmail,
    replyTo: REPLY_TO,
    subject: `New Trial Request — ${name}`,
    text: `New trial request received\n\nName: ${name}\nEmail: ${email}\nDevice: ${device}\nCountry: ${country}\n\nReview: https://orca4ktv.com/admin/trials`,
    html: `
      <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;background:#1f2326;color:#fff;border-radius:16px;overflow:hidden;">
        <div style="background:linear-gradient(135deg,#7c3aed,#3b82f6);padding:24px 32px;">
          <h1 style="margin:0;font-size:22px;font-weight:900;">New Trial Request</h1>
          <p style="margin:6px 0 0;opacity:.85;font-size:14px;">${name}</p>
        </div>
        <div style="padding:32px;">
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
          </div>
        </div>
        <div style="padding:16px 32px;border-top:1px solid #2c3034;text-align:center;color:#6b7280;font-size:12px;">
          Orca 4K TV Admin Alert &middot; <a href="https://orca4ktv.com/admin/trials" style="color:#a855f7;">View all trials</a>
        </div>
      </div>
    `,
  })
}
