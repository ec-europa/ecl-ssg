import { a as e } from "./p-73597efd.js";

const appGlobalScript = () => {
  const themeResolver = e => {
    const t = window.eclTheme || e.theme || e.getAttribute("theme");
    if (t) {
      return t;
    } else if (!e.parentElement) {
      return "ec";
    } else {
      return themeResolver(e.parentElement);
    }
  };
  e((e => themeResolver(e)));
};

const t = appGlobalScript;

export { t as g };
//# sourceMappingURL=p-023ec469.js.map