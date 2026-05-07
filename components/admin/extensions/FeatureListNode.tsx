'use client'

import { Node } from '@tiptap/core'
import { NodeViewWrapper, ReactNodeViewRenderer } from '@tiptap/react'
import type { NodeViewProps } from '@tiptap/react'

function FeatureListView({ node, updateAttributes, selected }: NodeViewProps) {
  const { items } = node.attrs as { items: string }
  const list = items.split('\n').filter(Boolean)

  return (
    <NodeViewWrapper>
      <div style={{ margin: '1.25rem 0', background: '#001a36', border: `1px solid ${selected ? '#ef4444' : 'rgba(255,255,255,0.08)'}`, borderRadius: '.75rem', padding: '1.25rem', overflow: 'hidden' }}>
        <div style={{ color: '#6b7280', fontSize: '.65rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.1em', marginBottom: '.75rem' }}>✅ Feature List</div>
        {/* Live preview */}
        <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 .875rem', borderBottom: '1px solid rgba(255,255,255,0.06)', paddingBottom: '.75rem' }}>
          {list.map((item, i) => (
            <li key={i} style={{ color: '#d1d5db', padding: '.35rem 0', display: 'flex', alignItems: 'center', gap: '.75rem', fontSize: '.875rem' }}>
              <span style={{ color: '#22c55e', fontWeight: 900, flexShrink: 0 }}>✓</span>
              {item}
            </li>
          ))}
        </ul>
        <textarea
          value={items}
          onChange={(e) => updateAttributes({ items: e.target.value })}
          placeholder={'Feature one\nFeature two\nFeature three'}
          rows={4}
          style={{ display: 'block', width: '100%', background: 'transparent', border: 'none', outline: 'none', color: '#6b7280', fontSize: '.8rem', lineHeight: 1.7, resize: 'vertical', boxSizing: 'border-box' }}
        />
        <div style={{ color: '#4b5563', fontSize: '.65rem', marginTop: '.25rem' }}>One feature per line - preview updates above</div>
      </div>
    </NodeViewWrapper>
  )
}

export const FeatureListNode = Node.create({
  name: 'featureList',
  group: 'block',
  atom: true,

  addAttributes() {
    return {
      items: { default: 'Feature one\nFeature two\nFeature three' },
    }
  },

  parseHTML() {
    return [{ tag: 'ul[data-feature-list]' }]
  },

  renderHTML({ HTMLAttributes }) {
    const items = (HTMLAttributes.items ?? '').split('\n').filter(Boolean)
    return [
      'ul',
      { 'data-feature-list': '', style: 'list-style:none;padding:0;margin:1.25rem 0' },
      ...items.map((item: string) => [
        'li',
        { style: 'color:#d1d5db;padding:.5rem 0;border-bottom:1px solid rgba(255,255,255,.05);display:flex;align-items:center;gap:.75rem' },
        ['span', { style: 'color:#22c55e;font-weight:900;flex-shrink:0' }, '✓'],
        item,
      ]),
    ]
  },

  addNodeView() {
    return ReactNodeViewRenderer(FeatureListView)
  },
})
