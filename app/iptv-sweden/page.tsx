import type { Metadata } from 'next'
import { buildPageMetadata, codeDefaultsFrom } from '@/lib/seo/metadata'
import SwedenHero from '@/components/sweden/SwedenHero'
import SwedenHomePage from '@/page-components/sweden/SwedenHomePage'
import BreadcrumbJsonLd from '@/components/seo/BreadcrumbJsonLd'
import { toSek, formatSek, FROM_SEK_PER_MONTH } from '@/components/sweden/sek'

const YEAR_1_STREAM_SEK = toSek(95)

const codeMetadata: Metadata = {
  title: 'Bästa IPTV Sverige 2026 - Svensk sport och alla kanaler i 4K | ORCA 4K TV',
  description: `Bästa IPTV Sverige 2026: svensk elitfotboll, elithockey, skidskytte och vinterspelen 2026 i 4K HDR. 22 000+ kanaler, alla viktiga svenska kanaler. Från ${FROM_SEK_PER_MONTH} kr/månad, ingen bindningstid.`,
  keywords: 'bästa iptv sverige 2026, iptv sverige, iptv abonnemang, iptv leverantör sverige, svenska kanaler iptv, iptv sport sverige, iptv fotboll sverige, iptv hockey, 4K streaming, HDR streaming, iptv utan buffring, iptv flera enheter, iptv pris kronor, iptv med vpn, alternativ till kabel-tv, iptv firestick, iptv apple tv, iptv samsung tv, iptv gratis test, iptv utan bindningstid',
  alternates: {
    canonical: 'https://orca4ktv.com/iptv-sweden',
    languages: {
      'sv-SE': 'https://orca4ktv.com/iptv-sweden',
      'de-DE': 'https://orca4ktv.com/iptv-germany',
      'nl-NL': 'https://orca4ktv.com/iptv-netherlands',
      'en-US': 'https://orca4ktv.com/iptv-usa',
      'en-GB': 'https://orca4ktv.com/iptv-uk',
      'en-CA': 'https://orca4ktv.com/iptv-canada',
      'x-default': 'https://orca4ktv.com/',
    },
  },
  openGraph: {
    title: 'Bästa IPTV Sverige 2026 - Svensk sport och alla kanaler i 4K | ORCA 4K TV',
    description: `Svensk elitfotboll, elithockey, skidskytte, vinterspelen 2026 och sommarens fotbollsturnering i 4K HDR. Alla viktiga svenska kanaler och 22 000+ internationella. Från ${FROM_SEK_PER_MONTH} kr/månad.`,
    type: 'website',
    url: 'https://orca4ktv.com/iptv-sweden',
    images: [{ url: 'https://orca4ktv.com/images/sweden-coverage.jpg', width: 1200, height: 630 }],
    locale: 'sv_SE',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Bästa IPTV Sverige 2026 - Svensk sport och alla kanaler i 4K | ORCA 4K TV',
    description: `Fotbollen, hockeyn, skidskyttet och alla svenska kanaler i 4K HDR utan buffring. Från ${FROM_SEK_PER_MONTH} kr/månad, ingen bindningstid.`,
  },
}

// SEO overrides from /admin/seo — null DB fields fall back to codeMetadata
export async function generateMetadata(): Promise<Metadata> {
  const base = await buildPageMetadata('iptv-sweden', codeDefaultsFrom(codeMetadata))
  return { ...codeMetadata, ...base }
}

