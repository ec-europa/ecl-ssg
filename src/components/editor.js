import Editor from "@ecl/ckeditor5-ecl-webcomponents/dist/ckeditor";
import React from "react"
import { CKEditor } from "@ckeditor/ckeditor5-react"

const Text = function Text(props) {
  const { textData } = props

  return (
    <CKEditor
      editor={Editor}
      data={textData}
      onReady={editor => {
        const data = editor.getData();
        console.log(data);
        // You can store the "editor" and use when it is needed.
        console.log("Editor is ready to use!", editor)
        console.log(Array.from(editor.ui.componentFactory.names()))
      }}
      onChange={(event, editor) => {
        const data = editor.getData()
        console.log("Change: ", { event, editor, data })
      }}
      onBlur={(event, editor) => {
        console.log("Blur.", editor)
      }}
      onFocus={(event, editor) => {
        console.log("Focus.", editor)
      }}
    />
  )
}

export default Text
