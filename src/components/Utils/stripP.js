const stripPTag = (html) => {
  const wrapperRegex = /^<p>(.*)<\/p>$/s;
  const match = wrapperRegex.exec(html);
  if (match) {
    return match[1];
  }
  return html;
}

export default stripPTag;