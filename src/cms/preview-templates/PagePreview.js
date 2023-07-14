import React from "react"
import PageTemplate from "../templates/PageTemplate"

const PagePreview = ({ entry, getAsset }) => {
  const data = entry.getIn(["data"]).toJS()
  // render markdown for cms preview
  const html = data.body
  const contentTop = data.contentTop;
  const iframe = document.querySelector('#preview-pane');
  const iframeHead = iframe.contentDocument.head;
  const script = document.createElement('script');
  script.type = 'module';
  script.src = 'ecl-webcomponents/ecl-webcomponents.esm.js';
  iframeHead.appendChild(script);
  const meta = document.createElement('meta');
  meta.setAttribute('name', 'ecl-asset-path');
  meta.setAttribute('content', '/');
  iframeHead.appendChild(meta);

  if (html) {
    return (
      <PageTemplate
        html={html}
        contentTop={contentTop}
      />
    )
  } else {
    return <div>Loading...</div>
  }
}

export default PagePreview