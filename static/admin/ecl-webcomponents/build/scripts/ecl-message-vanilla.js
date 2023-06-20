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
   * @param {String} options.closeSelector Selector for closing the message
   * @param {Boolean} options.attachClickListener Whether or not to bind click events
   */
  var Message = /*#__PURE__*/function () {
    /**
     * @static
     * Shorthand for instance creation and initialisation.
     *
     * @param {HTMLElement} root DOM element for component instantiation and scope
     *
     * @return {Message} An instance of Message.
     */
    Message.autoInit = function autoInit(root, _temp) {
      var _ref = _temp === void 0 ? {} : _temp,
        _ref$MESSAGE = _ref.MESSAGE,
        defaultOptions = _ref$MESSAGE === void 0 ? {} : _ref$MESSAGE;
      var message = new Message(root, defaultOptions);
      message.init();
      root.ECLMessage = message;
      return message;
    };
    function Message(element, _temp2) {
      var _ref2 = _temp2 === void 0 ? {} : _temp2,
        _ref2$closeSelector = _ref2.closeSelector,
        closeSelector = _ref2$closeSelector === void 0 ? '[data-ecl-message-close]' : _ref2$closeSelector,
        _ref2$attachClickList = _ref2.attachClickListener,
        attachClickListener = _ref2$attachClickList === void 0 ? true : _ref2$attachClickList;
      // Check element
      if (!element || element.nodeType !== Node.ELEMENT_NODE) {
        throw new TypeError('DOM element should be given to initialize this widget.');
      }
      this.element = element;

      // Options
      this.closeSelector = closeSelector;
      this.attachClickListener = attachClickListener;

      // Private variables
      this.close = null;

      // Bind `this` for use in callbacks
      this.handleClickOnClose = this.handleClickOnClose.bind(this);
    }

    /**
     * Initialise component.
     */
    var _proto = Message.prototype;
    _proto.init = function init() {
      this.close = queryOne(this.closeSelector, this.element);

      // Bind click event on close
      if (this.attachClickListener && this.close) {
        this.close.addEventListener('click', this.handleClickOnClose);
      }

      // Set ecl initialized attribute
      this.element.setAttribute('data-ecl-auto-initialized', 'true');
    }

    /**
     * Destroy component.
     */;
    _proto.destroy = function destroy() {
      if (this.attachClickListener && this.close) {
        this.close.removeEventListener('click', this.handleClickOnClose);
      }
      if (this.element) {
        this.element.removeAttribute('data-ecl-auto-initialized');
      }
    }

    /**
     * Remove the message component.
     */;
    _proto.handleClickOnClose = function handleClickOnClose() {
      // IE way to remove a node...
      if (this.element.parentNode) {
        this.element.parentNode.removeChild(this.element);
      }
      return this;
    };
    return Message;
  }();

  exports.Message = Message;
  exports.default = Message;

  Object.defineProperty(exports, '__esModule', { value: true });

  return exports;

})({});
