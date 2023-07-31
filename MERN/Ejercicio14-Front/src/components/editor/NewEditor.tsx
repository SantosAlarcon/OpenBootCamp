import Editor from "react-simple-code-editor";
import { Highlight } from "prism-react-renderer";
import { themes } from "prism-react-renderer";
import { Fragment, useState } from "react";

const codeSnippet =
  `
import axios from "axios";

const getUser = () => {
return axios.get("https://randomuser.me/api");
}
`

// Definir estilo del Editor
const styles: any = {
  root: {
    boxSizing: "border-box",
    fontFamily: "Fira Code"
  }
}

const highlightElement = (code: string) => (
  <Highlight theme={themes.synthwave84} code={codeSnippet} language="tsx">
    {({ style, tokens, getLineProps, getTokenProps }) => (
      <Fragment>
        {tokens.map((line, i) => (
          <div {...getLineProps({ line: line, key: i })}>
            {
              line.map((token, key) =>
                <span {...getTokenProps({ token, key })} />
              )
            }
          </div>
        ))}
      </Fragment>
    )}

  </Highlight>
)

const newEditor = () => {
  const [code, setCode] = useState<string>(codeSnippet);

  const handleChange = (newCode: string) => {
    setCode(newCode);
  }

  return (
    <Editor
      value={code}
      onValueChange={handleChange}
      highlight={highlightElement}
      padding={10}
      style={styles.root}
    />
  )

}

export default newEditor;
