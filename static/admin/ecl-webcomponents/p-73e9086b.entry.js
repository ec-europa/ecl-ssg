import { r as e, h as t, c as i } from "./p-73597efd.js";

const l = class {
  constructor(t) {
    e(this, t);
    this.theme = "ec";
    this.styleClass = undefined;
    this.label = undefined;
    this.type = undefined;
    this.itemTitle = undefined;
  }
  getClass() {
    const e = [ `ecl-timeline__item`, this.styleClass ];
    if (this.type === "toggle") {
      e.push("ecl-timeline__item--toggle");
    }
    return e.join(" ");
  }
  componentDidRender() {
    if (this.el.parentElement.querySelector(".ecl-timeline__item--toggle") && this.type !== "toggle") {
      this.el.firstElementChild.classList.add("ecl-timeline__item--collapsed");
    }
  }
  render() {
    return t("li", {
      class: this.getClass()
    }, this.type !== "toggle" ? t("div", {
      class: `ecl-timeline__tooltip`
    }, t("div", {
      class: `ecl-timeline__tooltip-arrow`
    }), this.label ? t("div", {
      class: `ecl-timeline__label`
    }, this.label) : "", this.itemTitle ? t("div", {
      class: `ecl-timeline__title`
    }, this.itemTitle) : "", t("div", {
      class: `ecl-timeline__content`
    }, t("slot", null))) : "", this.type === "toggle" ? t("ecl-button", {
      variant: "secondary",
      "data-ecl-timeline-button": true
    }, t("ecl-icon", {
      styleClass: "ecl-button__icon--after",
      icon: "corner-arrow",
      size: "xs",
      transform: "rotate-180",
      slot: "icon-after"
    }), t("slot", null)) : "");
  }
  get el() {
    return i(this);
  }
};

export { l as ecl_timeline_item };
//# sourceMappingURL=p-73e9086b.entry.js.map