import PropTypes from "prop-types";
import React from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import Editor from "../../../../../ecl-webcomponents/playground/editor/ckeditor";

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
            editor={Editor}
            onReady={editor => {
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