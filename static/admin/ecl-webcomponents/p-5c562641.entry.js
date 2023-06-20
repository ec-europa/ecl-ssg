import { r as e, h as n } from "./p-73597efd.js";

const s = ".ecl-spinner.sc-ecl-spinner-ec{align-items:center;display:none;flex-direction:column;margin:0 .5rem;position:relative;z-index:51}.ecl-spinner--visible.sc-ecl-spinner-ec{display:inline-flex}.ecl-spinner--centered.sc-ecl-spinner-ec{left:0;margin-left:auto;margin-right:auto;position:absolute;right:0;top:2.5rem}.ecl-spinner__loader.sc-ecl-spinner-ec{stroke:#4073af;stroke-linecap:butt;animation:rotate 2s linear infinite;height:2rem;transform-origin:center center;width:2rem}.ecl-spinner__text.sc-ecl-spinner-ec{color:#404040;font:normal normal 400 1rem/1.25rem arial,sans-serif;margin-top:.5rem}.ecl-spinner--negative.sc-ecl-spinner-ec .ecl-spinner__loader.sc-ecl-spinner-ec{stroke:#fff}.ecl-spinner--negative.sc-ecl-spinner-ec .ecl-spinner__text.sc-ecl-spinner-ec{color:#fff}.ecl-spinner--large.sc-ecl-spinner-ec .ecl-spinner__loader.sc-ecl-spinner-ec{height:3rem;width:3rem}.ecl-spinner--small.sc-ecl-spinner-ec{flex-direction:row;justify-content:center}.ecl-spinner--small.sc-ecl-spinner-ec .ecl-spinner__loader.sc-ecl-spinner-ec{height:1.5rem;width:1.5rem}.ecl-spinner--small.sc-ecl-spinner-ec .ecl-spinner__text.sc-ecl-spinner-ec{-webkit-margin-start:.5rem;margin-inline-start:.5rem;margin-top:0}.ecl-spinner__circle.sc-ecl-spinner-ec{stroke-dasharray:1,200;stroke-dashoffset:0;animation:dash 1.5s ease-in-out infinite,color 6s ease-in-out infinite}.ecl-spinner__overlay.sc-ecl-spinner-ec{background-color:hsla(0,0%,100%,.9);display:none;height:100%;left:0;position:absolute;top:0;width:100%;z-index:50}.ecl-spinner__overlay--visible.sc-ecl-spinner-ec{display:block}@keyframes rotate{to{transform:rotate(1turn)}}@keyframes dash{0%{stroke-dasharray:1,200;stroke-dashoffset:0}50%{stroke-dasharray:89,200;stroke-dashoffset:-35px}to{stroke-dasharray:89,200;stroke-dashoffset:-124px}}";

const r = ".ecl-spinner.sc-ecl-spinner-eu{align-items:center;display:none;flex-direction:column;margin:0 .5rem;position:relative;z-index:51}.ecl-spinner--visible.sc-ecl-spinner-eu{display:inline-flex}.ecl-spinner--centered.sc-ecl-spinner-eu{left:0;margin-left:auto;margin-right:auto;position:absolute;right:0;top:2.5rem}.ecl-spinner__loader.sc-ecl-spinner-eu{stroke:#3e6cd5;stroke-linecap:round;animation:rotate 2s linear infinite;height:2rem;transform-origin:center center;width:2rem}.ecl-spinner__text.sc-ecl-spinner-eu{font:normal normal 400 1rem/1.25rem arial,sans-serif;margin-top:.5rem}.ecl-spinner--negative.sc-ecl-spinner-eu .ecl-spinner__loader.sc-ecl-spinner-eu{stroke:#fff}.ecl-spinner--negative.sc-ecl-spinner-eu .ecl-spinner__text.sc-ecl-spinner-eu{color:#fff}.ecl-spinner--large.sc-ecl-spinner-eu .ecl-spinner__loader.sc-ecl-spinner-eu{height:3rem;width:3rem}.ecl-spinner--small.sc-ecl-spinner-eu{flex-direction:row;justify-content:center}.ecl-spinner--small.sc-ecl-spinner-eu .ecl-spinner__loader.sc-ecl-spinner-eu{height:1.5rem;width:1.5rem}.ecl-spinner--small.sc-ecl-spinner-eu .ecl-spinner__text.sc-ecl-spinner-eu{-webkit-margin-start:.5rem;margin-inline-start:.5rem;margin-top:0}.ecl-spinner__circle.sc-ecl-spinner-eu{stroke-dasharray:1,200;stroke-dashoffset:0;animation:dash 1.5s ease-in-out infinite,color 6s ease-in-out infinite}.ecl-spinner__overlay.sc-ecl-spinner-eu{background-color:hsla(0,0%,100%,.9);display:none;height:100%;left:0;position:absolute;top:0;width:100%;z-index:50}.ecl-spinner__overlay--visible.sc-ecl-spinner-eu{display:block}@keyframes rotate{to{transform:rotate(1turn)}}@keyframes dash{0%{stroke-dasharray:1,200;stroke-dashoffset:0}50%{stroke-dasharray:89,200;stroke-dashoffset:-35px}to{stroke-dasharray:89,200;stroke-dashoffset:-124px}}";

const i = class {
  constructor(n) {
    e(this, n);
    this.styleClass = "";
    this.variant = "primary";
    this.theme = "ec";
    this.centered = false;
    this.visible = false;
    this.overlay = false;
    this.size = "medium";
  }
  getClass() {
    const e = [ `ecl-spinner`, `ecl-spinner--${this.variant}`, `ecl-spinner--${this.size}`, this.styleClass ];
    if (this.centered) {
      e.push("ecl-spinner--centered");
    }
    if (this.visible) {
      e.push("ecl-spinner--visible");
    }
    return e.join(" ");
  }
  getOverlayClass() {
    const e = [ "ecl-spinner__overlay" ];
    if (this.visible) {
      e.push("ecl-spinner__overlay--visible");
    }
    return e.join(" ");
  }
  render() {
    return n("div", null, n("div", {
      class: this.getClass()
    }, n("svg", {
      class: "ecl-spinner__loader",
      viewBox: "25 25 50 50"
    }, n("circle", {
      class: "ecl-spinner__circle",
      cx: "50",
      cy: "50",
      r: "20",
      fill: "none",
      "stroke-width": "4px",
      "stroke-miterlimit": "10",
      "vector-effect": "non-scaling-stroke"
    })), n("div", {
      class: "ecl-spinner__text"
    }, n("slot", null))), this.overlay ? n("div", {
      class: this.getOverlayClass()
    }) : "");
  }
};

i.style = {
  ec: s,
  eu: r
};

export { i as ecl_spinner };
//# sourceMappingURL=p-5c562641.entry.js.map