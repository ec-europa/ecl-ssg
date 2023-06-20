import { r as e, h as t } from "./p-73597efd.js";

const i = class {
  constructor(t) {
    e(this, t);
    this.theme = "ec";
    this.styleClass = undefined;
    this.variant = "default";
    this.meta = undefined;
    this.fileTitle = undefined;
    this.downloadLink = undefined;
    this.downloadLabel = undefined;
    this.language = undefined;
  }
  getClass() {
    const e = [ `ecl-file__translation-item`, `sc-ecl-file-${this.theme}`, this.styleClass ];
    return e.join(" ");
  }
  getChildrenClass() {
    return `ecl-file__translation-${this.variant === "default" ? "info" : "detail"}`;
  }
  getTitle() {
    return t("div", {
      class: `ecl-file__translation-title sc-ecl-file-${this.theme}`,
      lang: this.language
    }, this.fileTitle);
  }
  getMeta() {
    return t("div", {
      class: `ecl-file__translation-meta sc-ecl-file-${this.theme}`
    }, this.meta);
  }
  render() {
    return t("li", {
      class: this.getClass()
    }, this.variant == "thumbnail" ? t("div", {
      class: `ecl-file__translation-detail sc-ecl-file-${this.theme}`
    }, this.getTitle()) : "", this.variant == "thumbnail" ? t("div", {
      class: `ecl-file__translation-info sc-ecl-file-${this.theme}`
    }, this.getMeta()) : t("div", {
      class: `ecl-file__translation-info sc-ecl-file-${this.theme}`
    }, this.getTitle(), this.getMeta()), t("ecl-link", {
      path: this.downloadLink,
      variant: "standalone",
      styleClass: `ecl-file__translation-download sc-ecl-file-${this.theme}`,
      theme: this.theme
    }, this.downloadLabel, t("ecl-icon", {
      slot: "icon-after",
      size: "fluid",
      icon: "download",
      theme: this.theme
    })));
  }
};

export { i as ecl_file_translations_item };
//# sourceMappingURL=p-c098bbf5.entry.js.map