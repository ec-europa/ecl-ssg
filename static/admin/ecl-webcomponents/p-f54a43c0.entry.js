import { r as e, g as c, h as r } from "./p-73597efd.js";

const s = ".ecl-fact-figures.sc-ecl-fact-figures-ec{background-color:#f2f5f9;border:1px solid #bfd0e4;border-radius:0;margin:0;padding:1rem}.ecl-fact-figures__item.sc-ecl-fact-figures-ec{color:#404040;font:normal normal 400 1rem/1.25rem arial,sans-serif;margin-top:2rem}.ecl-fact-figures__item.sc-ecl-fact-figures-ec:first-of-type{margin-top:0}.ecl-fact-figures__icon.sc-ecl-fact-figures-ec{color:#004494;margin-bottom:.5rem}.ecl-fact-figures__value.sc-ecl-fact-figures-ec{font:normal normal 400 1.75rem/2rem arial,sans-serif;font-weight:700}.ecl-fact-figures__title.sc-ecl-fact-figures-ec{font:normal normal 400 1.125rem/1.75rem arial,sans-serif;font-weight:700;margin-top:.5rem}.ecl-fact-figures__description.sc-ecl-fact-figures-ec{font:normal normal 400 1rem/1.5rem arial,sans-serif;margin-top:.5rem}.ecl-fact-figures__view-all.sc-ecl-fact-figures-ec{border-top:1px solid #bfd0e4;font:normal normal 400 1rem/1.5rem arial,sans-serif;margin-top:2rem;padding-top:1rem}@media (min-width:996px){.ecl-fact-figures.sc-ecl-fact-figures-ec{padding:2rem}.ecl-fact-figures__items.sc-ecl-fact-figures-ec{grid-column-gap:2rem;grid-row-gap:2rem;display:grid}.ecl-fact-figures--col-2.sc-ecl-fact-figures-ec .ecl-fact-figures__items.sc-ecl-fact-figures-ec{grid-template-columns:repeat(2,1fr)}.ecl-fact-figures--col-3.sc-ecl-fact-figures-ec .ecl-fact-figures__items.sc-ecl-fact-figures-ec{grid-template-columns:repeat(3,1fr)}.ecl-fact-figures--col-4.sc-ecl-fact-figures-ec .ecl-fact-figures__items.sc-ecl-fact-figures-ec{grid-template-columns:repeat(4,1fr)}.ecl-fact-figures__item.sc-ecl-fact-figures-ec{margin-top:0;max-width:80ch}.ecl-fact-figures__value.sc-ecl-fact-figures-ec{font:normal normal 400 2rem/2.5rem arial,sans-serif;font-weight:700}.ecl-fact-figures__view-all.sc-ecl-fact-figures-ec{padding-top:2rem}}";

const t = ".ecl-fact-figures.sc-ecl-fact-figures-eu{background-color:#f3f6fc;border:0;border-radius:8px;margin:0;padding:1rem}.ecl-fact-figures__item.sc-ecl-fact-figures-eu{color:#515560;font:normal normal 400 1rem/1.25rem arial,sans-serif;margin-top:2rem}.ecl-fact-figures__item.sc-ecl-fact-figures-eu:first-of-type{margin-top:0}.ecl-fact-figures__icon.sc-ecl-fact-figures-eu{color:#0e47cb;margin-bottom:.5rem}.ecl-fact-figures__value.sc-ecl-fact-figures-eu{font:normal normal 400 2.25rem/2.75rem arial,sans-serif;font-weight:400}.ecl-fact-figures__title.sc-ecl-fact-figures-eu{font:normal normal 400 1.125rem/1.75rem arial,sans-serif;font-weight:700;margin-top:.5rem}.ecl-fact-figures__description.sc-ecl-fact-figures-eu{font:normal normal 400 1rem/1.5rem arial,sans-serif;margin-top:.5rem}.ecl-fact-figures__view-all.sc-ecl-fact-figures-eu{border-top:1px solid #cfdaf5;font:normal normal 400 1rem/1.5rem arial,sans-serif;margin-top:2rem;padding-top:1rem}@media (min-width:996px){.ecl-fact-figures.sc-ecl-fact-figures-eu{padding:2rem}.ecl-fact-figures__items.sc-ecl-fact-figures-eu{grid-column-gap:2rem;grid-row-gap:2rem;display:grid}.ecl-fact-figures--col-2.sc-ecl-fact-figures-eu .ecl-fact-figures__items.sc-ecl-fact-figures-eu{grid-template-columns:repeat(2,1fr)}.ecl-fact-figures--col-3.sc-ecl-fact-figures-eu .ecl-fact-figures__items.sc-ecl-fact-figures-eu{grid-template-columns:repeat(3,1fr)}.ecl-fact-figures--col-4.sc-ecl-fact-figures-eu .ecl-fact-figures__items.sc-ecl-fact-figures-eu{grid-template-columns:repeat(4,1fr)}.ecl-fact-figures__item.sc-ecl-fact-figures-eu{margin-top:0;max-width:80ch}.ecl-fact-figures__value.sc-ecl-fact-figures-eu{font:normal normal 400 2.625rem/3.25rem arial,sans-serif;font-weight:400}.ecl-fact-figures__view-all.sc-ecl-fact-figures-eu{padding-top:2rem}}";

const i = class {
  constructor(c) {
    e(this, c);
    this.theme = "ec";
    this.styleClass = undefined;
    this.columns = 3;
    this.displayIcons = true;
    this.withUtils = false;
  }
  getClass() {
    return [ `ecl-fact-figures`, `ecl-fact-figures--col-${this.columns}`, this.styleClass ].join(" ");
  }
  componentWillLoad() {
    if (this.withUtils && !document.querySelector("#ecl-utils-styles")) {
      const e = document.createElement("link");
      e.rel = "stylesheet";
      e.type = "text/css";
      e.id = "ecl-utils-styles";
      e.href = c(`./build/styles/ecl-utilities-${this.theme}.css`);
      document.body.appendChild(e);
    }
  }
  render() {
    return r("div", {
      class: this.getClass()
    }, r("div", {
      class: "ecl-fact-figures__items"
    }, r("slot", null)));
  }
  static get assetsDirs() {
    return [ "build" ];
  }
};

i.style = {
  ec: s,
  eu: t
};

export { i as ecl_fact_figures };
//# sourceMappingURL=p-f54a43c0.entry.js.map