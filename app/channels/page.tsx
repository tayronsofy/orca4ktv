import type { Metadata } from 'next'
import Link from 'next/link'
import ChannelsPage from '@/page-components/ChannelsPage'
import BreadcrumbJsonLd from '@/components/seo/BreadcrumbJsonLd'

export const metadata: Metadata = {
  title: 'IPTV Channel List 2026 — 22,000+ Channels | ORCA 4K TV',
  description: 'Browse 22,000+ live IPTV channels across 150+ countries. Premier League, NFL, NBA, NHL, Bundesliga, F1 2026 in 4K HDR. Smart EPG, multi-device.',
  keywords: 'iptv channel list 2026, premium iptv channels, live tv channels, iptv 22000 channels, iptv channels usa, iptv channels uk, iptv channels canada, iptv channels germany, iptv channels netherlands, iptv channels france, iptv sports channels, premier league iptv channels, nfl iptv channels, nba iptv channels, nhl iptv channels, mlb iptv channels, bundesliga iptv channels, eredivisie iptv channels, f1 2026 iptv channels, espn iptv, bbc iptv, sky sports iptv, tnt sports iptv, dazn iptv, ard iptv, zdf iptv, rtl iptv, npo iptv, ziggo sport iptv, sportsnet iptv, tsn iptv, iptv news channels, iptv kids channels, iptv movie channels, iptv music channels, iptv international channels, 4k iptv channels, hdr iptv, hdr10+, dolby vision, smart epg, 7-day catch-up, electronic program guide, multi-device iptv, AES-256 encryption, anti freeze cdn, m3u url, xtream codes, tivimate compatible, iptv smarters pro, ott navigator, iptv firestick 4k max, iptv apple tv 4k, iptv android tv 14, iptv smart tv samsung lg',
  alternates: {
    canonical: 'https://orca4ktv.com/channels',
    languages: {
      'en-US': 'https://orca4ktv.com/channels',
      'x-default': 'https://orca4ktv.com/channels',
    },
  },
  openGraph: {
    title: 'IPTV Channel List 2026 — 22,000+ Channels | ORCA 4K TV',
    description: '22,000+ IPTV channels across 150+ countries. Premier League, NFL, NBA, NHL, Bundesliga, F1 2026 in 4K HDR. Smart EPG.',
    url: 'https://orca4ktv.com/channels',
    type: 'website',
    images: [{ url: 'https://orca4ktv.com/og-image.jpg', width: 1200, height: 630 }],
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'IPTV Channel List 2026 — 22,000+ Channels | ORCA 4K TV',
    description: '22,000+ IPTV channels — sports, news, movies, kids — across 150+ countries in 4K HDR.',
  },
}

