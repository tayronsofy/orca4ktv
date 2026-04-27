'use client'

import { Node } from '@tiptap/core'
import { NodeViewWrapper, ReactNodeViewRenderer } from '@tiptap/react'
import type { NodeViewProps } from '@tiptap/react'

type BtnVariant = 'red' | 'white' | 'outline'

const VARIANT_STYLE: Record<BtnVariant, string> = {
  red:     'background:#dc2626;color:#fff;border:none',
  white:   'background:#fff;color:#000a1c;border:none',
  outline: 'background:transparent;color:#fff;border:2px solid rgba(255,255,255,0.4)',
}

function CtaButtonView({ node, updateAttributes, selected }: NodeViewProps) {
  const { text, url, variant } = node.attrs as { text: string; url: string; variant: BtnVariant }
  const style = VARIANT_STYLE[variant] ?? VARIANT_STYLE.red
  return (
    <NodeViewWrapper>
      <div style={{ margin: '1rem 0', display: 'flex', alignItems: 'center', gap: '.75rem', flexWrap: 'wrap', outline: selected ? '2px solid #ef4444' : 'none', outlineOffset: '4px', borderRadius: '.5rem' }}>
        <input
          value={text}
          onChange={(e) => updateAttributes({ text: e.target.value })}
          placeholder="Button text"
          style={{ fontWeight: 800, fontSize: '.875rem', padding: '.65rem 1.5rem', borderRadius: '.625rem', textTransform: 'uppercase', letterSpacing: '.05em', outline: 'none', cursor: 'text', ...Object.fromEntries(style.split(';').filter(Boolean).map(s => { const [k,v]=s.split(':'); return [k.trim().replace(/-([a-z])/g,(_,c)=>c.toUpperCase()), v?.trim()] })) } as React.CSSProperties}
        />
        <select
          value={variant}
          onChange={(e) => updateAttributes({ variant: e.target.value as BtnVariant })}
          style={{ background: '#001a36', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '.375rem', color: '#9ca3af', fontSize: '.7rem', padding: '.25rem .5rem' }}
        >
          <option value="red">Red</option>
          <option value="white">White</option>
          <option value="outline">Outline</option>
        </select>
        <input
          value={url}
          onChange={(e) => updateAttributes({ url: e.target.value })}
          placeholder="https://..."
          style={{ background: '#001a36', border: '1px solid rgba(255,255,255,0.1)', outline: 'none', color: '#9ca3af', fontSize: '.75rem', padding: '.35rem .75rem', borderRadius: '.375rem', flex: 1, minWidth: '150px' }}
        />
      </div>
    </NodeViewWrapper>
  )
}

export const CtaButtonNode = Node.create({
  name: 'ctaButton',
  group: 'block',
  atom: true,

  addAttributes() {
    return {
      text:    { default: 'Start Free Trial →' },
      url:     { default: '#' },
      variant: { default: 'red' },
    }
  },

  parseHTML() {
    return [{ tag: 'p[data-cta-btn]' }]
  },

  renderHTML({ HTMLAttributes }) {
    const { text, url, variant } = HTMLAttributes
    const style = `display:inline-block;font-weight:800;font-size:.875rem;padding:.75rem 1.75rem;border-radius:.75rem;text-decoration:none;letter-spacing:.05em;text-transform:uppercase;${VARIANT_STYLE[(variant as BtnVariant)] ?? VARIANT_STYLE.red}`
    return ['p', { 'data-cta-btn': '', style: 'margin:1rem 0' }, ['a', { href: url ?? '#', style }, text ?? 'Click here']]
  },

  addNodeView() {
    return ReactNodeViewRenderer(CtaButtonView)
  },
})
