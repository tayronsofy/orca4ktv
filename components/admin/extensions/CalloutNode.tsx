'use client'

import { Node } from '@tiptap/core'
import { NodeViewWrapper, ReactNodeViewRenderer } from '@tiptap/react'
import type { NodeViewProps } from '@tiptap/react'

type Variant = 'tip' | 'warning' | 'info'

const VARIANT_CONFIG: Record<Variant, { emoji: string; color: string; bg: string; border: string; label: string }> = {
  tip:     { emoji: '💡', color: '#86efac', bg: 'rgba(34,197,94,.08)',  border: '#22c55e', label: 'Pro Tip' },
  warning: { emoji: '⚠️', color: '#fde047', bg: 'rgba(234,179,8,.08)',  border: '#eab308', label: 'Important' },
  info:    { emoji: 'ℹ️', color: '#93c5fd', bg: 'rgba(59,130,246,.08)', border: '#3b82f6', label: 'Note' },
}

function CalloutView({ node, updateAttributes, selected }: NodeViewProps) {
  const { variant, title, body } = node.attrs as { variant: Variant; title: string; body: string }
  const cfg = VARIANT_CONFIG[variant] ?? VARIANT_CONFIG.tip

  return (
    <NodeViewWrapper>
      <div style={{
        background: cfg.bg,
        borderLeft: `4px solid ${cfg.border}`,
        borderRadius: '.5rem',
        padding: '1rem 1.25rem',
        margin: '1.25rem 0',
        outline: selected ? `2px solid ${cfg.border}` : 'none',
        outlineOffset: '2px',
      }}>
        {/* Variant picker */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '.5rem', marginBottom: '.5rem' }}>
          <span style={{ fontSize: '1.1rem' }}>{cfg.emoji}</span>
          <input
            value={title}
            onChange={(e) => updateAttributes({ title: e.target.value })}
            placeholder={cfg.label}
            style={{ background: 'transparent', border: 'none', outline: 'none', color: cfg.color, fontWeight: 700, fontSize: '.875rem', flex: 1 }}
          />
          <select
            value={variant}
            onChange={(e) => updateAttributes({ variant: e.target.value as Variant })}
            style={{ background: '#1a1d20', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '.375rem', color: '#9ca3af', fontSize: '.7rem', padding: '.25rem .5rem', cursor: 'pointer' }}
          >
            <option value="tip">💡 Tip</option>
            <option value="warning">⚠️ Warning</option>
            <option value="info">ℹ️ Info</option>
          </select>
        </div>
        <textarea
          value={body}
          onChange={(e) => updateAttributes({ body: e.target.value })}
          placeholder="Callout content…"
          rows={2}
          style={{ display: 'block', width: '100%', background: 'transparent', border: 'none', outline: 'none', color: '#d1d5db', fontSize: '.875rem', lineHeight: 1.7, resize: 'vertical', boxSizing: 'border-box' }}
        />
      </div>
    </NodeViewWrapper>
  )
}

export const CalloutNode = Node.create({
  name: 'callout',
  group: 'block',
  atom: true,

  addAttributes() {
    return {
      variant: { default: 'tip' },
      title:   { default: 'Pro Tip' },
      body:    { default: 'Your callout content here.' },
    }
  },

  parseHTML() {
    return [{ tag: 'div[data-callout]' }]
  },

  renderHTML({ HTMLAttributes }) {
    const variant: Variant = (HTMLAttributes.variant as Variant) ?? 'tip'
    const cfg = VARIANT_CONFIG[variant] ?? VARIANT_CONFIG.tip
    const title = HTMLAttributes.title ?? cfg.label
    const body = HTMLAttributes.body ?? ''
    return [
      'div',
      { 'data-callout': variant, style: `background:${cfg.bg};border-left:4px solid ${cfg.border};border-radius:.5rem;padding:1rem 1.25rem;margin:1.25rem 0` },
      ['p', { style: `color:${cfg.color};font-weight:700;margin:0 0 .25rem` }, `${cfg.emoji} ${title}`],
      ['p', { style: 'color:#d1d5db;margin:0' }, body],
    ]
  },

  addNodeView() {
    return ReactNodeViewRenderer(CalloutView)
  },
})
