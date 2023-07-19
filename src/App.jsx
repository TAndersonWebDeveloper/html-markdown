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
  padding: 30px;
  min-height: 100vh;
  background-color: #c0d8d8;

  & > p {
    font-family: "Courier New", Courier, monospace;
    font-size: 1.2rem;
  }

  & > h1 {
    font-size: 3rem;
    margin-bottom: 20px;
  }

  & > h2 {
    font-size: 2.5rem;
    margin-bottom: 20px;
  }

  & > blockquote {
    font-size: 1.2rem;
    font-style: italic;
    background-color: #e8e8e8;
    padding: 10px;
    border-radius: 5px;
    margin-bottom: 20px;
  }

  & > ul {
    list-style-type: square;
    padding-left: 20px;
    margin-bottom: 20px;
  }

  & > ol {
    list-style-type: decimal;
    padding-left: 20px;
    margin-bottom: 20px;
  }

  & > table {
    border-collapse: collapse;
    border: 1px solid black;
    margin: 20px 0;
    margin-bottom: 20px;
  }

  & > table > thead > tr > th {
    border: 1px solid black;
    padding: 10px;
    margin-bottom: 20px;
  }

  & > table > tbody > tr > td {
    border: 1px solid black;
    padding: 10px;
    margin-bottom: 20px;
  }

  & > table > tfoot > tr > td {
    border: 1px solid black;
    padding: 10px;
  }

  & > pre {
    background-color: #e8e8e8;
    padding: 10px;
    border-radius: 5px;
  }

  & > code {
    background-color: #e8e8e8;
    padding: 5px;
    border-radius: 5px;
    margin-bottom: 20px;
  }

  & a {
    color: #4aa3a3;
    text-decoration: none;
    margin-bottom: 20px;
  }

  & a:hover {
    text-decoration: underline;
  }

  & > strong {
    font-weight: bold;
  }

  & > em {
    font-style: italic;
  }

  & > del {
    text-decoration: line-through;
  }

  & > img {
    max-width: 100%;
    height: auto;
  }

  & > hr {
    border: 1px solid black;
    margin: 20px 0;
  }

  & > p > img {
    max-width: 100%;
    height: auto;
  }
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
  const [text, setText] = useState(
    "# This is a header\n\nAnd this is a paragraph. \n\n## This is a subheader\n\nHere is a [link](https://www.freecodecamp.com), and here is some inline code `<div></div>`\n\n```\n// this is multi-line code:\n\nfunction anotherExample(firstLine, lastLine) {\n  if (firstLine == '```' && lastLine == '```') {\n    return multiLineCode;\n  }\n}\n```\n\nYou can also make text **bold**... whoa!\nOr _italic_.\nOr... wait for it... **_both!_**\nAnd feel free to go crazy ~~crossing stuff out~~.\n\nThere's also [links](https://www.freecodecamp.org), and\n> Block Quotes!\n\nAnd if you want to get really crazy, even tables:\n\nWild Header | Crazy Header | Another Header?\n------------ | ------------- | ------------- \nYour content can | be here, and it | can be here....\nAnd here. | Okay. | I think we get it.\n\n- And of course there are lists.\n  - Some are bulleted.\n     - With different indentation levels.\n        - That look like this.\n\n\n1. And there are numbererd lists too.\n1. Use just 1s if you want!\n1. But the list goes on...\n- Even if you use dashes or asterisks.\n* And last but not least, let's not forget embedded images:\n\n![React Logo w/ Text](https://goo.gl/Umyytc)\n"
  );
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
          <TextEditor
            value={text}
            id="editor"
            cols={100}
            rows={10}
            onChange={handleChange}
          />
        </EditorContainer>
        <OutputContainer>
          <Header>Output</Header>
          <Output id="preview" dangerouslySetInnerHTML={getMarkdown(text)} />
        </OutputContainer>
      </Container>
      <GlobalStyles />
    </>
  );
}

export default App;
