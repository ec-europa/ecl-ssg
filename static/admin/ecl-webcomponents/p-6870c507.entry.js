import { r as e, h as t, c as l } from "./p-73597efd.js";

const s = class {
  constructor(t) {
    e(this, t);
    this.theme = "ec";
    this.styleClass = undefined;
    this.toggleLabel = undefined;
    this.others = false;
  }
  getClass() {
    const e = [ `ecl-file__translation-container`, `sc-ecl-file-${this.theme}`, this.styleClass ];
    return e.join(" ");
  }
  componentDidRender() {
    const e = this.el.querySelectorAll(".ecl-file__translation-item").length;
    const t = document.createTextNode(`( ${e} )`);
    if (this.el.querySelector(".ecl-file__translation-toggle")) {
      this.el.querySelector(".ecl-file__translation-toggle .ecl-button__label").appendChild(t);
    }
  }
  render() {
    return t("div", {
      class: this.getClass(),
      "data-ecl-file-translation-container": true
    }, t("ecl-button", {
      styleClass: `ecl-file__translation-toggle sc-ecl-file-${this.theme}`,
      variant: "ghost",
      "data-ecl-file-translation-toggle": true,
      theme: this.theme
    }, this.toggleLabel, t("ecl-icon", {
      styleClass: "ecl-button__icon ecl-button__icon--after",
      icon: "corener-arrow",
      transform: "rotate-180",
      size: "fluid"
    })), t("ul", {
      class: `ecl-file__translation-list sc-ecl-file-${this.theme}`
    }, t("slot", null), this.others ? t("li", {
      class: `ecl-file__translation-item ecl-file__translation-description sc-ecl-file-${this.theme}`
    }, t("slot", {
      name: "others"
    })) : ""));
  }
  get el() {
    return l(this);
  }
};

export { s as ecl_file_translations };
//# sourceMappingURL=p-6870c507.entry.js.map