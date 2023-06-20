import { r as t, h as i } from "./p-73597efd.js";

const s = class {
  constructor(i) {
    t(this, i);
    this.theme = "ec";
    this.itemTitle = undefined;
    this.image = undefined;
    this.imageAlt = undefined;
    this.styleClass = undefined;
    this.border = true;
  }
  getClass() {
    const t = [ `sc-ecl-navigation-list-${this.theme}`, `ecl-navigation-list__item`, this.styleClass ];
    if (!this.border) {
      t.push("ecl-navigation-list__item--no-border");
    }
    return t.join(" ");
  }
  getImgClass() {
    const t = [ `sc-ecl-navigation-list-${this.theme}`, `ecl-navigation-list__image` ];
    return t.join(" ");
  }
  getImgAttr() {
    const t = {
      role: "img"
    };
    if (this.imageAlt) {
      t["aria-label"] = this.imageAlt;
    }
    return t;
  }
  render() {
    return i("div", {
      class: this.getClass()
    }, this.image ? i("div", Object.assign({
      class: this.getImgClass(),
      style: {
        backgroundImage: "url(" + this.image + ")"
      }
    }, this.getImgAttr())) : "", i("slot", null));
  }
};

export { s as ecl_navigation_list_item };
//# sourceMappingURL=p-b433bb0c.entry.js.map