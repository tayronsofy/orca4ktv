'use client'

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Underline from '@tiptap/extension-underline'
import { TextStyle } from '@tiptap/extension-text-style'
import { Color } from '@tiptap/extension-color'
import FontFamily from '@tiptap/extension-font-family'
import TextAlign from '@tiptap/extension-text-align'
import TiptapLink from '@tiptap/extension-link'
import TiptapImage from '@tiptap/extension-image'
import Youtube from '@tiptap/extension-youtube'
import Placeholder from '@tiptap/extension-placeholder'
import CharacterCount from '@tiptap/extension-character-count'
import { useEffect, useState } from 'react'

import { FaqToggleNode }  from './extensions/FaqToggleNode'
import { CalloutNode }    from './extensions/CalloutNode'
import { CtaBoxNode }     from './extensions/CtaBoxNode'
import { CtaButtonNode }  from './extensions/CtaButtonNode'
import { ProsConsNode }   from './extensions/ProsConsNode'
import { FeatureListNode } from './extensions/FeatureListNode'

interface RichTextEditorProps {
  content: string
  onChange: (html: string) => void
  placeholder?: string
}

const FONTS = [
  { label: 'Default', value: '' },
  { label: 'Inter', value: 'Inter, sans-serif' },
  { label: 'Georgia', value: 'Georgia, serif' },
  { label: 'Courier New', value: 'Courier New, monospace' },
  { label: 'Arial', value: 'Arial, sans-serif' },
]

const COLORS = [
  '#ffffff', '#ef4444', '#f97316', '#eab308',
  '#22c55e', '#3b82f6', '#8b5cf6', '#ec4899',
  '#94a3b8', '#64748b', '#1e293b', '#000000',
]

const BLOCK_DEFS = [
  { type: 'faqToggle',   icon: '❓', label: 'FAQ Toggle',    desc: 'Collapsible Q&A — Google rich snippet',  attrs: {} },
  { type: 'callout',     icon: '💡', label: 'Tip Callout',   desc: 'Tip / Warning / Info highlight box',     attrs: { variant: 'tip', title: 'Pro Tip', body: 'Your tip here.' } },
  { type: 'callout',     icon: '⚠️', label: 'Warning',       desc: 'Important alert callout',                attrs: { variant: 'warning', title: 'Important', body: 'Your warning here.' } },
  { type: 'ctaBox',      icon: '📣', label: 'CTA Box',       desc: 'Full banner with headline & button',     attrs: {} },
  { type: 'ctaButton',   icon: '🔴', label: 'CTA Button',    desc: 'Inline action button with link',         attrs: {} },
  { type: 'prosCons',    icon: '⚖️', label: 'Pros & Cons',   desc: 'Two-column comparison list',             attrs: {} },
  { type: 'featureList', icon: '✅', label: 'Feature List',  desc: 'Checkmark bullet list',                  attrs: {} },
  { type: 'callout',     icon: 'ℹ️', label: 'Info Note',     desc: 'Blue informational note box',            attrs: { variant: 'info', title: 'Note', body: 'Your note here.' } },
]

