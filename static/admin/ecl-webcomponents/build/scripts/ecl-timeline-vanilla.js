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
   * @param {String} options.buttonSelector
   * @param {String} options.labelSelector
   * @param {String} options.labelExpanded
   * @param {String} options.labelCollapsed
   * @param {Boolean} options.attachClickListener Whether or not to bind click events
   */
  var Timeline = /*#__PURE__*/function () {
    /**
     * @static
     * Shorthand for instance creation and initialisation.
     *
     * @param {HTMLElement} root DOM element for component instantiation and scope
     *
     * @return {Timeline} An instance of Timeline.
     */
    Timeline.autoInit = function autoInit(root, _temp) {
      var _ref = _temp === void 0 ? {} : _temp,
        _ref$TIMELINE = _ref.TIMELINE,
        defaultOptions = _ref$TIMELINE === void 0 ? {} : _ref$TIMELINE;
      var timeline = new Timeline(root, defaultOptions);
      timeline.init();
      root.ECLTimeline = timeline;
      return timeline;
    };
    function Timeline(element, _temp2) {
      var _ref2 = _temp2 === void 0 ? {} : _temp2,
        _ref2$buttonSelector = _ref2.buttonSelector,
        buttonSelector = _ref2$buttonSelector === void 0 ? '[data-ecl-timeline-button]' : _ref2$buttonSelector,
        _ref2$labelSelector = _ref2.labelSelector,
        labelSelector = _ref2$labelSelector === void 0 ? '[data-ecl-label]' : _ref2$labelSelector,
        _ref2$labelExpanded = _ref2.labelExpanded,
        labelExpanded = _ref2$labelExpanded === void 0 ? 'data-ecl-label-expanded' : _ref2$labelExpanded,
        _ref2$labelCollapsed = _ref2.labelCollapsed,
        labelCollapsed = _ref2$labelCollapsed === void 0 ? 'data-ecl-label-collapsed' : _ref2$labelCollapsed,
        _ref2$attachClickList = _ref2.attachClickListener,
        attachClickListener = _ref2$attachClickList === void 0 ? true : _ref2$attachClickList;
      // Check element
      if (!element || element.nodeType !== Node.ELEMENT_NODE) {
        throw new TypeError('DOM element should be given to initialize this widget.');
      }
      this.element = element;

      // Options
      this.buttonSelector = buttonSelector;
      this.labelSelector = labelSelector;
      this.labelExpanded = labelExpanded;
      this.labelCollapsed = labelCollapsed;
      this.attachClickListener = attachClickListener;

      // Private variables
      this.button = null;
      this.label = null;

      // Bind `this` for use in callbacks
      this.handleClickOnButton = this.handleClickOnButton.bind(this);
    }

    /**
     * Initialise component.
     */
    var _proto = Timeline.prototype;
    _proto.init = function init() {
      // Query elements
      this.button = queryOne(this.buttonSelector, this.element);

      // Get label, if any
      this.label = queryOne(this.labelSelector, this.element);

      // Bind click event on button
      if (this.attachClickListener && this.button) {
        this.button.addEventListener('click', this.handleClickOnButton);
      }

      // Set ecl initialized attribute
      this.element.setAttribute('data-ecl-auto-initialized', 'true');
    }

    /**
     * Destroy component.
     */;
    _proto.destroy = function destroy() {
      if (this.attachClickListener && this.button) {
        this.button.removeEventListener('click', this.handleClickOnButton);
      }
      if (this.element) {
        this.element.removeAttribute('data-ecl-auto-initialized');
      }
    }

    /**
     * Expand timeline if not such already.
     */;
    _proto.handleClickOnButton = function handleClickOnButton() {
      // Get current status
      var isExpanded = this.button.getAttribute('aria-expanded') === 'true';

      // Toggle the expandable/collapsible
      this.button.setAttribute('aria-expanded', isExpanded ? 'false' : 'true');
      if (isExpanded) {
        this.element.removeAttribute('data-ecl-timeline-expanded');
        // Scroll up to the button
        this.button.blur();
        this.button.focus();
      } else {
        this.element.setAttribute('data-ecl-timeline-expanded', 'true');
      }

      // Toggle label if possible
      if (this.label && !isExpanded && this.button.hasAttribute(this.labelExpanded)) {
        this.label.innerHTML = this.button.getAttribute(this.labelExpanded);
      } else if (this.label && isExpanded && this.button.hasAttribute(this.labelCollapsed)) {
        this.label.innerHTML = this.button.getAttribute(this.labelCollapsed);
      }
      return this;
    };
    return Timeline;
  }();

  exports.Timeline = Timeline;
  exports.default = Timeline;

  Object.defineProperty(exports, '__esModule', { value: true });

  return exports;

})({});
