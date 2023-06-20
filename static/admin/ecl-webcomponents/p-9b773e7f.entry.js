import { r as e, h as t } from "./p-73597efd.js";

const s = class {
  constructor(t) {
    e(this, t);
    this.theme = "ec";
    this.styleClass = undefined;
    this.link = undefined;
    this.ariaLabel = undefined;
  }
  getClass() {
    const e = [ `ecl-site-footer__list-item`, `sc-ecl-footer-${this.theme}`, this.styleClass ];
    return e.join(" ");
  }
  render() {
    return t("li", {
      class: this.getClass()
    }, t("slot", {
      name: "ecl-footer-item-desc"
    }), t("ecl-link", {
      path: this.link,
      variant: "standalone",
      styleClass: `ecl-site-footer__link sc-ecl-footer-${this.theme}`,
      theme: this.theme,
      ariaLabel: this.ariaLabel
    }, t("slot", null)));
  }
};

export { s as ecl_footer_item };
//# sourceMappingURL=p-9b773e7f.entry.js.map