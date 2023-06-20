import { r as e, h as a, c as i } from "./p-73597efd.js";

const s = ".ecl-social-media-share.sc-ecl-social-media-share-ec{background-color:#fff;border:0;border-radius:0;margin:0;padding:0}.ecl-social-media-share__description.sc-ecl-social-media-share-ec{color:#404040;font:normal normal 400 1rem/1.5rem arial,sans-serif;font-weight:700;margin-bottom:.5rem;margin-top:0}.ecl-social-media-share__list.sc-ecl-social-media-share-ec{-webkit-padding-start:0;align-items:center;display:flex;flex-wrap:wrap;list-style:none;margin-bottom:0;margin-top:-.75rem;padding-inline-start:0}.ecl-social-media-share__item.sc-ecl-social-media-share-ec{-webkit-margin-end:1.5rem;display:flex;margin-inline-end:1.5rem;margin-top:1.5rem}.ecl-social-media-share__item.sc-ecl-social-media-share-ec:last-child{-webkit-margin-end:0;margin-inline-end:0}.ecl-social-media-share__link.sc-ecl-social-media-share-ec{align-items:center;display:flex;font:normal normal 400 .875rem/1rem arial,sans-serif;overflow:hidden}.ecl-social-media-share__icon.sc-ecl-social-media-share-ec{flex-shrink:0;top:0!important}.ecl-social-media-share--vertical.sc-ecl-social-media-share-ec .ecl-social-media-share__description.sc-ecl-social-media-share-ec{margin-bottom:0}.ecl-social-media-share--vertical.sc-ecl-social-media-share-ec .ecl-social-media-share__list.sc-ecl-social-media-share-ec{align-items:flex-start;flex-direction:column;margin-top:0}.ecl-social-media-share--vertical.sc-ecl-social-media-share-ec .ecl-social-media-share__item.sc-ecl-social-media-share-ec,.ecl-social-media-share--vertical.sc-ecl-social-media-share-ec .ecl-social-media-share__item.sc-ecl-social-media-share-ec:last-child{-webkit-margin-end:0;margin-inline-end:0}@media (max-width:767px){.ecl-social-media-share__description.sc-ecl-social-media-share-ec{margin-bottom:0}.ecl-social-media-share__list.sc-ecl-social-media-share-ec{align-items:flex-start;flex-direction:column;margin-top:0}.ecl-social-media-share__item.sc-ecl-social-media-share-ec,.ecl-social-media-share__item.sc-ecl-social-media-share-ec:last-child{-webkit-margin-end:0;margin-inline-end:0}}";

const l = ".ecl-social-media-share.sc-ecl-social-media-share-eu{background-color:#fff;border:0;border-radius:4px;margin:0;padding:0}.ecl-social-media-share__description.sc-ecl-social-media-share-eu{font:normal normal 400 1rem/1.5rem arial,sans-serif;font-weight:700;margin-bottom:.5rem;margin-top:0}.ecl-social-media-share__list.sc-ecl-social-media-share-eu{-webkit-padding-start:0;align-items:center;display:flex;flex-wrap:wrap;list-style:none;margin-bottom:0;margin-top:-.75rem;padding-inline-start:0}.ecl-social-media-share__item.sc-ecl-social-media-share-eu{-webkit-margin-end:1.5rem;display:flex;margin-inline-end:1.5rem;margin-top:1.5rem}.ecl-social-media-share__item.sc-ecl-social-media-share-eu:last-child{-webkit-margin-end:0;margin-inline-end:0}.ecl-social-media-share__link.sc-ecl-social-media-share-eu{align-items:center;display:flex;font:normal normal 400 .875rem/1rem arial,sans-serif;overflow:hidden}.ecl-social-media-share__icon.sc-ecl-social-media-share-eu{flex-shrink:0;top:0!important}.ecl-social-media-share--vertical.sc-ecl-social-media-share-eu .ecl-social-media-share__description.sc-ecl-social-media-share-eu{margin-bottom:0}.ecl-social-media-share--vertical.sc-ecl-social-media-share-eu .ecl-social-media-share__list.sc-ecl-social-media-share-eu{align-items:flex-start;flex-direction:column;margin-top:0}.ecl-social-media-share--vertical.sc-ecl-social-media-share-eu .ecl-social-media-share__item.sc-ecl-social-media-share-eu,.ecl-social-media-share--vertical.sc-ecl-social-media-share-eu .ecl-social-media-share__item.sc-ecl-social-media-share-eu:last-child{-webkit-margin-end:0;margin-inline-end:0}@media (max-width:767px){.ecl-social-media-share__description.sc-ecl-social-media-share-eu{margin-bottom:0}.ecl-social-media-share__list.sc-ecl-social-media-share-eu{align-items:flex-start;flex-direction:column;margin-top:0}.ecl-social-media-share__item.sc-ecl-social-media-share-eu,.ecl-social-media-share__item.sc-ecl-social-media-share-eu:last-child{-webkit-margin-end:0;margin-inline-end:0}}";

const c = class {
  constructor(a) {
    e(this, a);
    this.theme = "ec";
    this.styleClass = undefined;
    this.variant = "horizontal";
    this.description = undefined;
  }
  getClass() {
    return [ `ecl-social-media-share`, `ecl-social-media-share--${this.variant}`, this.styleClass ].join(" ");
  }
  componentDidRender() {
    if (this.el.querySelector(".ecl-social-media-share__list")) {
      const e = this.el.querySelector(".ecl-social-media-share__list");
      const a = this.el.getElementsByTagName("ecl-popover")[0] || false;
      if (a) {
        const e = document.createElement("li");
        e.classList.add("ecl-social-media-share__item", `sc-ecl-social-media-share-${this.theme}`);
        a.parentNode.insertBefore(e, a);
        e.appendChild(a);
        e.querySelector(".ecl-popover__toggle").classList.add(`ecl-social-media-share__link`, `sc-ecl-social-media-share-${this.theme}`);
      }
      const i = this.el.querySelectorAll(".ecl-social-media-share__item");
      e.innerHTML = "";
      e.append(...i);
    }
  }
  render() {
    return a("div", {
      class: this.getClass()
    }, this.description ? a("p", {
      class: "ecl-social-media-share__description"
    }, this.description) : "", a("ul", {
      class: "ecl-social-media-share__list"
    }, a("slot", null)));
  }
  get el() {
    return i(this);
  }
};

c.style = {
  ec: s,
  eu: l
};

export { c as ecl_social_media_share };
//# sourceMappingURL=p-4b731d8c.entry.js.map