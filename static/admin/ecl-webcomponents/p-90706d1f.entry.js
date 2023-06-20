import { r as e, d as i, g as t, h as a, c as o } from "./p-73597efd.js";

const r = '@charset "UTF-8";/*! @ecl/web-components-datepicker - 0.2.0 Built on 2023-05-11T07:35:40.563Z */.ecl-text-input{-webkit-appearance:none;-moz-appearance:none;appearance:none;background-color:#fff;border:1px solid #707070;border-radius:0;box-shadow:none;box-sizing:border-box;color:#404040;display:block;font:normal normal 400 1rem/1.25rem arial,sans-serif;margin:0;max-width:100%;padding:calc(.75rem - 1px)}.ecl-text-input::-moz-placeholder{color:#9f9f9f;font:normal normal 400 1rem/1.25rem arial,sans-serif;opacity:1}.ecl-text-input::placeholder{color:#9f9f9f;font:normal normal 400 1rem/1.25rem arial,sans-serif;opacity:1}.ecl-text-input:hover{border-color:#004494;box-shadow:none}.ecl-text-input:active,.ecl-text-input:focus-visible{border-color:#004494;border-width:2px;box-shadow:none;outline:none;padding:calc(.75rem - 2px)}.ecl-text-input--s{width:50%}@media (min-width:768px){.ecl-text-input--s{width:30%}}@media (min-width:996px){.ecl-text-input--s{width:158px}}.ecl-text-input--m{width:100%}@media (min-width:768px){.ecl-text-input--m{width:50%}}@media (min-width:996px){.ecl-text-input--m{width:253px}}.ecl-text-input--l{width:100%}@media (min-width:996px){.ecl-text-input--l{width:443px}}.ecl-text-input--disabled,.ecl-text-input--readonly,.ecl-text-input[disabled],.ecl-text-input[readonly]{background-color:#fff;border-color:hsla(0,0%,44%,.5);cursor:not-allowed}.ecl-text-input--disabled::-moz-placeholder,.ecl-text-input--readonly::-moz-placeholder,.ecl-text-input[disabled]::-moz-placeholder,.ecl-text-input[readonly]::-moz-placeholder{color:hsla(0,0%,62%,.5)}.ecl-text-input--disabled::placeholder,.ecl-text-input--readonly::placeholder,.ecl-text-input[disabled]::placeholder,.ecl-text-input[readonly]::placeholder{color:hsla(0,0%,62%,.5)}.ecl-text-input--disabled:hover,.ecl-text-input--readonly:hover,.ecl-text-input[disabled]:hover,.ecl-text-input[readonly]:hover{border-color:hsla(0,0%,44%,.5);box-shadow:none}.ecl-text-input--disabled:active,.ecl-text-input--disabled:focus-visible,.ecl-text-input--readonly:active,.ecl-text-input--readonly:focus-visible,.ecl-text-input[disabled]:active,.ecl-text-input[disabled]:focus-visible,.ecl-text-input[readonly]:active,.ecl-text-input[readonly]:focus-visible{border-color:hsla(0,0%,44%,.5);border-width:1px;padding:calc(.75rem - 1px)}.ecl-text-input--invalid{border-color:#da2131}.ecl-text-input--invalid:hover{border-color:#981722}.ecl-text-input--invalid:active,.ecl-text-input--invalid:focus{border-color:#004494}/*!\n * Pikaday\n * Copyright © 2014 David Bushell | BSD & MIT license | https://dbushell.com/\n */.pika-single{background:#fff;border:1px solid;border-color:#ccc #ccc #bbb;color:#333;display:block;font-family:Helvetica Neue,Helvetica,Arial,sans-serif;position:relative;z-index:9999}.pika-single.is-hidden{display:none}.pika-single.is-bound{box-shadow:0 5px 15px -5px rgba(0,0,0,.5);position:absolute}.pika-single:after,.pika-single:before{content:" ";display:table}.pika-single:after{clear:both}.pika-lendar{float:left;margin:8px;width:240px}.pika-title{position:relative;text-align:center}.pika-title select{cursor:pointer;left:0;margin:0;opacity:0;position:absolute;top:5px;z-index:9998}.pika-label{background-color:#fff;color:#333;display:inline-block;font-size:14px;font-weight:700;line-height:20px;margin:0;overflow:hidden;padding:5px 3px;position:relative;z-index:9999}.pika-next,.pika-prev{background-color:transparent;background-position:50%;background-repeat:no-repeat;background-size:75% 75%;border:0;cursor:pointer;display:block;height:30px;opacity:.5;outline:none;overflow:hidden;padding:0;position:relative;text-indent:20px;white-space:nowrap;width:20px}.pika-next:hover,.pika-prev:hover{opacity:1}.pika-next.is-disabled,.pika-prev.is-disabled{cursor:default;opacity:.2}.is-rtl .pika-next,.pika-prev{background-image:url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAeCAYAAAAsEj5rAAAAUklEQVR42u3VMQoAIBADQf8Pgj+OD9hG2CtONJB2ymQkKe0HbwAP0xucDiQWARITIDEBEnMgMQ8S8+AqBIl6kKgHiXqQqAeJepBo/z38J/U0uAHlaBkBl9I4GwAAAABJRU5ErkJggg==");float:left}.is-rtl .pika-prev,.pika-next{background-image:url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAeCAYAAAAsEj5rAAAAU0lEQVR42u3VOwoAMAgE0dwfAnNjU26bYkBCFGwfiL9VVWoO+BJ4Gf3gtsEKKoFBNTCoCAYVwaAiGNQGMUHMkjGbgjk2mIONuXo0nC8XnCf1JXgArVIZAQh5TKYAAAAASUVORK5CYII=");float:right}.pika-select{display:inline-block}.pika-table{border:0;border-collapse:collapse;border-spacing:0;width:100%}.pika-table td,.pika-table th{padding:0;width:14.2857142857%}.pika-table th{color:#999;font-size:12px;font-weight:700;line-height:25px;text-align:center}.pika-table abbr{border-bottom:none;cursor:help}.pika-button{background:#f5f5f5;border:0;box-sizing:border-box;color:#666;cursor:pointer;display:block;font-size:12px;height:auto;line-height:15px;margin:0;outline:none;padding:5px;text-align:right;width:100%}.has-event .pika-button{background:#3af;color:#fff}.is-today .pika-button{color:#3af;font-weight:700}.is-selected .pika-button{background:#3af;border-radius:3px;box-shadow:inset 0 1px 3px #178fe5;color:#fff;font-weight:700}.is-disabled .pika-button,.is-outside-current-month .pika-button{color:#999;opacity:.3}.is-disabled .pika-button{cursor:default;pointer-events:none}.pika-button:hover{background:#ff8000;border-radius:3px;box-shadow:none;color:#fff}.pika-button .is-selection-disabled{cursor:default;pointer-events:none}.pika-week{color:#999;font-size:11px}.is-inrange .pika-button{background:#d5e9f7;color:#666}.is-startrange .pika-button{background:#6cb31d;border-radius:3px;box-shadow:none;color:#fff}.is-endrange .pika-button{background:#3af;border-radius:3px;box-shadow:none;color:#fff}.ecl-datepicker{margin:0;position:relative;width:50%}@media (min-width:768px){.ecl-datepicker{width:30%}}@media (min-width:996px){.ecl-datepicker{width:158px}}.ecl-datepicker__field.ecl-text-input{-webkit-padding-end:2rem;padding-inline-end:2rem;width:100%}.ecl-datepicker__icon{-webkit-margin-end:calc(.75rem - 1px);color:#707070;margin-inline-end:calc(.75rem - 1px);margin-top:calc(.75rem - 1px);pointer-events:none;position:absolute;right:0;top:0}.ecl-datepicker__field.ecl-text-input[disabled]{color:hsla(0,0%,62%,.5)}.ecl-datepicker__field.ecl-text-input[disabled]::-moz-placeholder{color:hsla(0,0%,62%,.5)}.ecl-datepicker__field.ecl-text-input[disabled]::placeholder{color:hsla(0,0%,62%,.5)}.ecl-datepicker:hover .ecl-datepicker__icon{color:#004494}.ecl-datepicker__field:active+.ecl-datepicker__icon,.ecl-datepicker__field:focus-visible+.ecl-datepicker__icon{color:#004494}.ecl-datepicker--invalid .ecl-datepicker__icon{color:#da2131}.ecl-datepicker--invalid .ecl-datepicker__field:focus-visible+.ecl-datepicker__icon,.ecl-datepicker--invalid .ecl-datepicker__field:hover+.ecl-datepicker__icon{color:#981722}.ecl-datepicker__field:disabled+.ecl-datepicker__icon,.ecl-datepicker__field:disabled:hover+.ecl-datepicker__icon{color:hsla(0,0%,44%,.5)}.ecl-datepicker-theme.pika-single{border-radius:0;border-width:0;color:#404040;font:normal normal 400 1rem/1.25rem arial,sans-serif;margin-top:.75rem;overflow:hidden;width:auto}.ecl-datepicker-theme.pika-single.is-bound{box-shadow:none}.ecl-datepicker-theme.pika-single .pika-lendar{background-color:#ebebeb;margin:0;width:100%}.ecl-datepicker-theme.pika-single .pika-title{background-color:#fff;display:flex;padding-bottom:.5rem}.ecl-datepicker-theme.pika-single .pika-label{-webkit-margin-end:.25rem;align-items:center;background-color:#ebebeb;color:#404040;display:flex;flex-grow:1;font:normal normal 400 1rem/1.25rem arial,sans-serif;justify-content:space-between;margin-inline-end:.25rem;padding:.75rem 1rem;width:50%}.ecl-datepicker-theme.pika-single .pika-label:last-of-type{-webkit-margin-end:0;margin-inline-end:0}.ecl-datepicker-theme.pika-single .pika-label:after{border:solid #404040;border-width:0 2px 2px 0;content:"";display:inline-block;padding:3px;transform:rotate(45deg)}.ecl-datepicker-theme.pika-single .pika-select{border-width:0;height:100%;top:0;width:100%}.ecl-datepicker-theme.pika-single .pika-next,.ecl-datepicker-theme.pika-single .pika-prev{display:none}.ecl-datepicker-theme.pika-single .pika-table{background-color:#f5f5f5;border-collapse:initial;border-spacing:.25rem}.ecl-datepicker-theme.pika-single .pika-table thead{background-color:transparent;display:table-header-group}.ecl-datepicker-theme.pika-single .pika-table th{color:#404040;font:normal normal 400 1rem/1.25rem arial,sans-serif;padding:.5rem 0;text-align:center}.ecl-datepicker-theme.pika-single .pika-table td{border-width:0;display:table-cell;padding:0}.ecl-datepicker-theme.pika-single .pika-table td:before{content:normal}.ecl-datepicker-theme.pika-single .pika-table abbr{text-decoration:none}.ecl-datepicker-theme.pika-single .pika-button{background-color:#fff;border-radius:0;border-width:0;color:#404040;font:normal normal 400 1rem/1.25rem arial,sans-serif;padding:.75rem;text-align:center}.ecl-datepicker-theme.pika-single .pika-button:hover{border-radius:0;box-shadow:inset 0 0 0 3px #bfd0e4;color:#404040}.ecl-datepicker-theme.pika-single .is-today .pika-button{box-shadow:inset 0 0 0 3px #bfd0e4}.ecl-datepicker-theme.pika-single .is-selected .pika-button{background-color:#004494;border-radius:0;box-shadow:none;color:#fff;font-weight:700}.ecl-datepicker-theme.pika-single .is-outside-current-month .pika-button{background-color:#ebebeb;color:#404040;opacity:1}@media (min-width:768px){.ecl-datepicker-theme.pika-single .pika-lendar{width:20rem}.ecl-datepicker-theme.pika-single .pika-button{padding:.5rem}}.ecl-form-group .ecl-datepicker{margin-top:.75rem}.ecl-datepicker__icon{-webkit-margin-end:calc(.75rem - 1px)!important;margin-inline-end:calc(.75rem - 1px)!important;margin-top:calc(.75rem - 1px)!important}';

