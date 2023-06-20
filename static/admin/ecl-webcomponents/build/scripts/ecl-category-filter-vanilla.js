var ECL = (function (exports) {
  'use strict';

  var queryAll = function queryAll(selector, context) {
    if (context === void 0) {
      context = document;
    }
    return [].slice.call(context.querySelectorAll(selector));
  };

  /**
   * @param {HTMLElement} element DOM element for component instantiation and scope
   * @param {Object} options
   * @param {String} options.itemSelector Selector for the tree parent items
   * @param {Boolean} options.attachClickListener Whether or not to bind click events
   */
  var CategoryFilter = /*#__PURE__*/function () {
    /**
     * @static
     * Shorthand for instance creation and initialisation.
     *
     * @param {HTMLElement} root DOM element for component instantiation and scope
     *
     * @return {CategoryFilter} An instance of CategoryFilter.
     */
    CategoryFilter.autoInit = function autoInit(root, _temp) {
      var _ref = _temp === void 0 ? {} : _temp,
        _ref$CATEGORY_FILTER = _ref.CATEGORY_FILTER,
        defaultOptions = _ref$CATEGORY_FILTER === void 0 ? {} : _ref$CATEGORY_FILTER;
      var categoryFilter = new CategoryFilter(root, defaultOptions);
      categoryFilter.init();
      root.ECLCategoryFilter = categoryFilter;
      return categoryFilter;
    };
    function CategoryFilter(element, _temp2) {
      var _ref2 = _temp2 === void 0 ? {} : _temp2,
        _ref2$itemSelector = _ref2.itemSelector,
        itemSelector = _ref2$itemSelector === void 0 ? '.ecl-category-filter__item--has-children' : _ref2$itemSelector,
        _ref2$attachClickList = _ref2.attachClickListener,
        attachClickListener = _ref2$attachClickList === void 0 ? true : _ref2$attachClickList;
      // Check element
      if (!element || element.nodeType !== Node.ELEMENT_NODE) {
        throw new TypeError('DOM element should be given to initialize this widget.');
      }
      this.element = element;

      // Options
      this.itemSelector = itemSelector;
      this.attachClickListener = attachClickListener;

      // Private variables
      this.items = null;

      // Bind `this` for use in callbacks
      this.handleClickExpand = this.handleClickExpand.bind(this);
    }

    /**
     * Initialise component.
     */
    var _proto = CategoryFilter.prototype;
    _proto.init = function init() {
      var _this = this;
      // Query elementslur
      this.items = queryAll(this.itemSelector, this.element);

      // Bind click event on open
      if (this.attachClickListener && this.items) {
        this.items.forEach(function (item) {
          return item.addEventListener('click', _this.handleClickExpand);
        });
      }

      // Set ecl initialized attribute
      this.element.setAttribute('data-ecl-auto-initialized', 'true');
    }

    /**
     * Destroy component.
     */;
    _proto.destroy = function destroy() {
      var _this2 = this;
      if (this.attachClickListener && this.items) {
        this.items.forEach(function (item) {
          item.removeEventListener('click', _this2.handleClickExpand, false);
        });
      }
      if (this.element) {
        this.element.removeAttribute('data-ecl-auto-initialized');
      }
    }

    /**
     * Expand tree list item.
     * @param {Event} e
     */;
    _proto.handleClickExpand = function handleClickExpand(e) {
      e.preventDefault();
      var treeItem = e.target.closest('.ecl-category-filter__item');
      var liItem = treeItem.closest('.ecl-category-filter__list-item');
      var ariaExpanded = liItem.getAttribute('aria-expanded');
      if (treeItem.classList.contains('ecl-category-filter__item--level-1')) {
        this.items.forEach(function (item) {
          if (item !== treeItem) {
            liItem.setAttribute('aria-expanded', 'false');
          }
        });
        if (ariaExpanded === 'true') {
          liItem.setAttribute('aria-expanded', 'false');
          liItem.classList.remove('ecl-category-filter__item--current');
          return;
        }
      }
      this.items.forEach(function (item) {
        if (item === treeItem) {
          item.classList.add('ecl-category-filter__item--current');
        } else {
          item.classList.remove('ecl-category-filter__item--current');
        }
      });
      liItem.setAttribute('aria-expanded', ariaExpanded === 'false' ? 'true' : 'false');
    };
    return CategoryFilter;
  }();

  exports.CategoryFilter = CategoryFilter;
  exports.default = CategoryFilter;

  Object.defineProperty(exports, '__esModule', { value: true });

  return exports;

})({});
