'use client'

import { Node } from '@tiptap/core'
import { NodeViewWrapper, ReactNodeViewRenderer } from '@tiptap/react'
import type { NodeViewProps } from '@tiptap/react'

function CtaBoxView({ node, updateAttributes, selected }: NodeViewProps) {
  const { headline, subtext, buttonText, buttonUrl } = node.attrs as {
    headline: string; subtext: string; buttonText: string; buttonUrl: string
  }
  return (
    <NodeViewWrapper>
      <div style={{
        background: 'linear-gradient(135deg,#1a1d20,#0a0a0a)',
        border: `1px solid ${selected ? '#ef4444' : 'rgba(239,68,68,.3)'}`,
        borderRadius: '1rem',
        padding: '1.5rem',
        margin: '1.5rem 0',
        textAlign: 'center',
      }}>
        <div style={{ color: '#6b7280', fontSize: '.65rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.1em', marginBottom: '.75rem' }}>CTA BOX</div>
        <input
          value={headline}
          onChange={(e) => updateAttributes({ headline: e.target.value })}
          placeholder="Headline…"
          style={{ display: 'block', width: '100%', background: 'transparent', border: 'none', outline: 'none', color: '#fff', fontWeight: 900, fontSize: '1.25rem', textAlign: 'center', marginBottom: '.5rem', boxSizing: 'border-box' }}
        />
        <input
          value={subtext}
          onChange={(e) => updateAttributes({ subtext: e.target.value })}
          placeholder="Supporting text…"
          style={{ display: 'block', width: '100%', background: 'transparent', border: 'none', outline: 'none', color: '#9ca3af', fontSize: '.875rem', textAlign: 'center', marginBottom: '1rem', boxSizing: 'border-box' }}
        />
        <div style={{ display: 'flex', gap: '.5rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <input
            value={buttonText}
            onChange={(e) => updateAttributes({ buttonText: e.target.value })}
            placeholder="Button text"
            style={{ background: '#dc2626', border: 'none', outline: 'none', color: '#fff', fontWeight: 800, fontSize: '.8rem', padding: '.6rem 1.25rem', borderRadius: '.625rem', textTransform: 'uppercase', letterSpacing: '.05em', cursor: 'text', minWidth: '120px', textAlign: 'center' }}
          />
          <input
            value={buttonUrl}
            onChange={(e) => updateAttributes({ buttonUrl: e.target.value })}
            placeholder="https://..."
            style={{ background: '#1a1d20', border: '1px solid rgba(255,255,255,0.15)', outline: 'none', color: '#9ca3af', fontSize: '.75rem', padding: '.6rem .875rem', borderRadius: '.625rem', minWidth: '180px' }}
          />
        </div>
      </div>
    </NodeViewWrapper>
  )
}

export const CtaBoxNode = Node.create({
  name: 'ctaBox',
  group: 'block',
  atom: true,

  addAttributes() {
    return {
      headline:   { default: 'Ready to Start Streaming?' },
      subtext:    { default: 'Get access to 22,000+ channels with zero buffering.' },
      buttonText: { default: 'Get Free Trial →' },
      buttonUrl:  { default: '#' },
    }
  },

  parseHTML() {
    return [{ tag: 'div[data-cta-box]' }]
  },

  renderHTML({ HTMLAttributes }) {
    const { headline, subtext, buttonText, buttonUrl } = HTMLAttributes
    return [
      'div',
      { 'data-cta-box': '', style: 'background:linear-gradient(135deg,#1a1d20,#0a0a0a);border:1px solid rgba(239,68,68,.3);border-radius:1rem;padding:2rem;text-align:center;margin:1.5rem 0' },
      ['h3', { style: 'color:#fff;font-size:1.5rem;font-weight:900;margin:0 0 .75rem' }, headline ?? ''],
      ['p',  { style: 'color:#9ca3af;margin:0 0 1.25rem' }, subtext ?? ''],
      ['a',  { href: buttonUrl ?? '#', style: 'display:inline-block;background:#dc2626;color:#fff;font-weight:800;font-size:.875rem;padding:.75rem 1.75rem;border-radius:.75rem;text-decoration:none;letter-spacing:.05em;text-transform:uppercase' }, buttonText ?? 'Learn More'],
    ]
  },

  addNodeView() {
    return ReactNodeViewRenderer(CtaBoxView)
  },
})
