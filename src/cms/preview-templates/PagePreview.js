import React from "react"
import PageTemplate from "../templates/PageTemplate"

const PagePreview = ({ entry, getAsset }) => {
  const data = entry.getIn(["data"]).toJS()
  // render markdown for cms preview
  const html = data.body
  const contentTop = data.contentTop;
  const iframe = document.querySelector('#preview-pane');
  const iframeHead = iframe.contentDocument.head;
  const meta = document.createElement('meta');
  meta.setAttribute('data-ecl-asset-path', '/');
  iframeHead.appendChild(meta);
  const script = document.createElement('script');
  script.type = 'module';
  script.src = 'ecl-webcomponents/ecl-webcomponents.esm.js';
  iframeHead.appendChild(script);

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