import { r as t, h as e } from "./p-73597efd.js";

const i = class {
  constructor(e) {
    t(this, e);
    this.styleClass = "";
    this.theme = "ec";
    this.path = undefined;
    this.ariaLabel = undefined;
    this.current = undefined;
    this.previous = undefined;
    this.next = undefined;
  }
  getClass() {
    const t = [ `ecl-pagination__item`, `sc-ecl-pagination-${this.theme}`, this.styleClass ];
    if (this.current) {
      t.push("ecl-pagination__item--current");
    }
    if (this.previous) {
      t.push("ecl-pagination__item--previous");
    }
    if (this.next) {
      t.push("ecl-pagination__item--next");
    }
    return t.join(" ");
  }
  render() {
    return e("li", {
      class: this.getClass()
    }, !this.current ? e("ecl-link", {
      variant: "standalone",
      path: this.path,
      "aria-label": this.ariaLabel
    }, e("slot", null), this.previous || this.next ? e("ecl-icon", {
      icon: "corner-arrow",
      size: "xs",
      theme: this.theme,
      transform: this.previous ? "rotate-270" : "rotate-90",
      slot: this.previous ? "icon-before" : "icon-after",
      "style-class": `sc-ecl-pagination-${this.theme}`
    }) : "") : "", this.current ? e("span", {
      class: `ecl-pagination__text ecl-pagination__text--summary sc-ecl-pagination-${this.theme}`
    }, e("slot", null)) : "", this.current ? e("span", {
      class: `ecl-pagination__text ecl-pagination__text--full sc-ecl-pagination-${this.theme}`
    }, this.ariaLabel) : "");
  }
};

export { i as ecl_pagination_item };
//# sourceMappingURL=p-028af358.entry.js.map