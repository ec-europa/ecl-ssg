var ECL = (function (exports) {
	'use strict';

	function unwrapExports (x) {
		return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
	}

	function createCommonjsModule(fn, module) {
		return module = { exports: {} }, fn(module, module.exports), module.exports;
	}

	var stickyfill = createCommonjsModule(function (module) {
	  (function (window, document) {

	    /*
	     * 1. Check if the browser supports `position: sticky` natively or is too old to run the polyfill.
	     *    If either of these is the case set `seppuku` flag. It will be checked later to disable key features
	     *    of the polyfill, but the API will remain functional to avoid breaking things.
	     */
	    var _createClass = function () {
	      function defineProperties(target, props) {
	        for (var i = 0; i < props.length; i++) {
	          var descriptor = props[i];
	          descriptor.enumerable = descriptor.enumerable || false;
	          descriptor.configurable = true;
	          if ("value" in descriptor) descriptor.writable = true;
	          Object.defineProperty(target, descriptor.key, descriptor);
	        }
	      }
	      return function (Constructor, protoProps, staticProps) {
	        if (protoProps) defineProperties(Constructor.prototype, protoProps);
	        if (staticProps) defineProperties(Constructor, staticProps);
	        return Constructor;
	      };
	    }();
	    function _classCallCheck(instance, Constructor) {
	      if (!(instance instanceof Constructor)) {
	        throw new TypeError("Cannot call a class as a function");
	      }
	    }
	    var seppuku = false;
	    var isWindowDefined = typeof window !== 'undefined';

	    // The polyfill can’t function properly without `window` or `window.getComputedStyle`.
	    if (!isWindowDefined || !window.getComputedStyle) seppuku = true;
	    // Dont’t get in a way if the browser supports `position: sticky` natively.
	    else {
	      (function () {
	        var testNode = document.createElement('div');
	        if (['', '-webkit-', '-moz-', '-ms-'].some(function (prefix) {
	          try {
	            testNode.style.position = prefix + 'sticky';
	          } catch (e) {}
	          return testNode.style.position != '';
	        })) seppuku = true;
	      })();
	    }

	    /*
	     * 2. “Global” vars used across the polyfill
	     */
	    var isInitialized = false;

	    // Check if Shadow Root constructor exists to make further checks simpler
	    var shadowRootExists = typeof ShadowRoot !== 'undefined';

	    // Last saved scroll position
	    var scroll = {
	      top: null,
	      left: null
	    };

	    // Array of created Sticky instances
	    var stickies = [];

	    /*
	     * 3. Utility functions
	     */
	    function extend(targetObj, sourceObject) {
	      for (var key in sourceObject) {
	        if (sourceObject.hasOwnProperty(key)) {
	          targetObj[key] = sourceObject[key];
	        }
	      }
	    }
	    function parseNumeric(val) {
	      return parseFloat(val) || 0;
	    }
	    function getDocOffsetTop(node) {
	      var docOffsetTop = 0;
	      while (node) {
	        docOffsetTop += node.offsetTop;
	        node = node.offsetParent;
	      }
	      return docOffsetTop;
	    }

	    /*
	     * 4. Sticky class
	     */

	    var Sticky = function () {
	      function Sticky(node) {
	        _classCallCheck(this, Sticky);
	        if (!(node instanceof HTMLElement)) throw new Error('First argument must be HTMLElement');
	        if (stickies.some(function (sticky) {
	          return sticky._node === node;
	        })) throw new Error('Stickyfill is already applied to this node');
	        this._node = node;
	        this._stickyMode = null;
	        this._active = false;
	        stickies.push(this);
	        this.refresh();
	      }
	      _createClass(Sticky, [{
	        key: 'refresh',
	        value: function refresh() {
	          if (seppuku || this._removed) return;
	          if (this._active) this._deactivate();
	          var node = this._node;

	          /*
	           * 1. Save node computed props
	           */
	          var nodeComputedStyle = getComputedStyle(node);
	          var nodeComputedProps = {
	            position: nodeComputedStyle.position,
	            top: nodeComputedStyle.top,
	            display: nodeComputedStyle.display,
	            marginTop: nodeComputedStyle.marginTop,
	            marginBottom: nodeComputedStyle.marginBottom,
	            marginLeft: nodeComputedStyle.marginLeft,
	            marginRight: nodeComputedStyle.marginRight,
	            cssFloat: nodeComputedStyle.cssFloat
	          };

	          /*
	           * 2. Check if the node can be activated
	           */
	          if (isNaN(parseFloat(nodeComputedProps.top)) || nodeComputedProps.display == 'table-cell' || nodeComputedProps.display == 'none') return;
	          this._active = true;

	          /*
	           * 3. Check if the current node position is `sticky`. If it is, it means that the browser supports sticky positioning,
	           *    but the polyfill was force-enabled. We set the node’s position to `static` before continuing, so that the node
	           *    is in it’s initial position when we gather its params.
	           */
	          var originalPosition = node.style.position;
	          if (nodeComputedStyle.position == 'sticky' || nodeComputedStyle.position == '-webkit-sticky') node.style.position = 'static';

	          /*
	           * 4. Get necessary node parameters
	           */
	          var referenceNode = node.parentNode;
	          var parentNode = shadowRootExists && referenceNode instanceof ShadowRoot ? referenceNode.host : referenceNode;
	          var nodeWinOffset = node.getBoundingClientRect();
	          var parentWinOffset = parentNode.getBoundingClientRect();
	          var parentComputedStyle = getComputedStyle(parentNode);
	          this._parent = {
	            node: parentNode,
	            styles: {
	              position: parentNode.style.position
	            },
	            offsetHeight: parentNode.offsetHeight
	          };
	          this._offsetToWindow = {
	            left: nodeWinOffset.left,
	            right: document.documentElement.clientWidth - nodeWinOffset.right
	          };
	          this._offsetToParent = {
	            top: nodeWinOffset.top - parentWinOffset.top - parseNumeric(parentComputedStyle.borderTopWidth),
	            left: nodeWinOffset.left - parentWinOffset.left - parseNumeric(parentComputedStyle.borderLeftWidth),
	            right: -nodeWinOffset.right + parentWinOffset.right - parseNumeric(parentComputedStyle.borderRightWidth)
	          };
	          this._styles = {
	            position: originalPosition,
	            top: node.style.top,
	            bottom: node.style.bottom,
	            left: node.style.left,
	            right: node.style.right,
	            width: node.style.width,
	            marginTop: node.style.marginTop,
	            marginLeft: node.style.marginLeft,
	            marginRight: node.style.marginRight
	          };
	          var nodeTopValue = parseNumeric(nodeComputedProps.top);
	          this._limits = {
	            start: nodeWinOffset.top + window.pageYOffset - nodeTopValue,
	            end: parentWinOffset.top + window.pageYOffset + parentNode.offsetHeight - parseNumeric(parentComputedStyle.borderBottomWidth) - node.offsetHeight - nodeTopValue - parseNumeric(nodeComputedProps.marginBottom)
	          };

	          /*
	           * 5. Ensure that the node will be positioned relatively to the parent node
	           */
	          var parentPosition = parentComputedStyle.position;
	          if (parentPosition != 'absolute' && parentPosition != 'relative') {
	            parentNode.style.position = 'relative';
	          }

	          /*
	           * 6. Recalc node position.
	           *    It’s important to do this before clone injection to avoid scrolling bug in Chrome.
	           */
	          this._recalcPosition();

	          /*
	           * 7. Create a clone
	           */
	          var clone = this._clone = {};
	          clone.node = document.createElement('div');

	          // Apply styles to the clone
	          extend(clone.node.style, {
	            width: nodeWinOffset.right - nodeWinOffset.left + 'px',
	            height: nodeWinOffset.bottom - nodeWinOffset.top + 'px',
	            marginTop: nodeComputedProps.marginTop,
	            marginBottom: nodeComputedProps.marginBottom,
	            marginLeft: nodeComputedProps.marginLeft,
	            marginRight: nodeComputedProps.marginRight,
	            cssFloat: nodeComputedProps.cssFloat,
	            padding: 0,
	            border: 0,
	            borderSpacing: 0,
	            fontSize: '1em',
	            position: 'static'
	          });
	          referenceNode.insertBefore(clone.node, node);
	          clone.docOffsetTop = getDocOffsetTop(clone.node);
	        }
	      }, {
	        key: '_recalcPosition',
	        value: function _recalcPosition() {
	          if (!this._active || this._removed) return;
	          var stickyMode = scroll.top <= this._limits.start ? 'start' : scroll.top >= this._limits.end ? 'end' : 'middle';
	          if (this._stickyMode == stickyMode) return;
	          switch (stickyMode) {
	            case 'start':
	              extend(this._node.style, {
	                position: 'absolute',
	                left: this._offsetToParent.left + 'px',
	                right: this._offsetToParent.right + 'px',
	                top: this._offsetToParent.top + 'px',
	                bottom: 'auto',
	                width: 'auto',
	                marginLeft: 0,
	                marginRight: 0,
	                marginTop: 0
	              });
	              break;
	            case 'middle':
	              extend(this._node.style, {
	                position: 'fixed',
	                left: this._offsetToWindow.left + 'px',
	                right: this._offsetToWindow.right + 'px',
	                top: this._styles.top,
	                bottom: 'auto',
	                width: 'auto',
	                marginLeft: 0,
	                marginRight: 0,
	                marginTop: 0
	              });
	              break;
	            case 'end':
	              extend(this._node.style, {
	                position: 'absolute',
	                left: this._offsetToParent.left + 'px',
	                right: this._offsetToParent.right + 'px',
	                top: 'auto',
	                bottom: 0,
	                width: 'auto',
	                marginLeft: 0,
	                marginRight: 0
	              });
	              break;
	          }
	          this._stickyMode = stickyMode;
	        }
	      }, {
	        key: '_fastCheck',
	        value: function _fastCheck() {
	          if (!this._active || this._removed) return;
	          if (Math.abs(getDocOffsetTop(this._clone.node) - this._clone.docOffsetTop) > 1 || Math.abs(this._parent.node.offsetHeight - this._parent.offsetHeight) > 1) this.refresh();
	        }
	      }, {
	        key: '_deactivate',
	        value: function _deactivate() {
	          var _this = this;
	          if (!this._active || this._removed) return;
	          this._clone.node.parentNode.removeChild(this._clone.node);
	          delete this._clone;
	          extend(this._node.style, this._styles);
	          delete this._styles;

	          // Check whether element’s parent node is used by other stickies.
	          // If not, restore parent node’s styles.
	          if (!stickies.some(function (sticky) {
	            return sticky !== _this && sticky._parent && sticky._parent.node === _this._parent.node;
	          })) {
	            extend(this._parent.node.style, this._parent.styles);
	          }
	          delete this._parent;
	          this._stickyMode = null;
	          this._active = false;
	          delete this._offsetToWindow;
	          delete this._offsetToParent;
	          delete this._limits;
	        }
	      }, {
	        key: 'remove',
	        value: function remove() {
	          var _this2 = this;
	          this._deactivate();
	          stickies.some(function (sticky, index) {
	            if (sticky._node === _this2._node) {
	              stickies.splice(index, 1);
	              return true;
	            }
	          });
	          this._removed = true;
	        }
	      }]);
	      return Sticky;
	    }();

	    /*
	     * 5. Stickyfill API
	     */

	    var Stickyfill = {
	      stickies: stickies,
	      Sticky: Sticky,
	      forceSticky: function forceSticky() {
	        seppuku = false;
	        init();
	        this.refreshAll();
	      },
	      addOne: function addOne(node) {
	        // Check whether it’s a node
	        if (!(node instanceof HTMLElement)) {
	          // Maybe it’s a node list of some sort?
	          // Take first node from the list then
	          if (node.length && node[0]) node = node[0];else return;
	        }

	        // Check if Stickyfill is already applied to the node
	        // and return existing sticky
	        for (var i = 0; i < stickies.length; i++) {
	          if (stickies[i]._node === node) return stickies[i];
	        }

	        // Create and return new sticky
	        return new Sticky(node);
	      },
	      add: function add(nodeList) {
	        // If it’s a node make an array of one node
	        if (nodeList instanceof HTMLElement) nodeList = [nodeList];
	        // Check if the argument is an iterable of some sort
	        if (!nodeList.length) return;

	        // Add every element as a sticky and return an array of created Sticky instances
	        var addedStickies = [];
	        var _loop = function _loop(i) {
	          var node = nodeList[i];

	          // If it’s not an HTMLElement – create an empty element to preserve 1-to-1
	          // correlation with input list
	          if (!(node instanceof HTMLElement)) {
	            addedStickies.push(void 0);
	            return 'continue';
	          }

	          // If Stickyfill is already applied to the node
	          // add existing sticky
	          if (stickies.some(function (sticky) {
	            if (sticky._node === node) {
	              addedStickies.push(sticky);
	              return true;
	            }
	          })) return 'continue';

	          // Create and add new sticky
	          addedStickies.push(new Sticky(node));
	        };
	        for (var i = 0; i < nodeList.length; i++) {
	          var _ret2 = _loop(i);
	          if (_ret2 === 'continue') continue;
	        }
	        return addedStickies;
	      },
	      refreshAll: function refreshAll() {
	        stickies.forEach(function (sticky) {
	          return sticky.refresh();
	        });
	      },
	      removeOne: function removeOne(node) {
	        // Check whether it’s a node
	        if (!(node instanceof HTMLElement)) {
	          // Maybe it’s a node list of some sort?
	          // Take first node from the list then
	          if (node.length && node[0]) node = node[0];else return;
	        }

	        // Remove the stickies bound to the nodes in the list
	        stickies.some(function (sticky) {
	          if (sticky._node === node) {
	            sticky.remove();
	            return true;
	          }
	        });
	      },
	      remove: function remove(nodeList) {
	        // If it’s a node make an array of one node
	        if (nodeList instanceof HTMLElement) nodeList = [nodeList];
	        // Check if the argument is an iterable of some sort
	        if (!nodeList.length) return;

	        // Remove the stickies bound to the nodes in the list

	        var _loop2 = function _loop2(i) {
	          var node = nodeList[i];
	          stickies.some(function (sticky) {
	            if (sticky._node === node) {
	              sticky.remove();
	              return true;
	            }
	          });
	        };
	        for (var i = 0; i < nodeList.length; i++) {
	          _loop2(i);
	        }
	      },
	      removeAll: function removeAll() {
	        while (stickies.length) {
	          stickies[0].remove();
	        }
	      }
	    };

	    /*
	     * 6. Setup events (unless the polyfill was disabled)
	     */
	    function init() {
	      if (isInitialized) {
	        return;
	      }
	      isInitialized = true;

	      // Watch for scroll position changes and trigger recalc/refresh if needed
	      function checkScroll() {
	        if (window.pageXOffset != scroll.left) {
	          scroll.top = window.pageYOffset;
	          scroll.left = window.pageXOffset;
	          Stickyfill.refreshAll();
	        } else if (window.pageYOffset != scroll.top) {
	          scroll.top = window.pageYOffset;
	          scroll.left = window.pageXOffset;

	          // recalc position for all stickies
	          stickies.forEach(function (sticky) {
	            return sticky._recalcPosition();
	          });
	        }
	      }
	      checkScroll();
	      window.addEventListener('scroll', checkScroll);

	      // Watch for window resizes and device orientation changes and trigger refresh
	      window.addEventListener('resize', Stickyfill.refreshAll);
	      window.addEventListener('orientationchange', Stickyfill.refreshAll);

	      //Fast dirty check for layout changes every 500ms
	      var fastCheckTimer = void 0;
	      function startFastCheckTimer() {
	        fastCheckTimer = setInterval(function () {
	          stickies.forEach(function (sticky) {
	            return sticky._fastCheck();
	          });
	        }, 500);
	      }
	      function stopFastCheckTimer() {
	        clearInterval(fastCheckTimer);
	      }
	      var docHiddenKey = void 0;
	      var visibilityChangeEventName = void 0;
	      if ('hidden' in document) {
	        docHiddenKey = 'hidden';
	        visibilityChangeEventName = 'visibilitychange';
	      } else if ('webkitHidden' in document) {
	        docHiddenKey = 'webkitHidden';
	        visibilityChangeEventName = 'webkitvisibilitychange';
	      }
	      if (visibilityChangeEventName) {
	        if (!document[docHiddenKey]) startFastCheckTimer();
	        document.addEventListener(visibilityChangeEventName, function () {
	          if (document[docHiddenKey]) {
	            stopFastCheckTimer();
	          } else {
	            startFastCheckTimer();
	          }
	        });
	      } else startFastCheckTimer();
	    }
	    if (!seppuku) init();

	    /*
	     * 7. Expose Stickyfill
	     */
	    if (module.exports) {
	      module.exports = Stickyfill;
	    } else if (isWindowDefined) {
	      window.Stickyfill = Stickyfill;
	    }
	  })(window, document);
	});

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

	var dist = createCommonjsModule(function (module) {
	  module.exports = /******/function (modules) {
	    // webpackBootstrap
	    /******/ // The module cache
	    /******/
	    var installedModules = {};
	    /******/
	    /******/ // The require function
	    /******/
	    function __webpack_require__(moduleId) {
	      /******/
	      /******/ // Check if module is in cache
	      /******/if (installedModules[moduleId]) {
	        /******/return installedModules[moduleId].exports;
	        /******/
	      }
	      /******/ // Create a new module (and put it into the cache)
	      /******/
	      var module = installedModules[moduleId] = {
	        /******/i: moduleId,
	        /******/l: false,
	        /******/exports: {}
	        /******/
	      };
	      /******/
	      /******/ // Execute the module function
	      /******/
	      modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
	      /******/
	      /******/ // Flag the module as loaded
	      /******/
	      module.l = true;
	      /******/
	      /******/ // Return the exports of the module
	      /******/
	      return module.exports;
	      /******/
	    }
	    /******/
	    /******/
	    /******/ // expose the modules object (__webpack_modules__)
	    /******/
	    __webpack_require__.m = modules;
	    /******/
	    /******/ // expose the module cache
	    /******/
	    __webpack_require__.c = installedModules;
	    /******/
	    /******/ // define getter function for harmony exports
	    /******/
	    __webpack_require__.d = function (exports, name, getter) {
	      /******/if (!__webpack_require__.o(exports, name)) {
	        /******/Object.defineProperty(exports, name, {
	          /******/configurable: false,
	          /******/enumerable: true,
	          /******/get: getter
	          /******/
	        });
	        /******/
	      }
	      /******/
	    };
	    /******/
	    /******/ // getDefaultExport function for compatibility with non-harmony modules
	    /******/
	    __webpack_require__.n = function (module) {
	      /******/var getter = module && module.__esModule ? /******/function getDefault() {
	        return module['default'];
	      } : /******/function getModuleExports() {
	        return module;
	      };
	      /******/
	      __webpack_require__.d(getter, 'a', getter);
	      /******/
	      return getter;
	      /******/
	    };
	    /******/
	    /******/ // Object.prototype.hasOwnProperty.call
	    /******/
	    __webpack_require__.o = function (object, property) {
	      return Object.prototype.hasOwnProperty.call(object, property);
	    };
	    /******/
	    /******/ // __webpack_public_path__
	    /******/
	    __webpack_require__.p = "";
	    /******/
	    /******/ // Load entry module and return exports
	    /******/
	    return __webpack_require__(__webpack_require__.s = 1);
	    /******/
	  }
	  /************************************************************************/
	  /******/([/* 0 */
	  /***/function (module, exports, __webpack_require__) {

	    var DEVICE_TYPES = {
	      MOBILE: "mobile",
	      TABLET: "tablet",
	      SMART_TV: "smarttv",
	      CONSOLE: "console",
	      WEARABLE: "wearable",
	      BROWSER: undefined
	    };
	    var BROWSER_TYPES = {
	      CHROME: "Chrome",
	      FIREFOX: "Firefox",
	      OPERA: "Opera",
	      YANDEX: "Yandex",
	      SAFARI: "Safari",
	      INTERNET_EXPLORER: "Internet Explorer",
	      EDGE: "Edge",
	      CHROMIUM: "Chromium",
	      IE: "IE",
	      MOBILE_SAFARI: "Mobile Safari",
	      EDGE_CHROMIUM: "Edge Chromium"
	    };
	    var OS_TYPES = {
	      IOS: "iOS",
	      ANDROID: "Android",
	      WINDOWS_PHONE: "Windows Phone",
	      WINDOWS: "Windows",
	      MAC_OS: "Mac OS"
	    };
	    var defaultData = {
	      isMobile: false,
	      isTablet: false,
	      isBrowser: false,
	      isSmartTV: false,
	      isConsole: false,
	      isWearable: false
	    };
	    module.exports = {
	      BROWSER_TYPES: BROWSER_TYPES,
	      DEVICE_TYPES: DEVICE_TYPES,
	      OS_TYPES: OS_TYPES,
	      defaultData: defaultData
	    };

	    /***/
	  }, /* 1 */
	  /***/function (module, exports, __webpack_require__) {

	    var UAParser = __webpack_require__(2);
	    var _require = __webpack_require__(0),
	      BROWSER_TYPES = _require.BROWSER_TYPES,
	      OS_TYPES = _require.OS_TYPES,
	      DEVICE_TYPES = _require.DEVICE_TYPES;
	    var _require2 = __webpack_require__(4),
	      checkType = _require2.checkType,
	      broPayload = _require2.broPayload,
	      mobilePayload = _require2.mobilePayload,
	      wearPayload = _require2.wearPayload,
	      consolePayload = _require2.consolePayload,
	      stvPayload = _require2.stvPayload,
	      getNavigatorInstance = _require2.getNavigatorInstance,
	      isIOS13Check = _require2.isIOS13Check;
	    var UA = new UAParser();
	    var browser = UA.getBrowser();
	    var device = UA.getDevice();
	    var engine = UA.getEngine();
	    var os = UA.getOS();
	    var ua = UA.getUA();
	    var CHROME = BROWSER_TYPES.CHROME,
	      CHROMIUM = BROWSER_TYPES.CHROMIUM,
	      IE = BROWSER_TYPES.IE,
	      INTERNET_EXPLORER = BROWSER_TYPES.INTERNET_EXPLORER,
	      OPERA = BROWSER_TYPES.OPERA,
	      FIREFOX = BROWSER_TYPES.FIREFOX,
	      SAFARI = BROWSER_TYPES.SAFARI,
	      EDGE = BROWSER_TYPES.EDGE,
	      YANDEX = BROWSER_TYPES.YANDEX,
	      MOBILE_SAFARI = BROWSER_TYPES.MOBILE_SAFARI;
	    var MOBILE = DEVICE_TYPES.MOBILE,
	      TABLET = DEVICE_TYPES.TABLET,
	      SMART_TV = DEVICE_TYPES.SMART_TV,
	      BROWSER = DEVICE_TYPES.BROWSER,
	      WEARABLE = DEVICE_TYPES.WEARABLE,
	      CONSOLE = DEVICE_TYPES.CONSOLE;
	    var ANDROID = OS_TYPES.ANDROID,
	      WINDOWS_PHONE = OS_TYPES.WINDOWS_PHONE,
	      IOS = OS_TYPES.IOS,
	      WINDOWS = OS_TYPES.WINDOWS,
	      MAC_OS = OS_TYPES.MAC_OS;
	    var isMobileType = function isMobileType() {
	      return device.type === MOBILE;
	    };
	    var isTabletType = function isTabletType() {
	      return device.type === TABLET;
	    };
	    var isMobileAndTabletType = function isMobileAndTabletType() {
	      switch (device.type) {
	        case MOBILE:
	        case TABLET:
	          return true;
	        default:
	          return false;
	      }
	    };
	    var isEdgeChromiumType = function isEdgeChromiumType() {
	      if (os.name === OS_TYPES.WINDOWS && os.version === '10') {
	        return typeof ua === 'string' && ua.indexOf('Edg/') !== -1;
	      }
	      return false;
	    };
	    var isSmartTVType = function isSmartTVType() {
	      return device.type === SMART_TV;
	    };
	    var isBrowserType = function isBrowserType() {
	      return device.type === BROWSER;
	    };
	    var isWearableType = function isWearableType() {
	      return device.type === WEARABLE;
	    };
	    var isConsoleType = function isConsoleType() {
	      return device.type === CONSOLE;
	    };
	    var isAndroidType = function isAndroidType() {
	      return os.name === ANDROID;
	    };
	    var isWindowsType = function isWindowsType() {
	      return os.name === WINDOWS;
	    };
	    var isMacOsType = function isMacOsType() {
	      return os.name === MAC_OS;
	    };
	    var isWinPhoneType = function isWinPhoneType() {
	      return os.name === WINDOWS_PHONE;
	    };
	    var isIOSType = function isIOSType() {
	      return os.name === IOS;
	    };
	    var isChromeType = function isChromeType() {
	      return browser.name === CHROME;
	    };
	    var isFirefoxType = function isFirefoxType() {
	      return browser.name === FIREFOX;
	    };
	    var isChromiumType = function isChromiumType() {
	      return browser.name === CHROMIUM;
	    };
	    var isEdgeType = function isEdgeType() {
	      return browser.name === EDGE;
	    };
	    var isYandexType = function isYandexType() {
	      return browser.name === YANDEX;
	    };
	    var isSafariType = function isSafariType() {
	      return browser.name === SAFARI || browser.name === MOBILE_SAFARI;
	    };
	    var isMobileSafariType = function isMobileSafariType() {
	      return browser.name === MOBILE_SAFARI;
	    };
	    var isOperaType = function isOperaType() {
	      return browser.name === OPERA;
	    };
	    var isIEType = function isIEType() {
	      return browser.name === INTERNET_EXPLORER || browser.name === IE;
	    };
	    var isElectronType = function isElectronType() {
	      var nav = getNavigatorInstance();
	      var ua = nav && nav.userAgent.toLowerCase();
	      return typeof ua === 'string' ? /electron/.test(ua) : false;
	    };
	    var getIOS13 = function getIOS13() {
	      var nav = getNavigatorInstance();
	      return nav && (/iPad|iPhone|iPod/.test(nav.platform) || nav.platform === 'MacIntel' && nav.maxTouchPoints > 1) && !window.MSStream;
	    };
	    var getIPad13 = function getIPad13() {
	      return isIOS13Check('iPad');
	    };
	    var getIphone13 = function getIphone13() {
	      return isIOS13Check('iPhone');
	    };
	    var getIPod13 = function getIPod13() {
	      return isIOS13Check('iPod');
	    };
	    var getBrowserFullVersion = function getBrowserFullVersion() {
	      return browser.major;
	    };
	    var getBrowserVersion = function getBrowserVersion() {
	      return browser.version;
	    };
	    var getOsVersion = function getOsVersion() {
	      return os.version ? os.version : "none";
	    };
	    var getOsName = function getOsName() {
	      return os.name ? os.name : "none";
	    };
	    var getBrowserName = function getBrowserName() {
	      return browser.name;
	    };
	    var getMobileVendor = function getMobileVendor() {
	      return device.vendor ? device.vendor : "none";
	    };
	    var getMobileModel = function getMobileModel() {
	      return device.model ? device.model : "none";
	    };
	    var getEngineName = function getEngineName() {
	      return engine.name;
	    };
	    var getEngineVersion = function getEngineVersion() {
	      return engine.version;
	    };
	    var getUseragent = function getUseragent() {
	      return ua;
	    };
	    var getDeviceType = function getDeviceType() {
	      return device.type;
	    };
	    var isSmartTV = isSmartTVType();
	    var isConsole = isConsoleType();
	    var isWearable = isWearableType();
	    var isMobileSafari = isMobileSafariType() || getIPad13();
	    var isChromium = isChromiumType();
	    var isMobile = isMobileAndTabletType() || getIPad13();
	    var isMobileOnly = isMobileType();
	    var isTablet = isTabletType() || getIPad13();
	    var isBrowser = isBrowserType();
	    var isAndroid = isAndroidType();
	    var isWinPhone = isWinPhoneType();
	    var isIOS = isIOSType() || getIPad13();
	    var isChrome = isChromeType();
	    var isFirefox = isFirefoxType();
	    var isSafari = isSafariType();
	    var isOpera = isOperaType();
	    var isIE = isIEType();
	    var osVersion = getOsVersion();
	    var osName = getOsName();
	    var fullBrowserVersion = getBrowserFullVersion();
	    var browserVersion = getBrowserVersion();
	    var browserName = getBrowserName();
	    var mobileVendor = getMobileVendor();
	    var mobileModel = getMobileModel();
	    var engineName = getEngineName();
	    var engineVersion = getEngineVersion();
	    var getUA = getUseragent();
	    var isEdge = isEdgeType() || isEdgeChromiumType();
	    var isYandex = isYandexType();
	    var deviceType = getDeviceType();
	    var isIOS13 = getIOS13();
	    var isIPad13 = getIPad13();
	    var isIPhone13 = getIphone13();
	    var isIPod13 = getIPod13();
	    var isElectron = isElectronType();
	    var isEdgeChromium = isEdgeChromiumType();
	    var isLegacyEdge = isEdgeType();
	    var isWindows = isWindowsType();
	    var isMacOs = isMacOsType();
	    var type = checkType(device.type);
	    function deviceDetect() {
	      var isBrowser = type.isBrowser,
	        isMobile = type.isMobile,
	        isTablet = type.isTablet,
	        isSmartTV = type.isSmartTV,
	        isConsole = type.isConsole,
	        isWearable = type.isWearable;
	      if (isBrowser) {
	        return broPayload(isBrowser, browser, engine, os, ua);
	      }
	      if (isSmartTV) {
	        return stvPayload(isSmartTV, engine, os, ua);
	      }
	      if (isConsole) {
	        return consolePayload(isConsole, engine, os, ua);
	      }
	      if (isMobile) {
	        return mobilePayload(type, device, os, ua);
	      }
	      if (isTablet) {
	        return mobilePayload(type, device, os, ua);
	      }
	      if (isWearable) {
	        return wearPayload(isWearable, engine, os, ua);
	      }
	    }
	    module.exports = {
	      deviceDetect: deviceDetect,
	      isSmartTV: isSmartTV,
	      isConsole: isConsole,
	      isWearable: isWearable,
	      isMobileSafari: isMobileSafari,
	      isChromium: isChromium,
	      isMobile: isMobile,
	      isMobileOnly: isMobileOnly,
	      isTablet: isTablet,
	      isBrowser: isBrowser,
	      isAndroid: isAndroid,
	      isWinPhone: isWinPhone,
	      isIOS: isIOS,
	      isChrome: isChrome,
	      isFirefox: isFirefox,
	      isSafari: isSafari,
	      isOpera: isOpera,
	      isIE: isIE,
	      osVersion: osVersion,
	      osName: osName,
	      fullBrowserVersion: fullBrowserVersion,
	      browserVersion: browserVersion,
	      browserName: browserName,
	      mobileVendor: mobileVendor,
	      mobileModel: mobileModel,
	      engineName: engineName,
	      engineVersion: engineVersion,
	      getUA: getUA,
	      isEdge: isEdge,
	      isYandex: isYandex,
	      deviceType: deviceType,
	      isIOS13: isIOS13,
	      isIPad13: isIPad13,
	      isIPhone13: isIPhone13,
	      isIPod13: isIPod13,
	      isElectron: isElectron,
	      isEdgeChromium: isEdgeChromium,
	      isLegacyEdge: isLegacyEdge,
	      isWindows: isWindows,
	      isMacOs: isMacOs
	    };

	    /***/
	  }, /* 2 */
	  /***/function (module, exports, __webpack_require__) {
	    var __WEBPACK_AMD_DEFINE_RESULT__; /*!
	                                       * UAParser.js v0.7.18
	                                       * Lightweight JavaScript-based User-Agent string parser
	                                       * https://github.com/faisalman/ua-parser-js
	                                       *
	                                       * Copyright © 2012-2016 Faisal Salman <fyzlman@gmail.com>
	                                       * Dual licensed under GPLv2 or MIT
	                                       */
	    (function (window, undefined$1) {

	      var LIBVERSION = "0.7.18",
	        EMPTY = "",
	        UNKNOWN = "?",
	        FUNC_TYPE = "function",
	        UNDEF_TYPE = "undefined",
	        OBJ_TYPE = "object",
	        STR_TYPE = "string",
	        MAJOR = "major",
	        MODEL = "model",
	        NAME = "name",
	        TYPE = "type",
	        VENDOR = "vendor",
	        VERSION = "version",
	        ARCHITECTURE = "architecture",
	        CONSOLE = "console",
	        MOBILE = "mobile",
	        TABLET = "tablet",
	        SMARTTV = "smarttv",
	        WEARABLE = "wearable",
	        EMBEDDED = "embedded";
	      var util = {
	        extend: function extend(regexes, extensions) {
	          var margedRegexes = {};
	          for (var i in regexes) {
	            if (extensions[i] && extensions[i].length % 2 === 0) {
	              margedRegexes[i] = extensions[i].concat(regexes[i]);
	            } else {
	              margedRegexes[i] = regexes[i];
	            }
	          }
	          return margedRegexes;
	        },
	        has: function has(str1, str2) {
	          if (typeof str1 === "string") {
	            return str2.toLowerCase().indexOf(str1.toLowerCase()) !== -1;
	          } else {
	            return false;
	          }
	        },
	        lowerize: function lowerize(str) {
	          return str.toLowerCase();
	        },
	        major: function major(version) {
	          return typeof version === STR_TYPE ? version.replace(/[^\d\.]/g, "").split(".")[0] : undefined$1;
	        },
	        trim: function trim(str) {
	          return str.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "");
	        }
	      };
	      var mapper = {
	        rgx: function rgx(ua, arrays) {
	          var i = 0,
	            j,
	            k,
	            p,
	            q,
	            matches,
	            match;
	          while (i < arrays.length && !matches) {
	            var regex = arrays[i],
	              props = arrays[i + 1];
	            j = k = 0;
	            while (j < regex.length && !matches) {
	              matches = regex[j++].exec(ua);
	              if (!!matches) {
	                for (p = 0; p < props.length; p++) {
	                  match = matches[++k];
	                  q = props[p];
	                  if (typeof q === OBJ_TYPE && q.length > 0) {
	                    if (q.length == 2) {
	                      if (typeof q[1] == FUNC_TYPE) {
	                        this[q[0]] = q[1].call(this, match);
	                      } else {
	                        this[q[0]] = q[1];
	                      }
	                    } else if (q.length == 3) {
	                      if (typeof q[1] === FUNC_TYPE && !(q[1].exec && q[1].test)) {
	                        this[q[0]] = match ? q[1].call(this, match, q[2]) : undefined$1;
	                      } else {
	                        this[q[0]] = match ? match.replace(q[1], q[2]) : undefined$1;
	                      }
	                    } else if (q.length == 4) {
	                      this[q[0]] = match ? q[3].call(this, match.replace(q[1], q[2])) : undefined$1;
	                    }
	                  } else {
	                    this[q] = match ? match : undefined$1;
	                  }
	                }
	              }
	            }
	            i += 2;
	          }
	        },
	        str: function str(_str, map) {
	          for (var i in map) {
	            if (typeof map[i] === OBJ_TYPE && map[i].length > 0) {
	              for (var j = 0; j < map[i].length; j++) {
	                if (util.has(map[i][j], _str)) {
	                  return i === UNKNOWN ? undefined$1 : i;
	                }
	              }
	            } else if (util.has(map[i], _str)) {
	              return i === UNKNOWN ? undefined$1 : i;
	            }
	          }
	          return _str;
	        }
	      };
	      var maps = {
	        browser: {
	          oldsafari: {
	            version: {
	              "1.0": "/8",
	              1.2: "/1",
	              1.3: "/3",
	              "2.0": "/412",
	              "2.0.2": "/416",
	              "2.0.3": "/417",
	              "2.0.4": "/419",
	              "?": "/"
	            }
	          }
	        },
	        device: {
	          amazon: {
	            model: {
	              "Fire Phone": ["SD", "KF"]
	            }
	          },
	          sprint: {
	            model: {
	              "Evo Shift 4G": "7373KT"
	            },
	            vendor: {
	              HTC: "APA",
	              Sprint: "Sprint"
	            }
	          }
	        },
	        os: {
	          windows: {
	            version: {
	              ME: "4.90",
	              "NT 3.11": "NT3.51",
	              "NT 4.0": "NT4.0",
	              2000: "NT 5.0",
	              XP: ["NT 5.1", "NT 5.2"],
	              Vista: "NT 6.0",
	              7: "NT 6.1",
	              8: "NT 6.2",
	              8.1: "NT 6.3",
	              10: ["NT 6.4", "NT 10.0"],
	              RT: "ARM"
	            }
	          }
	        }
	      };
	      var regexes = {
	        browser: [[/(opera\smini)\/([\w\.-]+)/i, /(opera\s[mobiletab]+).+version\/([\w\.-]+)/i, /(opera).+version\/([\w\.]+)/i, /(opera)[\/\s]+([\w\.]+)/i], [NAME, VERSION], [/(opios)[\/\s]+([\w\.]+)/i], [[NAME, "Opera Mini"], VERSION], [/\s(opr)\/([\w\.]+)/i], [[NAME, "Opera"], VERSION], [/(kindle)\/([\w\.]+)/i, /(lunascape|maxthon|netfront|jasmine|blazer)[\/\s]?([\w\.]*)/i, /(avant\s|iemobile|slim|baidu)(?:browser)?[\/\s]?([\w\.]*)/i, /(?:ms|\()(ie)\s([\w\.]+)/i, /(rekonq)\/([\w\.]*)/i, /(chromium|flock|rockmelt|midori|epiphany|silk|skyfire|ovibrowser|bolt|iron|vivaldi|iridium|phantomjs|bowser|quark)\/([\w\.-]+)/i], [NAME, VERSION], [/(trident).+rv[:\s]([\w\.]+).+like\sgecko/i], [[NAME, "IE"], VERSION], [/(edge|edgios|edgea)\/((\d+)?[\w\.]+)/i], [[NAME, "Edge"], VERSION], [/(yabrowser)\/([\w\.]+)/i], [[NAME, "Yandex"], VERSION], [/(puffin)\/([\w\.]+)/i], [[NAME, "Puffin"], VERSION], [/((?:[\s\/])uc?\s?browser|(?:juc.+)ucweb)[\/\s]?([\w\.]+)/i], [[NAME, "UCBrowser"], VERSION], [/(comodo_dragon)\/([\w\.]+)/i], [[NAME, /_/g, " "], VERSION], [/(micromessenger)\/([\w\.]+)/i], [[NAME, "WeChat"], VERSION], [/(qqbrowserlite)\/([\w\.]+)/i], [NAME, VERSION], [/(QQ)\/([\d\.]+)/i], [NAME, VERSION], [/m?(qqbrowser)[\/\s]?([\w\.]+)/i], [NAME, VERSION], [/(BIDUBrowser)[\/\s]?([\w\.]+)/i], [NAME, VERSION], [/(2345Explorer)[\/\s]?([\w\.]+)/i], [NAME, VERSION], [/(MetaSr)[\/\s]?([\w\.]+)/i], [NAME], [/(LBBROWSER)/i], [NAME], [/xiaomi\/miuibrowser\/([\w\.]+)/i], [VERSION, [NAME, "MIUI Browser"]], [/;fbav\/([\w\.]+);/i], [VERSION, [NAME, "Facebook"]], [/headlesschrome(?:\/([\w\.]+)|\s)/i], [VERSION, [NAME, "Chrome Headless"]], [/\swv\).+(chrome)\/([\w\.]+)/i], [[NAME, /(.+)/, "$1 WebView"], VERSION], [/((?:oculus|samsung)browser)\/([\w\.]+)/i], [[NAME, /(.+(?:g|us))(.+)/, "$1 $2"], VERSION], [/android.+version\/([\w\.]+)\s+(?:mobile\s?safari|safari)*/i], [VERSION, [NAME, "Android Browser"]], [/(chrome|omniweb|arora|[tizenoka]{5}\s?browser)\/v?([\w\.]+)/i], [NAME, VERSION], [/(dolfin)\/([\w\.]+)/i], [[NAME, "Dolphin"], VERSION], [/((?:android.+)crmo|crios)\/([\w\.]+)/i], [[NAME, "Chrome"], VERSION], [/(coast)\/([\w\.]+)/i], [[NAME, "Opera Coast"], VERSION], [/fxios\/([\w\.-]+)/i], [VERSION, [NAME, "Firefox"]], [/version\/([\w\.]+).+?mobile\/\w+\s(safari)/i], [VERSION, [NAME, "Mobile Safari"]], [/version\/([\w\.]+).+?(mobile\s?safari|safari)/i], [VERSION, NAME], [/webkit.+?(gsa)\/([\w\.]+).+?(mobile\s?safari|safari)(\/[\w\.]+)/i], [[NAME, "GSA"], VERSION], [/webkit.+?(mobile\s?safari|safari)(\/[\w\.]+)/i], [NAME, [VERSION, mapper.str, maps.browser.oldsafari.version]], [/(konqueror)\/([\w\.]+)/i, /(webkit|khtml)\/([\w\.]+)/i], [NAME, VERSION], [/(navigator|netscape)\/([\w\.-]+)/i], [[NAME, "Netscape"], VERSION], [/(swiftfox)/i, /(icedragon|iceweasel|camino|chimera|fennec|maemo\sbrowser|minimo|conkeror)[\/\s]?([\w\.\+]+)/i, /(firefox|seamonkey|k-meleon|icecat|iceape|firebird|phoenix|palemoon|basilisk|waterfox)\/([\w\.-]+)$/i, /(mozilla)\/([\w\.]+).+rv\:.+gecko\/\d+/i, /(polaris|lynx|dillo|icab|doris|amaya|w3m|netsurf|sleipnir)[\/\s]?([\w\.]+)/i, /(links)\s\(([\w\.]+)/i, /(gobrowser)\/?([\w\.]*)/i, /(ice\s?browser)\/v?([\w\._]+)/i, /(mosaic)[\/\s]([\w\.]+)/i], [NAME, VERSION]],
	        cpu: [[/(?:(amd|x(?:(?:86|64)[_-])?|wow|win)64)[;\)]/i], [[ARCHITECTURE, "amd64"]], [/(ia32(?=;))/i], [[ARCHITECTURE, util.lowerize]], [/((?:i[346]|x)86)[;\)]/i], [[ARCHITECTURE, "ia32"]], [/windows\s(ce|mobile);\sppc;/i], [[ARCHITECTURE, "arm"]], [/((?:ppc|powerpc)(?:64)?)(?:\smac|;|\))/i], [[ARCHITECTURE, /ower/, "", util.lowerize]], [/(sun4\w)[;\)]/i], [[ARCHITECTURE, "sparc"]], [/((?:avr32|ia64(?=;))|68k(?=\))|arm(?:64|(?=v\d+;))|(?=atmel\s)avr|(?:irix|mips|sparc)(?:64)?(?=;)|pa-risc)/i], [[ARCHITECTURE, util.lowerize]]],
	        device: [[/\((ipad|playbook);[\w\s\);-]+(rim|apple)/i], [MODEL, VENDOR, [TYPE, TABLET]], [/applecoremedia\/[\w\.]+ \((ipad)/], [MODEL, [VENDOR, "Apple"], [TYPE, TABLET]], [/(apple\s{0,1}tv)/i], [[MODEL, "Apple TV"], [VENDOR, "Apple"]], [/(archos)\s(gamepad2?)/i, /(hp).+(touchpad)/i, /(hp).+(tablet)/i, /(kindle)\/([\w\.]+)/i, /\s(nook)[\w\s]+build\/(\w+)/i, /(dell)\s(strea[kpr\s\d]*[\dko])/i], [VENDOR, MODEL, [TYPE, TABLET]], [/(kf[A-z]+)\sbuild\/.+silk\//i], [MODEL, [VENDOR, "Amazon"], [TYPE, TABLET]], [/(sd|kf)[0349hijorstuw]+\sbuild\/.+silk\//i], [[MODEL, mapper.str, maps.device.amazon.model], [VENDOR, "Amazon"], [TYPE, MOBILE]], [/\((ip[honed|\s\w*]+);.+(apple)/i], [MODEL, VENDOR, [TYPE, MOBILE]], [/\((ip[honed|\s\w*]+);/i], [MODEL, [VENDOR, "Apple"], [TYPE, MOBILE]], [/(blackberry)[\s-]?(\w+)/i, /(blackberry|benq|palm(?=\-)|sonyericsson|acer|asus|dell|meizu|motorola|polytron)[\s_-]?([\w-]*)/i, /(hp)\s([\w\s]+\w)/i, /(asus)-?(\w+)/i], [VENDOR, MODEL, [TYPE, MOBILE]], [/\(bb10;\s(\w+)/i], [MODEL, [VENDOR, "BlackBerry"], [TYPE, MOBILE]], [/android.+(transfo[prime\s]{4,10}\s\w+|eeepc|slider\s\w+|nexus 7|padfone)/i], [MODEL, [VENDOR, "Asus"], [TYPE, TABLET]], [/(sony)\s(tablet\s[ps])\sbuild\//i, /(sony)?(?:sgp.+)\sbuild\//i], [[VENDOR, "Sony"], [MODEL, "Xperia Tablet"], [TYPE, TABLET]], [/android.+\s([c-g]\d{4}|so[-l]\w+)\sbuild\//i], [MODEL, [VENDOR, "Sony"], [TYPE, MOBILE]], [/\s(ouya)\s/i, /(nintendo)\s([wids3u]+)/i], [VENDOR, MODEL, [TYPE, CONSOLE]], [/android.+;\s(shield)\sbuild/i], [MODEL, [VENDOR, "Nvidia"], [TYPE, CONSOLE]], [/(playstation\s[34portablevi]+)/i], [MODEL, [VENDOR, "Sony"], [TYPE, CONSOLE]], [/(sprint\s(\w+))/i], [[VENDOR, mapper.str, maps.device.sprint.vendor], [MODEL, mapper.str, maps.device.sprint.model], [TYPE, MOBILE]], [/(lenovo)\s?(S(?:5000|6000)+(?:[-][\w+]))/i], [VENDOR, MODEL, [TYPE, TABLET]], [/(htc)[;_\s-]+([\w\s]+(?=\))|\w+)*/i, /(zte)-(\w*)/i, /(alcatel|geeksphone|lenovo|nexian|panasonic|(?=;\s)sony)[_\s-]?([\w-]*)/i], [VENDOR, [MODEL, /_/g, " "], [TYPE, MOBILE]], [/(nexus\s9)/i], [MODEL, [VENDOR, "HTC"], [TYPE, TABLET]], [/d\/huawei([\w\s-]+)[;\)]/i, /(nexus\s6p)/i], [MODEL, [VENDOR, "Huawei"], [TYPE, MOBILE]], [/(microsoft);\s(lumia[\s\w]+)/i], [VENDOR, MODEL, [TYPE, MOBILE]], [/[\s\(;](xbox(?:\sone)?)[\s\);]/i], [MODEL, [VENDOR, "Microsoft"], [TYPE, CONSOLE]], [/(kin\.[onetw]{3})/i], [[MODEL, /\./g, " "], [VENDOR, "Microsoft"], [TYPE, MOBILE]], [/\s(milestone|droid(?:[2-4x]|\s(?:bionic|x2|pro|razr))?:?(\s4g)?)[\w\s]+build\//i, /mot[\s-]?(\w*)/i, /(XT\d{3,4}) build\//i, /(nexus\s6)/i], [MODEL, [VENDOR, "Motorola"], [TYPE, MOBILE]], [/android.+\s(mz60\d|xoom[\s2]{0,2})\sbuild\//i], [MODEL, [VENDOR, "Motorola"], [TYPE, TABLET]], [/hbbtv\/\d+\.\d+\.\d+\s+\([\w\s]*;\s*(\w[^;]*);([^;]*)/i], [[VENDOR, util.trim], [MODEL, util.trim], [TYPE, SMARTTV]], [/hbbtv.+maple;(\d+)/i], [[MODEL, /^/, "SmartTV"], [VENDOR, "Samsung"], [TYPE, SMARTTV]], [/\(dtv[\);].+(aquos)/i], [MODEL, [VENDOR, "Sharp"], [TYPE, SMARTTV]], [/android.+((sch-i[89]0\d|shw-m380s|gt-p\d{4}|gt-n\d+|sgh-t8[56]9|nexus 10))/i, /((SM-T\w+))/i], [[VENDOR, "Samsung"], MODEL, [TYPE, TABLET]], [/smart-tv.+(samsung)/i], [VENDOR, [TYPE, SMARTTV], MODEL], [/((s[cgp]h-\w+|gt-\w+|galaxy\snexus|sm-\w[\w\d]+))/i, /(sam[sung]*)[\s-]*(\w+-?[\w-]*)/i, /sec-((sgh\w+))/i], [[VENDOR, "Samsung"], MODEL, [TYPE, MOBILE]], [/sie-(\w*)/i], [MODEL, [VENDOR, "Siemens"], [TYPE, MOBILE]], [/(maemo|nokia).*(n900|lumia\s\d+)/i, /(nokia)[\s_-]?([\w-]*)/i], [[VENDOR, "Nokia"], MODEL, [TYPE, MOBILE]], [/android\s3\.[\s\w;-]{10}(a\d{3})/i], [MODEL, [VENDOR, "Acer"], [TYPE, TABLET]], [/android.+([vl]k\-?\d{3})\s+build/i], [MODEL, [VENDOR, "LG"], [TYPE, TABLET]], [/android\s3\.[\s\w;-]{10}(lg?)-([06cv9]{3,4})/i], [[VENDOR, "LG"], MODEL, [TYPE, TABLET]], [/(lg) netcast\.tv/i], [VENDOR, MODEL, [TYPE, SMARTTV]], [/(nexus\s[45])/i, /lg[e;\s\/-]+(\w*)/i, /android.+lg(\-?[\d\w]+)\s+build/i], [MODEL, [VENDOR, "LG"], [TYPE, MOBILE]], [/android.+(ideatab[a-z0-9\-\s]+)/i], [MODEL, [VENDOR, "Lenovo"], [TYPE, TABLET]], [/linux;.+((jolla));/i], [VENDOR, MODEL, [TYPE, MOBILE]], [/((pebble))app\/[\d\.]+\s/i], [VENDOR, MODEL, [TYPE, WEARABLE]], [/android.+;\s(oppo)\s?([\w\s]+)\sbuild/i], [VENDOR, MODEL, [TYPE, MOBILE]], [/crkey/i], [[MODEL, "Chromecast"], [VENDOR, "Google"]], [/android.+;\s(glass)\s\d/i], [MODEL, [VENDOR, "Google"], [TYPE, WEARABLE]], [/android.+;\s(pixel c)\s/i], [MODEL, [VENDOR, "Google"], [TYPE, TABLET]], [/android.+;\s(pixel xl|pixel)\s/i], [MODEL, [VENDOR, "Google"], [TYPE, MOBILE]], [/android.+;\s(\w+)\s+build\/hm\1/i, /android.+(hm[\s\-_]*note?[\s_]*(?:\d\w)?)\s+build/i, /android.+(mi[\s\-_]*(?:one|one[\s_]plus|note lte)?[\s_]*(?:\d?\w?)[\s_]*(?:plus)?)\s+build/i, /android.+(redmi[\s\-_]*(?:note)?(?:[\s_]*[\w\s]+))\s+build/i], [[MODEL, /_/g, " "], [VENDOR, "Xiaomi"], [TYPE, MOBILE]], [/android.+(mi[\s\-_]*(?:pad)(?:[\s_]*[\w\s]+))\s+build/i], [[MODEL, /_/g, " "], [VENDOR, "Xiaomi"], [TYPE, TABLET]], [/android.+;\s(m[1-5]\snote)\sbuild/i], [MODEL, [VENDOR, "Meizu"], [TYPE, TABLET]], [/android.+a000(1)\s+build/i, /android.+oneplus\s(a\d{4})\s+build/i], [MODEL, [VENDOR, "OnePlus"], [TYPE, MOBILE]], [/android.+[;\/]\s*(RCT[\d\w]+)\s+build/i], [MODEL, [VENDOR, "RCA"], [TYPE, TABLET]], [/android.+[;\/\s]+(Venue[\d\s]{2,7})\s+build/i], [MODEL, [VENDOR, "Dell"], [TYPE, TABLET]], [/android.+[;\/]\s*(Q[T|M][\d\w]+)\s+build/i], [MODEL, [VENDOR, "Verizon"], [TYPE, TABLET]], [/android.+[;\/]\s+(Barnes[&\s]+Noble\s+|BN[RT])(V?.*)\s+build/i], [[VENDOR, "Barnes & Noble"], MODEL, [TYPE, TABLET]], [/android.+[;\/]\s+(TM\d{3}.*\b)\s+build/i], [MODEL, [VENDOR, "NuVision"], [TYPE, TABLET]], [/android.+;\s(k88)\sbuild/i], [MODEL, [VENDOR, "ZTE"], [TYPE, TABLET]], [/android.+[;\/]\s*(gen\d{3})\s+build.*49h/i], [MODEL, [VENDOR, "Swiss"], [TYPE, MOBILE]], [/android.+[;\/]\s*(zur\d{3})\s+build/i], [MODEL, [VENDOR, "Swiss"], [TYPE, TABLET]], [/android.+[;\/]\s*((Zeki)?TB.*\b)\s+build/i], [MODEL, [VENDOR, "Zeki"], [TYPE, TABLET]], [/(android).+[;\/]\s+([YR]\d{2})\s+build/i, /android.+[;\/]\s+(Dragon[\-\s]+Touch\s+|DT)(\w{5})\sbuild/i], [[VENDOR, "Dragon Touch"], MODEL, [TYPE, TABLET]], [/android.+[;\/]\s*(NS-?\w{0,9})\sbuild/i], [MODEL, [VENDOR, "Insignia"], [TYPE, TABLET]], [/android.+[;\/]\s*((NX|Next)-?\w{0,9})\s+build/i], [MODEL, [VENDOR, "NextBook"], [TYPE, TABLET]], [/android.+[;\/]\s*(Xtreme\_)?(V(1[045]|2[015]|30|40|60|7[05]|90))\s+build/i], [[VENDOR, "Voice"], MODEL, [TYPE, MOBILE]], [/android.+[;\/]\s*(LVTEL\-)?(V1[12])\s+build/i], [[VENDOR, "LvTel"], MODEL, [TYPE, MOBILE]], [/android.+[;\/]\s*(V(100MD|700NA|7011|917G).*\b)\s+build/i], [MODEL, [VENDOR, "Envizen"], [TYPE, TABLET]], [/android.+[;\/]\s*(Le[\s\-]+Pan)[\s\-]+(\w{1,9})\s+build/i], [VENDOR, MODEL, [TYPE, TABLET]], [/android.+[;\/]\s*(Trio[\s\-]*.*)\s+build/i], [MODEL, [VENDOR, "MachSpeed"], [TYPE, TABLET]], [/android.+[;\/]\s*(Trinity)[\-\s]*(T\d{3})\s+build/i], [VENDOR, MODEL, [TYPE, TABLET]], [/android.+[;\/]\s*TU_(1491)\s+build/i], [MODEL, [VENDOR, "Rotor"], [TYPE, TABLET]], [/android.+(KS(.+))\s+build/i], [MODEL, [VENDOR, "Amazon"], [TYPE, TABLET]], [/android.+(Gigaset)[\s\-]+(Q\w{1,9})\s+build/i], [VENDOR, MODEL, [TYPE, TABLET]], [/\s(tablet|tab)[;\/]/i, /\s(mobile)(?:[;\/]|\ssafari)/i], [[TYPE, util.lowerize], VENDOR, MODEL], [/(android[\w\.\s\-]{0,9});.+build/i], [MODEL, [VENDOR, "Generic"]]],
	        engine: [[/windows.+\sedge\/([\w\.]+)/i], [VERSION, [NAME, "EdgeHTML"]], [/(presto)\/([\w\.]+)/i, /(webkit|trident|netfront|netsurf|amaya|lynx|w3m)\/([\w\.]+)/i, /(khtml|tasman|links)[\/\s]\(?([\w\.]+)/i, /(icab)[\/\s]([23]\.[\d\.]+)/i], [NAME, VERSION], [/rv\:([\w\.]{1,9}).+(gecko)/i], [VERSION, NAME]],
	        os: [[/microsoft\s(windows)\s(vista|xp)/i], [NAME, VERSION], [/(windows)\snt\s6\.2;\s(arm)/i, /(windows\sphone(?:\sos)*)[\s\/]?([\d\.\s\w]*)/i, /(windows\smobile|windows)[\s\/]?([ntce\d\.\s]+\w)/i], [NAME, [VERSION, mapper.str, maps.os.windows.version]], [/(win(?=3|9|n)|win\s9x\s)([nt\d\.]+)/i], [[NAME, "Windows"], [VERSION, mapper.str, maps.os.windows.version]], [/\((bb)(10);/i], [[NAME, "BlackBerry"], VERSION], [/(blackberry)\w*\/?([\w\.]*)/i, /(tizen)[\/\s]([\w\.]+)/i, /(android|webos|palm\sos|qnx|bada|rim\stablet\sos|meego|contiki)[\/\s-]?([\w\.]*)/i, /linux;.+(sailfish);/i], [NAME, VERSION], [/(symbian\s?os|symbos|s60(?=;))[\/\s-]?([\w\.]*)/i], [[NAME, "Symbian"], VERSION], [/\((series40);/i], [NAME], [/mozilla.+\(mobile;.+gecko.+firefox/i], [[NAME, "Firefox OS"], VERSION], [/(nintendo|playstation)\s([wids34portablevu]+)/i, /(mint)[\/\s\(]?(\w*)/i, /(mageia|vectorlinux)[;\s]/i, /(joli|[kxln]?ubuntu|debian|suse|opensuse|gentoo|(?=\s)arch|slackware|fedora|mandriva|centos|pclinuxos|redhat|zenwalk|linpus)[\/\s-]?(?!chrom)([\w\.-]*)/i, /(hurd|linux)\s?([\w\.]*)/i, /(gnu)\s?([\w\.]*)/i], [NAME, VERSION], [/(cros)\s[\w]+\s([\w\.]+\w)/i], [[NAME, "Chromium OS"], VERSION], [/(sunos)\s?([\w\.\d]*)/i], [[NAME, "Solaris"], VERSION], [/\s([frentopc-]{0,4}bsd|dragonfly)\s?([\w\.]*)/i], [NAME, VERSION], [/(haiku)\s(\w+)/i], [NAME, VERSION], [/cfnetwork\/.+darwin/i, /ip[honead]{2,4}(?:.*os\s([\w]+)\slike\smac|;\sopera)/i], [[VERSION, /_/g, "."], [NAME, "iOS"]], [/(mac\sos\sx)\s?([\w\s\.]*)/i, /(macintosh|mac(?=_powerpc)\s)/i], [[NAME, "Mac OS"], [VERSION, /_/g, "."]], [/((?:open)?solaris)[\/\s-]?([\w\.]*)/i, /(aix)\s((\d)(?=\.|\)|\s)[\w\.])*/i, /(plan\s9|minix|beos|os\/2|amigaos|morphos|risc\sos|openvms)/i, /(unix)\s?([\w\.]*)/i], [NAME, VERSION]]
	      };
	      var UAParser = function UAParser(uastring, extensions) {
	        if (typeof uastring === "object") {
	          extensions = uastring;
	          uastring = undefined$1;
	        }
	        if (!(this instanceof UAParser)) {
	          return new UAParser(uastring, extensions).getResult();
	        }
	        var ua = uastring || (window && window.navigator && window.navigator.userAgent ? window.navigator.userAgent : EMPTY);
	        var rgxmap = extensions ? util.extend(regexes, extensions) : regexes;
	        this.getBrowser = function () {
	          var browser = {
	            name: undefined$1,
	            version: undefined$1
	          };
	          mapper.rgx.call(browser, ua, rgxmap.browser);
	          browser.major = util.major(browser.version);
	          return browser;
	        };
	        this.getCPU = function () {
	          var cpu = {
	            architecture: undefined$1
	          };
	          mapper.rgx.call(cpu, ua, rgxmap.cpu);
	          return cpu;
	        };
	        this.getDevice = function () {
	          var device = {
	            vendor: undefined$1,
	            model: undefined$1,
	            type: undefined$1
	          };
	          mapper.rgx.call(device, ua, rgxmap.device);
	          return device;
	        };
	        this.getEngine = function () {
	          var engine = {
	            name: undefined$1,
	            version: undefined$1
	          };
	          mapper.rgx.call(engine, ua, rgxmap.engine);
	          return engine;
	        };
	        this.getOS = function () {
	          var os = {
	            name: undefined$1,
	            version: undefined$1
	          };
	          mapper.rgx.call(os, ua, rgxmap.os);
	          return os;
	        };
	        this.getResult = function () {
	          return {
	            ua: this.getUA(),
	            browser: this.getBrowser(),
	            engine: this.getEngine(),
	            os: this.getOS(),
	            device: this.getDevice(),
	            cpu: this.getCPU()
	          };
	        };
	        this.getUA = function () {
	          return ua;
	        };
	        this.setUA = function (uastring) {
	          ua = uastring;
	          return this;
	        };
	        return this;
	      };
	      UAParser.VERSION = LIBVERSION;
	      UAParser.BROWSER = {
	        NAME: NAME,
	        MAJOR: MAJOR,
	        VERSION: VERSION
	      };
	      UAParser.CPU = {
	        ARCHITECTURE: ARCHITECTURE
	      };
	      UAParser.DEVICE = {
	        MODEL: MODEL,
	        VENDOR: VENDOR,
	        TYPE: TYPE,
	        CONSOLE: CONSOLE,
	        MOBILE: MOBILE,
	        SMARTTV: SMARTTV,
	        TABLET: TABLET,
	        WEARABLE: WEARABLE,
	        EMBEDDED: EMBEDDED
	      };
	      UAParser.ENGINE = {
	        NAME: NAME,
	        VERSION: VERSION
	      };
	      UAParser.OS = {
	        NAME: NAME,
	        VERSION: VERSION
	      };
	      if (typeof exports !== UNDEF_TYPE) {
	        if (typeof module !== UNDEF_TYPE && module.exports) {
	          exports = module.exports = UAParser;
	        }
	        exports.UAParser = UAParser;
	      } else {
	        if (__webpack_require__(3)) {
	          !(__WEBPACK_AMD_DEFINE_RESULT__ = function () {
	            return UAParser;
	          }.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined$1 && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	        } else if (window) {
	          window.UAParser = UAParser;
	        }
	      }
	      var $ = window && (window.jQuery || window.Zepto);
	      if (typeof $ !== UNDEF_TYPE) {
	        var parser = new UAParser();
	        $.ua = parser.getResult();
	        $.ua.get = function () {
	          return parser.getUA();
	        };
	        $.ua.set = function (uastring) {
	          parser.setUA(uastring);
	          var result = parser.getResult();
	          for (var prop in result) {
	            $.ua[prop] = result[prop];
	          }
	        };
	      }
	    })(typeof window === "object" ? window : this);

	    /***/
	  }, /* 3 */
	  /***/function (module, exports) {
	    /* WEBPACK VAR INJECTION */(function (__webpack_amd_options__) {
	      /* globals __webpack_amd_options__ */
	      module.exports = __webpack_amd_options__;

	      /* WEBPACK VAR INJECTION */
	    }).call(exports, {});

	    /***/
	  }, /* 4 */
	  /***/function (module, exports, __webpack_require__) {

	    Object.defineProperty(exports, "__esModule", {
	      value: true
	    });
	    var _extends = Object.assign || function (target) {
	      for (var i = 1; i < arguments.length; i++) {
	        var source = arguments[i];
	        for (var key in source) {
	          if (Object.prototype.hasOwnProperty.call(source, key)) {
	            target[key] = source[key];
	          }
	        }
	      }
	      return target;
	    };
	    var _require = __webpack_require__(0),
	      DEVICE_TYPES = _require.DEVICE_TYPES,
	      defaultData = _require.defaultData;
	    var checkType = function checkType(type) {
	      switch (type) {
	        case DEVICE_TYPES.MOBILE:
	          return {
	            isMobile: true
	          };
	        case DEVICE_TYPES.TABLET:
	          return {
	            isTablet: true
	          };
	        case DEVICE_TYPES.SMART_TV:
	          return {
	            isSmartTV: true
	          };
	        case DEVICE_TYPES.CONSOLE:
	          return {
	            isConsole: true
	          };
	        case DEVICE_TYPES.WEARABLE:
	          return {
	            isWearable: true
	          };
	        case DEVICE_TYPES.BROWSER:
	          return {
	            isBrowser: true
	          };
	        default:
	          return defaultData;
	      }
	    };
	    var broPayload = function broPayload(isBrowser, browser, engine, os, ua) {
	      return {
	        isBrowser: isBrowser,
	        browserMajorVersion: browser.major,
	        browserFullVersion: browser.version,
	        browserName: browser.name,
	        engineName: engine.name || false,
	        engineVersion: engine.version,
	        osName: os.name,
	        osVersion: os.version,
	        userAgent: ua
	      };
	    };
	    var mobilePayload = function mobilePayload(type, device, os, ua) {
	      return _extends({}, type, {
	        vendor: device.vendor,
	        model: device.model,
	        os: os.name,
	        osVersion: os.version,
	        ua: ua
	      });
	    };
	    var stvPayload = function stvPayload(isSmartTV, engine, os, ua) {
	      return {
	        isSmartTV: isSmartTV,
	        engineName: engine.name,
	        engineVersion: engine.version,
	        osName: os.name,
	        osVersion: os.version,
	        userAgent: ua
	      };
	    };
	    var consolePayload = function consolePayload(isConsole, engine, os, ua) {
	      return {
	        isConsole: isConsole,
	        engineName: engine.name,
	        engineVersion: engine.version,
	        osName: os.name,
	        osVersion: os.version,
	        userAgent: ua
	      };
	    };
	    var wearPayload = function wearPayload(isWearable, engine, os, ua) {
	      return {
	        isWearable: isWearable,
	        engineName: engine.name,
	        engineVersion: engine.version,
	        osName: os.name,
	        osVersion: os.version,
	        userAgent: ua
	      };
	    };
	    var getNavigatorInstance = exports.getNavigatorInstance = function getNavigatorInstance() {
	      if (typeof window !== 'undefined') {
	        if (window.navigator || navigator) {
	          return window.navigator || navigator;
	        }
	      }
	      return false;
	    };
	    var isIOS13Check = exports.isIOS13Check = function isIOS13Check(type) {
	      var nav = getNavigatorInstance();
	      return nav && nav.platform && (nav.platform.indexOf(type) !== -1 || nav.platform === 'MacIntel' && nav.maxTouchPoints > 1 && !window.MSStream);
	    };
	    module.exports = {
	      checkType: checkType,
	      broPayload: broPayload,
	      mobilePayload: mobilePayload,
	      stvPayload: stvPayload,
	      consolePayload: consolePayload,
	      wearPayload: wearPayload,
	      getNavigatorInstance: getNavigatorInstance,
	      isIOS13Check: isIOS13Check
	    };

	    /***/
	  }
	  /******/]);
	});

	var isMobile = unwrapExports(dist);

	/**
	 * @param {HTMLElement} element DOM element for component instantiation and scope
	 * @param {Object} options
	 * @param {String} options.openSelector Selector for the hamburger button
	 * @param {String} options.closeSelector Selector for the close button
	 * @param {String} options.backSelector Selector for the back button
	 * @param {String} options.overlaySelector Selector for the menu overlay
	 * @param {String} options.innerSelector Selector for the menu inner
	 * @param {String} options.listSelector Selector for the menu items list
	 * @param {String} options.itemSelector Selector for the menu item
	 * @param {String} options.linkSelector Selector for the menu link
	 * @param {String} options.buttonPreviousSelector Selector for the previous items button (for overflow)
	 * @param {String} options.buttonNextSelector Selector for the next items button (for overflow)
	 * @param {String} options.megaSelector Selector for the mega menu
	 * @param {String} options.subItemSelector Selector for the menu sub items
	 * @param {Int} options.maxLines Number of lines maximum for each menu item (for overflow). Set it to zero to disable automatic resize.
	 * @param {String} options.maxLinesAttribute The data attribute to set the max lines in the markup, if needed
	 * @param {Boolean} options.attachClickListener Whether or not to bind click events
	 * @param {Boolean} options.attachHoverListener Whether or not to bind hover events
	 * @param {Boolean} options.attachFocusListener Whether or not to bind focus events
	 * @param {Boolean} options.attachKeyListener Whether or not to bind keyboard events
	 * @param {Boolean} options.attachResizeListener Whether or not to bind resize events
	 */
	var Menu = /*#__PURE__*/function () {
	  /**
	   * @static
	   * Shorthand for instance creation and initialisation.
	   *
	   * @param {HTMLElement} root DOM element for component instantiation and scope
	   *
	   * @return {Menu} An instance of Menu.
	   */
	  Menu.autoInit = function autoInit(root, _temp) {
	    var _ref = _temp === void 0 ? {} : _temp,
	      _ref$MENU = _ref.MENU,
	      defaultOptions = _ref$MENU === void 0 ? {} : _ref$MENU;
	    var menu = new Menu(root, defaultOptions);
	    menu.init();
	    root.ECLMenu = menu;
	    return menu;
	  };
	  function Menu(element, _temp2) {
	    var _ref2 = _temp2 === void 0 ? {} : _temp2,
	      _ref2$openSelector = _ref2.openSelector,
	      openSelector = _ref2$openSelector === void 0 ? '[data-ecl-menu-open]' : _ref2$openSelector,
	      _ref2$closeSelector = _ref2.closeSelector,
	      closeSelector = _ref2$closeSelector === void 0 ? '[data-ecl-menu-close]' : _ref2$closeSelector,
	      _ref2$backSelector = _ref2.backSelector,
	      backSelector = _ref2$backSelector === void 0 ? '[data-ecl-menu-back]' : _ref2$backSelector,
	      _ref2$overlaySelector = _ref2.overlaySelector,
	      overlaySelector = _ref2$overlaySelector === void 0 ? '[data-ecl-menu-overlay]' : _ref2$overlaySelector,
	      _ref2$innerSelector = _ref2.innerSelector,
	      innerSelector = _ref2$innerSelector === void 0 ? '[data-ecl-menu-inner]' : _ref2$innerSelector,
	      _ref2$listSelector = _ref2.listSelector,
	      listSelector = _ref2$listSelector === void 0 ? '[data-ecl-menu-list]' : _ref2$listSelector,
	      _ref2$itemSelector = _ref2.itemSelector,
	      itemSelector = _ref2$itemSelector === void 0 ? '[data-ecl-menu-item]' : _ref2$itemSelector,
	      _ref2$linkSelector = _ref2.linkSelector,
	      linkSelector = _ref2$linkSelector === void 0 ? '[data-ecl-menu-link]' : _ref2$linkSelector,
	      _ref2$buttonPreviousS = _ref2.buttonPreviousSelector,
	      buttonPreviousSelector = _ref2$buttonPreviousS === void 0 ? '[data-ecl-menu-items-previous]' : _ref2$buttonPreviousS,
	      _ref2$buttonNextSelec = _ref2.buttonNextSelector,
	      buttonNextSelector = _ref2$buttonNextSelec === void 0 ? '[data-ecl-menu-items-next]' : _ref2$buttonNextSelec,
	      _ref2$caretSelector = _ref2.caretSelector,
	      caretSelector = _ref2$caretSelector === void 0 ? '[data-ecl-menu-caret]' : _ref2$caretSelector,
	      _ref2$megaSelector = _ref2.megaSelector,
	      megaSelector = _ref2$megaSelector === void 0 ? '[data-ecl-menu-mega]' : _ref2$megaSelector,
	      _ref2$subItemSelector = _ref2.subItemSelector,
	      subItemSelector = _ref2$subItemSelector === void 0 ? '[data-ecl-menu-subitem]' : _ref2$subItemSelector,
	      _ref2$maxLines = _ref2.maxLines,
	      maxLines = _ref2$maxLines === void 0 ? 2 : _ref2$maxLines,
	      _ref2$maxLinesAttribu = _ref2.maxLinesAttribute,
	      maxLinesAttribute = _ref2$maxLinesAttribu === void 0 ? 'data-ecl-menu-max-lines' : _ref2$maxLinesAttribu,
	      _ref2$attachClickList = _ref2.attachClickListener,
	      attachClickListener = _ref2$attachClickList === void 0 ? true : _ref2$attachClickList,
	      _ref2$attachHoverList = _ref2.attachHoverListener,
	      attachHoverListener = _ref2$attachHoverList === void 0 ? true : _ref2$attachHoverList,
	      _ref2$attachFocusList = _ref2.attachFocusListener,
	      attachFocusListener = _ref2$attachFocusList === void 0 ? true : _ref2$attachFocusList,
	      _ref2$attachKeyListen = _ref2.attachKeyListener,
	      attachKeyListener = _ref2$attachKeyListen === void 0 ? true : _ref2$attachKeyListen,
	      _ref2$attachResizeLis = _ref2.attachResizeListener,
	      attachResizeListener = _ref2$attachResizeLis === void 0 ? true : _ref2$attachResizeLis;
	    // Check element
	    if (!element || element.nodeType !== Node.ELEMENT_NODE) {
	      throw new TypeError('DOM element should be given to initialize this widget.');
	    }
	    this.element = element;

	    // Options
	    this.openSelector = openSelector;
	    this.closeSelector = closeSelector;
	    this.backSelector = backSelector;
	    this.overlaySelector = overlaySelector;
	    this.innerSelector = innerSelector;
	    this.listSelector = listSelector;
	    this.itemSelector = itemSelector;
	    this.linkSelector = linkSelector;
	    this.buttonPreviousSelector = buttonPreviousSelector;
	    this.buttonNextSelector = buttonNextSelector;
	    this.caretSelector = caretSelector;
	    this.megaSelector = megaSelector;
	    this.subItemSelector = subItemSelector;
	    this.maxLines = maxLines;
	    this.maxLinesAttribute = maxLinesAttribute;
	    this.attachClickListener = attachClickListener;
	    this.attachHoverListener = attachHoverListener;
	    this.attachFocusListener = attachFocusListener;
	    this.attachKeyListener = attachKeyListener;
	    this.attachResizeListener = attachResizeListener;

	    // Private variables
	    this.direction = 'ltr';
	    this.open = null;
	    this.close = null;
	    this.back = null;
	    this.overlay = null;
	    this.inner = null;
	    this.itemsList = null;
	    this.items = null;
	    this.links = null;
	    this.btnPrevious = null;
	    this.btnNext = null;
	    this.isOpen = false;
	    this.resizeTimer = null;
	    this.isKeyEvent = false;
	    this.isDesktop = false;
	    this.hasOverflow = false;
	    this.offsetLeft = 0;
	    this.lastVisibleItem = null;
	    this.currentItem = null;
	    this.totalItemsWidth = 0;
	    this.breakpointL = 996;

	    // Bind `this` for use in callbacks
	    this.handleClickOnOpen = this.handleClickOnOpen.bind(this);
	    this.handleClickOnClose = this.handleClickOnClose.bind(this);
	    this.handleClickOnBack = this.handleClickOnBack.bind(this);
	    this.handleClickOnNextItems = this.handleClickOnNextItems.bind(this);
	    this.handleClickOnPreviousItems = this.handleClickOnPreviousItems.bind(this);
	    this.handleClickOnCaret = this.handleClickOnCaret.bind(this);
	    this.handleHoverOnItem = this.handleHoverOnItem.bind(this);
	    this.handleHoverOffItem = this.handleHoverOffItem.bind(this);
	    this.handleFocusIn = this.handleFocusIn.bind(this);
	    this.handleFocusOut = this.handleFocusOut.bind(this);
	    this.handleKeyboard = this.handleKeyboard.bind(this);
	    this.handleKeyboardGlobal = this.handleKeyboardGlobal.bind(this);
	    this.handleResize = this.handleResize.bind(this);
	    this.useDesktopDisplay = this.useDesktopDisplay.bind(this);
	    this.checkMenuOverflow = this.checkMenuOverflow.bind(this);
	    this.checkMenuItem = this.checkMenuItem.bind(this);
	    this.checkMegaMenu = this.checkMegaMenu.bind(this);
	    this.closeOpenDropdown = this.closeOpenDropdown.bind(this);
	  }

	  /**
	   * Initialise component.
	   */
	  var _proto = Menu.prototype;
	  _proto.init = function init() {
	    var _this = this;
	    // Check display
	    this.direction = getComputedStyle(this.element).direction;

	    // Query elements
	    this.open = queryOne(this.openSelector, this.element);
	    this.close = queryOne(this.closeSelector, this.element);
	    this.back = queryOne(this.backSelector, this.element);
	    this.overlay = queryOne(this.overlaySelector, this.element);
	    this.inner = queryOne(this.innerSelector, this.element);
	    this.itemsList = queryOne(this.listSelector, this.element);
	    this.btnPrevious = queryOne(this.buttonPreviousSelector, this.element);
	    this.btnNext = queryOne(this.buttonNextSelector, this.element);
	    this.items = queryAll(this.itemSelector, this.element);
	    this.subItems = queryAll(this.subItemSelector, this.element);
	    this.links = queryAll(this.linkSelector, this.element);
	    this.carets = queryAll(this.caretSelector, this.element);

	    // Get extra parameter from markup
	    var maxLinesMarkup = this.element.getAttribute(this.maxLinesAttribute);
	    if (maxLinesMarkup) {
	      this.maxLines = maxLinesMarkup;
	    }

	    // Check if we should use desktop display (it does not rely only on breakpoints)
	    this.isDesktop = this.useDesktopDisplay();

	    // Bind click events on buttons
	    if (this.attachClickListener) {
	      // Open
	      if (this.open) {
	        this.open.addEventListener('click', this.handleClickOnOpen);
	      }

	      // Close
	      if (this.close) {
	        this.close.addEventListener('click', this.handleClickOnClose);
	      }

	      // Back
	      if (this.back) {
	        this.back.addEventListener('click', this.handleClickOnBack);
	      }

	      // Previous items
	      if (this.btnPrevious) {
	        this.btnPrevious.addEventListener('click', this.handleClickOnPreviousItems);
	      }

	      // Next items
	      if (this.btnNext) {
	        this.btnNext.addEventListener('click', this.handleClickOnNextItems);
	      }

	      // Overlay
	      if (this.overlay) {
	        this.overlay.addEventListener('click', this.handleClickOnClose);
	      }
	    }

	    // Bind event on menu links
	    if (this.links) {
	      this.links.forEach(function (link) {
	        if (_this.attachFocusListener) {
	          link.addEventListener('focusin', _this.closeOpenDropdown);
	          link.addEventListener('focusin', _this.handleFocusIn);
	          link.addEventListener('focusout', _this.handleFocusOut);
	        }
	        if (_this.attachKeyListener) {
	          link.addEventListener('keyup', _this.handleKeyboard);
	        }
	      });
	    }

	    // Bind event on caret buttons
	    if (this.carets) {
	      this.carets.forEach(function (caret) {
	        if (_this.attachFocusListener) {
	          caret.addEventListener('focusin', _this.handleFocusIn);
	          caret.addEventListener('focusout', _this.handleFocusOut);
	        }
	        if (_this.attachKeyListener) {
	          caret.addEventListener('keyup', _this.handleKeyboard);
	        }
	        if (_this.attachClickListener) {
	          caret.addEventListener('click', _this.handleClickOnCaret);
	        }
	      });
	    }

	    // Bind event on sub menu links
	    if (this.subItems) {
	      this.subItems.forEach(function (subItem) {
	        var subLink = queryOne('.ecl-menu__sublink', subItem);
	        if (_this.attachKeyListener && subLink) {
	          subLink.addEventListener('keyup', _this.handleKeyboard);
	        }
	        if (_this.attachFocusListener && subLink) {
	          subLink.addEventListener('focusout', _this.handleFocusOut);
	        }
	      });
	    }

	    // Bind global keyboard events
	    if (this.attachKeyListener) {
	      document.addEventListener('keyup', this.handleKeyboardGlobal);
	    }

	    // Bind resize events
	    if (this.attachResizeListener) {
	      window.addEventListener('resize', this.handleResize);
	    }

	    // Browse first level items
	    if (this.items) {
	      this.items.forEach(function (item) {
	        // Check menu item display (right to left, full width, ...)
	        _this.checkMenuItem(item);
	        _this.totalItemsWidth += item.offsetWidth;
	        if (item.hasAttribute('data-ecl-has-children')) {
	          // Bind hover and focus events on menu items
	          if (_this.attachHoverListener) {
	            item.addEventListener('mouseover', _this.handleHoverOnItem);
	            item.addEventListener('mouseout', _this.handleHoverOffItem);
	          }
	        }
	      });
	    }

	    // Update overflow display
	    this.checkMenuOverflow();

	    // Check if the current item is hidden (one side or the other)
	    if (this.currentItem) {
	      if (this.currentItem.getAttribute('data-ecl-menu-item-visible') === 'false') {
	        this.btnNext.classList.add('ecl-menu__item--current');
	      } else {
	        this.btnPrevious.classList.add('ecl-menu__item--current');
	      }
	    }

	    // Init sticky header
	    this.stickyInstance = new stickyfill.Sticky(this.element);

	    // Hack to prevent css transition to be played on page load on chrome
	    setTimeout(function () {
	      _this.element.classList.add('ecl-menu--transition');
	    }, 500);

	    // Set ecl initialized attribute
	    this.element.setAttribute('data-ecl-auto-initialized', 'true');
	  }

	  /**
	   * Destroy component.
	   */;
	  _proto.destroy = function destroy() {
	    var _this2 = this;
	    if (this.stickyInstance) {
	      this.stickyInstance.remove();
	    }
	    if (this.attachClickListener) {
	      if (this.open) {
	        this.open.removeEventListener('click', this.handleClickOnOpen);
	      }
	      if (this.close) {
	        this.close.removeEventListener('click', this.handleClickOnClose);
	      }
	      if (this.back) {
	        this.back.removeEventListener('click', this.handleClickOnBack);
	      }
	      if (this.btnPrevious) {
	        this.btnPrevious.removeEventListener('click', this.handleClickOnPreviousItems);
	      }
	      if (this.btnNext) {
	        this.btnNext.removeEventListener('click', this.handleClickOnNextItems);
	      }
	      if (this.overlay) {
	        this.overlay.removeEventListener('click', this.handleClickOnClose);
	      }
	    }
	    if (this.attachKeyListener && this.carets) {
	      this.carets.forEach(function (caret) {
	        caret.removeEventListener('keyup', _this2.handleKeyboard);
	      });
	    }
	    if (this.items && this.isDesktop) {
	      this.items.forEach(function (item) {
	        if (item.hasAttribute('data-ecl-has-children')) {
	          if (_this2.attachHoverListener) {
	            item.removeEventListener('mouseover', _this2.handleHoverOnItem);
	            item.removeEventListener('mouseout', _this2.handleHoverOffItem);
	          }
	        }
	      });
	    }
	    if (this.links) {
	      this.links.forEach(function (link) {
	        if (_this2.attachFocusListener) {
	          link.removeEventListener('focusin', _this2.closeOpenDropdown);
	          link.removeEventListener('focusin', _this2.handleFocusIn);
	          link.removeEventListener('focusout', _this2.handleFocusOut);
	        }
	        if (_this2.attachKeyListener) {
	          link.removeEventListener('keyup', _this2.handleKeyboard);
	        }
	      });
	    }
	    if (this.carets) {
	      this.carets.forEach(function (caret) {
	        if (_this2.attachFocusListener) {
	          caret.removeEventListener('focusin', _this2.handleFocusIn);
	          caret.removeEventListener('focusout', _this2.handleFocusOut);
	        }
	        if (_this2.attachKeyListener) {
	          caret.removeEventListener('keyup', _this2.handleKeyboard);
	        }
	        if (_this2.attachClickListener) {
	          caret.removeEventListener('click', _this2.handleClickOnCaret);
	        }
	      });
	    }
	    if (this.subItems) {
	      this.subItems.forEach(function (subItem) {
	        var subLink = queryOne('.ecl-menu__sublink', subItem);
	        if (_this2.attachKeyListener && subLink) {
	          subLink.removeEventListener('keyup', _this2.handleKeyboard);
	        }
	        if (_this2.attachFocusListener && subLink) {
	          subLink.removeEventListener('focusout', _this2.handleFocusOut);
	        }
	      });
	    }
	    if (this.attachKeyListener) {
	      document.removeEventListener('keyup', this.handleKeyboardGlobal);
	    }
	    if (this.attachResizeListener) {
	      window.removeEventListener('resize', this.handleResize);
	    }
	    if (this.element) {
	      this.element.removeAttribute('data-ecl-auto-initialized');
	    }
	  }

	  /**
	   * Check if desktop display has to be used
	   * - not using a phone or tablet (whatever the screen size is)
	   * - not having hamburger menu on screen
	   */;
	  _proto.useDesktopDisplay = function useDesktopDisplay() {
	    // Detect mobile devices
	    if (isMobile.isMobileOnly) {
	      return false;
	    }

	    // Force mobile display on tablet
	    if (isMobile.isTablet) {
	      this.element.classList.add('ecl-menu--forced-mobile');
	      return false;
	    }

	    // After all that, check if the hamburger button is displayed
	    if (window.innerWidth < this.breakpointL) {
	      return false;
	    }

	    // Everything is fine to use desktop display
	    this.element.classList.remove('ecl-menu--forced-mobile');
	    return true;
	  }

	  /**
	   * Trigger events on resize
	   * Uses a debounce, for performance
	   */;
	  _proto.handleResize = function handleResize() {
	    var _this3 = this;
	    // Disable transition
	    this.element.classList.remove('ecl-menu--transition');
	    clearTimeout(this.resizeTimer);
	    this.resizeTimer = setTimeout(function () {
	      _this3.element.classList.remove('ecl-menu--forced-mobile');

	      // Check global display
	      _this3.isDesktop = _this3.useDesktopDisplay();

	      // Update items display
	      _this3.totalItemsWidth = 0;
	      if (_this3.items) {
	        _this3.items.forEach(function (item) {
	          _this3.checkMenuItem(item);
	          _this3.totalItemsWidth += item.offsetWidth;
	        });
	      }

	      // Update overflow display
	      _this3.checkMenuOverflow();

	      // Bring transition back
	      _this3.element.classList.add('ecl-menu--transition');
	    }, 200);
	    return this;
	  }

	  /**
	   * Check how to display menu horizontally and manage overflow
	   */;
	  _proto.checkMenuOverflow = function checkMenuOverflow() {
	    var _this4 = this;
	    // Backward compatibility
	    if (!this.itemsList) {
	      this.itemsList = queryOne('.ecl-menu__list', this.element);
	    }
	    if (!this.itemsList || !this.inner || !this.btnNext || !this.btnPrevious || !this.items) {
	      return;
	    }

	    // Check if the menu is too large
	    this.hasOverflow = this.totalItemsWidth > this.inner.offsetWidth;
	    if (!this.hasOverflow || !this.isDesktop) {
	      // Reset values related to overflow
	      if (this.btnPrevious) {
	        this.btnPrevious.style.display = 'none';
	      }
	      if (this.btnNext) {
	        this.btnNext.style.display = 'none';
	      }
	      if (this.itemsList) {
	        this.itemsList.style.left = '0';
	      }
	      if (this.inner) {
	        this.inner.classList.remove('ecl-menu__inner--has-overflow');
	      }
	      this.offsetLeft = 0;
	      this.totalItemsWidth = 0;
	      this.lastVisibleItem = null;
	      return;
	    }
	    if (this.inner) {
	      this.inner.classList.add('ecl-menu__inner--has-overflow');
	    }

	    // Reset visibility indicator
	    if (this.items) {
	      this.items.forEach(function (item) {
	        item.removeAttribute('data-ecl-menu-item-visible');
	      });
	    }

	    // First case: overflow to the end
	    if (this.offsetLeft === 0) {
	      this.btnNext.style.display = 'block';

	      // Get visible items
	      if (this.direction === 'rtl') {
	        this.items.every(function (item) {
	          if (item.getBoundingClientRect().left < _this4.itemsList.getBoundingClientRect().left) {
	            _this4.lastVisibleItem = item;
	            return false;
	          }
	          item.setAttribute('data-ecl-menu-item-visible', true);
	          return true;
	        });
	      } else {
	        this.items.every(function (item) {
	          if (item.getBoundingClientRect().right > _this4.itemsList.getBoundingClientRect().right) {
	            _this4.lastVisibleItem = item;
	            return false;
	          }
	          item.setAttribute('data-ecl-menu-item-visible', true);
	          return true;
	        });
	      }
	    }
	    // Second case: overflow to the begining
	    else {
	      // Get visible items
	      // eslint-disable-next-line no-lonely-if
	      if (this.direction === 'rtl') {
	        this.items.forEach(function (item) {
	          if (item.getBoundingClientRect().right <= _this4.inner.getBoundingClientRect().right) {
	            item.setAttribute('data-ecl-menu-item-visible', true);
	          }
	        });
	      } else {
	        this.items.forEach(function (item) {
	          if (item.getBoundingClientRect().left >= _this4.inner.getBoundingClientRect().left) {
	            item.setAttribute('data-ecl-menu-item-visible', true);
	          }
	        });
	      }
	    }
	  }

	  /**
	   * Check for a specific menu item how to display it:
	   * - number of lines
	   * - mega menu position
	   *
	   * @param {Node} menuItem
	   */;
	  _proto.checkMenuItem = function checkMenuItem(menuItem) {
	    var menuLink = queryOne(this.linkSelector, menuItem);

	    // Save current menu item
	    if (menuItem.classList.contains('ecl-menu__item--current')) {
	      this.currentItem = menuItem;
	    }
	    if (!this.isDesktop) {
	      menuLink.style.width = '100%';
	      return;
	    }

	    // Check if line management has been disabled by user
	    if (this.maxLines < 1) return;

	    // Handle menu item height and width (n "lines" max)
	    // Max height: n * line-height + padding
	    // We need to temporally change item alignments to get the height
	    menuItem.style.alignItems = 'flex-start';
	    var linkWidth = menuLink.offsetWidth;
	    var linkStyle = window.getComputedStyle(menuLink);
	    var maxHeight = parseInt(linkStyle.lineHeight, 10) * this.maxLines + parseInt(linkStyle.paddingTop, 10) + parseInt(linkStyle.paddingBottom, 10);
	    while (menuLink.offsetHeight > maxHeight) {
	      menuLink.style.width = (linkWidth += 1) + "px";

	      // Safety exit
	      if (linkWidth > 1000) break;
	    }
	    menuItem.style.alignItems = 'unset';
	  }

	  /**
	   * Handle positioning of mega menu
	   * @param {Node} menuItem
	   */;
	  _proto.checkMegaMenu = function checkMegaMenu(menuItem) {
	    var menuMega = queryOne(this.megaSelector, menuItem);
	    if (menuMega && this.inner) {
	      // Check number of items and put them in column
	      var subItems = queryAll(this.subItemSelector, menuMega);
	      if (subItems.length < 5) {
	        menuItem.classList.add('ecl-menu__item--col1');
	      } else if (subItems.length < 9) {
	        menuItem.classList.add('ecl-menu__item--col2');
	      } else if (subItems.length < 13) {
	        menuItem.classList.add('ecl-menu__item--col3');
	      } else {
	        menuItem.classList.add('ecl-menu__item--full');
	        if (this.direction === 'rtl') {
	          menuMega.style.right = this.offsetLeft + "px";
	        } else {
	          menuMega.style.left = this.offsetLeft + "px";
	        }
	        return;
	      }

	      // Check if there is enough space on the right to display the menu
	      var megaBounding = menuMega.getBoundingClientRect();
	      var containerBounding = this.inner.getBoundingClientRect();
	      var menuItemBounding = menuItem.getBoundingClientRect();
	      var megaWidth = megaBounding.width;
	      var containerWidth = containerBounding.width;
	      var menuItemPosition = menuItemBounding.left - containerBounding.left;
	      if (menuItemPosition + megaWidth > containerWidth) {
	        menuMega.classList.add('ecl-menu__mega--rtl');
	      } else {
	        menuMega.classList.remove('ecl-menu__mega--rtl');
	      }
	    }
	  }

	  /**
	   * Handles keyboard events specific to the menu.
	   *
	   * @param {Event} e
	   */;
	  _proto.handleKeyboard = function handleKeyboard(e) {
	    var element = e.target;
	    var cList = element.classList;
	    var menuExpanded = this.element.getAttribute('aria-expanded');
	    var menuItem = element.closest(this.itemSelector);

	    // Detect press on Escape
	    if (e.key === 'Escape' || e.key === 'Esc') {
	      if (document.activeElement === element) {
	        element.blur();
	      }
	      if (menuExpanded === 'false') {
	        var buttonCaret = queryOne('.ecl-menu__button-caret', menuItem);
	        if (buttonCaret) {
	          buttonCaret.focus();
	        }
	        this.closeOpenDropdown();
	      }
	      return;
	    }

	    // Key actions to toggle the caret buttons
	    if (cList.contains('ecl-menu__button-caret') && menuExpanded === 'false') {
	      if (e.keyCode === 32 || e.key === 'Enter') {
	        if (menuItem.getAttribute('aria-expanded') === 'true') {
	          this.handleHoverOffItem(e);
	        } else {
	          this.handleHoverOnItem(e);
	        }
	        return;
	      }
	      if (e.key === 'ArrowDown') {
	        var firstItem = queryOne('.ecl-menu__sublink:first-of-type', menuItem);
	        if (firstItem) {
	          firstItem.focus();
	          return;
	        }
	      }
	    }

	    // Key actions to navigate between first level menu items
	    if (cList.contains('ecl-menu__link') || cList.contains('ecl-menu__button-caret')) {
	      if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
	        var prevItem = element.previousSibling;
	        if (prevItem && prevItem.classList.contains('ecl-menu__link')) {
	          prevItem.focus();
	          return;
	        }
	        prevItem = element.parentElement.previousSibling;
	        if (prevItem) {
	          var prevClass = prevItem.classList.contains('ecl-menu__item--has-children') ? '.ecl-menu__button-caret' : '.ecl-menu__link';
	          var prevLink = queryOne(prevClass, prevItem);
	          if (prevLink) {
	            prevLink.focus();
	            return;
	          }
	        }
	      }
	      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
	        var nextItem = element.nextSibling;
	        if (nextItem && nextItem.classList.contains('ecl-menu__button-caret')) {
	          nextItem.focus();
	          return;
	        }
	        nextItem = element.parentElement.nextSibling;
	        if (nextItem) {
	          var nextLink = queryOne('.ecl-menu__link', nextItem);
	          if (nextLink) {
	            nextLink.focus();
	          }
	        }
	      }
	      this.closeOpenDropdown();
	    }

	    // Key actions to navigate between the sub-links
	    if (cList.contains('ecl-menu__sublink')) {
	      if (e.key === 'ArrowDown') {
	        var _nextItem = element.parentElement.nextSibling;
	        if (_nextItem) {
	          var _nextLink = queryOne('.ecl-menu__sublink', _nextItem);
	          if (_nextLink) {
	            _nextLink.focus();
	            return;
	          }
	        }
	      }
	      if (e.key === 'ArrowUp') {
	        var _prevItem = element.parentElement.previousSibling;
	        if (_prevItem) {
	          var _prevLink = queryOne('.ecl-menu__sublink', _prevItem);
	          if (_prevLink) {
	            _prevLink.focus();
	          }
	        } else {
	          var caretButton = queryOne(this.itemSelector + "[aria-expanded=\"true\"] " + this.caretSelector, this.element);
	          if (caretButton) {
	            caretButton.focus();
	          }
	        }
	      }
	    }
	  }

	  /**
	   * Handles global keyboard events, triggered outside of the menu.
	   *
	   * @param {Event} e
	   */;
	  _proto.handleKeyboardGlobal = function handleKeyboardGlobal(e) {
	    var menuExpanded = this.element.getAttribute('aria-expanded');

	    // Detect press on Escape
	    if (e.key === 'Escape' || e.key === 'Esc') {
	      if (menuExpanded === 'true') {
	        this.handleClickOnClose();
	      }
	    }
	  }

	  /**
	   * Open menu list.
	   * @param {Event} e
	   */;
	  _proto.handleClickOnOpen = function handleClickOnOpen(e) {
	    e.preventDefault();
	    this.element.setAttribute('aria-expanded', 'true');
	    this.inner.setAttribute('aria-hidden', 'false');
	    this.isOpen = true;
	    return this;
	  }

	  /**
	   * Close menu list.
	   */;
	  _proto.handleClickOnClose = function handleClickOnClose() {
	    this.element.setAttribute('aria-expanded', 'false');

	    // Remove css class and attribute from inner menu
	    this.inner.classList.remove('ecl-menu__inner--expanded');
	    this.inner.setAttribute('aria-hidden', 'true');

	    // Remove css class and attribute from menu items
	    this.items.forEach(function (item) {
	      item.classList.remove('ecl-menu__item--expanded');
	      item.setAttribute('aria-expanded', 'false');
	    });

	    // Set focus to hamburger button
	    if (this.open) {
	      this.open.focus();
	    }
	    this.isOpen = false;
	    return this;
	  }

	  /**
	   * Get back to previous list (on mobile)
	   */;
	  _proto.handleClickOnBack = function handleClickOnBack() {
	    // Remove css class from inner menu
	    this.inner.classList.remove('ecl-menu__inner--expanded');

	    // Remove css class and attribute from menu items
	    this.items.forEach(function (item) {
	      item.classList.remove('ecl-menu__item--expanded');
	      item.setAttribute('aria-expanded', 'false');
	    });
	    return this;
	  }

	  /**
	   * Click on the previous items button
	   */;
	  _proto.handleClickOnPreviousItems = function handleClickOnPreviousItems() {
	    var _this5 = this;
	    if (!this.itemsList || !this.btnNext) return;
	    this.offsetLeft = 0;
	    if (this.direction === 'rtl') {
	      this.itemsList.style.right = '0';
	      this.itemsList.style.left = 'auto';
	    } else {
	      this.itemsList.style.left = '0';
	      this.itemsList.style.right = 'auto';
	    }

	    // Update button display
	    this.btnPrevious.style.display = 'none';
	    this.btnNext.style.display = 'block';

	    // Refresh display
	    if (this.items) {
	      this.items.forEach(function (item) {
	        _this5.checkMenuItem(item);
	        item.toggleAttribute('data-ecl-menu-item-visible');
	      });
	    }
	  }

	  /**
	   * Click on the next items button
	   */;
	  _proto.handleClickOnNextItems = function handleClickOnNextItems() {
	    var _this6 = this;
	    if (!this.itemsList || !this.items || !this.btnPrevious || !this.lastVisibleItem) return;

	    // Update button display
	    this.btnPrevious.style.display = 'block';
	    this.btnNext.style.display = 'none';

	    // Calculate left offset
	    if (this.direction === 'rtl') {
	      this.offsetLeft = this.itemsList.getBoundingClientRect().right - this.lastVisibleItem.getBoundingClientRect().right - this.btnPrevious.offsetWidth;
	      this.itemsList.style.right = "-" + this.offsetLeft + "px";
	      this.itemsList.style.left = 'auto';
	    } else {
	      this.offsetLeft = this.lastVisibleItem.getBoundingClientRect().left - this.itemsList.getBoundingClientRect().left - this.btnPrevious.offsetWidth;
	      this.itemsList.style.left = "-" + this.offsetLeft + "px";
	      this.itemsList.style.right = 'auto';
	    }

	    // Refresh display
	    if (this.items) {
	      this.items.forEach(function (item) {
	        _this6.checkMenuItem(item);
	        item.toggleAttribute('data-ecl-menu-item-visible');
	      });
	    }
	  }

	  /**
	   * Click on a menu item caret
	   * @param {Event} e
	   */;
	  _proto.handleClickOnCaret = function handleClickOnCaret(e) {
	    // Don't execute for desktop display
	    var menuExpanded = this.element.getAttribute('aria-expanded');
	    if (menuExpanded === 'false') {
	      return;
	    }

	    // Add css class to inner menu
	    this.inner.classList.add('ecl-menu__inner--expanded');

	    // Add css class and attribute to current item, and remove it from others
	    var menuItem = e.target.closest(this.itemSelector);
	    this.items.forEach(function (item) {
	      if (item === menuItem) {
	        item.classList.add('ecl-menu__item--expanded');
	        item.setAttribute('aria-expanded', 'true');
	      } else {
	        item.classList.remove('ecl-menu__item--expanded');
	        item.setAttribute('aria-expanded', 'false');
	      }
	    });
	    this.checkMegaMenu(menuItem);
	  }

	  /**
	   * Hover on a menu item
	   * @param {Event} e
	   */;
	  _proto.handleHoverOnItem = function handleHoverOnItem(e) {
	    var menuItem = e.target.closest(this.itemSelector);

	    // Ignore hidden or partially hidden items
	    if (this.hasOverflow && !menuItem.hasAttribute('data-ecl-menu-item-visible')) return;

	    // Add attribute to current item, and remove it from others
	    this.items.forEach(function (item) {
	      if (item === menuItem) {
	        item.setAttribute('aria-expanded', 'true');
	      } else {
	        item.setAttribute('aria-expanded', 'false');

	        // Force remove focus on caret buttons
	        var caretButton = queryOne('.ecl-menu__button-caret', item);
	        if (caretButton) {
	          caretButton.blur();
	        }
	      }
	    });
	    this.checkMegaMenu(menuItem);
	  }

	  /**
	   * Deselect a menu item
	   * @param {Event} e
	   */;
	  _proto.handleHoverOffItem = function handleHoverOffItem(e) {
	    // Remove attribute to current item
	    var menuItem = e.target.closest(this.itemSelector);
	    menuItem.setAttribute('aria-expanded', 'false');
	    return this;
	  }

	  /**
	   * Deselect any opened menu item
	   */;
	  _proto.closeOpenDropdown = function closeOpenDropdown() {
	    var currentItem = queryOne(this.itemSelector + "[aria-expanded='true']", this.element);
	    if (currentItem) {
	      currentItem.setAttribute('aria-expanded', 'false');
	    }
	  }

	  /**
	   * Focus in a menu link
	   * @param {Event} e
	   */;
	  _proto.handleFocusIn = function handleFocusIn(e) {
	    var element = e.target;

	    // Specific focus action for desktop menu
	    if (this.isDesktop && this.hasOverflow) {
	      var parentItem = element.closest('[data-ecl-menu-item]');
	      if (!parentItem.hasAttribute('data-ecl-menu-item-visible')) {
	        // Trigger scroll button depending on the context
	        if (this.offsetLeft === 0) {
	          this.handleClickOnNextItems();
	        } else {
	          this.handleClickOnPreviousItems();
	        }
	      }
	    }
	  }

	  /**
	   * Focus out of a menu link
	   * @param {Event} e
	   */;
	  _proto.handleFocusOut = function handleFocusOut(e) {
	    var element = e.target;
	    var menuExpanded = this.element.getAttribute('aria-expanded');

	    // Specific focus action for mobile menu
	    // Loop through the items and go back to close button
	    if (menuExpanded === 'true') {
	      var nextItem = element.parentElement.nextSibling;
	      if (!nextItem) {
	        // There are no next menu item, but maybe there is a carret button
	        var caretButton = queryOne('.ecl-menu__button-caret', element.parentElement);
	        if (caretButton && element !== caretButton) {
	          return;
	        }

	        // This is the last item, go back to close button
	        this.close.focus();
	      }
	    }
	  };
	  return Menu;
	}();

	exports.Menu = Menu;
	exports.default = Menu;

	Object.defineProperty(exports, '__esModule', { value: true });

	return exports;

})({});
