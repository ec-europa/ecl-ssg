import { r as e, g as c, h as i } from "./p-73597efd.js";

const t = ".ecl-icon.sc-ecl-icon-ec{fill:currentcolor;margin:0;transition:transform .3s ease-in-out}.ecl-icon--2xs.sc-ecl-icon-ec{height:.75rem;width:.75rem}.ecl-icon--xs.sc-ecl-icon-ec{height:1rem;width:1rem}.ecl-icon--s.sc-ecl-icon-ec{height:1.25rem;width:1.25rem}.ecl-icon--m.sc-ecl-icon-ec{height:1.5rem;width:1.5rem}.ecl-icon--l.sc-ecl-icon-ec{height:2rem;width:2rem}.ecl-icon--xl.sc-ecl-icon-ec{height:2.5rem;width:2.5rem}.ecl-icon--2xl.sc-ecl-icon-ec{height:3rem;width:3rem}.ecl-icon--fluid.sc-ecl-icon-ec{height:1em;width:1em}.ecl-icon--primary.sc-ecl-icon-ec{fill:#004494}.ecl-icon--inverted.sc-ecl-icon-ec{fill:#fff}.ecl-icon--rotate-90.sc-ecl-icon-ec{transform:rotate(90deg)}.ecl-icon--rotate-180.sc-ecl-icon-ec{transform:rotate(180deg)}.ecl-icon--rotate-270.sc-ecl-icon-ec{transform:rotate(270deg)}.ecl-icon--flip-horizontal.sc-ecl-icon-ec{transform:scaleX(-1)}.ecl-icon--flip-vertical.sc-ecl-icon-ec{transform:scaleY(-1)}";

const s = ".ecl-icon.sc-ecl-icon-eu{fill:currentcolor;margin:0;transition:transform .3s ease-in-out}.ecl-icon--2xs.sc-ecl-icon-eu{height:.75rem;width:.75rem}.ecl-icon--xs.sc-ecl-icon-eu{height:1rem;width:1rem}.ecl-icon--s.sc-ecl-icon-eu{height:1.25rem;width:1.25rem}.ecl-icon--m.sc-ecl-icon-eu{height:1.5rem;width:1.5rem}.ecl-icon--l.sc-ecl-icon-eu{height:2rem;width:2rem}.ecl-icon--xl.sc-ecl-icon-eu{height:2.5rem;width:2.5rem}.ecl-icon--2xl.sc-ecl-icon-eu{height:3rem;width:3rem}.ecl-icon--fluid.sc-ecl-icon-eu{height:1em;width:1em}.ecl-icon--primary.sc-ecl-icon-eu{fill:#0e47cb}.ecl-icon--inverted.sc-ecl-icon-eu{fill:#fff}.ecl-icon--rotate-90.sc-ecl-icon-eu{transform:rotate(90deg)}.ecl-icon--rotate-180.sc-ecl-icon-eu{transform:rotate(180deg)}.ecl-icon--rotate-270.sc-ecl-icon-eu{transform:rotate(270deg)}.ecl-icon--flip-horizontal.sc-ecl-icon-eu{transform:scaleX(-1)}.ecl-icon--flip-vertical.sc-ecl-icon-eu{transform:scaleY(-1)}";

const o = class {
  constructor(c) {
    e(this, c);
    this.styleClass = "";
    this.icon = "";
    this.size = "xs";
    this.color = "";
    this.path = undefined;
    this.transform = "";
    this.theme = "ec";
    this.sprite = "";
  }
  componentWillLoad() {
    if (!this.sprite) {
      this.path = c(`./build/images/${this.theme}/icons.svg`);
    } else {
      this.path = c(`./build/images/${this.theme}/${this.sprite}.svg`);
    }
  }
  getClass() {
    const e = [ `ecl-icon`, `ecl-icon--${this.size}`, this.styleClass ];
    if (this.color) {
      e.push(`ecl-icon--${this.color}`);
    }
    if (this.transform) {
      e.push(`ecl-icon--${this.transform}`);
    }
    return e.join(" ");
  }
  render() {
    return i("svg", {
      class: this.getClass()
    }, i("use", {
      xlinkHref: `${this.path}#${this.icon}`
    }));
  }
  static get assetsDirs() {
    return [ "build" ];
  }
};

o.style = {
  ec: t,
  eu: s
};

export { o as ecl_icon };
//# sourceMappingURL=p-0da30739.entry.js.map