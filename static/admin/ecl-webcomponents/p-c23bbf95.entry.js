import{r as e,h as s,g as i}from"./p-956b13e0.js";const t=class{constructor(s){e(this,s);this.theme="ec";this.styleClass=undefined;this.path=undefined;this.langCode=undefined;this.language=undefined;this.active=false}getClass(){const e=[`ecl-site-header__language-item`,`sc-ecl-site-header-${this.theme}`,this.styleClass];return e.join(" ")}render(){return s("li",{class:this.getClass()},s("a",{href:this.path,class:`ecl-link ecl-link--standalone ecl-site-header__language-link sc-ecl-site-header-${this.theme} ${this.active?"ecl-site-header__language-link--active":""}`},s("span",{class:`ecl-site-header__language-link-code sc-ecl-site-header-${this.theme}`},this.langCode),s("span",{class:`ecl-site-header__language-link-label sc-ecl-site-header-${this.theme}`},this.language)))}get el(){return i(this)}};export{t as ecl_language_item};
//# sourceMappingURL=p-c23bbf95.entry.js.map