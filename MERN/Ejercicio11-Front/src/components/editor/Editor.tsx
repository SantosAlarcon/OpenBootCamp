import { Highlight } from 'prism-react-renderer'

interface EditorProps {
  language: string,
  children: any
}

const Editor = ({ language, children }: EditorProps) => {
  const codigo = `
const programadores = ["Carlos Azauste", "MoureDev", "Midudev"]
`
  return (
    <Highlight {...defaultProps} code={children} language={language}>
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <pre style={style}>
          {tokens.map((line, i) => (
            <div key={i} {...getLineProps({ line })}>
              <span>{i + 1}</span>
              {line.map((token, key) => (
                <span key={key} {...getTokenProps({ token })} />
              ))}
            </div>
          ))}
        </pre>
      )}
    </Highlight>
  )
}

export default Editor
