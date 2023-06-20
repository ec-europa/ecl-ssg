import { r as s, h as t } from "./p-73597efd.js";

const e = class {
  constructor(t) {
    s(this, t);
    this.theme = "ec";
    this.styleClass = undefined;
    this.path = undefined;
  }
  getClass() {
    return [ `ecl-news-ticker__slide`, this.styleClass ].join(" ");
  }
  render() {
    return t("li", {
      class: this.getClass()
    }, this.path ? t("ecl-link", {
      path: this.path,
      styleClass: "ecl-news-ticker__slide-text"
    }, t("slot", null)) : t("slot", null));
  }
};

export { e as ecl_news_ticker_item };
//# sourceMappingURL=p-bdac9e37.entry.js.map