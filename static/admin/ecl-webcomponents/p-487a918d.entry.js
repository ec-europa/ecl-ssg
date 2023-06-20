import { r as e, g as o, h as p, c } from "./p-73597efd.js";

const r = '.ecl-popover.sc-ecl-popover-ec{display:inline-block;margin:0;position:relative}.ecl-popover__container.sc-ecl-popover-ec{margin-top:1.25rem;transform:translateX(-50%);z-index:15}.ecl-popover__container.sc-ecl-popover-ec,.ecl-popover__container.sc-ecl-popover-ec:before{background-color:#fff;box-shadow:0 7px 8px rgba(0,47,103,.08),0 0 22px rgba(0,47,103,.04),0 12px 17px rgba(0,47,103,.04),0 -4px 4px rgba(0,47,103,.04);left:50%;position:absolute}.ecl-popover__container.sc-ecl-popover-ec:before{-webkit-clip-path:polygon(-8px -8px,calc(100% + 8px) -8px,calc(100% + 8px) calc(100% + 8px));clip-path:polygon(-8px -8px,calc(100% + 8px) -8px,calc(100% + 8px) calc(100% + 8px));content:"";height:1rem;margin-left:-.5rem;top:0;transform:translateY(-50%) rotate(-45deg);width:1rem}.ecl-popover__content.sc-ecl-popover-ec{font:normal normal 400 1rem/1.25rem arial,sans-serif;max-height:11rem;min-width:188px;overflow-y:auto;padding:.75rem;width:auto}@media (min-width:768px){.ecl-popover__content.sc-ecl-popover-ec{max-height:16.5rem}}.ecl-popover__list.sc-ecl-popover-ec{list-style:none;margin:0;padding:0;width:188px}.ecl-popover__link.sc-ecl-popover-ec{align-items:center;display:flex;padding:.75rem}.ecl-popover__link.sc-ecl-popover-ec:focus-visible{outline-offset:-2px}.ecl-popover--top.sc-ecl-popover-ec .ecl-popover__container.sc-ecl-popover-ec{bottom:100%;margin-bottom:1.25rem;margin-top:0}.ecl-popover--top.sc-ecl-popover-ec .ecl-popover__container.sc-ecl-popover-ec:before{bottom:0;top:auto;transform:translateY(50%) rotate(135deg)}.ecl-popover--push-left.sc-ecl-popover-ec .ecl-popover__container.sc-ecl-popover-ec{left:0;transform:none}.ecl-popover--push-left.sc-ecl-popover-ec .ecl-popover__container.sc-ecl-popover-ec:before{left:var(--ecl-popover-position)}.ecl-popover--push-right.sc-ecl-popover-ec .ecl-popover__container.sc-ecl-popover-ec{left:auto;right:0;transform:none}.ecl-popover--push-right.sc-ecl-popover-ec .ecl-popover__container.sc-ecl-popover-ec:before{left:auto;right:var(--ecl-popover-position)}';

