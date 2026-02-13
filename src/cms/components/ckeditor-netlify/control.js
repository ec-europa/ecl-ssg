import PropTypes from "prop-types";
import React from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import {
  ClassicEditor,
  Bold,
  Essentials,
  Heading,
  BlockToolbar,
  Italic,
  Paragraph,
  List,
  Plugin,
  ButtonView,
  GeneralHtmlSupport,
  SourceEditing,
  TextTransformation,
  Autoformat,
} from 'ckeditor5';
import EclWebComponentsPlugin, { ECL_MAIN_TOOLBAR, ECL_BLOCK_TOOLBAR, DEFAULT_ECL_CONFIG } from '@ecl/ckeditor5-ecl-webcomponents';
import 'ckeditor5/ckeditor5.css';

export class Control extends React.Component {
  static propTypes = {
    onChange: PropTypes.func.isRequired,
    forID: PropTypes.string,
    value: PropTypes.node,
    classNameWrapper: PropTypes.string.isRequired,
  };

  static defaultProps = {
    value: "",
  };

  render() {
    const { forID, value, onChange, classNameWrapper } = this.props;

    return (
      <div>
        <section className="container">
          <CKEditor
            editor={ClassicEditor}
            config={{
              plugins: [Autoformat, Essentials, Paragraph, Heading, List, Bold, Italic, BlockToolbar, EclWebComponentsPlugin, SourceEditing, TextTransformation],
              toolbar: [...ECL_MAIN_TOOLBAR, '|', 'undo', 'redo', '|', 'heading', '|', 'bold', 'italic', '|', 'numberedList', 'bulletedList', '|', 'SourceEditing' ],
              blockToolbar: ECL_BLOCK_TOOLBAR,
              licenseKey: 'GPL',
              CustomElement: {
                items: DEFAULT_ECL_CONFIG,
              },
              GeneralHtmlSupport: {
                allow: [
                  {
                    name: 'h2',
                    classes: true,
                    attributes: {
                      id: true,
                      slot: true,
                    },
                  },
                ],
              },
            }}
            onReady={editor => {
              const iframeDoc = editor.ui.view.editable.element.ownerDocument;
              const link = iframeDoc.createElement('link');
              link.rel = 'stylesheet';
              link.href = '/admin/ckeditor5.css';
              iframeDoc.head.appendChild(link);

              const otherLink = iframeDoc.createElement('link');
              otherLink.rel = 'stylesheet';
              otherLink.href = '/admin/style.css';
              iframeDoc.head.appendChild(otherLink);

              const style = iframeDoc.createElement('style')
              style.textContent = `
                :root {
                  --ck-toolbar-dropdown-max-width: 42vw;
                }
                .ck-editor__editable_inline {
                  min-height: 200px;
                }
                .ck-balloon-panel_visible {
                  max-height: calc(100vh - 20px);
                  overflow-y: auto;
                }`;

              iframeDoc.head.appendChild(style);

              editor.setData(value);
            }}
            onChange={(event, editor) => {
              const data = editor.getData();
              this.props.onChange(data);
            }}
          />
        </section>
      </div>
    );
  }
}

export default Control;