export default function RichTextEditor({ content, onChange, placeholder = 'Start writing your article here…' }: RichTextEditorProps) {
  const [blocksOpen, setBlocksOpen] = useState(false)

  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      TextStyle,
      Color,
      FontFamily,
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
      TiptapLink.configure({ openOnClick: false, HTMLAttributes: { class: 'text-red-400 underline' } }),
      TiptapImage.configure({ HTMLAttributes: { class: 'max-w-full rounded-xl my-4' } }),
      Youtube.configure({ controls: true, HTMLAttributes: { class: 'w-full rounded-xl my-4' } }),
      Placeholder.configure({ placeholder }),
      CharacterCount,
      // Custom block nodes
      FaqToggleNode,
      CalloutNode,
      CtaBoxNode,
      CtaButtonNode,
      ProsConsNode,
      FeatureListNode,
    ],
    content,
    immediatelyRender: false,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML())
    },
    editorProps: {
      attributes: {
        class: 'prose prose-invert prose-lg max-w-none min-h-[400px] focus:outline-none px-6 py-5',
      },
    },
  })

  // Sync external content changes (e.g. on edit page load)
  useEffect(() => {
    if (editor && content && editor.getHTML() !== content) {
      editor.commands.setContent(content)
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  if (!editor) return null

  function insertLink() {
    const url = window.prompt('Enter URL:')
    if (!url) return
    if (editor!.state.selection.empty) {
      const text = window.prompt('Link text:') || url
      editor!.chain().focus().insertContent(`<a href="${url}">${text}</a>`).run()
    } else {
      editor!.chain().focus().setLink({ href: url }).run()
    }
  }

  function insertImage() {
    const url = window.prompt('Enter image URL:')
    if (url) editor!.chain().focus().setImage({ src: url }).run()
  }

  function insertYoutube() {
    const url = window.prompt('Enter YouTube URL:')
    if (url) editor!.chain().focus().setYoutubeVideo({ src: url }).run()
  }

  function insertBlock(type: string, attrs: Record<string, unknown>) {
    editor!.chain().focus().insertContent({ type, attrs }).run()
    setBlocksOpen(false)
  }

  const btn = (active: boolean) =>
    `px-2 py-1.5 rounded text-sm font-bold transition-colors ${
      active
        ? 'bg-red-600 text-white'
        : 'text-gray-400 hover:text-white hover:bg-white/10'
    }`

  const divider = <div className="w-px h-5 bg-white/10 mx-1" />

  const wordCount = editor.storage.characterCount?.words() ?? 0
  const charCount = editor.storage.characterCount?.characters() ?? 0

  return (
    <div className="bg-[#0a0a0a] border border-white/10 rounded-xl">
      {/* Toolbar */}
      <div className="border-b border-white/10 px-3 py-2 flex flex-wrap items-center gap-0.5 bg-[#111315] rounded-t-xl sticky top-[57px] z-20">
        {/* History */}
        <button onClick={() => editor.chain().focus().undo().run()} title="Undo" className={btn(false)}>↩</button>
        <button onClick={() => editor.chain().focus().redo().run()} title="Redo" className={btn(false)}>↪</button>
        {divider}

        {/* Headings */}
        <button onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()} className={btn(editor.isActive('heading', { level: 1 }))}>H1</button>
        <button onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} className={btn(editor.isActive('heading', { level: 2 }))}>H2</button>
        <button onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()} className={btn(editor.isActive('heading', { level: 3 }))}>H3</button>
        <button onClick={() => editor.chain().focus().setParagraph().run()} className={btn(editor.isActive('paragraph'))}>¶</button>
        {divider}

        {/* Inline formatting */}
        <button onClick={() => editor.chain().focus().toggleBold().run()} className={btn(editor.isActive('bold'))} title="Bold"><strong>B</strong></button>
        <button onClick={() => editor.chain().focus().toggleItalic().run()} className={btn(editor.isActive('italic'))} title="Italic"><em>I</em></button>
        <button onClick={() => editor.chain().focus().toggleUnderline().run()} className={btn(editor.isActive('underline'))} title="Underline"><span className="underline">U</span></button>
        <button onClick={() => editor.chain().focus().toggleStrike().run()} className={btn(editor.isActive('strike'))} title="Strikethrough"><span className="line-through">S</span></button>
        <button onClick={() => editor.chain().focus().toggleCode().run()} className={btn(editor.isActive('code'))} title="Inline code">{'<>'}</button>
        {divider}

        {/* Lists */}
        <button onClick={() => editor.chain().focus().toggleBulletList().run()} className={btn(editor.isActive('bulletList'))} title="Bullet list">• —</button>
        <button onClick={() => editor.chain().focus().toggleOrderedList().run()} className={btn(editor.isActive('orderedList'))} title="Ordered list">1.</button>
        <button onClick={() => editor.chain().focus().toggleBlockquote().run()} className={btn(editor.isActive('blockquote'))} title="Blockquote">"</button>
        <button onClick={() => editor.chain().focus().toggleCodeBlock().run()} className={btn(editor.isActive('codeBlock'))} title="Code block">{'{}'}</button>
        {divider}

        {/* Alignment */}
        <button onClick={() => editor.chain().focus().setTextAlign('left').run()} className={btn(editor.isActive({ textAlign: 'left' }))} title="Align left">⬅</button>
        <button onClick={() => editor.chain().focus().setTextAlign('center').run()} className={btn(editor.isActive({ textAlign: 'center' }))} title="Align center">↔</button>
        <button onClick={() => editor.chain().focus().setTextAlign('right').run()} className={btn(editor.isActive({ textAlign: 'right' }))} title="Align right">➡</button>
        {divider}

        {/* Font family */}
        <select
          onChange={(e) => {
            const val = e.target.value
            if (!val) editor.chain().focus().unsetFontFamily().run()
            else editor.chain().focus().setFontFamily(val).run()
          }}
          className="bg-[#1a1d20] text-gray-400 text-xs rounded px-2 py-1.5 border border-white/10 focus:outline-none"
          title="Font family"
          defaultValue=""
        >
          {FONTS.map((f) => (
            <option key={f.value} value={f.value}>{f.label}</option>
          ))}
        </select>

        {/* Text color */}
        <div className="relative flex items-center gap-1 ml-1">
          <span className="text-gray-500 text-xs font-bold">A</span>
          <div className="flex flex-wrap gap-0.5 max-w-[100px]">
            {COLORS.map((color) => (
              <button
                key={color}
                onClick={() => editor.chain().focus().setColor(color).run()}
                title={color}
                style={{ backgroundColor: color }}
                className="w-4 h-4 rounded-sm border border-white/20 hover:scale-110 transition-transform"
              />
            ))}
          </div>
          <button
            onClick={() => editor.chain().focus().unsetColor().run()}
            className="text-gray-500 hover:text-white text-xs px-1.5 py-1 rounded border border-white/10 hover:border-white/20"
            title="Remove color"
          >
            ✕
          </button>
        </div>
        {divider}

        {/* Inserts */}
        <button onClick={insertLink} className={btn(editor.isActive('link'))} title="Insert link">🔗</button>
        <button onClick={insertImage} className={btn(false)} title="Insert image">🖼</button>
        <button onClick={insertYoutube} className={btn(false)} title="Insert YouTube video">▶</button>
        <button onClick={() => editor.chain().focus().setHorizontalRule().run()} className={btn(false)} title="Horizontal rule">—</button>
        {divider}

        {/* Blocks panel toggle */}
        <button
          onClick={() => setBlocksOpen((v) => !v)}
          title="Insert block"
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-black uppercase tracking-wider transition-colors ${
            blocksOpen
              ? 'bg-red-600 text-white'
              : 'bg-white/5 text-gray-300 hover:bg-white/10 hover:text-white border border-white/10'
          }`}
        >
          <span>⊞</span> Blocks
        </button>
      </div>

      {/* Block picker panel */}
      {blocksOpen && (
        <div className="border-b border-white/10 bg-[#0d0f11] px-4 py-4">
          <div className="flex items-center justify-between mb-3">
            <p className="text-xs font-black text-gray-400 uppercase tracking-wider">Insert Block</p>
            <p className="text-xs text-gray-600">Click a block to insert at cursor — blocks survive re-editing</p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {BLOCK_DEFS.map((block, i) => (
              <button
                key={i}
                onClick={() => insertBlock(block.type, block.attrs)}
                className="flex flex-col items-start gap-1.5 bg-[#1a1d20] hover:bg-[#1e2228] border border-white/8 hover:border-red-500/50 rounded-xl p-3 text-left transition-all group"
              >
                <span className="text-2xl leading-none">{block.icon}</span>
                <span className="text-white text-xs font-black group-hover:text-red-400 transition-colors">{block.label}</span>
                <span className="text-gray-600 text-xs leading-tight">{block.desc}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Editor body */}
      <EditorContent editor={editor} />

      {/* Footer */}
      <div className="border-t border-white/5 px-4 py-2 flex items-center justify-between rounded-b-xl">
        <span className="text-gray-600 text-xs">{wordCount} words · {charCount} characters</span>
        <button
          onClick={() => editor.chain().focus().clearContent().run()}
          className="text-gray-600 hover:text-red-400 text-xs transition-colors"
        >
          Clear
        </button>
      </div>

      <style>{`
        .tiptap p.is-editor-empty:first-child::before {
          content: attr(data-placeholder);
          float: left;
          color: #4b5563;
          pointer-events: none;
          height: 0;
        }
        .tiptap h1 { font-size: 2rem; font-weight: 900; margin: 1.5rem 0 1rem; color: white; }
        .tiptap h2 { font-size: 1.5rem; font-weight: 800; margin: 1.25rem 0 0.75rem; color: white; }
        .tiptap h3 { font-size: 1.25rem; font-weight: 700; margin: 1rem 0 0.5rem; color: white; }
        .tiptap p { color: #d1d5db; line-height: 1.8; margin-bottom: 1rem; }
        .tiptap ul, .tiptap ol { padding-left: 1.5rem; color: #d1d5db; margin-bottom: 1rem; }
        .tiptap li { margin-bottom: 0.25rem; }
        .tiptap blockquote { border-left: 3px solid #ef4444; padding-left: 1rem; margin: 1.5rem 0; color: #9ca3af; font-style: italic; }
        .tiptap code { background: #1a1d20; padding: 0.15rem 0.4rem; border-radius: 0.3rem; font-size: 0.85em; color: #f87171; }
        .tiptap pre { background: #1a1d20; padding: 1.25rem; border-radius: 0.75rem; overflow-x: auto; margin: 1.25rem 0; }
        .tiptap pre code { background: none; padding: 0; color: #e2e8f0; font-size: 0.9rem; }
        .tiptap a { color: #f87171; text-decoration: underline; }
        .tiptap strong { color: white; font-weight: 800; }
        .tiptap hr { border-color: rgba(255,255,255,0.1); margin: 2rem 0; }
        .tiptap iframe { width: 100%; aspect-ratio: 16/9; border-radius: 0.75rem; }
        /* Node view inputs */
        [data-node-view-wrapper] input,
        [data-node-view-wrapper] textarea,
        [data-node-view-wrapper] select { font-family: inherit; }
      `}</style>
    </div>
  )
}
