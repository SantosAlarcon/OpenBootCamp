import { Highlight } from 'prism-react-renderer'

interface EditorProps {
  language: string,
  children?: any,
  solution?: any
}

const Editor = ({ solution }: EditorProps) => {

  return (
    <Highlight code={solution} language="typescript">
      {({ style, tokens, getLineProps, getTokenProps }) => (
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
