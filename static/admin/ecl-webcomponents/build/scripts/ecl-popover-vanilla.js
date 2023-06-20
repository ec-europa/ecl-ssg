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
   * @param {String} options.toggleSelector Selector for toggling element
   * @param {Boolean} options.attachClickListener Whether or not to bind click events on toggle
   * @param {Boolean} options.attachKeyListener Whether or not to bind keyboard events
   */
  var Popover = /*#__PURE__*/function () {
    /**
     * @static
     * Shorthand for instance creation and initialisation.
     *
     * @param {HTMLElement} root DOM element for component instantiation and scope
     *
     * @return {Popover} An instance of Popover.
     */
    Popover.autoInit = function autoInit(root, _temp) {
      var _ref = _temp === void 0 ? {} : _temp,
        _ref$POPOVER = _ref.POPOVER,
        defaultOptions = _ref$POPOVER === void 0 ? {} : _ref$POPOVER;
      var popover = new Popover(root, defaultOptions);
      popover.init();
      root.ECLPopover = popover;
      return popover;
    };
    function Popover(element, _temp2) {
      var _ref2 = _temp2 === void 0 ? {} : _temp2,
        _ref2$toggleSelector = _ref2.toggleSelector,
        toggleSelector = _ref2$toggleSelector === void 0 ? '[data-ecl-popover-toggle]' : _ref2$toggleSelector,
        _ref2$attachClickList = _ref2.attachClickListener,
        attachClickListener = _ref2$attachClickList === void 0 ? true : _ref2$attachClickList,
        _ref2$attachKeyListen = _ref2.attachKeyListener,
        attachKeyListener = _ref2$attachKeyListen === void 0 ? true : _ref2$attachKeyListen;
      // Check element
      if (!element || element.nodeType !== Node.ELEMENT_NODE) {
        throw new TypeError('DOM element should be given to initialize this widget.');
      }
      this.element = element;

      // Options
      this.toggleSelector = toggleSelector;
      this.attachClickListener = attachClickListener;
      this.attachKeyListener = attachKeyListener;

      // Private variables
      this.toggle = null;
      this.target = null;

      // Bind `this` for use in callbacks
      this.openPopover = this.openPopover.bind(this);
      this.closePopover = this.closePopover.bind(this);
      this.positionPopover = this.positionPopover.bind(this);
      this.handleClickOnToggle = this.handleClickOnToggle.bind(this);
      this.handleKeyboardGlobal = this.handleKeyboardGlobal.bind(this);
      this.handleClickGlobal = this.handleClickGlobal.bind(this);
    }

    /**
     * Initialise component.
     */
    var _proto = Popover.prototype;
    _proto.init = function init() {
      this.toggle = queryOne(this.toggleSelector, this.element);

      // Bind global events
      if (this.attachKeyListener) {
        document.addEventListener('keyup', this.handleKeyboardGlobal);
      }
      if (this.attachClickListener) {
        document.addEventListener('click', this.handleClickGlobal);
      }

      // Get target element
      this.target = document.querySelector("#" + this.toggle.getAttribute('aria-controls'));

      // Exit if no target found
      if (!this.target) {
        throw new TypeError('Target has to be provided for popover (aria-controls)');
      }

      // Bind click event on toggle
      if (this.attachClickListener && this.toggle) {
        this.toggle.addEventListener('click', this.handleClickOnToggle);
      }

      // Set ecl initialized attribute
      this.element.setAttribute('data-ecl-auto-initialized', 'true');
    }

    /**
     * Destroy component.
     */;
    _proto.destroy = function destroy() {
      if (this.attachClickListener && this.toggle) {
        this.toggle.removeEventListener('click', this.handleClickOnToggle);
      }
      if (this.attachKeyListener) {
        document.removeEventListener('keyup', this.handleKeyboardGlobal);
      }
      if (this.attachClickListener) {
        document.removeEventListener('click', this.handleClickGlobal);
      }
      if (this.element) {
        this.element.removeAttribute('data-ecl-auto-initialized');
      }
    }

    /**
     * Toggles between collapsed/expanded states.
     *
     * @param {Event} e
     */;
    _proto.handleClickOnToggle = function handleClickOnToggle(e) {
      e.preventDefault();

      // Get current status
      var isExpanded = this.toggle.getAttribute('aria-expanded') === 'true';

      // Toggle the popover
      if (isExpanded) {
        this.closePopover();
        return;
      }
      this.openPopover();
      this.positionPopover();
    }

    /**
     * Open the popover.
     */;
    _proto.openPopover = function openPopover() {
      this.toggle.setAttribute('aria-expanded', 'true');
      this.target.hidden = false;
    }

    /**
     * Close the popover.
     */;
    _proto.closePopover = function closePopover() {
      this.toggle.setAttribute('aria-expanded', 'false');
      this.target.hidden = true;
    }

    /**
     * Manage popover position.
     */;
    _proto.positionPopover = function positionPopover() {
      // Check available space
      this.element.classList.remove('ecl-popover--top');
      this.element.classList.remove('ecl-popover--push-left');
      this.element.classList.remove('ecl-popover--push-right');
      var toggleRect = this.toggle.getBoundingClientRect();
      var popoverRect = this.target.getBoundingClientRect();
      var popoverHeight = this.target.clientHeight;
      var screenHeight = window.innerHeight;
      var screenWidth = window.innerWidth;
      if (popoverHeight > 0 && screenHeight - toggleRect.top < popoverHeight) {
        this.element.classList.add('ecl-popover--top');
      }
      if (popoverRect.left < 0) {
        this.element.classList.add('ecl-popover--push-left');

        // Adapt arrow position
        this.target.style.setProperty('--ecl-popover-position', toggleRect.width / 2 + "px");
      }
      if (popoverRect.right > screenWidth) {
        this.element.classList.add('ecl-popover--push-right');

        // Adapt arrow position
        this.target.style.setProperty('--ecl-popover-position', "calc(" + toggleRect.width / 2 + "px - 0.5rem)");
      }
    }

    /**
     * Handles global keyboard events, triggered outside of the popover.
     *
     * @param {Event} e
     */;
    _proto.handleKeyboardGlobal = function handleKeyboardGlobal(e) {
      if (!this.target) return;

      // Detect press on Escape
      if (e.key === 'Escape' || e.key === 'Esc') {
        this.closePopover();
      }
    }

    /**
     * Handles global click events, triggered outside of the popover.
     *
     * @param {Event} e
     */;
    _proto.handleClickGlobal = function handleClickGlobal(e) {
      if (!this.target) return;

      // Check if the popover is open
      if (this.toggle.getAttribute('aria-expanded') === 'true') {
        // Check if the click occured on the popover
        if (!this.target.contains(e.target) && !this.toggle.contains(e.target)) {
          this.closePopover();
        }
      }
    };
    return Popover;
  }();

  exports.Popover = Popover;
  exports.default = Popover;

  Object.defineProperty(exports, '__esModule', { value: true });

  return exports;

})({});