const t = '.ecl-popover.sc-ecl-popover-eu{display:inline-block;margin:0;position:relative}.ecl-popover__container.sc-ecl-popover-eu{margin-top:1.25rem;transform:translateX(-50%);z-index:15}.ecl-popover__container.sc-ecl-popover-eu,.ecl-popover__container.sc-ecl-popover-eu:before{background-color:#fff;box-shadow:0 7px 8px rgba(9,49,142,.08),0 0 22px rgba(9,49,142,.04),0 12px 17px rgba(9,49,142,.04),0 -4px 4px rgba(9,49,142,.04);left:50%;position:absolute}.ecl-popover__container.sc-ecl-popover-eu:before{-webkit-clip-path:polygon(-8px -8px,calc(100% + 8px) -8px,calc(100% + 8px) calc(100% + 8px));clip-path:polygon(-8px -8px,calc(100% + 8px) -8px,calc(100% + 8px) calc(100% + 8px));content:"";height:1rem;margin-left:-.5rem;top:0;transform:translateY(-50%) rotate(-45deg);width:1rem}.ecl-popover__content.sc-ecl-popover-eu{font:normal normal 400 1rem/1.25rem arial,sans-serif;max-height:11rem;min-width:188px;overflow-y:auto;padding:.75rem;width:auto}@media (min-width:768px){.ecl-popover__content.sc-ecl-popover-eu{max-height:16.5rem}}.ecl-popover__list.sc-ecl-popover-eu{list-style:none;margin:0;padding:0;width:188px}.ecl-popover__link.sc-ecl-popover-eu{align-items:center;display:flex;padding:.75rem}.ecl-popover__link.sc-ecl-popover-eu:focus-visible{outline-offset:-2px}.ecl-popover--top.sc-ecl-popover-eu .ecl-popover__container.sc-ecl-popover-eu{bottom:100%;margin-bottom:1.25rem;margin-top:0}.ecl-popover--top.sc-ecl-popover-eu .ecl-popover__container.sc-ecl-popover-eu:before{bottom:0;top:auto;transform:translateY(50%) rotate(135deg)}.ecl-popover--push-left.sc-ecl-popover-eu .ecl-popover__container.sc-ecl-popover-eu{left:0;transform:none}.ecl-popover--push-left.sc-ecl-popover-eu .ecl-popover__container.sc-ecl-popover-eu:before{left:var(--ecl-popover-position)}.ecl-popover--push-right.sc-ecl-popover-eu .ecl-popover__container.sc-ecl-popover-eu{left:auto;right:0;transform:none}.ecl-popover--push-right.sc-ecl-popover-eu .ecl-popover__container.sc-ecl-popover-eu:before{left:auto;right:var(--ecl-popover-position)}';

const l = class {
  constructor(o) {
    e(this, o);
    this.theme = "ec";
    this.styleClass = undefined;
    this.eclScript = false;
    this.itemId = undefined;
    this.toggleLabel = undefined;
    this.list = false;
    this.icon = undefined;
    this.iconSize = "fluid";
    this.iconSprite = "";
  }
  getClass() {
    const e = [ `ecl-popover`, this.styleClass ];
    return e.join(" ");
  }
  getAttrs() {
    return {
      "aria-controls": this.itemId,
      "data-ecl-popover-toggle": "data-ecl-popover-toggle",
      "aria-expanded": "false"
    };
  }
  componentDidLoad() {
    if (this.el.querySelector(".ecl-popover__list")) {
      // Clean the html so that the script finds what it expects.
      const e = this.el.querySelectorAll(".ecl-popover__item");
      this.el.querySelector(".ecl-popover__list").innerHTML = "";
      this.el.querySelector(".ecl-popover__list").append(...e);
    }
    if (this.eclScript) {
      // Load the ECL vanilla js if not already present.
      const e = o("./build/scripts/ecl-popover-vanilla.js");
      if (document.querySelector(`script[src="${e}"]`)) {
        document.querySelector(`script[src="${e}"]`).remove();
      }
      const p = document.createElement("script");
      p.src = e;
      p.onload = () => {
        const e = new ECL.Popover(this.el.firstElementChild);
        e.init();
      };
      document.body.appendChild(p);
    }
  }
  render() {
    return p("div", {
      class: this.getClass()
    }, p("a", Object.assign({
      class: "ecl-link ecl-link--standalone ecl-popover__toggle"
    }, this.getAttrs()), this.icon ? p("ecl-icon", {
      icon: this.icon,
      size: this.iconSize,
      "style-class": "ecl-link__icon--before",
      sprite: this.iconSprite
    }) : "", this.toggleLabel), p("div", {
      class: "ecl-popover__container",
      id: this.itemId,
      hidden: true
    }, p("div", {
      class: "ecl-popover__content"
    }, this.list ? p("ul", {
      class: "ecl-popover__list"
    }, p("slot", null)) : "", !this.list ? p("slot", null) : "")));
  }
  static get assetsDirs() {
    return [ "build" ];
  }
  get el() {
    return c(this);
  }
};

l.style = {
  ec: r,
  eu: t
};

export { l as ecl_popover };
//# sourceMappingURL=p-487a918d.entry.js.map