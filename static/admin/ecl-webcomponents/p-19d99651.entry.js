import { r as e, h as s } from "./p-73597efd.js";

const i = class {
  constructor(s) {
    e(this, s);
    this.theme = "ec";
    this.styleClass = undefined;
    this.path = undefined;
    this.icon = undefined;
    this.iconSprite = "";
    this.iconSize = "fluid";
  }
  getClass() {
    const e = [ `ecl-popover__item`, this.styleClass, `sc-ecl-popover-${this.theme}` ];
    return e.join(" ");
  }
  getLinkClass() {
    const e = [ "ecl-popover__link", `sc-ecl-popover-${this.theme}` ];
    if (this.icon) {
      e.push("ecl-link--icon");
    }
    return e.join(" ");
  }
  render() {
    return s("li", {
      class: this.getClass()
    }, s("ecl-link", {
      "style-class": `sc-ecl-popover-${this.theme} ecl-popover__link`,
      variant: "standalone",
      path: this.path
    }, this.icon ? s("ecl-icon", {
      "style-class": `sc-ecl-popover-${this.theme} ecl-link__icon`,
      icon: this.icon,
      slot: "icon-before",
      sprite: this.iconSprite || "",
      size: this.iconSize
    }) : "", s("slot", null)));
  }
};

export { i as ecl_popover_item };
//# sourceMappingURL=p-19d99651.entry.js.map