const l = '@charset "UTF-8";/*! @ecl/web-components-datepicker - 0.2.0 Built on 2023-05-11T07:35:40.563Z */.ecl-text-input{-webkit-appearance:none;-moz-appearance:none;appearance:none;background-color:#fff;border:1px solid #515560;border-radius:4px;box-shadow:0 2px 4px rgba(9,49,142,.08),0 0 10px rgba(9,49,142,.04),0 4px 5px rgba(9,49,142,.04),0 -4px 4px rgba(9,49,142,.04);box-sizing:border-box;color:#171a22;display:block;font:normal normal 400 1rem/1.25rem arial,sans-serif;margin:0;max-width:100%;padding:calc(.75rem - 1px) calc(1rem - 1px)}.ecl-text-input::-moz-placeholder{color:#a8aaaf;font:normal normal 400 1rem/1.25rem arial,sans-serif;opacity:1}.ecl-text-input::placeholder{color:#a8aaaf;font:normal normal 400 1rem/1.25rem arial,sans-serif;opacity:1}.ecl-text-input:hover{border-color:#515560;box-shadow:0 3px 5px rgba(9,49,142,.04),0 0 18px rgba(9,49,142,.04),0 6px 10px rgba(9,49,142,.04),0 -4px 4px rgba(9,49,142,.04)}.ecl-text-input:active,.ecl-text-input:focus-visible{border-color:#0e47cb;border-width:2px;box-shadow:0 3px 5px rgba(9,49,142,.04),0 0 18px rgba(9,49,142,.04),0 6px 10px rgba(9,49,142,.04),0 -4px 4px rgba(9,49,142,.04);outline:none;padding:calc(.75rem - 2px) calc(1rem - 2px)}.ecl-text-input--s{width:50%}@media (min-width:768px){.ecl-text-input--s{width:30%}}@media (min-width:996px){.ecl-text-input--s{width:158px}}.ecl-text-input--m{width:100%}@media (min-width:768px){.ecl-text-input--m{width:50%}}@media (min-width:996px){.ecl-text-input--m{width:253px}}.ecl-text-input--l{width:100%}@media (min-width:996px){.ecl-text-input--l{width:443px}}.ecl-text-input--disabled,.ecl-text-input--readonly,.ecl-text-input[disabled],.ecl-text-input[readonly]{background-color:#fff;border-color:rgba(81,85,96,.5);cursor:not-allowed}.ecl-text-input--disabled::-moz-placeholder,.ecl-text-input--readonly::-moz-placeholder,.ecl-text-input[disabled]::-moz-placeholder,.ecl-text-input[readonly]::-moz-placeholder{color:hsla(223,4%,67%,.5)}.ecl-text-input--disabled::placeholder,.ecl-text-input--readonly::placeholder,.ecl-text-input[disabled]::placeholder,.ecl-text-input[readonly]::placeholder{color:hsla(223,4%,67%,.5)}.ecl-text-input--disabled:hover,.ecl-text-input--readonly:hover,.ecl-text-input[disabled]:hover,.ecl-text-input[readonly]:hover{border-color:rgba(81,85,96,.5);box-shadow:0 2px 4px rgba(9,49,142,.08),0 0 10px rgba(9,49,142,.04),0 4px 5px rgba(9,49,142,.04),0 -4px 4px rgba(9,49,142,.04)}.ecl-text-input--disabled:active,.ecl-text-input--disabled:focus-visible,.ecl-text-input--readonly:active,.ecl-text-input--readonly:focus-visible,.ecl-text-input[disabled]:active,.ecl-text-input[disabled]:focus-visible,.ecl-text-input[readonly]:active,.ecl-text-input[readonly]:focus-visible{border-color:rgba(81,85,96,.5);border-width:1px;padding:calc(.75rem - 1px) calc(1rem - 1px)}.ecl-text-input--invalid{border-color:#bf0036}.ecl-text-input--invalid:hover{border-color:#ef0044}.ecl-text-input--invalid:active,.ecl-text-input--invalid:focus{border-color:#0e47cb}/*!\n * Pikaday\n * Copyright © 2014 David Bushell | BSD & MIT license | https://dbushell.com/\n */.pika-single{background:#fff;border:1px solid;border-color:#ccc #ccc #bbb;color:#333;display:block;font-family:Helvetica Neue,Helvetica,Arial,sans-serif;position:relative;z-index:9999}.pika-single.is-hidden{display:none}.pika-single.is-bound{box-shadow:0 5px 15px -5px rgba(0,0,0,.5);position:absolute}.pika-single:after,.pika-single:before{content:" ";display:table}.pika-single:after{clear:both}.pika-lendar{float:left;margin:8px;width:240px}.pika-title{position:relative;text-align:center}.pika-title select{cursor:pointer;left:0;margin:0;opacity:0;position:absolute;top:5px;z-index:9998}.pika-label{background-color:#fff;color:#333;display:inline-block;font-size:14px;font-weight:700;line-height:20px;margin:0;overflow:hidden;padding:5px 3px;position:relative;z-index:9999}.pika-next,.pika-prev{background-color:transparent;background-position:50%;background-repeat:no-repeat;background-size:75% 75%;border:0;cursor:pointer;display:block;height:30px;opacity:.5;outline:none;overflow:hidden;padding:0;position:relative;text-indent:20px;white-space:nowrap;width:20px}.pika-next:hover,.pika-prev:hover{opacity:1}.pika-next.is-disabled,.pika-prev.is-disabled{cursor:default;opacity:.2}.is-rtl .pika-next,.pika-prev{background-image:url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAeCAYAAAAsEj5rAAAAUklEQVR42u3VMQoAIBADQf8Pgj+OD9hG2CtONJB2ymQkKe0HbwAP0xucDiQWARITIDEBEnMgMQ8S8+AqBIl6kKgHiXqQqAeJepBo/z38J/U0uAHlaBkBl9I4GwAAAABJRU5ErkJggg==");float:left}.is-rtl .pika-prev,.pika-next{background-image:url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAeCAYAAAAsEj5rAAAAU0lEQVR42u3VOwoAMAgE0dwfAnNjU26bYkBCFGwfiL9VVWoO+BJ4Gf3gtsEKKoFBNTCoCAYVwaAiGNQGMUHMkjGbgjk2mIONuXo0nC8XnCf1JXgArVIZAQh5TKYAAAAASUVORK5CYII=");float:right}.pika-select{display:inline-block}.pika-table{border:0;border-collapse:collapse;border-spacing:0;width:100%}.pika-table td,.pika-table th{padding:0;width:14.2857142857%}.pika-table th{color:#999;font-size:12px;font-weight:700;line-height:25px;text-align:center}.pika-table abbr{border-bottom:none;cursor:help}.pika-button{background:#f5f5f5;border:0;box-sizing:border-box;color:#666;cursor:pointer;display:block;font-size:12px;height:auto;line-height:15px;margin:0;outline:none;padding:5px;text-align:right;width:100%}.has-event .pika-button{background:#3af;color:#fff}.is-today .pika-button{color:#3af;font-weight:700}.is-selected .pika-button{background:#3af;border-radius:3px;box-shadow:inset 0 1px 3px #178fe5;color:#fff;font-weight:700}.is-disabled .pika-button,.is-outside-current-month .pika-button{color:#999;opacity:.3}.is-disabled .pika-button{cursor:default;pointer-events:none}.pika-button:hover{background:#ff8000;border-radius:3px;box-shadow:none;color:#fff}.pika-button .is-selection-disabled{cursor:default;pointer-events:none}.pika-week{color:#999;font-size:11px}.is-inrange .pika-button{background:#d5e9f7;color:#666}.is-startrange .pika-button{background:#6cb31d;border-radius:3px;box-shadow:none;color:#fff}.is-endrange .pika-button{background:#3af;border-radius:3px;box-shadow:none;color:#fff}.ecl-datepicker{margin:0;position:relative;width:50%}@media (min-width:768px){.ecl-datepicker{width:30%}}@media (min-width:996px){.ecl-datepicker{width:158px}}.ecl-datepicker__field.ecl-text-input{-webkit-padding-end:2rem;padding-inline-end:2rem;width:100%}.ecl-datepicker__icon{-webkit-margin-end:calc(.75rem - 1px);color:#515560;margin-inline-end:calc(.75rem - 1px);margin-top:calc(.75rem - 1px);pointer-events:none;position:absolute;right:0;top:0}.ecl-datepicker__field.ecl-text-input[disabled]{color:hsla(223,4%,67%,.5)}.ecl-datepicker__field.ecl-text-input[disabled]::-moz-placeholder{color:hsla(223,4%,67%,.5)}.ecl-datepicker__field.ecl-text-input[disabled]::placeholder{color:hsla(223,4%,67%,.5)}.ecl-datepicker:hover .ecl-datepicker__icon{color:#515560}.ecl-datepicker__field:active+.ecl-datepicker__icon,.ecl-datepicker__field:focus-visible+.ecl-datepicker__icon{color:#0e47cb}.ecl-datepicker--invalid .ecl-datepicker__icon{color:#bf0036}.ecl-datepicker--invalid .ecl-datepicker__field:focus-visible+.ecl-datepicker__icon,.ecl-datepicker--invalid .ecl-datepicker__field:hover+.ecl-datepicker__icon{color:#ef0044}.ecl-datepicker__field:disabled+.ecl-datepicker__icon,.ecl-datepicker__field:disabled:hover+.ecl-datepicker__icon{color:rgba(81,85,96,.5)}.ecl-datepicker-theme.pika-single{border-radius:4px;border-width:0;color:#171a22;font:normal normal 400 1rem/1.25rem arial,sans-serif;margin-top:1rem;overflow:hidden;width:auto}.ecl-datepicker-theme.pika-single.is-bound{box-shadow:none}.ecl-datepicker-theme.pika-single .pika-lendar{background-color:#e7edfa;margin:0;width:100%}.ecl-datepicker-theme.pika-single .pika-title{background-color:#fff;display:flex;padding-bottom:.5rem}.ecl-datepicker-theme.pika-single .pika-label{-webkit-margin-end:.25rem;align-items:center;background-color:#e7edfa;color:#171a22;display:flex;flex-grow:1;font:normal normal 400 1rem/1.25rem arial,sans-serif;justify-content:space-between;margin-inline-end:.25rem;padding:.75rem 1rem;width:50%}.ecl-datepicker-theme.pika-single .pika-label:last-of-type{-webkit-margin-end:0;margin-inline-end:0}.ecl-datepicker-theme.pika-single .pika-label:after{border:solid #262b38;border-width:0 2px 2px 0;content:"";display:inline-block;padding:3px;transform:rotate(45deg)}.ecl-datepicker-theme.pika-single .pika-select{border-width:0;height:100%;top:0;width:100%}.ecl-datepicker-theme.pika-single .pika-next,.ecl-datepicker-theme.pika-single .pika-prev{display:none}.ecl-datepicker-theme.pika-single .pika-table{background-color:#e7edfa;border-collapse:initial;border-spacing:.25rem}.ecl-datepicker-theme.pika-single .pika-table thead{background-color:transparent;display:table-header-group}.ecl-datepicker-theme.pika-single .pika-table th{color:#171a22;font:normal normal 400 1rem/1.25rem arial,sans-serif;padding:.5rem 0;text-align:center}.ecl-datepicker-theme.pika-single .pika-table td{border-width:0;display:table-cell;padding:0}.ecl-datepicker-theme.pika-single .pika-table td:before{content:normal}.ecl-datepicker-theme.pika-single .pika-table abbr{text-decoration:none}.ecl-datepicker-theme.pika-single .pika-button{background-color:#fff;border-radius:4px;border-width:0;color:#515560;font:normal normal 400 1rem/1.25rem arial,sans-serif;padding:.75rem;text-align:center}.ecl-datepicker-theme.pika-single .pika-button:hover{border-radius:4px;box-shadow:inset 0 0 0 2px #6e91e0;color:#515560}.ecl-datepicker-theme.pika-single .is-today .pika-button{box-shadow:inset 0 0 0 2px #6e91e0}.ecl-datepicker-theme.pika-single .is-selected .pika-button{background-color:#0e47cb;border-radius:4px;box-shadow:none;color:#fff;font-weight:700}.ecl-datepicker-theme.pika-single .is-outside-current-month .pika-button{background-color:#e9eaeb;color:#262b38;opacity:1}@media (min-width:768px){.ecl-datepicker-theme.pika-single .pika-lendar{width:20rem}.ecl-datepicker-theme.pika-single .pika-button{padding:.5rem}}.ecl-form-group .ecl-datepicker{margin-top:.75rem}.ecl-datepicker__icon{-webkit-margin-end:calc(.75rem - 1px)!important;margin-inline-end:calc(.75rem - 1px)!important;margin-top:calc(.75rem - 1px)!important}';

