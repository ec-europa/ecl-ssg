import { r as e, h as t } from "./p-73597efd.js";

const i = class {
  constructor(t) {
    e(this, t);
    this.styleClass = "";
    this.theme = "ec";
    this.imageAlt = undefined;
    this.mediaHref = undefined;
    this.mediaIframeHref = undefined;
    this.mediaSharePath = undefined;
    this.meta = undefined;
    this.type = "image";
    this.icon = "video";
  }
  getClass() {
    return [ `ecl-gallery__item`, `sc-ecl-gallery-${this.theme}`, this.styleClass ].join(" ");
  }
  getLinkAttr() {
    const e = {
      "data-ecl-gallery-item": ""
    };
    if (this.mediaSharePath) {
      e["data-ecl-gallery-item-share"] = this.mediaSharePath;
    }
    if (this.mediaIframeHref) {
      e["data-ecl-gallery-item-embed-src"] = this.mediaIframeHref;
    }
    return e;
  }
  render() {
    return t("li", {
      class: this.getClass()
    }, t("a", Object.assign({
      href: this.mediaIframeHref ? this.mediaIframeHref : this.mediaHref,
      class: `ecl-gallery__item-link sc-ecl-gallery-${this.theme}`
    }, this.getLinkAttr()), t("figure", {
      class: `ecl-gallery__image-container sc-ecl-gallery-${this.theme}`
    }, t("slot", {
      name: "video"
    }), this.type !== "html-video" ? t("img", {
      src: this.mediaHref,
      alt: this.imageAlt,
      class: `ecl-gallery__image sc-ecl-gallery-${this.theme}`
    }) : "", this.type !== "image" ? t("ecl-icon", {
      "style-class": `ecl-gallery__image-icon sc-ecl-gallery-${this.theme}`,
      icon: this.icon,
      size: "l"
    }) : "", t("figcaption", {
      class: `ecl-gallery__description sc-ecl-gallery-${this.theme}`,
      "data-ecl-gallery-description": true
    }, t("slot", null), t("span", {
      class: `ecl-gallery__meta sc-ecl-gallery-${this.theme}`,
      "data-ecl-gallery-meta": true
    }, this.meta)))));
  }
};

export { i as ecl_gallery_item };
//# sourceMappingURL=p-89b1cb26.entry.js.map