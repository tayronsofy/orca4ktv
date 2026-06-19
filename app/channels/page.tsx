import type { Metadata } from 'next'
import Link from 'next/link'
import ChannelsPage from '@/page-components/ChannelsPage'
import BreadcrumbJsonLd from '@/components/seo/BreadcrumbJsonLd'

export const metadata: Metadata = {
  title: 'IPTV Channel List 2026 - 22,000+ Channels | ORCA 4K TV',
  description: 'Browse 22,000+ live IPTV channels across 150+ countries. Live sports, news, movies, kids and international programming in 4K HDR. Smart EPG, multi-device.',
  keywords: 'iptv channel list 2026, premium iptv channels, live tv channels, iptv 22000 channels, iptv channels usa, iptv channels uk, iptv channels canada, iptv channels germany, iptv channels netherlands, iptv channels france, iptv sports channels, iptv news channels, iptv kids channels, iptv movie channels, iptv music channels, iptv international channels, 4k iptv channels, hdr iptv, hdr10+, dolby vision, smart epg, 7-day catch-up, electronic program guide, multi-device iptv, AES-256 encryption, anti freeze cdn, m3u url, xtream codes, tivimate compatible, iptv smarters pro, ott navigator, iptv firestick 4k max, iptv apple tv 4k, iptv android tv 14, iptv smart tv samsung lg',
  alternates: {
    canonical: 'https://orca4ktv.com/channels',
    languages: {
      'en-US': 'https://orca4ktv.com/channels',
      'x-default': 'https://orca4ktv.com/channels',
    },
  },
  openGraph: {
    title: 'IPTV Channel List 2026 - 22,000+ Channels | ORCA 4K TV',
    description: '22,000+ IPTV channels across 150+ countries. Live sports, news, movies, kids and international programming in 4K HDR. Smart EPG.',
    url: 'https://orca4ktv.com/channels',
    type: 'website',
    images: [{ url: 'https://orca4ktv.com/og-image.jpg', width: 1200, height: 630 }],
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'IPTV Channel List 2026 - 22,000+ Channels | ORCA 4K TV',
    description: '22,000+ IPTV channels - sports, news, movies, kids - across 150+ countries in 4K HDR.',
  },
}

const channelFaqs = [
  {
    q: 'How many IPTV channels does ORCA 4K TV offer in 2026?',
    a: 'ORCA 4K TV ships 22,000+ live TV channels across 150+ countries, plus 100,000+ on-demand movies and series. Every plan - 1 month, 3 months, 6 months, or 12 months - unlocks the entire channel library, no feature tiers.',
  },
  {
    q: 'Which sports channels are included in the IPTV channel list?',
    a: 'Top-tier football across the UK, Spain, Italy, Germany and the Netherlands; American football, US pro basketball, US pro baseball, North American pro hockey, college sports; top European club football midweek; the 2026 international football tournament; the 2026 Winter Games; top-tier open-wheel motorsport with the new 2026 regulations; premier motorcycle racing; major golf tournaments; all four Grand Slam tennis tournaments; MMA pay-per-views; plus 24/7 dedicated sports networks across all major regions. All in 4K HDR where the upstream feed supplies it.',
  },
  {
    q: 'Are local channels for the USA, UK, Canada, Germany, and Netherlands included?',
    a: 'Yes. Full national lineups for every region: all major US free-to-air networks and local affiliates by ZIP code; all major UK free-to-air networks; all major Canadian English and French free-to-air networks; all major German free-to-air networks; all major Dutch free-to-air networks. Plus 30+ regional and international channel groups in French, Spanish, Italian, Portuguese, Arabic, and Eastern European languages.',
  },
  {
    q: 'Are the IPTV channels in 4K HDR with HDR10+ and Dolby Vision?',
    a: 'Yes. Every channel that broadcasts in 4K is delivered in 4K Ultra-HD with HDR10+ and Dolby Vision support - provided your TV and player can decode them. Channels broadcasting in HD or SD stream at native source quality.',
  },
  {
    q: 'How do I access the channels - what IPTV apps work?',
    a: 'M3U URLs and Xtream codes (issued at checkout) work with TiviMate, IPTV Smarters Pro, OTT Navigator, GSE Smart IPTV, Smart IPTV, and Perfect Player on Firestick 4K Max, Apple TV 4K, Android TV 14, Samsung Tizen, LG webOS, MAG-box, Formuler, iOS, iPadOS, Android, Windows, macOS, Linux, and any modern HTML5 browser.',
  },
  {
    q: 'Is there an EPG (TV guide) for these IPTV channels?',
    a: 'Yes - every channel ships with a smart Electronic Programme Guide (EPG) and 7-day catch-up TV. The EPG is auto-loaded by TiviMate, IPTV Smarters Pro, and OTT Navigator. You can search by channel, time slot, or program name.',
  },
  {
    q: 'Are the IPTV channels updated daily?',
    a: 'Yes. Channel additions, removals, and source updates happen daily. The 99.9% uptime SLA covers the entire library, monitored 24/7 by our network operations team.',
  },
  {
    q: 'Can I watch the channels in countries with ISP throttling or geo-blocks?',
    a: 'Yes. All streams use TLS 1.3 with AES-256 encryption (NIST FIPS 197), so traffic shaping by ISPs is unreliable against ORCA 4K TV. VPNs are fully supported on every plan with no speed throttling.',
  },
]

