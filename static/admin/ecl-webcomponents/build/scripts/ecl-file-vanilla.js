var ECL = (function (exports) {
  'use strict';

  var queryOne = function queryOne(selector, context) {
    if (context === void 0) {
      context = document;
    }
    return context.querySelector(selector);
  };

  /**
   * @param {HTMLElement} element DOM element for component instantiation and scope
   * @param {Object} options
   * @param {String} options.translationToggleSelector Selector for toggling translatoins section
   * @param {String} options.translationContainerSelector Selector for translations section container
   * @param {Boolean} options.attachClickListener Whether or not to bind click events on toggle
   */
  var FileDownload = /*#__PURE__*/function () {
    /**
     * @static
     * Shorthand for instance creation and initialisation.
     *
     * @param {HTMLElement} root DOM element for component instantiation and scope
     *
     * @return {FileDownload} An instance of FileDownload.
     */
    FileDownload.autoInit = function autoInit(root, _temp) {
      var _ref = _temp === void 0 ? {} : _temp,
        _ref$FILE_DOWNLOAD = _ref.FILE_DOWNLOAD,
        defaultOptions = _ref$FILE_DOWNLOAD === void 0 ? {} : _ref$FILE_DOWNLOAD;
      var fileDownload = new FileDownload(root, defaultOptions);
      fileDownload.init();
      root.ECLFileDownload = fileDownload;
      return fileDownload;
    };
    function FileDownload(element, _temp2) {
      var _ref2 = _temp2 === void 0 ? {} : _temp2,
        _ref2$translationTogg = _ref2.translationToggleSelector,
        translationToggleSelector = _ref2$translationTogg === void 0 ? '[data-ecl-file-translation-toggle]' : _ref2$translationTogg,
        _ref2$translationCont = _ref2.translationContainerSelector,
        translationContainerSelector = _ref2$translationCont === void 0 ? '[data-ecl-file-translation-container]' : _ref2$translationCont,
        _ref2$attachClickList = _ref2.attachClickListener,
        attachClickListener = _ref2$attachClickList === void 0 ? true : _ref2$attachClickList;
      // Check element
      if (!element || element.nodeType !== Node.ELEMENT_NODE) {
        throw new TypeError('DOM element should be given to initialize this widget.');
      }
      this.element = element;

      // Options
      this.translationToggleSelector = translationToggleSelector;
      this.translationContainerSelector = translationContainerSelector;
      this.attachClickListener = attachClickListener;

      // Private variables
      this.translationToggle = null;
      this.translationContainer = null;

      // Bind `this` for use in callbacks
      this.handleClickOnToggle = this.handleClickOnToggle.bind(this);
    }

    /**
     * Initialise component.
     */
    var _proto = FileDownload.prototype;
    _proto.init = function init() {
      this.translationToggle = queryOne(this.translationToggleSelector, this.element);
      this.translationContainer = queryOne(this.translationContainerSelector, this.element);

      // Bind click event on toggle
      if (this.attachClickListener && this.translationToggle) {
        this.translationToggle.addEventListener('click', this.handleClickOnToggle);
      }

      // Set ecl initialized attribute
      this.element.setAttribute('data-ecl-auto-initialized', 'true');
    }

    /**
     * Destroy component.
     */;
    _proto.destroy = function destroy() {
      if (this.attachClickListener && this.translationToggle) {
        this.translationToggle.removeEventListener('click', this.handleClickOnToggle);
      }
      if (this.element) {
        this.element.removeAttribute('data-ecl-auto-initialized');
      }
    }

    /**
     * @param {Event} e
     */;
    _proto.handleClickOnToggle = function handleClickOnToggle(e) {
      e.preventDefault();
      if (this.translationContainer.getAttribute('aria-expanded') === 'true') {
        this.translationContainer.setAttribute('aria-expanded', 'false');
      } else {
        this.translationContainer.setAttribute('aria-expanded', 'true');
      }
      return this;
    };
    return FileDownload;
  }();

  exports.FileDownload = FileDownload;
  exports.default = FileDownload;

  Object.defineProperty(exports, '__esModule', { value: true });

  return exports;

})({});
