import { marked } from "marked";
import { styled } from "styled-components";
import { GlobalStyles } from "./globalStyles";
import { useState } from "react";

const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #66baba;
`;

const TextEditor = styled.textarea`
  background-color: #c0d8d8;
  overflow-y: scroll;
  font-family: "Courier New", Courier, monospace;
  font-size: 1.2rem;
  resize: vertical;
  padding: 10px;

  &:focus {
    outline: none;
  }
`;

const Output = styled.div`
  padding: 10px;
  min-height: 100vh;
  background-color: #c0d8d8;
`;

const Header = styled.h1`
  background-color: #4aa3a3;
  padding: 10px;
  margin: 0;
  font-size: 1.5rem;
`;

const EditorContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 30%;
  margin-top: 20px;
  border: 1px solid black;
`;

const OutputContainer = styled.div`
  margin: 20px 0;
  display: flex;
  flex-direction: column;
  width: 50%;
  border: 1px solid black;
`;

function App() {
  const [text, setText] = useState("");
  const html = marked(text);

  const handleChange = (event) => {
    setText(event.target.value);
  };

  const getMarkdown = (FORM_INPUT) => {
    if (FORM_INPUT) {
      let markdown = marked(FORM_INPUT, { sanitize: true });
      return { __html: markdown };
    }
  };

  return (
    <>
      <Container>
        <EditorContainer>
          <Header>Text Editor</Header>
          <TextEditor cols={100} rows={10} onChange={handleChange} />
        </EditorContainer>
        <OutputContainer>
          <Header>Output</Header>
          <Output dangerouslySetInnerHTML={getMarkdown(text)} />
        </OutputContainer>
      </Container>
      <GlobalStyles />
    </>
  );
}

export default App;
