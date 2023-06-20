import { r as e, h as c, c as t } from "./p-73597efd.js";

const s = "/*! @ecl/web-components-accordion - 0.2.0 Built on 2023-05-11T07:34:51.858Z */:host{display:block}";

const i = class {
  constructor(c) {
    e(this, c);
    this.styleClass = undefined;
    this.label = undefined;
    this.expanded = undefined;
    this.theme = "ec";
  }
  getClass() {
    return [ `ecl-accordion__item`, `sc-ecl-accordion-${this.theme}`, this.styleClass ].join(" ");
  }
  render() {
    return c("div", {
      class: this.getClass()
    }, c("h3", {
      class: `ecl-accordion__title sc-ecl-accordion-${this.theme}`
    }, c("button", {
      "data-ecl-accordion-toggle": true,
      "aria-controls": `${this.el.id}-content`,
      class: `ecl-accordion__toggle sc-ecl-accordion-${this.theme}`,
      "aria-expanded": this.expanded ? "true" : "false"
    }, c("span", {
      class: `ecl-accordion__toggle-flex sc-ecl-accordion-${this.theme}`
    }, c("span", {
      class: `ecl-accordion__toggle-indicator sc-ecl-accordion-${this.theme}`
    }, c("ecl-icon", {
      icon: this.expanded ? "minus" : "plus",
      theme: this.theme,
      size: "m",
      "style-class": `ecl-accordion__toggle-icon sc-ecl-accordion-${this.theme}`,
      "data-ecl-accordion-icon": true
    })), c("span", {
      class: `ecl-accordion__toggle-title sc-ecl-accordion-${this.theme}`
    }, this.label)))), c("div", {
      class: `ecl-accordion__content sc-ecl-accordion-${this.theme}`,
      role: "region",
      id: `${this.el.id}-content`,
      hidden: this.expanded !== true
    }, c("slot", null)));
  }
  static get assetsDirs() {
    return [ "build" ];
  }
  get el() {
    return t(this);
  }
};

i.style = s;

export { i as ecl_accordion_item };
//# sourceMappingURL=p-30dcd816.entry.js.map