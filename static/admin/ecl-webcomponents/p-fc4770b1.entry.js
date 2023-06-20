import { r as e, h as s } from "./p-73597efd.js";

const i = class {
  constructor(s) {
    e(this, s);
    this.theme = "ec";
    this.styleClass = undefined;
    this.sharePath = undefined;
    this.icon = undefined;
  }
  getClass() {
    return [ `ecl-social-media-share__item`, `sc-ecl-social-media-share-${this.theme}`, this.styleClass ].join(" ");
  }
  render() {
    return s("li", {
      class: this.getClass()
    }, s("ecl-link", {
      "style-class": `ecl-link ecl-link--standalone ecl-link--icon-before ecl-social-media-share__link sc-ecl-social-media-share-${this.theme}`,
      path: this.sharePath,
      "icon-position": "before"
    }, s("ecl-icon", {
      slot: "icon-before",
      sprite: "icons-social-media",
      icon: this.icon,
      size: "m"
    }), s("slot", null)));
  }
};

export { i as ecl_social_media_share_item };
//# sourceMappingURL=p-fc4770b1.entry.js.map