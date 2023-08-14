// load specific languages only
import './styles/mainStyles.scss'

import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight'
import Document from '@tiptap/extension-document'
import Paragraph from '@tiptap/extension-paragraph'
import Text from '@tiptap/extension-text'
import { EditorContent, ReactNodeViewRenderer, useEditor } from '@tiptap/react'
import hljs from 'highlight.js'
import typescript from "highlight.js/lib/languages/typescript"

// load all highlight.js languages
import { lowlight } from "lowlight"

import CodeBlock from './CodeBlock'

hljs.registerLanguage('typescript', typescript)

const MenuBar = ({ editor }) => {
    if (!editor) {
        return null
    }

    return (
        <button onClick={() => editor.chain().focus().toggleCodeBlock().run()} className={editor.isActive('codeBlock') ? 'is-active' : ''}>
            code block
        </button>
    )
}

const TipTapEditor = () => {
    const editor = useEditor({
        extensions: [
            Document,
            Paragraph,
            Text,
            CodeBlockLowlight
                .extend({
                    addNodeView() {
                        return ReactNodeViewRenderer(CodeBlock)
                    }
                })
                .configure({ lowlight }),
        ],
        content: `
        <pre><code class="language-typescript">
// Añade tu código aquí

</code></pre>
              `,
    })

    return (
        <div>
            <EditorContent style={{textAlign: "left"}} editor={editor} />
        </div>
    )
}

export default TipTapEditor;
