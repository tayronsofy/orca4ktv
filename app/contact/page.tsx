import type { Metadata } from 'next'
import ContactPage from '@/components/ContactPage'
import BreadcrumbJsonLd from '@/components/seo/BreadcrumbJsonLd'

export const metadata: Metadata = {
  title: 'Contact ORCA 4K TV | 24/7 IPTV Support & Inquiries',
  description: 'Contact ORCA 4K TV. Get 24/7 IPTV technical support, trial inquiries, or reseller opportunities. Average response under 5 minutes.',
  keywords: 'contact orca 4k tv, iptv customer support, iptv support telegram, email support iptv, reseller inquiry iptv, 24/7 customer service, helpdesk',
  alternates: { canonical: 'https://orca4ktv.com/contact' },
  openGraph: {
    title: 'Contact ORCA 4K TV | 24/7 IPTV Support & Inquiries',
    description: 'Get in touch with our technical setup team. Email support, Telegram helpdesk, and billing assistance. Fast replies in under 5 minutes.',
    type: 'website',
    url: 'https://orca4ktv.com/contact',
    images: [{ url: 'https://orca4ktv.com/og-image.jpg', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact ORCA 4K TV | 24/7 Support',
    description: 'Technical setup support, email helpdesk, and billing inquiries. Average reply in under 5 minutes.',
  },
}

export default function Contact() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', url: 'https://orca4ktv.com/' },
          { name: 'Contact', url: 'https://orca4ktv.com/contact' },
        ]}
      />
      <ContactPage />
    </>
  )
}
