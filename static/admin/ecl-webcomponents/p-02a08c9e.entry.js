import { r as e, h as t } from "./p-73597efd.js";

const i = class {
  constructor(t) {
    e(this, t);
    this.theme = "ec";
    this.styleClass = undefined;
    this.path = undefined;
  }
  getClass() {
    return [ `ecl-inpage-navigation__item`, `sc-ecl-inpage-navigation-${this.theme}`, this.styleClass ].join(" ");
  }
  render() {
    return t("li", {
      class: this.getClass()
    }, t("ecl-link", {
      path: this.path,
      "style-class": `ecl-inpage-navigation__link sc-ecl-inpage-navigation-${this.theme}`,
      "data-ecl-inpage-navigation-link": true
    }, t("slot", null)));
  }
};

export { i as ecl_inpage_navigation_item };
//# sourceMappingURL=p-02a08c9e.entry.js.map