export default function SwedenPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: 'Startsida', url: 'https://orca4ktv.com/iptv' },
          { name: 'IPTV Sverige', url: 'https://orca4ktv.com/iptv-sweden' },
        ]}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "Product",
                "@id": "https://orca4ktv.com/iptv-sweden#product",
                "mainEntityOfPage": { "@type": "WebPage", "@id": "https://orca4ktv.com/iptv-sweden" },
                "name": "Bästa IPTV Sverige 2026 - ORCA 4K TV",
                "description": "IPTV-abonnemang för Sverige med 22 000+ livekanaler: svensk elitfotboll, elithockey, europeisk klubbfotboll, skidskytte, längdskidor, vinterspelen 2026 och sommarens internationella fotbollsturnering 2026, plus alla viktiga svenska public service- och kommersiella kanaler. 4K HDR med HDR10+ och Dolby Vision.",
                "image": "https://orca4ktv.com/images/sweden-coverage.jpg",
                "brand": { "@type": "Brand", "name": "ORCA 4K TV" },
                "category": "IPTV-tjänst",
                "offers": {
                  "@type": "Offer",
                  "url": "https://orca4ktv.com/iptv-shop",
                  "priceCurrency": "USD",
                  "price": "95.00",
                  "priceValidUntil": "2026-12-31",
                  "availability": "https://schema.org/InStock",
                  "areaServed": { "@type": "Country", "name": "Sweden" },
                  "eligibleRegion": { "@type": "Country", "name": "SE" }
                },
                "aggregateRating": {
                  "@type": "AggregateRating",
                  "ratingValue": "4.8",
                  "reviewCount": "143",
                  "bestRating": "5",
                  "worstRating": "1"
                }
              },
              {
                "@type": "Service",
                "@id": "https://orca4ktv.com/iptv-sweden#service",
                "name": "ORCA 4K TV Sverige IPTV-abonnemang",
                "serviceType": "IPTV Streaming Service",
                "provider": { "@id": "https://orca4ktv.com/#organization" },
                "areaServed": { "@type": "Country", "name": "Sweden" },
                "audience": {
                  "@type": "Audience",
                  "audienceType": "Svenska hushåll som vill ersätta tv-paketet, sportintresserade familjer"
                },
                "availableLanguage": ["Swedish", "English"],
                "hoursAvailable": {
                  "@type": "OpeningHoursSpecification",
                  "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"],
                  "opens": "00:00",
                  "closes": "23:59"
                },
                "description": "IPTV-tjänst för svenska hushåll: 22 000+ livekanaler, svensk elitfotboll och elithockey, europeisk klubbfotboll, vintersport, alla viktiga svenska kanaler, 4K HDR, AES-256-kryptering, Anti Freeze CDN med server i Stockholm, stöd för Firestick, Apple TV, Android TV, Samsung, LG, iOS och Android. Support dygnet runt."
              }
            ]
          })
        }}
      />
      <SwedenHero />

      <SwedenHomePage seoContent={
      <section className="bg-[#001f3f] py-20 px-4" lang="sv">
        <div className="max-w-4xl mx-auto space-y-7">
          <p className="text-center text-yellow-400 text-xs font-black uppercase tracking-[0.3em]">
            IPTV Sverige 2026 · För dig som vill slippa tv-paketet
          </p>

          <h2 className="text-3xl md:text-5xl font-black text-white text-center leading-tight">
            Bästa IPTV Sverige 2026: fotbollen, hockeyn och alla svenska kanaler i 4K HDR
          </h2>

          <p className="text-gray-300 text-lg leading-relaxed">
            <strong className="text-white">ORCA 4K TV</strong> är byggt för svenska hushåll som är trötta på att jaga sport över tre olika appar. Här ligger <strong className="text-white">svensk elitfotboll</strong>, <strong className="text-white">elithockeyn med hela slutspelet</strong>, <strong className="text-white">europeisk klubbfotboll</strong> mitt i veckan, skidskyttet och längdåkningen på vintern, <strong className="text-white">vinterspelen i februari 2026</strong> och <strong className="text-white">sommarens stora fotbollsturnering 2026</strong> i samma kanallista som nyheterna och barnkanalerna. Över 22 000 livekanaler i 4K med HDR10+ och Dolby Vision, och 100 000 filmer och serier när det inte är match.
          </p>

          <p className="text-gray-300 text-lg leading-relaxed">
            Ett vanligt svenskt tv-paket med sporttillägg kostar lätt över 500 kr i månaden. Årsabonnemanget hos oss kostar{' '}
            <strong className="text-white">{formatSek(YEAR_1_STREAM_SEK)} kr för tolv månader</strong>, alltså runt {FROM_SEK_PER_MONTH} kr i månaden, i{' '}
            <a href="/iptv-shop/12-months" className="text-yellow-400 hover:underline">12-månadersabonnemanget</a>. Ingen tekniker, ingen parabol, ingen bindningstid. Du kan avsluta när säsongen är slut om du vill.
          </p>

          <h3 className="text-2xl md:text-3xl font-black text-white pt-6 border-t border-yellow-400/15">
            Alla svenska kanaler och all sport som spelar roll
          </h3>

          <p className="text-gray-300 text-lg leading-relaxed">
            Det här ingår i Sverige-abonnemanget:
          </p>

          <ul className="grid md:grid-cols-2 gap-4 text-gray-300 text-base leading-relaxed">
            <li className="flex gap-3"><span className="text-yellow-400 font-black mt-0.5">▸</span><span><strong className="text-white">Public service:</strong> alla viktiga public service-kanaler med regionala nyhetssändningar, kunskaps- och barnkanalerna</span></li>
            <li className="flex gap-3"><span className="text-yellow-400 font-black mt-0.5">▸</span><span><strong className="text-white">Kommersiella kanaler:</strong> de stora fria kanalerna med systerkanaler i HD, samt nöjes-, film- och dokumentärkanaler</span></li>
            <li className="flex gap-3"><span className="text-yellow-400 font-black mt-0.5">▸</span><span><strong className="text-white">Fotboll:</strong> högstaligan och superettan, cupen, europeisk klubbfotboll, landslaget och de stora internationella turneringarna</span></li>
            <li className="flex gap-3"><span className="text-yellow-400 font-black mt-0.5">▸</span><span><strong className="text-white">Hockey:</strong> hela elithockeysäsongen inklusive slutspelet, nordamerikansk hockey på natten och VM i maj</span></li>
            <li className="flex gap-3"><span className="text-yellow-400 font-black mt-0.5">▸</span><span><strong className="text-white">Vintersport:</strong> skidskytte, längdskidor, alpint, backhoppning och vinterspelen 2026</span></li>
            <li className="flex gap-3"><span className="text-yellow-400 font-black mt-0.5">▸</span><span><strong className="text-white">Nyheter och dokumentärer:</strong> svenska nyhetskanaler samt internationella nyhets-, ekonomi- och dokumentärkanaler</span></li>
            <li className="flex gap-3"><span className="text-yellow-400 font-black mt-0.5">▸</span><span><strong className="text-white">Barn och familj:</strong> svenska och nordiska barnkanaler med svenskt tal</span></li>
            <li className="flex gap-3"><span className="text-yellow-400 font-black mt-0.5">▸</span><span><strong className="text-white">100 000+ filmer och serier</strong> on demand, med nya biofilmer och originalserier från de stora streamingtjänsterna</span></li>
          </ul>

          <h3 className="text-2xl md:text-3xl font-black text-white pt-6 border-t border-yellow-400/15">
            Stockholm-server och Anti Freeze CDN
          </h3>

          <p className="text-gray-300 text-lg leading-relaxed">
            Sportåret 2026 är tätt. Vinterspelen börjar den 6 februari, hockeyslutspelet drar igång i mars, fotbollssäsongen startar i april och sommarens internationella turnering fyller juni och juli. Det är då alla vill titta samtidigt, och det är då vanliga IPTV-tjänster börjar hacka. Vår edge-server i Stockholm styr om trafiken i realtid när belastningen stiger, så att bilden håller 4K HDR från Malmö till Kiruna. Allt är krypterat med AES-256 (
            <a href="/security" className="text-yellow-400 hover:underline">NIST FIPS 197</a>), fungerar med VPN och supporten svarar dygnet runt på svenska och engelska.
          </p>

          <h3 className="text-2xl md:text-3xl font-black text-white pt-6 border-t border-yellow-400/15">
            På alla enheter du redan har
          </h3>

          <p className="text-gray-300 text-lg leading-relaxed">
            <strong className="text-white">Firestick 4K Max</strong>, <strong className="text-white">Apple TV 4K</strong>, <strong className="text-white">Android TV</strong>, Chromecast med Google TV, Samsung Tizen, LG webOS, MAG-box, iPhone, Android, Windows, Mac och webbläsaren. Upp till fyra samtidiga streams per konto. De flesta är igång inom fem minuter efter köpet. Följ{' '}
            <a href="/setup-guide" className="text-yellow-400 hover:underline">installationsguiden</a> för din enhet, eller slå upp begreppen i{' '}
            <a href="/glossary" className="text-yellow-400 hover:underline">IPTV-ordlistan</a> om något är nytt.
          </p>

          <h3 className="text-2xl md:text-3xl font-black text-white pt-6 border-t border-yellow-400/15">
            Ingen parabol. Ingen box att hyra. Ingen bindningstid.
          </h3>

          <p className="text-gray-300 text-lg leading-relaxed">
            Ingen teknikerbesök, ingen boxhyra och ingen automatisk förnyelse. Betala månadsvis eller spara upp till 62 procent med ett{' '}
            <a href="/iptv-shop" className="text-yellow-400 hover:underline">årsabonnemang</a>. Vill du testa först? Vår{' '}
            <a href="/trial" className="text-yellow-400 hover:underline font-bold">gratis provperiod</a> kräver inget kort och ger dig hela kanalbiblioteket i 4K HDR direkt.
          </p>

          <p className="text-gray-300 text-lg leading-relaxed text-center pt-6">
            Över 140 svenska hushåll har redan bytt.{' '}
            <a href="/trial" className="text-yellow-400 hover:underline font-bold">Testa gratis</a>
            {' · '}
            <a href="/iptv-shop" className="text-yellow-400 hover:underline font-bold">Se abonnemang</a>
          </p>
        </div>
      </section>
      } />
    </>
  )
}
