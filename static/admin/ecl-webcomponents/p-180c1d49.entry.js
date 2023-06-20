import { r as e, h as t, c as n } from "./p-73597efd.js";

const i = ".ecl-content-item.sc-ecl-content-item-ec{align-items:flex-start;display:flex;flex-direction:column;margin:0}.ecl-content-item--inline.sc-ecl-content-item-ec{flex-direction:row}.ecl-content-item--divider.sc-ecl-content-item-ec{border-bottom:1px solid #cfcfcf;padding-bottom:1.5rem}.ecl-content-item__content-block.sc-ecl-content-item-ec{-webkit-margin-end:auto;font:normal normal 400 1rem/1.25rem arial,sans-serif;margin-inline-end:auto;max-width:80ch}.ecl-content-item__date.sc-ecl-content-item-ec{-webkit-margin-end:1rem;flex-shrink:0;margin-inline-end:1rem}.ecl-content-item__picture.sc-ecl-content-item-ec{flex-shrink:0;margin-bottom:1rem;max-width:100%}.ecl-content-item__picture--small.sc-ecl-content-item-ec{height:140px;width:140px}.ecl-content-item__image.sc-ecl-content-item-ec{border:1px solid #cfcfcf;width:100%}@media (min-width:768px){.ecl-content-item.sc-ecl-content-item-ec{flex-direction:row}.ecl-content-item__picture.sc-ecl-content-item-ec{-webkit-margin-end:1rem;margin-bottom:0;margin-inline-end:1rem;max-width:210px}.ecl-content-item__picture--right.sc-ecl-content-item-ec{-webkit-margin-end:0;-webkit-margin-start:1rem;margin-inline-end:0;margin-inline-start:1rem;order:1}}";

const c = ".ecl-content-item.sc-ecl-content-item-eu{align-items:flex-start;display:flex;flex-direction:column;margin:0}.ecl-content-item--inline.sc-ecl-content-item-eu{flex-direction:row}.ecl-content-item--divider.sc-ecl-content-item-eu{border-bottom:1px solid #cfdaf5;padding-bottom:1.5rem}.ecl-content-item__content-block.sc-ecl-content-item-eu{-webkit-margin-end:auto;font:normal normal 400 1rem/1.25rem arial,sans-serif;margin-inline-end:auto;max-width:80ch}.ecl-content-item__date.sc-ecl-content-item-eu{-webkit-margin-end:1rem;flex-shrink:0;margin-inline-end:1rem}.ecl-content-item__picture.sc-ecl-content-item-eu{flex-shrink:0;margin-bottom:1rem;max-width:100%}.ecl-content-item__picture--small.sc-ecl-content-item-eu{height:140px;width:140px}.ecl-content-item__image.sc-ecl-content-item-eu{border:1px solid #cfdaf5;width:100%}@media (min-width:768px){.ecl-content-item.sc-ecl-content-item-eu{flex-direction:row}.ecl-content-item__picture.sc-ecl-content-item-eu{-webkit-margin-end:1rem;margin-bottom:0;margin-inline-end:1rem;max-width:210px}.ecl-content-item__picture--right.sc-ecl-content-item-eu{-webkit-margin-end:0;-webkit-margin-start:1rem;margin-inline-end:0;margin-inline-start:1rem;order:1}}";

const m = class {
  constructor(t) {
    e(this, t);
    this.styleClass = "";
    this.theme = "ec";
    this.image = undefined;
    this.imageAlt = undefined;
    this.imagePosition = "left";
    this.imageSize = "medium";
  }
  componentDidRender() {
    const e = this.el.getElementsByTagName("picture")[0];
    const t = `sc-ecl-content-item-${this.theme}`;
    if (e) {
      e.classList.add(`sc-ecl-content-item-${this.theme}`, "ecl-content-item__picture", `ecl-content-item__picture--${this.imageSize}`, `ecl-content-item__picture--${this.imagePosition}`);
      if (this.imagePosition === "right") {
        e.parentElement.style.order = "1";
      }
      const n = e.getElementsByTagName("img")[0];
      if (n) {
        n.classList.add(`ecl-content-item__image`, t);
      }
    }
    const n = this.el.querySelector(".ecl-content-block");
    if (n) {
      n.classList.add(`ecl-content-item__content-block`, t);
    }
  }
  getClass() {
    return [ `ecl-content-item`, this.styleClass ].join(" ");
  }
  render() {
    return t("article", {
      class: this.getClass()
    }, t("slot", {
      name: "picture"
    }), t("slot", {
      name: "content-block"
    }));
  }
  get el() {
    return n(this);
  }
};

m.style = {
  ec: i,
  eu: c
};

export { m as ecl_content_item };
//# sourceMappingURL=p-180c1d49.entry.js.map