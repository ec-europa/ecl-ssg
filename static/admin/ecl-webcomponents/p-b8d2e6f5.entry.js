import { r as e, h as t, c as s } from "./p-73597efd.js";

const i = class {
  constructor(t) {
    e(this, t);
    this.theme = "ec";
    this.styleClass = undefined;
    this.external = false;
    this.current = false;
    this.hasChildren = false;
    this.child = false;
    this.link = undefined;
    this.triggerAriaLabel = undefined;
  }
  getClass() {
    let e = [ "ecl-menu__item", `sc-ecl-menu-${this.theme}`, this.styleClass ];
    if (this.current) {
      e.push("ecl-menu__item--current");
    }
    if (this.child) {
      e = [ "ecl-menu__subitem", `sc-ecl-menu-${this.theme}`, this.styleClass ];
      if (this.current) {
        e.push("ecl-menu__subitem--current");
      }
    }
    return e.join(" ");
  }
  getAttrs() {
    let e = {
      "data-ecl-menu-item": true,
      "aria-expanded": "false"
    };
    if (this.hasChildren) {
      e["data-ecl-has-children"] = true;
    }
    if (this.child) {
      delete e["data-ecl-menu-item"];
      e["data-ecl-menu-subitem"] = true;
    }
    return e;
  }
  getLinkClass() {
    let e = [ "ecl-menu__link", `sc-ecl-menu-${this.theme}` ];
    if (this.child) {
      e = [ "ecl-menu__sublink", `sc-ecl-menu-${this.theme}` ];
      if (this.current) {
        e.push("ecl-menu__sublink--current");
      }
      if (this.external) {
        e.push("ecl-link--icon-after");
      }
    }
    return e.join(" ");
  }
  render() {
    const e = this.hasChildren ? {
      "data-ecl-menu-caret": true
    } : {};
    return t("li", Object.assign({
      class: this.getClass()
    }, this.getAttrs()), t("a", {
      href: this.link,
      class: this.getLinkClass()
    }, t("slot", null), this.external ? t("ecl-icon", {
      icon: "external",
      size: "xs",
      theme: this.theme,
      styleClass: `sc-ecl-icon-${this.theme} sc-ecl-menu-${this.theme} ecl-menu__link-icon--external ${this.child ? "ecl-menu__sublink-icon" : "ecl-menu__link-icon"}`
    }) : ""), this.hasChildren ? t("ecl-button", Object.assign({
      styleClass: `ecl-menu__button-caret sc-ecl-menu-${this.theme}`,
      type: "button",
      theme: this.theme,
      variant: "ghost"
    }, e), t("ecl-icon", {
      icon: "corner-arrow",
      size: "xs",
      transform: "rotate-180",
      slot: "icon-after",
      theme: this.theme,
      styleClass: `sc-ecl-icon-${this.theme} sc-ecl-menu-${this.theme}`
    })) : "", this.hasChildren ? t("div", {
      class: `ecl-menu__mega sc-ecl-menu-${this.theme}`,
      "data-ecl-menu-mega": true
    }, t("ul", {
      class: `ecl-menu__sublist sc-ecl-menu-${this.theme}`
    }, t("slot", {
      name: "sublist"
    }))) : "");
  }
  get el() {
    return s(this);
  }
};

export { i as ecl_menu_item };
//# sourceMappingURL=p-b8d2e6f5.entry.js.map