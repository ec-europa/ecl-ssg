import { r as e, h as t } from "./p-73597efd.js";

const i = class {
  constructor(t) {
    e(this, t);
    this.styleClass = "";
    this.bannerTitle = "";
    this.bannerVariant = "";
    this.image = "";
    this.theme = "ec";
    this.ctaLink = undefined;
    this.ctaLabel = undefined;
    this.size = "m";
    this.ariaLabel = undefined;
    this.centered = undefined;
  }
  getClass() {
    return [ `ecl-carousel__item`, this.styleClass ].join(" ");
  }
  render() {
    return t("div", {
      class: "ecl-carousel__slide",
      role: "group",
      "aria-label": this.ariaLabel
    }, t("ecl-banner", {
      "banner-title": this.bannerTitle,
      image: this.image,
      variant: this.bannerVariant,
      theme: this.theme,
      "cta-link": this.ctaLink,
      "cta-label": this.ctaLabel,
      centered: this.centered,
      size: this.size
    }, t("slot", null)));
  }
};

export { i as ecl_carousel_item };
//# sourceMappingURL=p-9bbe4a8d.entry.js.map