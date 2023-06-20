import { r as i, h as t, c as e } from "./p-73597efd.js";

const n = '.ecl-navigation-list.sc-ecl-navigation-list-ec{margin:0}.ecl-navigation-list--col-2.sc-ecl-navigation-list-ec,.ecl-navigation-list--col-3.sc-ecl-navigation-list-ec{grid-column-gap:2rem;grid-row-gap:2rem;display:grid;grid-auto-rows:auto;width:100%}@media (min-width:996px){.ecl-navigation-list--col-2.sc-ecl-navigation-list-ec{grid-template-columns:repeat(2,1fr)}.ecl-navigation-list--col-3.sc-ecl-navigation-list-ec{grid-template-columns:repeat(3,1fr)}}.ecl-navigation-list__item.sc-ecl-navigation-list-ec{background-color:#fff;border:1px solid #cfcfcf;border-radius:0;box-shadow:none;box-sizing:border-box;overflow:hidden}.ecl-navigation-list__image.sc-ecl-navigation-list-ec{background-position:50%;background-size:cover;display:block;height:auto}.ecl-navigation-list__image.sc-ecl-navigation-list-ec:before{content:"";display:block;padding-top:25%;width:100%}.ecl-navigation-list__content-block.sc-ecl-navigation-list-ec{padding:1rem;position:relative}.ecl-navigation-list__item--no-border.sc-ecl-navigation-list-ec{border-radius:0;border-width:0;box-shadow:none}.ecl-navigation-list__item--no-border.sc-ecl-navigation-list-ec .ecl-navigation-list__image.sc-ecl-navigation-list-ec{border:1px solid #cfcfcf}.ecl-navigation-list__item--no-border.sc-ecl-navigation-list-ec .ecl-navigation-list__content-block.sc-ecl-navigation-list-ec{-webkit-padding-start:0;-webkit-padding-end:0;padding-inline-end:0;padding-inline-start:0}';

const a = '.ecl-navigation-list.sc-ecl-navigation-list-eu{margin:0}.ecl-navigation-list--col-2.sc-ecl-navigation-list-eu,.ecl-navigation-list--col-3.sc-ecl-navigation-list-eu{grid-column-gap:2rem;grid-row-gap:2rem;display:grid;grid-auto-rows:auto;width:100%}@media (min-width:996px){.ecl-navigation-list--col-2.sc-ecl-navigation-list-eu{grid-template-columns:repeat(2,1fr)}.ecl-navigation-list--col-3.sc-ecl-navigation-list-eu{grid-template-columns:repeat(3,1fr)}}.ecl-navigation-list__item.sc-ecl-navigation-list-eu{background-color:#fff;border:0;border-radius:8px;box-shadow:0 2px 4px rgba(9,49,142,.08),0 0 10px rgba(9,49,142,.04),0 4px 5px rgba(9,49,142,.04),0 -4px 4px rgba(9,49,142,.04);box-sizing:border-box;overflow:hidden}.ecl-navigation-list__image.sc-ecl-navigation-list-eu{background-position:50%;background-size:cover;display:block;height:auto}.ecl-navigation-list__image.sc-ecl-navigation-list-eu:before{content:"";display:block;padding-top:25%;width:100%}.ecl-navigation-list__content-block.sc-ecl-navigation-list-eu{padding:1.5rem;position:relative}.ecl-navigation-list__item--no-border.sc-ecl-navigation-list-eu{border-radius:0;border-width:0;box-shadow:none}.ecl-navigation-list__item--no-border.sc-ecl-navigation-list-eu .ecl-navigation-list__image.sc-ecl-navigation-list-eu{border:1px solid #cfdaf5}.ecl-navigation-list__item--no-border.sc-ecl-navigation-list-eu .ecl-navigation-list__content-block.sc-ecl-navigation-list-eu{-webkit-padding-start:0;-webkit-padding-end:0;padding-inline-end:0;padding-inline-start:0}.ecl-navigation-list__item.sc-ecl-navigation-list-eu:not(.ecl-navigation-list__item--no-border) .ecl-navigation-list__content-block.sc-ecl-navigation-list-eu:before{background-color:#fc0;border-bottom-left-radius:2px;border-bottom-right-radius:2px;content:"";height:4px;left:1.5rem;position:absolute;top:0;width:32px}';

const o = class {
  constructor(t) {
    i(this, t);
    this.theme = "ec";
    this.column = 2;
    this.styleClass = undefined;
  }
  getClass() {
    const i = [ `ecl-navigation-list`, `ecl-navigation-list--col-${this.column}`, this.styleClass ];
    return i.join(" ");
  }
  componentDidRender() {
    // Clean the html to make the zebra work,.
    const i = this.el.querySelectorAll(".ecl-navigation-list__item");
    if (i) {
      this.el.querySelector(".ecl-navigation-list").innerHTML = "";
      this.el.querySelector(".ecl-navigation-list").append(...i);
    }
    const t = this.el.querySelectorAll(".ecl-content-block");
    if (t) {
      t.forEach((i => {
        i.classList.add("ecl-navigation-list__content-block", `sc-ecl-navigation-list-${this.theme}`);
      }));
    }
  }
  render() {
    return t("div", {
      class: this.getClass()
    }, t("slot", null));
  }
  get el() {
    return e(this);
  }
};

o.style = {
  ec: n,
  eu: a
};

export { o as ecl_navigation_list };
//# sourceMappingURL=p-660be5b4.entry.js.map