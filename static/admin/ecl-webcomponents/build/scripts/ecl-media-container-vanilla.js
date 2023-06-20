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
   * @param {String} options.iframeSelector Selector for iframe element
   * @param {boolean} options.useAutomaticRatio Toggle automatic ratio calculus
   */
  var MediaContainer = /*#__PURE__*/function () {
    /**
     * @static
     * Shorthand for instance creation and initialisation.
     *
     * @param {HTMLElement} root DOM element for component instantiation and scope
     *
     * @return {MediaContainer} An instance of MediaContainer.
     */
    MediaContainer.autoInit = function autoInit(root, _temp) {
      var _ref = _temp === void 0 ? {} : _temp,
        _ref$MEDIA_CONTAINER = _ref.MEDIA_CONTAINER,
        defaultOptions = _ref$MEDIA_CONTAINER === void 0 ? {} : _ref$MEDIA_CONTAINER;
      var mediaContainer = new MediaContainer(root, defaultOptions);
      mediaContainer.init();
      root.ECLMediaContainer = mediaContainer;
      return mediaContainer;
    };
    function MediaContainer(element, _temp2) {
      var _ref2 = _temp2 === void 0 ? {} : _temp2,
        _ref2$iframeSelector = _ref2.iframeSelector,
        iframeSelector = _ref2$iframeSelector === void 0 ? 'iframe' : _ref2$iframeSelector,
        _ref2$useAutomaticRat = _ref2.useAutomaticRatio,
        useAutomaticRatio = _ref2$useAutomaticRat === void 0 ? true : _ref2$useAutomaticRat;
      // Check element
      if (!element || element.nodeType !== Node.ELEMENT_NODE) {
        throw new TypeError('DOM element should be given to initialize this widget.');
      }
      this.element = element;

      // Options
      this.iframeSelector = iframeSelector;
      this.useAutomaticRatio = useAutomaticRatio;

      // Private variables
      this.iframe = null;

      // Bind `this` for use in callbacks
      this.calculateRatio = this.calculateRatio.bind(this);
    }

    /**
     * Initialise component.
     */
    var _proto = MediaContainer.prototype;
    _proto.init = function init() {
      // Check if a ratio has been set manually
      var media = queryOne('.ecl-media-container__media', this.element);
      if (media && !/ecl-media-container__media--ratio/.test(media.className)) {
        // Get the iframe
        this.iframe = queryOne(this.iframeSelector, this.element);

        // Check if there is an iframe to handle
        if (this.iframe && this.useAutomaticRatio) this.calculateRatio();
      }

      // Set ecl initialized attribute
      this.element.setAttribute('data-ecl-auto-initialized', 'true');
    }

    /**
     * Destroy component.
     */;
    _proto.destroy = function destroy() {
      if (this.element) {
        this.element.removeAttribute('data-ecl-auto-initialized');
      }
    }

    /**
     * Calculate the ratio of the iframe video.
     */;
    _proto.calculateRatio = function calculateRatio() {
      // Get dimension if they are provided
      var iframeWidth = this.iframe.width;
      var iframeHeight = this.iframe.height;

      // If at least one dimension in not provided, calculate them (less reliable)
      if (!iframeWidth || !iframeHeight) {
        iframeWidth = this.iframe.offsetWidth;
        iframeHeight = this.iframe.offsetHeight;
      }

      // Set aspect ratio
      this.iframe.style.aspectRatio = iframeWidth + "/" + iframeHeight;
    };
    return MediaContainer;
  }();

  exports.MediaContainer = MediaContainer;
  exports.default = MediaContainer;

  Object.defineProperty(exports, '__esModule', { value: true });

  return exports;

})({});
