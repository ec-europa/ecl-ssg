import React from "react";
import Content from "../components/Content";

function PageTemplate({ html, contentTop }) {
  return (
    <>
      <div dangerouslySetInnerHTML={{ __html: contentTop }} />
      <Content html={html} />
    </>
  );
}

export default PageTemplate;
