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
   * @param {String} options.rangeInputSelector Selector for the range input
   * @param {String} options.currentValueSelector Selector for the current value area
   * @param {Boolean} options.attachChangeListener Whether or not to bind change events on range
   */
  var Range = /*#__PURE__*/function () {
    /**
     * @static
     * Shorthand for instance creation and initialisation.
     *
     * @param {HTMLElement} root DOM element for component instantiation and scope
     *
     * @return {Range} An instance of Range.
     */
    Range.autoInit = function autoInit(root, _temp) {
      var _ref = _temp === void 0 ? {} : _temp,
        _ref$RANGE = _ref.RANGE,
        defaultOptions = _ref$RANGE === void 0 ? {} : _ref$RANGE;
      var range = new Range(root, defaultOptions);
      range.init();
      root.ECLRange = range;
      return range;
    };
    function Range(element, _temp2) {
      var _ref2 = _temp2 === void 0 ? {} : _temp2,
        _ref2$rangeInputSelec = _ref2.rangeInputSelector,
        rangeInputSelector = _ref2$rangeInputSelec === void 0 ? '[data-ecl-range-input]' : _ref2$rangeInputSelec,
        _ref2$currentValueSel = _ref2.currentValueSelector,
        currentValueSelector = _ref2$currentValueSel === void 0 ? '[data-ecl-range-value-current]' : _ref2$currentValueSel,
        _ref2$attachChangeLis = _ref2.attachChangeListener,
        attachChangeListener = _ref2$attachChangeLis === void 0 ? true : _ref2$attachChangeLis;
      // Check element
      if (!element || element.nodeType !== Node.ELEMENT_NODE) {
        throw new TypeError('DOM element should be given to initialize this widget.');
      }
      this.element = element;

      // Options
      this.rangeInputSelector = rangeInputSelector;
      this.currentValueSelector = currentValueSelector;
      this.attachChangeListener = attachChangeListener;

      // Private variables
      this.rangeInput = null;
      this.currentValue = null;

      // Bind `this` for use in callbacks
      this.handleChange = this.handleChange.bind(this);
    }

    /**
     * Initialise component.
     */
    var _proto = Range.prototype;
    _proto.init = function init() {
      this.rangeInput = queryOne(this.rangeInputSelector, this.element);
      this.currentValue = queryOne(this.currentValueSelector, this.element);
      if (this.rangeInput && this.currentValue) {
        // Display default value
        this.currentValue.innerHTML = this.rangeInput.value;

        // Bind change event on range
        if (this.attachChangeListener) {
          this.rangeInput.addEventListener('input', this.handleChange);
        }
      }

      // Set ecl initialized attribute
      this.element.setAttribute('data-ecl-auto-initialized', 'true');
    }

    /**
     * Destroy component.
     */;
    _proto.destroy = function destroy() {
      if (this.attachChangeListener && this.rangeInput && this.currentValue) {
        this.rangeInput.removeEventListener('input', this.handleChange);
      }
      if (this.element) {
        this.element.removeAttribute('data-ecl-auto-initialized');
      }
    }

    /**
     * Display value when changed
     */;
    _proto.handleChange = function handleChange() {
      // Update value
      this.currentValue.innerHTML = this.rangeInput.value;
    };
    return Range;
  }();

  exports.Range = Range;
  exports.default = Range;

  Object.defineProperty(exports, '__esModule', { value: true });

  return exports;

})({});
