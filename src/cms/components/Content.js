import React from "react"
import { defineCustomElements } from "@ecl/ecl-webcomponents-react"
/**
 * Section for markdown content (prose)
 * applies max width and padding
 */
defineCustomElements();

function Content({ className, html }) {
  return (
    <>
    <script type="module" src="/ecl-webcomponents/ecl-webcomponents.esm.js"></script>
    <div className={`max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8 ${className}`}>
      <div
        className="prose mx-auto prose-green md:prose-lg"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
    </>
  )
}

export default Content