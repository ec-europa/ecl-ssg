import { r as l, h as e, c as i } from "./p-73597efd.js";

const o = ".ecl-social-media-follow.sc-ecl-social-media-follow-ec{background-color:#f5f5f5;border:1px solid #cfcfcf;border-radius:0;margin:0;padding:1.5rem}.ecl-social-media-follow__description.sc-ecl-social-media-follow-ec{color:#404040;font:normal normal 400 1rem/1.5rem arial,sans-serif;font-weight:700;margin-bottom:.5rem;margin-top:0}.ecl-social-media-follow__list.sc-ecl-social-media-follow-ec{-webkit-padding-start:0;align-items:center;display:flex;flex-wrap:wrap;list-style:none;margin-bottom:0;margin-top:-.75rem;padding-inline-start:0}.ecl-social-media-follow__item.sc-ecl-social-media-follow-ec{-webkit-margin-end:1.5rem;display:flex;margin-inline-end:1.5rem;margin-top:1.5rem}.ecl-social-media-follow__item.sc-ecl-social-media-follow-ec:last-child{-webkit-margin-end:0;margin-inline-end:0}.ecl-social-media-follow__link.sc-ecl-social-media-follow-ec{align-items:center;display:flex;font:normal normal 400 .875rem/1rem arial,sans-serif;overflow:hidden}.ecl-social-media-follow__icon.sc-ecl-social-media-follow-ec{flex-shrink:0;top:0!important}.ecl-social-media-follow--vertical.sc-ecl-social-media-follow-ec .ecl-social-media-follow__description.sc-ecl-social-media-follow-ec{margin-bottom:0}.ecl-social-media-follow--vertical.sc-ecl-social-media-follow-ec .ecl-social-media-follow__list.sc-ecl-social-media-follow-ec{align-items:flex-start;flex-direction:column;margin-top:0}.ecl-social-media-follow--vertical.sc-ecl-social-media-follow-ec .ecl-social-media-follow__item.sc-ecl-social-media-follow-ec,.ecl-social-media-follow--vertical.sc-ecl-social-media-follow-ec .ecl-social-media-follow__item.sc-ecl-social-media-follow-ec:last-child{-webkit-margin-end:0;margin-inline-end:0}@media (max-width:767px){.ecl-social-media-follow__description.sc-ecl-social-media-follow-ec{margin-bottom:0}.ecl-social-media-follow__list.sc-ecl-social-media-follow-ec{align-items:flex-start;flex-direction:column;margin-top:0}.ecl-social-media-follow__item.sc-ecl-social-media-follow-ec,.ecl-social-media-follow__item.sc-ecl-social-media-follow-ec:last-child{-webkit-margin-end:0;margin-inline-end:0}}";

const a = ".ecl-social-media-follow.sc-ecl-social-media-follow-eu{background-color:#f3f6fc;border:0;border-radius:4px;margin:0;padding:1.5rem}.ecl-social-media-follow__description.sc-ecl-social-media-follow-eu{font:normal normal 400 1rem/1.5rem arial,sans-serif;font-weight:700;margin-bottom:.5rem;margin-top:0}.ecl-social-media-follow__list.sc-ecl-social-media-follow-eu{-webkit-padding-start:0;align-items:center;display:flex;flex-wrap:wrap;list-style:none;margin-bottom:0;margin-top:-.75rem;padding-inline-start:0}.ecl-social-media-follow__item.sc-ecl-social-media-follow-eu{-webkit-margin-end:1.5rem;display:flex;margin-inline-end:1.5rem;margin-top:1.5rem}.ecl-social-media-follow__item.sc-ecl-social-media-follow-eu:last-child{-webkit-margin-end:0;margin-inline-end:0}.ecl-social-media-follow__link.sc-ecl-social-media-follow-eu{align-items:center;display:flex;font:normal normal 400 .875rem/1rem arial,sans-serif;overflow:hidden}.ecl-social-media-follow__icon.sc-ecl-social-media-follow-eu{flex-shrink:0;top:0!important}.ecl-social-media-follow--vertical.sc-ecl-social-media-follow-eu .ecl-social-media-follow__description.sc-ecl-social-media-follow-eu{margin-bottom:0}.ecl-social-media-follow--vertical.sc-ecl-social-media-follow-eu .ecl-social-media-follow__list.sc-ecl-social-media-follow-eu{align-items:flex-start;flex-direction:column;margin-top:0}.ecl-social-media-follow--vertical.sc-ecl-social-media-follow-eu .ecl-social-media-follow__item.sc-ecl-social-media-follow-eu,.ecl-social-media-follow--vertical.sc-ecl-social-media-follow-eu .ecl-social-media-follow__item.sc-ecl-social-media-follow-eu:last-child{-webkit-margin-end:0;margin-inline-end:0}@media (max-width:767px){.ecl-social-media-follow__description.sc-ecl-social-media-follow-eu{margin-bottom:0}.ecl-social-media-follow__list.sc-ecl-social-media-follow-eu{align-items:flex-start;flex-direction:column;margin-top:0}.ecl-social-media-follow__item.sc-ecl-social-media-follow-eu,.ecl-social-media-follow__item.sc-ecl-social-media-follow-eu:last-child{-webkit-margin-end:0;margin-inline-end:0}}";

const c = class {
  constructor(e) {
    l(this, e);
    this.theme = "ec";
    this.styleClass = undefined;
    this.variant = "horizontal";
    this.description = undefined;
  }
  getClass() {
    return [ `ecl-social-media-follow`, `ecl-social-media-follow--${this.variant}`, this.styleClass ].join(" ");
  }
  componentDidRender() {
    if (this.el.querySelector(".ecl-social-media-follow__list")) {
      const l = this.el.querySelector(".ecl-social-media-follow__list");
      const e = this.el.getElementsByTagName("ecl-popover")[0] || false;
      if (e) {
        const l = document.createElement("li");
        l.classList.add("ecl-social-media-follow__item", `sc-ecl-social-media-follow-${this.theme}`);
        e.parentNode.insertBefore(l, e);
        l.appendChild(e);
        l.querySelector(".ecl-popover__toggle").classList.add(`ecl-social-media-follow__link`, `sc-ecl-social-media-follow-${this.theme}`);
      }
      const i = this.el.querySelectorAll(".ecl-social-media-follow__item");
      l.innerHTML = "";
      l.append(...i);
    }
  }
  render() {
    return e("div", {
      class: this.getClass()
    }, this.description ? e("p", {
      class: "ecl-social-media-follow__description"
    }, this.description) : "", e("ul", {
      class: "ecl-social-media-follow__list"
    }, e("slot", null)));
  }
  get el() {
    return i(this);
  }
};

c.style = {
  ec: o,
  eu: a
};

export { c as ecl_social_media_follow };
//# sourceMappingURL=p-d9ab3bf9.entry.js.map