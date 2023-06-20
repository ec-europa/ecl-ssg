var ECL = (function (exports) {
	'use strict';

	var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

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

	var gumshoe_polyfills = createCommonjsModule(function (module, exports) {
	  /*!
	   * gumshoejs v5.1.2
	   * A simple, framework-agnostic scrollspy script.
	   * (c) 2019 Chris Ferdinandi
	   * MIT License
	   * http://github.com/cferdinandi/gumshoe
	   */

	  /**
	   * Element.closest() polyfill
	   * https://developer.mozilla.org/en-US/docs/Web/API/Element/closest#Polyfill
	   */
	  if (!Element.prototype.closest) {
	    if (!Element.prototype.matches) {
	      Element.prototype.matches = Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector;
	    }
	    Element.prototype.closest = function (s) {
	      var el = this;
	      var ancestor = this;
	      if (!document.documentElement.contains(el)) return null;
	      do {
	        if (ancestor.matches(s)) return ancestor;
	        ancestor = ancestor.parentElement;
	      } while (ancestor !== null);
	      return null;
	    };
	  }
	  /**
	   * CustomEvent() polyfill
	   * https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent/CustomEvent#Polyfill
	   */
	  (function () {
	    if (typeof window.CustomEvent === "function") return false;
	    function CustomEvent(event, params) {
	      params = params || {
	        bubbles: false,
	        cancelable: false,
	        detail: undefined
	      };
	      var evt = document.createEvent('CustomEvent');
	      evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail);
	      return evt;
	    }
	    CustomEvent.prototype = window.Event.prototype;
	    window.CustomEvent = CustomEvent;
	  })();
	  (function (root, factory) {
	    {
	      module.exports = factory(root);
	    }
	  })(typeof commonjsGlobal !== 'undefined' ? commonjsGlobal : typeof window !== 'undefined' ? window : commonjsGlobal, function (window) {

	    //
	    // Defaults
	    //
	    var defaults = {
	      // Active classes
	      navClass: 'active',
	      contentClass: 'active',
	      // Nested navigation
	      nested: false,
	      nestedClass: 'active',
	      // Offset & reflow
	      offset: 0,
	      reflow: false,
	      // Event support
	      events: true
	    };

	    //
	    // Methods
	    //

	    /**
	     * Merge two or more objects together.
	     * @param   {Object}   objects  The objects to merge together
	     * @returns {Object}            Merged values of defaults and options
	     */
	    var extend = function extend() {
	      var merged = {};
	      Array.prototype.forEach.call(arguments, function (obj) {
	        for (var key in obj) {
	          if (!obj.hasOwnProperty(key)) return;
	          merged[key] = obj[key];
	        }
	      });
	      return merged;
	    };

	    /**
	     * Emit a custom event
	     * @param  {String} type   The event type
	     * @param  {Node}   elem   The element to attach the event to
	     * @param  {Object} detail Any details to pass along with the event
	     */
	    var emitEvent = function emitEvent(type, elem, detail) {
	      // Make sure events are enabled
	      if (!detail.settings.events) return;

	      // Create a new event
	      var event = new CustomEvent(type, {
	        bubbles: true,
	        cancelable: true,
	        detail: detail
	      });

	      // Dispatch the event
	      elem.dispatchEvent(event);
	    };

	    /**
	     * Get an element's distance from the top of the Document.
	     * @param  {Node} elem The element
	     * @return {Number}    Distance from the top in pixels
	     */
	    var getOffsetTop = function getOffsetTop(elem) {
	      var location = 0;
	      if (elem.offsetParent) {
	        while (elem) {
	          location += elem.offsetTop;
	          elem = elem.offsetParent;
	        }
	      }
	      return location >= 0 ? location : 0;
	    };

	    /**
	     * Sort content from first to last in the DOM
	     * @param  {Array} contents The content areas
	     */
	    var sortContents = function sortContents(contents) {
	      if (contents) {
	        contents.sort(function (item1, item2) {
	          var offset1 = getOffsetTop(item1.content);
	          var offset2 = getOffsetTop(item2.content);
	          if (offset1 < offset2) return -1;
	          return 1;
	        });
	      }
	    };

	    /**
	     * Get the offset to use for calculating position
	     * @param  {Object} settings The settings for this instantiation
	     * @return {Float}           The number of pixels to offset the calculations
	     */
	    var getOffset = function getOffset(settings) {
	      // if the offset is a function run it
	      if (typeof settings.offset === 'function') {
	        return parseFloat(settings.offset());
	      }

	      // Otherwise, return it as-is
	      return parseFloat(settings.offset);
	    };

	    /**
	     * Get the document element's height
	     * @private
	     * @returns {Number}
	     */
	    var getDocumentHeight = function getDocumentHeight() {
	      return Math.max(document.body.scrollHeight, document.documentElement.scrollHeight, document.body.offsetHeight, document.documentElement.offsetHeight, document.body.clientHeight, document.documentElement.clientHeight);
	    };

	    /**
	     * Determine if an element is in view
	     * @param  {Node}    elem     The element
	     * @param  {Object}  settings The settings for this instantiation
	     * @param  {Boolean} bottom   If true, check if element is above bottom of viewport instead
	     * @return {Boolean}          Returns true if element is in the viewport
	     */
	    var isInView = function isInView(elem, settings, bottom) {
	      var bounds = elem.getBoundingClientRect();
	      var offset = getOffset(settings);
	      if (bottom) {
	        return parseInt(bounds.bottom, 10) < (window.innerHeight || document.documentElement.clientHeight);
	      }
	      return parseInt(bounds.top, 10) <= offset;
	    };

	    /**
	     * Check if at the bottom of the viewport
	     * @return {Boolean} If true, page is at the bottom of the viewport
	     */
	    var isAtBottom = function isAtBottom() {
	      if (window.innerHeight + window.pageYOffset >= getDocumentHeight()) return true;
	      return false;
	    };

	    /**
	     * Check if the last item should be used (even if not at the top of the page)
	     * @param  {Object} item     The last item
	     * @param  {Object} settings The settings for this instantiation
	     * @return {Boolean}         If true, use the last item
	     */
	    var useLastItem = function useLastItem(item, settings) {
	      if (isAtBottom() && isInView(item.content, settings, true)) return true;
	      return false;
	    };

	    /**
	     * Get the active content
	     * @param  {Array}  contents The content areas
	     * @param  {Object} settings The settings for this instantiation
	     * @return {Object}          The content area and matching navigation link
	     */
	    var getActive = function getActive(contents, settings) {
	      var last = contents[contents.length - 1];
	      if (useLastItem(last, settings)) return last;
	      for (var i = contents.length - 1; i >= 0; i--) {
	        if (isInView(contents[i].content, settings)) return contents[i];
	      }
	    };

	    /**
	     * Deactivate parent navs in a nested navigation
	     * @param  {Node}   nav      The starting navigation element
	     * @param  {Object} settings The settings for this instantiation
	     */
	    var deactivateNested = function deactivateNested(nav, settings) {
	      // If nesting isn't activated, bail
	      if (!settings.nested || !nav.parentNode) return;

	      // Get the parent navigation
	      var li = nav.parentNode.closest('li');
	      if (!li) return;

	      // Remove the active class
	      li.classList.remove(settings.nestedClass);

	      // Apply recursively to any parent navigation elements
	      deactivateNested(li, settings);
	    };

	    /**
	     * Deactivate a nav and content area
	     * @param  {Object} items    The nav item and content to deactivate
	     * @param  {Object} settings The settings for this instantiation
	     */
	    var deactivate = function deactivate(items, settings) {
	      // Make sure there are items to deactivate
	      if (!items) return;

	      // Get the parent list item
	      var li = items.nav.closest('li');
	      if (!li) return;

	      // Remove the active class from the nav and content
	      li.classList.remove(settings.navClass);
	      items.content.classList.remove(settings.contentClass);

	      // Deactivate any parent navs in a nested navigation
	      deactivateNested(li, settings);

	      // Emit a custom event
	      emitEvent('gumshoeDeactivate', li, {
	        link: items.nav,
	        content: items.content,
	        settings: settings
	      });
	    };

	    /**
	     * Activate parent navs in a nested navigation
	     * @param  {Node}   nav      The starting navigation element
	     * @param  {Object} settings The settings for this instantiation
	     */
	    var activateNested = function activateNested(nav, settings) {
	      // If nesting isn't activated, bail
	      if (!settings.nested) return;

	      // Get the parent navigation
	      var li = nav.parentNode.closest('li');
	      if (!li) return;

	      // Add the active class
	      li.classList.add(settings.nestedClass);

	      // Apply recursively to any parent navigation elements
	      activateNested(li, settings);
	    };

	    /**
	     * Activate a nav and content area
	     * @param  {Object} items    The nav item and content to activate
	     * @param  {Object} settings The settings for this instantiation
	     */
	    var activate = function activate(items, settings) {
	      // Make sure there are items to activate
	      if (!items) return;

	      // Get the parent list item
	      var li = items.nav.closest('li');
	      if (!li) return;

	      // Add the active class to the nav and content
	      li.classList.add(settings.navClass);
	      items.content.classList.add(settings.contentClass);

	      // Activate any parent navs in a nested navigation
	      activateNested(li, settings);

	      // Emit a custom event
	      emitEvent('gumshoeActivate', li, {
	        link: items.nav,
	        content: items.content,
	        settings: settings
	      });
	    };

	    /**
	     * Create the Constructor object
	     * @param {String} selector The selector to use for navigation items
	     * @param {Object} options  User options and settings
	     */
	    var Constructor = function Constructor(selector, options) {
	      //
	      // Variables
	      //

	      var publicAPIs = {};
	      var navItems, contents, current, timeout, settings;

	      //
	      // Methods
	      //

	      /**
	       * Set variables from DOM elements
	       */
	      publicAPIs.setup = function () {
	        // Get all nav items
	        navItems = document.querySelectorAll(selector);

	        // Create contents array
	        contents = [];

	        // Loop through each item, get it's matching content, and push to the array
	        Array.prototype.forEach.call(navItems, function (item) {
	          // Get the content for the nav item
	          var content = document.getElementById(decodeURIComponent(item.hash.substr(1)));
	          if (!content) return;

	          // Push to the contents array
	          contents.push({
	            nav: item,
	            content: content
	          });
	        });

	        // Sort contents by the order they appear in the DOM
	        sortContents(contents);
	      };

	      /**
	       * Detect which content is currently active
	       */
	      publicAPIs.detect = function () {
	        // Get the active content
	        var active = getActive(contents, settings);

	        // if there's no active content, deactivate and bail
	        if (!active) {
	          if (current) {
	            deactivate(current, settings);
	            current = null;
	          }
	          return;
	        }

	        // If the active content is the one currently active, do nothing
	        if (current && active.content === current.content) return;

	        // Deactivate the current content and activate the new content
	        deactivate(current, settings);
	        activate(active, settings);

	        // Update the currently active content
	        current = active;
	      };

	      /**
	       * Detect the active content on scroll
	       * Debounced for performance
	       */
	      var scrollHandler = function scrollHandler(event) {
	        // If there's a timer, cancel it
	        if (timeout) {
	          window.cancelAnimationFrame(timeout);
	        }

	        // Setup debounce callback
	        timeout = window.requestAnimationFrame(publicAPIs.detect);
	      };

	      /**
	       * Update content sorting on resize
	       * Debounced for performance
	       */
	      var resizeHandler = function resizeHandler(event) {
	        // If there's a timer, cancel it
	        if (timeout) {
	          window.cancelAnimationFrame(timeout);
	        }

	        // Setup debounce callback
	        timeout = window.requestAnimationFrame(function () {
	          sortContents(contents);
	          publicAPIs.detect();
	        });
	      };

	      /**
	       * Destroy the current instantiation
	       */
	      publicAPIs.destroy = function () {
	        // Undo DOM changes
	        if (current) {
	          deactivate(current, settings);
	        }

	        // Remove event listeners
	        window.removeEventListener('scroll', scrollHandler, false);
	        if (settings.reflow) {
	          window.removeEventListener('resize', resizeHandler, false);
	        }

	        // Reset variables
	        contents = null;
	        navItems = null;
	        current = null;
	        timeout = null;
	        settings = null;
	      };

	      /**
	       * Initialize the current instantiation
	       */
	      var init = function init() {
	        // Merge user options into defaults
	        settings = extend(defaults, options || {});

	        // Setup variables based on the current DOM
	        publicAPIs.setup();

	        // Find the currently active content
	        publicAPIs.detect();

	        // Setup event listeners
	        window.addEventListener('scroll', scrollHandler, false);
	        if (settings.reflow) {
	          window.addEventListener('resize', resizeHandler, false);
	        }
	      };

	      //
	      // Initialize and return the public APIs
	      //

	      init();
	      return publicAPIs;
	    };

	    //
	    // Return the Constructor
	    //

	    return Constructor;
	  });
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

	/**
	 * @param {HTMLElement} element DOM element for component instantiation and scope
	 * @param {Object} options
	 * @param {String} options.stickySelector Selector for sticky inpage navigation element
	 * @param {String} options.containerSelector Selector for inpage navigation container element
	 * @param {String} options.inPageList Selector for inpage navigation list element
	 * @param {String} options.spySelector Selector for inpage navigation spied element
	 * @param {String} options.toggleSelector Selector for inpage navigation trigger element
	 * @param {String} options.linksSelector Selector for inpage navigation link element
	 * @param {String} options.spyActiveContainer Selector for inpage navigation container to spy on element
	 * @param {String} options.spyClass Selector to spy on
	 * @param {String} options.spyTrigger
	 * @param {Number} options.spyOffset
	 * @param {Boolean} options.attachClickListener Whether or not to bind click events
	 */
	var InpageNavigation = /*#__PURE__*/function () {
	  /**
	   * @static
	   * Shorthand for instance creation and initialisation.
	   *
	   * @param {HTMLElement} root DOM element for component instantiation and scope
	   *
	   * @return {InpageNavigation} An instance of InpageNavigation.
	   */
	  InpageNavigation.autoInit = function autoInit(root, _temp) {
	    var _ref = _temp === void 0 ? {} : _temp,
	      _ref$INPAGE_NAVIGATIO = _ref.INPAGE_NAVIGATION,
	      defaultOptions = _ref$INPAGE_NAVIGATIO === void 0 ? {} : _ref$INPAGE_NAVIGATIO;
	    var inpageNavigation = new InpageNavigation(root, defaultOptions);
	    inpageNavigation.init();
	    root.ECLInpageNavigation = inpageNavigation;
	    return inpageNavigation;
	  };
	  function InpageNavigation(element, _temp2) {
	    var _ref2 = _temp2 === void 0 ? {} : _temp2,
	      _ref2$stickySelector = _ref2.stickySelector,
	      stickySelector = _ref2$stickySelector === void 0 ? '[data-ecl-inpage-navigation]' : _ref2$stickySelector,
	      _ref2$containerSelect = _ref2.containerSelector,
	      containerSelector = _ref2$containerSelect === void 0 ? '[data-ecl-inpage-navigation-container]' : _ref2$containerSelect,
	      _ref2$inPageList = _ref2.inPageList,
	      inPageList = _ref2$inPageList === void 0 ? '[data-ecl-inpage-navigation-list]' : _ref2$inPageList,
	      _ref2$spySelector = _ref2.spySelector,
	      spySelector = _ref2$spySelector === void 0 ? '[data-ecl-inpage-navigation-link]' : _ref2$spySelector,
	      _ref2$toggleSelector = _ref2.toggleSelector,
	      toggleSelector = _ref2$toggleSelector === void 0 ? '[data-ecl-inpage-navigation-trigger]' : _ref2$toggleSelector,
	      _ref2$linksSelector = _ref2.linksSelector,
	      linksSelector = _ref2$linksSelector === void 0 ? '[data-ecl-inpage-navigation-link]' : _ref2$linksSelector,
	      _ref2$spyActiveContai = _ref2.spyActiveContainer,
	      spyActiveContainer = _ref2$spyActiveContai === void 0 ? 'ecl-inpage-navigation--visible' : _ref2$spyActiveContai,
	      _ref2$spyOffset = _ref2.spyOffset,
	      spyOffset = _ref2$spyOffset === void 0 ? 20 : _ref2$spyOffset,
	      _ref2$spyClass = _ref2.spyClass,
	      spyClass = _ref2$spyClass === void 0 ? 'ecl-inpage-navigation__item--active' : _ref2$spyClass,
	      _ref2$spyTrigger = _ref2.spyTrigger,
	      spyTrigger = _ref2$spyTrigger === void 0 ? '[data-ecl-inpage-navigation-trigger-current]' : _ref2$spyTrigger,
	      _ref2$attachClickList = _ref2.attachClickListener,
	      attachClickListener = _ref2$attachClickList === void 0 ? true : _ref2$attachClickList,
	      _ref2$contentClass = _ref2.contentClass,
	      contentClass = _ref2$contentClass === void 0 ? 'ecl-inpage-navigation__heading--active' : _ref2$contentClass;
	    // Check element
	    if (!element || element.nodeType !== Node.ELEMENT_NODE) {
	      throw new TypeError('DOM element should be given to initialize this widget.');
	    }
	    this.element = element;
	    this.attachClickListener = attachClickListener;
	    this.stickySelector = stickySelector;
	    this.containerSelector = containerSelector;
	    this.toggleSelector = toggleSelector;
	    this.linksSelector = linksSelector;
	    this.inPageList = inPageList;
	    this.spyActiveContainer = spyActiveContainer;
	    this.spySelector = spySelector;
	    this.spyOffset = spyOffset;
	    this.spyClass = spyClass;
	    this.spyTrigger = spyTrigger;
	    this.contentClass = contentClass;
	    this.gumshoe = null;
	    this.observer = null;
	    this.stickyObserver = null;

	    // Bind `this` for use in callbacks
	    this.handleClickOnToggler = this.handleClickOnToggler.bind(this);
	    this.handleClickOnLink = this.handleClickOnLink.bind(this);
	    this.initScrollSpy = this.initScrollSpy.bind(this);
	    this.initObserver = this.initObserver.bind(this);
	    this.activateScrollSpy = this.activateScrollSpy.bind(this);
	    this.deactivateScrollSpy = this.deactivateScrollSpy.bind(this);
	    this.destroySticky = this.destroySticky.bind(this);
	    this.destroyScrollSpy = this.destroyScrollSpy.bind(this);
	    this.destroyObserver = this.destroyObserver.bind(this);
	  }

	  // ACTIONS
	  /**
	   * Initiate sticky behaviors.
	   */
	  var _proto = InpageNavigation.prototype;
	  _proto.initSticky = function initSticky() {
	    this.stickyInstance = new stickyfill.Sticky(this.element);
	  }

	  /**
	   * Destroy sticky behaviors.
	   */;
	  _proto.destroySticky = function destroySticky() {
	    if (this.stickyInstance) {
	      this.stickyInstance.remove();
	    }
	  }

	  /**
	   * Initiate scroll spy behaviors.
	   */;
	  _proto.initScrollSpy = function initScrollSpy() {
	    var _this = this;
	    this.gumshoe = new gumshoe_polyfills(this.spySelector, {
	      navClass: this.spyClass,
	      contentClass: this.contentClass,
	      offset: this.spyOffset,
	      reflow: true
	    });
	    document.addEventListener('gumshoeActivate', this.activateScrollSpy, false);
	    document.addEventListener('gumshoeDeactivate', this.deactivateScrollSpy, false);
	    if ('IntersectionObserver' in window) {
	      var navigationContainer = queryOne(this.containerSelector);
	      if (navigationContainer) {
	        var previousY = 0;
	        var previousRatio = 0;
	        var initialized = false;
	        this.stickyObserver = new IntersectionObserver(function (entries) {
	          if (entries && entries[0]) {
	            var entry = entries[0];
	            var currentY = entry.boundingClientRect.y;
	            var currentRatio = entry.intersectionRatio;
	            var isIntersecting = entry.isIntersecting;
	            if (!initialized) {
	              initialized = true;
	              previousY = currentY;
	              previousRatio = currentRatio;
	              return;
	            }
	            if (currentY < previousY) {
	              if (!(currentRatio > previousRatio && isIntersecting)) {
	                // Scrolling down leave
	                _this.element.classList.remove(_this.spyActiveContainer);
	              }
	            } else if (currentY > previousY && isIntersecting) {
	              if (currentRatio > previousRatio) {
	                // Scrolling up enter
	                _this.element.classList.add(_this.spyActiveContainer);
	              }
	            }
	            previousY = currentY;
	            previousRatio = currentRatio;
	          }
	        }, {
	          root: null
	        });

	        // observing a target element
	        this.stickyObserver.observe(navigationContainer);
	      }
	    }
	  }

	  /**
	   * Activate scroll spy behaviors.
	   *
	   * @param {Event} event
	   */;
	  _proto.activateScrollSpy = function activateScrollSpy(event) {
	    var navigationTitle = queryOne(this.spyTrigger);
	    this.element.classList.add(this.spyActiveContainer);
	    navigationTitle.textContent = event.detail.content.textContent;
	  }

	  /**
	   * Deactivate scroll spy behaviors.
	   */;
	  _proto.deactivateScrollSpy = function deactivateScrollSpy() {
	    var navigationTitle = queryOne(this.spyTrigger);
	    this.element.classList.remove(this.spyActiveContainer);
	    navigationTitle.innerHTML = '';
	  }

	  /**
	   * Destroy scroll spy behaviors.
	   */;
	  _proto.destroyScrollSpy = function destroyScrollSpy() {
	    if (this.stickyObserver) {
	      this.stickyObserver.disconnect();
	    }
	    document.removeEventListener('gumshoeActivate', this.activateScrollSpy, false);
	    document.removeEventListener('gumshoeDeactivate', this.deactivateScrollSpy, false);
	    this.gumshoe.destroy();
	  }

	  /**
	   * Initiate observer.
	   */;
	  _proto.initObserver = function initObserver() {
	    if ('MutationObserver' in window) {
	      var self = this;
	      this.observer = new MutationObserver(function (mutationsList) {
	        var body = queryOne('.ecl-col-l-9');
	        var currentInpage = queryOne('[data-ecl-inpage-navigation-list]');
	        mutationsList.forEach(function (mutation) {
	          // Exclude the changes we perform.
	          if (mutation && mutation.target && mutation.target.classList && !mutation.target.classList.contains('ecl-inpage-navigation__trigger-current')) {
	            // Added nodes.
	            if (mutation.addedNodes.length > 0) {
	              [].slice.call(mutation.addedNodes).forEach(function (addedNode) {
	                if (addedNode.tagName === 'H2' && addedNode.id) {
	                  var H2s = queryAll('h2[id]', body);
	                  var addedNodeIndex = H2s.findIndex(function (H2) {
	                    return H2.id === addedNode.id;
	                  });
	                  var element = currentInpage.childNodes[addedNodeIndex - 1].cloneNode(true);
	                  element.childNodes[0].textContent = addedNode.textContent;
	                  element.childNodes[0].href = "#" + addedNode.id;
	                  currentInpage.childNodes[addedNodeIndex - 1].after(element);
	                }
	              });
	            }
	            // Removed nodes.
	            if (mutation.removedNodes.length > 0) {
	              [].slice.call(mutation.removedNodes).forEach(function (removedNode) {
	                if (removedNode.tagName === 'H2' && removedNode.id) {
	                  currentInpage.childNodes.forEach(function (item) {
	                    if (item.childNodes[0].href.indexOf(removedNode.id) !== -1) {
	                      // Remove the element from the inpage.
	                      item.remove();
	                    }
	                  });
	                }
	              });
	            }
	            self.update();
	          }
	        });
	      });
	      this.observer.observe(document, {
	        subtree: true,
	        childList: true
	      });
	    }
	  }

	  /**
	   * Destroy observer.
	   */;
	  _proto.destroyObserver = function destroyObserver() {
	    if (this.observer) {
	      this.observer.disconnect();
	    }
	  }

	  /**
	   * Initialise component.
	   */;
	  _proto.init = function init() {
	    var _this2 = this;
	    var toggleElement = queryOne(this.toggleSelector, this.element);
	    var navLinks = queryAll(this.linksSelector, this.element);
	    this.initSticky(this.element);
	    this.initScrollSpy();
	    this.initObserver();
	    if (this.attachClickListener && toggleElement) {
	      toggleElement.addEventListener('click', this.handleClickOnToggler);
	    }
	    if (this.attachClickListener && navLinks) {
	      navLinks.forEach(function (link) {
	        return link.addEventListener('click', _this2.handleClickOnLink);
	      });
	      toggleElement.addEventListener('click', this.handleClickOnToggler);
	    }

	    // Set ecl initialized attribute
	    this.element.setAttribute('data-ecl-auto-initialized', 'true');
	  }

	  /**
	   * Update scroll spy instance.
	   */;
	  _proto.update = function update() {
	    this.gumshoe.setup();
	  }

	  /**
	   * Invoke event listeners on toggle click.
	   *
	   * @param {Event} e
	   */;
	  _proto.handleClickOnToggler = function handleClickOnToggler(e) {
	    var currentList = queryOne(this.inPageList, this.element);
	    var togglerElement = queryOne(this.toggleSelector, this.element);
	    e.preventDefault();

	    // Get current status
	    var isExpanded = togglerElement.getAttribute('aria-expanded') === 'true';

	    // Toggle the expandable/collapsible
	    togglerElement.setAttribute('aria-expanded', isExpanded ? 'false' : 'true');
	    if (isExpanded) {
	      currentList.classList.remove('ecl-inpage-navigation__list--visible');
	    } else {
	      currentList.classList.add('ecl-inpage-navigation__list--visible');
	    }
	  }

	  /**
	   * Sets the necessary attributes to collapse inpage navigation list.
	   */;
	  _proto.handleClickOnLink = function handleClickOnLink() {
	    var currentList = queryOne(this.inPageList, this.element);
	    var togglerElement = queryOne(this.toggleSelector, this.element);
	    currentList.classList.remove('ecl-inpage-navigation__list--visible');
	    togglerElement.setAttribute('aria-expanded', 'false');
	  }

	  /**
	   * Destroy component instance.
	   */;
	  _proto.destroy = function destroy() {
	    var _this3 = this;
	    if (this.attachClickListener && this.toggleElement) {
	      this.toggleElement.removeEventListener('click', this.handleClickOnToggler);
	    }
	    if (this.attachClickListener && this.navLinks) {
	      this.navLinks.forEach(function (link) {
	        return link.removeEventListener('click', _this3.handleClickOnLink);
	      });
	    }
	    this.destroyScrollSpy();
	    this.destroySticky();
	    this.destroyObserver();
	    if (this.element) {
	      this.element.removeAttribute('data-ecl-auto-initialized');
	    }
	  };
	  return InpageNavigation;
	}();

	exports.InpageNavigation = InpageNavigation;
	exports.default = InpageNavigation;

	Object.defineProperty(exports, '__esModule', { value: true });

	return exports;

})({});
