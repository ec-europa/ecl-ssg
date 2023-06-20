var ECL = (function (exports) {
  'use strict';

  var queryAll = function queryAll(selector, context) {
    if (context === void 0) {
      context = document;
    }
    return [].slice.call(context.querySelectorAll(selector));
  };
  var queryOne = function queryOne(selector, context) {
    if (context === void 0) {
      context = document;
    }
    return context.querySelector(selector);
  };

  /**
   * @param {HTMLElement} element DOM element for component instantiation and scope
   * @param {Object} options
   * @param {String} options.ellipsisButtonSelector
   * @param {String} options.ellipsisSelector
   * @param {String} options.segmentSelector
   * @param {String} options.expandableItemsSelector
   * @param {String} options.staticItemsSelector
   * @param {Function} options.onPartialExpand
   * @param {Function} options.onFullExpand
   * @param {Boolean} options.attachClickListener
   */
  var Breadcrumb = /*#__PURE__*/function () {
    /**
     * @static
     * Shorthand for instance creation and initialisation.
     *
     * @param {HTMLElement} root DOM element for component instantiation and scope
     *
     * @return {Breadcrumb} An instance of Breadcrumb.
     */
    Breadcrumb.autoInit = function autoInit(root, _temp) {
      var _ref = _temp === void 0 ? {} : _temp,
        _ref$BREADCRUMB = _ref.BREADCRUMB,
        defaultOptions = _ref$BREADCRUMB === void 0 ? {} : _ref$BREADCRUMB;
      var breadcrumb = new Breadcrumb(root, defaultOptions);
      breadcrumb.init();
      root.ECLBreadcrumb = breadcrumb;
      return breadcrumb;
    };
    function Breadcrumb(element, _temp2) {
      var _ref2 = _temp2 === void 0 ? {} : _temp2,
        _ref2$ellipsisButtonS = _ref2.ellipsisButtonSelector,
        ellipsisButtonSelector = _ref2$ellipsisButtonS === void 0 ? '[data-ecl-breadcrumb-ellipsis-button]' : _ref2$ellipsisButtonS,
        _ref2$ellipsisSelecto = _ref2.ellipsisSelector,
        ellipsisSelector = _ref2$ellipsisSelecto === void 0 ? '[data-ecl-breadcrumb-ellipsis]' : _ref2$ellipsisSelecto,
        _ref2$segmentSelector = _ref2.segmentSelector,
        segmentSelector = _ref2$segmentSelector === void 0 ? '[data-ecl-breadcrumb-item]' : _ref2$segmentSelector,
        _ref2$expandableItems = _ref2.expandableItemsSelector,
        expandableItemsSelector = _ref2$expandableItems === void 0 ? '[data-ecl-breadcrumb-item="expandable"]' : _ref2$expandableItems,
        _ref2$staticItemsSele = _ref2.staticItemsSelector,
        staticItemsSelector = _ref2$staticItemsSele === void 0 ? '[data-ecl-breadcrumb-item="static"]' : _ref2$staticItemsSele,
        _ref2$onPartialExpand = _ref2.onPartialExpand,
        onPartialExpand = _ref2$onPartialExpand === void 0 ? null : _ref2$onPartialExpand,
        _ref2$onFullExpand = _ref2.onFullExpand,
        onFullExpand = _ref2$onFullExpand === void 0 ? null : _ref2$onFullExpand,
        _ref2$attachClickList = _ref2.attachClickListener,
        attachClickListener = _ref2$attachClickList === void 0 ? true : _ref2$attachClickList;
      // Check element
      if (!element || element.nodeType !== Node.ELEMENT_NODE) {
        throw new TypeError('DOM element should be given to initialize this widget.');
      }
      this.element = element;

      // Options
      this.ellipsisButtonSelector = ellipsisButtonSelector;
      this.ellipsisSelector = ellipsisSelector;
      this.segmentSelector = segmentSelector;
      this.expandableItemsSelector = expandableItemsSelector;
      this.staticItemsSelector = staticItemsSelector;
      this.onPartialExpand = onPartialExpand;
      this.onFullExpand = onFullExpand;
      this.attachClickListener = attachClickListener;

      // Private variables
      this.ellipsisButton = null;
      this.itemsElements = null;
      this.staticElements = null;
      this.expandableElements = null;

      // Bind `this` for use in callbacks
      this.handleClickOnEllipsis = this.handleClickOnEllipsis.bind(this);
    }

    /**
     * Initialise component.
     */
    var _proto = Breadcrumb.prototype;
    _proto.init = function init() {
      this.ellipsisButton = queryOne(this.ellipsisButtonSelector, this.element);

      // Bind click event on ellipsis
      if (this.attachClickListener && this.ellipsisButton) {
        this.ellipsisButton.addEventListener('click', this.handleClickOnEllipsis);
      }
      this.itemsElements = queryAll(this.segmentSelector, this.element);
      this.staticElements = queryAll(this.staticItemsSelector, this.element);
      this.expandableElements = queryAll(this.expandableItemsSelector, this.element);
      this.check();
    }

    /**
     * Destroy component.
     */;
    _proto.destroy = function destroy() {
      if (this.attachClickListener && this.ellipsisButton) {
        this.ellipsisButton.removeEventListener('click', this.handleClickOnEllipsis);
      }
    }

    /**
     * Invoke event listener attached on the elipsis. Traslates to a full expand.
     */;
    _proto.handleClickOnEllipsis = function handleClickOnEllipsis() {
      return this.handleFullExpand();
    }

    /**
     * Apply partial or full expand.
     */;
    _proto.check = function check() {
      var visibilityMap = this.computeVisibilityMap();
      if (!visibilityMap) return;
      if (visibilityMap.expanded === true) {
        this.handleFullExpand();
      } else {
        this.handlePartialExpand(visibilityMap);
      }
    }

    /**
     * Removes the elipsis element and its event listeners.
     */;
    _proto.hideEllipsis = function hideEllipsis() {
      // Hide ellipsis
      var ellipsis = queryOne(this.ellipsisSelector, this.element);
      if (ellipsis) {
        ellipsis.setAttribute('aria-hidden', 'true');
      }

      // Remove event listener
      if (this.attachClickListener && this.ellipsisButton) {
        this.ellipsisButton.removeEventListener('click', this.handleClickOnEllipsis);
      }
    }

    /**
     * Show all expandable elements.
     */;
    _proto.showAllItems = function showAllItems() {
      this.expandableElements.forEach(function (item) {
        return item.setAttribute('aria-hidden', 'false');
      });
    }

    /**
     * @param {Object} visibilityMap
     */;
    _proto.handlePartialExpand = function handlePartialExpand(visibilityMap) {
      if (!visibilityMap) return;
      var isItemVisible = visibilityMap.isItemVisible;
      if (!isItemVisible || !Array.isArray(isItemVisible)) return;
      if (this.onPartialExpand) {
        this.onPartialExpand(isItemVisible);
      } else {
        this.expandableElements.forEach(function (item, index) {
          item.setAttribute('aria-hidden', isItemVisible[index] ? 'false' : 'true');
        });
      }
    }

    /**
     * Display all elements.
     */;
    _proto.handleFullExpand = function handleFullExpand() {
      if (this.onFullExpand) {
        this.onFullExpand();
      } else {
        this.hideEllipsis();
        this.showAllItems();
      }
    }

    /**
     * Measure/evaluate which elements can be displayed and toggle those who don't fit.
     */;
    _proto.computeVisibilityMap = function computeVisibilityMap() {
      // Ignore if there are no expandableElements
      if (!this.expandableElements || this.expandableElements.length === 0) {
        return {
          expanded: true
        };
      }
      var wrapperWidth = Math.floor(this.element.getBoundingClientRect().width);

      // Get the sum of all items' width
      var allItemsWidth = this.itemsElements.map(function (breadcrumbSegment) {
        return breadcrumbSegment.getBoundingClientRect().width;
      }).reduce(function (a, b) {
        return a + b;
      });
      if (allItemsWidth <= wrapperWidth) {
        return {
          expanded: true
        };
      }
      var ellipsisItem = queryOne(this.ellipsisSelector, this.element);
      var ellipsisItemWidth = ellipsisItem.getBoundingClientRect().width;
      var incompressibleWidth = ellipsisItemWidth + this.staticElements.reduce(function (sum, currentItem) {
        return sum + currentItem.getBoundingClientRect().width;
      }, 0);
      if (incompressibleWidth >= wrapperWidth) {
        return {
          expanded: false,
          isItemVisible: [].concat(this.expandableElements.map(function () {
            return false;
          }))
        };
      }
      var previousItemsWidth = 0;
      var isPreviousItemVisible = true;

      // Careful: reverse() is destructive, that's why we make a copy of the array
      var isItemVisible = [].concat(this.expandableElements).reverse().map(function (otherSegment) {
        if (!isPreviousItemVisible) return false;
        previousItemsWidth += otherSegment.getBoundingClientRect().width;
        var isVisible = previousItemsWidth + incompressibleWidth <= wrapperWidth;
        if (!isVisible) isPreviousItemVisible = false;
        return isVisible;
      }).reverse();
      return {
        expanded: false,
        isItemVisible: isItemVisible
      };
    };
    return Breadcrumb;
  }();

  exports.Breadcrumb = Breadcrumb;
  exports.default = Breadcrumb;

  Object.defineProperty(exports, '__esModule', { value: true });

  return exports;

})({});
