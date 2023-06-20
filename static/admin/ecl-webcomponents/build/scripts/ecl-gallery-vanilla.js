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

  /*!
  * tabbable 6.1.2
  * @license MIT, https://github.com/focus-trap/tabbable/blob/master/LICENSE
  */
  // NOTE: separate `:not()` selectors has broader browser support than the newer
  //  `:not([inert], [inert] *)` (Feb 2023)
  // CAREFUL: JSDom does not support `:not([inert] *)` as a selector; using it causes
  //  the entire query to fail, resulting in no nodes found, which will break a lot
  //  of things... so we have to rely on JS to identify nodes inside an inert container
  var candidateSelectors = ['input:not([inert])', 'select:not([inert])', 'textarea:not([inert])', 'a[href]:not([inert])', 'button:not([inert])', '[tabindex]:not(slot):not([inert])', 'audio[controls]:not([inert])', 'video[controls]:not([inert])', '[contenteditable]:not([contenteditable="false"]):not([inert])', 'details>summary:first-of-type:not([inert])', 'details:not([inert])'];
  var candidateSelector = /* #__PURE__ */candidateSelectors.join(',');
  var NoElement = typeof Element === 'undefined';
  var matches = NoElement ? function () {} : Element.prototype.matches || Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector;
  var getRootNode = !NoElement && Element.prototype.getRootNode ? function (element) {
    var _element$getRootNode;
    return element === null || element === void 0 ? void 0 : (_element$getRootNode = element.getRootNode) === null || _element$getRootNode === void 0 ? void 0 : _element$getRootNode.call(element);
  } : function (element) {
    return element === null || element === void 0 ? void 0 : element.ownerDocument;
  };

  /**
   * Determines if a node is inert or in an inert ancestor.
   * @param {Element} [node]
   * @param {boolean} [lookUp] If true and `node` is not inert, looks up at ancestors to
   *  see if any of them are inert. If false, only `node` itself is considered.
   * @returns {boolean} True if inert itself or by way of being in an inert ancestor.
   *  False if `node` is falsy.
   */
  var isInert = function isInert(node, lookUp) {
    var _node$getAttribute;
    if (lookUp === void 0) {
      lookUp = true;
    }
    // CAREFUL: JSDom does not support inert at all, so we can't use the `HTMLElement.inert`
    //  JS API property; we have to check the attribute, which can either be empty or 'true';
    //  if it's `null` (not specified) or 'false', it's an active element
    var inertAtt = node === null || node === void 0 ? void 0 : (_node$getAttribute = node.getAttribute) === null || _node$getAttribute === void 0 ? void 0 : _node$getAttribute.call(node, 'inert');
    var inert = inertAtt === '' || inertAtt === 'true';

    // NOTE: this could also be handled with `node.matches('[inert], :is([inert] *)')`
    //  if it weren't for `matches()` not being a function on shadow roots; the following
    //  code works for any kind of node
    // CAREFUL: JSDom does not appear to support certain selectors like `:not([inert] *)`
    //  so it likely would not support `:is([inert] *)` either...
    var result = inert || lookUp && node && isInert(node.parentNode); // recursive

    return result;
  };

  /**
   * Determines if a node's content is editable.
   * @param {Element} [node]
   * @returns True if it's content-editable; false if it's not or `node` is falsy.
   */
  var isContentEditable = function isContentEditable(node) {
    var _node$getAttribute2;
    // CAREFUL: JSDom does not support the `HTMLElement.isContentEditable` API so we have
    //  to use the attribute directly to check for this, which can either be empty or 'true';
    //  if it's `null` (not specified) or 'false', it's a non-editable element
    var attValue = node === null || node === void 0 ? void 0 : (_node$getAttribute2 = node.getAttribute) === null || _node$getAttribute2 === void 0 ? void 0 : _node$getAttribute2.call(node, 'contenteditable');
    return attValue === '' || attValue === 'true';
  };

  /**
   * @param {Element} el container to check in
   * @param {boolean} includeContainer add container to check
   * @param {(node: Element) => boolean} filter filter candidates
   * @returns {Element[]}
   */
  var getCandidates = function getCandidates(el, includeContainer, filter) {
    // even if `includeContainer=false`, we still have to check it for inertness because
    //  if it's inert, all its children are inert
    if (isInert(el)) {
      return [];
    }
    var candidates = Array.prototype.slice.apply(el.querySelectorAll(candidateSelector));
    if (includeContainer && matches.call(el, candidateSelector)) {
      candidates.unshift(el);
    }
    candidates = candidates.filter(filter);
    return candidates;
  };

  /**
   * @callback GetShadowRoot
   * @param {Element} element to check for shadow root
   * @returns {ShadowRoot|boolean} ShadowRoot if available or boolean indicating if a shadowRoot is attached but not available.
   */

  /**
   * @callback ShadowRootFilter
   * @param {Element} shadowHostNode the element which contains shadow content
   * @returns {boolean} true if a shadow root could potentially contain valid candidates.
   */

  /**
   * @typedef {Object} CandidateScope
   * @property {Element} scopeParent contains inner candidates
   * @property {Element[]} candidates list of candidates found in the scope parent
   */

  /**
   * @typedef {Object} IterativeOptions
   * @property {GetShadowRoot|boolean} getShadowRoot true if shadow support is enabled; falsy if not;
   *  if a function, implies shadow support is enabled and either returns the shadow root of an element
   *  or a boolean stating if it has an undisclosed shadow root
   * @property {(node: Element) => boolean} filter filter candidates
   * @property {boolean} flatten if true then result will flatten any CandidateScope into the returned list
   * @property {ShadowRootFilter} shadowRootFilter filter shadow roots;
   */

  /**
   * @param {Element[]} elements list of element containers to match candidates from
   * @param {boolean} includeContainer add container list to check
   * @param {IterativeOptions} options
   * @returns {Array.<Element|CandidateScope>}
   */
  var getCandidatesIteratively = function getCandidatesIteratively(elements, includeContainer, options) {
    var candidates = [];
    var elementsToCheck = Array.from(elements);
    while (elementsToCheck.length) {
      var element = elementsToCheck.shift();
      if (isInert(element, false)) {
        // no need to look up since we're drilling down
        // anything inside this container will also be inert
        continue;
      }
      if (element.tagName === 'SLOT') {
        // add shadow dom slot scope (slot itself cannot be focusable)
        var assigned = element.assignedElements();
        var content = assigned.length ? assigned : element.children;
        var nestedCandidates = getCandidatesIteratively(content, true, options);
        if (options.flatten) {
          candidates.push.apply(candidates, nestedCandidates);
        } else {
          candidates.push({
            scopeParent: element,
            candidates: nestedCandidates
          });
        }
      } else {
        // check candidate element
        var validCandidate = matches.call(element, candidateSelector);
        if (validCandidate && options.filter(element) && (includeContainer || !elements.includes(element))) {
          candidates.push(element);
        }

        // iterate over shadow content if possible
        var shadowRoot = element.shadowRoot ||
        // check for an undisclosed shadow
        typeof options.getShadowRoot === 'function' && options.getShadowRoot(element);

        // no inert look up because we're already drilling down and checking for inertness
        //  on the way down, so all containers to this root node should have already been
        //  vetted as non-inert
        var validShadowRoot = !isInert(shadowRoot, false) && (!options.shadowRootFilter || options.shadowRootFilter(element));
        if (shadowRoot && validShadowRoot) {
          // add shadow dom scope IIF a shadow root node was given; otherwise, an undisclosed
          //  shadow exists, so look at light dom children as fallback BUT create a scope for any
          //  child candidates found because they're likely slotted elements (elements that are
          //  children of the web component element (which has the shadow), in the light dom, but
          //  slotted somewhere _inside_ the undisclosed shadow) -- the scope is created below,
          //  _after_ we return from this recursive call
          var _nestedCandidates = getCandidatesIteratively(shadowRoot === true ? element.children : shadowRoot.children, true, options);
          if (options.flatten) {
            candidates.push.apply(candidates, _nestedCandidates);
          } else {
            candidates.push({
              scopeParent: element,
              candidates: _nestedCandidates
            });
          }
        } else {
          // there's not shadow so just dig into the element's (light dom) children
          //  __without__ giving the element special scope treatment
          elementsToCheck.unshift.apply(elementsToCheck, element.children);
        }
      }
    }
    return candidates;
  };
  var getTabindex = function getTabindex(node, isScope) {
    if (node.tabIndex < 0) {
      // in Chrome, <details/>, <audio controls/> and <video controls/> elements get a default
      // `tabIndex` of -1 when the 'tabindex' attribute isn't specified in the DOM,
      // yet they are still part of the regular tab order; in FF, they get a default
      // `tabIndex` of 0; since Chrome still puts those elements in the regular tab
      // order, consider their tab index to be 0.
      // Also browsers do not return `tabIndex` correctly for contentEditable nodes;
      // so if they don't have a tabindex attribute specifically set, assume it's 0.
      //
      // isScope is positive for custom element with shadow root or slot that by default
      // have tabIndex -1, but need to be sorted by document order in order for their
      // content to be inserted in the correct position
      if ((isScope || /^(AUDIO|VIDEO|DETAILS)$/.test(node.tagName) || isContentEditable(node)) && isNaN(parseInt(node.getAttribute('tabindex'), 10))) {
        return 0;
      }
    }
    return node.tabIndex;
  };
  var sortOrderedTabbables = function sortOrderedTabbables(a, b) {
    return a.tabIndex === b.tabIndex ? a.documentOrder - b.documentOrder : a.tabIndex - b.tabIndex;
  };
  var isInput = function isInput(node) {
    return node.tagName === 'INPUT';
  };
  var isHiddenInput = function isHiddenInput(node) {
    return isInput(node) && node.type === 'hidden';
  };
  var isDetailsWithSummary = function isDetailsWithSummary(node) {
    var r = node.tagName === 'DETAILS' && Array.prototype.slice.apply(node.children).some(function (child) {
      return child.tagName === 'SUMMARY';
    });
    return r;
  };
  var getCheckedRadio = function getCheckedRadio(nodes, form) {
    for (var i = 0; i < nodes.length; i++) {
      if (nodes[i].checked && nodes[i].form === form) {
        return nodes[i];
      }
    }
  };
  var isTabbableRadio = function isTabbableRadio(node) {
    if (!node.name) {
      return true;
    }
    var radioScope = node.form || getRootNode(node);
    var queryRadios = function queryRadios(name) {
      return radioScope.querySelectorAll('input[type="radio"][name="' + name + '"]');
    };
    var radioSet;
    if (typeof window !== 'undefined' && typeof window.CSS !== 'undefined' && typeof window.CSS.escape === 'function') {
      radioSet = queryRadios(window.CSS.escape(node.name));
    } else {
      try {
        radioSet = queryRadios(node.name);
      } catch (err) {
        // eslint-disable-next-line no-console
        console.error('Looks like you have a radio button with a name attribute containing invalid CSS selector characters and need the CSS.escape polyfill: %s', err.message);
        return false;
      }
    }
    var checked = getCheckedRadio(radioSet, node.form);
    return !checked || checked === node;
  };
  var isRadio = function isRadio(node) {
    return isInput(node) && node.type === 'radio';
  };
  var isNonTabbableRadio = function isNonTabbableRadio(node) {
    return isRadio(node) && !isTabbableRadio(node);
  };

  // determines if a node is ultimately attached to the window's document
  var isNodeAttached = function isNodeAttached(node) {
    var _nodeRoot;
    // The root node is the shadow root if the node is in a shadow DOM; some document otherwise
    //  (but NOT _the_ document; see second 'If' comment below for more).
    // If rootNode is shadow root, it'll have a host, which is the element to which the shadow
    //  is attached, and the one we need to check if it's in the document or not (because the
    //  shadow, and all nodes it contains, is never considered in the document since shadows
    //  behave like self-contained DOMs; but if the shadow's HOST, which is part of the document,
    //  is hidden, or is not in the document itself but is detached, it will affect the shadow's
    //  visibility, including all the nodes it contains). The host could be any normal node,
    //  or a custom element (i.e. web component). Either way, that's the one that is considered
    //  part of the document, not the shadow root, nor any of its children (i.e. the node being
    //  tested).
    // To further complicate things, we have to look all the way up until we find a shadow HOST
    //  that is attached (or find none) because the node might be in nested shadows...
    // If rootNode is not a shadow root, it won't have a host, and so rootNode should be the
    //  document (per the docs) and while it's a Document-type object, that document does not
    //  appear to be the same as the node's `ownerDocument` for some reason, so it's safer
    //  to ignore the rootNode at this point, and use `node.ownerDocument`. Otherwise,
    //  using `rootNode.contains(node)` will _always_ be true we'll get false-positives when
    //  node is actually detached.
    // NOTE: If `nodeRootHost` or `node` happens to be the `document` itself (which is possible
    //  if a tabbable/focusable node was quickly added to the DOM, focused, and then removed
    //  from the DOM as in https://github.com/focus-trap/focus-trap-react/issues/905), then
    //  `ownerDocument` will be `null`, hence the optional chaining on it.
    var nodeRoot = node && getRootNode(node);
    var nodeRootHost = (_nodeRoot = nodeRoot) === null || _nodeRoot === void 0 ? void 0 : _nodeRoot.host;

    // in some cases, a detached node will return itself as the root instead of a document or
    //  shadow root object, in which case, we shouldn't try to look further up the host chain
    var attached = false;
    if (nodeRoot && nodeRoot !== node) {
      var _nodeRootHost, _nodeRootHost$ownerDo, _node$ownerDocument;
      attached = !!((_nodeRootHost = nodeRootHost) !== null && _nodeRootHost !== void 0 && (_nodeRootHost$ownerDo = _nodeRootHost.ownerDocument) !== null && _nodeRootHost$ownerDo !== void 0 && _nodeRootHost$ownerDo.contains(nodeRootHost) || node !== null && node !== void 0 && (_node$ownerDocument = node.ownerDocument) !== null && _node$ownerDocument !== void 0 && _node$ownerDocument.contains(node));
      while (!attached && nodeRootHost) {
        var _nodeRoot2, _nodeRootHost2, _nodeRootHost2$ownerD;
        // since it's not attached and we have a root host, the node MUST be in a nested shadow DOM,
        //  which means we need to get the host's host and check if that parent host is contained
        //  in (i.e. attached to) the document
        nodeRoot = getRootNode(nodeRootHost);
        nodeRootHost = (_nodeRoot2 = nodeRoot) === null || _nodeRoot2 === void 0 ? void 0 : _nodeRoot2.host;
        attached = !!((_nodeRootHost2 = nodeRootHost) !== null && _nodeRootHost2 !== void 0 && (_nodeRootHost2$ownerD = _nodeRootHost2.ownerDocument) !== null && _nodeRootHost2$ownerD !== void 0 && _nodeRootHost2$ownerD.contains(nodeRootHost));
      }
    }
    return attached;
  };
  var isZeroArea = function isZeroArea(node) {
    var _node$getBoundingClie = node.getBoundingClientRect(),
      width = _node$getBoundingClie.width,
      height = _node$getBoundingClie.height;
    return width === 0 && height === 0;
  };
  var isHidden = function isHidden(node, _ref) {
    var displayCheck = _ref.displayCheck,
      getShadowRoot = _ref.getShadowRoot;
    // NOTE: visibility will be `undefined` if node is detached from the document
    //  (see notes about this further down), which means we will consider it visible
    //  (this is legacy behavior from a very long way back)
    // NOTE: we check this regardless of `displayCheck="none"` because this is a
    //  _visibility_ check, not a _display_ check
    if (getComputedStyle(node).visibility === 'hidden') {
      return true;
    }
    var isDirectSummary = matches.call(node, 'details>summary:first-of-type');
    var nodeUnderDetails = isDirectSummary ? node.parentElement : node;
    if (matches.call(nodeUnderDetails, 'details:not([open]) *')) {
      return true;
    }
    if (!displayCheck || displayCheck === 'full' || displayCheck === 'legacy-full') {
      if (typeof getShadowRoot === 'function') {
        // figure out if we should consider the node to be in an undisclosed shadow and use the
        //  'non-zero-area' fallback
        var originalNode = node;
        while (node) {
          var parentElement = node.parentElement;
          var rootNode = getRootNode(node);
          if (parentElement && !parentElement.shadowRoot && getShadowRoot(parentElement) === true // check if there's an undisclosed shadow
          ) {
            // node has an undisclosed shadow which means we can only treat it as a black box, so we
            //  fall back to a non-zero-area test
            return isZeroArea(node);
          } else if (node.assignedSlot) {
            // iterate up slot
            node = node.assignedSlot;
          } else if (!parentElement && rootNode !== node.ownerDocument) {
            // cross shadow boundary
            node = rootNode.host;
          } else {
            // iterate up normal dom
            node = parentElement;
          }
        }
        node = originalNode;
      }
      // else, `getShadowRoot` might be true, but all that does is enable shadow DOM support
      //  (i.e. it does not also presume that all nodes might have undisclosed shadows); or
      //  it might be a falsy value, which means shadow DOM support is disabled

      // Since we didn't find it sitting in an undisclosed shadow (or shadows are disabled)
      //  now we can just test to see if it would normally be visible or not, provided it's
      //  attached to the main document.
      // NOTE: We must consider case where node is inside a shadow DOM and given directly to
      //  `isTabbable()` or `isFocusable()` -- regardless of `getShadowRoot` option setting.

      if (isNodeAttached(node)) {
        // this works wherever the node is: if there's at least one client rect, it's
        //  somehow displayed; it also covers the CSS 'display: contents' case where the
        //  node itself is hidden in place of its contents; and there's no need to search
        //  up the hierarchy either
        return !node.getClientRects().length;
      }

      // Else, the node isn't attached to the document, which means the `getClientRects()`
      //  API will __always__ return zero rects (this can happen, for example, if React
      //  is used to render nodes onto a detached tree, as confirmed in this thread:
      //  https://github.com/facebook/react/issues/9117#issuecomment-284228870)
      //
      // It also means that even window.getComputedStyle(node).display will return `undefined`
      //  because styles are only computed for nodes that are in the document.
      //
      // NOTE: THIS HAS BEEN THE CASE FOR YEARS. It is not new, nor is it caused by tabbable
      //  somehow. Though it was never stated officially, anyone who has ever used tabbable
      //  APIs on nodes in detached containers has actually implicitly used tabbable in what
      //  was later (as of v5.2.0 on Apr 9, 2021) called `displayCheck="none"` mode -- essentially
      //  considering __everything__ to be visible because of the innability to determine styles.
      //
      // v6.0.0: As of this major release, the default 'full' option __no longer treats detached
      //  nodes as visible with the 'none' fallback.__
      if (displayCheck !== 'legacy-full') {
        return true; // hidden
      }
      // else, fallback to 'none' mode and consider the node visible
    } else if (displayCheck === 'non-zero-area') {
      // NOTE: Even though this tests that the node's client rect is non-zero to determine
      //  whether it's displayed, and that a detached node will __always__ have a zero-area
      //  client rect, we don't special-case for whether the node is attached or not. In
      //  this mode, we do want to consider nodes that have a zero area to be hidden at all
      //  times, and that includes attached or not.
      return isZeroArea(node);
    }

    // visible, as far as we can tell, or per current `displayCheck=none` mode, we assume
    //  it's visible
    return false;
  };

  // form fields (nested) inside a disabled fieldset are not focusable/tabbable
  //  unless they are in the _first_ <legend> element of the top-most disabled
  //  fieldset
  var isDisabledFromFieldset = function isDisabledFromFieldset(node) {
    if (/^(INPUT|BUTTON|SELECT|TEXTAREA)$/.test(node.tagName)) {
      var parentNode = node.parentElement;
      // check if `node` is contained in a disabled <fieldset>
      while (parentNode) {
        if (parentNode.tagName === 'FIELDSET' && parentNode.disabled) {
          // look for the first <legend> among the children of the disabled <fieldset>
          for (var i = 0; i < parentNode.children.length; i++) {
            var child = parentNode.children.item(i);
            // when the first <legend> (in document order) is found
            if (child.tagName === 'LEGEND') {
              // if its parent <fieldset> is not nested in another disabled <fieldset>,
              // return whether `node` is a descendant of its first <legend>
              return matches.call(parentNode, 'fieldset[disabled] *') ? true : !child.contains(node);
            }
          }
          // the disabled <fieldset> containing `node` has no <legend>
          return true;
        }
        parentNode = parentNode.parentElement;
      }
    }

    // else, node's tabbable/focusable state should not be affected by a fieldset's
    //  enabled/disabled state
    return false;
  };
  var isNodeMatchingSelectorFocusable = function isNodeMatchingSelectorFocusable(options, node) {
    if (node.disabled ||
    // we must do an inert look up to filter out any elements inside an inert ancestor
    //  because we're limited in the type of selectors we can use in JSDom (see related
    //  note related to `candidateSelectors`)
    isInert(node) || isHiddenInput(node) || isHidden(node, options) ||
    // For a details element with a summary, the summary element gets the focus
    isDetailsWithSummary(node) || isDisabledFromFieldset(node)) {
      return false;
    }
    return true;
  };
  var isNodeMatchingSelectorTabbable = function isNodeMatchingSelectorTabbable(options, node) {
    if (isNonTabbableRadio(node) || getTabindex(node) < 0 || !isNodeMatchingSelectorFocusable(options, node)) {
      return false;
    }
    return true;
  };
  var isValidShadowRootTabbable = function isValidShadowRootTabbable(shadowHostNode) {
    var tabIndex = parseInt(shadowHostNode.getAttribute('tabindex'), 10);
    if (isNaN(tabIndex) || tabIndex >= 0) {
      return true;
    }
    // If a custom element has an explicit negative tabindex,
    // browsers will not allow tab targeting said element's children.
    return false;
  };

  /**
   * @param {Array.<Element|CandidateScope>} candidates
   * @returns Element[]
   */
  var sortByOrder = function sortByOrder(candidates) {
    var regularTabbables = [];
    var orderedTabbables = [];
    candidates.forEach(function (item, i) {
      var isScope = !!item.scopeParent;
      var element = isScope ? item.scopeParent : item;
      var candidateTabindex = getTabindex(element, isScope);
      var elements = isScope ? sortByOrder(item.candidates) : element;
      if (candidateTabindex === 0) {
        isScope ? regularTabbables.push.apply(regularTabbables, elements) : regularTabbables.push(element);
      } else {
        orderedTabbables.push({
          documentOrder: i,
          tabIndex: candidateTabindex,
          item: item,
          isScope: isScope,
          content: elements
        });
      }
    });
    return orderedTabbables.sort(sortOrderedTabbables).reduce(function (acc, sortable) {
      sortable.isScope ? acc.push.apply(acc, sortable.content) : acc.push(sortable.content);
      return acc;
    }, []).concat(regularTabbables);
  };
  var tabbable = function tabbable(el, options) {
    options = options || {};
    var candidates;
    if (options.getShadowRoot) {
      candidates = getCandidatesIteratively([el], options.includeContainer, {
        filter: isNodeMatchingSelectorTabbable.bind(null, options),
        flatten: false,
        getShadowRoot: options.getShadowRoot,
        shadowRootFilter: isValidShadowRootTabbable
      });
    } else {
      candidates = getCandidates(el, options.includeContainer, isNodeMatchingSelectorTabbable.bind(null, options));
    }
    return sortByOrder(candidates);
  };
  var focusable = function focusable(el, options) {
    options = options || {};
    var candidates;
    if (options.getShadowRoot) {
      candidates = getCandidatesIteratively([el], options.includeContainer, {
        filter: isNodeMatchingSelectorFocusable.bind(null, options),
        flatten: true,
        getShadowRoot: options.getShadowRoot
      });
    } else {
      candidates = getCandidates(el, options.includeContainer, isNodeMatchingSelectorFocusable.bind(null, options));
    }
    return candidates;
  };
  var isTabbable = function isTabbable(node, options) {
    options = options || {};
    if (!node) {
      throw new Error('No node provided');
    }
    if (matches.call(node, candidateSelector) === false) {
      return false;
    }
    return isNodeMatchingSelectorTabbable(options, node);
  };
  var focusableCandidateSelector = /* #__PURE__ */candidateSelectors.concat('iframe').join(',');
  var isFocusable = function isFocusable(node, options) {
    options = options || {};
    if (!node) {
      throw new Error('No node provided');
    }
    if (matches.call(node, focusableCandidateSelector) === false) {
      return false;
    }
    return isNodeMatchingSelectorFocusable(options, node);
  };

  /*!
  * focus-trap 7.4.3
  * @license MIT, https://github.com/focus-trap/focus-trap/blob/master/LICENSE
  */
  function ownKeys(object, enumerableOnly) {
    var keys = Object.keys(object);
    if (Object.getOwnPropertySymbols) {
      var symbols = Object.getOwnPropertySymbols(object);
      enumerableOnly && (symbols = symbols.filter(function (sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable;
      })), keys.push.apply(keys, symbols);
    }
    return keys;
  }
  function _objectSpread2(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = null != arguments[i] ? arguments[i] : {};
      i % 2 ? ownKeys(Object(source), !0).forEach(function (key) {
        _defineProperty(target, key, source[key]);
      }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
    return target;
  }
  function _defineProperty(obj, key, value) {
    key = _toPropertyKey(key);
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }
    return obj;
  }
  function _toPrimitive(input, hint) {
    if (typeof input !== "object" || input === null) return input;
    var prim = input[Symbol.toPrimitive];
    if (prim !== undefined) {
      var res = prim.call(input, hint || "default");
      if (typeof res !== "object") return res;
      throw new TypeError("@@toPrimitive must return a primitive value.");
    }
    return (hint === "string" ? String : Number)(input);
  }
  function _toPropertyKey(arg) {
    var key = _toPrimitive(arg, "string");
    return typeof key === "symbol" ? key : String(key);
  }
  var activeFocusTraps = {
    activateTrap: function activateTrap(trapStack, trap) {
      if (trapStack.length > 0) {
        var activeTrap = trapStack[trapStack.length - 1];
        if (activeTrap !== trap) {
          activeTrap.pause();
        }
      }
      var trapIndex = trapStack.indexOf(trap);
      if (trapIndex === -1) {
        trapStack.push(trap);
      } else {
        // move this existing trap to the front of the queue
        trapStack.splice(trapIndex, 1);
        trapStack.push(trap);
      }
    },
    deactivateTrap: function deactivateTrap(trapStack, trap) {
      var trapIndex = trapStack.indexOf(trap);
      if (trapIndex !== -1) {
        trapStack.splice(trapIndex, 1);
      }
      if (trapStack.length > 0) {
        trapStack[trapStack.length - 1].unpause();
      }
    }
  };
  var isSelectableInput = function isSelectableInput(node) {
    return node.tagName && node.tagName.toLowerCase() === 'input' && typeof node.select === 'function';
  };
  var isEscapeEvent = function isEscapeEvent(e) {
    return e.key === 'Escape' || e.key === 'Esc' || e.keyCode === 27;
  };
  var isTabEvent = function isTabEvent(e) {
    return e.key === 'Tab' || e.keyCode === 9;
  };

  // checks for TAB by default
  var isKeyForward = function isKeyForward(e) {
    return isTabEvent(e) && !e.shiftKey;
  };

  // checks for SHIFT+TAB by default
  var isKeyBackward = function isKeyBackward(e) {
    return isTabEvent(e) && e.shiftKey;
  };
  var delay = function delay(fn) {
    return setTimeout(fn, 0);
  };

  // Array.find/findIndex() are not supported on IE; this replicates enough
  //  of Array.findIndex() for our needs
  var findIndex = function findIndex(arr, fn) {
    var idx = -1;
    arr.every(function (value, i) {
      if (fn(value)) {
        idx = i;
        return false; // break
      }

      return true; // next
    });

    return idx;
  };

  /**
   * Get an option's value when it could be a plain value, or a handler that provides
   *  the value.
   * @param {*} value Option's value to check.
   * @param {...*} [params] Any parameters to pass to the handler, if `value` is a function.
   * @returns {*} The `value`, or the handler's returned value.
   */
  var valueOrHandler = function valueOrHandler(value) {
    for (var _len = arguments.length, params = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      params[_key - 1] = arguments[_key];
    }
    return typeof value === 'function' ? value.apply(void 0, params) : value;
  };
  var getActualTarget = function getActualTarget(event) {
    // NOTE: If the trap is _inside_ a shadow DOM, event.target will always be the
    //  shadow host. However, event.target.composedPath() will be an array of
    //  nodes "clicked" from inner-most (the actual element inside the shadow) to
    //  outer-most (the host HTML document). If we have access to composedPath(),
    //  then use its first element; otherwise, fall back to event.target (and
    //  this only works for an _open_ shadow DOM; otherwise,
    //  composedPath()[0] === event.target always).
    return event.target.shadowRoot && typeof event.composedPath === 'function' ? event.composedPath()[0] : event.target;
  };

  // NOTE: this must be _outside_ `createFocusTrap()` to make sure all traps in this
  //  current instance use the same stack if `userOptions.trapStack` isn't specified
  var internalTrapStack = [];
  var createFocusTrap = function createFocusTrap(elements, userOptions) {
    // SSR: a live trap shouldn't be created in this type of environment so this
    //  should be safe code to execute if the `document` option isn't specified
    var doc = (userOptions === null || userOptions === void 0 ? void 0 : userOptions.document) || document;
    var trapStack = (userOptions === null || userOptions === void 0 ? void 0 : userOptions.trapStack) || internalTrapStack;
    var config = _objectSpread2({
      returnFocusOnDeactivate: true,
      escapeDeactivates: true,
      delayInitialFocus: true,
      isKeyForward: isKeyForward,
      isKeyBackward: isKeyBackward
    }, userOptions);
    var state = {
      // containers given to createFocusTrap()
      // @type {Array<HTMLElement>}
      containers: [],
      // list of objects identifying tabbable nodes in `containers` in the trap
      // NOTE: it's possible that a group has no tabbable nodes if nodes get removed while the trap
      //  is active, but the trap should never get to a state where there isn't at least one group
      //  with at least one tabbable node in it (that would lead to an error condition that would
      //  result in an error being thrown)
      // @type {Array<{
      //   container: HTMLElement,
      //   tabbableNodes: Array<HTMLElement>, // empty if none
      //   focusableNodes: Array<HTMLElement>, // empty if none
      //   firstTabbableNode: HTMLElement|null,
      //   lastTabbableNode: HTMLElement|null,
      //   nextTabbableNode: (node: HTMLElement, forward: boolean) => HTMLElement|undefined
      // }>}
      containerGroups: [],
      // same order/length as `containers` list

      // references to objects in `containerGroups`, but only those that actually have
      //  tabbable nodes in them
      // NOTE: same order as `containers` and `containerGroups`, but __not necessarily__
      //  the same length
      tabbableGroups: [],
      nodeFocusedBeforeActivation: null,
      mostRecentlyFocusedNode: null,
      active: false,
      paused: false,
      // timer ID for when delayInitialFocus is true and initial focus in this trap
      //  has been delayed during activation
      delayInitialFocusTimer: undefined
    };
    var trap; // eslint-disable-line prefer-const -- some private functions reference it, and its methods reference private functions, so we must declare here and define later

    /**
     * Gets a configuration option value.
     * @param {Object|undefined} configOverrideOptions If true, and option is defined in this set,
     *  value will be taken from this object. Otherwise, value will be taken from base configuration.
     * @param {string} optionName Name of the option whose value is sought.
     * @param {string|undefined} [configOptionName] Name of option to use __instead of__ `optionName`
     *  IIF `configOverrideOptions` is not defined. Otherwise, `optionName` is used.
     */
    var getOption = function getOption(configOverrideOptions, optionName, configOptionName) {
      return configOverrideOptions && configOverrideOptions[optionName] !== undefined ? configOverrideOptions[optionName] : config[configOptionName || optionName];
    };

    /**
     * Finds the index of the container that contains the element.
     * @param {HTMLElement} element
     * @param {Event} [event]
     * @returns {number} Index of the container in either `state.containers` or
     *  `state.containerGroups` (the order/length of these lists are the same); -1
     *  if the element isn't found.
     */
    var findContainerIndex = function findContainerIndex(element, event) {
      var composedPath = typeof (event === null || event === void 0 ? void 0 : event.composedPath) === 'function' ? event.composedPath() : undefined;
      // NOTE: search `containerGroups` because it's possible a group contains no tabbable
      //  nodes, but still contains focusable nodes (e.g. if they all have `tabindex=-1`)
      //  and we still need to find the element in there
      return state.containerGroups.findIndex(function (_ref) {
        var container = _ref.container,
          tabbableNodes = _ref.tabbableNodes;
        return container.contains(element) || (
        // fall back to explicit tabbable search which will take into consideration any
        //  web components if the `tabbableOptions.getShadowRoot` option was used for
        //  the trap, enabling shadow DOM support in tabbable (`Node.contains()` doesn't
        //  look inside web components even if open)
        composedPath === null || composedPath === void 0 ? void 0 : composedPath.includes(container)) || tabbableNodes.find(function (node) {
          return node === element;
        });
      });
    };

    /**
     * Gets the node for the given option, which is expected to be an option that
     *  can be either a DOM node, a string that is a selector to get a node, `false`
     *  (if a node is explicitly NOT given), or a function that returns any of these
     *  values.
     * @param {string} optionName
     * @returns {undefined | false | HTMLElement | SVGElement} Returns
     *  `undefined` if the option is not specified; `false` if the option
     *  resolved to `false` (node explicitly not given); otherwise, the resolved
     *  DOM node.
     * @throws {Error} If the option is set, not `false`, and is not, or does not
     *  resolve to a node.
     */
    var getNodeForOption = function getNodeForOption(optionName) {
      var optionValue = config[optionName];
      if (typeof optionValue === 'function') {
        for (var _len2 = arguments.length, params = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
          params[_key2 - 1] = arguments[_key2];
        }
        optionValue = optionValue.apply(void 0, params);
      }
      if (optionValue === true) {
        optionValue = undefined; // use default value
      }

      if (!optionValue) {
        if (optionValue === undefined || optionValue === false) {
          return optionValue;
        }
        // else, empty string (invalid), null (invalid), 0 (invalid)

        throw new Error("`".concat(optionName, "` was specified but was not a node, or did not return a node"));
      }
      var node = optionValue; // could be HTMLElement, SVGElement, or non-empty string at this point

      if (typeof optionValue === 'string') {
        node = doc.querySelector(optionValue); // resolve to node, or null if fails
        if (!node) {
          throw new Error("`".concat(optionName, "` as selector refers to no known node"));
        }
      }
      return node;
    };
    var getInitialFocusNode = function getInitialFocusNode() {
      var node = getNodeForOption('initialFocus');

      // false explicitly indicates we want no initialFocus at all
      if (node === false) {
        return false;
      }
      if (node === undefined || !isFocusable(node, config.tabbableOptions)) {
        // option not specified nor focusable: use fallback options
        if (findContainerIndex(doc.activeElement) >= 0) {
          node = doc.activeElement;
        } else {
          var firstTabbableGroup = state.tabbableGroups[0];
          var firstTabbableNode = firstTabbableGroup && firstTabbableGroup.firstTabbableNode;

          // NOTE: `fallbackFocus` option function cannot return `false` (not supported)
          node = firstTabbableNode || getNodeForOption('fallbackFocus');
        }
      }
      if (!node) {
        throw new Error('Your focus-trap needs to have at least one focusable element');
      }
      return node;
    };
    var updateTabbableNodes = function updateTabbableNodes() {
      state.containerGroups = state.containers.map(function (container) {
        var tabbableNodes = tabbable(container, config.tabbableOptions);

        // NOTE: if we have tabbable nodes, we must have focusable nodes; focusable nodes
        //  are a superset of tabbable nodes
        var focusableNodes = focusable(container, config.tabbableOptions);
        return {
          container: container,
          tabbableNodes: tabbableNodes,
          focusableNodes: focusableNodes,
          firstTabbableNode: tabbableNodes.length > 0 ? tabbableNodes[0] : null,
          lastTabbableNode: tabbableNodes.length > 0 ? tabbableNodes[tabbableNodes.length - 1] : null,
          /**
           * Finds the __tabbable__ node that follows the given node in the specified direction,
           *  in this container, if any.
           * @param {HTMLElement} node
           * @param {boolean} [forward] True if going in forward tab order; false if going
           *  in reverse.
           * @returns {HTMLElement|undefined} The next tabbable node, if any.
           */
          nextTabbableNode: function nextTabbableNode(node) {
            var forward = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
            // NOTE: If tabindex is positive (in order to manipulate the tab order separate
            //  from the DOM order), this __will not work__ because the list of focusableNodes,
            //  while it contains tabbable nodes, does not sort its nodes in any order other
            //  than DOM order, because it can't: Where would you place focusable (but not
            //  tabbable) nodes in that order? They have no order, because they aren't tabbale...
            // Support for positive tabindex is already broken and hard to manage (possibly
            //  not supportable, TBD), so this isn't going to make things worse than they
            //  already are, and at least makes things better for the majority of cases where
            //  tabindex is either 0/unset or negative.
            // FYI, positive tabindex issue: https://github.com/focus-trap/focus-trap/issues/375
            var nodeIdx = focusableNodes.findIndex(function (n) {
              return n === node;
            });
            if (nodeIdx < 0) {
              return undefined;
            }
            if (forward) {
              return focusableNodes.slice(nodeIdx + 1).find(function (n) {
                return isTabbable(n, config.tabbableOptions);
              });
            }
            return focusableNodes.slice(0, nodeIdx).reverse().find(function (n) {
              return isTabbable(n, config.tabbableOptions);
            });
          }
        };
      });
      state.tabbableGroups = state.containerGroups.filter(function (group) {
        return group.tabbableNodes.length > 0;
      });

      // throw if no groups have tabbable nodes and we don't have a fallback focus node either
      if (state.tabbableGroups.length <= 0 && !getNodeForOption('fallbackFocus') // returning false not supported for this option
      ) {
        throw new Error('Your focus-trap must have at least one container with at least one tabbable node in it at all times');
      }
    };
    var tryFocus = function tryFocus(node) {
      if (node === false) {
        return;
      }
      if (node === doc.activeElement) {
        return;
      }
      if (!node || !node.focus) {
        tryFocus(getInitialFocusNode());
        return;
      }
      node.focus({
        preventScroll: !!config.preventScroll
      });
      state.mostRecentlyFocusedNode = node;
      if (isSelectableInput(node)) {
        node.select();
      }
    };
    var getReturnFocusNode = function getReturnFocusNode(previousActiveElement) {
      var node = getNodeForOption('setReturnFocus', previousActiveElement);
      return node ? node : node === false ? false : previousActiveElement;
    };

    // This needs to be done on mousedown and touchstart instead of click
    // so that it precedes the focus event.
    var checkPointerDown = function checkPointerDown(e) {
      var target = getActualTarget(e);
      if (findContainerIndex(target, e) >= 0) {
        // allow the click since it ocurred inside the trap
        return;
      }
      if (valueOrHandler(config.clickOutsideDeactivates, e)) {
        // immediately deactivate the trap
        trap.deactivate({
          // NOTE: by setting `returnFocus: false`, deactivate() will do nothing,
          //  which will result in the outside click setting focus to the node
          //  that was clicked (and if not focusable, to "nothing"); by setting
          //  `returnFocus: true`, we'll attempt to re-focus the node originally-focused
          //  on activation (or the configured `setReturnFocus` node), whether the
          //  outside click was on a focusable node or not
          returnFocus: config.returnFocusOnDeactivate
        });
        return;
      }

      // This is needed for mobile devices.
      // (If we'll only let `click` events through,
      // then on mobile they will be blocked anyways if `touchstart` is blocked.)
      if (valueOrHandler(config.allowOutsideClick, e)) {
        // allow the click outside the trap to take place
        return;
      }

      // otherwise, prevent the click
      e.preventDefault();
    };

    // In case focus escapes the trap for some strange reason, pull it back in.
    var checkFocusIn = function checkFocusIn(e) {
      var target = getActualTarget(e);
      var targetContained = findContainerIndex(target, e) >= 0;

      // In Firefox when you Tab out of an iframe the Document is briefly focused.
      if (targetContained || target instanceof Document) {
        if (targetContained) {
          state.mostRecentlyFocusedNode = target;
        }
      } else {
        // escaped! pull it back in to where it just left
        e.stopImmediatePropagation();
        tryFocus(state.mostRecentlyFocusedNode || getInitialFocusNode());
      }
    };

    // Hijack key nav events on the first and last focusable nodes of the trap,
    // in order to prevent focus from escaping. If it escapes for even a
    // moment it can end up scrolling the page and causing confusion so we
    // kind of need to capture the action at the keydown phase.
    var checkKeyNav = function checkKeyNav(event) {
      var isBackward = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      var target = getActualTarget(event);
      updateTabbableNodes();
      var destinationNode = null;
      if (state.tabbableGroups.length > 0) {
        // make sure the target is actually contained in a group
        // NOTE: the target may also be the container itself if it's focusable
        //  with tabIndex='-1' and was given initial focus
        var containerIndex = findContainerIndex(target, event);
        var containerGroup = containerIndex >= 0 ? state.containerGroups[containerIndex] : undefined;
        if (containerIndex < 0) {
          // target not found in any group: quite possible focus has escaped the trap,
          //  so bring it back into...
          if (isBackward) {
            // ...the last node in the last group
            destinationNode = state.tabbableGroups[state.tabbableGroups.length - 1].lastTabbableNode;
          } else {
            // ...the first node in the first group
            destinationNode = state.tabbableGroups[0].firstTabbableNode;
          }
        } else if (isBackward) {
          // REVERSE

          // is the target the first tabbable node in a group?
          var startOfGroupIndex = findIndex(state.tabbableGroups, function (_ref2) {
            var firstTabbableNode = _ref2.firstTabbableNode;
            return target === firstTabbableNode;
          });
          if (startOfGroupIndex < 0 && (containerGroup.container === target || isFocusable(target, config.tabbableOptions) && !isTabbable(target, config.tabbableOptions) && !containerGroup.nextTabbableNode(target, false))) {
            // an exception case where the target is either the container itself, or
            //  a non-tabbable node that was given focus (i.e. tabindex is negative
            //  and user clicked on it or node was programmatically given focus)
            //  and is not followed by any other tabbable node, in which
            //  case, we should handle shift+tab as if focus were on the container's
            //  first tabbable node, and go to the last tabbable node of the LAST group
            startOfGroupIndex = containerIndex;
          }
          if (startOfGroupIndex >= 0) {
            // YES: then shift+tab should go to the last tabbable node in the
            //  previous group (and wrap around to the last tabbable node of
            //  the LAST group if it's the first tabbable node of the FIRST group)
            var destinationGroupIndex = startOfGroupIndex === 0 ? state.tabbableGroups.length - 1 : startOfGroupIndex - 1;
            var destinationGroup = state.tabbableGroups[destinationGroupIndex];
            destinationNode = destinationGroup.lastTabbableNode;
          } else if (!isTabEvent(event)) {
            // user must have customized the nav keys so we have to move focus manually _within_
            //  the active group: do this based on the order determined by tabbable()
            destinationNode = containerGroup.nextTabbableNode(target, false);
          }
        } else {
          // FORWARD

          // is the target the last tabbable node in a group?
          var lastOfGroupIndex = findIndex(state.tabbableGroups, function (_ref3) {
            var lastTabbableNode = _ref3.lastTabbableNode;
            return target === lastTabbableNode;
          });
          if (lastOfGroupIndex < 0 && (containerGroup.container === target || isFocusable(target, config.tabbableOptions) && !isTabbable(target, config.tabbableOptions) && !containerGroup.nextTabbableNode(target))) {
            // an exception case where the target is the container itself, or
            //  a non-tabbable node that was given focus (i.e. tabindex is negative
            //  and user clicked on it or node was programmatically given focus)
            //  and is not followed by any other tabbable node, in which
            //  case, we should handle tab as if focus were on the container's
            //  last tabbable node, and go to the first tabbable node of the FIRST group
            lastOfGroupIndex = containerIndex;
          }
          if (lastOfGroupIndex >= 0) {
            // YES: then tab should go to the first tabbable node in the next
            //  group (and wrap around to the first tabbable node of the FIRST
            //  group if it's the last tabbable node of the LAST group)
            var _destinationGroupIndex = lastOfGroupIndex === state.tabbableGroups.length - 1 ? 0 : lastOfGroupIndex + 1;
            var _destinationGroup = state.tabbableGroups[_destinationGroupIndex];
            destinationNode = _destinationGroup.firstTabbableNode;
          } else if (!isTabEvent(event)) {
            // user must have customized the nav keys so we have to move focus manually _within_
            //  the active group: do this based on the order determined by tabbable()
            destinationNode = containerGroup.nextTabbableNode(target);
          }
        }
      } else {
        // no groups available
        // NOTE: the fallbackFocus option does not support returning false to opt-out
        destinationNode = getNodeForOption('fallbackFocus');
      }
      if (destinationNode) {
        if (isTabEvent(event)) {
          // since tab natively moves focus, we wouldn't have a destination node unless we
          //  were on the edge of a container and had to move to the next/previous edge, in
          //  which case we want to prevent default to keep the browser from moving focus
          //  to where it normally would
          event.preventDefault();
        }
        tryFocus(destinationNode);
      }
      // else, let the browser take care of [shift+]tab and move the focus
    };

    var checkKey = function checkKey(event) {
      if (isEscapeEvent(event) && valueOrHandler(config.escapeDeactivates, event) !== false) {
        event.preventDefault();
        trap.deactivate();
        return;
      }
      if (config.isKeyForward(event) || config.isKeyBackward(event)) {
        checkKeyNav(event, config.isKeyBackward(event));
      }
    };
    var checkClick = function checkClick(e) {
      var target = getActualTarget(e);
      if (findContainerIndex(target, e) >= 0) {
        return;
      }
      if (valueOrHandler(config.clickOutsideDeactivates, e)) {
        return;
      }
      if (valueOrHandler(config.allowOutsideClick, e)) {
        return;
      }
      e.preventDefault();
      e.stopImmediatePropagation();
    };

    //
    // EVENT LISTENERS
    //

    var addListeners = function addListeners() {
      if (!state.active) {
        return;
      }

      // There can be only one listening focus trap at a time
      activeFocusTraps.activateTrap(trapStack, trap);

      // Delay ensures that the focused element doesn't capture the event
      // that caused the focus trap activation.
      state.delayInitialFocusTimer = config.delayInitialFocus ? delay(function () {
        tryFocus(getInitialFocusNode());
      }) : tryFocus(getInitialFocusNode());
      doc.addEventListener('focusin', checkFocusIn, true);
      doc.addEventListener('mousedown', checkPointerDown, {
        capture: true,
        passive: false
      });
      doc.addEventListener('touchstart', checkPointerDown, {
        capture: true,
        passive: false
      });
      doc.addEventListener('click', checkClick, {
        capture: true,
        passive: false
      });
      doc.addEventListener('keydown', checkKey, {
        capture: true,
        passive: false
      });
      return trap;
    };
    var removeListeners = function removeListeners() {
      if (!state.active) {
        return;
      }
      doc.removeEventListener('focusin', checkFocusIn, true);
      doc.removeEventListener('mousedown', checkPointerDown, true);
      doc.removeEventListener('touchstart', checkPointerDown, true);
      doc.removeEventListener('click', checkClick, true);
      doc.removeEventListener('keydown', checkKey, true);
      return trap;
    };

    //
    // MUTATION OBSERVER
    //

    var checkDomRemoval = function checkDomRemoval(mutations) {
      var isFocusedNodeRemoved = mutations.some(function (mutation) {
        var removedNodes = Array.from(mutation.removedNodes);
        return removedNodes.some(function (node) {
          return node === state.mostRecentlyFocusedNode;
        });
      });

      // If the currently focused is removed then browsers will move focus to the
      // <body> element. If this happens, try to move focus back into the trap.
      if (isFocusedNodeRemoved) {
        tryFocus(getInitialFocusNode());
      }
    };

    // Use MutationObserver - if supported - to detect if focused node is removed
    // from the DOM.
    var mutationObserver = typeof window !== 'undefined' && 'MutationObserver' in window ? new MutationObserver(checkDomRemoval) : undefined;
    var updateObservedNodes = function updateObservedNodes() {
      if (!mutationObserver) {
        return;
      }
      mutationObserver.disconnect();
      if (state.active && !state.paused) {
        state.containers.map(function (container) {
          mutationObserver.observe(container, {
            subtree: true,
            childList: true
          });
        });
      }
    };

    //
    // TRAP DEFINITION
    //

    trap = {
      get active() {
        return state.active;
      },
      get paused() {
        return state.paused;
      },
      activate: function activate(activateOptions) {
        if (state.active) {
          return this;
        }
        var onActivate = getOption(activateOptions, 'onActivate');
        var onPostActivate = getOption(activateOptions, 'onPostActivate');
        var checkCanFocusTrap = getOption(activateOptions, 'checkCanFocusTrap');
        if (!checkCanFocusTrap) {
          updateTabbableNodes();
        }
        state.active = true;
        state.paused = false;
        state.nodeFocusedBeforeActivation = doc.activeElement;
        onActivate === null || onActivate === void 0 ? void 0 : onActivate();
        var finishActivation = function finishActivation() {
          if (checkCanFocusTrap) {
            updateTabbableNodes();
          }
          addListeners();
          updateObservedNodes();
          onPostActivate === null || onPostActivate === void 0 ? void 0 : onPostActivate();
        };
        if (checkCanFocusTrap) {
          checkCanFocusTrap(state.containers.concat()).then(finishActivation, finishActivation);
          return this;
        }
        finishActivation();
        return this;
      },
      deactivate: function deactivate(deactivateOptions) {
        if (!state.active) {
          return this;
        }
        var options = _objectSpread2({
          onDeactivate: config.onDeactivate,
          onPostDeactivate: config.onPostDeactivate,
          checkCanReturnFocus: config.checkCanReturnFocus
        }, deactivateOptions);
        clearTimeout(state.delayInitialFocusTimer); // noop if undefined
        state.delayInitialFocusTimer = undefined;
        removeListeners();
        state.active = false;
        state.paused = false;
        updateObservedNodes();
        activeFocusTraps.deactivateTrap(trapStack, trap);
        var onDeactivate = getOption(options, 'onDeactivate');
        var onPostDeactivate = getOption(options, 'onPostDeactivate');
        var checkCanReturnFocus = getOption(options, 'checkCanReturnFocus');
        var returnFocus = getOption(options, 'returnFocus', 'returnFocusOnDeactivate');
        onDeactivate === null || onDeactivate === void 0 ? void 0 : onDeactivate();
        var finishDeactivation = function finishDeactivation() {
          delay(function () {
            if (returnFocus) {
              tryFocus(getReturnFocusNode(state.nodeFocusedBeforeActivation));
            }
            onPostDeactivate === null || onPostDeactivate === void 0 ? void 0 : onPostDeactivate();
          });
        };
        if (returnFocus && checkCanReturnFocus) {
          checkCanReturnFocus(getReturnFocusNode(state.nodeFocusedBeforeActivation)).then(finishDeactivation, finishDeactivation);
          return this;
        }
        finishDeactivation();
        return this;
      },
      pause: function pause(pauseOptions) {
        if (state.paused || !state.active) {
          return this;
        }
        var onPause = getOption(pauseOptions, 'onPause');
        var onPostPause = getOption(pauseOptions, 'onPostPause');
        state.paused = true;
        onPause === null || onPause === void 0 ? void 0 : onPause();
        removeListeners();
        updateObservedNodes();
        onPostPause === null || onPostPause === void 0 ? void 0 : onPostPause();
        return this;
      },
      unpause: function unpause(unpauseOptions) {
        if (!state.paused || !state.active) {
          return this;
        }
        var onUnpause = getOption(unpauseOptions, 'onUnpause');
        var onPostUnpause = getOption(unpauseOptions, 'onPostUnpause');
        state.paused = false;
        onUnpause === null || onUnpause === void 0 ? void 0 : onUnpause();
        updateTabbableNodes();
        addListeners();
        updateObservedNodes();
        onPostUnpause === null || onPostUnpause === void 0 ? void 0 : onPostUnpause();
        return this;
      },
      updateContainerElements: function updateContainerElements(containerElements) {
        var elementsAsArray = [].concat(containerElements).filter(Boolean);
        state.containers = elementsAsArray.map(function (element) {
          return typeof element === 'string' ? doc.querySelector(element) : element;
        });
        if (state.active) {
          updateTabbableNodes();
        }
        updateObservedNodes();
        return this;
      }
    };

    // initialize container elements
    trap.updateContainerElements(elements);
    return trap;
  };

  /**
   * @param {HTMLElement} element DOM element for component instantiation and scope
   * @param {Object} options
   * @param {String} options.galleryItemSelector Selector for gallery element
   * @param {String} options.descriptionSelector Selector for gallery description element
   * @param {String} options.metaSelector Selector for gallery meta info element
   * @param {String} options.closeButtonSelector Selector for close button element
   * @param {String} options.allButtonSelector Selector for view all button element
   * @param {String} options.overlaySelector Selector for gallery overlay element
   * @param {String} options.overlayHeaderSelector Selector for gallery overlay header element
   * @param {String} options.overlayFooterSelector Selector for gallery overlay footer element
   * @param {String} options.overlayMediaSelector Selector for gallery overlay media element
   * @param {String} options.overlayCounterCurrentSelector Selector for gallery overlay current number element
   * @param {String} options.overlayCounterMaxSelector Selector for display of number of elements in the gallery overlay
   * @param {String} options.overlayDownloadSelector Selector for gallery overlay download element
   * @param {String} options.overlayShareSelector Selector for gallery overlay share element
   * @param {String} options.overlayDescriptionSelector Selector for gallery overlay description element
   * @param {String} options.overlayMetaSelector Selector for gallery overlay meta info element
   * @param {String} options.overlayPreviousSelector Selector for gallery overlay previous link element
   * @param {String} options.overlayNextSelector Selector for gallery overlay next link element
   * @param {Boolean} options.attachClickListener Whether or not to bind click events
   * @param {Boolean} options.attachKeyListener Whether or not to bind keyup events
   */
  var Gallery = /*#__PURE__*/function () {
    /**
     * @static
     * Shorthand for instance creation and initialisation.
     *
     * @param {HTMLElement} root DOM element for component instantiation and scope
     *
     * @return {Gallery} An instance of Gallery.
     */
    Gallery.autoInit = function autoInit(root, _temp) {
      var _ref = _temp === void 0 ? {} : _temp,
        _ref$GALLERY = _ref.GALLERY,
        defaultOptions = _ref$GALLERY === void 0 ? {} : _ref$GALLERY;
      var gallery = new Gallery(root, defaultOptions);
      gallery.init();
      root.ECLGallery = gallery;
      return gallery;
    };
    function Gallery(element, _temp2) {
      var _ref2 = _temp2 === void 0 ? {} : _temp2,
        _ref2$expandableSelec = _ref2.expandableSelector,
        expandableSelector = _ref2$expandableSelec === void 0 ? 'data-ecl-gallery-not-expandable' : _ref2$expandableSelec,
        _ref2$galleryItemSele = _ref2.galleryItemSelector,
        galleryItemSelector = _ref2$galleryItemSele === void 0 ? '[data-ecl-gallery-item]' : _ref2$galleryItemSele,
        _ref2$descriptionSele = _ref2.descriptionSelector,
        descriptionSelector = _ref2$descriptionSele === void 0 ? '[data-ecl-gallery-description]' : _ref2$descriptionSele,
        _ref2$noOverlaySelect = _ref2.noOverlaySelector,
        noOverlaySelector = _ref2$noOverlaySelect === void 0 ? 'data-ecl-gallery-no-overlay' : _ref2$noOverlaySelect,
        _ref2$metaSelector = _ref2.metaSelector,
        metaSelector = _ref2$metaSelector === void 0 ? '[data-ecl-gallery-meta]' : _ref2$metaSelector,
        _ref2$itemsLimitSelec = _ref2.itemsLimitSelector,
        itemsLimitSelector = _ref2$itemsLimitSelec === void 0 ? 'data-ecl-gallery-visible-items' : _ref2$itemsLimitSelec,
        _ref2$closeButtonSele = _ref2.closeButtonSelector,
        closeButtonSelector = _ref2$closeButtonSele === void 0 ? '[data-ecl-gallery-close]' : _ref2$closeButtonSele,
        _ref2$viewAllSelector = _ref2.viewAllSelector,
        viewAllSelector = _ref2$viewAllSelector === void 0 ? '[data-ecl-gallery-all]' : _ref2$viewAllSelector,
        _ref2$viewAllLabelSel = _ref2.viewAllLabelSelector,
        viewAllLabelSelector = _ref2$viewAllLabelSel === void 0 ? 'data-ecl-gallery-collapsed-label' : _ref2$viewAllLabelSel,
        _ref2$viewAllExpanded = _ref2.viewAllExpandedLabelSelector,
        viewAllExpandedLabelSelector = _ref2$viewAllExpanded === void 0 ? 'data-ecl-gallery-expanded-label' : _ref2$viewAllExpanded,
        _ref2$countSelector = _ref2.countSelector,
        countSelector = _ref2$countSelector === void 0 ? '[data-ecl-gallery-count]' : _ref2$countSelector,
        _ref2$overlaySelector = _ref2.overlaySelector,
        overlaySelector = _ref2$overlaySelector === void 0 ? '[data-ecl-gallery-overlay]' : _ref2$overlaySelector,
        _ref2$overlayHeaderSe = _ref2.overlayHeaderSelector,
        overlayHeaderSelector = _ref2$overlayHeaderSe === void 0 ? '[data-ecl-gallery-overlay-header]' : _ref2$overlayHeaderSe,
        _ref2$overlayFooterSe = _ref2.overlayFooterSelector,
        overlayFooterSelector = _ref2$overlayFooterSe === void 0 ? '[data-ecl-gallery-overlay-footer]' : _ref2$overlayFooterSe,
        _ref2$overlayMediaSel = _ref2.overlayMediaSelector,
        overlayMediaSelector = _ref2$overlayMediaSel === void 0 ? '[data-ecl-gallery-overlay-media]' : _ref2$overlayMediaSel,
        _ref2$overlayCounterC = _ref2.overlayCounterCurrentSelector,
        overlayCounterCurrentSelector = _ref2$overlayCounterC === void 0 ? '[data-ecl-gallery-overlay-counter-current]' : _ref2$overlayCounterC,
        _ref2$overlayCounterM = _ref2.overlayCounterMaxSelector,
        overlayCounterMaxSelector = _ref2$overlayCounterM === void 0 ? '[data-ecl-gallery-overlay-counter-max]' : _ref2$overlayCounterM,
        _ref2$overlayDownload = _ref2.overlayDownloadSelector,
        overlayDownloadSelector = _ref2$overlayDownload === void 0 ? '[data-ecl-gallery-overlay-download]' : _ref2$overlayDownload,
        _ref2$overlayShareSel = _ref2.overlayShareSelector,
        overlayShareSelector = _ref2$overlayShareSel === void 0 ? '[data-ecl-gallery-overlay-share]' : _ref2$overlayShareSel,
        _ref2$overlayDescript = _ref2.overlayDescriptionSelector,
        overlayDescriptionSelector = _ref2$overlayDescript === void 0 ? '[data-ecl-gallery-overlay-description]' : _ref2$overlayDescript,
        _ref2$overlayMetaSele = _ref2.overlayMetaSelector,
        overlayMetaSelector = _ref2$overlayMetaSele === void 0 ? '[data-ecl-gallery-overlay-meta]' : _ref2$overlayMetaSele,
        _ref2$overlayPrevious = _ref2.overlayPreviousSelector,
        overlayPreviousSelector = _ref2$overlayPrevious === void 0 ? '[data-ecl-gallery-overlay-previous]' : _ref2$overlayPrevious,
        _ref2$overlayNextSele = _ref2.overlayNextSelector,
        overlayNextSelector = _ref2$overlayNextSele === void 0 ? '[data-ecl-gallery-overlay-next]' : _ref2$overlayNextSele,
        _ref2$attachClickList = _ref2.attachClickListener,
        attachClickListener = _ref2$attachClickList === void 0 ? true : _ref2$attachClickList,
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
      this.galleryItemSelector = galleryItemSelector;
      this.descriptionSelector = descriptionSelector;
      this.metaSelector = metaSelector;
      this.closeButtonSelector = closeButtonSelector;
      this.viewAllSelector = viewAllSelector;
      this.countSelector = countSelector;
      this.itemsLimitSelector = itemsLimitSelector;
      this.overlaySelector = overlaySelector;
      this.noOverlaySelector = noOverlaySelector;
      this.overlayHeaderSelector = overlayHeaderSelector;
      this.overlayFooterSelector = overlayFooterSelector;
      this.overlayMediaSelector = overlayMediaSelector;
      this.overlayCounterCurrentSelector = overlayCounterCurrentSelector;
      this.overlayCounterMaxSelector = overlayCounterMaxSelector;
      this.overlayDownloadSelector = overlayDownloadSelector;
      this.overlayShareSelector = overlayShareSelector;
      this.overlayDescriptionSelector = overlayDescriptionSelector;
      this.overlayMetaSelector = overlayMetaSelector;
      this.overlayPreviousSelector = overlayPreviousSelector;
      this.overlayNextSelector = overlayNextSelector;
      this.attachClickListener = attachClickListener;
      this.attachKeyListener = attachKeyListener;
      this.attachResizeListener = attachResizeListener;
      this.viewAllLabelSelector = viewAllLabelSelector;
      this.viewAllExpandedLabelSelector = viewAllExpandedLabelSelector;
      this.expandableSelector = expandableSelector;

      // Private variables
      this.galleryItems = null;
      this.meta = null;
      this.closeButton = null;
      this.viewAll = null;
      this.count = null;
      this.overlay = null;
      this.overlayHeader = null;
      this.overlayFooter = null;
      this.overlayMedia = null;
      this.overlayCounterCurrent = null;
      this.overlayCounterMax = null;
      this.overlayDownload = null;
      this.overlayShare = null;
      this.overlayDescription = null;
      this.overlayMeta = null;
      this.overlayPrevious = null;
      this.overlayNext = null;
      this.selectedItem = null;
      this.focusTrap = null;
      this.isDesktop = false;
      this.resizeTimer = null;
      this.visibleItems = 0;
      this.breakpointMd = 768;
      this.breakpointLg = 996;
      this.imageHeight = 185;
      this.imageHeightBig = 260;

      // Bind `this` for use in callbacks
      this.handleClickOnCloseButton = this.handleClickOnCloseButton.bind(this);
      this.handleClickOnViewAll = this.handleClickOnViewAll.bind(this);
      this.handleClickOnItem = this.handleClickOnItem.bind(this);
      this.preventClickOnItem = this.preventClickOnItem.bind(this);
      this.handleKeyPressOnItem = this.handleKeyPressOnItem.bind(this);
      this.handleClickOnPreviousButton = this.handleClickOnPreviousButton.bind(this);
      this.handleClickOnNextButton = this.handleClickOnNextButton.bind(this);
      this.handleKeyboard = this.handleKeyboard.bind(this);
      this.handleResize = this.handleResize.bind(this);
    }

    /**
     * Initialise component.
     */
    var _proto = Gallery.prototype;
    _proto.init = function init() {
      var _this = this;
      // Query elements
      this.expandable = !this.element.hasAttribute(this.expandableSelector);
      this.visibleItems = this.element.getAttribute(this.itemsLimitSelector);
      this.galleryItems = queryAll(this.galleryItemSelector, this.element);
      this.closeButton = queryOne(this.closeButtonSelector, this.element);
      this.noOverlay = this.element.hasAttribute(this.noOverlaySelector);
      if (this.expandable) {
        this.viewAll = queryOne(this.viewAllSelector, this.element);
        this.viewAllLabel = this.viewAll.getAttribute(this.viewAllLabelSelector) || this.viewAll.innerText;
        this.viewAllLabelExpanded = this.viewAll.getAttribute(this.viewAllExpandedLabelSelector) || this.viewAllLabel;
      }
      this.count = queryOne(this.countSelector, this.element);
      // Bind click event on view all (open first item)
      if (this.attachClickListener && this.viewAll) {
        this.viewAll.addEventListener('click', this.handleClickOnViewAll);
      }
      if (!this.noOverlay) {
        this.overlay = queryOne(this.overlaySelector, this.element);
        this.overlayHeader = queryOne(this.overlayHeaderSelector, this.overlay);
        this.overlayFooter = queryOne(this.overlayFooterSelector, this.overlay);
        this.overlayMedia = queryOne(this.overlayMediaSelector, this.overlay);
        this.overlayCounterCurrent = queryOne(this.overlayCounterCurrentSelector, this.overlay);
        this.overlayCounterMax = queryOne(this.overlayCounterMaxSelector, this.overlay);
        this.overlayDownload = queryOne(this.overlayDownloadSelector, this.overlay);
        this.overlayShare = queryOne(this.overlayShareSelector, this.overlay);
        this.overlayDescription = queryOne(this.overlayDescriptionSelector, this.overlay);
        this.overlayMeta = queryOne(this.overlayMetaSelector, this.overlay);
        this.overlayPrevious = queryOne(this.overlayPreviousSelector, this.overlay);
        this.overlayNext = queryOne(this.overlayNextSelector, this.overlay);

        // Create focus trap
        this.focusTrap = createFocusTrap(this.overlay, {
          escapeDeactivates: false,
          returnFocusOnDeactivate: false
        });

        // Polyfill to support <dialog>
        this.isDialogSupported = true;
        if (!window.HTMLDialogElement) {
          this.isDialogSupported = false;
        }

        // Bind click event on close button
        if (this.attachClickListener && this.closeButton) {
          this.closeButton.addEventListener('click', this.handleClickOnCloseButton);
        }

        // Bind click event on gallery items
        if (this.attachClickListener && this.galleryItems) {
          this.galleryItems.forEach(function (galleryItem) {
            if (_this.attachClickListener) {
              galleryItem.addEventListener('click', _this.handleClickOnItem);
            }
            if (_this.attachKeyListener) {
              galleryItem.addEventListener('keyup', _this.handleKeyPressOnItem);
            }
          });
        }

        // Bind click event on previous button
        if (this.attachClickListener && this.overlayPrevious) {
          this.overlayPrevious.addEventListener('click', this.handleClickOnPreviousButton);
        }

        // Bind click event on next button
        if (this.attachClickListener && this.overlayNext) {
          this.overlayNext.addEventListener('click', this.handleClickOnNextButton);
        }

        // Bind other close event
        if (!this.isDialogSupported && this.attachKeyListener && this.overlay) {
          this.overlay.addEventListener('keyup', this.handleKeyboard);
        }
        if (this.isDialogSupported && this.overlay) {
          this.overlay.addEventListener('close', this.handleClickOnCloseButton);
        }
      } else {
        this.galleryItems.forEach(function (galleryItem) {
          galleryItem.classList.add('ecl-gallery__item__link--frozen');
          galleryItem.addEventListener('click', _this.preventClickOnItem);
        });
      }

      // Bind resize events
      if (this.attachResizeListener) {
        window.addEventListener('resize', this.handleResize);
      }

      // Init display of gallery items
      if (this.expandable) {
        this.checkScreen();
        this.hideItems();
      }

      // Add number to gallery items
      this.galleryItems.forEach(function (galleryItem, key) {
        galleryItem.setAttribute('data-ecl-gallery-item-id', key);
      });

      // Update counter
      if (this.count) {
        this.count.innerHTML = this.galleryItems.length;
      }

      // Set ecl initialized attribute
      this.element.setAttribute('data-ecl-auto-initialized', 'true');
    }

    /**
     * Destroy component.
     */;
    _proto.destroy = function destroy() {
      var _this2 = this;
      if (this.attachClickListener && this.closeButton) {
        this.closeButton.removeEventListener('click', this.handleClickOnCloseButton);
      }
      if (this.attachClickListener && this.viewAll) {
        this.viewAll.removeEventListener('click', this.handleClickOnViewAll);
      }
      if (this.attachClickListener && this.galleryItems) {
        this.galleryItems.forEach(function (galleryItem) {
          galleryItem.removeEventListener('click', _this2.handleClickOnItem);
        });
      }
      if (this.attachClickListener && this.overlayPrevious) {
        this.overlayPrevious.removeEventListener('click', this.handleClickOnPreviousButton);
      }
      if (this.attachClickListener && this.overlayNext) {
        this.overlayNext.removeEventListener('click', this.handleClickOnNextButton);
      }
      if (!this.isDialogSupported && this.attachKeyListener && this.overlay) {
        this.overlay.removeEventListener('keyup', this.handleKeyboard);
      }
      if (this.isDialogSupported && this.overlay) {
        this.overlay.removeEventListener('close', this.handleClickOnCloseButton);
      }
      if (this.attachResizeListener) {
        window.removeEventListener('resize', this.handleResize);
      }
      if (this.element) {
        this.element.removeAttribute('data-ecl-auto-initialized');
      }
    }

    /**
     * Check if current display is desktop or mobile
     */;
    _proto.checkScreen = function checkScreen() {
      if (window.innerWidth > this.breakpointMd) {
        this.isDesktop = true;
      } else {
        this.isDesktop = false;
      }
      if (window.innerWidth > this.breakpointLg) {
        this.isLarge = true;
      }
    }

    /**
     * @param {Int} rows/item number
     *
     * Hide several gallery items by default
     * - 2 "lines" of items on desktop
     * - only 3 items on mobile or the desired rows or items
     *   when using the view more button.
     */;
    _proto.hideItems = function hideItems(plus) {
      var _this3 = this;
      if (plus === void 0) {
        plus = 0;
      }
      if (!this.viewAll || this.viewAll.expanded) return;
      if (this.isDesktop) {
        var hiddenItemIds = [];
        // We should browse the list first to mark the items to be hidden, and hide them later
        // otherwise, it will interfer with the calculus
        this.galleryItems.forEach(function (galleryItem, key) {
          galleryItem.parentNode.classList.remove('ecl-gallery__item--hidden');
          if (key >= Number(_this3.visibleItems) + Number(plus)) {
            hiddenItemIds = [].concat(hiddenItemIds, [key]);
          }
        });
        hiddenItemIds.forEach(function (id) {
          _this3.galleryItems[id].parentNode.classList.add('ecl-gallery__item--hidden');
        });
        return;
      }
      this.galleryItems.forEach(function (galleryItem, key) {
        if (key > 2 + Number(plus)) {
          galleryItem.parentNode.classList.add('ecl-gallery__item--hidden');
        } else {
          galleryItem.parentNode.classList.remove('ecl-gallery__item--hidden');
        }
      });
    }

    /**
     * Trigger events on resize
     * Uses a debounce, for performance
     */;
    _proto.handleResize = function handleResize() {
      var _this4 = this;
      clearTimeout(this.resizeTimer);
      this.resizeTimer = setTimeout(function () {
        _this4.checkScreen();
        _this4.hideItems();
      }, 200);
    }

    /**
     * @param {HTMLElement} selectedItem Media element
     */;
    _proto.updateOverlay = function updateOverlay(selectedItem) {
      this.selectedItem = selectedItem;
      var embeddedVideo = selectedItem.getAttribute('data-ecl-gallery-item-embed-src');
      var video = queryOne('video', selectedItem);
      var mediaElement = null;

      // Update media
      if (embeddedVideo != null) {
        // Media is a embedded video
        mediaElement = document.createElement('div');
        mediaElement.classList.add('ecl-gallery__slider-embed');
        var mediaIframe = document.createElement('iframe');
        mediaIframe.setAttribute('src', embeddedVideo);
        mediaIframe.setAttribute('frameBorder', '0');
        if (this.overlayMedia) {
          mediaElement.appendChild(mediaIframe);
          this.overlayMedia.innerHTML = '';
          this.overlayMedia.appendChild(mediaElement);
        }
      } else if (video != null) {
        // Media is a video
        mediaElement = document.createElement('video');
        mediaElement.setAttribute('poster', video.poster);
        mediaElement.setAttribute('controls', 'controls');
        mediaElement.classList.add('ecl-gallery__slider-video');
        if (this.overlayMedia) {
          this.overlayMedia.innerHTML = '';
          this.overlayMedia.appendChild(mediaElement);
        }

        // Get sources
        var sources = queryAll('source', video);
        sources.forEach(function (source) {
          var sourceTag = document.createElement('source');
          sourceTag.setAttribute('src', source.getAttribute('src'));
          sourceTag.setAttribute('type', source.getAttribute('type'));
          mediaElement.appendChild(sourceTag);
        });

        // Get tracks
        var tracks = queryAll('track', video);
        tracks.forEach(function (track) {
          var trackTag = document.createElement('track');
          trackTag.setAttribute('src', track.getAttribute('src'));
          trackTag.setAttribute('kind', track.getAttribute('kind'));
          trackTag.setAttribute('srclang', track.getAttribute('srcLang'));
          trackTag.setAttribute('label', track.getAttribute('label'));
          mediaElement.appendChild(trackTag);
        });
        mediaElement.load();
      } else {
        // Media is an image
        var image = queryOne('img', selectedItem);
        image.classList.remove('ecl-gallery__image');
        var picture = queryOne('picture', selectedItem);
        mediaElement = picture.cloneNode(true);
        mediaElement.classList.add('ecl-gallery__slider-image');
        if (this.overlayMedia) {
          this.overlayMedia.innerHTML = '';
          this.overlayMedia.appendChild(mediaElement);
        }
      }

      // Update counter
      this.overlayCounterCurrent.innerHTML = +selectedItem.getAttribute('data-ecl-gallery-item-id') + 1;
      this.overlayCounterMax.innerHTML = this.galleryItems.length;

      // Update share link
      var shareHref = this.selectedItem.getAttribute('data-ecl-gallery-item-share');
      if (shareHref != null) {
        this.overlayShare.href = shareHref;
        this.overlayShare.hidden = false;
      } else {
        this.overlayShare.hidden = true;
      }

      // Update download link
      if (embeddedVideo != null) {
        this.overlayDownload.hidden = true;
      } else {
        this.overlayDownload.href = this.selectedItem.href;
        this.overlayDownload.hidden = false;
      }

      // Update meta
      var meta = queryOne(this.metaSelector, selectedItem);
      this.overlayMeta.innerHTML = meta.innerHTML;

      // Update description
      var description = queryOne(this.descriptionSelector, selectedItem);
      this.overlayDescription.innerHTML = description.innerHTML;

      // Limit image height (fix for FF and IE)
      var maxHeight = this.overlay.clientHeight - this.overlayHeader.clientHeight - this.overlayFooter.clientHeight;
      if (this.overlayMedia) {
        Object.assign(mediaElement.style, {
          maxHeight: maxHeight + "px"
        });
      }
    }

    /**
     * Handles keyboard events such as Escape and navigation.
     *
     * @param {Event} e
     */;
    _proto.handleKeyboard = function handleKeyboard(e) {
      // Detect press on Escape
      // Only used if the browser do not support <dialog>
      if (e.key === 'Escape' || e.key === 'Esc') {
        this.handleClickOnCloseButton();
      }
    }

    /**
     * Invoke listeners for close events.
     */;
    _proto.handleClickOnCloseButton = function handleClickOnCloseButton() {
      if (this.isDialogSupported) {
        this.overlay.close();
      } else {
        this.overlay.removeAttribute('open');
      }

      // Remove iframe
      var embeddedVideo = queryOne('iframe', this.overlayMedia);
      if (embeddedVideo) embeddedVideo.remove();

      // Stop video
      var video = queryOne('video', this.overlayMedia);
      if (video) video.pause();

      // Untrap focus
      this.focusTrap.deactivate();

      // Focus item
      this.selectedItem.focus();

      // Enable scroll on body
      document.body.classList.remove('ecl-u-disablescroll');
    }

    /**
     * Invoke listeners for on pressing the spacebar button.
     *
     * @param {Event} e
     */;
    _proto.handleKeyPressOnItem = function handleKeyPressOnItem(e) {
      if (e.keyCode === 32) {
        // If spacebar trigger the modal
        this.handleClickOnItem(e);
      }
    }

    /**
     * Invoke listeners for on click events on view all.
     *
     * @param {Event} e
     */;
    _proto.handleClickOnViewAll = function handleClickOnViewAll(e) {
      var _this5 = this;
      e.preventDefault();
      if (!this.viewAll) return;
      if (this.viewAll.expanded) {
        delete this.viewAll.expanded;
        this.checkScreen();
        this.hideItems();
        this.viewAll.textContent = this.viewAllLabel;
      } else {
        this.galleryItems.forEach(function (item) {
          _this5.viewAll.expanded = true;
          item.parentNode.classList.remove('ecl-gallery__item--hidden');
          _this5.viewAll.textContent = _this5.viewAllLabelExpanded;
        });
      }
    }

    /**
     * Invoke listeners for on click events on the given gallery item.
     *
     * @param {Event} e
     */;
    _proto.handleClickOnItem = function handleClickOnItem(e) {
      e.preventDefault();

      // Disable scroll on body
      document.body.classList.add('ecl-u-disablescroll');

      // Display overlay
      if (this.isDialogSupported) {
        this.overlay.showModal();
      } else {
        this.overlay.setAttribute('open', '');
      }

      // Update overlay
      this.updateOverlay(e.currentTarget);

      // Trap focus
      this.focusTrap.activate();
    }

    /**
     * handle click event on gallery items when no overlay.
     *
     * @param {Event} e
     */
    // eslint-disable-next-line class-methods-use-this
    ;
    _proto.preventClickOnItem = function preventClickOnItem(e) {
      e.preventDefault();
      e.stopPropagation();
    }

    /**
     * Invoke listeners for on click events on previous navigation link.
     */;
    _proto.handleClickOnPreviousButton = function handleClickOnPreviousButton() {
      // Get current id
      var currentId = this.selectedItem.getAttribute('data-ecl-gallery-item-id');

      // Get previous id
      var previousId = +currentId - 1;
      if (previousId < 0) previousId = this.galleryItems.length - 1;

      // Stop video
      var video = queryOne('video', this.selectedItem);
      if (video) video.pause();

      // Update overlay
      this.updateOverlay(this.galleryItems[previousId]);
      this.selectedItem = this.galleryItems[previousId];
      return this;
    }

    /**
     * Invoke listeners for on click events on next navigation link.
     */;
    _proto.handleClickOnNextButton = function handleClickOnNextButton() {
      // Get current id
      var currentId = this.selectedItem.getAttribute('data-ecl-gallery-item-id');

      // Get next id
      var nextId = +currentId + 1;
      if (nextId >= this.galleryItems.length) nextId = 0;

      // Stop video
      var video = queryOne('video', this.selectedItem);
      if (video) video.pause();

      // Update overlay
      this.updateOverlay(this.galleryItems[nextId]);
      this.selectedItem = this.galleryItems[nextId];
      return this;
    };
    return Gallery;
  }();

  exports.Gallery = Gallery;
  exports.default = Gallery;

  Object.defineProperty(exports, '__esModule', { value: true });

  return exports;

})({});