export default function ChannelsListPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', url: 'https://orca4ktv.com/iptv' },
          { name: 'IPTV Channel List', url: 'https://orca4ktv.com/channels' },
        ]}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@graph': [
              {
                '@type': 'CollectionPage',
                '@id': 'https://orca4ktv.com/channels#collectionpage',
                url: 'https://orca4ktv.com/channels',
                name: 'IPTV Channel List 2026 - 22,000+ Premium IPTV Channels',
                description:
                  'Complete IPTV channel list for 2026: 22,000+ live TV channels across 150+ countries - sports, news, movies, kids, music, and international programming. Coverage spans top-tier football across the UK, Spain, Italy, Germany and the Netherlands; American football, US pro basketball, US pro baseball, North American pro hockey; the 2026 international football tournament; the 2026 Winter Games. 4K HDR with HDR10+ and Dolby Vision, smart EPG with 7-day catch-up TV.',
                isPartOf: { '@id': 'https://orca4ktv.com/#website' },
              },
              {
                '@type': 'Service',
                '@id': 'https://orca4ktv.com/channels#service',
                name: 'ORCA 4K TV - IPTV Channel Library',
                serviceType: 'Premium IPTV Streaming Subscription',
                provider: { '@id': 'https://orca4ktv.com/#organization' },
                areaServed: { '@type': 'Place', name: 'Worldwide (150+ countries)' },
                audience: {
                  '@type': 'Audience',
                  audienceType: 'Cord-cutters, live-sports households, multi-language households, premium streaming households',
                },
                availableLanguage: ['English', 'Spanish', 'French', 'German', 'Italian', 'Portuguese', 'Dutch', 'Arabic', 'Polish', 'Turkish'],
                hoursAvailable: {
                  '@type': 'OpeningHoursSpecification',
                  dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
                  opens: '00:00',
                  closes: '23:59',
                },
                description:
                  '22,000+ live TV channels and 100,000+ on-demand titles across 150+ countries - live sports across every major league and international event, news, movies and series, kids, music, international (30+ language groups). 4K HDR with HDR10+ and Dolby Vision, smart EPG with 7-day catch-up TV, multi-device IPTV, AES-256 encryption, Anti Freeze CDN.',
              },
              {
                '@type': 'ItemList',
                '@id': 'https://orca4ktv.com/channels#categorylist',
                name: 'IPTV Channel Categories',
                description: 'Top categories in the ORCA 4K TV IPTV channel library.',
                itemListElement: [
                  { '@type': 'ListItem', position: 1, name: 'Sports IPTV channels - top-tier football, American football, US pro basketball, North American pro hockey, motorsport' },
                  { '@type': 'ListItem', position: 2, name: 'News IPTV channels - all major 24-hour news networks across the US, UK, Germany, Netherlands and Canada' },
                  { '@type': 'ListItem', position: 3, name: 'Movie IPTV channels - Hollywood, premium cinema, premium streaming-platform-equivalent originals' },
                  { '@type': 'ListItem', position: 4, name: 'Kids IPTV channels - premium kids and family channels and educational programming' },
                  { '@type': 'ListItem', position: 5, name: 'Music IPTV channels - major music video networks and 24/7 music streams' },
                  { '@type': 'ListItem', position: 6, name: 'Documentary IPTV channels - major documentary, history, science and nature networks' },
                  { '@type': 'ListItem', position: 7, name: 'International IPTV channels - 30+ language groups across 150+ countries' },
                  { '@type': 'ListItem', position: 8, name: 'Local IPTV channels - all major US, UK, Canadian, German and Dutch free-to-air networks' },
                ],
              },
              {
                '@type': 'FAQPage',
                '@id': 'https://orca4ktv.com/channels#faq',
                mainEntity: channelFaqs.map((f) => ({
                  '@type': 'Question',
                  name: f.q,
                  acceptedAnswer: { '@type': 'Answer', text: f.a },
                })),
              },
            ],
          }),
        }}
      />

      <ChannelsPage
        seoContent={
          <>
            {/* SEO content block - server-rendered after the country directory */}
            <section className="bg-[#001f3f] py-20 px-4 mt-12 border-t border-white/5">
              <div className="max-w-4xl mx-auto space-y-7">
                <p className="text-center text-purple-400 text-xs font-black uppercase tracking-[0.3em]">
                  IPTV Channel Library · 2026
                </p>

                <h2 className="text-3xl md:text-5xl font-black text-white text-center leading-tight">
                  IPTV Channel List 2026 - 22,000+ Live TV Channels in 4K HDR
                </h2>

                <p className="text-gray-300 text-lg leading-relaxed">
                  <strong className="text-white">ORCA 4K TV</strong> ships the largest premium IPTV channel list in 2026 - over <strong className="text-white">22,000 live TV channels</strong> across <strong className="text-white">150+ countries</strong>, plus <strong className="text-white">100,000+ on-demand movies and series</strong> - all behind <strong className="text-white">AES-256 encryption</strong> on our proprietary <strong className="text-white">Anti Freeze CDN</strong>. Every channel that broadcasts in 4K is delivered in <strong className="text-white">4K Ultra-HD with HDR10+ and Dolby Vision</strong>. Every plan unlocks the same complete channel library - there are no feature tiers locked behind higher prices.
                </p>

                <h3 className="text-2xl md:text-3xl font-black text-white pt-4 border-t border-purple-500/15">
                  Sports IPTV channels - every league, every match
                </h3>

                <p className="text-gray-300 text-lg leading-relaxed">
                  The ORCA 4K TV IPTV channel list covers the entire global sports calendar in 4K HDR: <strong className="text-white">top-tier football</strong> across the UK, Spain, Italy, Germany and the Netherlands, plus second-tier and lower-league competitions, US top-flight football, college sports; every <strong className="text-white">American football</strong> Sunday and Monday-night showpiece, every <strong className="text-white">US pro basketball</strong> regular-season and playoff game, every <strong className="text-white">North American pro hockey</strong> match including Saturday-night hockey broadcasts, every <strong className="text-white">US pro baseball</strong> regular-season and championship-series game, every <strong className="text-white">top European club football</strong> midweek knockout and supplemental European competition, the <strong className="text-white">2026 international football tournament</strong> in the USA, Canada, and Mexico, the <strong className="text-white">2026 Winter Games</strong>, every round of the new-regulation <strong className="text-white">2026 open-wheel motorsport</strong> season, premier motorcycle racing, junior and electric formulas, all four golf majors, all four Grand Slam tennis tournaments, MMA pay-per-views, plus dedicated 24/7 sports networks across all major regions.
                </p>

                <h3 className="text-2xl md:text-3xl font-black text-white pt-6 border-t border-purple-500/15">
                  Local IPTV channels for every major region
                </h3>

                <p className="text-gray-300 text-lg leading-relaxed">
                  Replace cable in any country with the full national lineup:
                </p>

                <ul className="grid md:grid-cols-2 gap-4 text-gray-300 text-base leading-relaxed">
                  <li className="flex gap-3"><span className="text-purple-400 font-black mt-0.5">▸</span><span><strong className="text-white">USA IPTV channels:</strong> all major US free-to-air networks and local affiliates by ZIP code, plus the major basic-cable entertainment, lifestyle, history, documentary and discovery networks. <Link href="/iptv-usa" className="text-purple-400 hover:underline">View IPTV USA</Link></span></li>
                  <li className="flex gap-3"><span className="text-purple-400 font-black mt-0.5">▸</span><span><strong className="text-white">UK IPTV channels:</strong> all major UK free-to-air networks, their HD/+1/regional variants, plus the premium UK sports tier. <Link href="/iptv-uk" className="text-purple-400 hover:underline">View IPTV UK</Link></span></li>
                  <li className="flex gap-3"><span className="text-purple-400 font-black mt-0.5">▸</span><span><strong className="text-white">Canada IPTV channels:</strong> all major Canadian English-language free-to-air networks, all major French-language Canadian networks, plus the premium Canadian sports tier. <Link href="/iptv-canada" className="text-purple-400 hover:underline">View IPTV Canada</Link></span></li>
                  <li className="flex gap-3"><span className="text-purple-400 font-black mt-0.5">▸</span><span><strong className="text-white">Germany IPTV channels:</strong> all major German public free-to-air networks and their regional programming, all major German private free-to-air networks, plus the premium German sports tier. <Link href="/iptv-germany" className="text-purple-400 hover:underline">View IPTV Deutschland</Link></span></li>
                  <li className="flex gap-3"><span className="text-purple-400 font-black mt-0.5">▸</span><span><strong className="text-white">Netherlands IPTV channels:</strong> all major Dutch public and commercial free-to-air networks, regional broadcasters, plus the premium Dutch sports tier. <Link href="/iptv-netherlands" className="text-purple-400 hover:underline">View IPTV Nederland</Link></span></li>
                  <li className="flex gap-3"><span className="text-purple-400 font-black mt-0.5">▸</span><span><strong className="text-white">France, Spain, Italy, Portugal:</strong> all major free-to-air networks for each country plus their HD/themed sister channels.</span></li>
                  <li className="flex gap-3"><span className="text-purple-400 font-black mt-0.5">▸</span><span><strong className="text-white">Latin America &amp; Brazil:</strong> all major Brazilian free-to-air networks plus the principal Spanish-language broadcasters across Mexico, Colombia and the wider region.</span></li>
                  <li className="flex gap-3"><span className="text-purple-400 font-black mt-0.5">▸</span><span><strong className="text-white">MENA &amp; international:</strong> all major Arabic-language free-to-air and pay-TV networks, plus dedicated Arabic, Turkish, Polish, Greek, Russian, Indian, and Pakistani channel groups.</span></li>
                </ul>

                <h3 className="text-2xl md:text-3xl font-black text-white pt-6 border-t border-purple-500/15">
                  Movies, kids, news, music &amp; documentary IPTV channels
                </h3>

                <p className="text-gray-300 text-lg leading-relaxed">
                  Beyond sports and local networks, the IPTV channel list ships every premium category. <strong className="text-white">Movie IPTV channels:</strong> premium movie networks plus 24/7 themed cinema feeds (Action, Comedy, Drama, Horror, Sci-Fi, Family). <strong className="text-white">News IPTV channels:</strong> all major 24-hour news networks across the US, UK, Germany, Netherlands, France, Canada and the Middle East, plus financial and international news. <strong className="text-white">Kids IPTV channels:</strong> premium kids and family channels and educational programming. <strong className="text-white">Music IPTV channels:</strong> major music video networks and 24/7 music streams across pop, urban, country and electronic genres. <strong className="text-white">Documentary IPTV channels:</strong> major documentary, history, science, nature, travel and lifestyle networks.
                </p>

                <h3 className="text-2xl md:text-3xl font-black text-white pt-6 border-t border-purple-500/15">
                  Smart EPG, 7-day catch-up &amp; multi-device IPTV
                </h3>

                <p className="text-gray-300 text-lg leading-relaxed">
                  Every channel in the ORCA 4K TV IPTV channel list ships with a <strong className="text-white">smart Electronic Programme Guide (EPG)</strong> auto-loaded by TiviMate, IPTV Smarters Pro, and OTT Navigator - search by channel, time, or program name. <strong className="text-white">7-day catch-up TV</strong> means you never miss a match or episode again. The IPTV credentials (M3U URL + Xtream codes) work on <strong className="text-white">Firestick 4K Max</strong>, Apple TV 4K (3rd gen), <strong className="text-white">Android TV 14</strong> boxes (Nvidia Shield, Onn 4K Pro, Chromecast with Google TV), Samsung Tizen, LG webOS, MAG-box, Formuler, plus iOS / iPadOS / Android phones and tablets, Windows / macOS / Linux computers, and any modern HTML5 browser. See the <Link href="/setup-guide" className="text-purple-400 hover:underline">step-by-step IPTV setup guide</Link> or the <Link href="/glossary" className="text-purple-400 hover:underline">IPTV glossary</Link> for term definitions.
                </p>

                <p className="text-gray-300 text-lg leading-relaxed text-center pt-6">
                  Want the full IPTV channel list active in under 5 minutes? <Link href="/trial" className="text-purple-400 hover:underline font-bold">Start a free IPTV trial</Link>{' '}- no credit card required, instant activation, full 4K HDR. Or <Link href="/iptv-shop" className="text-purple-400 hover:underline font-bold">view IPTV plans</Link> from $7.92/month.
                </p>
              </div>
            </section>

            {/* FAQ Section - server-rendered, paired with FAQPage JSON-LD */}
            <section className="bg-[#001a36] py-16 px-4 border-t border-white/5">
              <div className="max-w-3xl mx-auto">
                <h2 className="text-3xl font-black text-white text-center mb-10">
                  IPTV Channel List FAQ - 2026
                </h2>
                <div className="space-y-4">
                  {channelFaqs.map((item) => (
                    <div key={item.q} className="border border-white/10 rounded-xl bg-[#002952] overflow-hidden">
                      <details className="group">
                        <summary className="flex items-center justify-between gap-4 px-6 py-5 cursor-pointer list-none">
                          <span className="font-bold text-white">{item.q}</span>
                          <i className="fas fa-chevron-down text-purple-400 text-sm transition-transform group-open:rotate-180 flex-shrink-0" />
                        </summary>
                        <div className="px-6 pb-5">
                          <p className="text-gray-400 leading-relaxed">{item.a}</p>
                        </div>
                      </details>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </>
        }
      />
    </>
  )
}
