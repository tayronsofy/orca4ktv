export {
  sendOrderConfirmation,
  sendPaymentLink,
  sendCredentialsReady,
  sendTrialCredentials,
  sendAdminNewOrderAlert,
  sendAdminNewTrialAlert,
  sendAdminNewContactAlert,
  sendTestEmail,
} from './senders'
export { getEmailConfig, clearEmailConfigCache, sendMail } from './transport'
export type { EmailResult, EmailConfig } from './transport'
