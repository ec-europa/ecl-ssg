import { r as e, h as s, c as t } from "./p-73597efd.js";

const i = class {
  constructor(s) {
    e(this, s);
    this.theme = "ec";
    this.styleClass = undefined;
    this.variant = undefined;
    this.path = undefined;
    this.currentPage = false;
    this.ellipsis = false;
    this.buttonAriaLabel = "";
  }
  getClass() {
    const e = [ `ecl-breadcrumb__segment`, `sc-ecl-breadcrumb-${this.theme}`, this.styleClass ];
    if (this.ellipsis) {
      e.push("ecl-breadcrumb__segment--ellipsis");
    }
    if (this.currentPage) {
      e.push("ecl-breadcrumb__current-page");
    }
    return e.join(" ");
  }
  getLinkClass() {
    const e = [ `sc-ecl-breadcrumb-${this.theme}`, "ecl-breadcrumb__link", "ecl-link--no-visited" ];
    if (this.el.closest(".ecl-breadcrumb--negative")) {
      e.push("ecl-link--negative");
    }
    return e.join(" ");
  }
  getLiAttrs() {
    const e = {
      "data-ecl-breadcrumb-item": "static"
    };
    if (this.ellipsis) {
      e["data-ecl-breadcrumb-ellipsis"] = "data-ecl-breadcrumb-ellipsis";
    }
    return e;
  }
  render() {
    return s("li", Object.assign({
      class: this.getClass()
    }, this.getLiAttrs()), !this.currentPage && !this.ellipsis ? s("ecl-link", {
      variant: "standalone",
      path: this.path,
      "style-class": this.getLinkClass()
    }, s("ecl-icon", {
      slot: "icon-after",
      "style-class": `ecl-breadcrumb__icon sc-ecl-breadcrumb-${this.theme}`,
      icon: "corner-arrow",
      transform: "rotate-90",
      size: "2xs"
    }), s("slot", null)) : s("slot", null), this.ellipsis ? s("ecl-button", {
      "style-class": `ecl-breadcrumb__ellipsis sc-ecl-breadcrumb-${this.theme}`,
      variant: "ghost",
      "data-ecl-breadcrumb-ellipsis-button": true,
      "aria-label": this.buttonAriaLabel
    }, "...", s("ecl-icon", {
      "style-class": `ecl-breadcrumb__icon sc-ecl-breadcrumb-${this.theme}`,
      size: "2xs",
      transform: "rotate-90",
      icon: "corner-arrow",
      slot: "icon-after"
    })) : "", this.currentPage ? s("slot", null) : "");
  }
  get el() {
    return t(this);
  }
};

export { i as ecl_breadcrumb_item };
//# sourceMappingURL=p-df467b35.entry.js.map