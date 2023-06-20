import { r as e, h as t } from "./p-73597efd.js";

const o = '@charset "UTF-8";.ecl-blockquote.sc-ecl-blockquote-ec{-webkit-border-start:10px solid #ffd617;-webkit-padding-start:1.5rem;border-end-start-radius:0;border-inline-start:10px solid #ffd617;border-start-start-radius:0;margin:0;padding-bottom:.75rem;padding-inline-start:1.5rem;padding-top:.75rem}.ecl-blockquote__citation.sc-ecl-blockquote-ec{color:#404040;font:normal normal 400 1rem/1.5rem arial,sans-serif;font-style:italic;margin:0;max-width:65ch;quotes:"“" "”"}.ecl-blockquote__citation.sc-ecl-blockquote-ec:before{content:open-quote}.ecl-blockquote__citation.sc-ecl-blockquote-ec:after{content:close-quote}.ecl-blockquote__quote.sc-ecl-blockquote-ec{margin:0}.ecl-blockquote__attribution.sc-ecl-blockquote-ec{margin-top:1rem;max-width:65ch}.ecl-blockquote__author.sc-ecl-blockquote-ec{color:#000;font:normal normal 400 1.125rem/1.75rem arial,sans-serif;font-weight:700}.ecl-blockquote__image.sc-ecl-blockquote-ec{height:120px;margin-top:.75rem;width:120px}@media (min-width:480px){.ecl-blockquote.sc-ecl-blockquote-ec{-webkit-padding-start:1.5rem;padding-bottom:1rem;padding-inline-start:1.5rem;padding-top:1rem}.ecl-blockquote__citation.sc-ecl-blockquote-ec{font:normal normal 400 1rem/1.5rem arial,sans-serif;font-style:italic}.ecl-blockquote__attribution.sc-ecl-blockquote-ec{margin-top:1.5rem}.ecl-blockquote__author.sc-ecl-blockquote-ec{font:normal normal 400 1.125rem/1.75rem arial,sans-serif;font-weight:700}}@media (min-width:996px){.ecl-blockquote.sc-ecl-blockquote-ec{-webkit-border-start:0;border-inline-start:0;display:flex;flex-direction:row-reverse;justify-content:start;padding:0}.ecl-blockquote__body.sc-ecl-blockquote-ec{-webkit-border-start:10px solid #ffd617;-webkit-padding-start:1.5rem;border-end-start-radius:0;border-inline-start:10px solid #ffd617;border-start-start-radius:0;display:inline-block;padding-bottom:1rem;padding-inline-start:1.5rem;padding-top:1rem}.ecl-blockquote__citation.sc-ecl-blockquote-ec{font:normal normal 400 1.125rem/1.75rem arial,sans-serif;font-style:italic}.ecl-blockquote__attribution.sc-ecl-blockquote-ec{margin-top:2rem}.ecl-blockquote__author.sc-ecl-blockquote-ec{font:normal normal 400 1.125rem/1.75rem arial,sans-serif;font-weight:700}.ecl-blockquote__image.sc-ecl-blockquote-ec{-webkit-margin-end:1.5rem;margin-inline-end:1.5rem;margin-top:0}}';

const c = '@charset "UTF-8";.ecl-blockquote.sc-ecl-blockquote-eu{-webkit-border-start:8px solid #0e47cb;-webkit-padding-start:1rem;border-end-start-radius:4px;border-inline-start:8px solid #0e47cb;border-start-start-radius:4px;margin:0;padding-bottom:.75rem;padding-inline-start:1rem;padding-top:.75rem}.ecl-blockquote__citation.sc-ecl-blockquote-eu{color:#515560;font:normal normal 400 1.125rem/1.75rem arial,sans-serif;font-style:italic;margin:0;max-width:65ch;quotes:"“" "”"}.ecl-blockquote__citation.sc-ecl-blockquote-eu:before{content:open-quote}.ecl-blockquote__citation.sc-ecl-blockquote-eu:after{content:close-quote}.ecl-blockquote__quote.sc-ecl-blockquote-eu{margin:0}.ecl-blockquote__attribution.sc-ecl-blockquote-eu{margin-top:1rem;max-width:65ch}.ecl-blockquote__author.sc-ecl-blockquote-eu{color:#515560;font:normal normal 400 .875rem/1.25rem arial,sans-serif;font-weight:400}.ecl-blockquote__image.sc-ecl-blockquote-eu{height:120px;margin-top:.75rem;width:120px}@media (min-width:480px){.ecl-blockquote.sc-ecl-blockquote-eu{-webkit-padding-start:1.5rem;padding-bottom:1rem;padding-inline-start:1.5rem;padding-top:1rem}.ecl-blockquote__citation.sc-ecl-blockquote-eu{font:normal normal 400 1.5rem/1.75rem arial,sans-serif;font-style:italic}.ecl-blockquote__attribution.sc-ecl-blockquote-eu{margin-top:1.5rem}.ecl-blockquote__author.sc-ecl-blockquote-eu{font:normal normal 400 1rem/1.5rem arial,sans-serif;font-weight:400}}@media (min-width:996px){.ecl-blockquote.sc-ecl-blockquote-eu{-webkit-border-start:0;border-inline-start:0;display:flex;flex-direction:row-reverse;justify-content:start;padding:0}.ecl-blockquote__body.sc-ecl-blockquote-eu{-webkit-border-start:8px solid #0e47cb;-webkit-padding-start:1.5rem;border-end-start-radius:4px;border-inline-start:8px solid #0e47cb;border-start-start-radius:4px;display:inline-block;padding-bottom:1rem;padding-inline-start:1.5rem;padding-top:1rem}.ecl-blockquote__citation.sc-ecl-blockquote-eu{font:normal normal 400 1.5rem/1.75rem arial,sans-serif;font-style:italic}.ecl-blockquote__attribution.sc-ecl-blockquote-eu{margin-top:1.5rem}.ecl-blockquote__author.sc-ecl-blockquote-eu{font:normal normal 400 1.125rem/1.75rem arial,sans-serif;font-weight:400}.ecl-blockquote__image.sc-ecl-blockquote-eu{-webkit-margin-end:1.5rem;margin-inline-end:1.5rem;margin-top:0}}';

const l = class {
  constructor(t) {
    e(this, t);
    this.styleClass = "";
    this.theme = "ec";
    this.image = undefined;
    this.author = undefined;
    this.imageAlt = undefined;
  }
  getClass() {
    return [ `ecl-blockquote`, this.styleClass ].join(" ");
  }
  render() {
    return t("figure", {
      class: this.getClass()
    }, t("div", {
      class: "ecl-blockquote__body"
    }, t("blockquote", {
      class: "ecl-blockquote__quote"
    }, t("p", {
      class: "ecl-blockquote__citation"
    }, t("slot", null))), this.author ? t("footer", {
      class: "ecl-blockquote__attribution"
    }, t("cite", {
      class: "ecl-blockquote__author"
    }, this.author)) : ""), this.image ? t("img", {
      class: "ecl-blockquote__image",
      src: this.image,
      alt: this.imageAlt
    }) : "");
  }
};

l.style = {
  ec: o,
  eu: c
};

export { l as ecl_blockquote };
//# sourceMappingURL=p-50af768b.entry.js.map