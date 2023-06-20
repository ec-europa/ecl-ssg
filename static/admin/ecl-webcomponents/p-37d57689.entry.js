import { r as t, h as i } from "./p-73597efd.js";

const s = class {
  constructor(i) {
    t(this, i);
    this.theme = "ec";
    this.itemTitle = undefined;
    this.image = undefined;
    this.icon = undefined;
    this.imageAlt = undefined;
    this.squareImage = false;
    this.styleClass = undefined;
  }
  getClass() {
    const t = [ `sc-ecl-list-illustration-${this.theme}`, `ecl-list-illustration__item`, this.styleClass ];
    return t.join(" ");
  }
  getImgClass() {
    const t = [ `sc-ecl-list-illustration-${this.theme}`, `ecl-list-illustration__image` ];
    if (this.squareImage) {
      t.push("ecl-list-illustration__image--square");
    }
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
    }, this.getImgAttr())) : "", i("div", {
      class: `ecl-list-illustration__detail sc-ecl-list-illustration-${this.theme}`
    }, i("div", {
      class: `ecl-list-illustration__title-container sc-ecl-list-illustration-${this.theme}`
    }, this.icon ? i("ecl-icon", {
      icon: this.icon,
      size: "xl",
      "style-class": `ecl-list-illustration__icon sc-ecl-list-illustration-${this.theme}`
    }) : "", this.itemTitle ? i("div", {
      class: `ecl-list-illustration__title sc-ecl-list-illustration-${this.theme}`
    }, this.itemTitle) : ""), i("div", {
      class: `ecl-list-illustration__description sc-ecl-list-illustration-${this.theme}`
    }, i("slot", null))));
  }
};

export { s as ecl_list_illustration_item };
//# sourceMappingURL=p-37d57689.entry.js.map