import { r as e, h as r } from "./p-73597efd.js";

const a = '.ecl-card.sc-ecl-card-ec{background-color:#f5f5f5;border:1px solid #cfcfcf;border-radius:0;box-shadow:none;box-sizing:border-box;height:100%;margin:0;overflow:hidden;overflow-wrap:break-word;width:100%}.ecl-card__image.sc-ecl-card-ec{-webkit-margin-start:1rem;-webkit-margin-end:1rem;background-position:50%;background-repeat:no-repeat;background-size:cover;border:1px solid #cfcfcf;display:block;height:auto;margin-inline-end:1rem;margin-inline-start:1rem;margin-top:1rem;width:calc(100% - 2rem - 2px)}.ecl-card__image.sc-ecl-card-ec:before{content:"";display:block;padding-top:66.6666666667%;width:100%}.ecl-card__body.sc-ecl-card-ec{padding:1rem;position:relative}';

const c = '.ecl-card.sc-ecl-card-eu{background-color:#fff;border:0;border-radius:8px;box-shadow:0 2px 4px rgba(9,49,142,.08),0 0 10px rgba(9,49,142,.04),0 4px 5px rgba(9,49,142,.04),0 -4px 4px rgba(9,49,142,.04);box-sizing:border-box;height:100%;margin:0;overflow:hidden;overflow-wrap:break-word;width:100%}.ecl-card__image.sc-ecl-card-eu{-webkit-margin-start:0;-webkit-margin-end:0;background-position:50%;background-repeat:no-repeat;background-size:cover;border:0 solid #cfdaf5;display:block;height:auto;margin-inline-end:0;margin-inline-start:0;margin-top:0;width:100%}.ecl-card__image.sc-ecl-card-eu:before{content:"";display:block;padding-top:66.6666666667%;width:100%}.ecl-card__body.sc-ecl-card-eu{padding:1.5rem;position:relative}.ecl-card__body.sc-ecl-card-eu:before{background-color:#fc0;border-bottom-left-radius:2px;border-bottom-right-radius:2px;content:"";height:4px;left:1.5rem;position:absolute;top:0;width:32px}';

const i = class {
  constructor(r) {
    e(this, r);
    this.styleClass = "";
    this.theme = "ec";
    this.image = undefined;
    this.imageAlt = undefined;
  }
  getClass() {
    return [ `ecl-card`, this.styleClass ].join(" ");
  }
  getImgAttr() {
    const e = {
      class: "ecl-card__image",
      role: "img"
    };
    if (this.imageAlt) {
      e["alt"] = this.imageAlt;
    }
    return e;
  }
  render() {
    return r("article", {
      class: this.getClass()
    }, r("div", Object.assign({
      style: {
        backgroundImage: "url(" + this.image + ")"
      }
    }, this.getImgAttr())), r("div", {
      class: "ecl-card__body"
    }, r("slot", null)));
  }
};

i.style = {
  ec: a,
  eu: c
};

export { i as ecl_card };
//# sourceMappingURL=p-2fcb2852.entry.js.map