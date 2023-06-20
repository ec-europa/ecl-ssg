import { r as e, h as t, c as s } from "./p-73597efd.js";

const i = class {
  constructor(t) {
    e(this, t);
    this.styleClass = "";
    this.theme = "ec";
    this.label = undefined;
    this.path = undefined;
    this.level = undefined;
    this.subItems = false;
    this.expanded = false;
    this.lastClicked = undefined;
  }
  clickedItem(e) {
    this.lastClicked = e.target.closest(".ecl-category-filter__list-item");
  }
  getClass() {
    return [ `ecl-category-filter__list-item`, `sc-ecl-category-filter-${this.theme}`, this.styleClass ].join(" ");
  }
  getLinkClass() {
    const e = [ `ecl-category-filter__item`, `sc-ecl-category-filter-${this.theme}`, `ecl-category-filter__item--level-${this.level}`, this.styleClass ];
    if (this.subItems) {
      e.push(`ecl-category-filter__item--has-children`);
    }
    return e.join(" ");
  }
  render() {
    const e = {};
    if (this.subItems) {
      e["aria-expanded"] = "false";
    }
    if (this.expanded) {
      e["aria-expanded"] = "true";
    }
    return t("li", Object.assign({
      class: this.getClass()
    }, e, {
      onClick: e => this.clickedItem(e)
    }), this.path ? t("ecl-link", {
      "style-class": this.getLinkClass(),
      path: this.path
    }, this.label, this.subItems ? t("ecl-icon", {
      "style-class": `ecl-category-filter__item-icon sc-ecl-category-filter-${this.theme}`,
      icon: this.level === 1 ? "corner-arrow" : "solid-arrow",
      size: this.level === 1 ? "xs" : "m",
      transform: this.level === 1 ? "rotate-180" : "rotate-90",
      slot: this.level === 1 ? "icon-after" : "icon-before"
    }) : "") : "", !this.path ? this.label : "", this.subItems ? t("ul", {
      class: `ecl-category-filter__list sc-ecl-category-filter-${this.theme}`
    }, t("slot", null)) : "");
  }
  get el() {
    return s(this);
  }
};

export { i as ecl_category_filter_item };
//# sourceMappingURL=p-82e501c1.entry.js.map