const n = class {
  constructor(t) {
    e(this, t);
    this.inputFocus = i(this, "inputFocus", 7);
    this.inputBlur = i(this, "inputBlur", 7);
    this.inputChange = i(this, "inputChange", 7);
    this.theme = "ec";
    this.styleClass = undefined;
    this.disabled = false;
    this.required = false;
    this.placeholder = "DD-MM-YYYY";
    this.inputId = undefined;
    this.invalid = false;
    this.type = undefined;
    this.name = undefined;
    this.defaultValue = undefined;
    this.dateFormat = "DD-MM-YYYY";
    this.yearRange = 40;
    this.hasChanged = false;
    this.isFocused = false;
  }
  getClass() {
    const e = [ "ecl-datepicker", this.styleClass ];
    if (this.invalid) {
      e.push("ecl-datepicker--invalid");
    }
    if (this.disabled) {
      e.push("ecl-datepicker--disabled");
    }
    return e.join(" ");
  }
  componentDidRender() {
    const e = "https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.29.1/moment.min.js";
    if (document.querySelector(`script[src="${e}"]`)) {
      document.querySelector(`script[src="${e}"]`).remove();
    }
    const i = document.createElement("script");
    i.setAttribute("integrity", "sha512-qTXRIMyZIFb8iQcfjXWCO8+M5Tbc38Qi5WzdPOYZHIlZpzBHG3L3by84BBBOiRGiEb7KKtAOAs5qYdUiZiQNNQ=");
    i.setAttribute("crossorigin", "anonymous");
    i.src = e;
    document.body.appendChild(i);
    const a = t("./build/scripts/ecl-datepicker-vanilla.js");
    if (document.querySelector(`script[src="${a}"]`)) {
      document.querySelector(`script[src="${a}"]`).remove();
    }
    const o = document.createElement("script");
    o.src = a;
    o.onload = () => {
      const e = new ECL.Datepicker(this.el.querySelector(".ecl-datepicker__field"), {
        format: this.dateFormat,
        yearRange: Number(this.yearRange)
      });
      e.init();
    };
    document.body.appendChild(o);
  }
  handleFocus(e) {
    this.inputFocus.emit(e);
    this.isFocused = true;
  }
  handleChange(e) {
    this.inputChange.emit(e);
    this.hasChanged = true;
  }
  handleBlur(e) {
    this.inputBlur.emit(e);
    this.isFocused = false;
  }
  render() {
    return a("div", {
      class: this.getClass()
    }, a("input", {
      class: `ecl-datepicker__field ecl-text-input ecl-text-input--s ${this.invalid ? "ecl-text-input--invalid" : ""}`,
      autocomplete: "off",
      "data-ecl-datepicker-toggle": true,
      id: this.inputId,
      value: this.defaultValue,
      required: this.required,
      disabled: this.disabled,
      placeholder: this.placeholder,
      onFocus: e => this.handleFocus(e),
      onBlur: e => this.handleBlur(e),
      onChange: e => this.handleChange(e)
    }), a("ecl-icon", {
      "style-class": `ecl-datepicker__icon sc-ecl-datepicker-${this.theme}`,
      icon: "calendar",
      size: "s"
    }));
  }
  get el() {
    return o(this);
  }
};

n.style = {
  ec: r,
  eu: l
};

export { n as ecl_datepicker };
//# sourceMappingURL=p-90706d1f.entry.js.map