import { r as e, h as c } from "./p-73597efd.js";

const i = ".ecl-fact-figures.sc-ecl-fact-figures-item-ec{background-color:#f2f5f9;border:1px solid #bfd0e4;border-radius:0;margin:0;padding:1rem}.ecl-fact-figures__item.sc-ecl-fact-figures-item-ec,.sc-ecl-fact-figures-item-ec-h{color:#404040;font:normal normal 400 1rem/1.25rem arial,sans-serif;margin-top:2rem}.ecl-fact-figures__item.sc-ecl-fact-figures-item-ec:first-of-type{margin-top:0}.ecl-fact-figures__icon.sc-ecl-fact-figures-item-ec{color:#004494;margin-bottom:.5rem}.ecl-fact-figures__value.sc-ecl-fact-figures-item-ec{font:normal normal 400 1.75rem/2rem arial,sans-serif;font-weight:700}.ecl-fact-figures__title.sc-ecl-fact-figures-item-ec{font:normal normal 400 1.125rem/1.75rem arial,sans-serif;font-weight:700;margin-top:.5rem}.ecl-fact-figures__description.sc-ecl-fact-figures-item-ec{font:normal normal 400 1rem/1.5rem arial,sans-serif;margin-top:.5rem}.ecl-fact-figures__view-all.sc-ecl-fact-figures-item-ec{border-top:1px solid #bfd0e4;font:normal normal 400 1rem/1.5rem arial,sans-serif;margin-top:2rem;padding-top:1rem}@media (min-width:996px){.ecl-fact-figures.sc-ecl-fact-figures-item-ec{padding:2rem}.ecl-fact-figures__items.sc-ecl-fact-figures-item-ec{grid-column-gap:2rem;grid-row-gap:2rem;display:grid}.ecl-fact-figures--col-2.sc-ecl-fact-figures-item-ec .ecl-fact-figures__items.sc-ecl-fact-figures-item-ec{grid-template-columns:repeat(2,1fr)}.ecl-fact-figures--col-3.sc-ecl-fact-figures-item-ec .ecl-fact-figures__items.sc-ecl-fact-figures-item-ec{grid-template-columns:repeat(3,1fr)}.ecl-fact-figures--col-4.sc-ecl-fact-figures-item-ec .ecl-fact-figures__items.sc-ecl-fact-figures-item-ec{grid-template-columns:repeat(4,1fr)}.ecl-fact-figures__item.sc-ecl-fact-figures-item-ec,.sc-ecl-fact-figures-item-ec-h{margin-top:0;max-width:80ch}.ecl-fact-figures__value.sc-ecl-fact-figures-item-ec{font:normal normal 400 2rem/2.5rem arial,sans-serif;font-weight:700}.ecl-fact-figures__view-all.sc-ecl-fact-figures-item-ec{padding-top:2rem}}.sc-ecl-fact-figures-item-ec-h{margin:0;padding:0}";

const r = ".ecl-fact-figures.sc-ecl-fact-figures-item-eu{background-color:#f3f6fc;border:0;border-radius:8px;margin:0;padding:1rem}.ecl-fact-figures__item.sc-ecl-fact-figures-item-eu,.sc-ecl-fact-figures-item-eu-h{color:#515560;font:normal normal 400 1rem/1.25rem arial,sans-serif;margin-top:2rem}.ecl-fact-figures__item.sc-ecl-fact-figures-item-eu:first-of-type{margin-top:0}.ecl-fact-figures__icon.sc-ecl-fact-figures-item-eu{color:#0e47cb;margin-bottom:.5rem}.ecl-fact-figures__value.sc-ecl-fact-figures-item-eu{font:normal normal 400 2.25rem/2.75rem arial,sans-serif;font-weight:400}.ecl-fact-figures__title.sc-ecl-fact-figures-item-eu{font:normal normal 400 1.125rem/1.75rem arial,sans-serif;font-weight:700;margin-top:.5rem}.ecl-fact-figures__description.sc-ecl-fact-figures-item-eu{font:normal normal 400 1rem/1.5rem arial,sans-serif;margin-top:.5rem}.ecl-fact-figures__view-all.sc-ecl-fact-figures-item-eu{border-top:1px solid #cfdaf5;font:normal normal 400 1rem/1.5rem arial,sans-serif;margin-top:2rem;padding-top:1rem}@media (min-width:996px){.ecl-fact-figures.sc-ecl-fact-figures-item-eu{padding:2rem}.ecl-fact-figures__items.sc-ecl-fact-figures-item-eu{grid-column-gap:2rem;grid-row-gap:2rem;display:grid}.ecl-fact-figures--col-2.sc-ecl-fact-figures-item-eu .ecl-fact-figures__items.sc-ecl-fact-figures-item-eu{grid-template-columns:repeat(2,1fr)}.ecl-fact-figures--col-3.sc-ecl-fact-figures-item-eu .ecl-fact-figures__items.sc-ecl-fact-figures-item-eu{grid-template-columns:repeat(3,1fr)}.ecl-fact-figures--col-4.sc-ecl-fact-figures-item-eu .ecl-fact-figures__items.sc-ecl-fact-figures-item-eu{grid-template-columns:repeat(4,1fr)}.ecl-fact-figures__item.sc-ecl-fact-figures-item-eu,.sc-ecl-fact-figures-item-eu-h{margin-top:0;max-width:80ch}.ecl-fact-figures__value.sc-ecl-fact-figures-item-eu{font:normal normal 400 2.625rem/3.25rem arial,sans-serif;font-weight:400}.ecl-fact-figures__view-all.sc-ecl-fact-figures-item-eu{padding-top:2rem}}.sc-ecl-fact-figures-item-eu-h{margin:0;padding:0}";

const t = class {
  constructor(c) {
    e(this, c);
    this.theme = "ec";
    this.styleClass = undefined;
    this.icon = undefined;
    this.value = undefined;
    this.itemTitle = undefined;
    this.iconTransform = undefined;
  }
  getClass() {
    return [ `ecl-fact-figures__item`, `sc-ecl-fact-figures-${this.theme}`, this.styleClass ].join(" ");
  }
  render() {
    return c("div", {
      class: this.getClass()
    }, c("ecl-icon", {
      icon: this.icon,
      size: this.theme === "ec" ? "m" : "l",
      transform: this.iconTransform,
      "style-class": `ecl-fact-figures__icon sc-ecl-fact-figures-item-${this.theme}`
    }), c("div", {
      class: "ecl-fact-figures__value"
    }, this.value), c("div", {
      class: "ecl-fact-figures__title"
    }, this.itemTitle), c("div", {
      class: "ecl-fact-figures__description"
    }, c("slot", null)));
  }
};

t.style = {
  ec: i,
  eu: r
};

export { t as ecl_fact_figures_item };
//# sourceMappingURL=p-4c92f3e5.entry.js.map