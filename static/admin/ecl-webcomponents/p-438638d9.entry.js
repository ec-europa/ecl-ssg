import { r as i, d as e, h as l } from "./p-73597efd.js";

const t = "/*! @ecl/web-components-rating-field - 0.2.0 Built on 2023-05-11T07:37:30.128Z */.ecl-rating-field{display:inline-flex;flex-direction:row-reverse}.ecl-rating-field .ecl-rating-field__input:checked~.ecl-rating-field__label .ecl-rating-field__icon-filled,.ecl-rating-field:not(.ecl-rating-field--disabled)>.ecl-rating-field__label:hover .ecl-rating-field__icon-filled,.ecl-rating-field:not(.ecl-rating-field--disabled)>.ecl-rating-field__label:hover~.ecl-rating-field__label .ecl-rating-field__icon-filled{display:inline-block}.ecl-rating-field .ecl-rating-field__input:checked~.ecl-rating-field__label .ecl-rating-field__icon-outline,.ecl-rating-field:not(.ecl-rating-field--disabled)>.ecl-rating-field__label:hover .ecl-rating-field__icon-outline,.ecl-rating-field:not(.ecl-rating-field--disabled)>.ecl-rating-field__label:hover~.ecl-rating-field__label .ecl-rating-field__icon-outline{display:none}.ecl-rating-field__input{clip:rect(0,0,0,0);border:0;-webkit-clip-path:inset(50%);clip-path:inset(50%);height:1px;margin:-1px;overflow:hidden;padding:0;position:absolute;white-space:nowrap;width:1px}.ecl-rating-field:not(.ecl-rating-field--disabled) .ecl-rating-field__input:active+.ecl-rating-field__label,.ecl-rating-field:not(.ecl-rating-field--disabled) .ecl-rating-field__input:focus+.ecl-rating-field__label{outline:2px solid #004494}.ecl-rating-field__label{cursor:pointer;margin-right:.5rem}.ecl-rating-field--disabled .ecl-rating-field__label{cursor:default}.ecl-rating-field__icon-filled{fill:#ffd617;display:none}.ecl-rating-field__icon-outline{fill:#707070}@media (min-width:480px){.ecl-rating-field__label{margin-right:.25rem}}.ecl-rating-field{margin-top:.75rem}.ecl-rating-field__icon-filled{fill:#ffd617!important}.ecl-rating-field__icon-outline{fill:#707070!important}.ecl-form-label__optional{-webkit-margin-start:.5rem;margin-inline-start:.5rem}.ecl-u-sr-only{clip:rect(0,0,0,0)!important;border:0!important;-webkit-clip-path:inset(50%)!important;clip-path:inset(50%)!important;height:1px!important;margin:-1px!important;overflow:hidden!important;padding:0!important;position:absolute!important;white-space:nowrap!important;width:1px!important}";

const n = "/*! @ecl/web-components-rating-field - 0.2.0 Built on 2023-05-11T07:37:30.128Z */.ecl-rating-field{display:inline-flex;flex-direction:row-reverse}.ecl-rating-field .ecl-rating-field__input:checked~.ecl-rating-field__label .ecl-rating-field__icon-filled,.ecl-rating-field:not(.ecl-rating-field--disabled)>.ecl-rating-field__label:hover .ecl-rating-field__icon-filled,.ecl-rating-field:not(.ecl-rating-field--disabled)>.ecl-rating-field__label:hover~.ecl-rating-field__label .ecl-rating-field__icon-filled{display:inline-block}.ecl-rating-field .ecl-rating-field__input:checked~.ecl-rating-field__label .ecl-rating-field__icon-outline,.ecl-rating-field:not(.ecl-rating-field--disabled)>.ecl-rating-field__label:hover .ecl-rating-field__icon-outline,.ecl-rating-field:not(.ecl-rating-field--disabled)>.ecl-rating-field__label:hover~.ecl-rating-field__label .ecl-rating-field__icon-outline{display:none}.ecl-rating-field__input{clip:rect(0,0,0,0);border:0;-webkit-clip-path:inset(50%);clip-path:inset(50%);height:1px;margin:-1px;overflow:hidden;padding:0;position:absolute;white-space:nowrap;width:1px}.ecl-rating-field:not(.ecl-rating-field--disabled) .ecl-rating-field__input:active+.ecl-rating-field__label,.ecl-rating-field:not(.ecl-rating-field--disabled) .ecl-rating-field__input:focus+.ecl-rating-field__label{outline:2px solid #0e47cb}.ecl-rating-field__label{cursor:pointer;margin-right:.5rem}.ecl-rating-field--disabled .ecl-rating-field__label{cursor:default}.ecl-rating-field__icon-filled{fill:#fc0;display:none}.ecl-rating-field__icon-outline{fill:#707070}@media (min-width:480px){.ecl-rating-field__label{margin-right:.25rem}}.ecl-rating-field{margin-top:.75rem}.ecl-rating-field__icon-filled{fill:#ffd617!important}.ecl-rating-field__icon-outline{fill:#707070!important}.ecl-form-label__optional{-webkit-margin-start:.5rem;margin-inline-start:.5rem}.ecl-u-sr-only{clip:rect(0,0,0,0)!important;border:0!important;-webkit-clip-path:inset(50%)!important;clip-path:inset(50%)!important;height:1px!important;margin:-1px!important;overflow:hidden!important;padding:0!important;position:absolute!important;white-space:nowrap!important;width:1px!important}";

const a = class {
  constructor(l) {
    i(this, l);
    this.inputFocus = e(this, "inputFocus", 7);
    this.inputBlur = e(this, "inputBlur", 7);
    this.inputChange = e(this, "inputChange", 7);
    this.theme = "ec";
    this.styleClass = undefined;
    this.itemId = undefined;
    this.value = undefined;
    this.name = undefined;
    this.checked = false;
    this.required = false;
    this.disabled = false;
    this.icon = "star-outline";
    this.iconFilled = "star-filled";
    this.label = undefined;
    this.hasChanged = false;
    this.isFocused = false;
  }
  handleFocus(i) {
    this.inputFocus.emit(i);
    this.isFocused = true;
  }
  handleChange(i) {
    this.inputChange.emit(i);
    this.hasChanged = true;
  }
  handleBlur(i) {
    this.inputBlur.emit(i);
    this.isFocused = false;
  }
  render() {
    return l("div", null, l("input", {
      id: this.itemId,
      class: "ecl-rating-field__input ecl-rating-field__star",
      type: "radio",
      name: this.name,
      value: this.value,
      checked: this.checked,
      required: this.required,
      disabled: this.disabled,
      onFocus: i => this.handleFocus(i),
      onBlur: i => this.handleBlur(i),
      onChange: i => this.handleChange(i)
    }), l("label", {
      class: "ecl-rating-field__label ecl-rating-field__star",
      htmlFor: this.itemId
    }, this.label ? l("span", {
      class: "ecl-u-sr-only"
    }, this.label) : "", l("ecl-icon", {
      icon: this.iconFilled,
      styleClass: "ecl-rating-field__icon-filled",
      size: "m"
    }), l("ecl-icon", {
      icon: this.icon,
      styleClass: "ecl-rating-field__icon-outline",
      size: "m"
    })));
  }
};

a.style = {
  ec: t,
  eu: n
};

export { a as ecl_rating_star };
//# sourceMappingURL=p-438638d9.entry.js.map