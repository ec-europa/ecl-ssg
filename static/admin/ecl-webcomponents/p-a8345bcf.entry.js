import { r as s, h as t } from "./p-73597efd.js";

const e = ".sc-ecl-picture-ec-h{display:flex}";

const i = ".sc-ecl-picture-eu-h{display:flex}";

const l = class {
  constructor(t) {
    s(this, t);
    this.styleClass = "";
    this.theme = "ec";
    this.image = undefined;
    this.imgClass = undefined;
    this.imageAlt = undefined;
  }
  getClass() {
    const s = [ `ecl-picture`, this.styleClass ];
    return s.join(" ");
  }
  getImgAttr() {
    const s = {
      src: this.image
    };
    if (this.imgClass) {
      s["class"] = this.imgClass;
    }
    if (this.imageAlt) {
      s["alt"] = this.imageAlt;
    }
    return s;
  }
  render() {
    return t("picture", {
      class: this.getClass()
    }, t("slot", null), t("img", Object.assign({}, this.getImgAttr())));
  }
};

l.style = {
  ec: e,
  eu: i
};

export { l as ecl_picture };
//# sourceMappingURL=p-a8345bcf.entry.js.map