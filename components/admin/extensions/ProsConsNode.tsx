'use client'

import { Node } from '@tiptap/core'
import { NodeViewWrapper, ReactNodeViewRenderer } from '@tiptap/react'
import type { NodeViewProps } from '@tiptap/react'

function ProsConsView({ node, updateAttributes, selected }: NodeViewProps) {
  const { pros, cons } = node.attrs as { pros: string; cons: string }
  return (
    <NodeViewWrapper>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', margin: '1.5rem 0', outline: selected ? '2px solid #ef4444' : 'none', outlineOffset: '4px', borderRadius: '.75rem' }}>
        {/* Pros */}
        <div style={{ background: 'rgba(34,197,94,.08)', border: '1px solid rgba(34,197,94,.2)', borderRadius: '.75rem', padding: '1.25rem' }}>
          <div style={{ color: '#22c55e', fontWeight: 800, fontSize: '.8rem', marginBottom: '.5rem' }}>✅ PROS</div>
          <textarea
            value={pros}
            onChange={(e) => updateAttributes({ pros: e.target.value })}
            placeholder={'Pro point one\nPro point two\nPro point three'}
            rows={4}
            style={{ display: 'block', width: '100%', background: 'transparent', border: 'none', outline: 'none', color: '#d1d5db', fontSize: '.875rem', lineHeight: 1.7, resize: 'vertical', boxSizing: 'border-box' }}
          />
          <div style={{ color: '#4b5563', fontSize: '.65rem', marginTop: '.25rem' }}>One item per line</div>
        </div>
        {/* Cons */}
        <div style={{ background: 'rgba(239,68,68,.08)', border: '1px solid rgba(239,68,68,.2)', borderRadius: '.75rem', padding: '1.25rem' }}>
          <div style={{ color: '#ef4444', fontWeight: 800, fontSize: '.8rem', marginBottom: '.5rem' }}>❌ CONS</div>
          <textarea
            value={cons}
            onChange={(e) => updateAttributes({ cons: e.target.value })}
            placeholder={'Con point one\nCon point two\nCon point three'}
            rows={4}
            style={{ display: 'block', width: '100%', background: 'transparent', border: 'none', outline: 'none', color: '#d1d5db', fontSize: '.875rem', lineHeight: 1.7, resize: 'vertical', boxSizing: 'border-box' }}
          />
          <div style={{ color: '#4b5563', fontSize: '.65rem', marginTop: '.25rem' }}>One item per line</div>
        </div>
      </div>
    </NodeViewWrapper>
  )
}

export const ProsConsNode = Node.create({
  name: 'prosCons',
  group: 'block',
  atom: true,

  addAttributes() {
    return {
      pros: { default: 'Pro point one\nPro point two\nPro point three' },
      cons: { default: 'Con point one\nCon point two\nCon point three' },
    }
  },

  parseHTML() {
    return [{ tag: 'div[data-pros-cons]' }]
  },

  renderHTML({ HTMLAttributes }) {
    const pros = (HTMLAttributes.pros ?? '').split('\n').filter(Boolean)
    const cons = (HTMLAttributes.cons ?? '').split('\n').filter(Boolean)
    const liStyle = 'color:#d1d5db;margin-bottom:.35rem'
    return [
      'div',
      { 'data-pros-cons': '', style: 'display:grid;grid-template-columns:1fr 1fr;gap:1rem;margin:1.5rem 0' },
      [
        'div',
        { style: 'background:rgba(34,197,94,.08);border:1px solid rgba(34,197,94,.2);border-radius:.75rem;padding:1.25rem' },
        ['h4', { style: 'color:#22c55e;font-weight:800;margin:0 0 .75rem' }, '✅ Pros'],
        ['ul', { style: 'color:#d1d5db;padding-left:1.25rem;margin:0' },
          ...pros.map((p: string) => ['li', { style: liStyle }, p]),
        ],
      ],
      [
        'div',
        { style: 'background:rgba(239,68,68,.08);border:1px solid rgba(239,68,68,.2);border-radius:.75rem;padding:1.25rem' },
        ['h4', { style: 'color:#ef4444;font-weight:800;margin:0 0 .75rem' }, '❌ Cons'],
        ['ul', { style: 'color:#d1d5db;padding-left:1.25rem;margin:0' },
          ...cons.map((c: string) => ['li', { style: liStyle }, c]),
        ],
      ],
    ]
  },

  addNodeView() {
    return ReactNodeViewRenderer(ProsConsView)
  },
})
