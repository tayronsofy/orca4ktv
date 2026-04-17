import { Resend } from 'resend'

function getResend() {
  return new Resend(process.env.RESEND_API_KEY || 'placeholder')
}

const FROM = process.env.RESEND_FROM_EMAIL || 'SMART 4K IPTV <noreply@smart4k.io>'

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

interface SendCredentialsProps {
  to: string
  customerName: string
  planName: string
  endDate: string
  username: string
  password: string
  m3uUrl: string
  portalUrl?: string
}

export async function sendOrderConfirmation(props: SendOrderConfirmationProps) {
  const { to, customerName, orderNumber, planName, connections, amount } = props
  return getResend().emails.send({
    from: FROM,
    to,
    subject: `Order Confirmed — ${orderNumber} | SMART 4K IPTV`,
    html: `
      <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;background:#1f2326;color:#fff;border-radius:16px;overflow:hidden;">
        <div style="background:linear-gradient(135deg,#7c3aed,#3b82f6);padding:32px;text-align:center;">
          <h1 style="margin:0;font-size:24px;font-weight:900;">Order Confirmed!</h1>
          <p style="margin:8px 0 0;opacity:.85;">Thank you for choosing SMART 4K IPTV</p>
        </div>
        <div style="padding:32px;">
          <p style="color:#d1d5db;">Hi <strong style="color:#fff;">${customerName}</strong>,</p>
          <p style="color:#d1d5db;">Your order has been placed successfully. We'll send you the payment details shortly.</p>
          <div style="background:#2c3034;border-radius:12px;padding:20px;margin:24px 0;">
            <p style="margin:0 0 8px;color:#9ca3af;font-size:12px;text-transform:uppercase;letter-spacing:.1em;">Order Summary</p>
            <table style="width:100%;border-collapse:collapse;">
              <tr><td style="color:#9ca3af;padding:6px 0;">Order #</td><td style="color:#fff;text-align:right;">${orderNumber}</td></tr>
              <tr><td style="color:#9ca3af;padding:6px 0;">Plan</td><td style="color:#fff;text-align:right;">${planName}</td></tr>
              <tr><td style="color:#9ca3af;padding:6px 0;">Connections</td><td style="color:#fff;text-align:right;">${connections}</td></tr>
              <tr style="border-top:1px solid #374151;"><td style="color:#fff;font-weight:700;padding:12px 0 6px;">Total</td><td style="color:#a855f7;font-weight:900;font-size:20px;text-align:right;">${amount}</td></tr>
            </table>
          </div>
          <p style="color:#d1d5db;">We will contact you within <strong style="color:#fff;">24 hours</strong> with your payment instructions.</p>
          <div style="text-align:center;margin-top:32px;">
            <a href="https://smart4k.io/dashboard" style="background:linear-gradient(135deg,#7c3aed,#3b82f6);color:#fff;text-decoration:none;padding:14px 32px;border-radius:50px;font-weight:700;display:inline-block;">View My Dashboard</a>
          </div>
        </div>
        <div style="padding:16px 32px;border-top:1px solid #2c3034;text-align:center;color:#6b7280;font-size:12px;">
          © 2026 SMART 4K IPTV Inc. · <a href="https://smart4k.io" style="color:#a855f7;">smart4k.io</a>
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
    subject: `Payment Instructions — ${orderNumber} | SMART 4K IPTV`,
    html: `
      <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;background:#1f2326;color:#fff;border-radius:16px;overflow:hidden;">
        <div style="background:linear-gradient(135deg,#7c3aed,#3b82f6);padding:32px;text-align:center;">
          <h1 style="margin:0;font-size:24px;font-weight:900;">Payment Instructions</h1>
          <p style="margin:8px 0 0;opacity:.85;">Complete your SMART 4K IPTV order</p>
        </div>
        <div style="padding:32px;">
          <p style="color:#d1d5db;">Hi <strong style="color:#fff;">${customerName}</strong>,</p>
          <p style="color:#d1d5db;">Your order <strong style="color:#fff;">${orderNumber}</strong> for <strong style="color:#fff;">${planName}</strong> is ready for payment.</p>
          <div style="background:#2c3034;border-radius:12px;padding:20px;margin:24px 0;text-align:center;">
            <p style="margin:0 0 4px;color:#9ca3af;font-size:12px;text-transform:uppercase;">Amount Due</p>
            <p style="margin:0;color:#a855f7;font-size:36px;font-weight:900;">${amount}</p>
          </div>
          <p style="color:#d1d5db;">Click the button below to complete your payment:</p>
          <div style="text-align:center;margin:32px 0;">
            <a href="${paymentLink}" style="background:#00C853;color:#fff;text-decoration:none;padding:16px 40px;border-radius:50px;font-weight:900;font-size:16px;display:inline-block;">Pay Now →</a>
          </div>
          <p style="color:#6b7280;font-size:13px;">Once payment is confirmed, we'll activate your subscription and send your IPTV credentials within a few hours.</p>
        </div>
        <div style="padding:16px 32px;border-top:1px solid #2c3034;text-align:center;color:#6b7280;font-size:12px;">
          © 2026 SMART 4K IPTV Inc. · <a href="https://smart4k.io" style="color:#a855f7;">smart4k.io</a>
        </div>
      </div>
    `,
  })
}

export async function sendCredentialsReady(props: SendCredentialsProps) {
  const { to, customerName, planName, endDate, username, password, m3uUrl, portalUrl } = props
  return getResend().emails.send({
    from: FROM,
    to,
    subject: `Your IPTV is Ready! Credentials Inside | SMART 4K IPTV`,
    html: `
      <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;background:#1f2326;color:#fff;border-radius:16px;overflow:hidden;">
        <div style="background:linear-gradient(135deg,#7c3aed,#3b82f6);padding:32px;text-align:center;">
          <h1 style="margin:0;font-size:24px;font-weight:900;">🎉 Your IPTV is Active!</h1>
          <p style="margin:8px 0 0;opacity:.85;">${planName} — Enjoy 22,000+ channels in 4K</p>
        </div>
        <div style="padding:32px;">
          <p style="color:#d1d5db;">Hi <strong style="color:#fff;">${customerName}</strong>,</p>
          <p style="color:#d1d5db;">Your subscription is now active until <strong style="color:#fff;">${endDate}</strong>. Here are your login credentials:</p>
          <div style="background:#2c3034;border-radius:12px;padding:20px;margin:24px 0;">
            <p style="margin:0 0 16px;color:#9ca3af;font-size:12px;text-transform:uppercase;letter-spacing:.1em;">Your IPTV Credentials</p>
            <table style="width:100%;border-collapse:collapse;">
              <tr><td style="color:#9ca3af;padding:8px 0;vertical-align:top;">Username</td><td style="color:#a855f7;font-family:monospace;text-align:right;">${username}</td></tr>
              <tr><td style="color:#9ca3af;padding:8px 0;vertical-align:top;">Password</td><td style="color:#a855f7;font-family:monospace;text-align:right;">${password}</td></tr>
              <tr><td style="color:#9ca3af;padding:8px 0;vertical-align:top;">M3U URL</td><td style="color:#60a5fa;font-family:monospace;font-size:11px;text-align:right;word-break:break-all;">${m3uUrl}</td></tr>
              ${portalUrl ? `<tr><td style="color:#9ca3af;padding:8px 0;vertical-align:top;">Portal URL</td><td style="color:#60a5fa;font-family:monospace;font-size:12px;text-align:right;">${portalUrl}</td></tr>` : ''}
            </table>
          </div>
          <p style="color:#d1d5db;font-size:13px;">You can also find these credentials anytime in your dashboard:</p>
          <div style="text-align:center;margin:24px 0;">
            <a href="https://smart4k.io/dashboard/subscription" style="background:linear-gradient(135deg,#7c3aed,#3b82f6);color:#fff;text-decoration:none;padding:14px 32px;border-radius:50px;font-weight:700;display:inline-block;">View My Subscription</a>
          </div>
          <p style="color:#6b7280;font-size:12px;">Need help setting up? Visit our <a href="https://smart4k.io/#faq" style="color:#a855f7;">FAQ page</a> or contact support on Telegram.</p>
        </div>
        <div style="padding:16px 32px;border-top:1px solid #2c3034;text-align:center;color:#6b7280;font-size:12px;">
          © 2026 SMART 4K IPTV Inc. · <a href="https://smart4k.io" style="color:#a855f7;">smart4k.io</a>
        </div>
      </div>
    `,
  })
}
