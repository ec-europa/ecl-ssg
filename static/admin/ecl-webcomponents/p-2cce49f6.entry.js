import { r as i, h as e, c as n } from "./p-73597efd.js";

const a = '.ecl-pagination.sc-ecl-pagination-ec{-webkit-padding-start:1rem;-webkit-padding-end:1rem;background-color:transparent;border-radius:0;border-top:2px solid #000;color:#004494;font:normal normal 400 1rem/1.5rem arial,sans-serif;margin:0;padding-bottom:.75rem;padding-inline-end:1rem;padding-inline-start:1rem;padding-top:.75rem}.ecl-pagination__list.sc-ecl-pagination-ec{-webkit-padding-start:0;align-items:center;display:flex;justify-content:space-between;list-style:none;margin:0;padding-inline-start:0;position:relative}.ecl-pagination__item.sc-ecl-pagination-ec{display:none}.ecl-pagination__item--next.sc-ecl-pagination-ec,.ecl-pagination__item--previous.sc-ecl-pagination-ec{display:flex;flex-basis:0;flex-grow:1}.ecl-pagination__item--next.sc-ecl-pagination-ec{justify-content:flex-end}.ecl-pagination__item--current.sc-ecl-pagination-ec{color:#000;display:flex;font-weight:700;position:relative}.ecl-pagination__text--summary.sc-ecl-pagination-ec{display:none}.ecl-pagination__text--full.sc-ecl-pagination-ec{display:block}.ecl-pagination__link.sc-ecl-pagination-ec,.ecl-pagination__text.sc-ecl-pagination-ec{padding:.25rem}@media (min-width:768px){.ecl-pagination.sc-ecl-pagination-ec{-webkit-padding-start:0;-webkit-padding-end:0;padding-inline-end:0;padding-inline-start:0}.ecl-pagination__list.sc-ecl-pagination-ec{justify-content:center}.ecl-pagination__item.sc-ecl-pagination-ec{-webkit-margin-end:1rem;display:flex;flex-grow:0;margin-inline-end:1rem}.ecl-pagination__item.sc-ecl-pagination-ec:last-child{-webkit-margin-end:0;margin-inline-end:0}.ecl-pagination__item--next.sc-ecl-pagination-ec,.ecl-pagination__item--previous.sc-ecl-pagination-ec{flex-basis:auto}.ecl-pagination__item--current.sc-ecl-pagination-ec:before{border:2px solid #000;border-radius:10rem;content:"";display:block;height:calc(1.5rem + 4px);left:50%;position:absolute;top:50%;transform:translate(-50%,-50%);width:calc(1.5rem + 4px)}.ecl-pagination__text--summary.sc-ecl-pagination-ec{display:block}.ecl-pagination__text--full.sc-ecl-pagination-ec{display:none}}';

const t = '.ecl-pagination.sc-ecl-pagination-eu{-webkit-padding-start:1rem;-webkit-padding-end:1rem;background-color:#f3f6fc;border-radius:4px;border-top:0 solid #000;color:#0e47cb;font:normal normal 400 1rem/1.5rem arial,sans-serif;margin:0;padding-bottom:.75rem;padding-inline-end:1rem;padding-inline-start:1rem;padding-top:.75rem}.ecl-pagination__list.sc-ecl-pagination-eu{-webkit-padding-start:0;align-items:center;display:flex;justify-content:space-between;list-style:none;margin:0;padding-inline-start:0;position:relative}.ecl-pagination__item.sc-ecl-pagination-eu{display:none}.ecl-pagination__item--next.sc-ecl-pagination-eu,.ecl-pagination__item--previous.sc-ecl-pagination-eu{display:flex;flex-basis:0;flex-grow:1}.ecl-pagination__item--next.sc-ecl-pagination-eu{justify-content:flex-end}.ecl-pagination__item--current.sc-ecl-pagination-eu{color:#171a22;display:flex;font-weight:700;position:relative}.ecl-pagination__text--summary.sc-ecl-pagination-eu{display:none}.ecl-pagination__text--full.sc-ecl-pagination-eu{display:block}.ecl-pagination__link.sc-ecl-pagination-eu,.ecl-pagination__text.sc-ecl-pagination-eu{padding:.25rem}@media (min-width:768px){.ecl-pagination.sc-ecl-pagination-eu{-webkit-padding-start:0;-webkit-padding-end:0;padding-inline-end:0;padding-inline-start:0}.ecl-pagination__list.sc-ecl-pagination-eu{justify-content:center}.ecl-pagination__item.sc-ecl-pagination-eu{-webkit-margin-end:1rem;display:flex;flex-grow:0;margin-inline-end:1rem}.ecl-pagination__item.sc-ecl-pagination-eu:last-child{-webkit-margin-end:0;margin-inline-end:0}.ecl-pagination__item--next.sc-ecl-pagination-eu,.ecl-pagination__item--previous.sc-ecl-pagination-eu{flex-basis:auto}.ecl-pagination__item--current.sc-ecl-pagination-eu:before{border:0 solid #000;border-radius:10rem;content:"";display:block;height:1.5rem;left:50%;position:absolute;top:50%;transform:translate(-50%,-50%);width:1.5rem}.ecl-pagination__text--summary.sc-ecl-pagination-eu{display:block}.ecl-pagination__text--full.sc-ecl-pagination-eu{display:none}}';

const l = class {
  constructor(e) {
    i(this, e);
    this.styleClass = "";
    this.theme = "ec";
  }
  getClass() {
    const i = [ `ecl-pagination`, this.styleClass ];
    return i.join(" ");
  }
  componentDidRender() {
    const i = this.el.querySelectorAll(".ecl-pagination__item");
    if (i) {
      this.el.querySelector(".ecl-pagination__list").innerHTML = "";
      this.el.querySelector(".ecl-pagination__list").append(...i);
    }
  }
  render() {
    return e("div", {
      class: this.getClass()
    }, e("ul", {
      class: "ecl-pagination__list"
    }, e("slot", null)));
  }
  get el() {
    return n(this);
  }
};

l.style = {
  ec: a,
  eu: t
};

export { l as ecl_pagination };
//# sourceMappingURL=p-2cce49f6.entry.js.map