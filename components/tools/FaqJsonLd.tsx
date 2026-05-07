export interface FaqEntry {
  question: string
  answer: string
}

interface Props {
  entries: FaqEntry[]
  id: string
}

export default function FaqJsonLd({ entries, id }: Props) {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    '@id': id,
    mainEntity: entries.map((e) => ({
      '@type': 'Question',
      name: e.question,
      acceptedAnswer: { '@type': 'Answer', text: e.answer },
    })),
  }
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}