const channelFaqs = [
  {
    q: 'How many IPTV channels does ORCA 4K TV offer in 2026?',
    a: 'ORCA 4K TV ships 22,000+ live TV channels across 150+ countries, plus 100,000+ on-demand movies and series. Every plan — 1 month, 3 months, 6 months, or 12 months — unlocks the entire channel library, no feature tiers.',
  },
  {
    q: 'Which sports channels are included in the IPTV channel list?',
    a: 'Premier League, La Liga, Serie A, Bundesliga, Eredivisie, MLS, NFL, NBA, NHL, MLB, NCAA, F1 2026 with the new regulations era, MotoGP, UEFA Champions League, Europa League, Conference League, FIFA World Cup 2026, the Olympic Winter Games Milano-Cortina 2026, ESPN, Sky Sports, TNT Sports, DAZN, NBC Sports, beIN Sports, Sportsnet, TSN, Ziggo Sport, ARD Sportschau, NHL Network, Tennis Channel, and Eurosport. All in 4K HDR.',
  },
  {
    q: 'Are local channels for the USA, UK, Canada, Germany, and Netherlands included?',
    a: 'Yes. The full national networks for every region: ABC, CBS, NBC, FOX, PBS, ESPN (USA); BBC, ITV, Channel 4, Sky, TNT Sports (UK); CBC, CTV, Global, TSN, Sportsnet (Canada); ARD, ZDF, RTL, ProSieben, Sat.1, Vox (Germany); NPO 1, NPO 2, NPO 3, RTL 4, RTL 5, SBS6, Veronica, Ziggo Sport (Netherlands), plus 30+ regional and international channel groups in French, Spanish, Italian, Portuguese, Arabic, and Eastern European languages.',
  },
  {
    q: 'Are the IPTV channels in 4K HDR with HDR10+ and Dolby Vision?',
    a: 'Yes. Every channel that broadcasts in 4K is delivered in 4K Ultra-HD with HDR10+ and Dolby Vision support — provided your TV and player can decode them. Channels broadcasting in HD or SD stream at native source quality.',
  },
  {
    q: 'How do I access the channels — what IPTV apps work?',
    a: 'M3U URLs and Xtream codes (issued at checkout) work with TiviMate, IPTV Smarters Pro, OTT Navigator, GSE Smart IPTV, Smart IPTV, and Perfect Player on Firestick 4K Max, Apple TV 4K, Android TV 14, Samsung Tizen, LG webOS, MAG-box, Formuler, iOS, iPadOS, Android, Windows, macOS, Linux, and any modern HTML5 browser.',
  },
  {
    q: 'Is there an EPG (TV guide) for these IPTV channels?',
    a: 'Yes — every channel ships with a smart Electronic Programme Guide (EPG) and 7-day catch-up TV. The EPG is auto-loaded by TiviMate, IPTV Smarters Pro, and OTT Navigator. You can search by channel, time slot, or program name.',
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
          { name: 'Home', url: 'https://orca4ktv.com/' },
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
                name: 'IPTV Channel List 2026 — 22,000+ Premium IPTV Channels',
                description:
                  'Complete IPTV channel list for 2026: 22,000+ live TV channels across 150+ countries — sports, news, movies, kids, music, and international programming. Premier League, NFL, NBA, NHL, MLB, Bundesliga, Eredivisie, F1 2026, BBC, ESPN, ARD, ZDF, RTL, NPO. 4K HDR with HDR10+ and Dolby Vision, smart EPG with 7-day catch-up TV.',
                isPartOf: { '@id': 'https://orca4ktv.com/#website' },
              },
              {
                '@type': 'Service',
                '@id': 'https://orca4ktv.com/channels#service',
                name: 'ORCA 4K TV — IPTV Channel Library',
                serviceType: 'Premium IPTV Streaming Subscription',
                provider: { '@id': 'https://orca4ktv.com/#organization' },
                areaServed: { '@type': 'Place', name: 'Worldwide (150+ countries)' },
                audience: {
                  '@type': 'Audience',
                  audienceType: 'Cord-cutters, sports fans, multi-language households, premium streaming households',
                },
                availableLanguage: ['English', 'Spanish', 'French', 'German', 'Italian', 'Portuguese', 'Dutch', 'Arabic', 'Polish', 'Turkish'],
                hoursAvailable: {
                  '@type': 'OpeningHoursSpecification',
                  dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
                  opens: '00:00',
                  closes: '23:59',
                },
                description:
                  '22,000+ live TV channels and 100,000+ on-demand titles across 150+ countries — sports (Premier League, NFL, NBA, NHL, MLB, Bundesliga, Eredivisie, F1 2026, Olympics Milano-Cortina, FIFA World Cup 2026), news (BBC News, CNN, NOS, ARD Tagesschau, n-tv), movies and series (Hollywood, Apple TV+, Prime Video, Netflix-style), kids (Disney Channel, Nickelodeon, Cartoon Network, NPO Zapp, KiKa), music (MTV, VH1, Stingray), international (30+ language groups). 4K HDR with HDR10+ and Dolby Vision, smart EPG with 7-day catch-up TV, multi-device IPTV, AES-256 encryption, Anti Freeze CDN.',
              },
              {
                '@type': 'ItemList',
                '@id': 'https://orca4ktv.com/channels#categorylist',
                name: 'IPTV Channel Categories',
                description: 'Top categories in the ORCA 4K TV IPTV channel library.',
                itemListElement: [
                  { '@type': 'ListItem', position: 1, name: 'Sports IPTV channels — Premier League, NFL, NBA, NHL, MLB, Bundesliga, Eredivisie, F1 2026' },
                  { '@type': 'ListItem', position: 2, name: 'News IPTV channels — BBC News, CNN, Fox News, NOS, ARD Tagesschau, n-tv, Sky News' },
                  { '@type': 'ListItem', position: 3, name: 'Movie IPTV channels — Hollywood, premium cinema, Apple TV+, Prime Video' },
                  { '@type': 'ListItem', position: 4, name: 'Kids IPTV channels — Disney, Nickelodeon, Cartoon Network, NPO Zapp, KiKa' },
                  { '@type': 'ListItem', position: 5, name: 'Music IPTV channels — MTV, VH1, Stingray, MTV Hits' },
                  { '@type': 'ListItem', position: 6, name: 'Documentary IPTV channels — Discovery, History, National Geographic, Animal Planet' },
                  { '@type': 'ListItem', position: 7, name: 'International IPTV channels — 30+ language groups across 150+ countries' },
                  { '@type': 'ListItem', position: 8, name: 'Local IPTV channels — ABC, CBS, NBC, FOX, BBC, ITV, CBC, CTV, ARD, ZDF, RTL, NPO' },
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
            {/* SEO content block — server-rendered after the country directory */}
            <section className="bg-[#001f3f] py-20 px-4 mt-12 border-t border-white/5">
              <div className="max-w-4xl mx-auto space-y-7">
                <p className="text-center text-purple-400 text-xs font-black uppercase tracking-[0.3em]">
                  IPTV Channel Library · 2026
                </p>

                <h2 className="text-3xl md:text-5xl font-black text-white text-center leading-tight">
                  IPTV Channel List 2026 — 22,000+ Live TV Channels in 4K HDR
                </h2>

                <p className="text-gray-300 text-lg leading-relaxed">
                  <strong className="text-white">ORCA 4K TV</strong> ships the largest premium IPTV channel list in 2026 — over <strong className="text-white">22,000 live TV channels</strong> across <strong className="text-white">150+ countries</strong>, plus <strong className="text-white">100,000+ on-demand movies and series</strong> — all behind <strong className="text-white">AES-256 encryption</strong> on our proprietary <strong className="text-white">Anti Freeze CDN</strong>. Every channel that broadcasts in 4K is delivered in <strong className="text-white">4K Ultra-HD with HDR10+ and Dolby Vision</strong>. Every plan unlocks the same complete channel library — there are no feature tiers locked behind higher prices.
                </p>

                <h3 className="text-2xl md:text-3xl font-black text-white pt-4 border-t border-purple-500/15">
                  Sports IPTV channels — every league, every match
                </h3>

                <p className="text-gray-300 text-lg leading-relaxed">
                  The ORCA 4K TV IPTV channel list covers the entire global sports calendar in 4K HDR: every <strong className="text-white">Premier League</strong> match, every <strong className="text-white">La Liga</strong>, <strong className="text-white">Serie A</strong>, <strong className="text-white">Bundesliga</strong>, and <strong className="text-white">Eredivisie</strong> matchday, MLS, NCAA, every <strong className="text-white">NFL</strong> Sunday and Monday Night Football, every <strong className="text-white">NBA</strong> regular-season and playoff game, every <strong className="text-white">NHL</strong> Stanley Cup match including Hockey Night in Canada, every <strong className="text-white">MLB</strong> regular-season and World Series game, every <strong className="text-white">UEFA Champions League</strong>, Europa League, and Conference League knockout, the <strong className="text-white">FIFA World Cup 2026</strong> in the USA, Canada, and Mexico, the <strong className="text-white">Olympic Winter Games Milano-Cortina 2026</strong>, every <strong className="text-white">F1 2026</strong> Grand Prix in the new-regulation era with Audi entering, MotoGP, F2, F3, NASCAR, IndyCar, golf majors (Masters, US Open, The Open, PGA Championship), every Grand Slam tennis tournament (Australian Open, Roland-Garros, Wimbledon, US Open), boxing and UFC pay-per-views, plus dedicated 24/7 sports networks: <strong className="text-white">ESPN</strong>, ESPN2, ESPN+, <strong className="text-white">TNT Sports</strong>, <strong className="text-white">Sky Sports</strong>, <strong className="text-white">DAZN</strong>, NBC Sports, beIN Sports, <strong className="text-white">Sportsnet</strong>, <strong className="text-white">TSN</strong>, <strong className="text-white">Ziggo Sport</strong>, ESPN NL, ARD Sportschau, ZDF SPORTextra, Sport1, Eurosport 1 &amp; 2, NHL Network, NBA TV, MLB Network, Tennis Channel, and Golf Channel.
                </p>

                <h3 className="text-2xl md:text-3xl font-black text-white pt-6 border-t border-purple-500/15">
                  Local IPTV channels for every major region
                </h3>

                <p className="text-gray-300 text-lg leading-relaxed">
                  Replace cable in any country with the full national lineup:
                </p>

                <ul className="grid md:grid-cols-2 gap-4 text-gray-300 text-base leading-relaxed">
                  <li className="flex gap-3"><span className="text-purple-400 font-black mt-0.5">▸</span><span><strong className="text-white">USA IPTV channels:</strong> ABC, CBS, NBC, FOX, PBS, The CW, Telemundo, Univision, Bravo, USA Network, TNT, TBS, FX, AMC, A&amp;E, History, Discovery, National Geographic. <Link href="/iptv-usa" className="text-purple-400 hover:underline">View IPTV USA</Link></span></li>
                  <li className="flex gap-3"><span className="text-purple-400 font-black mt-0.5">▸</span><span><strong className="text-white">UK IPTV channels:</strong> BBC One, BBC Two, BBC Three, BBC Four, ITV, ITV2, ITV3, ITV4, Channel 4, More4, E4, Channel 5, Sky News, Sky Sports News, BT Sport. <Link href="/iptv-uk" className="text-purple-400 hover:underline">View IPTV UK</Link></span></li>
                  <li className="flex gap-3"><span className="text-purple-400 font-black mt-0.5">▸</span><span><strong className="text-white">Canada IPTV channels:</strong> CBC, CTV, Global, City, TSN, Sportsnet, NHL Network, OMNI, APTN, plus French-language Radio-Canada, TVA, Noovo, RDS. <Link href="/iptv-canada" className="text-purple-400 hover:underline">View IPTV Canada</Link></span></li>
                  <li className="flex gap-3"><span className="text-purple-400 font-black mt-0.5">▸</span><span><strong className="text-white">Germany IPTV channels:</strong> Das Erste, ZDF, ARD-Regionalsender (BR, NDR, WDR, MDR, SWR, HR, RBB, SR), RTL, RTL2, Vox, ProSieben, Sat.1, Kabel Eins, Sport1, Eurosport. <Link href="/iptv-germany" className="text-purple-400 hover:underline">View IPTV Deutschland</Link></span></li>
                  <li className="flex gap-3"><span className="text-purple-400 font-black mt-0.5">▸</span><span><strong className="text-white">Netherlands IPTV channels:</strong> NPO 1, NPO 2, NPO 3, RTL 4, RTL 5, RTL 7, RTL 8, RTL Z, SBS6, Net5, Veronica, Ziggo Sport, ESPN NL. <Link href="/iptv-netherlands" className="text-purple-400 hover:underline">View IPTV Nederland</Link></span></li>
                  <li className="flex gap-3"><span className="text-purple-400 font-black mt-0.5">▸</span><span><strong className="text-white">France, Spain, Italy, Portugal:</strong> TF1, France 2, France 3, M6, Canal+, RTVE La1, La2, Antena 3, Telecinco, Rai 1, Rai 2, Rai 3, Mediaset Italia, RTP1, RTP2, SIC, TVI.</span></li>
                  <li className="flex gap-3"><span className="text-purple-400 font-black mt-0.5">▸</span><span><strong className="text-white">Latin America &amp; Brazil:</strong> Globo, SBT, Record, Band, RedeTV, Telemundo, Univision, Caracol, RCN, Televisa, Azteca.</span></li>
                  <li className="flex gap-3"><span className="text-purple-400 font-black mt-0.5">▸</span><span><strong className="text-white">MENA &amp; international:</strong> MBC, Al Jazeera, Al Arabiya, OSN, Bein MENA, plus dedicated Arabic, Turkish, Polish, Greek, Russian, Indian, and Pakistani channel groups.</span></li>
                </ul>

                <h3 className="text-2xl md:text-3xl font-black text-white pt-6 border-t border-purple-500/15">
                  Movies, kids, news, music &amp; documentary IPTV channels
                </h3>

                <p className="text-gray-300 text-lg leading-relaxed">
                  Beyond sports and local networks, the IPTV channel list ships every premium category. <strong className="text-white">Movie IPTV channels:</strong> HBO, Showtime, Cinemax, Starz, Epix, plus 24/7 themed cinema feeds (Action, Comedy, Drama, Horror, Sci-Fi, Family). <strong className="text-white">News IPTV channels:</strong> BBC News, CNN, Fox News, MSNBC, Sky News, Al Jazeera English, NOS Journaal, Tagesschau, n-tv, Welt, France 24, RT, NHK World. <strong className="text-white">Kids IPTV channels:</strong> Disney Channel, Disney Junior, Nickelodeon, Nick Jr, Cartoon Network, Boomerang, NPO Zapp, KiKa, Super RTL, Toggo Plus. <strong className="text-white">Music IPTV channels:</strong> MTV, MTV Hits, MTV Live HD, VH1, Stingray Music, CMT, BET, Trace Urban. <strong className="text-white">Documentary IPTV channels:</strong> Discovery, Discovery Science, Investigation Discovery, History, History 2, National Geographic, Nat Geo Wild, Animal Planet, Travel Channel, DMAX, ServusTV, Geo Television, NPO Doc.
                </p>

                <h3 className="text-2xl md:text-3xl font-black text-white pt-6 border-t border-purple-500/15">
                  Smart EPG, 7-day catch-up &amp; multi-device IPTV
                </h3>

                <p className="text-gray-300 text-lg leading-relaxed">
                  Every channel in the ORCA 4K TV IPTV channel list ships with a <strong className="text-white">smart Electronic Programme Guide (EPG)</strong> auto-loaded by TiviMate, IPTV Smarters Pro, and OTT Navigator — search by channel, time, or program name. <strong className="text-white">7-day catch-up TV</strong> means you never miss a match or episode again. The IPTV credentials (M3U URL + Xtream codes) work on <strong className="text-white">Firestick 4K Max</strong>, Apple TV 4K (3rd gen), <strong className="text-white">Android TV 14</strong> boxes (Nvidia Shield, Onn 4K Pro, Chromecast with Google TV), Samsung Tizen, LG webOS, MAG-box, Formuler, plus iOS / iPadOS / Android phones and tablets, Windows / macOS / Linux computers, and any modern HTML5 browser. See the <Link href="/setup-guide" className="text-purple-400 hover:underline">step-by-step IPTV setup guide</Link> or the <Link href="/glossary" className="text-purple-400 hover:underline">IPTV glossary</Link> for term definitions.
                </p>

                <p className="text-gray-300 text-lg leading-relaxed text-center pt-6">
                  Want the full IPTV channel list active in under 5 minutes? <Link href="/trial" className="text-purple-400 hover:underline font-bold">Start a free IPTV trial</Link>{' '}— no credit card required, instant activation, full 4K HDR. Or <Link href="/iptv-shop" className="text-purple-400 hover:underline font-bold">view IPTV plans</Link> from $7.92/month.
                </p>
              </div>
            </section>

            {/* FAQ Section — server-rendered, paired with FAQPage JSON-LD */}
            <section className="bg-[#001a36] py-16 px-4 border-t border-white/5">
              <div className="max-w-3xl mx-auto">
                <h2 className="text-3xl font-black text-white text-center mb-10">
                  IPTV Channel List FAQ — 2026
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
