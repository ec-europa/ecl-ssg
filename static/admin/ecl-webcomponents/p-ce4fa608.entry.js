import { r as e, h as s, c as t } from "./p-73597efd.js";

const a = class {
  constructor(s) {
    e(this, s);
    this.theme = "ec";
    this.styleClass = undefined;
    this.path = undefined;
    this.langCode = undefined;
    this.language = undefined;
    this.active = false;
  }
  getClass() {
    const e = [ `ecl-site-header__language-item`, `sc-ecl-site-header-${this.theme}`, this.styleClass ];
    return e.join(" ");
  }
  render() {
    return s("li", {
      class: this.getClass()
    }, s("a", {
      href: this.path,
      class: `ecl-link ecl-link--standalone ecl-site-header__language-link sc-ecl-site-header-${this.theme} ${this.active ? "ecl-site-header__language-link--active" : ""}`
    }, s("span", {
      class: `ecl-site-header__language-link-code sc-ecl-site-header-${this.theme}`
    }, this.langCode), s("span", {
      class: `ecl-site-header__language-link-label sc-ecl-site-header-${this.theme}`
    }, this.language)));
  }
  get el() {
    return t(this);
  }
};

export { a as ecl_language_item };
//# sourceMappingURL=p-ce4fa608.entry.js.map