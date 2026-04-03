'use client'

import { Node, mergeAttributes } from '@tiptap/core'
import { NodeViewWrapper, ReactNodeViewRenderer } from '@tiptap/react'
import type { NodeViewProps } from '@tiptap/react'

function FaqToggleView({ node, updateAttributes, selected }: NodeViewProps) {
  const { question, answer } = node.attrs as { question: string; answer: string }
  return (
    <NodeViewWrapper>
      <div
        data-drag-handle
        style={{
          background: '#1a1d20',
          border: `1px solid ${selected ? '#ef4444' : 'rgba(255,255,255,0.1)'}`,
          borderRadius: '.75rem',
          overflow: 'hidden',
          marginBottom: '.75rem',
          userSelect: 'none',
        }}
      >
        {/* Header row */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '.75rem', padding: '.875rem 1rem', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
          <span style={{ color: '#ef4444', fontSize: '1.1rem', flexShrink: 0 }}>❓</span>
          <input
            value={question}
            onChange={(e) => updateAttributes({ question: e.target.value })}
            placeholder="Question…"
            style={{
              flex: 1,
              background: 'transparent',
              border: 'none',
              outline: 'none',
              color: '#fff',
              fontWeight: 700,
              fontSize: '.9rem',
            }}
          />
          <span style={{ color: '#ef4444', fontWeight: 900, fontSize: '1.2rem', flexShrink: 0 }}>+</span>
        </div>
        {/* Answer area */}
        <textarea
          value={answer}
          onChange={(e) => updateAttributes({ answer: e.target.value })}
          placeholder="Answer…"
          rows={3}
          style={{
            display: 'block',
            width: '100%',
            background: 'transparent',
            border: 'none',
            outline: 'none',
            padding: '.75rem 1rem',
            color: '#9ca3af',
            fontSize: '.875rem',
            lineHeight: 1.7,
            resize: 'vertical',
            boxSizing: 'border-box',
          }}
        />
        <div style={{ padding: '.25rem 1rem .5rem', color: '#4b5563', fontSize: '.7rem' }}>FAQ Toggle — collapses on the live site</div>
      </div>
    </NodeViewWrapper>
  )
}

export const FaqToggleNode = Node.create({
  name: 'faqToggle',
  group: 'block',
  atom: true,

  addAttributes() {
    return {
      question: { default: 'Your question here?' },
      answer: { default: 'Your answer here.' },
    }
  },

  parseHTML() {
    return [{ tag: 'div[data-faq-block]' }]
  },

  renderHTML({ HTMLAttributes }) {
    const q = HTMLAttributes.question ?? ''
    const a = HTMLAttributes.answer ?? ''
    return [
      'div',
      { 'data-faq-block': '', style: 'background:#1a1d20;border:1px solid rgba(255,255,255,0.08);border-radius:.75rem;overflow:hidden;margin-bottom:.75rem' },
      [
        'div',
        { 'data-faq-toggle': '', style: 'padding:1rem 1.25rem;cursor:pointer;font-weight:700;color:#fff;display:flex;justify-content:space-between;align-items:center;gap:1rem' },
        ['span', {}, q],
        ['span', { 'data-faq-icon': '', style: 'color:#ef4444;font-size:1.4rem;flex-shrink:0;line-height:1' }, '+'],
      ],
      [
        'div',
        { 'data-faq-body': '', style: 'display:none;padding:0 1.25rem 1.25rem;color:#9ca3af;line-height:1.75' },
        ['p', { style: 'color:#9ca3af;margin:0' }, a],
      ],
    ]
  },

  addNodeView() {
    return ReactNodeViewRenderer(FaqToggleView)
  },
})
