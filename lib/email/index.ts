export {
  sendOrderConfirmation,
  sendPaymentLink,
  sendCredentialsReady,
  sendTrialCredentials,
  sendPasswordReset,
  sendAdminNewOrderAlert,
  sendAdminNewTrialAlert,
  sendAdminNewContactAlert,
  sendTestEmail,
} from './senders'
export { getEmailConfig, clearEmailConfigCache, sendMail } from './transport'
export type { EmailResult, EmailConfig } from './transport'
