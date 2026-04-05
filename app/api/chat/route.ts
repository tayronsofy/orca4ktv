import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const apiKey = process.env.OPENAI_API_KEY
  if (!apiKey) {
    return NextResponse.json({ error: 'Service unavailable' }, { status: 503 })
  }

  let systemPrompt: string, userPrompt: string
  try {
    const body = await req.json()
    systemPrompt = String(body.systemPrompt || '').slice(0, 1000)
    userPrompt = String(body.userPrompt || '').slice(0, 500)
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
  }

  if (!userPrompt) {
    return NextResponse.json({ error: 'Missing prompt' }, { status: 400 })
  }

  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt },
      ],
      max_tokens: 300,
      temperature: 0.7,
    }),
  })

  if (!response.ok) {
    const err = await response.json().catch(() => ({}))
    console.error('OpenAI error:', err)
    return NextResponse.json({ error: 'Upstream error' }, { status: 502 })
  }

  const data = await response.json()
  return NextResponse.json(data)
}
